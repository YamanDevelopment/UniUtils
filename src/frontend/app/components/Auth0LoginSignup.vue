<template>
  <div class="cursor-pointer">
    <a
      v-if="!isAuthenticated"
      @click="login"
    >
      <slot>Get Started</slot>
    </a>
    <a
      v-else
      @click="logout"
    >
      <slot>Log Out</slot>
    </a>
  </div>
</template>

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