import { fetchPreguntas } from '../api.js';
import { crearElemento } from '../utils.js';

export default async function renderScreen1(onFinalizar) {
  const preguntas = await fetchPreguntas();
  let current = 0;
  // Cambiamos respuestas a un objeto para asociar pregunta y respuesta
  const respuestas = {};

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
    // Guardar la respuesta asociada a la pregunta
    respuestas[preguntas[current].id] = seleccionada.value;
    if (current < preguntas.length - 1) {
      current++;
      renderPregunta(current);
    } else {
      // Calcular recomendación (la carrera más seleccionada)
      const conteo = {};
      Object.values(respuestas).forEach(val => {
        // Buscar la respuesta seleccionada en todas las preguntas
        let respObj = null;
        for (const pregunta of preguntas) {
          respObj = pregunta.respuestas.find(r => r.id === val);
          if (respObj) break;
        }
        if (respObj) {
          conteo[respObj.carrera] = (conteo[respObj.carrera] || 0) + 1;
        }
      });
      let recomendacion = '';
      let max = 0;
      for (const [carrera, count] of Object.entries(conteo)) {
        if (count > max) {
          max = count;
          recomendacion = carrera;
        }
      }
      onFinalizar(respuestas, preguntas, recomendacion);
    }
  };

  renderPregunta(current);
  return app;
}