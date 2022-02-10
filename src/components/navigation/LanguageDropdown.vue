<template>
  <div class="dropup">
    <button
      id="button-dropdown-languages"
      class="btn btn-light dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span
        :class="
          'flag-icon flag-icon-' +
            currentMessage.meta.locale.substring(3, 5).toLowerCase()
        "
      />
      <span class="mx-1 mt-20">{{ currentMessage.meta.name }}</span>
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="button-dropdown-languages"
    >
      <li
        v-for="(message, code) in messagesWithCountry"
        :key="code"
      >
        <button
          class="dropdown-item"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          @click="changeLanguage(code)"
        >
          <span :class="'flag-icon flag-icon-' + code.substring(3, 5).toLowerCase()" />
          {{ message.meta.name }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/stores/locale";

const i18n = useI18n();
const store = useStore();

const currentMessage = computed(() => i18n.messages.value[i18n.locale.value]);
const messagesWithCountry = computed(() => {
  const result = {};
  for (const locale in i18n.messages.value) {
    if (locale.includes("-")) {
      result[locale] = i18n.messages.value[locale];
    }
  }
  return result;
});

function changeLanguage(locale) {
  i18n.locale.value = locale;
  store.changeLocale(locale);
}
</script>
<style lang="scss">
@use 'sass:math';

.flag-icon {
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  width: math.div(4, 3) * 1em;
  line-height: 1em;
  &:before {
    content: "\00a0";
  }
}

@mixin flag-icon($country) {
  .flag-icon-#{$country} {
    background-image: url("../../assets/images/navigation/#{$country}.svg");
  }
}

@include flag-icon(de);
@include flag-icon(us);
</style>