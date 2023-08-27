<script setup>
</script>
 
<template>

  <div class="bg-gray-500 flex justify-start w-[300px] h-full flex-col font-bold ">
    <div class="w-full text-5xl flex justify-center text-slate-900 pt-6">
      SAS
    </div>
    
    <router-link :to="{ name: 'adminAnn' }">
      <div id="announcement" class="text-start text-white text-3xl border-gray-900 border-t pt-5 pl-5 h-20">
        Announcement
      </div>
    </router-link>

    <router-link :to="{ name: 'adminUser' }"  >
      <div id="user" class="text-start text-white text-3xl border-gray-900 border-y pt-5 pl-5 h-20">
        User
      </div>
    </router-link>
  </div>

</template>
 
<style lang="css" scoped>
 .c {
  /* background-color: green; */

  background-color: rgb(49 196 141 / var(--tw-bg-opacity));
}
</style>