///////////////////////////////////////////
//              Vue Router               //
///////////////////////////////////////////

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/js/vuex'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: () =>
                import ('@/components/user/Navigation.vue'),
            meta: { requiresAuth: true },
            children: [{
                    path: '/',
                    alias: '/templates',
                    component: () =>
                        import ('@/components/user/Templates.vue'),
                    meta: {
                        title: 'Vorlagen'
                    }
                },
                {
                    path: '/place',
                    component: () =>
                        import ('@/components/user/Place.vue'),
                    meta: {
                        title: 'Place'
                    }
                },
                {
                    path: '/history',
                    component: () =>
                        import ('@/components/user/History.vue'),
                    meta: {
                        title: 'Entstehung'
                    }
                },
                {
                    path: '/atlas',
                    component: () =>
                        import ('@/components/user/Atlas.vue'),
                    meta: {
                        title: 'Atlas'
                    }
                },
                {
                    path: '/tools',
                    component: () =>
                        import ('@/components/user/Tools.vue'),
                    meta: {
                        title: 'Werkzeuge'
                    }
                }
            ]
        },
        { //Must be at the bottom, because of the asterix (*) path
            path: '/not-found',
            alias: '*',
            component: () =>
                import ('@/components/misc/NotFound.vue'),
            meta: {
                title: 'Nicht gefunden'
            }
        },
    ]
});

//Set the title of the tab
router.afterEach((to) => {
    document.title = 'Pixina'
    if (to.meta.title) {
        document.title += ' - ' + to.meta.title
    }
})

export default router;