export function crearElemento(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  });
  return el;
}
export function recomendarCarrera(respuestasSeleccionadas, preguntas) {
  const conteo = {
    'ingenieria de sistemas': 0,
    'ingenieria electronica': 0,
    'arte': 0,
    'derecho': 0,
    'administración': 0
  };
  // Soportar tanto array como objeto
  if (Array.isArray(respuestasSeleccionadas)) {
    respuestasSeleccionadas.forEach((respId, idx) => {
      const pregunta = preguntas[idx];
      const respuesta = pregunta.respuestas.find(r => r.id === respId);
      if (respuesta && conteo[respuesta.carrera] !== undefined) {
        conteo[respuesta.carrera]++;
      }
    });
  } else if (typeof respuestasSeleccionadas === 'object' && respuestasSeleccionadas !== null) {
    Object.entries(respuestasSeleccionadas).forEach(([pregId, respId]) => {
      const pregunta = preguntas.find(p => p.id == pregId);
      const respuesta = pregunta?.respuestas.find(r => r.id === respId);
      if (respuesta && conteo[respuesta.carrera] !== undefined) {
        conteo[respuesta.carrera]++;
      }
    });
  }
  let recomendada = null;
  let max = -1;
  for (const [carrera, count] of Object.entries(conteo)) {
    if (count > max) {
      max = count;
      recomendada = carrera;
    }
  }
  return recomendada;
}