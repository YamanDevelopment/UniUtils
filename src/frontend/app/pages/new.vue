<template>
  <div class="min-h-screen bg-[#1a1825] flex flex-col">
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-base2 rounded-lg shadow-lg p-6">
          <h1 class="text-3xl font-bold mb-6 text-title">Schedule Planner</h1>
          <div v-if="!scheduleData">
            <div v-if="step === 1" class="space-y-4">
              <h2 class="text-2xl font-semibold mb-2 text-subheading">Step 1: Enter Your Classes</h2>
              <p class="mb-2 text-text">Enter your classes, separated by commas (e.g., COP2220, LIT2010)</p>
              <input
                v-model="classes"
                type="text"
                class="w-full p-3 bg-base border border-primary rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="COP2220, LIT2010"
              />
              <button @click="nextStep" class="w-full bg-primary text-text hover:bg-opacity-80 text-base font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out">Next</button>
            </div>
            <div v-else-if="step === 2" class="space-y-6">
              <h2 class="text-2xl font-semibold mb-2 text-subheading">Step 2: Set Your Schedule Preferences</h2>
              <div class="flex justify-between mt-6">
                <button @click="previousStep" class="bg-base2hover hover:bg-opacity-80 text-text font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out">Previous</button>
                <button @click="submitForm" class="bg-primary text-text hover:bg-opacity-80 text-base font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out">Submit</button>
              </div>
            </div>
          </div>
          <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-4 rounded-lg">
              <p class="text-lg font-semibold">Loading...</p>
            </div>
          </div>
        </div>

        <div v-if="scheduleData">
          <WeekView :events="scheduleData" />
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
import { ref, reactive } from 'vue'
import WeekView from '@/components/week_view.vue'

const step = ref(1)
const classes = ref('')
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const scheduleData = ref(null)
const isLoading = ref(false)

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
  const classRegex = /^[A-Z]{3}\d{4}$/ // Adjust class format as needed
  const classesArray = classes.value.split(',').map(c => c.trim())
  const isValid = classesArray.every(c => classRegex.test(c))
  if (!isValid) {
    alert('Please enter valid class codes (e.g., COP2220, LIT2010)')
  }
  return isValid
}

const submitForm = async () => {
  const formData = {
    userPrefs: {
      courses: classes.value.split(',').map(c => c.trim()),
      excludedTimes: Object.entries(schedulePreferences).reduce((acc, [day, prefs]) => {
        if (!prefs.noClass) {
          prefs.timeSlots.forEach(slot => {
            if (slot.startTime && slot.endTime) {
              acc.push({
                day: day.toLowerCase(),
                fullDay: false,
                startTime: slot.startTime,
                endTime: slot.endTime
              })
            }
          })
        }
        return acc
      }, [])
    },
    term: '202408'
  }

  console.log('Form data:', formData)
  try {
    isLoading.value = true
    const response = await fetch('http://localhost:5000/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!response.ok) {
      throw new Error('Failed to fetch schedule data')
    }
    const data = await response.json()
    scheduleData.value = data // Ensure the data structure matches what your WeekView expects
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('An error occurred while fetching the schedule. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Add any styles specific to this component */
</style>
