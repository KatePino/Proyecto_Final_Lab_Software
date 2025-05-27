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
  const conteo = {};
  Object.entries(respuestasSeleccionadas).forEach(([pregId, respId]) => {
    const pregunta = preguntas.find(p => p.id === Number(pregId));
    if (!pregunta) return;
    const respuesta = pregunta.respuestas.find(r => String(r.id).trim() === String(respId).trim());
    if (respuesta && respuesta.carrera) {
      conteo[respuesta.carrera] = (conteo[respuesta.carrera] || 0) + 1;
    }
  });
  const valores = Object.values(conteo);
  let max = valores.length > 0 ? Math.max(...valores) : 0;
  if (valores.length === 0 || max === 0) return 'No se pudo determinar una carrera recomendada.';
  const recomendadas = Object.entries(conteo)
    .filter(([carrera, count]) => count === max && count > 0)
    .map(([carrera]) => carrera);
  if (recomendadas.length === 1) return recomendadas[0];
  if (recomendadas.length > 1) return 'Empate: ' + recomendadas.join(' / ');
  return 'No se pudo determinar una carrera recomendada.';
}