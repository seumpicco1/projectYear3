<script setup>
    import { defineProps } from 'vue';
            
        const props = defineProps({
            user : {require : true}
        })

        const submit = ()=>{
            console.log();
            emits("submit", props.user)
        }
    
        const emits  = defineEmits(["submit"])
</script>
 
<template>
    <div class='flex flex-col text-black ml-5'>
        <div class="text-4xl font-semibold pt-5 pl-3">
            Create New User
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Username</label>
            <div>
                <input v-model="user.username" maxlength="45" class="w-10/12 mt-1 ann-username" type="text" data-required="true" required>
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Password</label>
            <div>
                <input v-model="user.password" maxlength="14" class="w-10/12 mt-1 ann-password" type="password" data-required="true" required>
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Confirm Password</label>
            <div>
                <input v-model="user.confirmpassword" maxlength="14" class="w-10/12 mt-1 ann-confirm-password" type="password" data-required="true" required>
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Name</label>
            <div>
                <input  v-model="user.name" maxlength="100" class="w-10/12 mt-1 ann-name" type="text" data-required="true" required>
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Email</label>
            <div>
                <input v-model="user.email" maxlength="150" class="w-10/12 mt-1 ann-email" type="text" data-required="true" required>
            </div>
        </div>

        <div class='mt-5 ml-10'>
            <label class="text-2xl">Role</label>
            <div>
                <select v-model="user.role " class="w-3/12 mt-1 ann-role" data-required="true" required>
                    <option value="admin">admin</option>
                    <option value="announcer">announcer</option>
                </select>
            </div>
        </div>
            
        <div class='mt-8 ml-10 space-x-3'>
            <button @click="submit(user)" class="bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                 Save 
            </button>

            <router-link :to="{ name: 'adminUser' }">
                <button class="bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                    Cancel
                </button>
            </router-link>
        </div>

    </div>
</template>
 
<style scoped>
</style>