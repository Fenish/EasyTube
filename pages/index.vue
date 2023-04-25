<script>
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
      />
      <a class="text-white text-6xl font-Pacifico ml-5 select-none">EasyTube</a>
    </div>
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
            />
          </div>
        </div>
        <div class="flex w-full">
          <div>
            <select
              id="countries"
              class="outline-none p-3 px-6 bg-gray-600 text-white rounded-none text-lg"
            >
              <option selected="mp3">MP3</option>
              <option value="mp4">MP4</option>
            </select>
          </div>
          <button
            class="bg-purple-500 p-3 px-7 text-white text-md font-medium grow"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
