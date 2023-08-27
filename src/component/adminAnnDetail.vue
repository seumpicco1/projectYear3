<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { time } from '../composable/time.js'
import { useDataStore } from "../composable/dataHandlePinia";

const dataStore = useDataStore()

const data = ref([]);
const showDetail = ref(false)
const showNopage = ref(false)

onMounted(async () => {
  data.value = await dataStore.getOneAnnData(params.annId,false);
  if (data.value.length === 0 && !data.value) {
    alert('No this ids')
    // router.push("/")
  }
  else {
    showDetail.value = true

  }
  console.log(data.value.viewer);

});

const { params } = useRoute();
</script>


<template>
  <div v-show="showNopage">

    <h1 class="text-6xl flex justify-center  text-red-500"> Not found </h1>
  </div>


  <div v-show="showDetail">
    <div class="w-full h-full space-y-8">
      <div class="flex justify-start space-y-9">
        <h1 class="text-5xl">Announcement Detail:</h1>
      </div>
      <table class="min-w-full h-full divide-y divide-gray-200 ">
        <tbody class="bg-white divide-y divide-gray-200 ann-item">
          <tr class="bg-gray-100">
            <td class="px-6 py-4 font-bold whitespace-nowrap ">Title</td>
            <td class="px-6 py-4 whitespace-nowrap ann-title">{{ data.announcementTitle }}</td>
          </tr>
          <tr class="bg-white">
            <td class="px-6 py-4 font-bold whitespace-nowrap">Category</td>
            <td class="px-6 py-4 whitespace-nowrap ann-category">{{ data.announcementCategory }}</td>
          </tr>

          <tr class="bg-gray-100">

    
            <td class="px-6 py-4 font-bold whitespace-nowrap ">Description</td>
            <td class="px-6 py-4 whitespace-nowrap ann-description  ql-editor" v-html="data.announcementDescription" ></td>
          </tr>
          <tr class="bg-white">
            <td class="px-6 py-4 font-bold whitespace-nowrap  ">Publish Date</td>
            <td class="px-6 py-4 whitespace-nowrap ann-publish-date">{{ data.publishDate == null ? "-" :time(data.publishDate) }}</td>

          </tr>
          <tr class="bg-gray-100">
            <td class="px-6 py-4 font-bold whitespace-nowrap ">Close Date</td>
            <td class="px-6 py-4 whitespace-nowrap ann-close-date ">{{ data.closeDate == null ? "-" : time(data.closeDate)}}</td>
          </tr>
          <tr class="bg-white">
            <td class="px-6 py-4 font-bold whitespace-nowrap">Display</td>
            <td class="px-6 py-4 whitespace-nowrap ann-display " :class="data.announcementDisplay=='Y'?'text-green-600':'text-red-600'"  >{{ data.announcementDisplay }}</td>
          </tr>
        </tbody>
      </table>
    </div> 

    <div class="flex flex-row space-x-2">
        <RouterLink :to="{ name: 'adminAnn' }"> 
          <div class="mt-2">
          <button class="btn btn-lg p-3 rounded-xl text-xl hover:btn-error hover:text-black ann-button">Back</button>
          </div>
        </RouterLink>



        <RouterLink :to="{ name: 'edit' }"> 
        <div class="mt-2"> 
          <button class="btn btn-lg p-3 rounded-xl text-xl hover:btn-success hover:text-black ann-button">edit</button>
        </div>
      </RouterLink>

    </div>
  </div>



</template>

<style scoped>

</style>
