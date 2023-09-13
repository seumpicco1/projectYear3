<script setup>
</script>
 
<template>
  <div class="w-[300px] h-screen ">
    <div class="flex flex-col font-semibold">
      <div class="flex  text-slate-800 text-4xl mt-2 ml-2 rounded-lg  pl-5 pt-6 pb-6">
        SAS
      </div>
      <div class="flex text-md -mt-6 ml-7">
          SIT Announcement System
      </div>
      <div class="mt-[3.75rem] shadow-md drop-shadow-lg rounded-lg">
      <router-link :to="{ name: 'adminAnn' }">
        <div id="announcement" class="flex  text-gray-600 text-2xl border-gray-500 hover:bg-green-400 hover:shadow-md rounded-t-lg group pl-4 py-4  ml-2 ">
          <div  class="flex transition duration-200 invisible ease-in-out bg-white  mr-5 my-auto w-[20px] h-[30px] -ml-10 group-hover:visible group-hover:translate-x-5 rounded-md" ></div>
          <div class="flex transition duration-200  group-hover:translate-x-2">
            Announcement
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'adminUser' }">
        <div id="announcement" class="flex text-gray-600 text-2xl border-gray-500 hover:bg-green-400 hover:shadow-md group pl-4 py-4  ml-2 ">
          <div  class="flex transition duration-200 invisible ease-in-out bg-white  mr-5 my-auto w-[20px] h-[30px] -ml-10 group-hover:visible group-hover:translate-x-5 rounded-md" ></div>
          <div class="flex transition duration-200  group-hover:translate-x-2">
            User
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'adminUserMatch' }">
        <div id="announcement" class="flex text-gray-600  text-2xl border-gray-500 hover:bg-green-400 hover:shadow-md rounded-b-lg group pl-4 py-4  ml-2 ">
          <div  class="flex transition duration-200 invisible ease-in-out bg-white  mr-5 my-auto w-[20px] h-[30px] -ml-10 group-hover:visible group-hover:translate-x-5 rounded-md" ></div>
          <div class="flex transition duration-200  group-hover:translate-x-2">
            Match Password
          </div>
        </div>
      </router-link>
    </div>
    </div> 
  </div>
</template>
 
<style scoped>
</style>
