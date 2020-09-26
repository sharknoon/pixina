"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

require("bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

var _Pixina = _interopRequireDefault(require("@/Pixina.vue"));

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _vueFontawesome = require("@fortawesome/vue-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");

var _proLightSvgIcons = require("@fortawesome/pro-light-svg-icons");

var _vuetify = _interopRequireDefault(require("@/plugins/vuetify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faEnvelope, _freeBrandsSvgIcons.faGoogle, _freeBrandsSvgIcons.faApple, _freeBrandsSvgIcons.faMicrosoft, _freeSolidSvgIcons.faArrowRight, _proLightSvgIcons.faHome, _proLightSvgIcons.faUserCircle, _freeSolidSvgIcons.faTh, _proLightSvgIcons.faComments, _proLightSvgIcons.faImage, _proLightSvgIcons.faHistory, _proLightSvgIcons.faCompass, _proLightSvgIcons.faWrench, _proLightSvgIcons.faPowerOff, _proLightSvgIcons.faBoxCheck);

_vue["default"].component('font-awesome-icon', _vueFontawesome.FontAwesomeIcon); ///////////////////////////////////////////
//                Vuex                   //
///////////////////////////////////////////


_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    // 0 = enter email or single signin
    // 1 = enter password
    // 2 = register user details
    // 3 = confirm email
    // 99 = logged in
    loginState: 0,
    // The E-Mail the user has entered
    email: null,
    // The user registration data
    first_name: null,
    last_name: null,
    hashed_password: null,
    // The Google clientId
    googleClientId: "861982955154-8dnmcg5ob5oih4af5ge0be64iv1mh9uv.apps.googleusercontent.com"
  },
  getters: {
    isLoggedIn: function isLoggedIn(state) {
      return state.loginState == 99;
    }
  },
  mutations: {
    setLoginState: function setLoginState(state, newState) {
      state.loginState = newState;
    },
    setEmailAddress: function setEmailAddress(state, email) {
      state.email = email;
    }
  }
}); ///////////////////////////////////////////
//              Vue Router               //
///////////////////////////////////////////

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  routes: [{
    path: '/',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/components/user/Navigation.vue'));
      });
    },
    meta: {
      requiresAuth: true
    },
    children: [{
      path: '/',
      alias: '/home',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Home.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/profile',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Profile.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/templates',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Templates.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/chats',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Chats.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/reservations',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Reservations.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/place',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Place.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/history',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/History.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/atlas',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Atlas.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/tools',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/user/Tools.vue'));
        });
      },
      meta: {
        requiresAuth: true
      }
    }]
  }, {
    path: '/login',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/components/login/LoginPage.vue'));
      });
    },
    children: [{
      path: 'only-google',
      alias: '',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/login/OnlyGoogle.vue'));
        });
      }
    }, {
      path: 'enter-email',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/login/EnterEmail.vue'));
        });
      }
    }, {
      path: 'enter-password',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/login/EnterPassword.vue'));
        });
      }
    }, {
      path: 'enter-user-details',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/login/EnterUserDetails.vue'));
        });
      }
    }, {
      path: 'confirm-mail',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/components/login/ConfirmMail.vue'));
        });
      }
    } //TODO passwort vergessen
    ]
  }, {
    //Must be at the bottom, because of the asterix (*) path
    path: '/not-found',
    alias: '*',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/components/misc/NotFound.vue'));
      });
    }
  }]
}); //Check if the user is authenticated, otherwise reroute them

router.beforeEach(function (to, from, next) {
  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  })) {
    if (!store.getters.isLoggedIn) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
}); ///////////////////////////////////////////
//                 Vue                   //
///////////////////////////////////////////

_vue["default"].config.productionTip = false;
new _vue["default"]({
  el: '#app',
  router: router,
  render: function render(h) {
    return h(_Pixina["default"]);
  },
  vuetify: _vuetify["default"],
  store: store
}); //popper.js

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[data-toggle="tooltip"]').forEach(function (dth) {
    return dth.tooltip();
  });
});