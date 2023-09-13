<script setup>
</script>
 
<template>
  <div class="w-[300px] h-screen bg-gray-400">
    <div class="flex flex-col font-semibold">
      <div class="flex bg-gray-500 text-slate-800 text-4xl font-bold border-gray-500 border-r border-b pl-5 pt-6 pb-6">
        SAS
      </div>
      
      <router-link :to="{ name: 'adminAnn' }">
        <div id="announcement" class="text-white text-2xl border-gray-500 border-r border-b pl-4 pt-4 pb-4">
          Announcement
        </div>
      </router-link>

      <router-link :to="{ name: 'adminUser' }">
        <div id="user" class=" text-white text-2xl border-gray-500 border-r border-b pl-4 pt-4 pb-4">
          User
        </div>
      </router-link>

      <router-link :to="{ name: 'adminUserMatch' }">
        <div id="match" class=" text-white text-2xl border-gray-500 border-r border-b pl-4 pt-4 pb-4">
          Match Password
        </div>
      </router-link>

    </div> 
  </div>
</template>
 
<style scoped>
</style>
