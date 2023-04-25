<script setup lang="ts">
const response = await $fetch("/api/test");
</script>

<template>
  <h1>Backend TEST</h1>
  <a> {{ response.api }} </a>
</template>
