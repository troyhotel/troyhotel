// ~/seo/privacy.ts
export const privacySEO = {
  title: "Политика конфиденциальности Парк-отель «Троя» – защита персональных данных",
  meta: [
    {
      name: "description",
      content:
        "Ознакомьтесь с уникальной Политикой конфиденциальности Парк-отель «Троя». Узнайте, как мы собираем, обрабатываем и защищаем персональные данные гостей при бронировании и использовании сайта."
    },
    {
      name: "keywords",
      content:
        "Troy Hotel, политика конфиденциальности, персональные данные, защита данных, бронирование отеля, безопасность информации"
    },
    {
      property: "og:title",
      content: "Политика конфиденциальности Парк-отель «Троя» – защита персональных данных"
    },
    {
      property: "og:description",
      content:
        "Уникальная Политика конфиденциальности Парк-отель «Троя». Как мы собираем, обрабатываем и защищаем персональные данные гостей."
    },
    { property: "og:type", content: "website" },
    { property: 'og:image', content: 'https://troy-hotel.ru/home/home-2.jpg' },
    { property: "og:url", content: "https://troy-hotel.ru/privacy" }
  ],
  link: [
    { rel: "canonical", href: "https://troy-hotel.ru/privacy" }
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Политика конфиденциальности Парк-отель «Троя»",
        url: "https://troy-hotel.ru/privacy",
        description:
          "Ознакомьтесь с уникальной Политикой конфиденциальности Парк-отель «Троя». Узнайте, как мы собираем, обрабатываем и защищаем персональные данные гостей при бронировании и использовании сайта.",
        publisher: {
          "@type": "Organization",
          name: "Парк-отель «Троя»",
          url: "https://troy-hotel.ru",
          logo: "https://troy-hotel.ru/logo.png"
        },
        mainEntity: {
          "@type": "CreativeWork",
          name: "Политика конфиденциальности",
          text: "Настоящая Политика конфиденциальности персональных данных действует в отношении всей информации, которая расположена на сайте https://troy-hotel.ru и может быть получена о Пользователе во время использования сайта, программ и продуктов..."
        }
      }, null, 2)
    }
  ]
}
