<template>
  <footer :class="$style.footer">
    <div :class="$style.content">
      <div :class="$style.logo">
        <img
          :class="$style.img"
          src="/icons/footer-logo.svg"
          alt="ПАРТЕР 162"
        />
      </div>
      <div :class="$style.columns">
        <div :class="$style.column">
          <div :class="$style.title">ООО "МУЗ-ПРОСТОР"</div>
          <div :class="$style.text">
            <div :class="$style.item">
              Беларусь, г.Брест, ул. Катин Бор, д.107Б, оф.4, 224701
            </div>
            <div :class="$style.item">УНП: 291944039</div>
            <div :class="$style.item">№ BY94ALFA30122J91740010270000</div>
          </div>
        </div>
        <div :class="$style.column">
          <div :class="$style.title">Навигация</div>
          <div :class="$style.text">
            <a :class="[$style.item, $style.link]" href="#about">О нас</a>
            <a :class="[$style.item, $style.link]" href="#works">Мы в деле</a>
            <a :class="[$style.item, $style.link]" href="#contacts">Контакты</a>
          </div>
        </div>
        <div :class="$style.author">
          Разработано компанией
          <a href="https://pandasway.pro/" target="_blank">Panda’s. Way</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" module>
.footer {
  @include container;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
  .content {
    padding: 2rem 0 0 0;
    border-top: 2px solid $gray;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;
    .columns {
      display: contents;
    }
    @include custom(1040) {
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      .columns {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: fit-content;
        max-width: 20rem;
        gap: 2rem;
        text-align: left;
      }
    }
    .column {
      color: $light-gray;
      .title {
        font-weight: 600;
        font-size: 1.5rem;
        margin: 0 0 1rem 0;
        @include custom(1200) {
          font-size: 1.125rem;
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .item {
          font-size: 1.25rem;
          line-height: 140%;
          @include custom(1200) {
            font-size: 1rem;
          }
          &.link {
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            &:hover {
              color: $yellow;
            }
          }
        }
      }
    }
    .author {
      font-size: 1.25rem;
      color: $light-gray;
      @include custom(1200) {
        font-size: 1rem;
      }
    }
  }
}
</style>
