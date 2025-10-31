// server/api/restaurant-gallery.get.ts
import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async () => {
  const galleryDir = join(process.cwd(), 'public/restaurant/gallery')
  const files = (await fs.readdir(galleryDir))
    .filter(file => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .map((file, index) => ({
      src: `/restaurant/gallery/${file}`,
      alt: `Фото ${index + 1}`
    }))
  return files
})
