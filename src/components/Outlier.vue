<script setup lang="ts">
import { ref } from "vue";
import { findArrayOutlier } from "../utils/arrayUtilities";
import Throbber from "./ui/Throbber.vue";

const outlier = ref<number | null>(null);
const loading = ref<boolean>(false);
const arrayInput = ref<string>("");
const errorMessage = ref<string>("");
const time = ref<number>(0);

function handleSubmit(e: Event) {
  e.preventDefault();

  loading.value = true;
  errorMessage.value = "";
  time.value = 0;
  performance.mark("outlier-start");
  try {
    let array = [];
    try {
      array = JSON.parse(arrayInput.value);
    } catch (e) {
      throw new Error("Niepoprawny format tablicy.");
    }
    outlier.value = findArrayOutlier(array);
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
    performance.mark("outlier-end");
    performance.measure("outlier-calculation", "outlier-start", "outlier-end");
    const measure = performance.getEntriesByName("outlier-calculation").pop();
    time.value = Math.round((measure?.duration || 0) * 100) / 100;
  }
}
</script>

<template>
  <div class="outlier-container">
    <Throbber v-if="loading" />

    <form @submit="handleSubmit" v-if="outlier === null && !loading">
      <div>
        <h1>Wartość odstająca</h1>
        <p v-if="errorMessage" class="error"><b>BŁĄD:</b> {{ errorMessage }}</p>
      </div>

      <div>
        <label for="array">Tablica: </label>
        <input
          id="array"
          v-model.trim="arrayInput"
          type="text"
          placeholder="np. [0, 2, 1, 4]"
        />
      </div>
      <button type="submit">Wyszukaj</button>
    </form>

    <div v-if="outlier !== null && !loading" class="result">
      <h2>Wartość odstająca:</h2>
      <h1>{{ outlier }}</h1>
      <div class="result-footer">
        <button @click="outlier = null">Powrót</button>
        <span
          >Czas wyszukania: ~{{ time }}ms <br />
          via algorytm liniowy O(n)</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.outlier-container {
  width: 100%;
  max-width: 400px;
  margin: 50px 0;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
}
form div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
form label {
  text-align: left;
}
form input {
  padding: 5px;
  margin: 5px 0;
}
.error {
  color: lightcoral;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.result h2 {
  width: 100%;
  text-align: left;
}
.result h1 {
  font-size: 12em;
  margin: 0;

  background: -webkit-linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
  -webkit-background-clip: text;
  background-clip: text; /*for safari*/
  -webkit-text-fill-color: transparent;
}
.result-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 5px;
}
.result-footer span {
  font-size: 0.8em;
}
</style>
