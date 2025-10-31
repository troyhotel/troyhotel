// nuxt.config.ts
import { execSync } from "child_process";

export default defineNuxtConfig({
  css: ["@/assets/main.css", "@/assets/base.css", "@/assets/fonts/fonts.css"],

  hooks: {
    "nitro:build:before"() {
      console.log("🚀 Оптимизация изображений перед сборкой...");
      execSync("npx tsx scripts/optimize-images.ts", { stdio: "inherit" });
    },
  },

  devtools: { enabled: true },
  typescript: { shim: false },
  ssr: true,

  runtimeConfig: {
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailTo: process.env.MAIL_TO,
  },

  modules: ["nuxt-swiper"],

  nitro: {
    preset: "node-server",
    routeRules: {
      "/api/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    },
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
    experimental: { openAPI: true, websocket: false },
  },

  app: {
    head: {
      title: "Парк-отель «Троя» в Краснодаре – отдых с комфортом",
      htmlAttrs: { lang: "ru" },
      link: [
        { rel: "canonical", href: "https://troy-hotel.ru" },

        // Фавиконы
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon/favicon-96x96.png",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
      ],
      meta: [
        { name: "author", content: "Парк-отель Троя" },
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          name: "description",
          content:
            "Парк-отель «Троя» в Краснодаре – комфортные номера, СПА, банкетные залы, ресторан. Забронируйте отдых с выгодой и получите привилегии.",
        },
        {
          name: "keywords",
          content:
            "Парк-отель Троя, отель Краснодар, номера в Краснодаре, отдых в Краснодаре, банкетный зал, СПА, отдых с привилегиями, бронирование номера",
        },

        // Open Graph (Facebook, VK, Telegram)
        {
          name: "author",
          content: "Парк-отель Троя, разработка Илья Чернышевский",
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:url", content: "https://troy-hotel.ru" },
        {
          property: "og:title",
          content: "Парк-отель «Троя» – отдых с комфортом в Краснодаре",
        },
        {
          property: "og:description",
          content:
            "Комфортные номера, СПА, банкетные залы и ресторан. Забронируйте отдых с выгодой и наслаждайтесь привилегиями.",
        },
        { property: "og:image", content: "https://troy-hotel.ru/og-image.jpg" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Парк-отель «Троя» – отдых с комфортом в Краснодаре",
        },
        {
          name: "twitter:description",
          content:
            "Комфортные номера, СПА, банкетные залы и ресторан. Забронируйте отдых с выгодой и наслаждайтесь привилегиями.",
        },
        {
          name: "twitter:image",
          content: "https://troy-hotel.ru/og-image.jpg",
        },
        { name: "twitter:site", content: "@TroyHotel" },

        // VK, Telegram (через OG)
        { name: "telegram:card", content: "summary_large_image" },
        {
          name: "telegram:title",
          content: "Парк-отель «Троя» – отдых с комфортом в Краснодаре",
        },
        {
          name: "telegram:description",
          content:
            "Комфортные номера, СПА, банкетные залы и ресторан. Забронируйте отдых с выгодой и наслаждайтесь привилегиями.",
        },
        {
          name: "telegram:image",
          content: "https://troy-hotel.ru/og-image.jpg",
        },

        // LinkedIn
        {
          name: "linkedin:title",
          content: "Парк-отель «Троя» – отдых с комфортом в Краснодаре",
        },
        {
          name: "linkedin:description",
          content:
            "Комфортные номера, СПА, банкетные залы и ресторан. Забронируйте отдых с выгодой и наслаждайтесь привилегиями.",
        },
        {
          name: "linkedin:image",
          content: "https://troy-hotel.ru/og-image.jpg",
        },
      ],
      script: [
        // Mail.ru метрика
        {
          type: "text/javascript",
          innerHTML: `
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3538859", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
          `,
        },
        // JSON-LD схема отеля
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            name: "Парк-отель «Троя»",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. 1 Мая, 131",
              addressLocality: "Краснодар",
              addressCountry: "Россия",
            },
            url: "https://troy-hotel.ru",
            telephone: "8 (800) 533-75-25",
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Горячая линия",
                value: "+7 (984) 704-98-62",
              },
            ],
            starRating: { "@type": "Rating", ratingValue: "4" },
            priceRange: "3000–10000 ₽",
          }),
        },
      ],
      noscript: [
        {
          innerHTML: `<div><img src="https://top-fwz1.mail.ru/counter?id=3538859;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>`,
        },
      ],
    },
  },

  compatibilityDate: "2024-07-15",
});
