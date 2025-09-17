import { createRouter, createWebHistory } from "vue-router";
import TeamsView from "../views/TeamsView.vue";
import TeamDetailView from "../views/TeamDetailView.vue";
import PlayoffPredictor from "../views/PlayoffPredictor.vue";

const routes = [
  { path: "/", redirect: "/teams" },
  { path: "/teams", name: "Teams", component: TeamsView },
  { path: "/teams/:id", name: "TeamDetail", component: TeamDetailView },
  { path: "/playoff", name: "Playoff", component: PlayoffPredictor }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
