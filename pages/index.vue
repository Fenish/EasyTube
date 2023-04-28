<script setup lang="ts">
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

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
let converted = false;

async function fakeProgress() {
  barWidth.value = 0;
  let count = 0;
  let increment = 0;
  while (count < 80 && (count += increment) < 80) {
    if (converted) break;
    increment = Math.floor(Math.random() * 4);
    count += increment;
    barWidth.value = Math.round(count);
    await wait(300);
  }
  while (count >= 80 && count <= 99) {
    if (converted) break;
    increment = Math.floor(Math.random() * 2);
    count += increment;
    barWidth.value = Math.round(count);
    await wait(500);
  }
}

async function convert() {
  converted = false;
  barVisibility.value = true;
  barWidth.value = 0;
  await fakeProgress();
  useFetch("/api/convert?&url=" + videoUrl.value).then(() => {
    converted = true;
    barWidth.value = 100;
  });
}
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
            class="bg-purple-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-in-out"
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
