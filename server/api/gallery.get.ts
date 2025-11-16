// server/api/gallery.get.ts
import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async () => {
  const galleryDir = path.resolve('public/home/gallery')

  try {
    const files = await fs.readdir(galleryDir)

    // Фильтруем только картинки
    const imageFiles = files.filter(f =>
      /\.(jpg|jpeg|png|webp|avif)$/i.test(f)
    )

    // Сортировка по имени (с поддержкой цифр)
    imageFiles.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    )

    // Формируем массив
    const images = imageFiles.map(file => ({
      src: `/home/gallery/${file}`,
      alt: file.replace(/\.[^.]+$/, ''), // alt без расширения
    }))

    return images
  } catch (err) {
    console.error('Ошибка при чтении галереи:', err)
    return []
  }
})
