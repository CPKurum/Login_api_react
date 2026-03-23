import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    nickname: '',
  })

  const [perfil, setPerfil] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleFile = (e) => {
    setPerfil(e.target.files[0] ?? null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('username', form.username)
    data.append('email', form.email)
    data.append('password', form.password)
    data.append('nickname', form.nickname)
    if (perfil) {
      data.append('perfil', perfil)
    }

    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        body: data,
      })

      const result = await res.json()
      console.log(result)
      alert('Usuario registrado')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 space-y-4 rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold">Registro</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <input
          type="text"
          name="nickname"
          placeholder="Nickname (opcional)"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <div>
          <label className="text-sm text-gray-600">Foto de perfil</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Registrarse
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-green-600 underline">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  )
}
