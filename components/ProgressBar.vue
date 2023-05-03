<script setup lang="ts">
defineProps({
  barWidth: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="w-full bg-gray-700">
    <div
      class="bg-purple-500 font-medium text-blue-100 text-center p-0.5 leading-none transition-all duration-500 ease-in-out"
      :style="`width: ${$props.barWidth}%`"
      v-if="$props.barWidth !== 0"
    ></div>
  </div>
</template>
