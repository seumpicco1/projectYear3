<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { time } from '../composable/time.js'
import { useDataStore } from "../composable/dataHandlerPinia";
import sidebar from "./sidebar.vue";

const dataStore = useDataStore()
const data = ref([]);
const files = ref([])
const showDetail = ref(false)
const showNopage = ref(false)
const { params } = useRoute();

onMounted(async () => {
  let allFetch  = await dataStore.getOneAnnData(params.annId,false);
  console.log(allFetch);
  data.value = allFetch.announcement
  files.value = allFetch.file

  if (data.value.length === 0 && !data.value) {
    alert('No this ids')
  }
  else {
    showDetail.value = true
  }
  console.log(data.value.viewer);
});

</script>

<template>
  <div v-show="showNopage">
    <h1 class="text-6xl flex justify-center text-red-500"> Not found </h1>
  </div>

  <div v-show="showDetail">
    <div class="w-full h-full bg-white flex flex-row ">
      <sidebar/>
      <div class="flex-col w-full h-full p-12">
        <h1 class="px-6 py-4 bg-slate-500 text-xl font-semibold text-white rounded-t-lg">
          Announcement Detail
        </h1>
        <table class="min-w-full h-full divide-y divide-gray-200">
          <tbody class="bg-white divide-y divide-gray-200 ann-item">
            <tr class="bg-gray-200 text-gray-400">
              <td class="px-6 py-4 font-bold whitespace-nowrap">Title</td>
              <td class="px-6 py-4 whitespace-nowrap ann-title">{{ data.announcementTitle }}</td>
            </tr>
            <tr class="bg-white text-gray-400">
              <td class="px-6 py-4 font-bold whitespace-nowrap">Category</td>
              <td class="px-6 py-4 whitespace-nowrap ann-category">{{ data.announcementCategory }}</td>
            </tr>
            <tr class="bg-gray-200 text-gray-400">
              <td class="px-6 py-4 font-bold whitespace-nowrap">Description</td>
              <td class="px-6 py-4 whitespace-nowrap ann-description ql-editor" v-html="data.announcementDescription" ></td>
            </tr>
            <tr class="bg-white text-gray-400">
              <td class="px-6 py-4 font-bold whitespace-nowrap">Publish Date</td>
              <td class="px-6 py-4 whitespace-nowrap ann-publish-date">{{ data.publishDate == null ? "-" :time(data.publishDate) }}</td>

            </tr>
            <tr class="bg-gray-200 text-gray-400">
              <td class="px-6 py-4 font-bold whitespace-nowrap">Close Date</td>
              <td class="px-6 py-4 whitespace-nowrap ann-close-date ">{{ data.closeDate == null ? "-" : time(data.closeDate)}}</td>
            </tr>
            <tr class="bg-white text-gray-400">
              <td class="px-6 py-4 font-bold whitespace-nowrap">Display</td>
              <td class="px-6 py-4 whitespace-nowrap ann-display" :class="data.announcementDisplay=='Y'?'text-green-600':'text-red-600'"  >{{ data.announcementDisplay }}</td>
            </tr>
            <tr v-if="files.length > 0" class="bg-gray-200 text-gray-400">
              <td class="px-6 py-4 font-bold whitespace-nowrap">File</td>
              <td class="px-6 py-4 whitespace-nowrap ann-close-date">
                <span v-for="(file, index) in files" :key="index">
                  {{ file.name }}
                  <span v-if="index !== files.length - 1">, </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex flex-row space-x-2 ">
          <RouterLink :to="{ name: 'adminAnn' }"> 
            <div class="mt-4">
            <button class="btn btn-lg p-3 rounded-xl text-xl bg-gray-800 hover:btn-error hover:text-black ann-button">Back</button>
            </div>
          </RouterLink>

          <RouterLink :to="{ name: 'adminAnnEdit' }"> 
            <div div class="mt-4"> 
              <button class="btn btn-lg p-3 rounded-xl text-xl bg-gray-800 hover:btn-success hover:text-black ann-button">edit</button>
            </div>
          </RouterLink>
        </div>
      </div>
    </div> 
  </div>
</template>

<style scoped>

</style>
