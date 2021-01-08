///////////////////////////////////////////
//              Vue Router               //
///////////////////////////////////////////

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/templates/:number',
        component: () =>
            import('@/components/tiles/Tile.vue'),
        meta: {
            title: 'Vorlage'
        }
    },
    {
        path: '/templates/:number/colorCount',
        name: 'ColorCountTile',
        component: () =>
            import('@/components/tools/TileColors.vue'),
        meta: {
            title: 'Farbenzählung'
        }
    },
    {
        path: '/',
        component: () =>
            import('@/components/Navigation.vue'),
        children: [{
            path: '',
            redirect: 'templates'
        },
        {
            path: 'templates',
            component: () =>
                import('@/components/Templates.vue'),
            meta: {
                title: 'Vorlagen'
            },
        },
        {
            path: 'place',
            component: () =>
                import('@/components/Place.vue'),
            meta: {
                title: 'Place'
            }
        },
        {
            path: 'history',
            component: () =>
                import('@/components/History.vue'),
            meta: {
                title: 'Entstehung'
            }
        },
        {
            path: 'atlas',
            component: () =>
                import('@/components/Atlas.vue'),
            meta: {
                title: 'Atlas'
            }
        },
        {
            path: 'tools',
            component: () =>
                import('@/components/Tools.vue'),
            meta: {
                title: 'Werkzeuge'
            }
        },
        {
            path: 'tools/colorCount',
            name: 'colorCountTools',
            component: () =>
                import('@/components/tools/TileColors.vue'),
            meta: {
                title: 'Farbenzählung'
            }
        },
        ]
    },
    { //Must be at the bottom, because of the asterix (*) path
        path: '/not-found',
        alias: '*',
        component: () =>
            import('@/components/NotFound.vue'),
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