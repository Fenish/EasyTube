<script setup lang="ts">
const { $io } = useNuxtApp();
if (process.client) {
  $io.connect();
}

console.log($io);
useHead(() => ({
  title: "EasyTube - Youtube Converter",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Easy youtube converter to mp3 and mp4",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
}));

const videoUrl = ref("");
const videoFormat = ref("MP3");
const barWidth = ref(0);
const barVisibility = ref(false);

async function convert() {
  $io.emit(ConvertProgress.reset);
  console.log(videoUrl.value, videoFormat.value);
  let interval = setInterval(() => {
    if (barWidth.value === 100) {
      clearInterval(interval);
    } else {
      $io.emit(ConvertProgress.converting, { value: 1 });
    }
  }, 50);
}
$io.on(ConvertProgress.current_progress, (message) => {
  console.log(message);
  barWidth.value = message;
  if (barWidth.value > 0) {
    barVisibility.value = true;
  } else {
    barVisibility.value = false;
  }
});
</script>

<template>
  <div
    class="bg-zinc-800 w-screen h-screen bg-[url('~/assets/img/pattern.png')] flex justify-center items-center flex-col"
  >
    <div class="flex items-center mb-12">
      <img
        src="~/assets/img/logo.png"
        width="70"
        draggable="false"
        class="select-none"
        alt="EasyTube"
      />
      <a class="text-white text-6xl font-Pacifico ml-5 select-none">EasyTube</a>
    </div>
    <div class="flex flex-col">
      <div class="w-full flex justify-center">
        <div class="flex justify-center items-center flex-col md:flex-row">
          <div class="w-full">
            <div class="relative">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6 absolute top-0 left-0 mt-[14px] ml-4 text-zinc-500"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                type="text"
                id="default-input"
                class="bg-zinc-700 text-white w-full text-lg p-3 pl-14 pr-5 outline-none"
                placeholder="Enter youtube link"
                autocomplete="off"
                v-model="videoUrl"
              />
            </div>
          </div>
          <div class="flex w-full">
            <div>
              <select
                id="formats"
                class="outline-none p-3 px-6 bg-gray-600 text-white rounded-none text-lg"
                ,
                v-model="videoFormat"
              >
                <option selected="true">MP3</option>
                <option value="mp4">MP4</option>
              </select>
            </div>
            <button
              class="bg-purple-500 p-3 px-7 text-white text-md font-medium grow"
              @click="convert"
            >
              Convert
            </button>
          </div>
        </div>
      </div>
      <div class="flex w-full mt-4 px-10" v-if="barVisibility">
        <div class="w-full bg-gray-700 rounded-full">
          <div
            class="bg-purple-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            :style="`width: ${barWidth}%`"
          >
            {{ barWidth }}%
          </div>
        </div>
      </div>
    </div>

    <div class="flex"></div>
  </div>
</template>
