const API_BASE = 'https://tu-backend.com/api'; // Cambia por tu endpoint real

export async function fetchPreguntas() {
  const res = await fetch(`${API_BASE}/preguntas/`);
  return res.json();
}

export async function fetchCarreraRecomendada(respuestas) {
  const res = await fetch(`${API_BASE}/recomendar/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ respuestas })
  });
  return res.json();
}

export async function guardarUsuario(data) {
  const res = await fetch(`${API_BASE}/usuarios/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}