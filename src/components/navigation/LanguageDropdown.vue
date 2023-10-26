<template>
  <div class="dropup">
    <button
      id="button-dropdown-languages"
      class="btn btn-light dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span :class="'flag-icon flag-icon-' + i18n.t('meta.locale').substring(3, 5).toLowerCase()" />
      <span class="mx-1 mt-20">{{ i18n.t('meta.name') }}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="button-dropdown-languages">
      <li v-for="(_, locale) in messagesWithCountry" :key="locale">
        <button
          class="dropdown-item"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          @click="changeLanguage(locale)"
        >
          <span :class="'flag-icon flag-icon-' + locale.substring(3, 5).toLowerCase()" />
          {{ i18n.t('meta.name', 1, { locale: locale }) }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/locale'

const i18n = useI18n()
const store = useLocaleStore()

const messagesWithCountry = computed<Record<string, LocaleMessageDictionary<VueMessageType>>>(
  () => {
    const result: Record<string, LocaleMessageDictionary<VueMessageType>> = {}
    for (const locale of i18n.availableLocales) {
      if (locale.includes('-')) {
        result[locale] = i18n.getLocaleMessage(locale)
      }
    }
    return result
  }
)

function changeLanguage(locale: string) {
  i18n.locale.value = locale
  store.changeLocale(locale)
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
    content: '\00a0';
  }
}

@mixin flag-icon($country) {
  .flag-icon-#{$country} {
    background-image: url('../../assets/images/navigation/#{$country}.svg');
  }
}

@include flag-icon(de);
@include flag-icon(us);
</style>
