import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createBook } from '../api/derivado/book'

export default function NewBook() {
  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const [data, setData] = useState({
    titulo: '',
    perfil: '', // imágen, url, string,
    sinopsis: '',
    tipo: '',
    capitulos: '',
    estado: '',
    visibilidad: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError(null)

    try {
      await createBook(data)

      navigate('/')

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-4 rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-800"
      >

        <h2 className="text-center text-2xl font-bold dark:text-white">
          Nuevo Libro
        </h2>

        {error && (
          <p className="text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={data.titulo}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          name="perfil"
          placeholder="Perfil o imagen"
          value={data.perfil}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <textarea
          name="sinopsis"
          placeholder="Sinopsis"
          value={data.sinopsis}
          onChange={handleChange}
          className="min-h-32 w-full rounded border p-3"
        />

        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={data.tipo}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          name="capitulos"
          placeholder="Capítulos"
          value={data.capitulos}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={data.estado}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <label className="flex items-center gap-2 dark:text-white">

          <input
            type="checkbox"
            name="visibilidad"
            checked={data.visibilidad}
            onChange={handleChange}
          />

          Público

        </label>

        <button
          type="submit"
          className="w-full rounded bg-green-500 p-3 text-white hover:bg-green-600"
        >
          Añadir libro
        </button>

      </form>

    </div>
  )
}