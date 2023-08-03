import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/components/NavigationComponent.vue"),
      children: [
        {
          path: "",
          redirect: "templates",
        },
        {
          path: "templates",
          name: "Templates",
          component: () => import("@/components/TemplatesComponent.vue"),
          meta: {
            title: "templates",
          },
          children: [
            {
              path: ":number",
              name: "Template",
              component: () => import("@/components/tiles/TileComponent.vue"),
              meta: {
                title: "template",
              },
              children: [
                {
                  path: "colors",
                  redirect: { name: "ColorCount" },
                },
              ],
            },
          ],
        },
        {
          path: "informations",
          component: () => import("@/components/InformationsComponent.vue"),
          meta: {
            title: "informations",
          },
        },
        {
          path: "place",
          redirect: "image",
        },
        {
          path: "image",
          component: () => import("@/components/PlaceComponent.vue"),
          meta: {
            title: "image",
          },
        },
        {
          path: "history",
          component: () => import("@/components/HistoryComponent.vue"),
          meta: {
            title: "history",
          },
        },
        {
          path: "atlas",
          component: () => import("@/components/PlaceAtlasComponent.vue"),
          meta: {
            title: "atlas",
          },
        },
        {
          path: "tools",
          name: "Tools",
          component: () => import("@/components/ToolsComponent.vue"),
          meta: {
            title: "tools",
          },
          children: [
            {
              path: "colorCount",
              redirect: { name: "ColorCount" },
            },
            {
              path: "color-count",
              name: "ColorCount",
              component: () => import("@/components/tools/TileColors.vue"),
              meta: {
                title: "color-count",
              },
            },
          ],
        },
        {
          path: "privacy",
          component: () => import("@/components/privacy/PrivacyPolicy.vue"),
          meta: {
            title: "privacy",
          },
        },
      ],
    },
    {
      //Must be at the bottom, because of the asterix (*) path
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/components/NotFoundComponent.vue"),
    },
  ],
});

export default router;
