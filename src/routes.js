import { createRouter, createWebHistory } from "vue-router";

export default () =>
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        component: () => import("./pages/Home.vue"),
        props: true,
      },
      {
        path: "/bokningar",
        name: "Bokningar",
        component: () => import("./pages/Bokningar.vue"),
        props: true,
      },
      {
        path: "/hemvarnsgarden",
        name: "Hemvärnsgården",
        component: () => import("./pages/Hemvarnsgarden.vue"),
        props: true,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("./pages/NotFound.vue"),
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: "smooth",
        };
      }
    },
  });
