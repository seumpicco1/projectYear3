<script setup>
import sidebar from "./sidebar.vue";
import fromEdit from './fromEdit.vue';
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { RouterLink } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";
// import router from "../router/index.js";

const errorField = ref({})
const dataStore = useDataStore()
const user  = ref({})
const { params } = useRoute();
onMounted(async () => {
  user.value = await dataStore.getOneUserData(params.userId);
  console.log(user.value);
});
const router = useRouter()

const submit = async (user) => {
    try{
        await dataStore.putUpdateUser(user)
        router.push({ name: "adminUser" })
    }catch(error){
      console.log(error.value);
        errorField.value = {}
        error.forEach(er => {
        errorField.value[er.field] = er.errorMessage
      });
      
    }
    console.log(errorField.value);
    // console.log(error);
    }


</script>

<template>
  <div class="h-full w-full ">
    <div class="flex flex-row bg-white">

      <div>
        <sidebar/>
      </div>

      <div class="w-full h-full">
        <fromEdit :user="user" :errorField = "errorField" @submit = "submit"/>
      </div>
   
    </div>
  </div>  
</template>


<style scoped>

</style>