<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";
import sidebar from "./sidebar.vue";

const dataStore = useDataStore()
const btnText = ref('show')

const user = ref({
  username: "",
  password: "",
})

const passwordType = ref('password')

const showPassword =()=>{
 {
  if(passwordType.value === 'password'){
    passwordType.value = 'text'
    btnText.value = 'not show'
   
  }
  else{
    passwordType.value = 'password'
    btnText.value = 'show'
  }
         
}
    
    console.log(user.value.password);
}


const passwordMatchingResult = ref(null);

const passwordMatch = async (user) => {
  
  passwordMatchingResult.value = null; 
  const result = await dataStore.checkPasswordMatch(user);

  if (result !== null) {
    if (result === "UserNotFound") {
      passwordMatchingResult.value = "The specified username DOES NOT exist"
    } else if (result === "PasswordNotMatch") {
      passwordMatchingResult.value = "Password NOT Matched"
    } else if (result === "PasswordMatch" ) {
      passwordMatchingResult.value = "Password Matched"
    }
  }
}

</script>

<template>
  <div class="w-full h-full bg-white">
    <div class="flex flex-row">

      <div class="flex-grow">
        <sidebar/>
      </div>

      <div class="w-full">
        <div class="flex flex-col h-full justify-center items-center">
            <div class="box-content h-1/2 w-1/3 p-5 rounded-xl shadow-lg border-8 text-black border-gray-200 bg-gray-100">

              <div class="text-4xl font-semibold pt-4 pl-4">
                Match Password
              </div>

              <div class="mt-8 ml-8">
                <label class="text-2xl font-medium">Username</label>
                <div>
                    <input v-model="user.username" minlength="1" maxlength="45" class="w-80 mt-1 ann-username rounded-md" type="text" data-required="true" required>
                </div>
              </div>

              <div class="mt-8 ml-8">
                <label class="text-2xl font-medium">Password</label>
                <div>
                    <input v-model="user.password" minlength="8" maxlength="14" class="w-80 mt-1 ann-password rounded-md" 
                    :type="passwordType" data-required="true" required >
                    <button class="ml-2 p-2 bg-gray-300 border-2 border-gray-500 rounded-xl" @click ="showPassword()">{{ btnText }} </button>
                    
                  </div>
                  
              </div>

              <div class="mt-10 ml-8">
                <button @click="passwordMatch(user)" class="bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                    Match or not
                </button>
              </div>
              
              <div class="mt-8 ml-8">
                <div v-if="passwordMatchingResult === 'The specified username DOES NOT exist'" class="border-l-8 border-yellow-600 p-3 text-yellow-400 text-2xl font-bold  ann-message">
                    {{ passwordMatchingResult }}
                </div>
                <div v-if="passwordMatchingResult === 'Password NOT Matched'" class="border-l-8 border-red-600 p-3 text-red-400 text-2xl font-bold ann-message ">
                    {{ passwordMatchingResult }}
                </div>
                <div v-if="passwordMatchingResult === 'Password Matched'" class="border-l-8 border-green-600 p-3 text-green-400 text-2xl font-bold  ann-message">
                    {{ passwordMatchingResult }}
                </div>
                
              </div>

            </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<style scoped>

</style>