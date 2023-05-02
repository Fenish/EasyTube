<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex bg-white flex-col p-5">
    <h1>{{ $props.title }}</h1>
    <h2>{{ $props.thumbnail }}</h2>
    <h3>{{ $props.format }}</h3>
  </div>
</template>
