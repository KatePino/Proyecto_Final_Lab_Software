import { guardarUsuario } from '../api.js';
import { crearElemento } from '../utils.js';

export default function renderScreen3(onGuardado, respuestas, recomendacion) {
  const form = crearElemento('form');
  form.appendChild(crearElemento('h2', {}, 'Tus datos'));

  const fields = [
    { label: 'Nombre', name: 'nombre', type: 'text', required: true },
    { label: 'Correo', name: 'email', type: 'email', required: true },
    { label: 'Edad', name: 'edad', type: 'number', required: true }
  ];

  fields.forEach(f => {
    const group = crearElemento('div', { class: 'form-group' });
    group.appendChild(crearElemento('label', {}, f.label));
    group.appendChild(crearElemento('input', {
      name: f.name,
      type: f.type,
      required: f.required
    }));
    form.appendChild(group);
  });

  const btn = crearElemento('button', { type: 'submit' }, 'Guardar');
  form.appendChild(btn);

  form.onsubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // Convertir edad a número
    data.edad = parseInt(data.edad, 10);
    // Agregar respuestas y recomendacion
    data.respuestas = respuestas || {};
    data.recomendacion = recomendacion || '';
    await guardarUsuario(data);
    onGuardado();
  };

  return form;
}