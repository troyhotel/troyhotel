<template>
  <!--
  Gallery.vue
  Стабильная masonry-галерея с поведением, похожим на CSS `columns: N`
  - Ждёт размеров изображений (если не предоставлены) и резервирует место, чтобы избежать смещения верстки
  - Распределяет элементы по колонкам с учётом минимальной высоты и реальных пропорций изображений
  - Пересчитывает расположение при изменении размера окна с плавным появлением элементов
  - SSR-дружественная: если изображения имеют width/height, верстка сразу стабильна
  - При отсутствии естественных размеров используется fallback на пиксельную высоту (по умолчанию 250px)

  Использование:
    <Gallery :images="images" :cols="3" :gap="20" />

  Рекомендуемая структура объекта изображения:
    { src: string, alt?: string, width?: number, height?: number, id?: string }

  Особенности этой версии:
  - Использует реальные ширины колонок для расчёта высоты элементов и предотвращения мелких перепадов размеров
  - Использует вычисленные пропорции изображения для точного задания высоты (height) через inline-стиль
  - Минимальная высота элемента — 250px
  - Адаптивные колонки пересчитываются автоматически через ResizeObserver
  - Гидрация после SSR позволяет избежать мерцаний и смещений контента
  - Поддержка динамического обновления массива изображений через watch

  Примечания:
  - Лучшие результаты достигаются, если API предоставляет натуральные размеры изображений — тогда SSR может рендерить стабильный макет.
  - Эта версия вычисляет высоту изображений на JS и задаёт её через `height: Xpx;`, чтобы избежать растягивания и ошибок округления.
  - Распределение элементов идёт по колонкам с балансировкой по суммарной высоте. 
-->

  <section class="gallery" ref="root">
    <div class="container">
      <div class="gallery__inner">
        <h2 v-if="title" class="gallery__title title">{{ title }}</h2>

        <div
          class="gallery__wrap"
          :style="{
            '--cols': String(colsResolved),
            '--gap': gap + 'px',
          }"
        >
          <div
            v-for="(col, cIndex) in columns"
            :key="`col-${cIndex}`"
            class="gallery__col"
          >
            <div
              v-for="(item, i) in col"
              :key="item._key"
              class="gallery__item"
              :style="styleForItem(item)"
            >
              <FullscreenImage
                class="gallery__image"
                :src="item.src"
                :alt="item.alt || ''"
                :width="item._naturalWidth || undefined"
                :height="item._naturalHeight || undefined"
                @load="onImgLoad(item)"
                :data-src="item.src"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FullscreenImage from "~/components/FullScreenImage.vue";
import {
  ref,
  reactive,
  onMounted,
  computed,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";

// Пропсы
interface GalleryImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  id?: string;
}

const props = defineProps<{
  title?: string;
  images: GalleryImage[];
  cols?: number;
  gap?: number;
  breakpoints?: { w: number; cols: number }[];
}>();

const title = props.title || "";
const imagesProp = props.images || [];
const cols = props.cols ?? 3;
const gap = props.gap ?? 20;
const breakpoints = props.breakpoints ?? [
  { w: 1150, cols: 3 },
  { w: 710, cols: 2 },
  { w: 0, cols: 1 },
];

// Ссылки на дом-элементы и переменные
const root = ref<HTMLElement | null>(null);
const containerWidth = ref<number>(0);
const hydrated = ref(false);

// Реактивная рабочая копия изображений с дополнительными метаданными
const items = reactive(
  imagesProp.map((im, idx) => ({
    ...im,
    _key: im.id ?? `gitem-${idx}`,
    // сохраняем размеры, предоставленные сервером, если они есть
    _naturalWidth: im.width || 0,
    _naturalHeight: im.height || 0,
    _renderWidth: undefined as number | undefined,
    _renderHeight: undefined as number | undefined,
  }))
);

// вычисляем реальное количество колонок в зависимости от ширины контейнера и брейкпоинтов
const colsResolved = computed(() => {
  const w = containerWidth.value;
  for (const bp of breakpoints) {
    if (w >= bp.w) return bp.cols;
  }
  return cols;
});

// массив колонок
const columns = ref<Array<typeof items>>([]);

// ResizeObserver для отслеживания ширины родителя
let ro: ResizeObserver | null = null;

function updateContainerWidth() {
  if (!root.value) return;
  // предпочтительно измерять внутреннюю ширину .wrap (учитывает padding внутри .container/.gallery__inner)
  const wrap = root.value.querySelector(".gallery__wrap") as HTMLElement | null;
  const w = wrap
    ? wrap.clientWidth
    : root.value.clientWidth || root.value.getBoundingClientRect().width;
  containerWidth.value = Math.floor(w);
}

// Пытаемся считать размеры из HTML SSR <img width height> перед загрузкой на клиенте
function applyDomSizesFromRenderedImages() {
  if (!root.value) return;
  const imgs = Array.from(
    root.value.querySelectorAll("img.gallery__image")
  ) as HTMLImageElement[];
  if (!imgs.length) return;

  imgs.forEach((imgEl) => {
    // предпочитать явные атрибуты (SSR), затем использовать естественные размеры изображения
    const wAttr = imgEl.getAttribute("width");
    const hAttr = imgEl.getAttribute("height");
    const src = (imgEl.getAttribute("src") || imgEl.dataset.src || "").split(
      "?"
    )[0];

    const naturalW = wAttr ? parseInt(wAttr, 10) : imgEl.naturalWidth || 0;
    const naturalH = hAttr ? parseInt(hAttr, 10) : imgEl.naturalHeight || 0;
    if (!naturalW || !naturalH) return;

    // найти соответствующий элемент по src (игнорируя query string)
    const matched = items.find((it) => (it.src || "").split("?")[0] === src);
    if (matched) {
      matched._naturalWidth = naturalW;
      matched._naturalHeight = naturalH;
    }
  });
}

// Предзагрузка изображений (только на клиенте) — заполняем естественные размеры, если отсутствуют
async function preloadSizes() {
  const promises = items.map(
    (it) =>
      new Promise<void>((resolve) => {
        // если обе размерности существуют — готово
        if (it._naturalWidth && it._naturalHeight) {
          resolve();
          return;
        }
        // создаём Image вне DOM для получения размеров
        const img = new Image();
        img.src = it.src;
        img.onload = () => {
          it._naturalWidth = img.naturalWidth || it._naturalWidth || 0;
          it._naturalHeight = img.naturalHeight || it._naturalHeight || 0;
          resolve();
        };
        img.onerror = () => {
          // если изображение не загрузилось, задаём минимальные размеры, чтобы не зависнуть
          it._naturalWidth = it._naturalWidth || 1;
          it._naturalHeight = it._naturalHeight || 1;
          resolve();
        };
      })
  );
  await Promise.all(promises);
}

function distributeIntoColumnsBalanced() {
  const c = colsResolved.value || cols;
  // создаём пустые массивы для колонок
  const colsArr: any[] = Array.from({ length: c }, () => []);
  const colsHeight: number[] = Array.from({ length: c }, () => 0); // отслеживаем суммарную высоту колонки

  // вычисляем ширину колонки с учётом промежутков (gap)
  const totalGap = (c - 1) * gap;
  const columnWidth = Math.max(
    1,
    Math.floor((containerWidth.value - totalGap) / c)
  );

  items.forEach((it) => {
    // вычисляем ширину и высоту элемента для распределения по колонкам
    let renderHeight: number;
    if (it._naturalWidth && it._naturalHeight) {
      const ratio = it._naturalHeight / it._naturalWidth;
      it._renderWidth = columnWidth;
      renderHeight = Math.max(1, Math.round(columnWidth * ratio));
      it._renderHeight = renderHeight;
    } else {
      // если натуральные размеры отсутствуют — используем запасной вариант (fallback)
      it._renderWidth = columnWidth;
      it._renderHeight = 250;
      renderHeight = 250;
    }

    // ищем колонку с минимальной текущей суммарной высотой
    let minIndex = 0;
    let minHeight = colsHeight[0];
    for (let i = 1; i < c; i++) {
      if (colsHeight[i] < minHeight) {
        minHeight = colsHeight[i];
        minIndex = i;
      }
    }

    // добавляем элемент в эту колонку
    colsArr[minIndex].push(it);
    colsHeight[minIndex] += renderHeight + gap;
  });

  columns.value = colsArr;
}

async function buildLayout() {
  // получаем ширину контейнера
  updateContainerWidth();

  // пытаемся получить размеры из SSR HTML (если сервер уже задал width/height)
  applyDomSizesFromRenderedImages();

  // предзагружаем размеры для остальных элементов
  await preloadSizes();

  // распределяем элементы по колонкам
  distributeIntoColumnsBalanced();

  // помечаем, что компонент гидрирован на клиенте
  hydrated.value = true;
}

function onImgLoad(item: any) {
  // пустая функция: размеры уже вычислены заранее; оставлено, чтобы избежать предупреждений
}

// возвращаем строку стиля с рассчитанной высотой элемента
function styleForItem(it: any): string | undefined {
  const columnWidth = it._renderWidth || 0;
  if (it._naturalWidth && it._naturalHeight && columnWidth) {
    // если известны натуральные размеры изображения, вычисляем точную высоту по ширине колонки
    let height = Math.round(
      (it._naturalHeight / it._naturalWidth) * columnWidth
    );
    if (height < 250) height = 250; // минимальная высота — 250px, чтобы избежать слишком маленьких блоков
    return `width: 100%; height: ${height}px;`;
  }

  if (it._renderHeight) {
    const height = Math.max(it._renderHeight, 250);
    return `width: 100%; height: ${height}px;`;
  }

  return `width: 100%; min-height: 250px;`;
}

onMounted(async () => {
  // задаём начальную ширину
  updateContainerWidth();

  // отслеживаем изменение размеров
  if (typeof ResizeObserver !== "undefined" && root.value) {
    ro = new ResizeObserver(() => {
      updateContainerWidth();
      // перестраиваем layout на nextTick (небольшая дебаунс-имитация через микрозадачу)
      nextTick(() => {
        distributeIntoColumnsBalanced();
      });
    });
    ro.observe(root.value);
  }

  // построение layout (пытаемся считать размеры из SSR -> предзагрузка -> распределение)
  await buildLayout();
});

onBeforeUnmount(() => {
  if (ro && root.value) ro.unobserve(root.value);
});

// отслеживаем изменение пропса images
watch(
  () => props.images,
  (newVal) => {
    // обновляем реактивный массив элементов (простая замена)
    items.splice(
      0,
      items.length,
      ...newVal.map((im, idx) => ({
        ...im,
        _key: im.id ?? `gitem-${idx}`,
        _naturalWidth: im.width || 0,
        _naturalHeight: im.height || 0,
        _renderWidth: undefined,
        _renderHeight: undefined,
      }))
    );

    // перестраиваем layout на клиенте
    nextTick(() => buildLayout());
  },
  { deep: true }
);
</script>

<style scoped>
.gallery {
  width: 100%;
}

.gallery__inner {
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-radius: 60px;
  padding: 50px;
  background: var(--white);
}

.gallery__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  color: var(--noble-black-600);
}

/* Outer wrap that holds columns */
.gallery__wrap {
  display: flex;
  gap: var(--gap);
  align-items: flex-start; /* columns align to top */
}

/* Column container */
.gallery__col {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.gallery__item {
  width: 100%;
  overflow: hidden;
  transition: transform 280ms ease, opacity 280ms ease;
  will-change: transform, opacity;
}

.gallery__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  vertical-align: middle;
  border-radius: 45px;
}

/* Hover effect similar to original */
.gallery__item:hover {
  transform: translateY(-6px) scale(1.01);
}

/* Responsive tweaks: adapt columns count visually by CSS as a fallback */
@media (max-width: 1150px) {
  .gallery__inner {
    padding: 4rem;
  }
}
@media (max-width: 768px) {
  .gallery__inner {
    padding: 3rem 2rem;
    border-radius: 4.5rem;
  }
  .gallery__wrap {
    gap: 16px;
  }
}
</style>
