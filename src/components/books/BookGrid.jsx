export default function BookGrid({ books }) {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">Mi Biblioteca</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gray-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow hover:scale-105 transition"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="text-sm font-medium truncate">
                {book.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}