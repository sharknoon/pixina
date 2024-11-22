<template>
  <div class="dropup dropup-center">
    <button
      id="button-dropdown-languages"
      class="btn btn-sm btn-outline-light dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-translate"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"
        />
        <path
          d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"
        />
      </svg>
    </button>
    <ul
      class="dropdown-menu dropdown-menu-end"
      aria-labelledby="button-dropdown-languages"
    >
      <li v-for="locale in locales" :key="locale.code">
        <button
          class="dropdown-item"
          :class="{ active: localeProperties.code === locale.code }"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          @click="setLocale(locale.code)"
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
