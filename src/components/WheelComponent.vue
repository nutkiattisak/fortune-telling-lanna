<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-purple-400 to-pink-500"
  >
    <div class="relative mb-8 w-96 h-96">
      <div
        class="relative w-full h-full border-4 border-white rounded-full shadow-lg"
        :style="wheelStyle"
        ref="wheel"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="absolute flex items-center justify-center w-full h-full font-bold text-white"
          :style="getItemStyle(index)"
        >
          <span
            class="absolute flex flex-row top-3"
            :style="getSpanStyle(index)"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <div
        class="absolute top-0 z-20 transform -translate-x-1/2 -translate-y-1/2 left-1/2"
      >
        <img src="/down-arrow.png" alt="" />
        <!-- <ArrowDown class="w-8 h-8 text-white filter drop-shadow-lg" /> -->
      </div>
      <div
        class="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <button
          @click="spinWheel"
          :disabled="isSpinning"
          class="flex items-center justify-center w-20 h-20 text-purple-600 bg-white rounded-full hover:bg-purple-100 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          <div>หมุน</div>
        </button>
      </div>
    </div>
    <div
      v-if="selectedItem"
      class="mt-4 text-2xl font-bold text-center text-white"
      aria-live="polite"
    >
      Result: {{ selectedItem }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"

const items = ref([
  "๑",
  "๒",
  "๓",
  "๔",
  "๕",
  "๖",
  "๗",
  "๘",
  "๙",
  "๑๐",
  "๑๑",
  "๑๒",
])
const rotation = ref(0)
const selectedItem = ref(null)
const isSpinning = ref(false)
const wheel = ref(null)

const wheelStyle = computed(() => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#F7DC6F",
    "#B39DDB",
    "#FF8A65",
    "#A5D6A7",
    "#FFD54F",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#F7DC6F",
  ]
  const gradientStops = colors
    .map((color, index) => {
      const start = (index * 360) / items.value.length
      const end = ((index + 1) * 360) / items.value.length
      return `${color} ${start}deg ${end}deg`
    })
    .join(", ")

  return {
    background: `conic-gradient(from 0deg, ${gradientStops})`,
    transform: `rotate(${rotation.value}deg)`,
    transition: "transform 3s ease-out",
  }
})

const spinButtonStyle = computed(() => ({
  transform: `rotate(${isSpinning.value ? "360deg" : "0deg"})`,
  transition: "transform 3s linear",
}))

const getItemStyle = (index) => ({
  transform: `rotate(${
    // 90
    (index * 360) / items.value.length + 360 / items.value.length / 2
  }deg)`,
})

const getSpanStyle = (index) => ({
  transform: `translate(-50%, -50%) rotate(${
    180
    // -(index * 360) / items.value.length - 360 / items.value.length / 2
  }deg)`,
})

const spinWheel = () => {
  const randomDegrees = Math.random() * 360
  const newRotation = rotation.value + 360 + randomDegrees

  rotation.value = newRotation
  selectedItem.value = null
  isSpinning.value = true

  setTimeout(() => {
    const index = Math.floor(
      ((360 - (rotation.value % 360)) % 360) / (360 / items.value.length)
    )
    selectedItem.value = items.value[index]
    isSpinning.value = false
  }, 5000)
}

onUnmounted(() => {})
</script>
