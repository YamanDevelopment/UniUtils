<template>
    <nav class="max-w-screen flex items-center justify-between py-4 px-12 bg-base shadow-lg z-[100]">
      <!-- Title on the left -->
      <div class="text-2xl font-bold">
        <NuxtLink to="/" class="text-title hover:text-primary">UniUtils</NuxtLink>
      </div>
  
      <!-- Empty space in the middle (flex-grow will ensure the spacing) -->
      <div class="flex-grow"></div>
  
      <!-- Links on the right -->
      <div class="flex gap-8">
        <NuxtLink v-if="isAuthenticated" to="/dashboard" class="text-title hover:text-primary text-xl">Dashboard</NuxtLink>
        <NuxtLink to="/about" class="text-title hover:text-primary text-xl">About</NuxtLink>
      </div>
    </nav>
  </template>
  
  <style scoped>
  /* Optionally add some hover transitions for a smoother UI */
  a {
    transition: color 0.3s ease;
  }
  </style>
  
  <script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

// Composition API
const auth0 = process.client ? useAuth0() : undefined

const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value
})

const login = () => {
  auth0?.checkSession()
  if (!auth0?.isAuthenticated.value) {
    auth0?.loginWithRedirect({
      appState: {
        target: useRoute().path,
      },
    })
  }
}

const logout = () => {
  navigateTo('/')
  auth0?.logout()
}
</script>