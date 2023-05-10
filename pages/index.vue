<script setup lang="ts">
const { $io } = useNuxtApp();
if (process.client) {
  $io.connect();
}
useHead(() => ({
  title: "EasyTube - Youtube Converter",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "Easy youtube converter to mp3 and mp4 online. No ads, no popups. Just convert your youtube videos to mp3 and mp4. EasyTube is the best youtube converter online for free.",
    },
    {
      id: "og:image",
      property: "og:image",
      content: useRuntimeConfig().public.BASE_URL + "/_nuxt/logo.a014029a.png",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
}));

const videoUrl = ref("");
const videoFormat = ref("MP3");
const errorState = ref(false);
const errorMessage = ref("");
const convertingStatus = ref(false);

let video = {};

async function convert() {
  video = {};
  errorState.value = false;
  errorMessage.value = "";
  convertingStatus.value = true;
  $io.emit(VideoEvents.get_data, {
    url: videoUrl.value,
  });
}

$io.on(VideoEvents.video_info, (data) => {
  video = data;
  if (data.error) {
    errorState.value = true;
    errorMessage.value = data.error;
  }
  convertingStatus.value = false;
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
                class="bg-zinc-700 text-white w-full text-lg p-3 pl-14 pr-5 outline-none select-none"
                placeholder="Enter youtube link"
                autocomplete="off"
                v-model="videoUrl"
                :class="convertingStatus ? 'opacity-50 cursor-not-allowed' : ''"
                :disabled="convertingStatus"
              />
            </div>
          </div>
          <div class="flex w-full">
            <div>
              <select
                id="formats"
                class="outline-none p-3 px-6 bg-gray-600 text-white rounded-none text-lg select-none"
                ,
                v-model="videoFormat"
                :class="convertingStatus ? 'opacity-50 cursor-not-allowed' : ''"
                :disabled="convertingStatus"
              >
                <option selected="true">MP3</option>
                <option value="MP4">MP4</option>
              </select>
            </div>
            <button
              class="bg-purple-500 p-3 px-7 text-white text-md font-medium grow select-none"
              @click="convert"
              :class="convertingStatus ? 'opacity-50 cursor-not-allowed' : ''"
              :disabled="convertingStatus"
            >
              Convert
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3" v-if="errorState">
      <a class="text-red-400 select-none">{{ errorMessage }}</a>
    </div>
    <div class="flex mt-5" v-if="Object.keys(video).length > 1">
      <VideoInfo :data="video" :format="videoFormat" />
    </div>
  </div>
</template>
