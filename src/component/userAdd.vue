<script setup>
import Sidebar from "./Sidebar.vue";
import FromAdd from "./FromAdd.vue"
import { createUser } from "..//composable/dataHandleUser.js"
import { useRouter } from "vue-router";

import {ref} from "vue"
                
  const user = ref({ role:"announcer"})

  const submit = async()=>{
    console.log(user.value);
    await createUser(user.value)
    router.push({name : 'adminUser'})
  }

  const router = useRouter()

</script>
 
<template>
  <div class="h-full w-full ">
      <div class="flex flex-grow bg-white shadow overflow-hidden">
        <div class="flex-1 ">
          <!-- <Sidebar /> --> <!-- **อย่าลืมแก้เรื่องสี ให้ใช้ sidebar แล้วมีสีตลอด** -->
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
                  User <span>(<span class="text-blue-700">Add</span>)</span>
                </div>
              </router-link>
            </div>
          </div>

          <div class="grow w-[1000px]">
            <FromAdd :user = "user"  @submit = "submit"  />
          </div>
            <!-- </div> -->
        </div>
    </div>
</template>
 
<style lang="css" scoped>
.c {
    background-color: green;
}
</style>