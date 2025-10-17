import fs from "fs";
import path from "path";

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else if (/\.(jpe?g|png|webp)$/i.test(file.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

export default defineEventHandler(() => {
  const roomsDir = path.resolve("./public/rooms");
  const rooms: Record<string, string[]> = {};

  try {
    const files = getAllFiles(roomsDir);

    for (const filePath of files) {
      const fileName = path.basename(filePath);
      const match = fileName.match(/^([a-z0-9]+)-\d+/i);
      if (!match) continue;
      const slug = match[1];
      if (!rooms[slug]) rooms[slug] = [];

      rooms[slug].push(`/rooms/rooms/${fileName}?v=${Date.now()}`); // избегаем кеширования, для реактивного обновлениия картинок
    }

    // Сортировка
    for (const slug in rooms) {
      rooms[slug].sort((a, b) => {
        const numA = parseInt(a.match(/-(\d+)/)?.[1] || "0");
        const numB = parseInt(b.match(/-(\d+)/)?.[1] || "0");
        return numA - numB;
      });
    }

    return rooms;
  } catch (err) {
    console.error(err);
    return {};
  }
});
