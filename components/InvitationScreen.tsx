'use client'

import { useState } from 'react'

export default function InvitationScreen() {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() || 'Гость' }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setName('')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-pink-50 px-4 py-8 sm:py-16">
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-pink-800 px-4">
          Мы будем рады видеть вас!
        </h2>
        
        <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg px-4">
          <p>
            Дорогие друзья и близкие!
          </p>
          <p>
            Мы приглашаем вас разделить с нами один из самых важных дней в нашей жизни.
          </p>
          <p>
            Ваше присутствие сделает этот день особенным и незабываемым.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 sm:mt-12 space-y-5 sm:space-y-6 max-w-md mx-auto px-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-700 text-left text-sm sm:text-base">
              Ваше имя (необязательно)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base min-h-[44px]"
              placeholder="Введите ваше имя"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 sm:py-5 bg-pink-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-pink-700 active:bg-pink-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[48px] touch-manipulation"
          >
            {isSubmitting ? 'Отправка...' : 'Я буду'}
          </button>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-100 text-green-700 rounded-lg text-sm sm:text-base">
              Спасибо! Мы получили ваше подтверждение.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base">
              Произошла ошибка. Пожалуйста, попробуйте еще раз.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
