<script setup lang="ts">
const { $io } = useNuxtApp();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
});

if (process.client) {
  $io.connect();
}

// Variables

const fileName = ref("");
const downloadData = ref("#");
const progressValue = ref(0);
const isConverted = ref(false);

// Watchers

$io.on(ProgressEvents.progress_status, (data) => {
  progressValue.value = data;
});

$io.emit(VideoEvents.start_download, {
  url: props.data.videoDetails.video_url,
  format: props.format,
});

$io.on(VideoEvents.video_blob, (data) => {
  let BLOBTYPE: "video/mp4" | "audio/mp3" = "video/mp4";
  if (props.format.toLowerCase() === "mp3") {
    BLOBTYPE = "audio/mp3";
  }
  const blob = new Blob(data, { type: BLOBTYPE });
  const url = URL.createObjectURL(blob);
  downloadData.value = url;
  fileName.value = `${
    props.data.videoDetails.title
  } - EasyTube.${props.format.toLowerCase()}`;
  isConverted.value = true;
});

// Functions

function formatTime(totalSeconds: number): string {
  let hours: number = Math.floor(totalSeconds / 3600);
  let minutes: number = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds: number = totalSeconds - hours * 3600 - minutes * 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num ? num : 0;
}

function download() {}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col bg-zinc-800 border-zinc-700 border-2 rounded-sm w-72 md:w-[500px]"
    >
      <img
        class="w-full h-auto mx-auto select-none"
        :src="`https://i.ytimg.com/vi/${$props.data.videoDetails.videoId}/maxresdefault.jpg`"
        :alt="$props.data.videoDetails.title"
        draggable="false"
      />
      <div class="py-3 px-10 text-left space-y-4">
        <div class="flex flex-col">
          <a class="font-medium text-white">
            {{ $props.data.videoDetails.title }}
          </a>
          <a
            class="text-violet-400 hover:text-violet-300"
            :href="$props.data.videoDetails.author.channel_url"
            target="_blank"
          >
            {{ $props.data.videoDetails.ownerChannelName }}
          </a>
          <div class="flex items-center">
            <Icon
              name="ic:sharp-watch-later"
              class="text-zinc-500 w-5 h-5 mr-1"
            />
            <a class="text-zinc-500">
              {{ formatTime($props.data.videoDetails.lengthSeconds) }}
            </a>
          </div>
          <div class="flex mt-4 flex-col md:flex-row">
            <div class="flex">
              <div class="flex items-center mr-5">
                <Icon
                  name="ic:baseline-remove-red-eye"
                  class="text-zinc-500 w-5 h-5 mr-1"
                />
                <a class="text-zinc-500">
                  {{ formatNumber($props.data.videoDetails.viewCount) }}
                </a>
              </div>
              <div class="flex items-center">
                <Icon
                  name="ion:md-thumbs-up"
                  class="text-zinc-500 w-5 h-5 mr-1"
                />
                <a class="text-zinc-500">
                  {{ formatNumber($props.data.videoDetails.likes) }}
                </a>
              </div>
            </div>
            <div class="flex pb-2 w-full justify-end">
              <a :href="downloadData" :download="fileName">
                <button
                  class="bg-violet-500 text-white px-5 py-2 rounded-md w-full mt-3 md:mt-0 md:w-auto select-none"
                  @click="download"
                  :disabled="!isConverted"
                  :class="!isConverted ? 'opacity-50 cursor-not-allowed' : ''"
                >
                  Download {{ format }}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ProgressBar :barWidth="progressValue" />
    </div>
  </div>
</template>
