'use client'

import Image from 'next/image'

export default function PhotoScreen() {
  // Используйте эти пути для реальных фотографий:
  // /images/groom-child.jpg и /images/bride-child.jpg
  const groomPhoto = '/images/groom-child.jpg'
  const bridePhoto = '/images/bride-child.jpg'
  
  // Проверка наличия изображений (можно заменить на реальную проверку)
  const hasGroomPhoto = false // Установите true, когда добавите изображение
  const hasBridePhoto = false // Установите true, когда добавите изображение

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 py-8 sm:py-16">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800">Наша история</h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed px-4">
            Когда-то мы были просто детьми с мечтами о будущем...
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8 sm:mt-12">
          <div className="flex flex-col items-center space-y-4">
            {hasGroomPhoto ? (
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-lg relative">
                <Image
                  src={groomPhoto}
                  alt="Жених в детстве"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, 256px"
                />
              </div>
            ) : (
              <div className="w-48 h-48 sm:w-64 sm:h-64 bg-pink-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                <span className="text-pink-400 text-5xl sm:text-6xl">👦</span>
              </div>
            )}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Жених</h3>
            <p className="text-gray-600 text-center px-4 text-sm sm:text-base">
              Детская фотография жениха
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            {hasBridePhoto ? (
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-lg relative">
                <Image
                  src={bridePhoto}
                  alt="Невеста в детстве"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, 256px"
                />
              </div>
            ) : (
              <div className="w-48 h-48 sm:w-64 sm:h-64 bg-pink-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                <span className="text-pink-400 text-5xl sm:text-6xl">👧</span>
              </div>
            )}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Невеста</h3>
            <p className="text-gray-600 text-center px-4 text-sm sm:text-base">
              Детская фотография невесты
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
