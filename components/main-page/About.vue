<template>
  <div id="about" :class="$style.container">
    <div :class="$style.inner">
      <div :class="$style.left">
        <div :class="$style.title">О нас</div>
        <div :class="$style.description">
          Команда, готовая подарить хорошее настроение на вашей свадьбе, юбилее
          и ином угодном событии.
          <br />
          <span>Истинно живая музыка и настоящии эмоции!</span>
        </div>
        <div :class="$style.labels">
          <div :class="$style.label">Свадьба</div>
          <div :class="$style.label">Юбилей</div>
          <div :class="$style.label">Другое</div>
        </div>
      </div>
      <div :class="$style.right">
        <img src="/images/main-page/about.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  @include container;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;

  @include custom(650) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

.inner {
  position: relative;
  display: flex;
  align-items: center;
  height: 29.8125rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: $black;

  @include custom(650) {
    flex-direction: column;
    height: auto;
  }
}

.left {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-shrink: 0;
  width: 100%;
  max-width: 20rem;
  @include custom(650) {
    max-width: 100%;
  }
  .title {
    width: fit-content;
    font-size: 2rem;
    text-transform: uppercase;
    color: $white;
    position: relative;
    @include custom(650) {
      font-size: 1.5rem;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -0.5rem;
      height: 0.25rem;
      border-radius: 0.25rem;
      background-color: $yellow;
    }
  }
  .description {
    color: $white;
    font-size: 1.25rem;
    @include custom(650) {
      font-size: 1rem;
    }
    span {
      margin: 0.5rem 0 0 0;
      display: block;
      color: $yellow;
    }
  }
  .labels {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .label {
      font-family: "Scada", system-ui, sans-serif;
      font-weight: 700;
      font-size: 1.25rem;
      color: $yellow;
      padding: 0.5rem;
      border: 2px solid $yellow;
      border-radius: 0.5rem;
      text-align: center;
      @include custom(650) {
        font-size: 1rem;
      }
    }
  }
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 22%;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 22% 24%;
    filter: grayscale(1);
    mask-image: linear-gradient(90deg, transparent 0%, #000 38%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 38%);
  }

  @include custom(650) {
    display: none;
  }
}
</style>
