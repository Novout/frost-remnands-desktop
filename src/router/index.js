import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/pages/home/Home.jsx")
    }
  ]
});