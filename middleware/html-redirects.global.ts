// /middleware/html-redirects.global.ts
import { defineEventHandler, getRequestURL, sendRedirect } from "h3";

const redirects: Record<string, string> = {
  // конкретные старые → новые
  "/about.html": "/",
  "/akcii.html": "/",
  "/banket.html": "/banquet",
  "/nomera.html": "/rooms",
  "/spa.html": "/spa",
  "/svoiludi.html": "/restaurant",
  "TROY - Стандарт DBL.html": "/rooms/dbl",
  "TROY - Стандарт TWIN.html": "/rooms/twin",
  "TROY - СТАНДАРТ ОДНОМЕСТНЫЙ.html": "/rooms/single",
  "TROY - СТАНДАРТ ТРЁХМЕСТНЫЙ.html": "/rooms/triple",
  "TROY - Студия.html": "/rooms/studia",
  "TROY - ЛЮКС.html": "/rooms/luxe",
  "TROY - Аппартаменты.html": "/rooms/apart",
  "/konferenc.html": "/conference",
};

const normalizeKey = (k: string) => {
  if (!k) return "/";
  return k.startsWith("/") ? k : "/" + k;
};

export default defineEventHandler((event) => {
  try {
    const url = getRequestURL(event);
    const rawPath = url.pathname || "/";
    // декодируем (чтобы запросы с %20 и %D0... корректно сравнивались)
    const pathname = decodeURIComponent(rawPath);

    // НЕ трогаем не-HTML запросы (favicon, картинки, api, css и т.п.)
    const accept = event.node?.req?.headers?.accept || "";
    if (!accept.includes("text/html")) return;

    // подготовим нормализованный словарь переадресаций (ключи декодированы и с ведущим '/')
    const normalizedRedirects: Record<string, string> = Object.fromEntries(
      Object.entries(redirects).map(([k, v]) => [
        normalizeKey(decodeURIComponent(k)),
        v,
      ])
    );

    // 1) попытка точного совпадения по полному пути
    let target = normalizedRedirects[pathname];

    // 2) попытка совпадения по имени файла (последний сегмент), например "TROY - ... .html"
    if (!target) {
      const fileName = pathname.split("/").pop() || "";
      if (fileName) {
        target = normalizedRedirects[normalizeKey(fileName)];
      }
    }

    // 3) если есть совпадение — редиректим (и предотвращаем петли)
    if (target && target !== pathname) {
      return sendRedirect(event, target, 301);
    }

    // 4) общий fallback: любая страница *.html -> убрать .html
    if (pathname.endsWith(".html")) {
      const newPath = pathname.replace(/\.html$/, "") || "/";
      if (newPath !== pathname) {
        return sendRedirect(event, newPath, 301);
      }
    }
  } catch (err) {
    // логируем, но НЕ кидаем ошибку — чтобы пререндер не падал
    // (в проде можно отправлять в логи или Sentry)
    // eslint-disable-next-line no-console
    console.error("[html-redirects] error:", err);
    return; // не ломаем выполнение
  }
});
