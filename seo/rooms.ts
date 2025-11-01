// seo/rooms.ts
export const roomsPageSEO = {
  title: 'Номера — Парк-отель «Троя» в Краснодаре',
  meta: [
    {
      name: 'description',
      content:
        'Номера в парк-отеле «Троя» в Краснодаре: от стандартных до люксов и апартаментов. Бесплатная парковка, Wi-Fi, просторные номера, уют и комфорт.',
    },
    {
      name: 'keywords',
      content:
        'отель Троя Краснодар, номера отеля Краснодар, люкс Краснодар, апартаменты Краснодар, парк-отель Троя',
    },
    {
      property: 'og:title',
      content: 'Номера и комфорт — Парк-отель «Троя» в Краснодаре',
    },
    {
      property: 'og:description',
      content:
        'Выберите свой номер: стандартные, студии, люксы и апартаменты. Бесплатная парковка, Wi-Fi, комфортные условия для отдыха и работы.',
    },
    {
      property: 'og:image',
      content: 'https://troy-hotel.ru/rooms/XXXL1.jpg',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://troy-hotel.ru/rooms',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Номера — Парк-отель «Троя» в Краснодаре",
        "description": "Выберите свой номер в парк-отеле «Троя»: от стандартных до люксов и апартаментов. Бесплатная парковка, Wi-Fi, уют и комфорт.",
        "url": "https://troy-hotel.ru/rooms",
        "image": "https://troy-hotel.ru/rooms/XXXL1.jpg",
        "mainEntity": [
          {
            "@type": "ListItem",
            "position": 1,
            "url": "https://troy-hotel.ru/rooms/single",
            "name": "Стандарт SINGLE",
            "image": "https://troy-hotel.ru/rooms/rooms/single-1.jpg",
            "description": "Уютный одноместный номер площадью 20 кв.м с рабочей зоной, ортопедической кроватью, сейфом и мини-баром."
          },
          {
            "@type": "ListItem",
            "position": 2,
            "url": "https://troy-hotel.ru/rooms/dbl",
            "name": "Стандарт DBL",
            "image": "https://troy-hotel.ru/rooms/rooms/dbl-1.jpg",
            "description": "Номер с двуспальной кроватью площадью 28–32 кв.м. Уютный интерьер, рабочая зона, сейф и мини-бар."
          },
          {
            "@type": "ListItem",
            "position": 3,
            "url": "https://troy-hotel.ru/rooms/twin",
            "name": "Стандарт TWIN",
            "image": "https://troy-hotel.ru/rooms/rooms/twin-3.jpg",
            "description": "Номер для двух гостей с раздельными кроватями. Рабочая зона, ТВ и ванная комната."
          },
          {
            "@type": "ListItem",
            "position": 4,
            "url": "https://troy-hotel.ru/rooms/triple",
            "name": "Стандарт трехместный",
            "image": "https://troy-hotel.ru/rooms/rooms/triple-1.jpg",
            "description": "Просторный номер для трёх гостей площадью 30 кв.м. Отличный выбор для семьи или небольшой компании."
          },
          {
            "@type": "ListItem",
            "position": 5,
            "url": "https://troy-hotel.ru/rooms/studia",
            "name": "Студия",
            "image": "https://troy-hotel.ru/rooms/rooms/studia-1.jpg",
            "description": "Современная студия с открытой планировкой. Зона спальни и гостиная объединены в одном пространстве."
          },
          {
            "@type": "ListItem",
            "position": 6,
            "url": "https://troy-hotel.ru/rooms/luxe",
            "name": "Люкс",
            "image": "https://troy-hotel.ru/rooms/rooms/luxe-1.jpg",
            "description": "Двухкомнатный Люкс с отдельной спальней и гостиной зоной. Подходит для семьи или длительного проживания."
          },
          {
            "@type": "ListItem",
            "position": 7,
            "url": "https://troy-hotel.ru/rooms/apart",
            "name": "Апартаменты",
            "image": "https://troy-hotel.ru/rooms/rooms/apart-1.jpg",
            "description": "Апартаменты с кухней и гостиной площадью 62 кв.м. Отличный вариант для длительного проживания или отдыха всей семьёй."
          }
        ]
      })
    }
  ]
}
