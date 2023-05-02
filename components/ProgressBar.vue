<script setup lang="ts">
defineProps({
  barWidth: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="w-full bg-gray-700 rounded-full">
    <div
      class="bg-purple-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-in-out"
      :style="`width: ${barWidth}%`"
    >
      {{ barWidth }}%
    </div>
  </div>
</template>
