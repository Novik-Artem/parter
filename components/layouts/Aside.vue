<template>
  <Teleport to="body">
    <Transition
      :enter-active-class="$style.enterActive"
      :leave-active-class="$style.leaveActive"
      :enter-from-class="$style.enterFrom"
      :leave-to-class="$style.leaveTo"
    >
      <aside v-if="isOpen" :class="$style.aside">
        <nav :class="$style.nav">
          <a :class="$style.link" href="#about" @click="onLink">О нас</a>
          <a :class="$style.link" href="#works" @click="onLink">Мы в деле</a>
          <a :class="$style.link" href="#request" @click="onLink"
            >Оставить заявку</a
          >
          <a :class="$style.link" href="#contacts" @click="onLink">Контакты</a>
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const onLink = (e) => {
  e.preventDefault();
  const id = e.currentTarget.getAttribute("href")?.slice(1);
  emit("close");
  nextTick(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  });
};
</script>

<style lang="scss" module>
.aside {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 88%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00000052;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    color: $white;

    .link {
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: $yellow;
      }
    }
  }
}

.enterActive,
.leaveActive {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.enterFrom,
.leaveTo {
  transform: translateX(100%);
  opacity: 0;
}
</style>
