<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";



const router = useRouter()
const dataStore = useDataStore()
const user = ref({
    username: "",
    password: "",
})

const spinner = ref(false)
const warning = ref(false)
const userText = ref(false)
const passwordText = ref(false)

const loginFunction = async (x) => {
    try {
        if (user.value.username.length === 0 || user.value.password.length === 0) {
            warning.value = true
            setTimeout(() => {
                warning.value = false
            }, 2000)
        } else {
            const result = await dataStore.createNewToken(x)
            spinner.value = true
            setTimeout(() => {
                spinner.value = false
                router.push({ name: "userAnn" }).then(() => {
                    setTimeout(() => {
                        router.go(0)
                    }, 20)
                });
            }, 700);
            return result
        }
    } catch (error) {
        spinner.value = true
        setTimeout(() => {

            spinner.value = false

        }, 2000)

        console.error(error)
    }

    console.log(user.value.username);
    console.log(user.value.password);

}

</script>
<template>
    <div class="bg-gray-100 flex justify-center items-center h-screen">

        <div class="w-1/2 h-screen hidden lg:block">
            <img src="../assets/122.jpg" alt="Placeholder Image" class="object-cover w-full h-full">
        </div>


        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">

            <h1 class="text-2xl font-semibold mb-4">Login</h1>


            <div class="mb-4">
                <label for="username" class="block text-gray-600">Username</label>
                <input v-model="user.username" type="text" id="username" name="username"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                    autocomplete="off">
            </div>

            <div class="mb-4">
                <label for="password" class="block text-gray-600">Password</label>
                <input v-model="user.password" type="password" id="password" name="password"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                    autocomplete="off">
                <p v-show="warning" class="text-red-500"> Invalid username or password</p>
            </div>
            <!-- Remember Me Checkbox -->
            <!-- <div class="mb-4 flex items-center">
                <input type="checkbox" id="remember" name="remember" class="text-blue-500">
                <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
            </div> -->
            <!-- Forgot Password Link -->
            <div class="mb-6 text-blue-500">

            </div>
            <!-- Login Button -->
            <button @click="loginFunction(user)" type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login
            </button>

            <div v-if="spinner" class="lds-dual-ring ">


            </div>
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
    width: 90px;
    height: 90px;
    margin: 8px;
    margin-left: 300px;
    margin-top: 50px;
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