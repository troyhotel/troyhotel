import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { globby } from 'globby'

const publicDir = path.resolve('./public')

// Какие расширения оптимизируем
const exts = ['jpg', 'jpeg', 'png', 'webp']

async function optimizeImages() {
  const files = await globby(`**/*.{${exts.join(',')}}`, { cwd: publicDir })

  console.log(`🖼 Найдено ${files.length} изображений для оптимизации...`)

  for (const file of files) {
    const filePath = path.join(publicDir, file)
    const buffer = fs.readFileSync(filePath)

    try {
      const image = sharp(buffer)

      await image
        .jpeg({ quality: 80, mozjpeg: true })
        .png({ compressionLevel: 9 })
        .toFile(filePath)

      console.log(`✅ Оптимизировано: ${file}`)
    } catch (e) {
      console.error(`❌ Ошибка при обработке ${file}:`, e)
    }
  }

  console.log('✨ Оптимизация завершена!')
}

optimizeImages()
