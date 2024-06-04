<script setup lang="ts">
import CityName from '@/components/CityName.vue';
import CityInfo from '@/components/CityInfo.vue';
import Header from '@/components/Header.vue';
import TheSpinner from '@/components/TheSpinner.vue';
import { ref, computed, onMounted } from 'vue';
import { getWeather } from '@/services/fetchWeather';
import { fetchWikiExtract } from '@/services/fetchWiki';

let weatherData = ref(null);
let cityInfo = ref(null);
let loader = ref(false)

const cityName = computed(() => {
  return weatherData?.value?.location?.name || ''
})
const cityDescription = computed(() => {
  if (!cityInfo.value) return '';
  const { pages } = cityInfo?.value?.query;
  return Object.values(pages || {})?.[0]?.extract;
});

const cityInf = computed(() => {
  return {
    iconSrc: weatherData.value?.current?.condition?.icon || '',
    iconDescription: weatherData.value?.current?.condition?.text || '',
    currentTemp: weatherData?.value?.current?.temp_c || '',
    feelsLikeTemp: weatherData?.value?.current?.feelslike_c || ''
  }
})

const error = computed(() => {
  return weatherData?.value?.error || cityInfo?.value?.error
})

onMounted(async () => {
  loader.value = true
  await fetchData('Kyiv');
  loader.value = false
});

const fetchData = async (city: string) => {
  await Promise.allSettled([getWeatherData(city), getWikiData(city)]);
};

const getWeatherData = async (city: string) => {
  weatherData.value = await getWeather(city);
  cityName.value = weatherData?.value?.location?.name || ''
};

const getWikiData = async (city: string) => {
  cityInfo.value = await fetchWikiExtract(city);
};

const getNewInfCity = async (city: string) => {

  loader.value = true
  await fetchData(city);
  loader.value = false
}
</script>

<template>
  <div class="loader-block" v-if="loader">
    <TheSpinner/>
  </div>

  <template v-else>
    <Header @search="getNewInfCity"/>

    <main class="main">
      <template v-if="error">
        There is no such city
      </template>

      <template v-else>
        <div class="layout">
          <div class="main__inf">
            <CityName :city-name="cityName" />
            <CityInfo :info="cityInf"/>
          </div>

          <div class="main_wrapper">
            <div v-html="cityDescription" />
          </div>
        </div>
      </template>
    </main>
  </template>
</template>
