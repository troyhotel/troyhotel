// server/api/advantages-images.get.ts
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async () => {
  const dirPath = path.resolve('./public/home/advantages/gallery') // папка с картинками блока advantages
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
    .filter(file => /\.(jpe?g|png|webp|avif)$/i.test(file)) // только картинки
    .map(file => `/home/advantages/gallery/${file}`) // путь для клиента

  return files
})
