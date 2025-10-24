// /middleware/html-redirects.global.ts
import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  // Проверяем, что event и req реально есть
  if (!event?.req) return

  const url = getRequestURL(event)

  // Если URL заканчивается на .html
  if (url.pathname.endsWith('.html')) {
    const newPath = url.pathname.replace(/\.html$/, '')
    return sendRedirect(event, newPath, 301) // постоянный редирект на новый маршрут
  }
})
