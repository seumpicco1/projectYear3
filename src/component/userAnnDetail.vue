<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { time } from "../composable/time.js";
import { RouterLink } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";

const dataStore = useDataStore()
const data = ref([]);
const showDetail = ref(false);

onMounted(async () => {
  data.value = await dataStore.getOneAnnData(params.annId, true);
  if (data.value.length === 0 && !data.value) {
    alert("No this ids");
    // router.push("/")
  } else {
    showDetail.value = true;
  }
});

const { params } = useRoute();
</script>

<template>
  <div class="flex justify-end mb-8">
    <h1 class="text-2xl">User view :</h1>
    <span class="text-2xl text-emerald-400">{{ data.viewer }}</span>
  </div>
  <div v-show="showDetail">
    <div class="w-full h-full space-y-8">
      <div class="flex justify-start space-y-9">
        <h1 class="text-8xl">Announcement Detail:</h1>
      </div>
    </div>
    <div class="space-y-8 mt-20 ann-item">
      <h1 class="text-5xl ann-title">{{ data.announcementTitle }}</h1>
      <p class="text-2xl text-gray-500 ann-category">
        {{ data.announcementCategory }}
      </p>
      <div class="flex justify-end">
        <p class="text-2xl">
          <span class="text-red-500"> Close on :</span>

          <span class="ann-close-date">
            {{ data.closeDate == null ? "-" : time(data.closeDate) }}
          </span>
        </p>
      </div>
      <p class="text-2xl ann-description ql-editor" v-html="data.announcementDescription"></p>
    </div>
  </div>

  <RouterLink :to="{ name: 'userAnn' }">
    <div class="mt-16">
      <button class="border-4 p-3 rounded-xl text-xl text-black hover:bg-green-100 ann-button">
        Back
      </button>
    </div>
  </RouterLink>
</template>

<style scoped></style>
