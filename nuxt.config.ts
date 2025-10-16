// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "@/assets/main.css",
    "@/assets/base.css",
    "@/assets/fonts/fonts.css",
  ],

  devtools: { enabled: false },

  // enable takeover mode
  typescript: { shim: false },

  ssr: true,

  runtimeConfig: {
    // приватные переменные, доступны только на сервере
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailTo: process.env.MAIL_TO, // адрес, куда приходят заявки
  },

  modules: ["nuxt-swiper"],
  nitro: {
    preset: "node", // Или другое, если необходимо
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
      // Pre-render the homepage
      routes: ["/"],
      // Then crawl all the links on the page
      crawlLinks: true,
    },
    experimental: {
      openAPI: true,
      websocket: false
    },
  },

  app: {
    head: {
      title: "Мягкие окна из ПВХ | Утепление и теплоизоляция для вашего дома",
      link: [
        // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://plenochnieokna.com" },
      ],
      meta: [
        {
          name: "description",
          content:
            "Мягкие окна и пленочные окна из ПВХ - отличный выбор для утепления и защиты вашего дома. Узнайте о преимуществах и особенностях ПВХ окон для дачи и террас.",
        },
        {
          name: "keywords",
          content:
            "мягкие окна, пленочные окна, окна из ПВХ, теплоизоляция, пластиковые окна, окна для дачи, окна для террасы, утепление окон, ПВХ окна",
        },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Мягкие окна" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          property: "og:title",
          content: "Мягкие, пленочные окна из ПВХ | Утепление и теплоизоляция для вашего дома",
        },
        {
          property: "og:description",
          content:
            "Мягкие, пленочные окна из ПВХ - лучший выбор для утепления вашего дома и дачи. Преимущества теплоизоляции, долговечности и легкости в обслуживании.",
        },
        {
          property: "og:image",
          content: "https://picloud.cc/images/9b7e0b37b66e1ed4ac250884e645b4d5.jpg",
        },
        { property: "og:url", content: "https://plenochnieokna.com" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:site_name", content: "Мягкие, пленочные окна из ПВХ" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Мягкие, пленочные окна из ПВХ | Утепление и теплоизоляция для вашего дома",
        },
        {
          name: "twitter:description",
          content:
            "Мягкие, пленочные окна из ПВХ для дачи и террас. Отличная теплоизоляция и защита от внешних факторов.",
        },
        {
          name: "twitter:image",
          content: "https://picloud.cc/images/9b7e0b37b66e1ed4ac250884e645b4d5.jpg",
        },
      ],
      script: [
        {
          type: 'text/javascript',
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
        {
          type: 'text/javascript',
          innerHTML: `
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3536149", type: "pageView", start: (new Date()).getTime(), pid: "USER_ID"});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
          `,
        },
      ],
      noscript: [
        {
          innerHTML: `<div><img src="https://top-fwz1.mail.ru/counter?id=3538859;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>`
        },
        {
          innerHTML: `<div><img src="https://top-fwz1.mail.ru/counter?id=3536149;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>`
        }
      ],
    },
    pageTransition: {
      name: "fade-soft", // Ключевое имя перехода
      mode: "out-in", // Режим: "out-in" или "in-out"
      appear: true, // Включение анимации при первой загрузке страницы
      css: true, // Включение/отключение CSS-анимаций (для анимаций через JS установите false)
      duration: { enter: 300, leave: 300 }, // Продолжительность входа/выхода в мс
    },
  },

  compatibilityDate: "2024-07-15",
});