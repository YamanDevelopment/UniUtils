<!-- pages/dashboard.vue -->
<template>
  <div class="w-screen h-[90vh] flex items-center gap-3 p-4">
    <div class="w-[30vw] h-full rounded-xl bg-base2 flex flex-col items-center gap-5 p-6">
      <h1 class="text-title text-5xl">Room Radar</h1>
      <p class="text-subheading text-xl">A tool to find empty classrooms.</p>
      <input v-model="query" placeholder="Search for a room (e.g. ED112, Engineering East 102)" class="bg-base w-[90%] h-[5%] rounded-xl text-text px-3" />
      <button @click="searchRooms" class="px-4 py-2 rounded-xl text-text text-center text-xl font-bold bg-gradient-to-br from-primary to-accent">Search</button>
      <div class="max-h-[75%] overflow-y-scroll p-4">
        <div v-for="room in rooms" :key="room.Room" class="w-[30vw] h-[30vh] rounded-xl bg-base flex flex-col items-center gap-2 mb-4 p-4">
          <h2 class="text-title text-2xl">{{ room.Building }} - {{ room.Room }}</h2>
          <p class="text-subheading text-lg">Type: {{ room.RoomType }}</p>
          <p class="text-subheading text-lg ">Status: {{ room.status }}</p>
          <p class="text-subheading text-lg ">Rating: {{ room.rating }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="flex flex-wrap gap-3 w-full h-full p-4">
      <div v-for="room in rooms" :key="room.Room" class="w-[30vw] h-[20vh] rounded-xl bg-base2 flex flex-col items-center gap-2 p-4">
        <h2 class="text-title text-2xl">{{ room.Building }} - {{ room.Room }}</h2>
        <p class="text-subheading text-lg">Status: {{ room.status }}</p>
      </div>
    </div> -->
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
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

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
const query = ref('')
const rooms = ref([])

const searchRooms = async () => {
  try {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const response = await fetch(`http://localhost:5000/api/rooms?query=${query.value}`)
    if (!response.ok) {
      throw new Error('Failed to fetch room data')
    }
    let val = await response.json()
   
    rooms.value = val
  } catch (error) {
    console.error('Error fetching rooms:', error)
    alert('An error occurred while fetching the rooms. Please try again.')
  }
}
</script>
