///////////////////////////////////////////
//              Vue Router               //
///////////////////////////////////////////

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/js/vuex'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/components/user/Navigation.vue'),
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '/',
          alias: '/home',
          component: () => import('@/components/user/Home.vue'),
          meta: {
            requiresAuth: true,
            title: ''
          }
        },
        {
          path: '/profile',
          component: () => import('@/components/user/Profile.vue'),
          meta: {
            requiresAuth: true,
            title: 'Profil'
          }
        },
        {
          path: '/templates',
          component: () => import('@/components/user/Templates.vue'),
          meta: {
            requiresAuth: true,
            title: 'Vorlagen'
          }
        },
        {
          path: '/chats',
          component: () => import('@/components/user/Chats.vue'),
          meta: {
            requiresAuth: true,
            title: 'Chats'
          }
        },
        {
          path: '/reservations',
          component: () => import('@/components/user/Reservations.vue'),
          meta: {
            requiresAuth: true,
            title: 'Reservierungen'
          }
        },
        {
          path: '/place',
          component: () => import('@/components/user/Place.vue'),
          meta: {
            requiresAuth: true,
            title: 'Place'
          }
        },
        {
          path: '/history',
          component: () => import('@/components/user/History.vue'),
          meta: {
            requiresAuth: true,
            title: 'Entstehung'
          }
        },
        {
          path: '/atlas',
          component: () => import('@/components/user/Atlas.vue'),
          meta: {
            requiresAuth: true,
            title: 'Atlas'
          }
        },
        {
          path: '/tools',
          component: () => import('@/components/user/Tools.vue'),
          meta: {
            requiresAuth: true,
            title: 'Werkzeuge'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/components/login/LoginPage.vue'),
      meta: {
        title: 'Anmeldung'
      },
      children: [
        {
          path: 'only-google',
          alias: '',
          component: () => import('@/components/login/OnlyGoogle.vue')
        },
        {
          path: 'enter-email',
          component: () => import('@/components/login/EnterEmail.vue')
        },
        {
          path: 'enter-password',
          component: () => import('@/components/login/EnterPassword.vue')
        },
        {
          path: 'enter-user-details',
          component: () => import('@/components/login/EnterUserDetails.vue')
        },
        {
          path: 'confirm-mail',
          component: () => import('@/components/login/ConfirmMail.vue')
        }
        //TODO passwort vergessen
      ]
    },
    {//Must be at the bottom, because of the asterix (*) path
      path: '/not-found',
      alias: '*',
      component: () => import('@/components/misc/NotFound.vue'),
      meta: {
        title: 'Nicht gefunden'
      }
    },
  ]
});

//Check if the user is authenticated, otherwise reroute them
router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: "/login"
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

//Set the title of the tab
router.afterEach((to) => {
  document.title = 'Pixina'
  if (to.meta.title) {
    document.title += ' - ' + to.meta.title
  }
})

export default router;
