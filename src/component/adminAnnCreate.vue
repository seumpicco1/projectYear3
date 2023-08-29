<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../composable/dataHandlerPinia";

const dataStore = useDataStore()

const date = ref({})
const myQuill = ref('')
const data = ref({
  "categoryId": 1,
  announcementTitle : "" ,
  announcementDescription : ""
}); 

const isChecked = ref(false);

const router = useRouter()
const isValidCate = computed(() => {
  return data.value.categoryId !== undefined;
})

const isValid = computed(() => {
  return data.value.announcementTitle?.length > 0;
});

const isValidDes = computed(() => {
  if (myQuill.value.getText().length === 1 && data.value.announcementDescription.length > 0) {
    data.value.announcementDescription = ""
  }
  return data.value.announcementDescription.length > 0;
});

const isValidDate = computed(() => {
  dateFormat()
  return !(publishDateCheck()&&closeDateCheck())
})

const publishDateCheck =()=>{
  dateFormat()
  console.log(new Date(data.value.publishDate).getHours());
  if(data.value.publishDate==null || (new Date(data.value.publishDate) >= new Date() && new Date(data.value.closeDate < new Date()))){
    if(data.value.publishDate != null && date.value.pTime == undefined)  date.value.pTime = '06:00'
    return true
  } else  {
  alert(`Publish date ต้องมากกว่าวันและเวลาปัจจุบัน หรือเท่ากับวันและเวลาปัจจุบัน`)
    date.value.pTime = undefined
    date.value.pDate = undefined
    return false
  }
}
const closeDateCheck =()=>{
  dateFormat()
  console.log(new Date(data.value.publishDate))
  console.log(new Date(data.value.closeDate));
  if(data.value.closeDate==null || (new Date(data.value.closeDate) >= new Date(data.value.publishDate)&& new Date(data.value.closeDate)> new Date())){
    if(data.value.closeDate != null && date.value.cTime == undefined) date.value.cTime = "18:00"
    return true
  } if(new Date(data.value.closeDate) < new Date() || new Date(data.value.closeDate) < new Date(data.value.publishDate))  {
    alert('Close date ต้องกว่าวันปัจจุบัน และ มากกว่า Publish date')
    date.value.cDate = undefined
    date.value.cTime = undefined
    return false
  }

}

const clearList = () =>{
    data.value.announcementTitle = "" 
    data.value.category = null
    data.value.announcementDescription =""
    date.value.pDate = null
    date.value.cDate = null
    date.value.pTime =null
    date.value.cTime =null
    data.value.isChecked  = false
}

const dateFormat = ()=>{
  const publishDate = new Date(date.value.pDate+" "+(date.value.pTime === undefined ? "06:00" : date.value.pTime))
  const closeDate = new Date(date.value.cDate+" "+ (date.value.cTime === undefined ?  "18:00" : date.value.cTime))
  console.log(date.value.pTime);
  data.value.publishDate = isNaN(publishDate) ? null : publishDate.toISOString()
  data.value.closeDate = isNaN(closeDate) ? null : closeDate.toISOString()
}

const createAnn = async (data)=>{
  console.log(data);
  dateFormat()
  await dataStore.postCreateAnn(data)
  router.push({name : 'adminAnn'})
 
  }

const countTitle = computed(()=>{
  return data.value.announcementTitle.length
})

const countDes = computed(()=>{
  return data.value.announcementDescription.length
})
 
</script>

<template>
  <div id="registration-form">
	<div class='fieldset'>
    <legend >Create Announcement:</legend>
	
			<div class='row mt-5'>
				<label  class="text-2xl pl-5 " wrfor='firstname'>Title</label><span class="bg-blue-300">{{ countTitle }} / 200  </span>
				<input maxlength="200" class="w-52 ann-title" v-model="data.announcementTitle"  type="text" data-required="true" required>
			</div>
			<div class='row mt-5'>
				<label class="text-2xl pl-5" for="email">Category</label>
				<select id="countries"
          class=" ann-category h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="data.categoryId">
          <option di>Choose Category</option>
          <option :value="1">ทั่วไป</option>
          <option :value="2">ทุนการศึกษา</option>
          <option :value="3">หางาน</option>
          <option :value="4">ฝึกงาน</option>
        </select>
			</div>
			<div class='row mt-5'>
				<label  class="text-2xl pl-5 pt-" for="cemail">Description</label> 

          <QuillEditor ref="myQuill" theme ="snow" toolbar="full" v-model:content="data.announcementDescription"      
           contentType="html"/>
			</div>
      <div class='row mt-5'>
				<label class="text-2xl pl-5" for='firstname'>Publish Date</label>
        <div class="space-x-3">
				<input  class=" ann-publish-date mt-2" type="date" id="start" name="trip-start" placeholder="01/05/2023" required v-model="date.pDate" />

        <input   class=" ann-publish-time  mt-2" type="time" id="start" name="trip-start" placeholder="12:30" min="01-01-2018" max="01-01-2018" step="3600"
          required v-model="date.pTime" />
        </div>
			</div>

      <div class='row mt-5'>
				<label  class="text-2xl pl-5" for='firstname'>Close Date</label>
        <div class="space-x-3">
				<input  class="mt-2 ann-close-date"  type="date" id="start" name="trip-start" placeholder="01/05/2023" required v-model="date.cDate" />

        <input  class=" ann-close-time mt-2" type="time" id="start" name="trip-start" placeholder="12:30" min="01-01-2018" max="01-01-2018" step="3600"
          required v-model="date.cTime" />
        </div>
			</div>
     
        <div class="space-x-3 space-y-9 mt-7 pb-6" >
          <label>
            <input type="checkbox"  class=" ann-display checkbox w-12" v-model="isChecked" :v-bind="data.announcementDisplay = isChecked == 1?'Y':'N'"/>
          </label>
          <label for="display" class="text-2xl">Check to show this announcement</label>
        </div>
			</div>
  <button :disabled="!isValid || !isValidDes || !isValidCate || isValidDate  " :class="!isValid || !isValidDes || !isValidCate || isValidDate?'cursor-not-allowed hover:none':'hover:bg-green-100'"  class="border-4 p-3 rounded-xl text-xl text-black ann-button w-full bg-blue-500"   @click="createAnn(data)">
    Submit
  </button>
 
  <button class=" bg-red-300 border-4 p-3 rounded-xl text-xl text-black hover:bg-red-400 ann-button w-full " @click="clearList()">
    Clear 
  </button>
    
  <RouterLink :to="{ name: 'adminAnn' }">
    <button class=" ann-button bg-red-500 border-4 p-3 rounded-xl text-xl text-black hover:bg-red-600 ann-button w-full">
      Cancel
    </button>
  </RouterLink>
	</div>









</template>

<style scoped>

/* BTW alt-shift will pop a color picker 
  example color: followed  by alt shift will pop it
*/
/*
Hide the label if placeholder is supported
*/

body{
  background:#b4b4b4;
}

#registration-form {
  font-family:'Open Sans Condensed', sans-serif;
	width: 700px;
  min-width:250px;
	margin: 30px auto;
  
	position: relative;
}

#registration-form .fieldset {
	background-color:#d5d5d5;
  padding-top: 50px;
  padding-bottom: 50px;
padding-left: 50px;
padding-right: 50px;
	border-radius: 3px;
  
}

 #registration-form legend {
	text-align: center;
	background: #364351;
	width: 100%;
	padding: 30px 0;
  padding-top: 35px;
	border-radius: 3px 3px 0 0;
	color: white;
font-size:2em;
}

.fieldset form{
  border:1px solid #2f2f2f;
  margin:0 auto;
  display:block;
  width:100%;
  padding:30px 20px;
  padding-top: 70px;
  box-sizing:border-box;
  border-radius:0 0 3px 3px;
}
.placeholder #registration-form label {
	display: none;
}
 .no-placeholder #registration-form label{
margin-left:5px;
  position:relative;
  display:block;
  color:grey;
  text-shadow:0 1px white;
  font-weight:bold;
}
/* all */
::-webkit-input-placeholder { text-shadow:1px 1px 1px white; font-weight:bold; }
::-moz-placeholder { text-shadow:0 1px 1px white; font-weight:bold; } /* firefox 19+ */
:-ms-input-placeholder { text-shadow:0 1px 1px white; font-weight:bold; } /* ie */
#registration-form input[type=text] {
	padding: 15px 20px;
	border-radius: 1px;
  margin:10px auto;

  background-color:#f5f3f5;
	border: 1px solid silver;

	-webkit-box-shadow: inset 0 1px 5px rgba(0,0,0,0.2);
	box-shadow: inset 0 1px 5px rgba(0,0,0,0.2), 0 1px rgba(255,255,255,.8);
	width: 100%;

	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	box-sizing: border-box;
  -webkit-transition:background-color .5s ease;
-moz-transition:background-color .5s ease;
-o-transition:background-color .5s ease;
-ms-transition:background-color .5s ease;
transition:background-color .5s ease;
}
.no-placeholder #registration-form input[type=text] {
	padding: 10px 20px;

}




.parsley-error-list{
background-color:#C34343;
padding: 5px 11px;
margin: 0;
list-style: none;
border-radius: 0 0 3px 3px;
margin-top:-5px;
  margin-bottom:5px;
  color:white;
  border:1px solid #870d0d;
  border-top:none;
    -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position:relative;
  top:-1px;
  text-shadow:0px 1px 1px #460909;
    font-weight:700;
  font-size:12px;
}
.parsley-error{
	border-color:#870d0d!important;
  border-bottom:none;
}
#registration-form select{
	width:100%;
	padding:5px;
  margin-top: 10px;
}
::-moz-focus-inner {
  border: 0;
}




</style>
