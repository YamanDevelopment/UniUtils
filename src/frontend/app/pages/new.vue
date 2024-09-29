<template>
  <div class="min-h-screen bg-[#1a1825] flex flex-col">
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-3xl mx-auto">
        <ScheduleForm v-if="!scheduleData.length" @submit="fetchSchedule" />
        
        <!-- Render multiple week-view components if scheduleData is available -->
        <div v-else>
          <week-view 
            v-for="(schedule, index) in scheduleData" 
            :key="index" 
            :events="schedule" 
          />
        </div>
      </div>
    </main>
    <footer class="bg-base2 mt-8">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-subheading">
        © 2024 Student Schedule Planner. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScheduleForm from '@/components/ScheduleForm.vue'
import WeekView from '@/components/week_view.vue' // Ensure to import your WeekView component

const scheduleData = ref([]) // Reactive variable to store the schedule data

// Function to fetch the schedule data
const fetchSchedule = async (formData) => {
  try {
    const response = await fetch('YOUR_API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    // Assuming the API returns an array of arrays of events
    if (response.ok) {
      scheduleData.value = await response.json()
    } else {
      console.error('Failed to fetch schedule:', response.statusText)
    }
  } catch (error) {
    console.error('Error fetching schedule:', error)
  }
}
</script>
