<template>
  <div>
    <button @click="$router.back()">⬅ Voltar</button>

    <div v-if="loading">Carregando detalhes...</div>
    <div v-else-if="team">
      <h1>{{ team.FullName }}</h1>
      <img v-if="team.WikipediaLogoUrl" :src="team.WikipediaLogoUrl" alt="Logo" />
      <p><strong>Conference:</strong> {{ team.Conference }}</p>
      <p><strong>Division:</strong> {{ team.Conference }} {{ team.Division }}</p>
      <p><strong>Stadium:</strong> {{ team.StadiumDetails.Name }}</p>
     <p><strong>Location:</strong> {{ team.StadiumDetails.City }} - {{ team.StadiumDetails.State }}</p>
    </div>
    <div v-else>
      <p>Time não encontrado.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../services/NFLapi.js";

export default {
  name: "TeamDetailView",
  setup(props, { route }) {
    const team = ref(null);
    const loading = ref(true);
    const routeParams = route.params;

    const fetchTeam = async () => {
      try {
        const response = await api.get("https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=8e82062845264f16912a10417066c465");
        const allTeams = response.data;
        team.value = allTeams.find(t => t.TeamID === Number(routeParams.id));
      } catch (error) {
        console.error("Erro ao buscar detalhes do time:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchTeam);

    return { team, loading };
  }
};
</script>
