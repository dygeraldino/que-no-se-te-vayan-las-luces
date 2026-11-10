# ⚡ Escuadrón Cero Chispas · Misión Caribe

Juego web educativo de **seguridad eléctrica** para niñas y niños de 7 a 11 años, creado para la campaña **"¡Que no se te vayan las luces!"**.

Guías a Chispa, la iguana, en 3 niveles (la casa, el barrio y la calle): escaneas la escena, identificas los peligros eléctricos, decides qué hacer y reconectas la luz en el *Tablero de los Tacos*. Al final, el *Examen Rápido y Seguro* te da el **Carnet Oficial de Guardián de Energía**, imprimible y descargable en PNG.

## Cómo jugarlo

1. Abre `index.html` (doble clic funciona, también sin internet), o sirve la carpeta:

   ```bash
   npx serve .
   ```

2. Escribe tu nombre y pulsa **⚡ ¡Jugar!**
3. En cada nivel: toca las zonas con ✨, elige la opción segura y escucha a Chispa.
4. Resuelve el tablero de cables, pasa el examen y **imprime tu carnet** (🖨️) o descárgalo (📥).

Todo funciona con teclado, mouse y pantalla táctil. Voz y música se apagan desde el HUD.

## Cómo presentarlo (para el equipo)

- **En vivo:** abre el juego en pantalla grande, sube el volumen (la voz de Chispa narra en español) y pide a un voluntario que juegue el nivel 1 frente al público.
- **Feria/stand:** deja la pestaña abierta en pantalla completa (F11); cada niño juega con su nombre y se lleva el carnet impreso.

## Cómo publicarlo

Es un sitio estático puro (HTML/CSS/JS, sin build ni dependencias):

- **Netlify Drop:** arrastra la carpeta completa a <https://app.netlify.com/drop>.
- **GitHub Pages:** sube el repo y activa *Settings → Pages → main / root*.

## Estructura

```
index.html            cascarón: #app, HUD, caja de Chispa, modal, overlay
styles.css            sistema visual "sticker costeño" + impresión del carnet
game.js               datos, escenas SVG, lógica y audio (~1100 líneas)
assets/chispa.svg     mascota Iguana Chispa
assets/fonts/         Baloo 2 y Nunito (woff2, funcionan offline)
```

## Créditos

- **Campaña:** "¡Que no se te vayan las luces!".
- **Contenido educativo:** adaptado de los materiales de la campaña (seguridad con agua y electricidad, enchufes sobrecargados, cometas y cables, subestaciones, refugios seguros).
- **Diseño y código:** **dygeraldino** y **JMinotta** — Escuadrón Cero Chispas · Misión Caribe.
