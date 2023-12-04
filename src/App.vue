<template>
  <div id="app">
    <img class="logo" :src="logo" alt="Logo">
    <router-view />
  </div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: 'App',
  components: {
  },
  methods: {
    toMaifit() {
      this.$router.push({ name: 'MaifitHome' });
    }
  },
  data() {
    return {
      logo
    }
  }
}
</script>

<style>
.logo {
  width: 512px;
  margin-bottom: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
