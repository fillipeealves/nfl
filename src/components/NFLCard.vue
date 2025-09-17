<template>
  <div
    class="card"
    :style="{ background: teamPrimaryColor, color: teamSecondaryColor, borderColor: teamSecondaryColor }"
  >
    <p>{{ team.Key }}</p>
    <div class="logo-container">
      <img v-if="team.WikipediaLogoUrl" :src="team.WikipediaLogoUrl" alt="Logo do time" class="logo" />
    </div>
    <div class="team-names">
      <h2 class="city">{{ team.City }}</h2>
      <h2 class="name">{{ team.Name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "NflCard",
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  computed: {
    teamPrimaryColor() {
      const color = this.team.PrimaryColor;
      if (!color) return "#ffffff";
      return color.startsWith("#") ? color : `#${color}`;
    },
    teamSecondaryColor() {
      const color = this.team.SecondaryColor;
      if (!color) return "#000000";
      return color.startsWith("#") ? color : `#${color}`;
    },
    teamTertiaryColor() {
      const color = this.team.TertiaryColor;
      if (!color) return "#000000";
      return color.startsWith("#") ? color : `#${color}`;
    },
    teamQuaternaryColor() {
      const color = this.team.QuaternaryColor;
      if (!color) return "#000000";
      return color.startsWith("#") ? color : `#${color}`;
    }
  }
}
</script>

<style scoped>
.card {
  border: 5px solid #000000;
  padding: 1rem;
  margin: 0.75rem;
  border-radius: 300px;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 15px;
}

.logo-container {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
}

.logo {
  max-height: 75px;
  width: auto;
  max-width: 100%;
}

.team-names {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10;
}

.team-names .city,
.team-names .name {
  margin: 10;
  line-height: 1.1;
  font-size: 1.3em;
}

.team-names .city {
  margin-bottom: 0px;
}
</style>
