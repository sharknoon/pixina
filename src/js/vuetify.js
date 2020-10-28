import Vue from 'vue';
import Vuetify from 'vuetify';
import de from 'vuetify/es5/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: 'de',
  },
  icons: {
    iconfont: 'mdi',
  },
  //Align breakpoints to those of bootstrap
  breakpoint: {
    thresholds: {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1904
    },
    scrollBarWidth: 24,
  },
});
