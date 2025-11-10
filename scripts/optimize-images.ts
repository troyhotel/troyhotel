import fs from "fs";
import path from "path";
import sharp from "sharp";
import { globby } from "globby";

const publicDir = path.resolve("./public");

// Какие расширения оптимизируем
const exts = ["jpg", "jpeg", "png", "webp"];

// Файлы, которые НЕ нужно трогать (относительно publicDir)
const excludeFiles = [
  "logo.png",
  "home/advantages/hotel-recommend.jpg",
  "home/advantages/yandex-badge.png"
];

async function optimizeImages() {
  // Ищем файлы, исключая папку original
  const files = await globby(`**/*.{${exts.join(",")}}`, { 
    cwd: publicDir,
    ignore: ["original/**", "favicon/**"]
  });

  console.log(`🖼 Найдено ${files.length} изображений для оптимизации...`);

  for (const file of files) {
    // Пропускаем конкретные файлы из excludeFiles
    if (excludeFiles.includes(file.replace(/\\/g, "/"))) {
      console.log(`⏭ Пропущено: ${file}`);
      continue;
    }

    const filePath = path.join(publicDir, file);
    const buffer = fs.readFileSync(filePath);

    try {
      const image = sharp(buffer);

      if (/\.(jpe?g)$/i.test(file)) {
        await image.jpeg({ quality: 80, mozjpeg: true }).toFile(filePath);
      } else if (/\.png$/i.test(file)) {
        await image.png({ compressionLevel: 9 }).toFile(filePath);
      } else if (/\.webp$/i.test(file)) {
        await image.webp({ quality: 80 }).toFile(filePath);
      }

      console.log(`✅ Оптимизировано: ${file}`);
    } catch (e) {
      console.error(`❌ Ошибка при обработке ${file}:`, e);
    }
  }

  console.log("✨ Оптимизация завершена!");
}

optimizeImages();
