/* ============================================================
   Escuadrón Cero Chispas · Misión Caribe
   Juego educativo de seguridad eléctrica (7-11 años)
   Campaña "¡Que no se te vayan las luces!" — devs: dygeraldino & JMinotta
   ============================================================ */
'use strict';

/* ===================== DATOS DEL JUEGO ===================== */

const NIVELES = [
  {
    id: 'casa',
    nombre: 'Nivel 1 · La Casa',
    sub: 'La terraza y el patio — busca 2 peligros',
    escena: escenaCasa,
    riesgos: [
      {
        id: 'agua',
        nombre: '💧 El abanico y el agua',
        zona: { x: 7.5, y: 49, w: 42, h: 50 },
        pregunta: 'Luís salió de la piscinita: está mojado, descalzo y va a conectar el abanico. ¿Qué hacemos?',
        opciones: [
          { t: 'Dejarlo, si él tiene cuidado no pasa nada.', ok: false, why: '¡Peligro! El agua y la electricidad son enemigos. Con el cuerpo mojado, la corriente pasa fácil y da un chón tremendo.' },
          { t: 'Que se seque bien las manos y los pies, se ponga los tacos y pida a un adulto que conecte el abanico.', ok: true, why: '¡Eso es! Siempre secos y con zapatos. Los aparatos los conectan los adultos.' },
          { t: 'Que conecte el abanico rapidito y luego se seque, pa\u2019 no aguantar calor.', ok: false, why: '¡Nipes! Conectar un aparato mojado puede causar una descarga. Primero secarse, después el abanico.' }
        ]
      },
      {
        id: 'pulpo',
        nombre: '🐙 El enchufe pulpo',
        zona: { x: 66, y: 36, w: 20, h: 60 },
        pregunta: 'En el enchufe de la terraza hay un equipo de sonido, luces y tres cargadores al tiempo. ¿Qué hacemos?',
        opciones: [
          { t: 'Desconectar lo que no se usa, halando desde la clavija, no del cable.', ok: true, why: '¡Perfecto! Un enchufe sobrecargado se calienta. Y siempre se hala desde la clavija.' },
          { t: 'Dejarlo así: mientras suene la música, no pasa nada.', ok: false, why: '¡Ojo pelao! Demasiados aparatos en un solo enchufe recalientan el cableado y pueden prender un incendio.' },
          { t: 'Jalar del cable con fuerza pa\u2019 sacar todo de una vez.', ok: false, why: '¡Jamás! Jalar del cable lo rompe y puede dar corriente. Siempre se hala desde la clavija.' }
        ]
      }
    ]
  },
  {
    id: 'barrio',
    nombre: 'Nivel 2 · El Barrio',
    sub: 'Época de vientos y marañas — busca 2 peligros',
    escena: escenaBarrio,
    riesgos: [
      {
        id: 'cometa',
        nombre: '🪁 La cometa en los cables',
        zona: { x: 38, y: 9, w: 18, h: 72 },
        pregunta: 'A un pelao se le enredó la cometa en los cables de luz y quiere bajarla con un palo de escoba metálico. ¿Qué hacemos?',
        opciones: [
          { t: 'Ayudarlo a levantar el palo pa\u2019 bajarla rapidito.', ok: false, why: '¡Peligro! Los cables pueden estar energizados y el palo metálico conduce la corriente. La cometa no vale una vida.' },
          { t: 'Detenerlo, dejar la cometa ahí y llamar a la empresa de energía.', ok: true, why: '¡Eso es! Las cometas y los cables no se tocan con nada. La empresa de energía la retira con equipo seguro.' },
          { t: 'Tirarle una piedra pa\u2019 soltar la cometa de los cables.', ok: false, why: '¡Tampoco! Tirar objetos a los cables puede provocar chispazos y un bajón de luz en todo el barrio.' }
        ]
      },
      {
        id: 'pelota',
        nombre: '⚽ La pelota en la subestación',
        zona: { x: 76, y: 46, w: 22, h: 32 },
        pregunta: 'La pelota cayó dentro del cerco del transformador. ¿Qué hacemos?',
        opciones: [
          { t: 'Trepar la reja rapidito y rescatar la pelota.', ok: false, why: '¡Ni locos! El transformador puede dar un arco eléctrico sin tocarlo. Es la zona más peligrosa del barrio.' },
          { t: 'Meter el brazo entre los alambres pa\u2019 alcanzarla.', ok: false, why: '¡Cuidao! La corriente puede hacer arco y saltar hacia ti sin necesidad de tocar nada.' },
          { t: 'Dar la pelota por perdida y avisar a un adulto. Nunca trepar la reja.', ok: true, why: '¡Exacto! Una pelota se recupera, una vida no. La subestación no se trepa, no se abre y no se toca.' }
        ]
      }
    ]
  },
  {
    id: 'calle',
    nombre: 'Nivel 3 · La Calle',
    sub: 'El aguacero y los arroyos — busca 2 peligros',
    escena: escenaCalle,
    riesgos: [
      {
        id: 'charco',
        nombre: '🌊 Cable caído en el charco',
        zona: { x: 14, y: 44, w: 22, h: 50 },
        pregunta: 'Con el aguacero se rompió un cable y está tocando el agua de la calle. Hay gente cerca. ¿Qué hacemos?',
        opciones: [
          { t: 'Pasar rápido saltando el charco, que la lluvia no espera.', ok: false, why: '¡Peligro! El agua conduce la corriente varios metros alrededor del cable. Ni un paso cerca.' },
          { t: 'Mover el cable con un palo de madera pa\u2019 sacarlo del agua.', ok: false, why: '¡Tampoco! La madera mojada también conduce. Un cable caído solo lo mueve la empresa de energía.' },
          { t: 'No acercarnos, avisar a los vecinos que se alejen y llamar a emergencias.', ok: true, why: '¡Eso es! Perímetro de seguridad, avisar y llamar. Un cable caído se queda quieto hasta que lleguen los expertos.' }
        ]
      },
      {
        id: 'refugio',
        nombre: '⛈️ Refugio peligroso',
        zona: { x: 70, y: 20, w: 16, h: 76 },
        pregunta: 'Varios pelados escampan la lluvia debajo del poste del transformador, que está echando chispas. ¿Qué hacemos?',
        opciones: [
          { t: 'Dejarlos ahí: el poste los cubre del agua.', ok: false, why: '¡Qué va! Si el transformador falla o un cable se cae, quedan en el peor lugar posible.' },
          { t: 'Decirles que se refugien en una casa o tienda, lejos del poste.', ok: true, why: '¡Eso es! Bajo techo se escampa uno, nunca bajo un poste de luz con transformador.' },
          { t: 'Abrigarnos con ellos debajo del transformador, en groupi.', ok: false, why: '¡Malísimo! Acercarse a un transformador que chispea es jugarse el pellejo. Lejos y bajo techo.' }
        ]
      }
    ]
  }
];

/* Banco de situaciones del examen (la IA del sistema mezcla: selecciona
   8 al azar, en orden al azar, y crea la clave Seguro/Peligro al vuelo) */
const BANCO_EXAMEN = [
  { e: '🤝', t: 'Desconectar un aparato halando desde la clavija, no del cable', seguro: true,  cat: 'cables' },
  { e: '🪃', t: 'Jalar del cable para desconectar un aparato',                    seguro: false, cat: 'cables' },
  { e: '🚿', t: 'Tocar el abanico o un enchufe con las manos mojadas',            seguro: false, cat: 'agua' },
  { e: '👟', t: 'Secarse bien las manos y los pies antes de usar un aparato',     seguro: true,  cat: 'agua' },
  { e: '🪁', t: 'Bajar una cometa enredada en los cables con un palo metálico',   seguro: false, cat: 'cometa' },
  { e: '⚽', t: 'Dejar la pelota en la subestación y avisar a un adulto',         seguro: true,  cat: 'subestacion' },
  { e: '🧗', t: 'Trepar la reja de un transformador pa\u2019 rescatar una pelota', seguro: false, cat: 'subestacion' },
  { e: '🌊', t: 'Cruzar un charco donde cae un cable de la luz',                  seguro: false, cat: 'charco' },
  { e: '📞', t: 'Alejarse de un cable caído y llamar a la empresa de energía',    seguro: true,  cat: 'charco' },
  { e: '🌧️', t: 'Escampar la lluvia debajo de un poste con transformador',       seguro: false, cat: 'refugio' },
  { e: '🏠', t: 'Refugiarse de la lluvia dentro de una casa o una tienda',        seguro: true,  cat: 'refugio' },
  { e: '🔌', t: 'Conectar el sonido, las luces y los cargadores en un solo enchufe', seguro: false, cat: 'pulpo' },
  { e: '🧃', t: 'Desconectar los aparatos que no se usan del enchufe pulpo',      seguro: true,  cat: 'pulpo' }
];

const TIPS = {
  agua: 'secarse bien las manos y los pies antes de tocar cualquier aparato',
  cables: 'desconectar siempre halando desde la clavija, nunca del cable',
  cometa: 'la cometa que se enreda en los cables se deja ahí: los cables no se tocan con nada',
  subestacion: 'el cerco del transformador no se trepa, no se abre y no se toca, ni pa\u2019 rescatar nada',
  charco: 'si hay un cable caído en el agua: ni un paso cerca, avisar a los vecinos y llamar a emergencias',
  refugio: 'la lluvia se escampa bajo techo, nunca debajo de un poste de luz',
  pulpo: 'pocas cosas por enchufe y siempre halando desde la clavija'
};

/* ===================== ESTADO GLOBAL ===================== */

const S = {
  puntos: 0,
  nombre: 'Teo',
  nivel: 0,
  resueltos: {},       // idNivel -> Set(ids de riesgo resueltos)
  aciertosExamen: 0,
  falladasExamen: [],  // ítems fallados
  idxExamen: 0,
  preguntasExamen: [],
  intentosRiesgo: {},  // idRiesgo -> intentos realizados
  voz: true,
  musica: true
};

const $ = s => document.querySelector(s);
const aleatorio = n => Math.floor(Math.random() * n);
const escapar = s => String(s).replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));
function mezclar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = aleatorio(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Récord del escuadrón (localStorage, clave versionada) ---------- */

const CLAVE_RECORD = 'cchispas.record.v1';

function leerRecord() {
  try { return JSON.parse(localStorage.getItem(CLAVE_RECORD) || 'null'); }
  catch { return null; }
}

/* Guarda el puntaje si supera el récord. Devuelve true si es nuevo récord. */
function guardarRecord() {
  try {
    const previo = leerRecord();
    if (!previo || S.puntos > previo.puntos) {
      localStorage.setItem(CLAVE_RECORD, JSON.stringify({ nombre: S.nombre, puntos: S.puntos }));
      return true;
    }
  } catch { /* localStorage bloqueado (modo privado): se juega sin récord */ }
  return false;
}

/* ===================== AUDIO (sintetizado, sin archivos) ===================== */

let ctxAudio = null;
function audio() {
  if (!ctxAudio) ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  if (ctxAudio.state === 'suspended') ctxAudio.resume();
  return ctxAudio;
}
function tono(freq, dur, tipo = 'triangle', vol = 0.12, cuando = 0) {
  if (!S.musica && tipo === 'musica') return;
  const ctx = audio();
  const t0 = ctx.currentTime + cuando;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = tipo === 'musica' ? 'triangle' : tipo;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}
function ruidoZap(dur = 0.3) {
  const ctx = audio();
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filtro = ctx.createBiquadFilter();
  filtro.type = 'bandpass';
  filtro.frequency.setValueAtTime(2400, ctx.currentTime);
  filtro.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.25, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  src.connect(filtro).connect(g).connect(ctx.destination);
  src.start();
}
const SFX = {
  clic()   { tono(660, 0.08, 'square', 0.05); },
  acierto(){ tono(523, 0.15); tono(659, 0.15, 'triangle', 0.12, 0.12); tono(784, 0.25, 'triangle', 0.12, 0.24); },
  error()  { tono(220, 0.2, 'sawtooth', 0.08); tono(160, 0.3, 'sawtooth', 0.08, 0.15); ruidoZap(0.25); },
  tick()   { tono(880, 0.05, 'square', 0.04); },
  powerDown() { const ctx = audio(); const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 1.1);
      g.gain.setValueAtTime(0.12, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      osc.connect(g).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 1.3); },
  luzOn()  { [523, 659, 784, 1047].forEach((f, i) => tono(f, 0.3, 'triangle', 0.12, i * 0.09)); }
};

/* Música de fondo: plucks suaves sobre pentatónica, muy bajita */
let timerMusica = null;
const PATRON = [0, 4, 7, 9, 12, 9, 7, 4];
let pasoMusica = 0;
function iniciarMusica() {
  if (timerMusica) return;
  timerMusica = setInterval(() => {
    if (!S.musica) return;
    const nota = PATRON[pasoMusica % PATRON.length];
    if (pasoMusica % 2 === 0) tono(261.63 * Math.pow(2, nota / 12), 0.5, 'musica', 0.045);
    pasoMusica++;
  }, 330);
}
function detenerMusica() { clearInterval(timerMusica); timerMusica = null; }

/* ===================== LOCUCIÓN (voz del navegador) ===================== */

let vozEsp = null;
function buscarVoz() {
  const voces = speechSynthesis.getVoices();
  vozEsp = voces.find(v => /es[-_]CO/i.test(v.lang))
        || voces.find(v => /es[-_]419|es[-_]MX|es[-_]US/i.test(v.lang))
        || voces.find(v => /^es/i.test(v.lang))
        || null;
}
if ('speechSynthesis' in window) {
  buscarVoz();
  speechSynthesis.onvoiceschanged = buscarVoz;
}
function hablar(texto) {
  if (!S.voz || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = vozEsp ? vozEsp.lang : 'es-CO';
  if (vozEsp) u.voice = vozEsp;
  u.rate = 1;
  u.pitch = 1.05;
  speechSynthesis.speak(u);
}
function callar() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }

/* ===================== UTILIDADES DE UI ===================== */

function puntos(n) {
  S.puntos += n;
  $('#hud-puntos').textContent = S.puntos;
}

function destelloPeligro() {
  const f = $('#flash');
  f.classList.remove('activo');
  void f.offsetWidth; // reinicia la animación
  f.classList.add('activo');
}

function overlay(html) {
  const o = $('#overlay');
  $('#overlay-contenido').innerHTML = html;
  o.classList.remove('hidden');
}
function cerrarOverlay() { $('#overlay').classList.add('hidden'); }

function chispaDice(msg, ms) {
  const box = $('#chispa-box');
  $('#chispa-msj').textContent = msg;
  box.classList.remove('hidden');
  hablar(msg);
  if (ms) setTimeout(() => box.classList.add('hidden'), ms);
}
$('#chispa-ok').addEventListener('click', () => {
  SFX.clic();
  $('#chispa-box').classList.add('hidden');
  callar();
});

/* ===================== ESCENAS (SVG dibujado a mano) ===================== */

const TINTA = '#3D2B1F';

function escenaCasa() {
  return `
<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Patio de una casa costeña">
  <defs>
    <linearGradient id="cielo1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7FD4F2"/><stop offset="1" stop-color="#FFE9B8"/>
    </linearGradient>
    <pattern id="baldosas" width="96" height="64" patternUnits="userSpaceOnUse">
      <rect width="96" height="64" fill="#E8B98C"/>
      <path d="M96 0H0V64" stroke="#C99565" stroke-width="4" fill="none"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="url(#cielo1)"/>
  <circle cx="1400" cy="130" r="85" fill="#FFD54F" stroke="${TINTA}" stroke-width="6"/>
  <g stroke="#FFD54F" stroke-width="10" stroke-linecap="round">
    <path d="M1400 15v-5M1400 245v25M1285 130h-25M1515 130h25M1320 50l-18-18M1480 50l18-18M1320 210l-18 18M1480 210l18 18"/>
  </g>
  <g fill="#fff" opacity="0.9">
    <ellipse cx="300" cy="120" rx="90" ry="36"/><ellipse cx="380" cy="100" rx="70" ry="30"/>
    <ellipse cx="900" cy="90" rx="110" ry="40"/><ellipse cx="1000" cy="70" rx="70" ry="28"/>
  </g>
  <path d="M130 900 C150 700 110 570 170 470" stroke="#B5713A" stroke-width="26" fill="none" stroke-linecap="round"/>
  <g fill="#3FA34D" stroke="${TINTA}" stroke-width="4">
    <path d="M170 470 C90 430 30 450 20 500 C90 510 150 500 170 470Z"/>
    <path d="M170 470 C250 420 320 440 330 495 C260 510 195 505 170 470Z"/>
    <path d="M170 470 C120 400 140 350 200 340 C230 410 205 455 170 470Z"/>
    <path d="M170 470 C230 410 290 410 300 370 C230 360 185 420 170 470Z"/>
  </g>
  <rect x="0" y="520" width="900" height="130" fill="#FFF3D6" stroke="${TINTA}" stroke-width="5"/>
  <rect x="0" y="505" width="900" height="22" fill="#FFC93C" stroke="${TINTA}" stroke-width="5"/>
  <g stroke="${TINTA}" stroke-width="4">
    <path d="M90 527v118M180 527v118M270 527v118M360 527v118M450 527v118M540 527v118M630 527v118M720 527v118M810 527v118"/>
  </g>
  <rect x="900" y="160" width="700" height="740" fill="#FFDCA8" stroke="${TINTA}" stroke-width="6"/>
  <rect x="860" y="125" width="760" height="60" fill="#FF7A3D" stroke="${TINTA}" stroke-width="6"/>
  <rect x="1000" y="300" width="200" height="180" fill="#BDE8FF" stroke="${TINTA}" stroke-width="6"/>
  <path d="M1100 300v180M1000 390h200" stroke="${TINTA}" stroke-width="5"/>
  <rect x="955" y="295" width="40" height="190" fill="#3FA34D" stroke="${TINTA}" stroke-width="5"/>
  <rect x="1205" y="295" width="40" height="190" fill="#3FA34D" stroke="${TINTA}" stroke-width="5"/>
  <rect x="1440" y="560" width="130" height="320" fill="#B5713A" stroke="${TINTA}" stroke-width="6"/>
  <circle cx="1458" cy="725" r="8" fill="#FFC93C" stroke="${TINTA}" stroke-width="3"/>
  <rect x="900" y="560" width="700" height="340" fill="url(#baldosas)"/>
  <path d="M950 260 H1560" stroke="${TINTA}" stroke-width="3" fill="none"/>
  <g>
    <path d="M950 258 Q980 300 1010 258 Q1040 300 1070 258 Q1100 300 1130 258 Q1160 300 1190 258 Q1220 300 1250 258 Q1280 300 1310 258 Q1340 300 1370 258 Q1400 300 1430 258 Q1460 300 1490 258 Q1520 300 1550 258" stroke="${TINTA}" stroke-width="3" fill="none"/>
    <circle cx="1010" cy="296" r="10" fill="#E5484D" stroke="${TINTA}" stroke-width="3"/>
    <circle cx="1130" cy="296" r="10" fill="#3FAEE4" stroke="${TINTA}" stroke-width="3"/>
    <circle cx="1250" cy="296" r="10" fill="#3FA34D" stroke="${TINTA}" stroke-width="3"/>
    <circle cx="1370" cy="296" r="10" fill="#F4C430" stroke="${TINTA}" stroke-width="3"/>
    <circle cx="1490" cy="296" r="10" fill="#E5648C" stroke="${TINTA}" stroke-width="3"/>
  </g>
  <g>
    <path d="M1255 520 C1240 640 1180 620 1200 700 C1215 760 1160 780 1130 800" stroke="${TINTA}" stroke-width="8" fill="none"/>
    <path d="M1265 520 C1290 660 1360 640 1380 720 C1392 770 1420 790 1440 800" stroke="${TINTA}" stroke-width="8" fill="none"/>
    <path d="M1275 520 C1260 660 1220 680 1230 760 C1235 800 1210 830 1190 850" stroke="${TINTA}" stroke-width="8" fill="none"/>
    <path d="M1245 520 C1230 600 1160 600 1150 660" stroke="${TINTA}" stroke-width="8" fill="none"/>
    <rect x="1120" y="660" width="150" height="210" rx="12" fill="#8C6BD9" stroke="${TINTA}" stroke-width="6"/>
    <circle cx="1195" cy="725" r="40" fill="#D9CBF2" stroke="${TINTA}" stroke-width="5"/>
    <circle cx="1195" cy="825" r="24" fill="#D9CBF2" stroke="${TINTA}" stroke-width="5"/>
    <rect x="1420" y="780" width="95" height="62" rx="8" fill="#7FD4F2" stroke="${TINTA}" stroke-width="5"/>
    <path d="M1300 500 C1360 560 1400 660 1445 780" stroke="${TINTA}" stroke-width="8" fill="none"/>
  </g>
  <rect x="1195" y="350" width="120" height="175" rx="18" fill="#fff" stroke="${TINTA}" stroke-width="7"/>
  <g fill="${TINTA}">
    <circle cx="1230" cy="400" r="11"/><circle cx="1258" cy="400" r="11"/><circle cx="1286" cy="400" r="11"/>
    <circle cx="1230" cy="440" r="11"/><circle cx="1258" cy="440" r="11"/><circle cx="1286" cy="440" r="11"/>
  </g>
  <path d="M1215 470 h80" stroke="${TINTA}" stroke-width="5"/>
  <ellipse cx="350" cy="790" rx="250" ry="95" fill="#FFD23F" stroke="${TINTA}" stroke-width="6"/>
  <ellipse cx="350" cy="790" rx="205" ry="65" fill="#7FD4F2"/>
  <path d="M200 780 q30 -12 60 0 q30 12 60 0 M340 810 q30 -12 60 0 q30 12 60 0" stroke="#5FB9E0" stroke-width="6" fill="none" stroke-linecap="round"/>
  <g>
    <circle cx="330" cy="600" r="42" fill="#C68955" stroke="${TINTA}" stroke-width="5"/>
    <path d="M292 585 A42 42 0 0 1 368 585 L360 570 A42 42 0 0 0 300 570 Z" fill="#5B3A1E" stroke="${TINTA}" stroke-width="3"/>
    <circle cx="316" cy="605" r="5" fill="${TINTA}"/><circle cx="344" cy="605" r="5" fill="${TINTA}"/>
    <path d="M318 622 q12 10 24 0" stroke="${TINTA}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <rect x="300" y="645" width="60" height="100" rx="24" fill="#35A7E0" stroke="${TINTA}" stroke-width="5"/>
    <path d="M300 660 C260 630 255 590 275 565" stroke="#C68955" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M360 660 C400 630 405 590 385 565" stroke="#C68955" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M262 555 l-14 -18 M275 560 l0 -24 M290 558 l10 -20" stroke="#3FAEE4" stroke-width="6" stroke-linecap="round"/>
    <circle cx="250" cy="640" r="6" fill="#7FD4F2"/><circle cx="410" cy="630" r="6" fill="#7FD4F2"/><circle cx="390" cy="560" r="5" fill="#7FD4F2"/>
  </g>
  <g>
    <path d="M610 855 L625 668 M760 855 L745 668" stroke="#B5713A" stroke-width="12" stroke-linecap="round"/>
    <rect x="585" y="648" width="200" height="26" rx="8" fill="#B5713A" stroke="${TINTA}" stroke-width="5"/>
    <circle cx="685" cy="520" r="86" fill="#BDE8FF" stroke="${TINTA}" stroke-width="7"/>
    <g fill="#3FAEE4" stroke="${TINTA}" stroke-width="4">
      <ellipse cx="685" cy="485" rx="16" ry="34"/>
      <ellipse cx="654" cy="538" rx="16" ry="34" transform="rotate(-60 654 538)"/>
      <ellipse cx="716" cy="538" rx="16" ry="34" transform="rotate(60 716 538)"/>
    </g>
    <circle cx="685" cy="520" r="16" fill="${TINTA}"/>
    <rect x="672" y="600" width="26" height="52" fill="#6E7B86" stroke="${TINTA}" stroke-width="5"/>
    <path d="M685 655 C690 720 640 730 600 745 C565 757 540 770 528 782" stroke="${TINTA}" stroke-width="8" fill="none"/>
    <rect x="512" y="770" width="34" height="20" rx="6" fill="#6E7B86" stroke="${TINTA}" stroke-width="4" transform="rotate(-25 529 780)"/>
  </g>
  <g stroke="${TINTA}" stroke-width="5" fill="#E5484D">
    <ellipse cx="560" cy="868" rx="30" ry="13" transform="rotate(-15 560 868)"/>
    <ellipse cx="610" cy="876" rx="30" ry="13" transform="rotate(8 610 876)"/>
  </g>
  <circle cx="140" cy="845" r="40" fill="#fff" stroke="${TINTA}" stroke-width="5"/>
  <path d="M140 805 A40 40 0 0 1 175 865 A40 40 0 0 1 105 865 Z" fill="#E5648C" opacity="0.85"/>
  <path d="M100 845 h80" stroke="${TINTA}" stroke-width="4"/>
</svg>`;
}

function escenaBarrio() {
  const casas = [
    { x: 0, c: '#FF7A3D' }, { x: 230, c: '#3FA34D' }, { x: 460, c: '#F4C430' },
    { x: 690, c: '#3FAEE4' }, { x: 920, c: '#E5648C' }, { x: 1150, c: '#8C6BD9' }, { x: 1380, c: '#FF9B54' }
  ].map(h => `
    <g>
      <rect x="${h.x + 15}" y="420" width="190" height="240" fill="${h.c}" stroke="${TINTA}" stroke-width="5"/>
      <polygon points="${h.x},425 ${h.x + 110},340 ${h.x + 220},425" fill="#B5713A" stroke="${TINTA}" stroke-width="5"/>
      <rect x="${h.x + 45}" y="470" width="45" height="50" fill="#BDE8FF" stroke="${TINTA}" stroke-width="4"/>
      <rect x="${h.x + 125}" y="470" width="45" height="50" fill="#BDE8FF" stroke="${TINTA}" stroke-width="4"/>
      <rect x="${h.x + 80}" y="560" width="55" height="100" fill="#5B3A1E" stroke="${TINTA}" stroke-width="4"/>
    </g>`).join('');
  const vientos = [[200, 250], [500, 180], [820, 260], [1150, 200], [1420, 300]]
    .map(([x, y]) => `<path d="M${x} ${y} q40 -18 80 0 q40 18 80 0" stroke="#fff" stroke-width="7" fill="none" opacity="0.7" stroke-linecap="round"/>`).join('');
  const malla = [];
  for (let i = 0; i < 6; i++) {
    const x = 1225 + i * 62;
    malla.push(`<path d="M${x} 460 L${x + 62} 695 M${x + 62} 460 L${x} 695" stroke="#8B959E" stroke-width="4"/>`);
  }
  return `
<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calle de barrio con cables enredados">
  <defs>
    <linearGradient id="cielo2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9ADDF8"/><stop offset="1" stop-color="#E8F8FF"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#cielo2)"/>
  ${vientos}
  ${casas}
  <rect x="0" y="620" width="1600" height="50" fill="#D8CDB9" stroke="${TINTA}" stroke-width="4"/>
  <rect x="0" y="670" width="1600" height="230" fill="#98A2AA"/>
  <g stroke="#fff" stroke-width="8" stroke-dasharray="46 40" opacity="0.8">
    <path d="M0 790 H1600"/>
  </g>
  <rect x="240" y="150" width="28" height="520" fill="#9AA3AB" stroke="${TINTA}" stroke-width="5"/>
  <rect x="185" y="165" width="140" height="18" rx="6" fill="#9AA3AB" stroke="${TINTA}" stroke-width="5"/>
  <rect x="1140" y="130" width="28" height="540" fill="#9AA3AB" stroke="${TINTA}" stroke-width="5"/>
  <rect x="1085" y="145" width="140" height="18" rx="6" fill="#9AA3AB" stroke="${TINTA}" stroke-width="5"/>
  <g stroke="${TINTA}" stroke-width="6" fill="none">
    <path d="M205 195 Q675 330 1145 170"/>
    <path d="M258 195 Q675 375 1198 175"/>
    <path d="M230 200 Q675 295 1172 162"/>
  </g>
  <g stroke="${TINTA}" stroke-width="5" fill="none">
    <path d="M280 220 C340 180 420 260 350 300 C290 335 250 270 300 240 C360 205 440 280 390 320"/>
    <path d="M268 250 C330 300 430 220 380 180 C330 150 280 210 330 240 C390 275 460 240 430 210"/>
    <path d="M300 200 C260 260 350 320 410 280 C470 240 420 180 360 200"/>
  </g>
  <g transform="rotate(-18 760 150)">
    <polygon points="760,60 830,150 760,240 690,150" fill="#FF7A3D" stroke="${TINTA}" stroke-width="6"/>
    <path d="M760 60 V240 M690 150 H830" stroke="${TINTA}" stroke-width="5"/>
  </g>
  <path d="M770 245 q-20 60 15 110 q30 45 0 100" stroke="${TINTA}" stroke-width="5" fill="none"/>
  <g fill="#3FAEE4" stroke="${TINTA}" stroke-width="4">
    <polygon points="795,300 815,315 795,330"/>
    <polygon points="770,380 790,395 770,410"/>
  </g>
  <path d="M742 350 Q700 480 728 600" stroke="${TINTA}" stroke-width="4" fill="none"/>
  <g>
    <circle cx="700" cy="585" r="30" fill="#C68955" stroke="${TINTA}" stroke-width="5"/>
    <path d="M672 572 A30 30 0 0 1 728 572 L722 560 A30 30 0 0 0 678 560 Z" fill="#5B3A1E" stroke="${TINTA}" stroke-width="3"/>
    <circle cx="690" cy="588" r="4" fill="${TINTA}"/><circle cx="710" cy="588" r="4" fill="${TINTA}"/>
    <rect x="672" y="618" width="56" height="88" rx="20" fill="#E5648C" stroke="${TINTA}" stroke-width="5"/>
    <path d="M672 635 L630 560 M728 635 L762 560" stroke="#E5648C" stroke-width="12" stroke-linecap="round"/>
    <path d="M660 620 L862 335" stroke="#9AA3AB" stroke-width="13" stroke-linecap="round"/>
    <path d="M652 632 l20 -22 M660 620 l20 -20" stroke="#6E7B86" stroke-width="10" stroke-linecap="round"/>
    <path d="M684 706 L672 762 M716 706 L728 762" stroke="#35A7E0" stroke-width="12" stroke-linecap="round"/>
  </g>
  <rect x="1240" y="632" width="330" height="66" fill="#C9C2B4" stroke="${TINTA}" stroke-width="5"/>
  <rect x="1280" y="470" width="215" height="168" rx="12" fill="#3FA34D" stroke="${TINTA}" stroke-width="6"/>
  <g stroke="#2C7A36" stroke-width="6">
    <path d="M1305 490 v128 M1345 490 v128 M1385 490 v128 M1425 490 v128 M1465 490 v128"/>
  </g>
  <g fill="#9AA3AB" stroke="${TINTA}" stroke-width="4">
    <rect x="1310" y="440" width="18" height="34"/><rect x="1378" y="440" width="18" height="34"/><rect x="1446" y="440" width="18" height="34"/>
  </g>
  <path d="M1290 445 Q1385 425 1480 445 M1145 150 Q1220 430 1290 442 M1168 150 Q1290 380 1380 440" stroke="${TINTA}" stroke-width="5" fill="none"/>
  <g fill="#8892A0" stroke="${TINTA}" stroke-width="3">
    <rect x="1222" y="452" width="9" height="246"/><rect x="1290" y="452" width="9" height="246"/>
    <rect x="1358" y="452" width="9" height="246"/><rect x="1426" y="452" width="9" height="246"/>
    <rect x="1494" y="452" width="9" height="246"/><rect x="1562" y="452" width="9" height="246"/>
  </g>
  ${malla.join('')}
  <path d="M1222 462 H1571" stroke="#8892A0" stroke-width="7"/>
  <g transform="translate(1248 470)">
    <polygon points="0,0 58,0 29,-52" fill="#F4C430" stroke="${TINTA}" stroke-width="5"/>
    <polygon points="24,-8 34,-8 30,-20 40,-20 22,-44 26,-26 16,-26" fill="${TINTA}"/>
  </g>
  <circle cx="1398" cy="655" r="27" fill="#fff" stroke="${TINTA}" stroke-width="5"/>
  <polygon points="1398,641 1411,651 1406,665 1390,665 1385,651" fill="${TINTA}"/>
  <path d="M1398 628 v13 M1374 648 l12 4 M1422 648 l-12 4 M1383 668 l9 -7 M1413 668 l-9 -7" stroke="${TINTA}" stroke-width="3"/>
  <g>
    <circle cx="960" cy="772" r="30" fill="none" stroke="${TINTA}" stroke-width="7"/>
    <circle cx="1060" cy="772" r="30" fill="none" stroke="${TINTA}" stroke-width="7"/>
    <path d="M960 772 L1000 720 H1060 M1000 720 L960 772 M1000 720 L1010 700 H1032 M960 772 L1046 772" stroke="${TINTA}" stroke-width="7" fill="none"/>
  </g>
</svg>`;
}

function escenaCalle() {
  const lluvia = [];
  for (let i = 0; i < 42; i++) {
    const x = 20 + i * 38 + aleatorio(20);
    const y = 20 + (i % 3) * 60 + aleatorio(80);
    lluvia.push(`<path d="M${x} ${y} l-12 30" stroke="#CFE8F5" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>`);
  }
  return `
<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calle inundada por la lluvia">
  <defs>
    <linearGradient id="cielo3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3E4C59"/><stop offset="1" stop-color="#7C8FA0"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#cielo3)"/>
  <g fill="#46525E">
    <ellipse cx="250" cy="90" rx="180" ry="55"/><ellipse cx="600" cy="70" rx="220" ry="60"/>
    <ellipse cx="1000" cy="90" rx="240" ry="65"/><ellipse cx="1400" cy="80" rx="200" ry="58"/>
  </g>
  ${lluvia.join('')}
  <g fill="#55606B" stroke="${TINTA}" stroke-width="4">
    <rect x="60" y="330" width="180" height="240"/><rect x="500" y="300" width="150" height="270"/>
    <rect x="900" y="340" width="200" height="230"/><rect x="1650" y="320" width="140" height="250"/>
  </g>
  <rect x="1400" y="430" width="200" height="290" fill="#FFDCA8" stroke="${TINTA}" stroke-width="6"/>
  <g>
    <rect x="1390" y="425" width="210" height="45" fill="#E5484D"/>
    <clipPath id="franjasBarrera"><rect x="1390" y="425" width="210" height="45"/></clipPath>
    <path d="M1415 470 L1445 425 M1475 470 L1505 425 M1535 470 L1565 425" stroke="#fff" stroke-width="18" fill="none" clip-path="url(#franjasBarrera)"/>
    <rect x="1390" y="425" width="210" height="45" fill="none" stroke="${TINTA}" stroke-width="5"/>
    <rect x="1430" y="540" width="70" height="180" fill="#5B3A1E" stroke="${TINTA}" stroke-width="5"/>
    <rect x="1530" y="560" width="55" height="55" fill="#BDE8FF" stroke="${TINTA}" stroke-width="5"/>
  </g>
  <rect x="290" y="60" width="30" height="510" fill="#6E7B86" stroke="${TINTA}" stroke-width="5"/>
  <rect x="240" y="115" width="135" height="18" rx="6" fill="#6E7B86" stroke="${TINTA}" stroke-width="5"/>
  <path d="M330 140 C330 320 300 420 380 520 C430 590 435 640 420 705" stroke="${TINTA}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <circle cx="418" cy="710" r="26" fill="#FFE066" opacity="0.45"/>
  <g stroke="#FFE066" stroke-width="6" stroke-linecap="round">
    <path d="M418 710 l-26 -14 M418 710 l-4 -30 M418 710 l18 -24 M418 710 l30 -6 M418 710 l-30 12 M418 710 l8 26"/>
  </g>
  <ellipse cx="420" cy="742" rx="80" ry="20" fill="none" stroke="#BFD8E6" stroke-width="5" opacity="0.8"/>
  <ellipse cx="420" cy="742" rx="130" ry="34" fill="none" stroke="#BFD8E6" stroke-width="4" opacity="0.5"/>
  <rect x="1250" y="70" width="30" height="510" fill="#6E7B86" stroke="${TINTA}" stroke-width="5"/>
  <rect x="1225" y="205" width="90" height="130" rx="18" fill="#3FA34D" stroke="${TINTA}" stroke-width="6"/>
  <g stroke="#2C7A36" stroke-width="5"><path d="M1240 225 v90 M1262 225 v90 M1284 225 v90 M1300 225 v90"/></g>
  <circle cx="1272" cy="340" r="20" fill="#FFE066" opacity="0.5"/>
  <g stroke="#FFE066" stroke-width="5" stroke-linecap="round">
    <path d="M1272 345 l-20 12 M1272 345 l22 10 M1272 345 l0 26"/>
  </g>
  <path d="M1265 70 Q1200 120 1230 200 M1285 70 Q1330 130 1290 200" stroke="${TINTA}" stroke-width="5" fill="none"/>
  <path d="M0 560 Q400 535 800 562 T1600 552 L1600 900 L0 900 Z" fill="#4E6E7E" stroke="${TINTA}" stroke-width="6"/>
  <path d="M80 620 q60 -14 120 0 q60 14 120 0 M540 660 q60 -14 120 0 q60 14 120 0 M980 640 q60 -14 120 0 q60 14 120 0" stroke="#7FA8B8" stroke-width="6" fill="none" stroke-linecap="round"/>
  <g stroke="#fff" opacity="0.4" stroke-width="5" stroke-linecap="round">
    <path d="M250 730 h70 M700 780 h90 M1100 720 h70 M420 820 h80 M1450 800 h70"/>
  </g>
  <ellipse cx="420" cy="770" rx="270" ry="62" fill="#5D8598" opacity="0.75"/>
  <g>
    <circle cx="1185" cy="612" r="30" fill="#C68955" stroke="${TINTA}" stroke-width="5"/>
    <path d="M1157 600 A30 30 0 0 1 1213 600 L1207 588 A30 30 0 0 0 1163 588 Z" fill="#5B3A1E" stroke="${TINTA}" stroke-width="3"/>
    <rect x="1150" y="645" width="70" height="150" rx="24" fill="#E5648C" stroke="${TINTA}" stroke-width="5"/>
    <path d="M1108 640 A82 70 0 0 1 1268 640 L1108 640 Z" fill="#E5484D" stroke="${TINTA}" stroke-width="6"/>
    <path d="M1188 640 V700" stroke="${TINTA}" stroke-width="7"/>
    <path d="M1168 795 L1160 852 M1204 795 L1212 852" stroke="#35A7E0" stroke-width="13" stroke-linecap="round"/>
  </g>
  <g>
    <circle cx="1330" cy="688" r="24" fill="#C68955" stroke="${TINTA}" stroke-width="5"/>
    <path d="M1308 678 A24 24 0 0 1 1352 678 L1347 668 A24 24 0 0 0 1313 668 Z" fill="#5B3A1E" stroke="${TINTA}" stroke-width="3"/>
    <rect x="1305" y="715" width="52" height="110" rx="20" fill="#F4C430" stroke="${TINTA}" stroke-width="5"/>
    <path d="M1276 712 A58 50 0 0 1 1388 712 L1276 712 Z" fill="#3FAEE4" stroke="${TINTA}" stroke-width="6"/>
    <path d="M1331 712 V742" stroke="${TINTA}" stroke-width="6"/>
    <path d="M1317 825 L1311 862 M1345 825 L1351 862" stroke="#E5484D" stroke-width="11" stroke-linecap="round"/>
  </g>
</svg>`;
}

/* ===================== CHISPA (SVG archivo) ===================== */
/* Se dibuja en assets/chispa.svg y se usa con <img> */

/* ===================== PANTALLA DE TÍTULO ===================== */

function mostrarTitulo() {
  $('#hud').classList.add('hidden');
  $('#chispa-box').classList.add('hidden');
  const record = leerRecord();
  const selloRecord = record
    ? `<div class="logo-record">🏆 Récord del escuadrón: <b>${record.puntos} pts</b> — ${escapar(record.nombre)}</div>`
    : '';
  $('#app').innerHTML = `
    <div class="pantalla-titulo">
      <img class="logo-escuadron" src="assets/chispa.svg" alt="Chispa, la iguana guía" />
      <h1 class="logo-texto">Escuadrón<br /><span>Cero Chispas</span></h1>
      <div class="logo-campana">⚡ Misión Caribe — ¡Que no se te vayan las luces! ⚡</div>
      ${selloRecord}
      <ul class="como-jugar">
        <li><span class="ico">🔍</span> Escanea la escena y toca donde veas un peligro eléctrico.</li>
        <li><span class="ico">🤔</span> Decide qué hacer eligiendo la opción segura.</li>
        <li><span class="ico">🦎</span> Escucha a la Iguana Chispa: ella te explica el porqué.</li>
        <li><span class="ico">🎓</span> Supera los 3 niveles y gana tu Carnet de Guardián de Energía.</li>
      </ul>
      <div class="tarjeta-nombre">
        <label for="input-nombre">¿Cómo te llamas, pelao?</label>
        <input id="input-nombre" maxlength="14" autocomplete="off" placeholder="Teo" />
      </div>
      <button class="btn btn-naranja" id="btn-jugar" style="font-size:1.6rem;">⚡ ¡Jugar!</button>
      <p class="pie-campana"><b>Campaña “¡Que no se te vayan las luces!”</b><br/>Desarrollado por dygeraldino y JMinotta</p>
    </div>`;
  $('#btn-jugar').addEventListener('click', () => {
    S.nombre = $('#input-nombre').value.trim() || 'Teo';
    audio(); iniciarMusica();
    SFX.clic();
    entrarNivel(0);
  });
}

/* ===================== NIVELES ===================== */

function entrarNivel(i) {
  S.nivel = i;
  S.intentosRiesgo = {};
  const nivel = NIVELES[i];
  S.resueltos[nivel.id] = new Set();

  overlay(`
    <div class="grande">${['🏠', '🏘️', '🌧️'][i]}</div>
    <h2>${nivel.nombre}</h2>
    <p>${nivel.sub}</p>
    <button class="btn btn-verde" id="btn-empezar-nivel">🔍 ¡A escanear!</button>
  `);
  $('#btn-empezar-nivel').addEventListener('click', () => {
    SFX.clic(); cerrarOverlay(); montarEscena(nivel);
    chispaDice(`¡Eso, ${S.nombre}! Las zonas con ✨ esconden peligros eléctricos. Tócalas y decide con cabeza fría.`, 7000);
  });
  callar();
  hablar(`${nivel.nombre}. ${nivel.sub}`);
}

function montarEscena(nivel) {
  $('#hud').classList.remove('hidden');
  $('#hud-nivel-nombre').textContent = nivel.nombre;
  actualizarHUDRiesgos(nivel);

  const app = $('#app');
  app.innerHTML = `
    <div class="pantalla-nivel">
      <div class="escena-marco" id="escena-marco">
        ${nivel.escena()}
        <div class="linterna" id="linterna"></div>
        ${nivel.riesgos.map(r => {
          const resuelto = S.resueltos[nivel.id].has(r.id);
          return `<button class="hotspot ${resuelto ? 'resuelto' : ''}"
            style="--x:${r.zona.x};--y:${r.zona.y};--w:${r.zona.w};--h:${r.zona.h}"
            data-riesgo="${r.id}" aria-label="${r.nombre}">
            ${resuelto ? '<span class="sticker">✓ Seguro</span>' : ''}
          </button>`;
        }).join('')}
      </div>
    </div>`;

  // Linterna que sigue el puntero (solo escritorio)
  const marco = $('#escena-marco');
  const linterna = $('#linterna');
  marco.addEventListener('pointermove', e => {
    const r = marco.getBoundingClientRect();
    linterna.style.setProperty('--lx', ((e.clientX - r.left) / r.width * 100) + '%');
    linterna.style.setProperty('--ly', ((e.clientY - r.top) / r.height * 100) + '%');
  });

  // Pista tras 25 segundos sin resolver
  clearTimeout(montarEscena._pista);
  montarEscena._pista = setTimeout(() => {
    marco.querySelectorAll('.hotspot:not(.resuelto)').forEach(h => h.classList.add('pista'));
    chispaDice('¡Pista, pelao! Las zonas con ✨ y marco naranja esconden peligros. Mira bien alrededor del agua, los enchufes y los cables.', 8000);
  }, 25000);

  marco.querySelectorAll('.hotspot').forEach(h => {
    h.addEventListener('click', () => {
      SFX.clic();
      const riesgo = nivel.riesgos.find(r => r.id === h.dataset.riesgo);
      if (!S.resueltos[nivel.id].has(riesgo.id)) abrirRiesgo(nivel, riesgo);
    });
  });
}

function actualizarHUDRiesgos(nivel) {
  $('#hud-riesgos').textContent = `${S.resueltos[nivel.id].size}/${nivel.riesgos.length}`;
}

function abrirRiesgo(nivel, riesgo) {
  const tarjeta = $('#modal-tarjeta');
  tarjeta.innerHTML = `
    <h2>${riesgo.nombre}</h2>
    <p class="pregunta">${riesgo.pregunta}</p>
    <div id="opciones"></div>
    <div id="feedback"></div>`;
  const cont = $('#opciones');

  mezclar(riesgo.opciones).forEach(op => {
    const b = document.createElement('button');
    b.className = 'opcion';
    b.textContent = op.t;
    b.addEventListener('click', () => responder(nivel, riesgo, op, b));
    cont.appendChild(b);
  });

  $('#modal').classList.remove('hidden');
  callar(); hablar(riesgo.pregunta);
}

function responder(nivel, riesgo, op, boton) {
  const fb = $('#feedback');
  if (op.ok) {
    boton.classList.add('buena');
    $('#modal-tarjeta').querySelectorAll('.opcion').forEach(o => { o.disabled = true; });
    SFX.acierto();
    const ganado = (S.intentosRiesgo[riesgo.id] || 0) === 0 ? 100 : 50;
    puntos(ganado);
    fb.innerHTML = `
      <div class="feedback-chispa exito">
        <img src="assets/chispa.svg" alt="Chispa" />
        <p>${op.why} <b>+${ganado} ⚡</b></p>
      </div>
      <div class="acciones"><button class="btn btn-verde btn-chico" id="btn-seguir">Seguir jugando ▶</button></div>`;
    callar(); hablar(op.why);
    $('#btn-seguir').addEventListener('click', () => cerrarRiesgo(nivel, riesgo));
  } else {
    S.intentosRiesgo[riesgo.id] = (S.intentosRiesgo[riesgo.id] || 0) + 1;
    boton.classList.add('mala');
    boton.disabled = true;
    boton.dataset.fallo = '1';
    SFX.error();
    destelloPeligro();
    fb.innerHTML = `
      <div class="feedback-chispa error">
        <img src="assets/chispa.svg" alt="Chispa" />
        <p>${op.why}</p>
      </div>`;
    callar(); hablar(op.why);
  }
}

function cerrarRiesgo(nivel, riesgo) {
  $('#modal').classList.add('hidden');
  S.resueltos[nivel.id].add(riesgo.id);
  clearTimeout(montarEscena._pista);
  actualizarHUDRiesgos(nivel);

  const h = document.querySelector(`.hotspot[data-riesgo="${riesgo.id}"]`);
  if (h) {
    h.classList.remove('pista');
    h.classList.add('resuelto');
    h.innerHTML = '<span class="sticker">✓ Seguro</span>';
  }

  if (S.resueltos[nivel.id].size === nivel.riesgos.length) {
    setTimeout(bajonDeLuz, 700);
  }
}

/* ---------- Bajón de luz + minijuego ---------- */

function bajonDeLuz() {
  SFX.powerDown();
  callar();
  const mensajesBajon = [
    '¡Bajón de luz! Se fue la corriente en toda la casa. Ayuda a llegar la energía de forma segura hasta el tablero.',
    '¡Otro bajón! El barrio quedó a oscuras. Reconecta el circuito del barrio sin peligros.',
    '¡Bajón general! Con el aguacero se dañó el paso de la corriente. Reconecta la calle con cabeza fría.'
  ];
  overlay(`
    <div class="grande">🔌</div>
    <h2>¡Bajón de luz!</h2>
    <p>${mensajesBajon[S.nivel]}</p>
    <button class="btn btn-naranja" id="btn-tablero">🧩 Ir al Tablero de los Tacos</button>
  `);
  $('#btn-tablero').addEventListener('click', () => { SFX.clic(); cerrarOverlay(); mostrarTablero(); });
  hablar('¡Bajón de luz! ' + mensajesBajon[S.nivel]);
}

/* ===================== MINIJUEGO: TABLERO DE LOS TACOS ===================== */

/* Tablero serpenteante: la corriente va del poste (inicio) al aparato (fin).
   Las casillas de cable giran con un clic/tap. El filtro de protección
   (resistencia) es obligatorio: está en el único camino posible. */
const ICONOS_FIN = {
  abanico: `<circle cx="50" cy="50" r="27" fill="#BDE8FF" stroke="${TINTA}" stroke-width="5"/>
    <ellipse cx="50" cy="34" rx="7" ry="13" fill="#3FAEE4" stroke="${TINTA}" stroke-width="3"/>
    <ellipse cx="38" cy="58" rx="7" ry="13" transform="rotate(-60 38 58)" fill="#3FAEE4" stroke="${TINTA}" stroke-width="3"/>
    <ellipse cx="62" cy="58" rx="7" ry="13" transform="rotate(60 62 58)" fill="#3FAEE4" stroke="${TINTA}" stroke-width="3"/>
    <circle cx="50" cy="50" r="6" fill="${TINTA}"/>`,
  nevera: `<rect x="30" y="18" width="40" height="64" rx="8" fill="#D9CBF2" stroke="${TINTA}" stroke-width="5"/>
    <path d="M30 44 h40 M62 28 v10 M62 52 v10" stroke="${TINTA}" stroke-width="4"/>`,
  lampara: `<rect x="44" y="20" width="12" height="40" fill="#6E7B86" stroke="${TINTA}" stroke-width="4"/>
    <circle cx="50" cy="72" r="14" fill="#FFE066" stroke="${TINTA}" stroke-width="4"/>
    <path d="M38 92 h24" stroke="${TINTA}" stroke-width="5" stroke-linecap="round"/>`
};

function crearTablero(iconoFin) {
  const T = (r, c, tipo, conns) => ({ r, c, tipo, conns, rot: 0 });
  return [
    T(0, 0, 'inicio', [1]),
    T(0, 1, 'cable', [0, 2]), T(0, 2, 'filtro', [0, 2]), T(0, 3, 'cable', [0, 2]),
    T(0, 4, 'codo', [0, 1]),
    T(1, 4, 'codo', [0, 1]),
    T(1, 3, 'cable', [0, 2]), T(1, 2, 'cable', [0, 2]), T(1, 1, 'cable', [0, 2]),
    T(1, 0, 'codo', [0, 1]),
    T(2, 0, 'codo', [0, 1]),
    T(2, 1, 'cable', [0, 2]), T(2, 2, 'cable', [0, 2]), T(2, 3, 'cable', [0, 2]),
    T(2, 4, 'fin', [3], iconoFin)
  ];
}

function connsRotadas(t) { return t.conns.map(d => (d + t.rot) % 4); }

function tableroResuelto(tiles) {
  const cols = 5;
  const inicio = tiles.find(t => t.tipo === 'inicio');
  const fin = tiles.find(t => t.tipo === 'fin');
  const map = new Map(tiles.map(t => [t.r + '-' + t.c, t]));
  const visto = new Set([inicio]);
  const pila = [inicio];
  const DIRS = [[-1, 0, 0], [0, 1, 1], [1, 0, 2], [0, -1, 3]]; // [dr, dc, dir]
  while (pila.length) {
    const t = pila.pop();
    const cs = connsRotadas(t);
    for (const [dr, dc, d] of DIRS) {
      const v = map.get((t.r + dr) + '-' + (t.c + dc));
      if (!v || visto.has(v)) continue;
      if (cs.includes(d) && connsRotadas(v).includes((d + 2) % 4)) {
        visto.add(v); pila.push(v);
      }
    }
  }
  return visto.has(fin);
}

function svgTile(t, iconoFin) {
  const cable = `<path d="M50 -4 V104" stroke="${TINTA}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M50 -4 V104" stroke="#FFC93C" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  const codo = `<path d="M50 -4 V50 H104" stroke="${TINTA}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 -4 V50 H104" stroke="#FFC93C" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const filtro = `<path d="M50 -4 V104" stroke="${TINTA}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M50 -4 V30 L38 38 L62 46 L38 54 L62 62 L38 70 L50 78 V104" stroke="#FFC93C" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="28" y="36" width="44" height="30" rx="8" fill="none" stroke="${TINTA}" stroke-width="4" stroke-dasharray="6 5"/>`;
  const inicio = `<path d="M50 50 H104" stroke="${TINTA}" stroke-width="22" stroke-linecap="round"/>
    <path d="M50 50 H104" stroke="#FFC93C" stroke-width="14" stroke-linecap="round"/>
    <rect x="38" y="12" width="24" height="52" rx="6" fill="#6E7B86" stroke="${TINTA}" stroke-width="4"/>
    <rect x="26" y="20" width="48" height="9" rx="4" fill="#6E7B86" stroke="${TINTA}" stroke-width="4"/>
    <polygon points="54,70 44,88 50,88 46,100 58,82 52,82" fill="#FFE066" stroke="${TINTA}" stroke-width="2.5"/>`;
  const fin = `<path d="M-4 50 H50" stroke="${TINTA}" stroke-width="22" stroke-linecap="round"/>
    <path d="M-4 50 H50" stroke="#FFC93C" stroke-width="14" stroke-linecap="round"/>
    ${ICONOS_FIN[iconoFin] || ICONOS_FIN.abanico}`;

  const cuerpo = { cable, codo, filtro, inicio, fin }[t.tipo] || '';
  return `<svg viewBox="0 0 100 100"><g class="rotor" style="transform: rotate(${t.rot * 90}deg)">${cuerpo}</g></svg>`;
}

function mostrarTablero() {
  $('#hud').classList.remove('hidden');
  const nivel = NIVELES[S.nivel];
  const iconosFin = ['abanico', 'nevera', 'lampara'];
  const icono = iconosFin[S.nivel];
  const tiles = crearTablero(icono);

  // Revolver (sin que quede resuelto de entrada)
  tiles.filter(t => t.tipo !== 'inicio' && t.tipo !== 'fin').forEach(t => { t.rot = 1 + aleatorio(3); });
  if (tableroResuelto(tiles)) tiles[2].rot = (tiles[2].rot + 1) % 4;

  const app = $('#app');
  app.innerHTML = `
    <div class="pantalla-tablero">
      <h1>🧩 El Tablero de los Tacos</h1>
      <p class="pista-tablero">Toca las casillas para <b>girar el cableado</b> y llevar la corriente del poste al aparato.
      La casilla de <b>punteado</b> es el filtro de protección: la corriente debe pasar por ella para llegar suave y sin peligros.</p>
      <div class="tablero" id="tablero" style="--cols:5"></div>
    </div>`;

  const board = $('#tablero');
  const index = new Map(tiles.map(t => [t.r + '-' + t.c, t]));
  // Gancho de depuración/pruebas (no afecta el juego)
  window.__tablero = { tiles, resuelto: () => tableroResuelto(tiles) };

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      const t = index.get(r + '-' + c);
      const cell = document.createElement(t && t.tipo !== 'inicio' && t.tipo !== 'fin' ? 'button' : 'div');
      if (t) cell.innerHTML = svgTile(t, icono);
      if (t && t.tipo !== 'inicio' && t.tipo !== 'fin') {
        cell.className = 'casilla rodable' + (t.tipo === 'filtro' ? ' filtro' : '');
        cell.setAttribute('aria-label', 'Girar cableado');
        let resueltoYa = false;
        cell.addEventListener('click', () => {
          t.rot = (t.rot + 1) % 4;
          cell.querySelector('.rotor').style.transform = `rotate(${t.rot * 90}deg)`;
          SFX.clic();
          if (!resueltoYa && tableroResuelto(tiles)) {
            resueltoYa = true;
            board.style.pointerEvents = 'none';
            setTimeout(() => luzEncendida(), 450);
          }
        });
      } else {
        cell.className = 'casilla';
        if (t) cell.innerHTML = svgTile(t, icono);
      }
      board.appendChild(cell);
    }
  }
  // Marcar visualmente el filtro (punteado) tras crear
  const f = tiles.find(t => t.tipo === 'filtro');
  board.children[f.r * 5 + f.c]?.classList.add('filtro');

  callar(); hablar('Toca las casillas para girar el cableado y llevar la corriente del poste al aparato. No olvides el filtro de protección.');
}

function luzEncendida() {
  SFX.luzOn();
  puntos(150);
  const esUltimo = S.nivel === NIVELES.length - 1;
  overlay(`
    <div class="overlay-luces encendidas"><span>💡</span><span>💡</span><span>💡</span></div>
    <h2>¡Luz encendida!</h2>
    <p>La corriente llegó suave y segura, pasando por el filtro de protección. <b>+150 ⚡</b></p>
    <button class="btn btn-verde" id="btn-continuar">${esUltimo ? '🎓 Ir al Examen Final' : '▶ Continuar'}</button>
  `);
  $('#btn-continuar').addEventListener('click', () => {
    SFX.clic(); cerrarOverlay();
    if (esUltimo) introExamen();
    else entrarNivel(S.nivel + 1);
  });
  hablar('¡Luz encendida! La corriente llegó suave y segura.');
}

/* ===================== EXAMEN FINAL ===================== */

function introExamen() {
  $('#hud-nivel-nombre').textContent = 'Examen Final';
  $('#app').innerHTML = '';
  overlay(`
    <div class="grande">🎓</div>
    <h2>El Examen del Escuadrón</h2>
    <p><b>“Rápido y Seguro”:</b> van a caer 8 situaciones de un solo. Si lo que se hace está bien, marca <b>SEGURO</b>.
    Si hay peligro, marca <b>PELIGRO</b>. ¡Tienes 5 segundos para cada una!</p>
    <button class="btn btn-naranja" id="btn-iniciar-examen">⚡ Empezar</button>
  `);
  $('#btn-iniciar-examen').addEventListener('click', () => {
    SFX.clic(); cerrarOverlay();
    S.preguntasExamen = mezclar(BANCO_EXAMEN).slice(0, 8);
    S.idxExamen = 0;
    S.aciertosExamen = 0;
    S.falladasExamen = [];
    mostrarPreguntaExamen();
  });
  callar(); hablar('El examen del escuadrón: rápido y seguro. Ocho situaciones, cinco segundos cada una. ¡Tú puedes!');
}

function mostrarPreguntaExamen() {
  const total = S.preguntasExamen.length;
  if (S.idxExamen >= total) { mostrarCarnet(); return; }
  const q = S.preguntasExamen[S.idxExamen];

  $('#app').innerHTML = `
    <div class="pantalla-examen">
      <h1>⚡ Rápido y Seguro</h1>
      <p class="sub">Situación ${S.idxExamen + 1} de ${total} · Aciertos: <b>${S.aciertosExamen}</b></p>
      <div class="tarjeta-examen" id="tarjeta-examen">
        <div class="barra-tiempo" id="barra-tiempo"><div id="relleno-tiempo"></div></div>
        <div class="emoji-examen">${q.e}</div>
        <p class="texto-examen">${q.t}</p>
        <div class="botones-examen">
          <button class="btn btn-seguro" id="btn-seguro">✅ Seguro</button>
          <button class="btn btn-peligro" id="btn-peligro">⚠️ Peligro</button>
        </div>
        <p class="veredicto" id="veredicto"></p>
      </div>
    </div>`;

  callar(); hablar(q.t);

  // Temporizador de 5 s
  const relleno = $('#relleno-tiempo');
  relleno.style.transition = 'none';
  relleno.style.width = '100%';
  void relleno.offsetWidth; // obliga reflow para que la transición anime
  relleno.style.transition = 'width 5s linear';
  relleno.style.width = '0%';
  const tApura = setTimeout(() => $('#barra-tiempo').classList.add('apurada'), 3000);
  const tick = setInterval(() => SFX.tick(), 1000);
  const tFuera = setTimeout(() => responderExamen(null, tApura, tick), 5000);

  const limpiar = () => { clearTimeout(tFuera); clearTimeout(tApura); clearInterval(tick); };
  mostrarPreguntaExamen._limpiar = limpiar;

  $('#btn-seguro').addEventListener('click', () => responderExamen(true, tApura, tick));
  $('#btn-peligro').addEventListener('click', () => responderExamen(false, tApura, tick));
}

function responderExamen(respuesta, tApura, tick) {
  if (mostrarPreguntaExamen._limpiar) mostrarPreguntaExamen._limpiar();
  const q = S.preguntasExamen[S.idxExamen];
  const veredicto = $('#veredicto');
  const acerto = respuesta !== null && respuesta === q.seguro;

  $('#btn-seguro')?.setAttribute('disabled', '');
  $('#btn-peligro')?.setAttribute('disabled', '');
  $('#barra-tiempo')?.classList.add('apurada');

  if (acerto) {
    S.aciertosExamen++;
    puntos(50);
    SFX.acierto();
    veredicto.textContent = respuesta ? '✅ ¡Exacto! Es seguro. +50 ⚡' : '⚠️ ¡Exacto! Es peligro. +50 ⚡';
    veredicto.className = 'veredicto ok';
  } else {
    S.falladasExamen.push(q);
    SFX.error();
    veredicto.textContent = respuesta === null
      ? `⏰ ¡Se acabó el tiempo! Era ${q.seguro ? 'SEGURO ✅' : 'PELIGRO ⚠️'}`
      : `❌ Era ${q.seguro ? 'SEGURO ✅' : 'PELIGRO ⚠️'}`;
    veredicto.className = 'veredicto mal';
  }

  S.idxExamen++;
  setTimeout(mostrarPreguntaExamen, 1500);
}

/* ===================== CARNET DE GUARDIÁN ===================== */

function rangoExamen() {
  const a = S.aciertosExamen;
  if (a === 8) return { titulo: 'Guardián Experto ⚡', msg: `¡Qué pilo eres, ${S.nombre}! Recuerda: si ves algo raro con los cables o los enchufes, lo primero es avisar a un adulto.` };
  if (a >= 6) return { titulo: 'Guardián Aprendiz 🔌', msg: `¡Muy bien, ${S.nombre}! Ya casi eres experto. Recuerda: ${TIPS[S.falladasExamen[0].cat]}.` };
  return { titulo: 'Guardián Novato 🌱', msg: `¡Ánimo, ${S.nombre}! Repasa con Chispa y vuelve a intentarlo. La regla de oro: ${TIPS[S.falladasExamen[0]?.cat] || 'los aparatos eléctricos siempre con los pies secos y con ayuda de un adulto'}.` };
}

function mostrarCarnet() {
  $('#hud').classList.add('hidden');
  $('#chispa-box').classList.add('hidden');
  const rango = rangoExamen();
  const nuevoRecord = guardarRecord();
  callar(); hablar(`¡Felicidades ${S.nombre}! Eres oficialmente ${rango.titulo.replace(/[⚡🔌🌱]/g, '')}. ${rango.msg}`);

  $('#app').innerHTML = `
    <div class="pantalla-carnet">
      <div class="carnet-tarjeta" id="carnet-tarjeta">
        <h2>🎓 Carnet Oficial de<br />Guardián de Energía</h2>
        <div class="carnet-nombre">${escapar(S.nombre)}</div>
        <div class="carnet-fila">
          <span class="carnet-sello">⚡ ${S.puntos} Puntos de Energía</span>
          <span class="carnet-sello">📝 ${S.aciertosExamen}/8 en el examen</span>
          <span class="carnet-sello">${rango.titulo}</span>
          ${nuevoRecord ? '<span class="carnet-sello">🏆 ¡Nuevo récord!</span>' : ''}
        </div>
        <div class="carnet-mensaje">${rango.msg}</div>
        <div class="carnet-fila entidad">
          <span class="carnet-sello">Escuadrón Cero Chispas · Misión Caribe</span>
        </div>
        <div class="carnet-fila">
          <span class="carnet-sello"><b>Desarrollado por</b> dygeraldino · JMinotta</span>
          <span class="carnet-sello">Campaña “¡Que no se te vayan las luces!”</span>
        </div>
      </div>
      <div class="carnet-acciones">
        <button class="btn" id="btn-imprimir">🖨️ Imprimir / Guardar PDF</button>
        <button class="btn" id="btn-png">📥 Descargar PNG</button>
        <button class="btn btn-naranja" id="btn-repetir">🔁 Jugar otra vez</button>
      </div>
    </div>`;

  $('#btn-imprimir').addEventListener('click', () => { SFX.clic(); window.print(); });
  $('#btn-png').addEventListener('click', () => { SFX.clic(); descargarCarnetPNG(rango); });
  $('#btn-repetir').addEventListener('click', () => location.reload());
}

/* Dibuja el carnet en un canvas y lo devuelve. Async: espera a que las
   fuentes (Baloo 2 / Nunito) estén cargadas para no pintar el fallback. */
async function dibujarCarnet(rango) {
  await document.fonts.ready;

  const W = 1000, H = 720;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  const TINTA = '#3D2B1F';

  // Fondo degradado + tarjeta crema
  const grad = g.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#FFE082'); grad.addColorStop(1, '#FFC93C');
  g.fillStyle = grad; g.fillRect(0, 0, W, H);
  g.fillStyle = '#FFF6DF';
  g.strokeStyle = TINTA; g.lineWidth = 8;
  g.beginPath(); g.roundRect(40, 40, W - 80, H - 80, 30); g.fill(); g.stroke();

  // Rayo
  g.fillStyle = '#FFC93C'; g.lineWidth = 6;
  g.beginPath();
  g.moveTo(500, 78); g.lineTo(470, 148); g.lineTo(493, 148); g.lineTo(464, 214);
  g.lineTo(538, 132); g.lineTo(514, 132); g.lineTo(536, 78);
  g.closePath(); g.fill(); g.stroke();

  g.textAlign = 'center';

  // Título
  g.fillStyle = TINTA;
  g.font = '800 34px "Baloo 2", sans-serif';
  g.fillText('Carnet Oficial de Guardián de Energía', W / 2, 264);

  // Nombre
  g.font = '800 64px "Baloo 2", sans-serif';
  g.fillStyle = '#FF7A3D'; g.strokeStyle = TINTA; g.lineWidth = 4;
  g.strokeText(S.nombre.toUpperCase(), W / 2, 338);
  g.fillText(S.nombre.toUpperCase(), W / 2, 338);

  // Puntos y rango
  g.fillStyle = TINTA;
  g.font = '700 30px "Nunito", sans-serif';
  g.fillText(`${S.puntos} Puntos de Energía · ${S.aciertosExamen}/8 en el examen`, W / 2, 394);
  g.font = '800 36px "Baloo 2", sans-serif';
  g.fillText(rango.titulo, W / 2, 450);

  // Mensaje: ajuste de línea por ancho real (máx. 3 líneas, luego reduce letra)
  let tam = 24, lineas = [];
  const ANCHO_UTIL = 700;
  do {
    g.font = `600 ${tam}px "Nunito", sans-serif`;
    lineas = ajustarLineas(g, rango.msg, ANCHO_UTIL);
    if (lineas.length > 3) tam -= 2;
  } while (lineas.length > 3 && tam >= 20);
  const altoLinea = Math.round(tam * 1.45);
  lineas.forEach((l, i) => g.fillText(l, W / 2, 506 + i * altoLinea));

  // Sellos: bloque anclado abajo, separado del mensaje por un filete punteado
  g.strokeStyle = 'rgba(61, 43, 31, 0.4)'; g.lineWidth = 3; g.setLineDash([2, 10]);
  g.beginPath(); g.moveTo(140, 606); g.lineTo(W - 140, 606); g.stroke();
  g.setLineDash([]);
  g.fillStyle = TINTA;
  g.font = '700 22px "Baloo 2", sans-serif';
  g.fillText('Escuadrón Cero Chispas · Misión Caribe — por dygeraldino y JMinotta', W / 2, 642);
  g.font = '600 20px "Nunito", sans-serif';
  g.fillText('Campaña “¡Que no se te vayan las luces!”', W / 2, 672);

  return cv;
}

/* Parte un texto en líneas que quepan en anchoMax según la fuente activa */
function ajustarLineas(g, texto, anchoMax) {
  const lineas = [];
  let linea = '';
  for (const palabra of texto.split(' ')) {
    const prueba = linea ? linea + ' ' + palabra : palabra;
    if (linea && g.measureText(prueba).width > anchoMax) {
      lineas.push(linea);
      linea = palabra;
    } else {
      linea = prueba;
    }
  }
  if (linea) lineas.push(linea);
  return lineas;
}

async function descargarCarnetPNG(rango) {
  const cv = await dibujarCarnet(rango);
  const nombreArchivo = S.nombre.toLowerCase().replace(/[^a-z0-9ñ]+/g, '-').replace(/^-+|-+$/g, '') || 'guardian';
  const a = document.createElement('a');
  a.download = `carnet-guardian-${nombreArchivo}.png`;
  a.href = cv.toDataURL('image/png');
  a.click();
}

/* ===================== TOGGLES DE HUD ===================== */

$('#btn-voz').addEventListener('click', function () {
  S.voz = !S.voz;
  this.setAttribute('aria-pressed', S.voz);
  if (!S.voz) callar();
});
$('#btn-musica').addEventListener('click', function () {
  S.musica = !S.musica;
  this.setAttribute('aria-pressed', S.musica);
  if (!S.musica) detenerMusica(); else iniciarMusica();
});

/* ===================== ARRANQUE ===================== */

const flash = document.createElement('div');
flash.id = 'flash';
document.body.appendChild(flash);

mostrarTitulo();
