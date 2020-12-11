///////////////////////////////////////////
//              Vue Router               //
///////////////////////////////////////////

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: () =>
                import ('@/components/Navigation.vue'),
            meta: { requiresAuth: true },
            children: [{
                    path: '/',
                    alias: '/templates',
                    component: () =>
                        import ('@/components/Templates.vue'),
                    meta: {
                        title: 'Vorlagen'
                    }
                },
                {
                    path: '/place',
                    component: () =>
                        import ('@/components/Place.vue'),
                    meta: {
                        title: 'Place'
                    }
                },
                {
                    path: '/history',
                    component: () =>
                        import ('@/components/History.vue'),
                    meta: {
                        title: 'Entstehung'
                    }
                },
                {
                    path: '/atlas',
                    component: () =>
                        import ('@/components/Atlas.vue'),
                    meta: {
                        title: 'Atlas'
                    }
                },
                {
                    path: '/tools',
                    component: () =>
                        import ('@/components/Tools.vue'),
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
                import ('@/components/NotFound.vue'),
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