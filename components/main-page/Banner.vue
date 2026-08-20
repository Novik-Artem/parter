<template>
  <div id="top" :class="$style.banner">
    <img
      :class="[$style.img, $style.desktop]"
      src="/images/main-page/banner.webp"
      alt="ПАРТЕР 162 — живая музыка на мероприятиях"
    />
    <img
      :class="[$style.img, $style.mobile]"
      src="/images/main-page/banner-mobile.webp"
      alt="ПАРТЕР 162 — живая музыка на мероприятиях"
    />
    <div :class="$style.content">
      <h1 :class="$style.title">ПАРТЕР 162</h1>
      <p :class="$style.subtitle">СОЗДАЁМ ВОСПОМИНАНИЯ</p>
    </div>
  </div>
</template>

<style lang="scss" module>
.banner {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 100dvh;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      linear-gradient(180deg, #000000 0%, #000000 5%, rgba(0, 0, 0, 0) 18%),
      linear-gradient(
        0deg,
        #000000 0%,
        rgba(0, 0, 0, 0.7) 12%,
        rgba(0, 0, 0, 0) 35%
      );
    pointer-events: none;

    @include custom(650) {
      display: none;
    }
  }
}

.img {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &.desktop {
    @include custom(650) {
      display: none;
    }
  }

  &.mobile {
    display: none;
    filter: grayscale(1);

    @include custom(650) {
      display: block;
    }
  }
}

.content {
  @include container;
  position: relative;
  z-index: 2;
  width: 100%;

  @include custom(650) {
    align-self: flex-start;
    padding-top: 10rem;
  }

  .title {
    margin: 0;
    font-family: "Scada", system-ui, sans-serif;
    color: $white;
    font-weight: 700;
    font-size: 12.5rem;
    @include custom(1300) {
      font-size: 8rem;
    }
    @include custom(850) {
      font-size: 6rem;
    }
    @include custom(650) {
      font-size: 3.75rem;
    }
  }

  .subtitle {
    margin: 0;
    color: $yellow;
    font-size: 2.5rem;
    @include custom(650) {
      font-size: 1rem;
    }
  }
}
</style>
