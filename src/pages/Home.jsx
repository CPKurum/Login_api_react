import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-blue-200 px-4">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 text-center">
        Pantalla principal sobre la vista de registro e ingreso del usuario
      </h1>

      <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">

        <Link
          to="/login"
          className="w-full sm:w-auto text-center rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="w-full sm:w-auto text-center rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        >
          Registro
        </Link>

      </nav>

    </div>
  )
}