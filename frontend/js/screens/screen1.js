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
      // Calcular recomendación (la carrera más seleccionada, considerando empates)
      const conteo = {};
      Object.entries(respuestas).forEach(([preguntaId, respId]) => {
        const pregunta = preguntas.find(p => p.id === Number(preguntaId));
        if (!pregunta) return;
        const respObj = pregunta.respuestas.find(r => r.id === respId);
        if (respObj && respObj.carrera) {
          conteo[respObj.carrera] = (conteo[respObj.carrera] || 0) + 1;
        } else {
          console.warn('Respuesta sin carrera:', respObj, 'en pregunta', pregunta);
        }
      });
      console.log('Conteo de carreras:', conteo);
      // Encuentra el máximo
      let max = Math.max(...Object.values(conteo));
      // Filtra todas las carreras con ese máximo
      const recomendadas = Object.entries(conteo)
        .filter(([carrera, count]) => count === max && count > 0)
        .map(([carrera]) => carrera);
      let recomendacion = '';
      if (recomendadas.length === 1) {
        recomendacion = recomendadas[0];
      } else if (recomendadas.length > 1) {
        // Elegir aleatoriamente una de las empatadas
        recomendacion = recomendadas[Math.floor(Math.random() * recomendadas.length)];
      } else {
        recomendacion = '';
      }
      onFinalizar(respuestas, preguntas, recomendacion);
    }
  };

  renderPregunta(current);
  return app;
}