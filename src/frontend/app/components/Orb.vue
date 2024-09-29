<template>
    <div class="flex justify-center items-center">
      <div class="relative">
        <!-- Glowing Orb -->
        <div class="w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-primary to-accent filter blur-xl opacity-80 animate-pulse"></div>
  
        <!-- Inner Core of the Orb for a glowing effect -->
        <div class="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary to-accent opacity-50 blur-3xl"></div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Add a subtle animation to the glowing orb for visual appeal */
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  .animate-pulse {
    animation: pulse 5s infinite;
  }
  </style>
  