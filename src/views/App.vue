<template>
  <div>
    <nav>
      <router-link to="/teams">Teams</router-link>
      <router-link to="/playoff">Playoff Predictor</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
nav {
  background: #111111;
  padding: 1.5rem;
}
nav a {
  color: #CCCCCC;
  margin-right: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
