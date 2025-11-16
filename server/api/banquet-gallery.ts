import { promises as fs } from "fs";
import path from "path";

export default defineEventHandler(async () => {
  try {
    // Путь до папки с фотографиями банкетов
    const dir = path.join(process.cwd(), "public/banquet/gallery");

    // Получаем список файлов
    const files = await fs.readdir(dir);

    // Разрешённые типы файлов
    const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

    // Фильтрация и сортировка по имени (по желанию можно по дате)
    const images = files
      .filter((file) => allowedExt.includes(path.extname(file).toLowerCase()))
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
      )
      .map((file) => ({
        src: `/banquet/gallery/${file}`,
        alt: path.parse(file).name.replace(/[_-]/g, " "),
      }));

    return images;
  } catch (err) {
    console.error("Ошибка при чтении banquet/gallery:", err);
    return [];
  }
});
