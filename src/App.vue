<script setup lang="ts">
import Outlier from "./components/Outlier.vue";
</script>

<template>
  <main>
    <Outlier />
  </main>
  <footer>
    Zadanie rekrutacyjne wykonane przez&nbsp;<a href="https://azalupka.cc"
      ><b>Antoniego Załupkę</b></a
    >.
  </footer>
</template>

<style scoped>
main {
  flex-grow: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
footer {
  text-align: end;
  font-size: 0.9em;
  font-style: italic;
}
a {
  text-decoration: none;
}
</style>
