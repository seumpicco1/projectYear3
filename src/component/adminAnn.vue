<script setup>
import sidebar from "./sidebar.vue";
import { onMounted, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { time } from "../composable/time.js";
import { useDataStore } from "../composable/dataHandlerPinia";

const dataStore = useDataStore()

const data = ref([]);
const show1 = ref(false);
const show2 = ref(false);
const searchTerm = ref("");
const timezoneName = new Intl.DateTimeFormat().resolvedOptions().timeZone;
onMounted(async () => {
  data.value = await dataStore.getAnnData();
  console.log(data.value);
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
      <div class="flex-grow">
      <sidebar/>
      </div>
      <h1 class="font-bold Announcement text-6xl">No Announcements</h1>
    </div>

    <div v-show="show2">
      <div class="flex flex-row">

        <div class="flex-grow">
          <sidebar/>
        </div>

        <div class="flex flex-col w-full text-black">
          <div class="flex justify-center font-semibold text-5xl pt-5">User Management</div>
          <div class="flex flex-col w-full text-black">
            <div class="flex flex-row mb-5">
                
              <div class="font-bold text-xl pt-8 pl-10">
                Date/Time shown in Timezone&nbsp; 
                <span class="text-blue-600">{{ timezoneName }}</span>
              </div>

              <div class="ml-auto pt-5 pr-10">
                <router-link :to="{ name: 'adminAnnCreate' }">
                  <button class="jump hover:bg-blue-500 bg-blue-300 text-black text-2xl px-4 py-2 rounded-md ann-button">
                    Create Announcement
                  </button>
                </router-link>
              </div>

            </div>
          </div>
        
          <div class="h-full">
            <div class="flex justify-center flex-grow bg-white overflow-hidden">
              <div class="overflow-y-scroll h-[612px]">
                <table class="w-full">
                  <thead class="bg-gray-400 text-black">
                    <tr>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                        No.
                      </th>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                        Publish Date
                      </th>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                        Close Date
                      </th>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500uppercase tracking-wider">
                        Display
                      </th>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500uppercase tracking-wider">
                        User Views
                      </th>
                      <th class="px-6 py-3 text-xl font-extrabold text-black-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 divide-none text-black text-l">
                    <tr
                      class="flex-col-reverse ann-item"
                      v-for="(item, index) in filteredData"
                      :key="item.id"
                      :class="index % 2 == 0 ? 'bg-gray-200' : 'bg-white-950'"
                    >
                      <td class="px-6 py-4 whitespace-nowrap">
                        {{ ++index }}
                      </td>
                      <div class="ann-title w-full">
                        <td class="px-6 py-4 whitespace-nowrap ann-title font-sans w-full">
                          {{ item.announcementTitle }}
                        </td>
                      </div>
                      <td class="px-6 py-4 whitespace-nowrap ann-category font-sans">
                        {{ item.announcementCategory }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap ann-publish-date font-sans">
                        {{ item.publishDate == null ? "-" : time(item.publishDate) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap ann-close-date font-sans">
                        {{ item.closeDate == null ? "-" : time(item.closeDate) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap ann-display font-sans" 
                        :class="item.announcementDisplay == 'Y' ? 'bg-green-200 border-b-4 border-green-300' : 'bg-red-200 border-b-4 border-red-300'">
                        <div class="flex justify-center">
                          {{ item.announcementDisplay }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap ann-counter font-sans">
                      <div class="flex justify-center text-black">
                        {{ item.viewer == null ? "0" : item.viewer }}
                      </div>
                      </td>
                      <td class="flex flex-row px-6 py-4 whitespace-nowrap space-x-2">
                        <router-link :to="{ name: 'adminAnnDetail', params: { annId: item.id } }">
                          <div class="ann-button">
                            <button class="text-2xl px-4 py-2 rounded-md bg-green-400 hover:bg-green-500 ann-button" >
                              view
                            </button>
                          </div>
                        </router-link>

                        <button @click="deleteAnn(item.id)" class="text-2xl px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 ann-button ann-delete">
                          delete
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
