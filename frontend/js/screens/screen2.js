import { crearElemento } from '../utils.js';

export default async function renderScreen2(carrera, onGuardar, respuestas, preguntas) {
  const app = document.createElement('div');
  app.appendChild(crearElemento('h2', {}, 'Recomendación de carrera'));
  app.appendChild(crearElemento('div', {}, carrera));
  // Puedes agregar una breve descripción si lo deseas
  const btn = crearElemento('button', {}, 'Guardar');
  btn.onclick = () => onGuardar(respuestas, preguntas, carrera);
  app.appendChild(btn);
  return app;
}