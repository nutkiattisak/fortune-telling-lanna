<template>
  <div
    class="min-h-screen mx-auto bg-gradient-to-r from-purple-400 to-pink-500"
  >
    <div class="container">
      <WheelComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import WheelComponent from "./components/WheelComponent.vue"

export default defineComponent({
  components: {
    WheelComponent,
  },
})
</script>
