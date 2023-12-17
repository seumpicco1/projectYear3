<script setup>
import sidebar from "./sidebar.vue";
import subscribeForm from "./SubscribeForm.vue";
import otpForm from "./otpForm.vue";
import { onMounted, ref, computed, watch } from "vue";
import { RouterLink } from "vue-router";
import { time } from "../composable/time.js";
import { useModeStore } from "@/composable/changeModeHandlerPinia";
import { useDataStore } from "../composable/dataHandlerPinia";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("accessToken")

const jwtDecoded = () => {
  if (token === null) return null
  else return jwt_decode(token)
}

const dataStore = useDataStore()
const store = useModeStore();

const data = ref([]);
const category = ref([]);
const dataClose = ref([]);
const show1 = ref(false);
const show2 = ref(false);
const showSubForm = ref(false);
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
}).value

watch(store, () => {
  fetchData();
  pages.value = 0;
})

const nextChange = () => {
  fetchData(pages.value < data.value.totalPages - 1 ? ++pages.value : 0);
}

const prevChange = () => {
  fetchData(pages.value < data.value.totalPages ? --pages.value : 0);
}

const changePage = async (page) => {
  fetchData((pages.value = page))
  console.log(pages.value)
}

const showSubscribe = () => {
  show2.value = false
  showSubForm.value = true
} 

const closeSubForm = () => {
  showSubForm.value = false
  show2.value = true
  finishSub();
} 

const finishSub = () => {
  console.log("you get subscribe now!")
}
</script>

<template>
  <div class="w-full h-full bg-white">
  
    <div>
      <div class="flex flex-row">
          
        <sidebar/>

          <div class="flex flex-col mx-auto mt-10 ">

            <div v-show="show2">
            
              <div v-if="jwtDecoded() === null" class="flex justify-center mb-5">
                <router-link :to="{ name: 'login' }">
                  <button class="transition duration-300 ease-in-out hover:scale-105 font-bold text-2xl w-[300px] h-[60px] px-2 py-2 border-4 border-gray-400 rounded-md bg-white hover:bg-gray-300 ann-button">
                    Log In
                  </button>
                </router-link>
              </div>

              <div class="flex justify-center text-4xl font-bold text-black">
                <div class="text-4xl">SIT Announcement System (SAS)</div>
              </div>

              <div class="font-semibold mb-4 mt-10 text-xl flex justify-center">
                Date/Time shown in Timezone&nbsp;
                <span class="text-blue-600">{{ timezoneName }}</span>
              </div>
            
              <div class="font-semibold mb-4 mt-10 text-xl pl-10 flex justify-between">
                <div>
                  <span>Choose category</span>
                  <select id="countries"
                    class="ann-category-filter bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="store.cat">
                    <option :value="0">ทั้งหมด</option>
                    <option v-for="c in category" :key="c.categoryId" :value="c.categoryId">{{ c.categoryName }}</option>
                  </select>
                </div>
                <div class="flex mb-10 r-9">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mr-2" @click="showSubscribe">
                    Subscribe
                  </button>
                  <button :class="store.mode.includes('close') ? 'btn-success' : 'btn-error'"
                    class=" text-white font-semibold py-2 px-4 rounded-lg mr-2" @click="store.changeMode()">
                    {{store.mode.includes("close")? "Active Announcement": "Close Announcement"}}
                  </button>
                </div>
              </div>

              <div class="info-box mx-auto">
                <div class="grid grid-cols-10 h-20 rounded-t-lg text-2xl font-semibold bg-slate-500 text-white">
                  <div class="m-auto">No.</div>
                  <div class="m-auto col-span-3">Title</div>
                  <div class="m-auto col-span-3">{{ store.mode.includes("close") ? "Closedate" : "" }}</div>
                  <div class="m-auto col-span-3">Category</div>
                </div>

                <div>
                  <div class="ann-item" v-for="(item, index) in data.content" :key="item.id">
                    <router-link :to="{ name: 'userAnnDetail', params: { annId: item.id } }">
                      <div class="grid grid-cols-10 h-20 text-xl font-normal text-black hover:bg-gray-300" :class="[
                        index % 2 == 0 ? 'bg-gray-200' : 'bg-white', index == data.content.length - 1 ? 'rounded-b-lg' : '',]">
                        <div class="m-auto ">{{ index + 1 + data.page * data.size }}</div>
                        <div class="m-auto col-span-3 text-center w-96 ann-title"> {{ modeBtn ? item.announcementTitle : item.announcementTitle }}</div>
                        <div class="m-auto col-span-3 ann-close-date  text-red-400">{{ store.mode.includes("close") ? item.closeDate == null ? "-" :time(item.closeDate) : "" }}</div>
                        <div class="m-auto col-span-3 ann-category">{{ item.announcementCategory }}</div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="btn-group mt-3 " v-if="data.totalPages > 1">
                  <button class="btn ann-page-prev bg-slate-500 text-gray-200 border-none hover:bg-gray-800" @click="prevChange(true)" :disabled="data.page == 0">Prev</button>
                  <button class="btn border-none hover:bg-gray-800"  :class="[data.page+1 == index ? 'bg-white text-gray-400' : 'bg-gray-200 text-gray-400', `ann-page-${i}`]"
                    v-for="index, i of pagess(10, data.totalPages)" :key="i" :value="index" @click="changePage(index - 1)" >{{index}}</button>
                  <button class="btn ann-page-next bg-slate-500 text-gray-200 border-none hover:bg-gray-800" @click="nextChange(false)" :disabled="data.page == data.totalPages - 1">Next</button>
                </div>
              </div>
            </div>
        
            <div v-if="showSubForm">
              <subscribeForm @successSub="closeSubForm"/>
            </div>

           
          
            <div v-if="data.totalElements == 0">
              <div class="w-full h-full">
                <div>
                  <h1 class="font-semibold Announcement text-6xl">No Announcements</h1>
                </div>
              </div>
            </div>

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
