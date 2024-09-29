<!-- AvailabilitySelector.vue -->
<template>
    <div class="availability-selector">
      <div class="time-labels">
        <div v-for="hour in 24" :key="hour" class="time-label">
          {{ formatHour(hour - 1) }}
        </div>
      </div>
      <div class="grid-container">
        <div v-for="(day, dayIndex) in days" :key="day" class="day-column">
          <div class="day-label">{{ day }}</div>
          <div
            v-for="hour in 24"
            :key="`${day}-${hour}`"
            :class="['time-slot', { selected: isSelected(dayIndex, hour - 1) }]"
            @mousedown="startSelection(dayIndex, hour + 1)"
            @mouseover="updateSelection(dayIndex, hour + 1)"
            @mouseup="endSelection"
          ></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const availability = reactive(Array(7).fill().map(() => Array(24).fill(false)))
  const isSelecting = ref(false)
  const selectionStart = ref(null)
  
  const isSelected = (day, hour) => availability[day][hour]
  
  const startSelection = (day, hour) => {
    isSelecting.value = true
    selectionStart.value = { day, hour }
    toggleSelection(day, hour)
  }
  
  const updateSelection = (day, hour) => {
    if (isSelecting.value) {
      toggleSelection(day, hour)
    }
  }
  
  const endSelection = () => {
    isSelecting.value = false
    selectionStart.value = null
  }
  
  const toggleSelection = (day, hour) => {
    const startDay = selectionStart.value.day
    const startHour = selectionStart.value.hour
    const minDay = Math.min(startDay, day)
    const maxDay = Math.max(startDay, day)
    const minHour = Math.min(startHour, hour)
    const maxHour = Math.max(startHour, hour)
  
    for (let d = minDay; d <= maxDay; d++) {
      for (let h = minHour; h <= maxHour; h++) {
        availability[d][h] = !availability[startDay][startHour]
      }
    }
  }
  
  const formatHour = (hour) => {
    const period = hour < 12 ? 'AM' : 'PM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:00 ${period}`
  }
  
  const getAvailabilityData = () => {
    return availability.map((dayAvailability, dayIndex) => {
      return {
        day: days[dayIndex],
        unavailableHours: dayAvailability.map((isUnavailable, hour) => {
          return isUnavailable ? hour : null
        }).filter(hour => hour !== null)
      }
    })
  }
  
  // Example of how to send data to API
  const sendAvailabilityToAPI = async () => {
    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getAvailabilityData()),
      })
      const data = await response.json()
      console.log('Availability sent successfully:', data)
    } catch (error) {
      console.error('Error sending availability:', error)
    }
  }
  </script>
  
  <style scoped>
  .availability-selector {
    display: flex;
    width: 100%;
    overflow-x: auto;
  }
  
  .time-labels {
    display: flex;
    flex-direction: column;
    padding-right: 10px;
    border-right: 1px solid #ccc;
  }
  
  .time-label {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.8em;
    color: #666;
  }
  
  .grid-container {
    display: flex;
    flex-grow: 1;
  }
  
  .day-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    min-width: 80px;
  }
  
  .day-label {
    font-weight: bold;
    padding: 5px 0;
    text-align: center;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  
  .time-slot {
    width: 100%;
    height: 30px;
    border: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
  }
  
  .time-slot:hover {
    background-color: #f0f0f0;
  }
  
  .time-slot.selected {
    background-color: #e6f7ff;
    border-color: #91d5ff;
  }
  </style>