<script setup>
import { ref } from 'vue'

const inputData = ref('')
const inputCity = ref('')
const response = ref('')

const submitForm = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/zettel-to-uuid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zettel_id: inputData.value,
        city: inputCity.value
      })
    })
    response.value = await res.json()
  } catch (err) {
    console.error('API error:', err)
    response.value = { error: 'Failed to contact server.'}
  }
}
</script>

<template lang="pug">
div.container.mt-5
  div.row
    h1.text-center UUID Generator (Zettel)
    form(@submit.prevent="submitForm")
      .mb-3
        //- label.form-label(for="input") Input
        input.form-control(
          v-model="inputData",
          id="input",
          placeholder="YYYYmmddHHMM[SS[NNN]]"
        )
        input.form-control(
          v-model="inputCity",
          id="input_city",
          placeholder="Blah"
        )
      button.btn.btn-primary(type="submit") Submit
  div.mt-4
    h5 Response:
    pre {{ response }}
    h5 Result:
    pre {{ response.uuid }}
</template>
