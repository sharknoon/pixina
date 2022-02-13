import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Fullscreen Routes
    {
      path: "/templates/:number",
      name: "Template",
      component: () => import("@/components/tiles/Tile.vue"),
      meta: {
        title: "Vorlage",
      },
    },
    {
      path: "/templates/:number/colors",
      name: "Colors",
      component: () => import("@/components/tools/TileColors.vue"),
      meta: {
        title: "Farben",
      },
    },
    {
      path: "/",
      component: () => import("@/components/Navigation.vue"),
      children: [
        // Routes with Navigation
        {
          path: "",
          redirect: "templates",
        },
        {
          path: "templates",
          name: "Templates",
          component: () => import("@/components/Templates.vue"),
          meta: {
            title: "Vorlagen",
          },
        },
        {
          path: "informations",
          component: () => import("@/components/Informations.vue"),
          meta: {
            title: "Anleitung",
          },
        },
        {
          path: "place",
          component: () => import("@/components/Place.vue"),
          meta: {
            title: "Place",
          },
        },
        {
          path: "history",
          component: () => import("@/components/History.vue"),
          meta: {
            title: "Entstehung",
          },
        },
        {
          path: "atlas",
          component: () => import("@/components/PlaceAtlas.vue"),
          meta: {
            title: "Atlas",
          },
        },
        {
          path: "tools",
          component: () => import("@/components/Tools.vue"),
          meta: {
            title: "Werkzeuge",
          },
          children: [
            {
              path: "colorCount",
              name: "colorCountTools",
              component: () => import("@/components/tools/TileColors.vue"),
              meta: {
                title: "Farbenzählung",
              },
            },
          ],
        },
      ],
    },
    {
      //Must be at the bottom, because of the asterix (*) path
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/components/NotFound.vue"),
      meta: {
        title: "Nicht gefunden",
      },
    },
  ],
});

//Set the title of the tab
router.afterEach((to) => {
  document.title = "Pixina";
  if (to.meta.title) {
    document.title += " - " + to.meta.title;
  }
});

export default router;
