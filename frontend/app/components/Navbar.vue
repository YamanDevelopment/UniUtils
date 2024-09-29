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
        <NuxtLink to="/AuthPage" class="text-title hover:text-primary text-xl">Login</NuxtLink>
        <NuxtLink to="/AuthPage" class="text-title hover:text-primary text-xl">Signup</NuxtLink>
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
  