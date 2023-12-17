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
                return password.value.replace(/\s+/g, '') 
            }
            return undefined
        })

        const trimBetweenConfirmPassword = computed(() => {
            if (confirmPassword.value !== undefined && confirmPassword.value !== null) {
                return confirmPassword.value.replace(/\s+/g, '') 
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
    <div class="flex justify-center items-center">
        <form @submit.prevent="createUser()" class='mt-5 box-content h-1/2 w-1/3 flex flex-col items-start p-6 rounded-xl shadow-lg border-8 text-black border-gray-200 bg-gray-100 '>
            <div class="text-3xl font-bold pl-2">
                Create New User
            </div>
            
            <div class='pt-2 pl-10'>
                <label class="text-xl">Username</label>
                <div>
                    <input v-model.trim="user.username" maxlength="45" class="w-80 rounded-lg ann-username" type="text" required>
                </div>
                
                <div v-if="errorField?.username" class="text-semibold text-red-500 ann-error-username">{{errorField.username}}</div>
            </div>

            <div class='pt-2 pl-10'>
                <label class="text-xl">Password</label>
                <div>
                    <input v-model.trim="password" minlength="8" maxlength="14" class="w-80 rounded-lg ann-password" type="password" required>
                </div>
                                
                <div v-if="errorField?.password " class="text-semibold text-red-500 ann-error-password">{{errorField.password}}</div>
            </div>

            <div class='pt-2 pl-10'>
                <label class="text-xl">Confirm Password</label>
                <div>
                    <input v-model.trim="confirmPassword" minlength="8" maxlength="14" class="w-80 rounded-lg ann-confirm-password" type="password" required>
                </div>

            </div>

            <div class='pt-2 pl-10'>
                <label class="text-xl">Name</label>
                <div>
                    <input  v-model.trim="user.name" maxlength="100" class="w-80 rounded-lg ann-name" type="text"  required>
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
                    <select v-model.trim="user.role " class="w-40 ann-role rounded-lg" required>
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
    </div>
</template>
 
<style scoped>
</style>
