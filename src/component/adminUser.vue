<script setup>
import sidebar from "./sidebar.vue";
import { onMounted, ref } from "vue";
import { time } from "../composable/time.js";
import { useDataStore } from "../composable/dataHandlerPinia";
import { RouterLink } from "vue-router";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("accessToken")

const jwtDecoded = () => {
  if (token === null) return null
  else return jwt_decode(token)
}
const dataStore = useDataStore()
const data = ref([])
const deleteModal = ref(false);
const userId = ref(null);
const loginUsername = jwtDecoded().sub
const deleteUsername = ref(null);
let length = 0

onMounted(async () => {
  data.value = await dataStore.getUserData();
  length = data.value.length
  if (data.value.length === 0) {
    show1.value = true;
  } else {
    show2.value = true;
  }
});

const showDeleteModal = (id,username) => {
  deleteModal.value = true
  userId.value = id;
  deleteUsername.value = username;
  console.log(loginUsername)
  console.log(deleteUsername.value)
  console.log(typeof loginUsername)
  console.log(typeof deleteUsername.value)
  console.log(loginUsername === deleteUsername.value)
};

const deleteUser = async (id) => {
  data.value = await dataStore.deleteUser(id)
  deleteModal.value = false
}

const closeDeleteModal = async () =>{
  deleteModal.value = false
}

const timezoneName = new Intl.DateTimeFormat().resolvedOptions().timeZone;
const show1 = ref(false)
const show2 = ref(false)

</script>
 
<template>
  <div v-if="deleteModal" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50">
    </div>

    <div class="modal-container bg-white w-10/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <!-- Modal content -->
      <div v-if="loginUsername === deleteUsername.value" class="modal-content py-4 text-left px-6">
        <div class="mb-4">
          <h2 class="text-xl font-semibold">You cannot delete your own account.</h2>
        </div>
        <div class="text-right space-x-3">
          <button @click="closeDeleteModal()" class="px-4 py-2 text-white bg-green-400 hover:bg-green-500 rounded">
            Confirm
          </button>
        </div>
      </div>
      
      <div v-else class="modal-content py-4 text-left px-6">
        <div class="mb-4">
          <h2 class="text-xl font-semibold">The announcements owned by this user will be transfered to you. Do you still want to delete this user?</h2>
        </div>
        <div class="text-right space-x-3">
          <button @click="deleteUser(userId)" class="px-4 py-2 text-white bg-green-400 hover:bg-green-500 rounded">
            Confirm
          </button>
          <button @click="closeDeleteModal()" class="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="w-screen h-screen bg-white">

    <div v-show="show1">
      <h1 class="font-bold Announcement text-6xl">No Users</h1>
    </div>

    <div v-show="show2">
      <div class="flex">

        <div class="flex">
          <sidebar/>
        </div>

        <div class="flex flex-col w-full text-black">
          <div class="flex justify-center font-bold text-4xl pt-10">User Management</div>
          <div class="flex flex-col w-full ">
            <div class="flex mb-5">

              <div class="font-bold text-xl pt-8 pl-10">
                Date/Time shown in Timezone&nbsp; 
                <span class="text-blue-600">{{ timezoneName }}</span>
              </div>

              <div class="ml-auto pt-5 pr-10">
                <router-link :to="{ name: 'adminUserCreate' }">
                  <button class="jump bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 ann-button">
                    Add User
                  </button>
                </router-link>
              </div>

            </div>
          </div>

      <div class="h-full ">
        <!-- <div class="flex  justify-center flex-grow bg-white overflow-hidden">
           <div class="overflow-y-auto rounded-lg h-[620px] w-[1540px]"> -->
              <table class="w-[96em] mx-auto flex flex-col">
                <thead class="bg-slate-500 text-xl font-semibold text-white rounded-t-lg">
              <tr class="flex  w-full">
                <th class="w-[5.5%] px-6 py-3 tracking-wider">
                  No.
                </th>
                <th class="w-[13.5%] px-6 py-3 tracking-wider">
                  Username
                </th>
                <th class="w-[13.5%] px-6 py-3 tracking-wider">
                  Name
                </th>
                <th class="w-[13.5%] px-6 py-3 tracking-wider">
                  Email
                </th>
                <th class="w-[13.5%] px-6 py-3 tracking-wider">
                  Role
                </th>
                <th class="w-[13.5%] px-6 py-3 tracking-wider">
                  Created On
                </th>
                <th class="w-[13.5%] px-6 py-3 tracking-wider">
                  Updated On
                </th>
                <th class="w-[13.5%] px-6 py-3 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y flex flex-col divide-gray-200 divide-none overflow-y-auto h-[608px] font-normal text-black text-l rounded-b-lg" :class="length >= 8?'shadow-md':''">
              <tr class="flex  text-center ann-item" v-for="(item, index) in data" :key="item.id"
                :class="[index % 2 == 0 ? 'bg-gray-200' : 'bg-gray-100', index == length-1 ? 'rounded-b-lg shadow-md':'']">
                <td class="w-[5.5%] px-6 py-4 whitespace-nowrap">
                  {{ ++index }}
                </td>
                <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-username">
                  {{ item.username }}
                </td>
                <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-name">
                  {{ item.name }}
                </td>
                <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-email">
                  {{ item.email }}
                </td>
                <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-role">
                  {{ item.role }}
                </td>
                <td class="w-[13.5%] px-6 py-4 whitespace-nowrap">
                  <div class="flex justify-center">
                    <span class="ann-created-on">{{ time(item.createdOn) }}</span>
                  </div>
                </td>
                <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-updated-on">
                  <div class="flex justify-center">
                    {{ time(item.updatedOn) }}
                  </div>
                </td>
                <td class="w-[13.5%] flex flex-row justify-center px-6 py-4 whitespace-nowrap space-x-2">

                  <router-link :to="{ name: 'adminUserEdit', params: { userId: item.id } }">
                    <div>
                      <button class="traansition duration-300 ease-in-out hover:scale-105 text-xl px-2 py-2 rounded-md hover:bg-green-500 bg-green-400 ann-button ">
                        Edit
                      </button>
                    </div>
                  </router-link>

                  <div>
                    <button @click="showDeleteModal(item.id,item.username)"
                      class="transition duration-300 ease-in-out hover:scale-105 text-xl px-2 py-2 rounded-md hover:bg-red-500 bg-red-400 ann-button">
                      Delete
                    </button>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
 
<style lang="css" scoped>
.jump {
  display: inline-block;
  transition: transform 0.2s ease-in-out;
}

.jump:hover {
  animation: jump 0.5s linear infinite;
}

@keyframes jump {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -0.5rem);
  }
}
.c {
  background-color: green;
}
</style>