import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cover from '../components/user/Cover'
import Profile from '../components/user/Profile'
import BookGrid from '../components/books/BookGrid'
import { getCurrentUser, getPublicUserByUsername } from '../api/auth'

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

        if (hasToken) {
          try {
            const currentUser = await getCurrentUser()
    
            if (
              isMounted &&
              currentUser?.username &&
              currentUser.username === routeUsername
            ) {
              setIsOwner(true)
            }
          } catch {
            // fallback a público
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

  const books = [
    { id: 1, title: 'Solo Leveling', cover: 'https://picsum.photos/200/300?random=1' },
    { id: 2, title: 'Overlord', cover: 'https://picsum.photos/200/300?random=2' },
    { id: 3, title: 'Re:Zero', cover: 'https://picsum.photos/200/300?random=3' },
    { id: 4, title: 'Classroom of the Elite', cover: 'https://picsum.photos/200/300?random=4' },
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

      {isOwner && <BookGrid books={books} />}

    </div>
  )
}