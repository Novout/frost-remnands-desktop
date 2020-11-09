import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import Home from "@/pages/home/Home.jsx";
import CharacterCreate from "@/pages/character/CharacterCreate.jsx";
import CharacterProfile from "@/pages/character/CharacterProfile.jsx";

export const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/create",
      name: "CharacterCreate",
      component: CharacterCreate
    },
    {
      path: "/profile",
      name: "CharacterProfile",
      component: CharacterProfile
    },
    {
      path: "/load",
      redirect: "/"
    }
  ]
});