<template>
  <div>
    <div v-if="loading">Loading teams...</div>
    <div v-else class="grid">
      <div class="title-overlay">
        <h1>NFL Teams</h1>
      </div>
      <router-link 
        v-for="team in teams" 
        :key="team.TeamID" 
        :to="`/teams/${team.TeamID}`"
        class="card-link"
      >
        <NflCard :team="team" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../services/NFLapi.js";
import NflCard from "../components/NFLCard.vue";

export default {
  name: "TeamsView",
  components: { NflCard },
  setup() {
    const teams = ref([]);
    const loading = ref(true);

    const fetchTeams = async () => {
      try {
        const response = await api.get("https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=8e82062845264f16912a10417066c465");
        teams.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchTeams);

    return { teams, loading };
  }
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-image: url('../assets/field.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  min-height: 100vh;
}

.title-overlay {
  position: absolute;
  top: -25px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 2;
  padding: 2rem 0 1rem 0;
  pointer-events: none;
}

.title-overlay h1 {
  color: white;
  text-shadow: 2px 2px 8px #000000;
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 2px;
}

.card-link {
  text-decoration: none;
  color: inherit;
  margin-top: 5rem;
}
</style>
