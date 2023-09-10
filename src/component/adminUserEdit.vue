<script setup>
import sidebar from "./sidebar.vue";
import fromEdit from './fromEdit.vue';
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";
import router from "../router/index.js";


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
    <div class="flex flex-row bg-white">

      <div>
        <sidebar/>
      </div>

      <div class="w-2/4 h-full">
        <fromEdit :user="user"/>
      </div>
   
    </div>
  </div>  
</template>


<style scoped>

</style>