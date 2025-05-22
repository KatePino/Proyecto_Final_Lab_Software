import renderScreen1 from './screens/screen1.js';
import renderScreen2 from './screens/screen2.js';
import renderScreen3 from './screens/screen3.js';
import { recomendarCarrera } from './utils.js';

const appDiv = document.getElementById('app');

let globalRespuestas = {};
let globalPreguntas = [];
let globalCarrera = '';

async function showScreen1() {
  appDiv.innerHTML = '';
  const screen = await renderScreen1(async (respuestas, preguntas, recomendacion) => {
    globalRespuestas = respuestas;
    globalPreguntas = preguntas;
    globalCarrera = recomendacion;
    showScreen2(respuestas, preguntas, recomendacion);
  });
  appDiv.appendChild(screen);
}

async function showScreen2(respuestas, preguntas, recomendacion) {
  const carrera = recomendacion || recomendarCarrera(respuestas, preguntas);
  appDiv.innerHTML = '';
  const screen = await renderScreen2(carrera, (res, preg, rec) => {
    showScreen3(res || globalRespuestas, rec || carrera);
  }, respuestas, preguntas);
  appDiv.appendChild(screen);
}

function showScreen3(respuestas, recomendacion) {
  appDiv.innerHTML = '';
  const screen = renderScreen3(() => {
    appDiv.innerHTML = '<h2>¡Gracias! Tus datos han sido guardados.</h2>';
  }, respuestas, recomendacion);
  appDiv.appendChild(screen);
}

showScreen1();