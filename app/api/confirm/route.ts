import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body

    // Получение переменных окружения
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const recipientEmail = process.env.RECIPIENT_EMAIL

    // Валидация переменных окружения
    if (!smtpHost || !smtpUser || !smtpPass || !recipientEmail) {
      console.error('Missing SMTP configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Создание транспортера
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    // Проверка соединения
    await transporter.verify()

    // Формирование сообщения
    const mailOptions = {
      from: smtpUser,
      to: recipientEmail,
      subject: `Подтверждение присутствия на свадьбе${name ? ` от ${name}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #f3f4f6;
                border-top: none;
                border-radius: 0 0 10px 10px;
              }
              .info {
                background: #f9fafb;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="color: #9f1239; margin: 0;">🎉 Новое подтверждение!</h1>
            </div>
            <div class="content">
              <p>Получено подтверждение присутствия на свадьбе.</p>
              <div class="info">
                <strong>Имя гостя:</strong> ${name || 'Не указано'}<br>
                <strong>Время:</strong> ${new Date().toLocaleString('ru-RU', { 
                  timeZone: 'Europe/Moscow',
                  dateStyle: 'long',
                  timeStyle: 'medium'
                })}
              </div>
              <p>Поздравляем! Еще один гость подтвердил свое присутствие.</p>
            </div>
          </body>
        </html>
      `,
      text: `Подтверждение присутствия на свадьбе${name ? ` от ${name}` : ''}\n\nВремя: ${new Date().toLocaleString('ru-RU')}`,
    }

    // Отправка email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { success: true, message: 'Confirmation sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send confirmation' },
      { status: 500 }
    )
  }
}
