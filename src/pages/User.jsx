import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cover from '../components/user/Cover'
import Profile from '../components/user/Profile'
import BookGrid from '../components/books/BookGrid'
import BookbyUser from '../components/books/BookbyUser'

import { getCurrentUser, getPublicUserByUsername } from '../api/auth'
import { getMyBooks } from '../api/derivado/book'

const fallbackUser = {
  nickname: 'Juan Pérez',
  username: 'juan123',
  perfil: 'https://i.pravatar.cc/150?img=3',
  cover: null,
}

export default function User() {
  const { username: routeUsername } = useParams()
  const [user, setUser] = useState(fallbackUser)
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [Libros, setLibros] = useState([])

  useEffect(() => {
    let isMounted = true

    const normalizeUser = (data) => ({
      nickname: data?.nickname ?? fallbackUser.nickname,
      username: data?.username ?? fallbackUser.username,
      perfil: data?.perfil ?? fallbackUser.perfil,
      cover: data?.cover ?? fallbackUser.cover,
    })

    const loadUser = async () => {
      try {
        const publicUser = await getPublicUserByUsername(routeUsername)
        console.log(publicUser)

        const userDatafinal = publicUser.data
    
        console.log(userDatafinal)
    
        if (isMounted) {
          setUser(normalizeUser(userDatafinal))
          setIsOwner(false)
        }
        const hasToken = Boolean(localStorage.getItem('token'))
        console.log("User.jsx: ",localStorage.getItem('token'))

        if (hasToken) {
          try {
            const currentUser = await getCurrentUser()
            console.log("📥 CURRENT USER RAW:", currentUser)
            
            if (
              isMounted &&
              currentUser?.username === routeUsername
            ) {
              setIsOwner(true)
              const currentBooks = await getMyBooks()
              setLibros(currentBooks)
              console.log(" CURRENT books raw: ", currentBooks)
            }
            
            // console.log("🧠 routeUsername:", routeUsername)
            // console.log("👤 CURRENT USER:", currentUser)
            // console.log("🔎 comparison:", currentUser?.username === routeUsername)
          } catch (err) {
            console.error("❌ ERROR getCurrentUser:", err)
          }
        }
    
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'No se pudo cargar el usuario')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    loadUser()

    return () => {
      isMounted = false
    }
  }, [routeUsername])
  console.log(Libros)
  const books = [
    { id: 1, title: 'Solo Leveling', cover: 'https://picsum.photos/300/450?random=1' },
    { id: 2, title: 'Overlord', cover: 'https://picsum.photos/300/450?random=2' },
    { id: 3, title: 'Re:Zero', cover: 'https://picsum.photos/300/450?random=3' },
    { id: 4, title: 'Classroom of the Elite', cover: 'https://picsum.photos/300/450?random=4' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white">
      {loading && <p className="p-4 text-center text-sm text-gray-500">Cargando usuario...</p>}
      {error && <p className="p-4 text-center text-sm text-red-500">{error}</p>}

      <Cover cover={user.cover} />

      <Profile
        nickname={user.nickname}
        username={user.username}
        perfil={user.perfil}
      />
      {isOwner && <BookbyUser libros={Libros} />}
      {isOwner && <BookGrid books={books} />}

    </div>
  )
}