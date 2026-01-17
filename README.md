# Свадебное приглашение

Мобильное веб-приложение для свадебного приглашения с тремя экранами и функцией подтверждения присутствия через email.

## Технологии

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Nodemailer

## Структура проекта

- `app/` - основные страницы и API routes
- `components/` - React компоненты (TitleScreen, PhotoScreen, InvitationScreen)
- `app/api/confirm/` - API endpoint для отправки email уведомлений

## Настройка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env.local` на основе `.env.example` и заполните переменные окружения:
   - `SMTP_HOST` - SMTP сервер (например, smtp.gmail.com)
   - `SMTP_PORT` - порт SMTP (обычно 587 для TLS или 465 для SSL)
   - `SMTP_USER` - ваш email для отправки
   - `SMTP_PASS` - пароль приложения (для Gmail используйте App Password)
   - `RECIPIENT_EMAIL` - email для получения уведомлений о подтверждениях

3. Запустите dev сервер:
```bash
npm run dev
```

4. Откройте [http://localhost:3000](http://localhost:3000)

## Деплой

### Вариант 1: Vercel (Рекомендуется для Next.js)

Vercel - это платформа, созданная разработчиками Next.js, обеспечивающая оптимальную производительность.

**Шаги:**

1. **Загрузите проект в репозиторий:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Импортируйте проект в Vercel:**
   - Перейдите на [vercel.com](https://vercel.com)
   - Войдите через GitHub/GitLab/Bitbucket
   - Нажмите "Add New Project"
   - Выберите ваш репозиторий
   - Vercel автоматически определит Next.js

3. **Настройте Environment Variables:**
   - В настройках проекта перейдите в "Environment Variables"
   - Добавьте следующие переменные:
     - `SMTP_HOST` (например, `smtp.gmail.com`)
     - `SMTP_PORT` (например, `587`)
     - `SMTP_USER` (ваш email)
     - `SMTP_PASS` (пароль приложения)
     - `RECIPIENT_EMAIL` (email для уведомлений)

4. **Деплой:**
   - Нажмите "Deploy"
   - Деплой произойдет автоматически
   - После завершения вы получите URL вида `your-project.vercel.app`

**Преимущества:**
- Бесплатный план для личных проектов
- Автоматический деплой при push в репозиторий
- Оптимизация для Next.js из коробки
- SSL сертификаты автоматически

---

### Вариант 2: Собственный сервер (VPS)

Для деплоя на собственный сервер (например, DigitalOcean, Hetzner, AWS EC2).

**Требования:**
- Сервер с Ubuntu/Debian
- Node.js 18+ и npm
- PM2 для управления процессом (опционально)
- Nginx для reverse proxy (рекомендуется)

**Шаги:**

1. **Подключитесь к серверу:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Установите Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Клонируйте проект:**
   ```bash
   git clone <your-repo-url> wedding-invitation
   cd wedding-invitation
   ```

4. **Установите зависимости:**
   ```bash
   npm install
   ```

5. **Создайте файл `.env.local`:**
   ```bash
   nano .env.local
   ```
   Добавьте все переменные окружения (SMTP_HOST, SMTP_PORT, и т.д.)

6. **Соберите проект:**
   ```bash
   npm run build
   ```

7. **Установите PM2 (для управления процессом):**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "wedding-invitation" -- start
   pm2 save
   pm2 startup
   ```

8. **Настройте Nginx (опционально, но рекомендуется):**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/wedding-invitation
   ```
   
   Добавьте конфигурацию:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Активируйте конфигурацию:
   ```bash
   sudo ln -s /etc/nginx/sites-available/wedding-invitation /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Настройте SSL с Let's Encrypt (рекомендуется):**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

**Управление:**
- Перезапуск: `pm2 restart wedding-invitation`
- Просмотр логов: `pm2 logs wedding-invitation`
- Статус: `pm2 status`

---

### Вариант 3: Railway

Railway - простая платформа для деплоя с автоматической настройкой.

**Шаги:**

1. Перейдите на [railway.app](https://railway.app)
2. Войдите через GitHub
3. Нажмите "New Project" → "Deploy from GitHub repo"
4. Выберите ваш репозиторий
5. В настройках проекта добавьте Environment Variables
6. Railway автоматически определит Next.js и выполнит деплой

---

### Вариант 4: Netlify

**Шаги:**

1. Перейдите на [netlify.com](https://netlify.com)
2. Войдите через GitHub
3. Нажмите "Add new site" → "Import an existing project"
4. Выберите репозиторий
5. Настройки сборки:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Добавьте Environment Variables в настройках
7. Нажмите "Deploy site"

**Примечание:** Для Next.js API routes на Netlify может потребоваться дополнительная настройка через Netlify Functions.

---

## Переменные окружения

Создайте файл `.env.local` (для локальной разработки) или настройте Environment Variables на платформе деплоя:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=recipient@example.com
```

**Для Gmail:**
- Включите двухфакторную аутентификацию
- Создайте App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
- Используйте App Password вместо обычного пароля

## Замена фотографий

Замените placeholder изображения в `components/PhotoScreen.tsx` на реальные фотографии:
- Добавьте изображения в `public/images/`
- Обновите компонент для использования реальных изображений

## Примечания

- Приложение оптимизировано для мобильных устройств
- Для Gmail требуется создать App Password (не обычный пароль)
- Рекомендуется настроить rate limiting для production использования
