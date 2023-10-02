<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";

const router = useRouter()
const dataStore = useDataStore()
const user = ref({
    username: "",
    password: "",
})

const spinner = ref(false)


const loginFunction = async (x) => {
    try {
        spinner.value=true
        const result = await dataStore.createNewToken(x)
        setTimeout(()=>{
            router.push({name: "adminAnn"})
            spinner.value = false
        },1000)
        
        console.log(result);
        
    } catch (error) {
        setTimeout(()=>{
            spinner.value = false
        },700)
        console.error(error)
    }

    
    console.log(user.value.username);
    console.log(user.value.password);
 

}



</script>
<template>
    <div  class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div v-if="spinner" class="lds-dual-ring">

        </div>
        <div v-if="!spinner" class="max-w-md w-full space-y-8">
            <div>

                <h2 class="mt-6 text-center text-8xl font-extrabold text-gray-900">LOG IN </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="login">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm  space-y-5">
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input id="username" name="username" type="text" v-model="user.username" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" v-model="user.password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>



                <div>
                    <button @click="loginFunction(user)" type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <!-- Heroicon name: solid/lock-closed -->

                            <!-- <path fill-rule="evenodd" d="M10 2C5.03 2 1 6.03 1 11v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6c0-4.97-4.03-9-9-9zm0 2a7 7 0 0 1 7 7v2H3v-2a7 7 0 0 1 7-7zm1 10a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0v-3z" clip-rule="evenodd" /> -->
                            <!-- </svg> -->
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  

 
<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>