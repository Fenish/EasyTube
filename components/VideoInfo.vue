<script setup lang="ts">
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
const videoData = props.data;
console.log(videoData);

function formatTime(totalSeconds: number): string {
  let hours: number = Math.floor(totalSeconds / 3600);
  let minutes: number = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds: number = totalSeconds - hours * 3600 - minutes * 60;

  // Use string interpolation to format the time
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col bg-zinc-800 border-zinc-700 border-2 select-none rounded-sm w-72 md:w-96"
    >
      <img
        class="w-full h-auto mx-auto"
        :src="`https://i.ytimg.com/vi/${videoData.videoDetails.videoId}/maxresdefault.jpg`"
        :alt="videoData.videoDetails.title"
        draggable="false"
      />
      <div class="py-3 px-10 text-left space-y-4">
        <div class="flex flex-col">
          <a class="font-medium text-white">
            {{ videoData.videoDetails.title }}
          </a>
          <a
            class="text-violet-400 hover:text-violet-300"
            :href="videoData.videoDetails.author.channel_url"
            target="_blank"
          >
            {{ videoData.videoDetails.ownerChannelName }}
          </a>
          <div class="flex items-center">
            <Icon
              name="ic:sharp-watch-later"
              class="text-zinc-500 w-5 h-5 mr-1"
            />
            <a class="text-zinc-500">
              {{ formatTime(videoData.videoDetails.lengthSeconds) }}
            </a>
          </div>
          <div class="flex mt-4">
            <div class="flex items-center mr-5">
              <Icon
                name="ic:baseline-remove-red-eye"
                class="text-zinc-500 w-5 h-5 mr-1"
              />
              <a class="text-zinc-500">
                {{ videoData.videoDetails.viewCount }}
              </a>
            </div>
            <div class="flex items-center">
              <Icon
                name="ion:md-thumbs-up"
                class="text-zinc-500 w-5 h-5 mr-1"
              />
              <a class="text-zinc-500">
                {{ videoData.videoDetails.likes }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
