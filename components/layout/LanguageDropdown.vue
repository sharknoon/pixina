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
          localeProperties.code.substring(3, 5).toLowerCase()
        "
      />
      <span class="mx-1 mt-20">{{ localeProperties.name }}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="button-dropdown-languages">
      <li v-for="locale in locales" :key="locale.code">
        <button
          class="dropdown-item"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          @click="changeLanguage(locale.code)"
        >
          <span
            :class="
              'flag-icon flag-icon-' + locale.code.substring(3, 5).toLowerCase()
            "
          />
          {{ locale.name }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const { localeProperties, locales, setLocale } = useI18n();

function changeLanguage(locale: string) {
  setLocale(locale);
}
</script>
<style lang="scss">
@use "sass:math";

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
    background-image: url("/images/navigation/#{$country}.svg");
  }
}

@include flag-icon(de);
@include flag-icon(us);
</style>
