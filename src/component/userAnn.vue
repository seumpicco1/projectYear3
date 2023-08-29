<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { RouterLink } from "vue-router";
import { time } from "../composable/time.js";
import { useModeStore } from "@/composable/changeModeHandlerPinia";
import { useDataStore } from "../composable/dataHandlerPinia";

const dataStore = useDataStore()
const store = useModeStore();

const data = ref([]);
const category = ref([]);
const dataClose = ref([]);
const show1 = ref(false);
const show2 = ref(false);
const modeBtn = ref(false);
const pages = ref(0);
const timezoneName = new Intl.DateTimeFormat().resolvedOptions().timeZone;

onMounted(async () => {
  await fetchData();
  category.value = await dataStore.getCategoriesId();
  if (data.value.length === 0 && dataClose.value.length === 0) {
    show1.value = true;
  } else {
    show2.value = true;
  }
});

const fetchData = async (newpage = 0) => data.value = await dataStore.getActiveOrCloseMode(store.getMode(), newpage, store.getCategories())

const pagess = (size = 10, datapage = 0) =>
  computed(() => {
    const show = Math.min(size, datapage);
    const min = Math.min( pages.value + 1 - Math.floor(show / 2) - Math.floor(size / 2.5), datapage - show + 1);
    const first = Math.max(min, 1);
    return [...Array(show)].map((_, i) => i + first);
}).value;

watch(store, () => {
  fetchData();
  pages.value = 0;
});

const nextChange = () => {
  fetchData(pages.value < data.value.totalPages - 1 ? ++pages.value : 0);
};

const prevChange = () => {
  fetchData(pages.value < data.value.totalPages ? --pages.value : 0);
};

const changePage = async (page) => {
  fetchData((pages.value = page));
  console.log(pages.value);
};
</script>

<template>

  <div class="pt-2">
    <div v-show="show2">
      <div class="flex justify-center text-black font-extrabold">
        <div class="text-4xl">SIT Announcement System (SAS)</div>
      </div>

      <div class="font-bold mb-4 mt-10 text-xl flex justify-center">
        Date/Time shown in Timezone&nbsp;
         <span class="text-blue-600">{{ timezoneName }}</span>
      </div>
    </div>


    <div class="font-bold mb-4 mt-10 text-xl pl-10 flex justify-around">
      <div>
        <span>Choose category</span>
        <select id="countries"
          class="ann-category-filter bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="store.cat">
          <option :value="0">ทั้งหมด</option>
          <option v-for="c in category" :key="c.categoryId" :value="c.categoryId">{{ c.categoryName }}</option>
        </select>
      </div>
      <div class="flex  mb-10 r-9">
        <button :class="store.mode.includes('close') ? 'btn-success' : 'btn-error'"
          class="text-black btn text-xl first-line:border px-4 py-2 rounded-md ann-button" @click="store.changeMode()">
          {{store.mode.includes("close")? "Active Announcement": "Close Announcement"}}
        </button>
      </div>
    </div>

    <div class="info-box mx-auto">
      <div class="grid grid-cols-10 h-20 rounded-t-lg text-2xl font-bold bg-slate-500 ">
        <div class="m-auto">No.</div>
        <div class="m-auto col-span-3">Title</div>
        <div class="m-auto col-span-3">{{ store.mode.includes("close") ? "Closedate" : "" }}</div>
        <div class="m-auto col-span-3">Category</div>
      </div>

      <div>
        <div class="ann-item" v-for="(item, index) in data.content" :key="item.id">
          <router-link :to="{ name: 'userAnnDetail', params: { annId: item.id } }">
            <div class="grid grid-cols-10 h-20 text-2xl font-bold hover:bg-gray-300" :class="[
              index % 2 == 0 ? 'bg-gray-200' : 'bg-white', index == data.content.length - 1 ? 'rounded-b-lg' : '',]">
              <div class="m-auto ">{{ index + 1 + data.page * data.size }}</div>
              <div class="m-auto col-span-3 text-center w-96 ann-title"> {{ modeBtn ? item.announcementTitle : item.announcementTitle }}</div>
              <div class="m-auto col-span-3 ann-close-date  text-red-600">{{ store.mode.includes("close") ? item.closeDate == null ? "-" :time(item.closeDate) : "" }}</div>
              <div class="m-auto col-span-3 ann-category">{{ item.announcementCategory }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="btn-group mt-3 " v-if="data.totalPages > 1">
        <button class="btn ann-page-prev" @click="prevChange(true)" :disabled="data.page == 0">Prev</button>
        <button class="btn"  :class="[data.page+1 == index ? 'btn-success' : '', `ann-page-${i}`]"
          v-for="index, i of pagess(10, data.totalPages)" :key="i" :value="index" @click="changePage(index - 1)" >{{index}}</button>
        <button class="btn ann-page-next" @click="nextChange(false)" :disabled="data.page == data.totalPages - 1">Next</button>
      </div>
    </div>
    <div v-if="data.totalElements == 0">
      <div class="w-full h-full">
        <div>
          <h1 class="font-bold Announcement text-6xl">No Announcements</h1>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.info-box {
  width: 1300px;
} 
</style>
