<script setup>
import sidebar from "./sidebar.vue";
import fromAdd from "./fromAdd.vue";
import { useDataStore } from "../composable/dataHandlerPinia";
import { useRouter } from "vue-router";
import {ref,onMounted} from "vue"
                
  const dataStore = useDataStore()
  const user = ref({ role:"announcer"})
  const router = useRouter()
  const errorField = ref({})
  
  const submit = async(user)=>{
    console.log(user.value);
    try {
      console.log('trying');
      await dataStore.createUser(user)
      router.push({name : 'adminUser'})
    } catch (error) {
      console.log('catching error');
      errorField.value = {}
      // throw new error("Error, create data!");
      // console.log(error);
      error.forEach(er => {
        errorField.value[er.field] = er.errorMessage
      });
      console.log(errorField.value);
    }
    
  }

  onMounted(async () => {
    console.log(user.value)
    console.log(user.username)
  });
</script>
 
<template>
  <div class="h-full w-full ">
    <div class="flex flex-row bg-white ">

      <div >
        <sidebar/>
      </div>

      <div class="w-2/4 h-full">
        <fromAdd :user = "user" :errorField = "errorField" @submit = "submit"/>
      </div>
      
    </div>
  </div>
</template>
 
<style scoped>
</style>