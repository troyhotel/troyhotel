// ~/seo/restaurant.ts
export const restaurantSEO = {
  title: "Ресторан «Свои Люди» – уют, вкусная еда и особая атмосфера в Парк-отеле «Троя»",
  meta: [
    {
      name: "description",
      content:
        "Ресторан «Свои Люди» в Парк-отеле «Троя» предлагает разнообразное меню, свежие блюда, уютный летний дворик и банкетные залы. Закажите столик онлайн и насладитесь атмосферой гостеприимства."
    },
    {
      name: "keywords",
      content:
        "Ресторан Свои Люди, Парк-отель Троя, заказать столик, банкетный зал, летний дворик, вкусная еда, ужин, обед, десерты, блюда из мяса и рыбы"
    },
    { property: "og:title", content: "Ресторан «Свои Люди» – уют и вкусная еда в Парк-отеле «Троя»" },
    {
      property: "og:description",
      content:
        "Посетите ресторан «Свои Люди» в Парк-отеле «Троя» – вкусная еда, банкетные залы, летний дворик, особая атмосфера и возможность забронировать столик онлайн."
    },
    { property: "og:type", content: "website" },
    { property: 'og:image', content: 'https://troy-hotel.ru/restaurant/XXXL1.jpg' },
    { property: "og:url", content: "https://troy-hotel.ru/restaurant" }
  ],
  link: [
    { rel: "canonical", href: "https://troy-hotel.ru/restaurant" }
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: "Ресторан «Свои Люди»",
        image: [
          "https://troy-hotel.ru/restaurant/restaurant-1.jpg",
          "https://troy-hotel.ru/restaurant/restaurant-2.jpg",
          "https://troy-hotel.ru/restaurant/restaurant-3.jpg"
        ],
        url: "https://troy-hotel.ru/restaurant",
        telephone: "+7 (993) 303-75-25",
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. 1 Мая, 131",
          addressLocality: "Краснодар",
          addressCountry: "RU"
        },
        servesCuisine: ["Европейская", "Русская", "Азиатская"],
        menu: "https://troy-hotel.ru/restaurant#menu",
        acceptsReservations: "True",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://troy-hotel.ru/restaurant"
        },
        hasMenu: [
          {
            "@type": "Menu",
            name: "Горячее и мясо",
            url: "https://troy-hotel.ru/restaurant#menu",
            hasMenuItem: [
              { "@type": "MenuItem", name: "Сковородка с курицей / со свининой" },
              { "@type": "MenuItem", name: "Филе утки" },
              { "@type": "MenuItem", name: "Стейк из сёмги, говядины" },
              { "@type": "MenuItem", name: "Филе судака в сливочно-шпинатном соусе" }
            ]
          }
        ]
      }, null, 2)
    }
  ]
}
