<script setup>
import Salle from "@/components/Salle.vue";
import NavBar from "@/components/NavBar.vue";
import Films from "@/components/Films.vue";
</script>

<template>
  <header>
    <NavBar/>
  </header>

  <main>
     <router-view/>
  </main>
</template>

<style scoped>

</style>
