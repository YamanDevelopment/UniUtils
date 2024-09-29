<!-- pages/dashboard.vue -->
<template>
    <div class="w-screen h-[90vh] flex justify-center items-center">
        <week_view class="w-1/2 h-1/2" />
    </div>
    
  </template>
  
  <script setup>
  import { useAuth0 } from '@auth0/auth0-vue'
  
  const { user, isAuthenticated } = useAuth0()
  
  // Add any dashboard-specific logic here
  </script>