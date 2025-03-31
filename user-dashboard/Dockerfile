# Используем Node.js как базовый образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app


# Копируем весь проект
COPY . .

RUN npm install -g pnpm@latest-10

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile --force


# Собираем проект (если используется Next.js или другой фреймворк)
RUN pnpm run build

# Указываем порт, который будет использовать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["pnpm", "start"]