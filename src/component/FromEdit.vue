<script setup>
import { defineProps } from 'vue';
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { time } from "../composable/time.js";
import { useDataStore } from "../composable/dataHandlerPinia";
const dataStore = useDataStore()
const props = defineProps({ user: { require: true }})
const router = useRouter()

    const updateUser = async () => {
        await dataStore.putUpdateUser(props.user)
        router.push({ name: "adminUser" })
        console.log(props.user)
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
    <div class='flex flex-col text-black ml-5'>
        <div class="text-4xl font-semibold pt-5 pl-3">
            Edit User
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Username</label>
            <div>
                <input v-model="user.username" maxlength="45" class="w-10/12 mt-1 ann-username" type="text" data-required="true" required>
            </div>

            <div v-if="user.username === undefined || user.username.length === 0" class="text-semibold text-red-500">
                username is required
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Name</label>
            <div>
                <input v-model="user.name" maxlength="100" class="w-10/12 mt-1 ann-name" type="text" data-required="true" required>
            </div>

            <div v-if="user.name === undefined || user.name.length === 0" class="text-semibold text-red-500">
                name is required
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Email</label>
            <div>
                <input v-model="user.email" maxlength="150" class="w-10/12 mt-1 ann-email" type="text" data-required="true" required>
            </div>

            <div v-if="user.email === undefined || user.email.length === 0" class="text-semibold text-red-500">
                email is required
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Role</label>
            <div>
                <select v-model="user.role" class="w-3/12 mt-1 ann-role" data-required="true" required>
                    <option value="admin">admin</option>
                    <option value="announcer">announcer</option>
                </select>
            </div>

            <div class="flex space-x-8">
                <p class="text-xl mt-7 border-4 border-gray-300 p-2 font-semibold">
                    Created on : <span class="ann-created-on"> {{ time(user.createdOn) }} </span>
                </p>
                <p class="text-xl mt-7 border-4 border-gray-300 p-2 font-semibold">
                    Updated on : <span class="ann-updated-on"> {{ time(user.updatedOn) }} </span>
                </p>
            </div>
        </div>     

        <div class="mt-8 ml-10 space-x-3">
            <button :disabled="!canEdit" :class ="!canEdit ? 'cursor-not-allowed hover:none':'hover:bg-green-200'" @click="updateUser()" class="bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                    Edit
            </button>

            <router-link :to="{ name: 'adminUser' }">
                <button class="bg-white hover:bg-red-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                    Cancel
                </button>
            </router-link>
        </div>
        
    </div>
</template>
 
<style scoped></style>