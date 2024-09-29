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
  courseSubject: {
    type: String,
    required: true
  },
  crn: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
})

// Utility to map the day to a CSS grid column
const dayToColClass = (day) => {
  // Check if day is defined and valid before calling toLowerCase
  const validDay = day ? day.toLowerCase() : ''
  const dayMap = {
    monday: 'sm:col-start-2',
    tuesday: 'sm:col-start-3',
    wednesday: 'sm:col-start-4',
    thursday: 'sm:col-start-5',
    friday: 'sm:col-start-6',
    saturday: 'sm:col-start-7',
  }
  return dayMap[validDay] || '' // Default to empty string if day is not valid
}

// Utility to calculate grid row based on time
const timeToGridRow = (start, end) => {
  // Ensure start and end times are defined and valid
  if (!start || !end) return '1 / span 1' // Default grid row if invalid

  const startParts = start.split(':').map(Number)
  const endParts = end.split(':').map(Number)

  if (startParts.length !== 2 || endParts.length !== 2) return '1 / span 1' // Default grid row if invalid

  const startTime = startParts[0] * 60 + startParts[1]
  const endTime = endParts[0] * 60 + endParts[1]
  const startRow = Math.floor(startTime / 5) + 2
  const endRow = Math.floor(endTime / 5) + 2
  return `${startRow} / span ${endRow - startRow}`
}

// Format time to display it nicely
const formatTime = (time) => {
  if (!time) return 'N/A' // Return a placeholder if time is invalid
  const [hour, minute] = time.split(':')
  const period = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minute} ${period}`
}
</script>

