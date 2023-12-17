<script setup>
import { onMounted, ref } from "vue";
import { routerKey, useRoute } from "vue-router";
import { time } from "../composable/time.js";
import { RouterLink } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";
import sidebar from "./sidebar.vue";

const dataStore = useDataStore()
const files = ref([])
const data = ref([]);
const showDetail = ref(false);
const { params } = useRoute();

onMounted(async () => {
  console.log(params.annId);
  let allFetch = await dataStore.getOneAnnData(params.annId, true);
  data.value = allFetch.announcement
  files.value = allFetch.file
  if (data.value.length === 0) {
    alert("No this ids").then(() => {
      setTimeout(() => {
        router.push({ name: "userAnn" })
      }, 2000)
    });
    
  } else {
    showDetail.value = true;
  }
  console.log(data.value)
  console.log(files.value)
});
 

const download = (file)=>{
  const url = URL.createObjectURL(file)
  const tagA = document.createElement("a")
  tagA.href = url
  tagA.download = file.name
  tagA.click()
}



</script>

<template>
  <div v-show="showDetail" class="w-full h-full bg-white flex flex-row ">
    <sidebar/>
    
      <div class="w-full flex-col justify-start space-y-9 text-black p-40 ">
        <div class="flex flex-row justify-between bg-slate-500 py-6 items-end border  rounded-t-xl"> 
          <h1 class="text-4xl font-semibold pl-5 text-white">Announcement Detail</h1>
          <h1 class="text-xl font-semibold text-white pr-5">User view : {{ data.viewer }}</h1>
         
        </div>
        <div class="space-y-8 mt-20 ann-item">
          <h1 class="text-3xl pl-4 text-slate-700 ann-title underline underline-offset-2">{{ data.announcementTitle }}</h1>
          <div class="pl-4 flex flex-row space-x-10">
          <p class="text-2xl font-medium text-gray-500 ann-category">
            Category : {{ data.announcementCategory }}
          </p>
            <div class="flex">
              <p class="text-2xl font-medium">
                <span class="text-red-500"> Close on : </span>
                <span class="ann-close-date text-red-500">
                  {{ data.closeDate == null ? "-" : time(data.closeDate) }}
                </span>
              </p>
            </div>
          </div>

          <p class="text-2xl ann-description ql-editor" v-html="data.announcementDescription"></p>
          <div v-for="(file) in files">
            <div @click="download(file)">
               <a class="cursor-pointer font-medium ">{{file.name}}</a>
            </div>
          </div>

        </div>
        <RouterLink :to="{ name: 'userAnn' }">
          <div class="mt-10">
            <button class="text-xl bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-3 px-5 font-semibold ann-button">
              Back
            </button>
          </div>
        </RouterLink>
        
      </div>
  </div>
</template>

<style scoped></style>
