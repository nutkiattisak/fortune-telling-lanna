<template>
  <div class="flex flex-col items-center justify-center p-4">
    <div class="mt-4 space-y-4 mb-14">
      <div>
        <label for="age" class="block text-white">ระบุอายุ</label>
        <input
          id="age"
          type="number"
          v-model="age"
          class="w-full px-4 py-2 mt-2 text-black rounded"
        />
      </div>
      <div class="flex items-center space-x-4">
        <input type="radio" id="male" value="male" v-model="gender" />
        <label for="male">ป้อจาย</label>

        <input type="radio" id="female" value="female" v-model="gender" />
        <label for="female">แม่ญิง</label>
      </div>
    </div>

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
            class="absolute flex flex-row transform rotate-180 -translate-x-1/2 -translate-y-1/2 top-3"
          >
            {{ item.id }}
          </span>
        </div>
      </div>
      <div
        class="absolute top-0 z-20 transform -translate-x-1/2 -translate-y-1/2 left-1/2"
      >
        <img src="/down-arrow.png" alt="" />
      </div>
      <div
        class="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <button
          v-if="selectedItem"
          @click="resetWheel"
          :disabled="isSpinning"
          class="flex items-center justify-center w-20 h-20 font-semibold text-black bg-white rounded-full hover:bg-purple-100 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          รีเซ็ต
        </button>
        <button
          v-else
          @click="spinWheel"
          class="flex items-center justify-center w-20 h-20 font-semibold text-black bg-white rounded-full hover:bg-purple-100 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          หมุน
        </button>
      </div>
    </div>

    <div
      v-if="selectedItem"
      class="mt-4 text-2xl font-bold text-center text-white"
    >
      <p>ตกที่{{ selectedItem.name }}</p>
      <p>{{ selectedItem.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from "vue"
import data from "../data/data.json"
import { Item } from "../types/item"

const items = ref<Item[]>(data)
const rotation: Ref<number> = ref(-16)
const selectedItem: Ref<Item | null> = ref(null)
const isSpinning: Ref<boolean> = ref(false)
const wheel: Ref<HTMLDivElement | null> = ref(null)
const age: Ref<number> = ref(1)
const gender: Ref<string> = ref("male")

const wheelStyle = computed(() => {
  const colors = [
    "#ed1e24",
    "#dc088c",
    "#9d248f",
    "#6d2c91",
    "#3853a4",
    "#036836",
    "#01a04d",
    "#6abd45",
    "#f0ea0e",
    "#fbac18",
    "#f47720",
    "#ef4a24",
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
    transition: "transform 1s ease-out",
  }
})

const getItemStyle = (index: number) => ({
  transform: `rotate(${
    (index * 360) / items.value.length + 360 / items.value.length / 2
  }deg)`,
})

const resetWheel = () => {
  selectedItem.value = null
  isSpinning.value = false
  age.value = 1
  gender.value = "male"
  rotation.value = -16
}

const spinWheel = () => {
  if (age.value === null || age.value <= 0) {
    return
  }

  if (!gender.value) {
    return
  }

  const target = (age.value - 1) / 12
  const randomDegrees = target * 360
  const newRotation =
    gender.value === "male"
      ? rotation.value - randomDegrees
      : rotation.value + randomDegrees

  rotation.value = newRotation
  selectedItem.value = null
  isSpinning.value = true

  setTimeout(() => {
    const index = Math.floor(
      ((360 - (rotation.value % 360)) % 360) / (360 / items.value.length)
    )
    selectedItem.value = items.value[index]
    isSpinning.value = false
  }, 1000)
}
</script>
