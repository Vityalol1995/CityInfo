<script setup lang="ts">
interface Props {
  info: {
    iconSrc: string
    iconDescription: string,
    currentTemp: string,
    feelsLikeTemp: string
  }
}
defineProps<Props>()
</script>

<template>
  <img :src="info.iconSrc" :alt="info.iconDescription" />
  Temperature: {{ info.currentTemp }} °C (Feels like: {{ info.feelsLikeTemp }} °C)
</template>
