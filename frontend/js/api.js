const API_BASE = 'http://127.0.0.1:8000/api'; // Cambia por tu endpoint real

export async function fetchPreguntas() {
  const res = await fetch(`${API_BASE}/preguntas/`);
  if (!res.ok) throw new Error('Backend no disponible');
  return await res.json();
}

export async function guardarUsuario(data) {
  // data debe tener la estructura:
  // {
  //   nombre: string,
  //   email: string,
  //   edad: number,
  //   respuestas: object,
  //   recomendacion: string
  // }
  const res = await fetch(`${API_BASE}/usuarios/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al guardar usuario');
  return await res.json();
}