import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../api/auth'  // <--- IMPORTANTE

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', nickname: '' })
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleFile = (e) => setPerfil(e.target.files[0] ?? null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
  
    function toNaiveDateTimeISO(d = new Date()) {
      const pad = (n) => String(n).padStart(2, '0')
      const Y = d.getFullYear()
      const M = pad(d.getMonth() + 1)
      const D = pad(d.getDate())
      const h = pad(d.getHours())
      const m = pad(d.getMinutes())
      const s = pad(d.getSeconds())
      return `${Y}-${M}-${D}T${h}:${m}:${s}`
    }
    
    const data = {
      username: form.username,
      email: form.email,
      password_hash: form.password,
      nickname: form.nickname ?? null,
      perfil: perfil ?? null,
      actualizacion: toNaiveDateTimeISO()
    }
    console.log("DATA ENVIADA:", data)
    try {
      const result = await registerUser(data)  // llamada a auth.js
      setSuccess('Usuario registrado correctamente')
      localStorage.setItem('token', result.token)  // guardar JWT
      setForm({ username: '', email: '', password: '', nickname: '' })
      setPerfil(null)
    } catch (err) {
      // manejar errores por status
      switch (err.status) {
        case 400:
          setError(err.message)
          break
        case 409:
          setError(err.message)
          break
        default:
          setError(err.message || 'Error en el servidor')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-96 space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold">Registro</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* INPUTS */}
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} value={form.username} className="w-full rounded border p-2" />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={form.email} className="w-full rounded border p-2" />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={form.password} className="w-full rounded border p-2" />
        <input type="text" name="nickname" placeholder="Nickname (opcional)" onChange={handleChange} value={form.nickname} className="w-full rounded border p-2" />

        <div>
          <label className="text-sm text-gray-600">Foto de perfil</label>
          <input type="file" accept="image/*" onChange={handleFile} className="w-full" />
        </div>

        <button type="submit" disabled={loading} className={`w-full rounded p-2 text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-green-600 underline">Iniciar sesión</Link>
        </p>
      </form>
    </div>
  )
}