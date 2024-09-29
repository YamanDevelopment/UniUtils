<!-- pages/dashboard.vue -->
<template>
    <div class="w-screen h-[90vh] flex gap-3 items-center p-4">
        <div class="w-[30vw] h-full rounded-xl bg-base2 flex flex-col items-center gap-5 p-6">
          <input class="bg-base w-[90%] h-[10%] rounded-full text-text"></input>
        </div>
        <div class="flex flex-col gap-3 w-[70vw] h-full">
            <div class="w-full h-1/2 p-6 bg-base2 flex gap-5 rounded-xl overflow-x-scroll">
                <h1 class="text-3xl text-title font-bold">Favorites</h1>
                <week_view class="w-1/2 h-1/2" :events="events" />
                <week_view class="w-1/2 h-1/2" :events="events" />
                <NuxtLink to="/new" class="px-4 py-2 rounded-xl text-text text-center text-xl font-bold bg-gradient-to-br from-primary to-accent">New Schedule</NuxtLink>
            </div>
            <div class="w-full h-1/2 p-6 bg-base2 flex gap-5 rounded-xl overflow-x-scroll">
                <h1 class="text-3xl text-title font-bold">Past Schedules</h1>
                <week_view class="w-1/2 h-1/2" :events="events" />
                <week_view class="w-1/2 h-1/2" :events="events" />
            </div>
        </div>
    </div>
    
  </template>
  
  <script setup>
  import { useAuth0 } from '@auth0/auth0-vue'
  
  const { user, isAuthenticated } = useAuth0()
  

  const events = ref([
  {
    "courseSubject": "COP1234",
    "crn": "123456",
    "day": "monday",
    "startTime": "12:00",
    "endTime": "13:00"
  },
  {
    "courseSubject": "LIT2010",
    "crn": "654321",
    "day": "wednesday",
    "startTime": "14:00",
    "endTime": "15:30"
  }
])

  </script>