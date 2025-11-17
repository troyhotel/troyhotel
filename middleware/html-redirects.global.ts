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
    // если event.node или req нет — значит это prerender, пропускаем
    if (!event.node?.req) return;

    const url = getRequestURL(event);
    const rawPath = url.pathname || "/";
    const pathname = decodeURIComponent(rawPath);

    // НЕ трогаем не-HTML запросы (favicon, картинки, api, css и т.п.)
    const accept = event.node.req.headers.accept || "";
    if (!accept.includes("text/html")) return;

    const normalizedRedirects: Record<string, string> = Object.fromEntries(
      Object.entries(redirects).map(([k, v]) => [
        normalizeKey(decodeURIComponent(k)),
        v,
      ])
    );

    // 1) точное совпадение
    let target = normalizedRedirects[pathname];

    // 2) совпадение по имени файла
    if (!target) {
      const fileName = pathname.split("/").pop() || "";
      if (fileName) {
        target = normalizedRedirects[normalizeKey(fileName)];
      }
    }

    // 3) редирект при совпадении
    if (target && target !== pathname) {
      return sendRedirect(event, target, 301);
    }

    // 4) общий fallback: *.html -> без .html
    if (pathname.endsWith(".html")) {
      const newPath = pathname.replace(/\.html$/, "") || "/";
      if (newPath !== pathname) {
        return sendRedirect(event, newPath, 301);
      }
    }
  } catch (err) {
    console.error("[html-redirects] error:", err);
    return;
  }
});
