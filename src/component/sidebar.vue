<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const rounter = useRouter()
const isModalOpen = ref(false);
const check = ref('yes')
const toggleModal = (x) => {
  isModalOpen.value = !isModalOpen.value
};
const Logout = () => {
  setTimeout(() => {
    signOut()
    rounter.push({ name: 'login' })
  }, 700)

  console.log("click");
}


const signOut = () => {
  localStorage.clear()
}

</script>
 
<template>
  <div>

    <!-- <button @click="toggleModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Open Modal
    </button> -->

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50">
        
      </div>

      <div class="modal-container bg-white w-10/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <!-- Modal content -->
        <div class="modal-content py-4 text-left px-6">
          <div class="mb-4">
            <h2 class="text-xl font-semibold">Logout ? </h2>
          </div>
          <div class="text-right space-x-3">
            <button @click="Logout()" class="px-4 py-2 text-white bg-green-400 hover:bg-green-500 rounded">
              Yes
            </button>
            <button @click="toggleModal()" class="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>





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
          <div id="announcement"
            class="flex  text-gray-600 text-2xl border-gray-500 hover:bg-green-400 hover:shadow-md rounded-t-lg group pl-4 py-4  ml-2 ">
            <div
              class="flex transition duration-200 invisible ease-in-out bg-white  mr-5 my-auto w-[20px] h-[30px] -ml-10 group-hover:visible group-hover:translate-x-5 rounded-md">
            </div>
            <div class="flex transition duration-200  group-hover:translate-x-2">
              Announcement
            </div>
          </div>
        </router-link>

        <router-link :to="{ name: 'adminUser' }">
          <div id="announcement"
            class="flex text-gray-600 text-2xl border-gray-500 hover:bg-green-400 hover:shadow-md group pl-4 py-4  ml-2 ">
            <div
              class="flex transition duration-200 invisible ease-in-out bg-white  mr-5 my-auto w-[20px] h-[30px] -ml-10 group-hover:visible group-hover:translate-x-5 rounded-md">
            </div>
            <div class="flex transition duration-200  group-hover:translate-x-2">
              User
            </div>
          </div>
        </router-link>

        <!-- <router-link :to="{ name: 'adminUserMatch' }">
        <div id="announcement" class="flex text-gray-600  text-2xl border-gray-500 hover:bg-green-400 hover:shadow-md rounded-b-lg group pl-4 py-4  ml-2 ">
          <div  class="flex transition duration-200 invisible ease-in-out bg-white  mr-5 my-auto w-[20px] h-[30px] -ml-10 group-hover:visible group-hover:translate-x-5 rounded-md" ></div>
          <div class="flex transition duration-200  group-hover:translate-x-2">
            Match Password
          </div>
        </div>
      </router-link> -->

        <!-- <router-link :to="{ name: 'login' } " @click="openLogout" > -->
        <div @click="toggleModal" id="announcement"
          class="flex text-gray-600  text-2xl border-gray-500 hover:bg-red-400 hover:shadow-md rounded-b-lg group pl-4 py-4  ml-2 ">
          <div
            class="flex transition duration-200 invisible ease-in-out bg-white  mr-5 my-auto w-[20px] h-[30px] -ml-10 group-hover:visible group-hover:translate-x-5 rounded-md">
          </div>
          <div class="flex transition duration-200  group-hover:translate-x-2">
            Logout
          </div>
        </div>
        <!-- </router-link> -->

      </div>
    </div>
</div></template>
 
<style scoped></style>
