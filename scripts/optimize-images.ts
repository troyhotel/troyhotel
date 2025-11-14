import fs from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";
import { globby } from "globby";

const publicDir = path.resolve("./public");
const originalDir = path.join(publicDir, "original");
const hashFile = path.resolve("./.image-hashes.json");

const exts = ["jpg", "jpeg", "png", "webp"];

const excludeFiles = [
  "logo.png",
  "home/advantages/hotel-recommend.jpg",
  "home/advantages/yandex-badge.png"
];

// Загружаем хеши предыдущих оптимизаций
let hashes: Record<string, string> = {};
if (fs.existsSync(hashFile)) {
  hashes = JSON.parse(fs.readFileSync(hashFile, "utf-8"));
}

function getFileHash(buffer: Buffer): string {
  return crypto.createHash("md5").update(buffer).digest("hex");
}

async function optimizeImages() {
  const files = await globby(`**/*.{${exts.join(",")}}`, {
    cwd: publicDir,
    ignore: ["original/**", "favicon/**"]
  });

  console.log(`🖼 Найдено ${files.length} изображений`);

  for (const file of files) {
    const normalized = file.replace(/\\/g, "/");

    // Пропускаем исключения
    if (excludeFiles.includes(normalized)) {
      console.log(`⏭ Пропущено по исключению: ${normalized}`);
      continue;
    }

    const filePath = path.join(publicDir, normalized);

    if (!fs.existsSync(filePath)) continue;

    const buffer = fs.readFileSync(filePath);
    const currentHash = getFileHash(buffer);

    // Если файл уже оптимизирован → пропускаем
    if (hashes[normalized] === currentHash) {
      console.log(`✔ Уже оптимизировано: ${normalized}`);
      continue;
    }

    try {
      const image = sharp(buffer);

      if (/\.(jpe?g)$/i.test(normalized)) {
        await image.jpeg({ quality: 80, mozjpeg: true }).toFile(filePath);
      } else if (/\.png$/i.test(normalized)) {
        await image.png({ compressionLevel: 9 }).toFile(filePath);
      } else if (/\.webp$/i.test(normalized)) {
        await image.webp({ quality: 80 }).toFile(filePath);
      }

      // сохраняем новый хеш
      const newBuffer = fs.readFileSync(filePath);
      const newHash = getFileHash(newBuffer);
      hashes[normalized] = newHash;

      console.log(`✅ Оптимизировано: ${normalized}`);
    } catch (err) {
      console.error(`❌ Ошибка при обработке ${normalized}:`, err);

      // Переносим плохой файл в original
      const destPath = path.join(originalDir, normalized);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });

      fs.renameSync(filePath, destPath);

      console.log(`⚠ Файл перемещён в original/: ${normalized}`);
    }
  }

  // сохраняем хеши
  fs.writeFileSync(hashFile, JSON.stringify(hashes, null, 2), "utf-8");

  console.log("✨ Оптимизация завершена!");
}

optimizeImages();
