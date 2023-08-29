<script setup>
import FromEdit from './FromEdit.vue';
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";
import router from "../router/index.js";
import Sidebar from "./Sidebar.vue";

const dataStore = useDataStore()
const user  = ref([])
const { params } = useRoute();
onMounted(async () => {
  user.value = await dataStore.getOneUserData(params.userId);
    console.log(user.value);

});
</script>
<template>
    <div class="h-full w-full ">
        <!-- <div class="h-full"> -->
            <div class="flex flex-grow bg-white shadow overflow-hidden">
                <div class="flex-1 ">
                    <!-- <Sidebar /> -->
                    <div class="bg-gray-500 flex justify-start w-[300px] h-full flex-col font-bold ">
    <div class="w-full text-5xl flex justify-center text-slate-900 pt-6">
      SAS
    </div>
    
    <router-link :to="{ name: 'adminAnn' }">
      <div id="announcement" class="text-start text-white text-3xl border-gray-900 border-t pt-5 pl-5 h-20">
        Announcement
      </div>
    </router-link>

    <router-link :to="{ name: 'adminUser' }"  >
      <div id="user" class="bg-green-400 text-start text-white text-3xl border-gray-900 border-y pt-5 pl-5 h-20">
        User <span>(<span class="text-blue-700">Edit</span>)</span>
      </div>
    </router-link>

</div>
                </div>

                <div class="grow w-[1000px]">
                       <FromEdit :user="user"/>
                </div>



            <!-- </div> -->
        </div>
    </div>

        <!-- <FromEdit :user="user"/> -->
</template>


<style scoped>

</style>