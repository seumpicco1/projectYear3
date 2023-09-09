<script setup>
import sidebar from "./sidebar.vue";
import fromAdd from "./fromAdd.vue";
import { useDataStore } from "../composable/dataHandlerPinia";
import { useRouter } from "vue-router";

import {ref} from "vue"
                
  const dataStore = useDataStore()
  const user = ref({ role:"announcer"})

  const submit = async()=>{
    console.log(user.value);
    await dataStore.createUser(user.value)
    router.push({name : 'adminUser'})
  }

  const router = useRouter()

</script>
 
<template>
  <div class="h-full w-full ">
    <div class="flex flex-row bg-white ">

      <div >
        <sidebar/>
      </div>

      <div class="w-2/4 h-full">
        <fromAdd :user = "user" @submit = "submit"/>
      </div>
      
    </div>
  </div>
</template>
 
<style scoped>
</style>