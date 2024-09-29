<!-- pages/auth.vue -->
<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)
const isLoading = ref(true) // Add a loading state
let login = () => {}
let logoutUser = () => {}

onMounted(() => {
  if (process.client) {
    const { loginWithRedirect, logout, isAuthenticated: authState, isLoading: authLoading } = useAuth0()

    // Wait until Auth0 finishes loading the auth state
    authLoading.value.then(() => {
      isAuthenticated.value = authState
      isLoading.value = false
    })

    login = () => {
      loginWithRedirect()
    }

    logoutUser = () => {
      logout({ returnTo: window.location.origin })
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Login or Sign Up</h1>

    <div v-if="isLoading" class="text-lg">Loading...</div> <!-- Loading state -->

    <div v-else-if="!isAuthenticated" class="space-y-4">
      <button
        @click="login"
        class="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition"
      >
        Login / Sign Up with Auth0
      </button>
    </div>

    <div v-else class="space-y-4">
      <p class="text-lg">You are logged in!</p>
      <button
        @click="logoutUser"
        class="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
</template>
