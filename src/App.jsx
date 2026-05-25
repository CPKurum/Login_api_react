import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import User from './pages/User.jsx'
import NewBook from './pages/NewBook.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/libro" element={<NewBook />} />
        {/* <Route path="/me" element={<Dashboard />} /> */}
        <Route path="/user/:username" element={<User />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

//todo #[post("/login")] fn login_usuario(user:<LoginAccount>) // ingresar con usuario y contraseña, salida un token
//todo #[post("/register")] fn insert_login(user:<NuevoAccount>) // Registrar un nuevo usario con las validado, salida un token
// #[get("/me")] fn get_user(req: HttpRequest) // Validamos y mostramos la información del usuario usando un token, salida data
//todo #[get("/user/{username_link}")] fn get_user_page(name:<String>) // Página publica del usuario.

// #[get("/user/{username}/libros")] fn get_libros_publicos_x_user(username:<String>) // todos los libros públicos de un usuario
// #[get("/me/libros")] fn get_all_books_user(req: HttpRequest) // Validamos token, y mostramos todos los libros de 1 usuario
// #[post("/me/libros")] fn post_books_x_user(param:<NuevoLibroUsuario>) // Registrar la relación entre un libro y usuario. Tabla relacional, salida id
// #[get("/me/sufle_libro")] fn get_books_x_user(id: Path<i32>) // Obtener varias tablas sql, de libros, relacionadas sobre 1 user