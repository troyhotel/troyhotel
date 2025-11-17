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

export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  // Специальный редирект по точному соответствию
  const match = redirects[url.pathname];
  if (match) {
    return sendRedirect(event, match, 301);
  }

  // Общий редирект для всех остальных .html
  if (url.pathname.endsWith(".html")) {
    const newPath = url.pathname.replace(/\.html$/, "");
    return sendRedirect(event, newPath, 301);
  }
});
