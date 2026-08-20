<template>
  <div id="top" :class="$style.banner">
    <img
      :class="[$style.img, $style.desktop]"
      src="/images/main-page/banner.webp"
      alt=""
    />
    <img
      :class="[$style.img, $style.mobile]"
      src="/images/main-page/banner-mobile.webp"
      alt=""
    />
    <div :class="$style.content">
      <div :class="$style.title">ПАРТЕР 162</div>
      <div :class="$style.subtitle">СОЗДАЁМ ВОСПОМИНАНИЯ</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.banner {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
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
  position: relative;
  z-index: 2;
  padding-left: 6.25rem;
  @include custom(850) {
    padding-left: 2rem;
  }
  @include custom(650) {
    align-self: flex-start;
    width: 100%;
    padding: 10rem 0 0 2rem;
  }
  .title {
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
    color: $yellow;
    font-size: 2.5rem;
    @include custom(650) {
      font-size: 1rem;
    }
  }
}
</style>
