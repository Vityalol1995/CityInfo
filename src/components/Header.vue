<script setup lang="ts">
import { ref, defineEmits } from 'vue'

let city = ref('')
let validationError  = ref('')

const emits = defineEmits<{
  (e: 'search', value: string):void
}>()

const handlerForm = () => {
  if (!city.value.length) {
    validationError.value = 'The field must not be empty'
    return
  }
  if (!/^[a-zA-Z\s]+$/.test(city.value)) {
    validationError.value = 'Please enter a valid city name in English.'
    return
  }

  let words = city.value.split(' ')
  if (words.length === 2) {
    city.value = `${ validFormat(words[0])}_${ validFormat(words[1])}`
  }

  validationError.value = ''

  emits('search', city.value)
}

const validFormat = (str: string) => {
  const splitted = str.split("")
  const first = splitted[0].toUpperCase()
  const rest = [...splitted]
  rest.splice(0, 1)
  return [first, ...rest].join("")
}
</script>

<template>
  <header class="header">
    <form @submit.prevent="handlerForm" class="header__block">
      <input v-model="city" placeholder="Search for country" type="search">
      <button type="submit">Search</button>
      <span class="header__error" v-if="validationError">{{validationError}}</span>
    </form>
  </header>
</template>
