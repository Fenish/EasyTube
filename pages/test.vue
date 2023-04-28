<script setup lang="ts">
import fs, { stat } from "fs";

const { $io } = useNuxtApp();
const state = reactive({
  counter: 0,
});
const videoUrl = ref("");

if (process.client) {
  $io.connect();
}

$io.on(ConvertProgress.current_progress, (message) => {
  state.counter = message;
});

function up() {
  $io.emit(ConvertProgress.converting, { value: 1 });
}
</script>
<template>
  <div class="bg-gray-200 w-screen h-screen flex justify-center items-center">
    <div class="flex flex-col justify-center">
      <div class="flex justify-center flex-col text-center">
        <h1 class="text-3xl">Websockets Test</h1>
        <h1 class="text-xl">
          ProgressBar: <a class="text-purple-500">{{ state.counter }}</a>
        </h1>
      </div>
      <div class="flex justify-center">
        <button
          @click="up"
          class="p-3 border-2 border-black mt-10 ml-5 bg-green-300"
        >
          Up
        </button>
        <button
          @click="up"
          class="p-3 border-2 border-black ml-10 mt-10 bg-red-300"
        >
          down
        </button>
      </div>
    </div>
  </div>
</template>
