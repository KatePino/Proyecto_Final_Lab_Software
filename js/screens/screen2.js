import { fetchCarreraRecomendada } from '../api.js';
import { crearElemento } from '../utils.js';

export default async function renderScreen2(respuestas, onGuardar) {
  const data = await fetchCarreraRecomendada(respuestas);

  const app = document.createElement('div');
  app.appendChild(crearElemento('h2', {}, 'Recomendación de carrera'));
  app.appendChild(crearElemento('div', {}, data.titulo));
  app.appendChild(crearElemento('p', {}, data.descripcion));
  const btn = crearElemento('button', {}, 'Guardar');
  btn.onclick = () => onGuardar(data);
  app.appendChild(btn);

  return app;
}