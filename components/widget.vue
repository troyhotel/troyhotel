<template>
  <div v-if="visible" class="hero__iframe-area">
    <div class="hero__iframe-wrapper">
      <div
        :key="widgetKey"
        :id="containerId"
        class="hero__iframe"
        :class="widgetClass"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  containerId: string;
  minWidth?: number | null;
  maxWidth?: number | null;
  widgetOptions?: Record<string, any>;
  showBooking: boolean;
}>();

const widgetClass = computed(() => {
  if (props.containerId.includes("widget_mobile")) return "widget_mobile";
  if (props.containerId.includes("widget_desktop")) return "widget_desktop";
  return "";
});

// ----------------------------
// INTERNAL STATE
// ----------------------------
const scriptSrc = "//widget.reservationsteps.ru/js/bnovo.js";
const scriptLoaded = ref(false);
const visible = ref(false);
const widgetKey = ref(0);

// Флаг: пользователь кликнул на виджет → фиксированный режим
const userInteracted = ref(false);

// ----------------------------
// DEFAULT OPTIONS
// ----------------------------
const defaultWidgetOptions = {
  type: "horizontal",
  uid: "6630067e-2593-4574-b66b-1f7b6b74fdbc",
  lang: "ru",
  without_title: "on",
  width: "100%",
  width_mobile: "100%",
  background: "#ffffff",
  background_mobile: "#ffffff",
  bg_alpha: "100",
  bg_alpha_mobile: "100",
  border_color_mobile: "#C6CAD3",
  padding: "15",
  padding_mobile: "15",
  border_radius: "25",
  button_font_size: "14",
  button_height: "42",
  font_type: "verdana",
  title_color: "#242742",
  title_color_mobile: "#242742",
  title_size: "22",
  title_size_mobile: "22",
  inp_color: "#242742",
  inp_bordhover: "#BBBBBB",
  inp_bordcolor: "#DDDDDD",
  inp_alpha: "10",
  btn_background: "#fbec78",
  btn_background_over: "#fbec78",
  btn_textcolor: "#1A1D21",
  btn_textover: "#1A1D21",
  btn_bordcolor: "#fbec78",
  btn_bordhover: "#fbec78",
  min_age: "0",
  max_age: "17",
  adults_default: "1",
  dates_preset: "on",
  dfrom_today: "on",
  dfrom_value: "2",
  dto_nextday: "on",
  dto_value: "2",
  cancel_color: "#fbec78",
  switch_mobiles: "on",
  switch_mobiles_width: 0,
};

// ----------------------------
// LOAD SCRIPT
// ----------------------------
function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (scriptLoaded.value) return resolve();

    const exists = document.querySelector(`script[src*="bnovo.js"]`);
    if (exists) {
      scriptLoaded.value = true;
      return resolve();
    }

    const el = document.createElement("script");
    el.src = scriptSrc;
    el.async = true;
    el.onload = () => {
      scriptLoaded.value = true;
      resolve();
    };
    el.onerror = reject;
    document.body.appendChild(el);
  });
}

// ----------------------------
// SAFE DESTROY
// ----------------------------
function destroyWidget() {
  try {
    if (window.Bnovo_Widget?.close) {
      window.Bnovo_Widget.close(props.containerId);
    } else if (window.Bnovo_Widget?.destroy) {
      window.Bnovo_Widget.destroy(props.containerId);
    }
  } catch {}

  const el = document.getElementById(props.containerId);
  if (el) el.innerHTML = "";
}

// ----------------------------
// OPEN WIDGET
// ----------------------------
async function openWidget() {
  if (!props.showBooking || !window.Bnovo_Widget) return;

  destroyWidget();

  const finalOptions = {
    ...defaultWidgetOptions,
    ...(props.widgetOptions || {}),
  };

  window.Bnovo_Widget.init(() => {
    try {
      window.Bnovo_Widget.open(props.containerId, finalOptions);

      // 🔥 Вешаем слушатель клика → фиксируем виджет
      setTimeout(() => {
        const container = document.getElementById(props.containerId);
        if (container) {
          container.addEventListener("click", () => {
            userInteracted.value = true;
          });
        }
      }, 200);
    } catch (err) {
      console.warn("open failed", err);
    }
  });
}

// ----------------------------
// WIDTH CHECK
// ----------------------------
function widthMatches(): boolean {
  const w = window.innerWidth;
  if (props.minWidth && w < props.minWidth) return false;
  if (props.maxWidth && w > props.maxWidth) return false;
  return true;
}

// ----------------------------
// INIT LOGIC
// ----------------------------
async function init(forceReset = false) {
  if (!props.showBooking || !widthMatches()) {
    visible.value = false;
    destroyWidget();
    return;
  }

  visible.value = true;

  // 🔥 Перерендер только если нужно
  if (forceReset) {
    widgetKey.value++;
  }

  await loadScript();

  // wait for Bnovo_Widget.init
  await new Promise<void>((resolve, reject) => {
    let tries = 0;
    const t = setInterval(() => {
      if (window.Bnovo_Widget?.init) {
        clearInterval(t);
        resolve();
      }
      if (tries++ > 50) {
        clearInterval(t);
        reject("Bnovo_Widget.init недоступен");
      }
    }, 50);
  });

  await openWidget();
}

// ----------------------------
// RESIZE HANDLER
// ----------------------------
let resizeTimeout: any = null;
async function handleResize() {
  const shouldBeVisible = widthMatches();

  if (shouldBeVisible && !visible.value) {
    // показываем виджет
    visible.value = true;

    // ждём, пока Vue обновит DOM
    await nextTick();

    widgetKey.value++; // перерендер контейнера
    await nextTick(); // убедимся, что контейнер готов

    openWidget(); // теперь элемент точно существует
  } else if (!shouldBeVisible && visible.value) {
    // скрываем виджет
    visible.value = false;
    destroyWidget();
  }
}

// ----------------------------
onMounted(() => {
  init();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  destroyWidget();
});
</script>

<style scoped>
.hero__iframe-area {
  width: 100%;
}
.hero__iframe-wrapper {
  width: 100%;
}
.hero__iframe {
  width: 100%;
  border: none;
}

.hero__iframe.widget_mobile {
  height: 316px;
}

.hero__iframe.widget_desktop {
  /* height: 121px; */
  height: 78px;
}
</style>
