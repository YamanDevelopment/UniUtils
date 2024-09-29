<template>
    <li
      :class="['relative mt-px flex', dayToColClass(day)]"
      :style="{
        gridRow: timeToGridRow(startTime, endTime)
      }"
    >
      <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-200 p-2 text-xs leading-5 hover:bg-blue-100">
        <p class="order-1 font-semibold">{{ courseSubject }}</p>
        <p class="text-gray-500 group-hover:text-gray-700">
          <time :datetime="startTime">{{ formatTime(startTime) }} - {{ formatTime(endTime) }}</time>
        </p>
        <p class="text-xs">CRN: {{ crn }}</p>
      </a>
    </li>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    courseSubject: String,
    crn: String,
    day: String,
    startTime: String,
    endTime: String,
  })
  
  // Utility to map the day to a CSS grid column
  const dayToColClass = (day) => {
    const dayMap = {
      monday: 'sm:col-start-2',
      tuesday: 'sm:col-start-3',
      wednesday: 'sm:col-start-4',
      thursday: 'sm:col-start-5',
      friday: 'sm:col-start-6',
      saturday: 'sm:col-start-7',
    }
    return dayMap[day.toLowerCase()] || ''
  }
  
  // Utility to calculate grid row based on time
  const timeToGridRow = (start, end) => {
    const startTime = parseInt(start.split(':')[0], 10) * 60 + parseInt(start.split(':')[1], 10)
    const endTime = parseInt(end.split(':')[0], 10) * 60 + parseInt(end.split(':')[1], 10)
    const startRow = Math.floor((startTime - 0) / 5) + 2
    const endRow = Math.floor((endTime - 0) / 5) + 2
    return `${startRow} / span ${endRow - startRow}`
  }
  
  // Format time to display it nicely
  const formatTime = (time) => {
    const [hour, minute] = time.split(':')
    const period = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minute} ${period}`
  }
  </script>