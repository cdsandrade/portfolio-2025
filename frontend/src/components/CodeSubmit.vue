<template lang="pug">
div.container.mt-5
  h1.text-center Code Submit
  form(@submit.prevent="submitForm")
    .mb-3
      label.form-label(for="input") Input
      input.form-control(v-model="inputData", id="input")
    button.btn.btn-primary(type="submit") Submit
  div.mt-4
    h5 Response:
    pre {{ response }}
    h5 Result:
    pre {{ response.result }}
</template>

<script setup>
import { ref } from 'vue'

const inputData = ref('')
const response = ref('')

const submitForm = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: inputData.value })
    })
    response.value = await res.json()
  } catch (err) {
    console.error('API error:', err)
    response.value = { error: 'Failed to contact server.'}
  }
}
</script>
