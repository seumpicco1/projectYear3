<script setup>
import { defineProps } from 'vue';
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import Sidebar from "./Sidebar.vue";
<<<<<<< HEAD
import { putUpdateUser } from '../composable/dataHandleUser.js';
import { time } from "../composable/time.js";
const props = defineProps({ user: { require: true }})
const router = useRouter()
const updateUserFunc = async (data) => {await putUpdateUser(data); router.push({ name: "adminUser" });};
=======
import { time } from "../composable/time.js";
import { useDataStore } from "../composable/dataHandlerPinia";
const dataStore = useDataStore()
const props = defineProps({ user: { require: true }})
const router = useRouter()
const updateUserFunc = async (data) => {await dataStore.putUpdateUser(data); router.push({ name: "adminUser" });};
>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)

// const isValid = computed(() => {
//   return data.value.announcementTitle?.length > 0;
// });

</script>
 
<template>
    <div class='w-full h-screen text-black'>

        <h2 class="text-4xl">Edit User</h2>
        <div class='row mt-5 ml-5'>

            <label class="text-2xl pl-5">Username</label>
            <!-- <span class="bg-blue-300">{{ countTitle }}/45</span> -->
            <div>
                <input v-model="user.username" maxlength="45" class="w-10/12 ml-5 mt-3 ann-username" type="text"
                    data-required="true" required>
            </div>
        </div>

        <div class='row mt-5 ml-5'>
            <label class="text-2xl pl-5">Name</label>
            <!-- <span class="bg-blue-300">{{ countTitle }}/100</span> -->
            <div>
                <input v-model="user.name" maxlength="100" class="w-10/12 ml-5 mt-3 ann-name" type="text"
                    data-required="true" required>
            </div>
        </div>

        <div class='row mt-5 ml-5'>
            <label class="text-2xl pl-5">Email</label>
            <!-- <span class="bg-blue-300">{{ countTitle }}/150</span> -->
            <div>
                <input v-model="user.email" maxlength="150" class="w-10/12 ml-5 mt-3 ann-email" type="text"
                    data-required="true" required>
            </div>
        </div>

        <div class='row mt-5 ml-5'>
            <label class="text-2xl pl-5">Role</label>
            <div>
                <select v-model="user.role" class="w-3/12 ml-5 mt-3 ann-role" data-required="true" required>
                    <!-- <option  > Choose Role</option> -->
                    <option value="admin">admin</option>
                    <option value="announcer">announcer</option>
                </select>
            </div>


            <div class="flex justify-start space-x-8">
<<<<<<< HEAD
                <p class="text-2xl mt-7">Create on {{ time(user.createdOn) }}</p>
                <p class="text-2xl mt-7">Update on {{ time(user.updatedOn) }}</p>
=======
                <p class="text-2xl mt-7">
                    Create on <span class="ann-created-on"> {{ time(user.createdOn) }} </span>
                </p>
                <p class="text-2xl mt-7">
                    Update on <span class="ann-updated-on"> {{ time(user.updatedOn) }} </span>
                </p>
>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)
            </div>

        </div>





        <div class='row mt-5 ml-5 space-x-3'>
            <button @click="updateUserFunc(user)"
<<<<<<< HEAD
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
=======
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ann-button">
>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)
                Save
            </button>

            <router-link :to="{ name: 'adminUser' }">
                <button
<<<<<<< HEAD
                    class="bg-white hover:bg-gray-100  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow content-between">
=======
                    class="bg-white hover:bg-gray-100  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow content-between ann-button">
>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)
                    Cancel
                </button>
            </router-link>
        </div>

    </div>
</template>
 
<style scoped></style>