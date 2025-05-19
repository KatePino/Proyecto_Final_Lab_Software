import { guardarUsuario } from '../api.js';
import { crearElemento } from '../utils.js';

export default function renderScreen3(onGuardado) {
  const form = crearElemento('form');
  form.appendChild(crearElemento('h2', {}, 'Tus datos'));

  const fields = [
    { label: 'Identificación', name: 'identificacion', type: 'text', required: true },
    { label: 'Nombre', name: 'nombre', type: 'text', required: true },
    { label: 'Teléfono', name: 'telefono', type: 'tel', required: true },
    { label: 'Correo', name: 'correo', type: 'email', required: true }
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
    await guardarUsuario(data);
    onGuardado();
  };

  return form;
}