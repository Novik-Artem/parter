<template>
  <section id="contacts" :class="$style.section">
    <div :class="$style.watermark" aria-hidden="true">ПАРТЕР</div>
    <div :class="$style.container">
      <div :class="$style.contacts">
        <div :class="[$style.title, $style.desktopTitle]">Свяжитесь с нами</div>
        <div :class="[$style.title, $style.mobileTitle]">Контакты</div>
        <div :class="$style.list">
          <a :class="$style.contact" href="tel:+79999999999">
            <div :class="$style.icon">
              <img src="/icons/phone-yellow.svg" alt="" />
            </div>
            <div :class="$style.text">+7 (999) 999-99-99</div>
          </a>
          <a
            :class="$style.contact"
            href="https://www.instagram.com/parter162?igsh=NzQ3d3pndTg4Zmty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div :class="$style.icon">
              <img src="/icons/insta-yellow.svg" alt="" />
            </div>
            <div :class="$style.text">@parter162</div>
          </a>
        </div>
      </div>

      <form id="request" :class="$style.request" @submit.prevent="onSubmit">
        <div :class="[$style.title, $style.desktopTitle]">Заявка</div>
        <div :class="[$style.title, $style.mobileTitle]">Оставь заявку</div>
        <div :class="$style.inputs">
          <input
            v-model="form.name"
            :class="$style.input"
            type="text"
            placeholder="Ваше имя"
            required
          />
          <input
            v-model="form.phone"
            :class="$style.input"
            type="tel"
            placeholder="Телефон"
            required
          />
          <textarea
            v-model="form.comment"
            :class="[$style.input, $style.textarea]"
            placeholder="Комментарий"
          />
        </div>
        <button :class="$style.button" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Отправка..." : "Отправить" }}
        </button>
        <p v-if="submitSuccess" :class="$style.status">
          Заявка отправлена. Мы свяжемся с вами.
        </p>
        <p v-if="submitError" :class="[$style.status, $style.statusError]">
          {{ submitError }}
        </p>
      </form>

      <div :class="$style.info">
        <div :class="$style.icon">
          <img :class="$style.img" src="/icons/phone-yellow.svg" alt="" />
        </div>
        <div :class="$style.text">
          Наши менеджеры свяжутся с Вами и ответят на все вопросы!
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = reactive({
  name: "",
  phone: "",
  comment: "",
});

const isSubmitting = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);

const onSubmit = async () => {
  if (isSubmitting.value) return;
  if (!form.name.trim() || !form.phone.trim()) return;

  isSubmitting.value = true;
  submitError.value = "";
  submitSuccess.value = false;

  try {
    await $fetch("/lead", {
      method: "POST",
      body: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        comment: form.comment.trim(),
      },
    });

    submitSuccess.value = true;
    form.name = "";
    form.phone = "";
    form.comment = "";
  } catch {
    submitError.value = "Не удалось отправить заявку. Попробуйте ещё раз.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" module>
.section {
  position: relative;
  overflow: hidden;
}

.watermark {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) scaleX(0.52);
  font-family: "Onest", system-ui, sans-serif;
  font-weight: 100;
  font-size: 21.715rem;
  line-height: 1;
  letter-spacing: 0.28em;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 2px $gray;
  opacity: 0.55;
  pointer-events: none;
  user-select: none;

  @include custom(1400) {
    font-size: 16rem;
  }

  @include custom(1100) {
    font-size: 12rem;
  }

  @include custom(730) {
    display: none;
  }
}

.container {
  position: relative;
  z-index: 1;
  @include container;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 2rem;
  @include custom(960) {
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
  }
  @include custom(730) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

.title {
  font-size: 2rem;
  color: $white;
  margin: 0 0 2rem 0;
  @include custom(1100) {
    font-size: 1.5rem;
  }
  @include custom(650) {
    width: fit-content;
    font-size: 1.5rem;
    text-transform: uppercase;
    position: relative;

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
}

.desktopTitle {
  @include custom(650) {
    display: none;
  }
}

.mobileTitle {
  display: none;

  @include custom(650) {
    display: block;
  }
}

.contacts {
  @include custom(730) {
    width: 100%;
    order: 2;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

.list {
  @include custom(730) {
    border: 1px solid $gray;
    border-radius: 0.5rem;
    overflow: hidden;
  }
}

.contact {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 0 1rem 0;
  color: $white;
  transition: color 0.3s ease;

  &:last-child {
    margin: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem;
    border: 2px solid currentColor;
    border-radius: 50%;
    flex-shrink: 0;
    color: inherit;

    img {
      display: block;
      width: 1.375rem;
      height: 1.375rem;
      filter: brightness(0) invert(1);
      transition: filter 0.3s ease;
    }
  }

  .text {
    color: inherit;
    font-size: 1.25rem;
    @include custom(1100) {
      font-size: 1rem;
    }
  }

  &:hover {
    color: $yellow;

    img {
      filter: none;
    }
  }

  @include custom(730) {
    margin: 0;
    padding: 1rem;
    color: $white;

    &:not(:last-child) {
      border-bottom: 1px solid $gray;
    }

    .icon {
      padding: 0.5rem;
      background: $yellow;
      border: none;

      img {
        filter: brightness(0);
      }
    }

    .text {
      font-size: 1rem;
    }

    &:hover {
      color: $white;

      img {
        filter: brightness(0);
      }
    }
  }
}

.request {
  width: 24.5rem;

  .title {
    margin: 0 0 0.75rem 0;

    @include custom(650) {
      margin: 0 0 2rem 0;
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 0 0.75rem 0;
    @include custom(650) {
      margin: 0 0 2rem 0;
    }
  }

  .input {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #2b2b2beb;
    color: $white;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    font: inherit;

    &::placeholder {
      color: $light-gray;
    }
  }

  .textarea {
    min-height: 6.5rem;
    resize: none;
  }

  .button {
    width: fit-content;
    padding: 0.75rem 2rem;
    text-align: center;
    background-color: $yellow;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 1.25rem;
    color: $black;
    font-family: "Scada", system-ui, sans-serif;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }

  .status {
    margin: 0.75rem 0 0;
    font-size: 1rem;
    color: $white;
  }

  .statusError {
    color: $yellow;
  }

  @include custom(730) {
    width: 100%;
    order: 1;

    .button {
      width: 100%;
      font-size: 1rem;
    }
  }
}

.info {
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 22rem;

  .icon {
    padding: 1.125rem;
    border: 2px solid $yellow;
    border-radius: 50%;
    margin: 0 0 2rem 0;
  }

  .text {
    font-size: 2rem;
    color: $white;
    text-align: center;
    @include custom(1100) {
      font-size: 1rem;
    }
  }

  @include custom(960) {
    display: none;
  }
}
</style>
