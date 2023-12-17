<script setup>
import { defineProps } from 'vue';
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { time } from "../composable/time.js";
import { useDataStore } from "../composable/dataHandlerPinia";
const dataStore = useDataStore()
const props = defineProps({ 
    user: { require: true }, 
    errorField :{require : Object}})
const router = useRouter()


        const emits  = defineEmits(["submit"])
        
        const updateUser = ()=>{
                emits('submit', { ...props.user});
        }

    const canEdit = computed(() => {
        const usernameValid = props.user && props.user.username && props.user.username.trim().length > 0;
        const nameValid = props.user && props.user.name && props.user.name.trim().length > 0;
        const emailValid = props.user && props.user.email && props.user.email.trim().length > 0;

        return (
            usernameValid && nameValid && emailValid
        )
    })

</script>
 
<template>
    <div class="flex justify-center items-center">
       <form @submit.prevent="updateUser()" class='mt-5 box-content h-1/2 w-1/3 flex flex-col items-start p-6 rounded-xl shadow-lg border-8 text-black border-gray-200 bg-gray-100'>  
        <div class="text-3xl font-bold pl-2">
            Edit User
        </div>

        <div class='pt-2 pl-10'>
            <label class="text-xl">Username</label>
            <div>
                <input v-model.trim="user.username" maxlength="45" class="w-80 rounded-lg ann-username" type="text" required>
            </div>

            <div v-if="errorField?.username" class="text-semibold text-red-500 ann-error-username">{{errorField.username}}</div>
        </div>

        <div class='pt-2 pl-10'>
            <label class="text-xl">Name</label>
            <div>
                <input v-model.trim="user.name" maxlength="100" class="w-80 rounded-lg ann-name" type="text"  required>
            </div>
            <div v-if="errorField?.name" class="text-semibold text-red-500 ann-error-name">{{errorField.name}}</div>
        </div>

        <div class='pt-2 pl-10'>
            <label class="text-xl">Email</label>
            <div>
                <input v-model.trim="user.email" maxlength="150" class="w-80 rounded-lg ann-email" type="email" required>
            </div>
            <div v-if="errorField?.email" class="text-semibold text-red-500 ann-error-email">{{errorField.email}}</div>
        </div>
    
        
        <div class='pt-2 pl-10'>
            <label class="text-xl">Role</label>
            <div>
                <select v-model="user.role" class="w-40 rounded-lg ann-role" required>
                    <option value="admin">admin</option>
                    <option value="announcer">announcer</option>
                </select>
            </div>

            <div class="flex space-x-3">
                <p class="text-sm mt-7 border-4 rounded-lg border-slate-400 p-2 font-semibold">
                    Created on : <span class="ann-created-on"> {{ time(user.createdOn) }} </span>
                </p>
                <p class="text-sm mt-7 border-4 rounded-lg border-slate-400 p-2 font-semibold">
                    Updated on : <span class="ann-updated-on"> {{ time(user.updatedOn) }} </span>
                </p>
            </div>
        </div>

        <div class="mt-8 ml-10 space-x-3">
            <button  type="submit" class="bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button" >
                    Edit
            </button>

            <router-link :to="{ name: 'adminUser' }">
                <button class="bg-white hover:bg-red-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                    Cancel
            </button>
            </router-link>
        </div>
        </form>
    </div>
</template>
 
<style scoped></style>
