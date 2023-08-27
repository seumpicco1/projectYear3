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
    <div class='w-full h-screen text-black'>
        <h2 class="text-4xl">Create New User:</h2>

        <div class='row mt-5 ml-5'>
            <label class="text-2xl pl-5">Username</label>
            <!-- <span class="bg-blue-300">{{ countTitle }}/45</span> -->
            <div>
                <input v-model="user.username" maxlength="45" class="w-10/12 ml-5 mt-3 ann-username" type="text" data-required="true" required>
            </div>
        </div>

        <div class='row mt-5 ml-5'>
            <label class="text-2xl pl-5">Name</label>
            <!-- <span class="bg-blue-300">{{ countTitle }}/100</span> -->
            <div>
                <input  v-model="user.name" maxlength="100" class="w-10/12 ml-5 mt-3 ann-name" type="text" data-required="true" required>
            </div>
        </div>

        <div class='row mt-5 ml-5'>
            <label class="text-2xl pl-5">Email</label>
            <!-- <span class="bg-blue-300">{{ countTitle }}/150</span> -->
            <div>
                <input v-model="user.email" maxlength="150" class="w-10/12 ml-5 mt-3 ann-email" type="text" data-required="true" required>
            </div>
        </div>

        <div class='row mt-5 ml-5'>
            <label class="text-2xl pl-5">Role</label>
            <div>
                <select v-model="user.role " class="w-3/12 ml-5 mt-3 ann-role" data-required="true" required>
                    <!-- <option  > Choose Role</option> -->
                    <option  value="admin">admin</option>
                    <option  value="announcer">announcer</option>
                </select>
            </div>
        </div>
            
        <div class='row mt-5 ml-5 space-x-3'>
            <button @click="submit(user)" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                 Save 
            </button>

            <router-link :to="{ name: 'adminUser' }">
                <button class="bg-white hover:bg-gray-100  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow content-between">
                    Cancel
                </button>
            </router-link>
        </div>
         
    </div>
</template>
 
<style scoped>
</style>