<template>
  <section id="contacts" :class="$style.section">
    <img
      :class="$style.watermark"
      src="/icons/parter-bg.svg"
      alt=""
      aria-hidden="true"
    />
    <div :class="$style.container">
      <div :class="$style.contacts">
        <h2 :class="$style.title">
          <span :class="$style.desktopTitle">Свяжитесь с нами</span>
          <span :class="$style.mobileTitle">Контакты</span>
        </h2>
        <div :class="$style.list">
          <a :class="$style.contact" href="tel:+375333534322">
            <div :class="$style.icon">
              <img src="/icons/phone-yellow.svg" alt="" aria-hidden="true" />
            </div>
            <div :class="$style.text">+375 (33) 353-43-22</div>
          </a>
          <a
            :class="$style.contact"
            href="https://www.instagram.com/parter162?igsh=MWI2bjNzdjEwODBqdw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <div :class="$style.icon">
              <img src="/icons/insta-yellow.svg" alt="" aria-hidden="true" />
            </div>
            <div :class="$style.text">@parter162</div>
          </a>
        </div>
      </div>

      <form id="request" :class="$style.request" @submit.prevent="onSubmit">
        <h2 :class="$style.title">
          <span :class="$style.desktopTitle">Заявка</span>
          <span :class="$style.mobileTitle">Оставь заявку</span>
        </h2>
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
        <button
          :class="[$style.button, submitSuccess && $style.buttonSuccess]"
          type="submit"
          :disabled="isSubmitting || submitSuccess"
        >
          <template v-if="submitSuccess">
            Отправлено
            <img src="/icons/done.svg" alt="" aria-hidden="true" />
          </template>
          <template v-else>
            {{ isSubmitting ? "Отправка..." : "Отправить" }}
          </template>
        </button>
        <p v-if="submitError" :class="[$style.status, $style.statusError]">
          {{ submitError }}
        </p>
      </form>

      <div :class="$style.info">
        <div :class="$style.icon">
          <img :class="$style.img" src="/icons/phone-yellow.svg" alt="" />
        </div>
        <div :class="$style.text">
          Наши менеджеры<br />
          свяжутся с Вами и<br />
          ответят на все вопросы!
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
let successTimer = null;

const resetSuccess = () => {
  submitSuccess.value = false;
  if (successTimer) {
    clearTimeout(successTimer);
    successTimer = null;
  }
};

const onSubmit = async () => {
  if (isSubmitting.value || submitSuccess.value) return;
  if (!form.name.trim() || !form.phone.trim()) return;

  isSubmitting.value = true;
  submitError.value = "";
  resetSuccess();

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
    successTimer = setTimeout(resetSuccess, 5000);
  } catch {
    submitError.value = "Не удалось отправить заявку. Попробуйте ещё раз.";
  } finally {
    isSubmitting.value = false;
  }
};

watch(
  () => [form.name, form.phone, form.comment],
  ([name, phone, comment]) => {
    if (submitSuccess.value && (name || phone || comment)) {
      resetSuccess();
    }
  }
);

onBeforeUnmount(resetSuccess);
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
  transform: translate(-50%, -50%);
  width: min(70.75rem, 100%);
  height: auto;
  pointer-events: none;
  user-select: none;

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
  display: flex;
  align-items: flex-start;
  gap: 9.625rem;

  @include custom(1200) {
    gap: 4rem;
  }

  @include custom(960) {
    gap: 2rem;
  }

  @include custom(730) {
    flex-direction: column;
    gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

.title {
  margin: 0 0 2rem 0;
  font-size: 2rem;
  font-weight: inherit;
  color: $white;
  @include custom(1100) {
    font-size: 1.5rem;
  }
  @include custom(650) {
    width: fit-content;
    font-size: 1.5rem;
    text-transform: uppercase;
    position: relative;
    padding-bottom: 0.5rem;

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
  flex: 0 0 auto;
  width: fit-content;

  .title {
    white-space: nowrap;
  }

  @include custom(730) {
    width: 100%;
    order: 2;
    padding-top: 2rem;
    padding-bottom: 2rem;

    .title {
      white-space: normal;
    }
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
      width: 1.25rem;
      height: 1.25rem;
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
  flex: 1 1 auto;
  width: 34.25rem;
  max-width: 34.25rem;
  min-width: 0;

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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: fit-content;
    padding: 0.75rem 2rem;
    text-align: center;
    background-color: $yellow;
    border: none;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 1.25rem;
    color: $black;
    font-family: "Scada", system-ui, sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease;

    img {
      display: block;
      width: 1.125rem;
      height: auto;
    }

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }

    &.buttonSuccess {
      background-color: $light-gray;
      opacity: 1;
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
    max-width: none;
    order: 1;

    .button {
      width: 100%;
      font-size: 1rem;
    }
  }
}

.info {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  .icon {
    padding: 1.125rem;
    border: 2px solid $yellow;
    border-radius: 50%;
    margin: 0 0 2rem 0;
  }

  .text {
    font-size: 2rem;
    line-height: 1.2;
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
