<template>
  <div
    class="team-bg"
    :style="{
      background: team && team.PrimaryColor ? (team.PrimaryColor.startsWith('#') ? team.PrimaryColor : '#' + team.PrimaryColor) : '#ffffff'
    }"
  >
    <div
      class="team-detail"
      v-if="team"
      :style="{
        background: team.SecondaryColor ? (team.SecondaryColor.startsWith('#') ? team.SecondaryColor : '#' + team.SecondaryColor) : '#ffffff',
        color: team.PrimaryColor ? (team.PrimaryColor.startsWith('#') ? team.PrimaryColor : '#' + team.PrimaryColor) : '#222'
      }"
    >
      <h1>{{ team.FullName }}</h1>
      <div class="logo-slot">
        <img :src="team.WikipediaLogoUrl" :alt="team.FullName" class="team-logo" />
      </div>
      <div class="logo-slot">
        <img :src="team.WikipediaWordMarkUrl" :alt="team.FullName" class="team-mark" />
      </div>

      <div class="info">
        <p><strong>Abbreviation:</strong> {{ team.Key }}</p>
        <p><strong>Region:</strong> {{ team.City }}</p>
        <p><strong>Stadium (Capacity):</strong> {{ team.StadiumDetails?.Name }} ({{ team.StadiumDetails?.Capacity }})</p>
        <p><strong>Location:</strong> {{ team.StadiumDetails?.City}} - {{team.StadiumDetails?.State}}</p>
        <p><strong>Conference:</strong> {{ team.Conference }}</p>
        <p><strong>Division:</strong> {{ team.Conference }} {{ team.Division }}</p>
        <p><strong>Head Coach:</strong> {{ team.HeadCoach }}</p>
        <p><strong>Offensive Coordinator:</strong> {{ team.OffensiveCoordinator }}</p>
        <p><strong>Defensive Coordinator:</strong> {{ team.DefensiveCoordinator }}</p>
      </div>

      <router-link to="/" class="back">⬅ Voltar</router-link>
    </div>

    <div v-else class="loading">
      Loading team...
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from "../services/NFLapi.js";

const route = useRoute();
const teamId = route.params.id; // rota precisa ter :id
const team = ref(null);

onMounted(async () => {
  try {
    const response = await api.get(
      "https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=8e82062845264f16912a10417066c465"
    );

    // encontra o time pelo TeamID vindo da rota
    team.value = response.data.find((t) => String(t.TeamID) === String(teamId));
  } catch (error) {
    console.error("Erro ao buscar dados do time:", error);
  }
});
</script>

<style scoped>
.team-bg {
  width: 100%;
  padding: 2rem 0;
}

.team-detail {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 1.15rem;
}

.logo-slot {
  background: #fff;
  border-radius: 10px;
  border: 3px solid;
  padding: 1rem;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
}

.team-logo {
  max-width: 150px;
  max-height: 100px;
}

.team-mark {
  max-width: 150px;
  max-height: 60px;
}

.info {
  margin-top: 1.5rem;
  text-align: left;
  font-size: 1.05rem;
  line-height: 1.6;
}

.back {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background: #ff0000;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  transition: 0.2s;
  font-size: 1rem;
  font-family: 'Roboto', Arial, sans-serif;
  border: 2px solid #fff; /* Add white border for visibility */
}

.back:hover {
  background: #d62828;
  border-color: #222; /* Optional: dark border on hover */
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3rem;
  font-family: inherit;
}
</style>
