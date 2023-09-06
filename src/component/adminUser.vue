<script setup>
import sidebar from "./sidebar.vue";
import { onMounted, ref } from "vue";
import { time } from "../composable/time.js";
import { useDataStore } from "../composable/dataHandlerPinia";
import { RouterLink } from "vue-router";

const dataStore = useDataStore()
const data = ref([])
const userId = ref(null);
const isModalVisible = ref(false);
const name = ref("")

const showModal = (id, namee) => {
  isModalVisible.value = !isModalVisible.value;
  name.value = namee;
  userId.value = id;
  console.log(name.value);

};

onMounted(async () => {
  data.value = await dataStore.getUserData();
  if (data.value.length === 0) {
    show1.value = true;
  } else {
    show2.value = true;
  }

});

const deleteUserFunc = async (id) => {
  data.value = await dataStore.deleteUser(id)
  data.value.username = name
  console.log(userId.value);
  isModalVisible.value = false
}

const timezoneName = new Intl.DateTimeFormat().resolvedOptions().timeZone;
const show1 = ref(false)
const show2 = ref(false)

</script>
 
<template>
  <div class="" v-show="isModalVisible">
    <div class="bg-red-300 h-44 ">
      <div class="space-x-28  ">
        <div class="space-x-5 ">

          <div class="text-white text-7xl flex justify-center ">Do you want to delete
            <span class=" pl-8 text-black"> {{ name.toLocaleUpperCase() }}?
            </span>
          </div>
          <div class="flex justify-center space-x-8 "> <button @click="deleteUserFunc(userId)"
              class=" h-15 mt-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Confirm
            </button>
            <button @click="isModalVisible = false"
              class=" mt-9 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border border-red-700 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full h-full">

    <div v-show="show1">
      <h1 class="font-bold Announcement text-6xl">No Users</h1>
    </div>

    <div v-show="show2">

      <div class="bg-gray-200">
        <!-- <div class="flex justify-center text-black font-extrabold">
          <h1>SIT Announcement System (SAS)</h1>
        </div> -->
        <div class=" text-black text-6xl flex justify-center pt-5"> User Management</div>

        <div class="flex flex-col">
          <div class="flex font-bold mb-4 mt-10 text-xl pl-10">
            Date/Time shown in Timezone&nbsp; 
            <span class="text-blue-600"> {{ timezoneName }}</span>
          </div>

          <div class="flex justify-end mb-5 mr-5">
            <router-link :to="{ name: 'adminUserCreate' }">
              <button class="jump hover:bg-blue-500 bg-blue-300 text-black text-2xl px-4 py-2 rounded-md ann-button">
                Add User
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="h-screen">
        <div class="flex flex-grow  bg-white shadow overflow-hidden">
          <div class="flex">

            <sidebar id="nav" /> 

          </div>
          <table class="pr-96 w-screen  text-star">
            <thead class="bg-gray-400 text-black justify-center">
              <tr>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                  No.
                </th>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                  Username
                </th>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500uppercase tracking-wider">
                  Created On
                </th>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500uppercase tracking-wider">
                  Updated On
                </th>
                <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 divide-none text-black text-l font-sans">
              <tr class="flex-col-reverse ann-item" v-for="(item, index) in data" :key="item.id"
                :class="index % 2 == 0 ? 'bg-gray-200' : 'bg-white-950'">
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ ++index }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap ann-username">
                  {{ item.username }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap ann-name">
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap ann-email">
                  {{ item.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap ann-role">
                  {{ item.role }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex justify-center">
                    <span class="ann-created-on">{{ time(item.createdOn) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap ann-updated-on">
                  <div class="flex justify-center">
                    {{ time(item.updatedOn) }}
                  </div>
                </td>
                <td class="flex flex-row px-6 py-4 whitespace-nowrap space-x-2">

                  <router-link :to="{ name: 'adminUserEdit', params: { userId: item.id } }">
                    <div>
                      <button class="text-2xl px-4 py-2 rounded-md hover:bg-green-500 bg-green-400 ann-button">
                        edit
                      </button>
                    </div>
                  </router-link>

                  <div>
                    <button @click="showModal(item.id, item.username)"
                      class="text-2xl px-4 py-2 rounded-md hover:bg-red-500 bg-red-400 ann-button">
                      delete
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