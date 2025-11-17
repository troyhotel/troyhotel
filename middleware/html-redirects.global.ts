// /middleware/html-redirects.global.ts
import { defineEventHandler, getRequestURL, sendRedirect } from "h3";

const redirects: Record<string, string> = {
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

const normalizeKey = (k: string) => (k.startsWith("/") ? k : "/" + k);

export default defineEventHandler((event) => {
  try {
    // Если это prerender/внутренний вызов — event.node.req может отсутствовать.
    // Тогда пропускаем чтобы не ломать prerenderring.
    const nodeReq = event.node?.req;
    if (!nodeReq) return;

    const urlObj = getRequestURL(event);
    const rawPath = urlObj?.pathname || "/";
    let pathname: string;
    try {
      pathname = decodeURIComponent(rawPath);
    } catch {
      pathname = rawPath; // если decode выкинет — используем сырое значение
    }

    // Accept может быть отсутствующим — в этом случае всё равно реагируем на явные .html
    const accept = (nodeReq.headers?.accept || "").toLowerCase();

    // если это явно не HTML и путь не заканчивается на .html — пропускаем
    if (!accept.includes("text/html") && !pathname.endsWith(".html")) return;

    // нормализуем словарь редиректов (ключи в декодированном виде, с leading slash)
    const normalizedRedirects: Record<string, string> = Object.fromEntries(
      Object.entries(redirects).map(([k, v]) => [
        normalizeKey(decodeURIComponent(k)),
        v,
      ])
    );

    // поиск: exact (с учётом регистра) -> exact lowercased -> по имени файла -> по имени lowercased
    const tryLookup = (p: string) =>
      normalizedRedirects[p] ||
      normalizedRedirects[p.toLowerCase()] ||
      normalizedRedirects[normalizeKey(p.split("/").pop() || "")] ||
      normalizedRedirects[normalizeKey((p.split("/").pop() || "").toLowerCase())];

    let target = tryLookup(pathname);

    // ещё попытка — иногда в redirects ключи могут быть без ведущего слеша
    if (!target && pathname.startsWith("/")) {
      target = tryLookup(pathname.slice(1));
    }

    if (target && target !== pathname) {
      return sendRedirect(event, target, 301);
    }

    // fallback: любая *.html -> убрать .html
    if (pathname.endsWith(".html")) {
      const newPath = pathname.replace(/\.html$/, "") || "/";
      if (newPath !== pathname) {
        return sendRedirect(event, newPath, 301);
      }
    }
  } catch (err) {
    // не ломаем prerenderring — логируем и продолжаем
    // eslint-disable-next-line no-console
    console.error("[html-redirects] error:", err);
    return;
  }
});
