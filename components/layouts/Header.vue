<template>
  <header :class="$style.header">
    <a :class="$style.logo" href="#top">
      <img :class="$style.img" src="/icons/logo.svg" alt="logo" />
    </a>

    <nav :class="$style.menu">
      <a :class="$style.link" href="#about">О нас</a>
      <a :class="$style.link" href="#works">Мы в деле</a>
      <a :class="$style.link" href="#contacts">Контакты</a>
    </nav>
    <div :class="$style.contacts">
      <a :class="$style.contact" href="tel:+79999999999">
        <img :class="$style.img" src="/icons/phone-yellow.svg" alt="phone" />
      </a>
      <a
        :class="$style.contact"
        href="https://www.instagram.com/parter162?igsh=NzQ3d3pndTg4Zmty"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :class="$style.img" src="/icons/insta-yellow.svg" alt="insta" />
      </a>
    </div>
  </header>

  <div :class="$style.mobile">
    <a v-show="!isOpen" :class="$style.phone" href="tel:+79999999999">
      <img src="/icons/phone-white.svg" alt="phone" />
    </a>
    <button :class="$style.burger" type="button" @click="isOpen = !isOpen">
      <img
        :src="isOpen ? '/icons/cross-white.svg' : '/icons/burger.svg'"
        :alt="isOpen ? 'close' : 'menu'"
      />
    </button>
  </div>

  <Aside :is-open="isOpen" @close="isOpen = false" />
</template>

<script setup>
import Aside from "~/components/layouts/Aside.vue";

const isOpen = ref(false);

watch(isOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style lang="scss" module>
.header {
  @include container;
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  .menu {
    display: flex;
    align-items: center;
    gap: 11.25rem;
    font-size: 1.25rem;
    color: $white;
    @include custom(900) {
      gap: 4rem;
    }
    @include custom(650) {
      display: none;
    }
    .link {
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: $yellow;
      }
    }
  }
  .contacts {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    @include custom(650) {
      display: none;
    }
    .contact {
      padding: 0.5rem;
      border: 2px solid $yellow;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}

.mobile {
  @include container;
  display: none;
  position: absolute;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  pointer-events: none;

  @include custom(650) {
    display: flex;
  }

  .phone,
  .burger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    pointer-events: auto;
  }
}
</style>
