export default function Profile({ nickname, username, perfil }) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-4 -mt-12">
        
        <img
          src={perfil}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900 shadow-md"
        />

        <div>
          <h1 className="text-xl font-semibold">{nickname}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            @{username}
          </p>
        </div>
      </div>
    </div>
  )
}