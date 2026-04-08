const API_BASE = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:5330'

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log("RESPUESTA DEL SERVIDOR:", res)
  const result = await res.json()

  if (!res.ok) {
    const error = new Error(result.error || 'Error en el registro')
    error.status = res.status
    throw error
  }

  return result
}