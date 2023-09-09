<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";
import router from "../router/index.js";
import sidebar from "./sidebar.vue";

const dataStore = useDataStore()
const user = ref([])
const { params } = useRoute();

onMounted(async () => {
  // user.value = await dataStore.getOneUserData(params.userId);
  //   console.log(user.value);
});
</script>

<template>
  <div class="w-full h-full bg-white">
    <div class="flex flex-row">

      <div class="flex-grow">
        <sidebar/>
      </div>

      <div class="w-full">
        <div class="flex h-full justify-center items-center">
          <div class="box-content h-1/2 w-1/2 p-4 border-4 text-black">

            <div class="text-4xl font-semibold pt-4 pl-4">
              Match Password
            </div>

            <div class="mt-8 ml-8">
              <label class="text-2xl font-light">Username</label>
              <div>
                  <input v-model="user.username" minlength="1" maxlength="45" class="w-2/3 mt-1 ann-username" type="text" data-required="true" required>
              </div>
            </div>

            <div class="mt-8 ml-8">
              <label class="text-2xl font-light">Password</label>
              <div>
                  <input v-model="user.password" minlength="8" maxlength="14" class="w-2/3 mt-1 ann-password" type="text" data-required="true" required>
              </div>
            </div>

            <div class="mt-10 ml-8">
              <button @click="PasswordMatch(data)" class="bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                  Match or not
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>  
</template>

<style scoped>

</style>