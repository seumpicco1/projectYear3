<script setup>
    import { defineProps, ref, computed,onMounted } from 'vue';
        const props = defineProps({
            user : {require : true} ,
            errorField :{require : Object}
        })
        const password = ref('')
        const confirmPassword = ref('')
        const passwordMatch = ref(true)
    

        onMounted(async () => {
        });
    
        const trimBetweenPassword = computed(() => {
            if (password.value !== undefined && password.value !== null) {
                return password.value.replace(/\s+/g, '') // ใช้ regex เพื่อตัดช่องว่างทั้งหมด
            }
            return undefined
        })

        const trimBetweenConfirmPassword = computed(() => {
            if (confirmPassword.value !== undefined && confirmPassword.value !== null) {
                return confirmPassword.value.replace(/\s+/g, '') // ใช้ regex เพื่อตัดช่องว่างทั้งหมด
            }
            return undefined
        })

        const emits  = defineEmits(["submit"])
        
        const createUser = ()=>{
            if (password.value !== confirmPassword.value) {
                passwordMatch.value = false; 
            } else {
                emits('submit', { ...props.user, password: password.value });
            }
        }
        
        const canSubmit = computed(() => {
            const usernameValid = props.user && props.user.username && props.user.username.length > 0;
            const passwordValid = password.value && password.value.length > 0;
            const confirmPasswordValid = confirmPassword.value && confirmPassword.value.length > 0;
            const nameValid = props.user && props.user.name && props.user.name.length > 0;
            const emailValid = props.user && props.user.email && props.user.email.length > 0;

            return (
                usernameValid && passwordValid && confirmPasswordValid && nameValid && emailValid
            )
        })
</script>
 
<template>
    
    <form @submit.prevent="createUser()" class='flex flex-col text-black ml-5'>
        <div class="text-4xl font-semibold pt-5 pl-3">
            Create New User
        </div>

        <div class='mt-2 ml-10'>
            <label class="text-2xl">Username</label>
            <div>
                <input v-model.trim="user.username" maxlength="45" class="w-10/12 ann-username" type="text" required>
            </div>
            
            <div v-if="errorField?.username" class="text-semibold text-red-500 ann-error-username">{{errorField.username}}</div>
        </div>

        <div class='mt-2 ml-10'>
            <label class="text-2xl">Password</label>
            {{ trimBetweenPassword }}
            <div>
                <input v-model.trim="password" minlength="8" maxlength="14" class="w-10/12 ann-password" type="password" required>
            </div>
                            
            <div v-if="errorField?.password " class="text-semibold text-red-500 ann-error-password">{{errorField.password}}</div>
        </div>

        <div class='mt-2 ml-10'>
            <label class="text-2xl">Confirm Password</label>
            {{ trimBetweenConfirmPassword }}
            <div>
                <input v-model.trim="confirmPassword" minlength="8" maxlength="14" class="w-10/12 ann-confirm-password" type="password" required>
            </div>

        </div>

        <div class='mt-2 ml-10'>
            <label class="text-2xl">Name</label>
            <div>
                <input  v-model.trim="user.name" maxlength="100" class="w-10/12 ann-name" type="text"  required>
            </div>

            <div v-if="errorField?.name" class="text-semibold text-red-500 ann-error-name">{{errorField.name}}</div>
        </div>

        <div class='mt-2 ml-10'>
            <label class="text-2xl">Email</label>
            <div>
                <input v-model.trim="user.email" maxlength="150" class="w-10/12 ann-email" type="email" required>
            </div>

            <div v-if="errorField?.email" class="text-semibold text-red-500 ann-error-email">{{errorField.email}}</div>
        </div>

        <div class='mt-2 ml-10'>
            <label class="text-2xl">Role</label>
            <div>
                <select v-model.trim="user.role " class="w-3/12 ann-role" required>
                    <option value="admin">admin</option>
                    <option value="announcer">announcer</option>
                </select>
            </div>
        </div>
            
        <div class='flex flex-row mt-8 ml-10 space-x-3 items-end'>
            <button class="bg-white hover:bg-gray-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button" type="submit">
                 Add
            </button>

            <router-link :to="{ name: 'adminUser' }">
                <button class="bg-white hover:bg-red-200 text-black border border-gray-400 rounded py-2 px-4 font-semibold ann-button">
                    Cancel 
                </button>
            </router-link>

            <div v-if="!passwordMatch" class="text-red-500 text-xl font-semibold ann-error-password">
                The password DOES NOT match
            </div>
        </div>
        
           
       
    </form>
</template>
 
<style scoped>
</style>
