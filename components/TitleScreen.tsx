'use client'

export default function TitleScreen() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white px-4 py-8">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-pink-800 leading-tight">
          Приглашение на свадьбу
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-pink-400 mx-auto mt-6"></div>
        <p className="text-pink-600 text-base sm:text-lg mt-8">
          Скроллите вниз, чтобы узнать больше
        </p>
      </div>
    </section>
  )
}
