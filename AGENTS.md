# AGENTS.md — Escuadrón Cero Chispas · Misión Caribe

Guía para agentes de IA (o humanos) que continúen el desarrollo de este proyecto.

## Qué es esto

Juego web educativo de **seguridad eléctrica** para niños de 7 a 11 años, para la campaña **“¡Que no se te vayan las luces!”** — desarrollado por **dygeraldino** y **JMinotta** (transforma los materiales educativos de la campaña en una experiencia digital interactiva).

- **Documento de diseño original (GDD):** fue conversado con el equipo; su contenido está implementado casi completo (ver "Roadmap" para lo que quedó fuera).
- **Público:** niños 7–11. **Idioma:** español costeño colombiano ("pelao", "escampar", "bajón de luz", "maraña", "tacos", "pilo").
- **Requisito duro de la entrega:** debe funcionar con interacción REAL (no sirven prototipos estáticos) y debe incluir evaluación del aprendizaje.

## Estado (última sesión: nov 2026)

**Jugable de punta a punta y probado en navegador**: título → 3 niveles (escaneo + decisión) → bajón de luz → minijuego de circuitos ×3 → examen final de 8 preguntas con temporizador → carnet imprimible con mensaje personalizado. Sin errores en consola.

Pulido final: carnet PNG re-diseñado (ritmo vertical, ajuste de línea real), impresión a 1 página con la tarjeta a altura natural, tipografía auto-hospedada (adiós al texto rayado), récord en `localStorage` y README público.

## Cómo correrlo

No hay build, no hay dependencias, no hay `package.json`. Es HTML/CSS/JS plano:

```bash
# opción 1: abrir directamente
index.html   # doble clic (funciona con file://)

# opción 2: servirlo (mejor para probar TTS y deployar)
npx serve .
```

Para probarlo con automatización: `playwright-cli` **bloquea `file://` en `open`/`goto`** (deja la pestaña en about:blank); usa `npx serve .` y abre `http://localhost:3000`, o mete toda la sesión en `playwright-cli run-code --filename=script.js` (ahí sí funciona `page.goto('file://…')`). **Probar de verdad el flujo completo** tras cada cambio grande (hay un gancho de pruebas, ver abajo).

Para entregar/desplegar: arrastrar la carpeta a **Netlify Drop** (netlify.com/drop) o subir a **GitHub Pages** (Settings → Pages). Es un sitio estático puro.

## Archivos

```
index.html      # cascarón: #app, HUD, caja de Chispa, modal, overlay, #flash
styles.css      # sistema visual completo (tokens abajo) + fuentes incrustadas
game.js         # TODO el juego: datos + escenas SVG + lógica (~1150 líneas)
assets/chispa.svg  # mascota Iguana Chispa (dibujada a mano en SVG)
README.md       # cómo correr, presentar, desplegar y créditos
```

## Arquitectura de game.js

1. **DATOS**: `NIVELES` (3 niveles con `riesgos`: zona del hotspot en **%** + pregunta con 3 opciones, una `ok: true` con `why` explicativo), `BANCO_EXAMEN` (13 situaciones `{e, t, seguro, cat}`), `TIPS` (consejo por categoría).
2. **ESTADO**: objeto global `S` (puntos, nombre, nivel, resueltos, examen, toggles voz/música).
3. **AUDIO**: 100% sintetizado con WebAudio (`SFX.clic/acierto/error/tick/powerDown/luzOn`, `ruidoZap`). Música: loop suave de plucks pentatónicos (`iniciarMusica`). El contexto se crea tras el primer clic (política de autoplay).
4. **LOCUCIÓN**: `hablar(texto)` usa `speechSynthesis` del navegador (busca voz es-CO → es-419/MX/US → es-*). Toggle en HUD.
5. **PANTALLAS**: funciones que inyectan HTML en `#app`: `mostrarTitulo → entrarNivel(i) → montarEscena → abrirRiesgo/responder/cerrarRiesgo → bajonDeLuz → mostrarTablero → luzEncendida → introExamen → mostrarPreguntaExamen/responderExamen → mostrarCarnet`. HUD y cajas fijas se muestran/ocultan con `.hidden`.
6. **ESCENAS**: SVG dibujado a mano (funciones `escenaCasa/escenaBarrio/escenaCalle`, viewBox 1600×900). **No hay imágenes raster**: el intento de generarlas con IA falló por falta de créditos y se pivoteó a SVG — ventaja: los hotspots quedan alineados perfecto y funciona offline.
7. **HOTSPOTS**: botones absolutos sobre la escena, posición con CSS vars `--x/--y/--w/--h` en **porcentaje**. Brillo ✨ constante; a los 25 s sin resolver se activa `.pista` (marco punteado naranja). Resuelto → sticker “✓ Seguro”.
8. **MINIJUEGO (Tablero de los Tacos)**: rompecabezas de rotar cables 3×5, BFS valida la conexión poste→aparato. `tableroResuelto(tiles)`, `connsRotadas(t)`.

### ⚠️ Gotcha crítico del minijuego

Las casillas usan **formas canónicas + rotación**: el `conns` almacenado debe ser la orientación canónica y `rot` la gira: `connsRotadas = conns.map(d => (d + rot) % 4)`. Canónicos: `cable/filtro [0,2]` (vertical), `codo [0,1]` (arriba-derecha), `inicio [1]`, `fin [3]`. **Nunca definas un codo pre-rotado** (ej. `[0,3]`): parte el sistema de rotación y el puzzle no tiene solución (bug ya ocurrido y corregido). Direcciones: 0=arriba, 1=derecha, 2=abajo, 3=izquierda.

## Sistema visual (respetarlo)

Estilo **“sticker costeño”**: contornos gruesos `3px` en `--tinta: #3D2B1F`, sombras duras (offset, sin blur), radios grandes, colores planos. Nada de sombras suaves tipo SaaS.

```css
--sol:#FFC93C  --naranja:#FF7A3D  --cielo:#3FAEE4  --iguana:#3FA34D
--arena:#FFF6DF (fondo rayado 45°)  --tinta:#3D2B1F  --peligro:#E5484D  --ok:#2FA24C
fuentes: 'Baloo 2' (títulos/botones) + 'Nunito' (cuerpo), incrustadas en styles.css
```

- Los textos de UI y diálogos son cortos, grandes, coloquiales y **locutados**.
- SVG de escenas **sin texto** dentro (sí símbolos como el rayo del cartel).
- Accesibilidad: botones grandes táctiles, `prefers-reduced-motion` desactiva destello/sacudidas, `aria-label` en hotspots, `aria-pressed` en toggles.

### ⚠️ Gotchas de tipografía (bugs ya sufridos)

- **Texto con rayas horizontales**: Chrome pinta `-webkit-text-stroke` centrado sobre el relleno y Baloo 2 tiene contornos superpuestos que dejan rendijas. Toda regla con `-webkit-text-stroke` DEBE llevar también `paint-order: stroke fill` (el contorno va detrás del relleno y las rendijas desaparecen).
- **Fuentes que no cargan bajo `file://`**: Chrome bloquea por CORS los woff2 externos (Google Fonts o archivos locales) cuando la página se abre con doble clic. Por eso Baloo 2 y Nunito van **incrustadas como `data:` base64** en `styles.css` (archivos variables latinos de Google Fonts, rango de pesos `600 800`). Si cambias la fuente, re-incrusta.

## Pruebas automatizadas

`window.__tablero = { tiles, resuelto() }` (existe solo dentro del minijuego) permite resolverlo por script. Solución del tablero serpenteante (rotaciones objetivo): `{ '0-1':1,'0-2':1,'0-3':1,'0-4':2,'1-4':3,'1-3':1,'1-2':1,'1-1':1,'1-0':1,'2-0':0,'2-1':1,'2-2':1,'2-3':1 }` — cada clic en una casilla suma rot+1 mod 4.

Flujo completo probado por script (fue como se encontró el bug de rotaciones y el de la barra del examen): resolver opciones hasta `.exito` en `#feedback`, `btn-seguir`, esperar 900 ms (bajón), `btn-tablero`, rotar, esperar 650 ms, `btn-continuar`, y al final `btn-iniciar-examen` + responder 8 (probar también el timeout de 5 s). Verificar barra de tiempo (debe estar ~75% a 1.2 s), puntos en HUD, carnet con nombre/rango/mensaje.

## Decisiones ya tomadas (no reabrir sin motivo)

- **Vanilla JS sin build** (deadline de una noche; cero fricción para presentar y desplegar). React/Next no aportaba aquí.
- **SVG a mano en vez de arte IA**: sin créditos de OpenRouter esa noche; además alineación perfecta de hotspots y offline total.
- **Puntos**: riesgo al primer intento +100 (con error previo +50), minijuego +150, examen +50 por acierto.
- **Rangos del carnet**: 8/8 Experto ⚡, 6–7 Aprendiz 🔌, <6 Novato 🌱, con mensaje personalizado usando `TIPS[cat]` de lo fallado.
- El examen genera cada ronda con `mezclar(BANCO_EXAMEN).slice(0, 8)` (la “IA”/generación procedimental del GDD).
- **Fuentes incrustadas `data:`** y no por CDN ni archivos sueltos: es lo único que funciona con doble clic en `file://` (CORS) y sin internet (ver gotchas arriba).
- **PNG del carnet**: canvas 1000×720 dibujado en `dibujarCarnet()` (async, espera `document.fonts.ready`); ajuste de líneas por `measureText` (máx. 3, luego baja el cuerpo) y sellos anclados abajo tras un filete punteado. No metas posiciones fijas a ojo: fue lo que lo dejó apretado.
- **Impresión del carnet**: solo `.carnet-tarjeta` (acciones ocultas), `position: static` a altura natural + `print-color-adjust: exact`. `position: fixed; inset: 0` estiraba la tarjeta hasta llenar la hoja (bug ya ocurrido y corregido).
- **Récord**: `localStorage` clave `cchispas.record.v1` `{nombre, puntos}`; se guarda en `mostrarCarnet` y se muestra como sello en el título. Toda inyección del nombre pasa por `escapar()`.

## Roadmap (ideas pendientes, por prioridad)

1. Deploy (Netlify Drop / GitHub Pages) y meter la URL en la entrega.
2. Preguntas y escenas adicionales (escuela es un escenario del enunciado que no se usó).
3. Música de fondo real (loop generado o archivo libre de regalías) — hoy es un loop sintetizado mínimo.
4. Más variedades del tablero (otro trazado/otro tamaño por nivel) hoy los 3 usan el mismo serpenteante.
5. Si se quiere arte ilustrado: reemplazar las funciones `escenaX()` por `<img>` y recalibrar las zonas en %.

## Convenciones para editar

- Copy nuevo en español costeño, frases cortas, nunca técnico a seco (acompañar “tomacorriente” con contexto).
- Todo mensaje de Chispa pasa por `hablar()` — mantener frías las cadenas (sin HTML).
- Las zonas de hotspot se miden sobre el viewBox 1600×900 → % = px/16 y px/9.
- Mantener el juego jugable con **teclado** (los botones ya son elementos `button`).
- Probar tras cada cambio: flujo completo + consola sin errores.
