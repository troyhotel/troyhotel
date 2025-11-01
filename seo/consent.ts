// ~/seo/consent.ts
export const consentSEO = {
  title: "Согласие на обработку персональных данных – Парк-отель «Троя»",
  meta: [
    {
      name: "description",
      content:
        "Подтвердите согласие на обработку персональных данных на сайте Парк-отеля «Троя». Узнайте, как мы защищаем и обрабатываем информацию гостей для бронирования, обратной связи и информирования о акциях."
    },
    {
      name: "keywords",
      content:
        "Парк-отель Троя, согласие на обработку данных, персональные данные, защита информации, бронирование отеля, политика конфиденциальности"
    },
    {
      property: "og:title",
      content: "Согласие на обработку персональных данных – Парк-отель «Троя»"
    },
    {
      property: "og:description",
      content:
        "Подтверждение согласия на обработку персональных данных гостей Парк-отеля «Троя». Информация о защите и использовании данных для бронирования и акций."
    },
    { property: "og:type", content: "website" },
    { property: 'og:image', content: 'https://troy-hotel.ru/home/home-2.jpg' },
    { property: "og:url", content: "https://troy-hotel.ru/consent" }
  ],
  link: [
    {
      rel: "canonical",
      href: "https://troy-hotel.ru/consent"
    }
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Согласие на обработку персональных данных – Парк-отель «Троя»",
        url: "https://troy-hotel.ru/consent",
        description:
          "Страница с информацией о согласии на обработку персональных данных на сайте Парк-отеля «Троя».",
        publisher: {
          "@type": "Organization",
          name: "Парк-отель «Троя»",
          url: "https://troy-hotel.ru"
        }
      }, null, 2)
    }
  ]
}
