<script setup>
import { ref, defineProps, onMounted, defineEmits} from "vue";
import { useDataStore } from "../composable/dataHandlerPinia";
import otpForm from "./otpForm.vue";
import router from "../router";

const dataStore = useDataStore()
const showEmailPage = ref(true)
const showOtpPage = ref(false)
const emailSubscribe = ref({
  email: ''
});
const selectedCat = ref(1);
const categories = ref([]);
const emit = defineEmits("successSub");
const props = defineProps(["emailSubscribe", "selectedCat"]);

onMounted(() => {
  fetchCategories(); 
})

const fetchCategories = async () => {
  categories.value = await dataStore.getCategoriesId();
}

const getOtp =  async ()=> {
  try{
    const res  = dataStore.subscribeEmail(emailSubscribe.value)
    console.log('Send ok ',res);
    otpPage();
  }catch (error){
    console.log('error',error);
  }
}

const otpPage = () => {
  showOtpPage.value = true 
  showEmailPage.value = false
}

const back = async () => {
  router.go(0)
}

</script>

<template>
  <div v-if="showEmailPage" class="flex flex-col items-start p-10 rounded-xl shadow-lg border-8 text-black border-gray-200 bg-gray-100">
  <!-- ส่วนของฟอร์มส่งอีเมลและเลือก Category -->
  <div class="text-4xl font-bold text-black mb-4">
    <div class="text-4xl items-start">Enter your email</div>
    <div class="text-xl">Please enter your e-mail address and select the category you want to subscribe.</div>
  </div>
  <div class="mb-4 flex flex-col items-start">
    <label for="email" class="text-lg">Email</label>
    <input type="email" v-model="emailSubscribe.email" class="p-2 border border-gray-300 rounded-md" />
  </div>
  <div class="mb-4 flex flex-col items-start">
    <label for="category" class="text-lg">Choose category</label>
    <select id="category" v-model="selectedCat" class="p-2 border border-gray-300 rounded-md">
      <option v-for="c in categories" :key="c.categoryId" :value="c.categoryId">{{ c.categoryName }}</option>
    </select>
  </div>
  <div class="flex flex-row">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" @click="getOtp">
      Get OTP
    </button>
    <button class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2" @click="back">
      Back
    </button>
  </div>  
</div>

  <div v-if="showOtpPage">
    <otpForm :emailSubscribe="emailSubscribe" :selectedCat="selectedCat"/>
  </div>
  
</template>


<style scoped>

</style>
