<!-- pages/login.vue -->
<template>
    <div>
      <h1 class="text-2xl font-bold mb-4 text-center">Welcome to Our App</h1>
      <Auth0LoginSignup />
    </div>
  </template>
  
  <script setup>
  import Auth0LoginSignup from '~/components/Auth0LoginSignup.vue'
  </script>