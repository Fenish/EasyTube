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
const convertingStatus = ref(false);
let converted = false;

const video = {
  title: "",
  thumbnail: "",
  format: "",
};

async function convert() {
  video.title = "";
  video.thumbnail = "";
  video.format = "";
  convertingStatus.value = true;
  $io.emit(VideoEvents.get_data, {
    url: videoUrl.value,
  });
}

$io.on(VideoEvents.video_info, (data) => {
  convertingStatus.value = false;
  video.title = data.videoDetails.title;
  video.thumbnail = `https://i.ytimg.com/vi/${data.videoDetails.videoId}/maxresdefault.jpg`;
  video.format = videoFormat.value;
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
                :class="convertingStatus ? 'querying' : ''"
                :disabled="convertingStatus"
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
                :class="convertingStatus ? 'querying' : ''"
                :disabled="convertingStatus"
              >
                <option selected="true">MP3</option>
                <option value="mp4">MP4</option>
              </select>
            </div>
            <button
              class="bg-purple-500 p-3 px-7 text-white text-md font-medium grow"
              @click="convert"
              :class="convertingStatus ? 'querying' : ''"
              :disabled="convertingStatus"
            >
              Convert
            </button>
          </div>
        </div>
      </div>
      <div class="flex w-full mt-4 px-10" v-if="barVisibility">
        <ProgressBar :bar-width="barWidth" />
      </div>
    </div>

    <div class="flex mt-10" v-if="video['title'] != ''">
      <VideoInfo
        :title="video.title"
        :thumbnail="video.thumbnail"
        :format="video.format"
      />
    </div>
  </div>
</template>

<style scoped>
.querying {
  cursor: not-allowed;
  color: rgba(255, 255, 255, 0.308);
}
</style>
