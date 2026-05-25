import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-900 px-6 py-4 text-white shadow">

      <Link to="/" className="text-xl font-bold" >
        MiApp
      </Link>

      <nav className="flex gap-4">
        <Link to="/user/libro" className="hover:text-blue-400" >
          Nuevo Libro
        </Link>
        <Link to="/login" className="hover:text-blue-400" >
          Login
        </Link>
        <Link to="/register" className="hover:text-blue-400" >
          Registro
        </Link>

      </nav>

    </header>
  )
}