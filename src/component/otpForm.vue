<script setup>
import { ref, defineProps,onMounted,watch } from "vue";
import { useDataStore } from "../composable/dataHandlerPinia";
import { useRouter } from "vue-router";

const router = useRouter();
const dataStore = useDataStore();
const emit = defineEmits(["successSub"]);
const props = defineProps(["emailSubscribe", "selectedCat"]);
const subscribeData = ref({
  email: props.emailSubscribe.email,
  otp: '',
  catId: props.selectedCat
});

onMounted(()=>{
  console.log(subscribeData.value)
})
 
const submitOtp = async () => {
  try { 
    const response = await dataStore.subscribeOtp(subscribeData.value);
    router.go(0)
  } catch (error) {
    console.log(error);
  }
}

const back = async () => {
  router.go(0)
}

</script>

<template>
    <div class="flex flex-col items-start p-10 rounded-xl shadow-lg border-8 text-black border-gray-200 bg-gray-100">
      <div class="text-4xl font-bold text-black mb-4">
        <div class="text-4xl items-start">Enter OTP</div>
        <div class="text-2xl">Your One Time Password (OTP) has been sent via email.</div>
      </div>
      <div class="mb-4 flex flex-col items-start">
        <label for="otp" class="text-lg">OTP:</label>
        <input type="text" id="otp" maxlength="6" v-model="subscribeData.otp" required class="p-2 border border-gray-300 rounded-md" />
      </div>
      <div class="flex flex-row">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2" @click="submitOtp">
          Verify OTP
        </button>
        <button class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2" @click="back">
            Back
        </button>
      </div>
    </div>
    

</template>