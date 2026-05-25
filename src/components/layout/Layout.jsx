import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main>
        {children}
      </main>

    </div>
  )
}