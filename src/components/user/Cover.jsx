export default function Cover({ cover }) {
  return (
    <div
      className="h-44 bg-pink-300 dark:bg-zinc-800"
      style={
        cover
          ? { backgroundImage: `url(${cover})`, backgroundSize: 'cover' }
          : {}
      }
    />
  )
}