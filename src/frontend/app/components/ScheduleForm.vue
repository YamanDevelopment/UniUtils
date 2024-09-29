<template>
  <div class="bg-base2 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-title">Schedule Preferences</h1>
    <div v-if="step === 1" class="space-y-4">
      <h2 class="text-2xl font-semibold mb-2 text-subheading">Step 1: Enter Your Classes</h2>
      <p class="mb-2 text-text">Enter your classes, separated by commas (e.g., COP2220, LIT2010)</p>
      <input
        v-model="classes"
        type="text"
        class="w-full p-3 bg-base border border-primary rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="COP2220, LIT2010"
      >
      <button @click="nextStep" class="w-full bg-primary text-text hover:bg-opacity-80 text-base font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out">Next</button>
    </div>
    <div v-else-if="step === 2" class="space-y-6">
      <h2 class="text-2xl font-semibold mb-2 text-subheading">Step 2: Set Your Schedule Preferences</h2>
      <div v-for="day in daysOfWeek" :key="day" class="bg-base p-4 rounded-md space-y-3">
        <h3 class="font-semibold text-lg text-title">{{ day }}</h3>
        <div class="flex items-center mb-2">
          <input
            :id="`noClass${day}`"
            v-model="schedulePreferences[day].noClass"
            type="checkbox"
            class="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary border-primary"
          >
          <label :for="`noClass${day}`" class="ml-2 text-text">No classes on this day</label>
        </div>
        <div v-if="!schedulePreferences[day].noClass" class="space-y-3">
          <div v-for="(slot, index) in schedulePreferences[day].timeSlots" :key="index" class="flex flex-wrap items-end space-x-2 space-y-2">
            <div>
              <label :for="`startTime${day}${index}`" class="block mb-1 text-subheading">Start Time</label>
              <input
                :id="`startTime${day}${index}`"
                v-model="slot.startTime"
                type="time"
                class="p-2 bg-base2 border border-primary rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
            </div>
            <div>
              <label :for="`endTime${day}${index}`" class="block mb-1 text-subheading">End Time</label>
              <input
                :id="`endTime${day}${index}`"
                v-model="slot.endTime"
                type="time"
                class="p-2 bg-base2 border border-primary rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
            </div>
            <button @click="removeTimeSlot(day, index)" class="bg-secondary text-text hover:bg-opacity-80 text-base px-3 py-2 rounded-md transition duration-300 ease-in-out">Remove</button>
          </div>
          <button @click="addTimeSlot(day)" class="bg-accent text-text hover:bg-opacity-80 text-base px-3 py-2 rounded-md transition duration-300 ease-in-out">Add Time Slot</button>
        </div>
      </div>
      <div class="flex justify-between mt-6">
        <button @click="previousStep" class="bg-base2hover hover:bg-opacity-80 text-text font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out">Previous</button>
        <button @click="submitForm" class="bg-primary text-text hover:bg-opacity-80 text-base font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const step = ref(1)
const classes = ref('')
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const schedulePreferences = reactive(
  daysOfWeek.reduce((acc, day) => {
    acc[day] = { noClass: false, timeSlots: [] }
    return acc
  }, {})
)

const nextStep = () => {
  if (validateClasses()) {
    step.value++
  }
}

const previousStep = () => {
  step.value--
}

const validateClasses = () => {
  const classRegex = /^[A-Z]{3}\d{4}$/
  const classesArray = classes.value.split(',').map(c => c.trim())
  const isValid = classesArray.every(c => classRegex.test(c))
  if (!isValid) {
    alert('Please enter valid class codes (e.g., COP2220, LIT2010)')
  }
  return isValid
}

const addTimeSlot = (day) => {
  schedulePreferences[day].timeSlots.push({ startTime: '', endTime: '' })
}

const removeTimeSlot = (day, index) => {
  schedulePreferences[day].timeSlots.splice(index, 1)
}

const submitForm = () => {
  const formData = {
    classes: classes.value.split(',').map(c => c.trim()),
    schedulePreferences: Object.entries(schedulePreferences).reduce((acc, [day, prefs]) => {
      acc[day] = {
        noClass: prefs.noClass,
        timeSlots: prefs.noClass ? [] : prefs.timeSlots.filter(slot => slot.startTime && slot.endTime)
      }
      return acc
    }, {})
  }
  console.log('Form data:', formData)
  // Here you would typically send the data to your backend
  // For example: await $fetch('/api/submit-schedule', { method: 'POST', body: formData })
}
</script>