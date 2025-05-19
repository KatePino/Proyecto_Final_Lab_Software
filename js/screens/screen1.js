import { fetchPreguntas } from '../api.js';
import { crearElemento } from '../utils.js';

export default async function renderScreen1(onFinalizar) {
  const preguntas = await fetchPreguntas();
  let current = 0;
  const respuestas = [];

  const app = document.createElement('div');
  const logo = crearElemento('img', { src: 'assets/iush-logo.png', class: 'logo', alt: 'IUSH' });
  app.appendChild(logo);

  const form = crearElemento('form');
  app.appendChild(form);

  function renderPregunta(idx) {
    form.innerHTML = '';
    const pregunta = preguntas[idx];
    form.appendChild(crearElemento('h2', {}, `Pregunta ${idx + 1}`));
    form.appendChild(crearElemento('div', {}, pregunta.texto));
    pregunta.respuestas.forEach((resp, i) => {
      const label = crearElemento('label', { class: 'form-group' });
      const radio = crearElemento('input', {
        type: 'radio',
        name: 'respuesta',
        value: resp.id,
        required: true
      });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + resp.texto));
      form.appendChild(label);
    });

    const btn = crearElemento('button', { type: 'submit' }, idx === preguntas.length - 1 ? 'Finalizar' : 'Siguiente');
    form.appendChild(btn);
  }

  form.onsubmit = e => {
    e.preventDefault();
    const seleccionada = form.querySelector('input[name="respuesta"]:checked');
    if (!seleccionada) return;
    respuestas[current] = seleccionada.value;
    if (current < preguntas.length - 1) {
      current++;
      renderPregunta(current);
    } else {
      onFinalizar(respuestas);
    }
  };

  renderPregunta(current);
  return app;
}