// seo/conference.ts
export const conferenceJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Конференц-зал в Парк-отеле «Троя»",
  url: "https://troy-hotel.ru/conference",
  description:
    "Организуйте деловые встречи, тренинги, презентации и мастер-классы в современном конференц-зале Парк-отеля «Троя». Просторный зал для до 50 участников с полным оснащением и дополнительными сервисами.",
  mainEntity: {
    "@type": "EventVenue",
    name: "Конференц-зал Парк-отеля «Троя»",
    description:
      "Современный конференц-зал для деловых встреч, тренингов и мастер-классов.",
    image: [
      "https://troy-hotel.ru/conference/XXXL1.jpg",
      "https://troy-hotel.ru/conference/conference-1.jpg",
      "https://troy-hotel.ru/conference/conference-2.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. 1 Мая, 131",
      addressLocality: "Краснодар",
      addressCountry: "RU",
    },
    event: [
      {
        "@type": "Event",
        name: "Бизнес-встречи, тренинги, мероприятия",
        description:
          "Профессиональная атмосфера с полным техническим оснащением для эффективной работы.",
      },
      {
        "@type": "Event",
        name: "Нетворкинги",
        description:
          "Пространство, где удобно знакомиться, обмениваться опытом и налаживать деловые связи.",
      },
      {
        "@type": "Event",
        name: "Мастер-классы и презентации",
        description:
          "Удобная рассадка, проектор, экран и зоны для демонстрации продуктов или обучения.",
      },
      {
        "@type": "Event",
        name: "Форумы",
        description:
          "Вместимость до 50 человек, гибкие форматы посадки и сопровождение персонального менеджера.",
      },
    ],
  },
};
