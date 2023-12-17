<script setup>
import sidebar from "./sidebar.vue";
import { onMounted, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { time } from "../composable/time.js";
import { useDataStore } from "../composable/dataHandlerPinia";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("accessToken")

const jwtDecoded = () => {
  if (token === null) return null
  else return jwt_decode(token)
}


const dataStore = useDataStore()

const data = ref([]);
const show1 = ref(false);
const show2 = ref(false);
const searchTerm = ref("");
const timezoneName = new Intl.DateTimeFormat().resolvedOptions().timeZone;

onMounted(async () => {
  data.value = await dataStore.getAnnData();
  if (data.value.length === 0) {  
    show1.value = true;
  } else {
    show2.value = true;
  }
});

const deleteAnn = async (id) => {
  data.value = await dataStore.deleteAnn(id)
};

const filteredData = computed(() => {
  return (
    data.value.filter((item) =>
      item.announcementTitle
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase())
    ) ||
    data.value.filter((x) =>
      x.publishDate.value.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  );
});

</script>

<template>
  <div class="w-full h-full bg-white">

    <div v-show="show1">
      <h1 class="font-bold Announcement text-6xl">No Announcements</h1>
    </div>

    <div v-show="show2">
      <div class="flex flex-row">

        <div class="flex-grow">
          <sidebar/>
        </div>

        <div class="flex flex-col w-full text-black">

          <div class="flex justify-center text-4xl font-bold text-black mt-10">
            Announcement Management
          </div>

          <div class="flex flex-col w-full text-black">
              <div class="flex flex-row mb-5">
                  
                <div class="font-semibold text-xl pt-8 pl-10">
                  Date/Time shown in Timezone&nbsp;
                  <span class="text-blue-600">{{ timezoneName }}</span>
                </div>

                <div class="ml-auto pt-5 pr-10">
                  <router-link :to="{ name: 'adminAnnCreate' }">
                    <button class="jump bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 ann-button">
                      Create Announcement
                    </button>
                  </router-link>
                </div>

              </div>
          </div>
        
          <div class="h-full">
            
            <table class="w-[96em]  mx-auto flex flex-col ">
              <thead class=" bg-slate-500 text-xl font-semibold text-white rounded-t-lg">
                <tr class="flex  w-full">
                  <th class="w-[5.5%] px-6 py-3 tracking-wider">
                    No.
                  </th>
                  <th class="w-[13.5%] px-6 py-3 tracking-wider">
                    Title
                  </th>
                  <th class="w-[13.5%] px-6 py-3 tracking-wider">
                    Category
                  </th>
                  <th class="w-[14%] px-6 py-3 tracking-wider">
                    Publish Date
                  </th>
                  <th class="w-[14%] px-6 py-3 tracking-wider">
                    Close Date
                  </th>
                  <th class="w-[12.5%] px-6 py-3 tracking-wider">
                    Display
                  </th>
                  <th v-if="jwtDecoded().role === 'admin'" class="w-[13.5%] px-6 py-3 tracking-wider">
                    Owner
                  </th>
                  <th class="w-[13.5%] px-6 py-3 tracking-wider">
                    User Views
                  </th>
                  <th class="w-[13.5%] px-6 py-3  tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="font-normal divide-y flex flex-col divide-gray-200 divide-none overflow-y-auto h-[608px] text-gray-black text-l rounded-b-lg shadow-md">
                <tr
                  class="flex text-center ann-item" 
                  v-for="(item, index) in filteredData"
                  :key="item.id"
                  :class="[index % 2 == 0 ? 'bg-gray-200' : 'bg-gray-100', index == data.length ? 'rounded-b-lg':'']"
                >
                  <td class="w-[5.5%] px-6 py-4 whitespace-nowrap">
                    {{ ++index }}
                  </td>
                    <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-title overflow-hidden overflow-ellipsis">
                      {{ item.announcementTitle }}
                    </td>
                  <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-category">
                    {{ item.announcementCategory }}
                  </td>
                  <td class="w-[14%] px-6 py-4 whitespace-nowrap ann-publish-date">
                    {{ item.publishDate == null ? "-" : time(item.publishDate) }}
                  </td>
                  <td class="w-[14%] px-6 py-4 whitespace-nowrap ann-close-date">
                    {{ item.closeDate == null ? "-" : time(item.closeDate) }}
                  </td>
                  <td class="w-[12.5%] px-6 py-4 whitespace-nowrap ann-display" 
                    :class="item.announcementDisplay == 'Y' ? 'bg-green-200 drop-shadow-md' : 'bg-red-200 drop-shadow-md'">
                    <div class="flex justify-center">
                      {{ item.announcementDisplay }}
                    </div>
                  </td>
                  <td v-if="jwtDecoded().role === 'admin'" class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-category">
                    {{ item.announcementOwner }}
                  </td>
                  <td class="w-[13.5%] px-6 py-4 whitespace-nowrap ann-counter">
                  <div class="flex justify-center text-black">
                    {{ item.viewer == null ? "0" : item.viewer }}
                  </div>
                  </td>
                  <td class="w-[13.5%] flex flex-row justify-center px-6 py-4 whitespace-nowrap space-x-2">
                    <router-link :to="{ name: 'adminAnnDetail', params: { annId: item.id } }">
                      <div class="ann-button">
                        <button class="transition duration-300 ease-in-out hover:scale-105 text-xl px-2 py-2 rounded-md bg-green-400 hover:bg-green-500 ann-button" >
                          View
                        </button>
                      </div>
                    </router-link>

                    <button @click="deleteAnn(item.id)" class="transition duration-300 ease-in-out hover:scale-105 text-xl px-2 py-2 rounded-md bg-red-400 hover:bg-red-500 ann-button ann-delete">
                      Delete
                    </button>
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

<style  lang="css" scoped>


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

</style>
