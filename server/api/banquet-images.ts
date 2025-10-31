import { promises as fs } from "fs";
import path from "path";

export default defineEventHandler(async () => {
  // Путь к папке с изображениями
  const imagesDir = path.join(process.cwd(), "public", "banquet", "banquet");

  try {
    // Читаем все файлы из папки
    const files = await fs.readdir(imagesDir);

    // Фильтруем только картинки
    const imageFiles = files
      .filter((file) => /\.(jpe?g|png|webp|avif|gif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    // Возвращаем публичные пути
    return imageFiles.map((file) => `/banquet/banquet/${file}`);
  } catch (err) {
    console.error("Ошибка при чтении папки с изображениями:", err);
    return [];
  }
});
