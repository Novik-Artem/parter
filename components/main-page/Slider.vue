<template>
  <div id="works" :class="$style.container">
    <h2 :class="$style.title">Мы в деле</h2>
    <div :class="$style.slider">
      <button
        type="button"
        :class="$style.arrow"
        :disabled="index === 0"
        aria-label="Назад"
        @click="index--"
      >
        <img src="/icons/arrow-left.svg" alt="" />
      </button>

      <div :class="$style.viewport">
        <div
          :class="$style.track"
          :style="{ '--i': index, '--visible': visible }"
        >
          <button
            v-for="slide in slides"
            :key="slide.id"
            type="button"
            :class="$style.card"
            aria-label="Смотреть"
            @click="active = slide"
          >
            <img
              :src="slide.poster"
              :alt="`Выступление ПАРТЕР 162 — видео ${slide.id + 1}`"
            />
            <span :class="$style.play">
              <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
                <circle
                  cx="28"
                  cy="28"
                  r="26.5"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path d="M23 18.5v19l16.5-9.5L23 18.5Z" fill="currentColor" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        :class="$style.arrow"
        :disabled="index >= maxIndex"
        aria-label="Вперёд"
        @click="index++"
      >
        <img src="/icons/arrow-right.svg" alt="" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="active" :class="$style.overlay" @click="active = null">
      <button
        type="button"
        :class="$style.close"
        aria-label="Закрыть"
        @click="active = null"
      >
        <img src="/icons/cross-white.svg" alt="" />
      </button>
      <video
        :class="$style.player"
        :src="active.src"
        :poster="active.poster"
        controls
        autoplay
        playsinline
        @click.stop
      />
    </div>
  </Teleport>
</template>

<script setup>
const slides = [1, 2, 3, 4, 1, 2, 3, 4].map((n, i) => ({
  id: i,
  poster: `/images/slides/${n}.webp`,
  src: `/videos/${n}.mp4`,
}));

const visible = ref(4);
const index = ref(0);
const active = ref(null);

const maxIndex = computed(() => Math.max(0, slides.length - visible.value));

const syncVisible = () => {
  const w = window.innerWidth;
  visible.value = w <= 650 ? 1 : w <= 900 ? 2 : w <= 1200 ? 3 : 4;
  if (index.value > maxIndex.value) index.value = maxIndex.value;
};

onMounted(() => {
  syncVisible();
  window.addEventListener("resize", syncVisible);
});

onUnmounted(() => {
  window.removeEventListener("resize", syncVisible);
});
</script>

<style lang="scss" module>
.container {
  @include container;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;

  @include custom(650) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .title {
    width: fit-content;
    font-size: 2rem;
    font-weight: inherit;
    text-transform: uppercase;
    color: $white;
    position: relative;
    margin: 0 0 2rem 0;
    padding-bottom: 0.5rem;

    @include custom(650) {
      font-size: 1.5rem;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      height: 0.25rem;
      border-radius: 0.25rem;
      background-color: $yellow;
    }
  }
}

.slider {
  display: flex;
  align-items: center;
  gap: 1rem;

  @include custom(650) {
    gap: 0.5rem;
  }
}

.arrow {
  flex-shrink: 0;
  width: 3.25rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @include custom(650) {
    width: 2rem;
    height: 2rem;
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
}

.viewport {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.track {
  --gap: 1rem;
  display: flex;
  gap: var(--gap);
  width: 100%;
  transition: transform 0.4s ease;
  transform: translateX(
    calc(var(--i) * -1 * (100% + var(--gap)) / var(--visible))
  );

  @include custom(650) {
    --gap: 0.5rem;
  }
}

.card {
  position: relative;
  flex: 0 0 calc((100% - (var(--visible) - 1) * var(--gap)) / var(--visible));
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  background: $black;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;

  svg {
    width: 5.5rem;
    height: 5.5rem;
    transition: transform 0.3s ease;
  }

  .card:hover & svg {
    transform: scale(1.08);
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
}

.close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
}

.player {
  width: min(72rem, 100%);
  max-height: 85dvh;
  border-radius: 0.5rem;
  background: $black;
}
</style>
