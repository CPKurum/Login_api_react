import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    console.log("📤 DATA QUE SE ENVÍA:", data) // 👈 AQUÍ
    try {
      const result = await loginUser(data)
      console.log("📥 RESPUESTA DEL SERVIDOR:", result) // 👈 AQUÍ
      // guardar token
      localStorage.setItem('token', result.token)
      console.log("Login.jsx 📥 TOKEN EN LOCAL STORAGE:", result.token) // 👈 AQUÍ
      // redirigir al perfil publico/privado unificado
      const profileUsername = result?.username ?? data.username
      navigate(`/user/${profileUsername}`)

    } catch (err) {
      console.error("❌ ERROR:", err) // 👈 AQUÍ
      setError(err.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 space-y-4 rounded-xl bg-white p-8 shadow-lg"
        >
        <h2 className="text-center text-2xl font-bold">Login</h2>
        {error && ( <p className="text-red-600 text-sm text-center"> {error} </p> )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Iniciar sesión
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 underline">
            Registrarse
          </Link>
        </p>
      </form>
    </div>
  )
}