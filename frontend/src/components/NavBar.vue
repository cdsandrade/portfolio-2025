<script setup>
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Hello World', to: '/hello' },
  { name: 'Code Submit', to: '/code-submit' },
  { name: 'Epoch → UUID', to: '/epoch-to-uuid' },
  { name: 'Zettel → UUID', to: '/zettel-to-uuid' },
]

const isActive = (to) => route.path === to
</script>

<template lang="pug">
nav.navbar.sticky-top.navbar-expand-lg.bg-body-tertiary(data-bs-theme="dark")
  div.container-fluid
    span.navbar-brand.mb-0.h1 Portfolio
    button.navbar-toggler(
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    )
      span.navbar-toggler-icon
    div.collapse.navbar-collapse#navbarNav
      div.navbar-nav
        RouterLink.nav-link(
          v-for="link in navigation"
          :key="link.to" :to="link.to"
          :class="{ active: isActive(link.to) }"
          :aria-current="isActive(link.to) ? 'page' : null"
        ) {{ link.name }}
</template>
