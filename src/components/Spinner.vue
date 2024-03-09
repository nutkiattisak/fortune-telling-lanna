<script setup lang="ts"></script>

<template>
  <div class="pt-4">
    <div
      class="cursor-pointer flex items-center justify-center text-white absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-[30px] z-1 bg-red-500 rounded-full h-10 w-10"
    >
      <button class="hover:cursor-pointer">Spin</button>
    </div>
    <div class="w-72 h-72 rounded-full border relative overflow-hidden mx-auto">
      <div
        class="rotate-0 skew-y-[-60deg] z-0 absolute top-0 right-0 w-1/2 h-1/2 shadow-custom transform origin-[0%_100%]"
      >
        <div class="bg-red-500 w-full"></div>
      </div>
      <div
        class="rotate-[30deg] skew-y-[-60deg] z-0 absolute top-0 right-0 w-1/2 h-1/2 shadow-custom transform origin-[0%_100%]"
      >
        <div class="bg-red-500 w-full"></div>
      </div>
      <div
        class="rotate-[60deg] skew-y-[-60deg] z-0 absolute top-0 right-0 w-1/2 h-1/2 shadow-custom transform origin-[0%_100%]"
      >
        <div class="bg-red-500 w-full"></div>
      </div>
      <div
        class="rotate-[90deg] skew-y-[-60deg] z-0 absolute top-0 right-0 w-1/2 h-1/2 shadow-custom transform origin-[0%_100%]"
      >
        <div class="bg-red-500 w-full"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
