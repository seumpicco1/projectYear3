import { defineStore,acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";

const modes = { Ac: 'active', Cs:'close'}

export const useModeStore = defineStore('UserAnnouncementStore',()=>{

    const mode = ref(modes.Ac)
    const cat = ref(0)
   
    const changeMode = () => mode.value === modes.Ac?mode.value = modes.Cs:mode.value = modes.Ac // toggle mode
    const getMode = () => mode.value
    const getCategories = () => cat.value

    const checkRealTime = computed(()=>`Now in ${mode.value} mode!`)

    return { changeMode, mode, checkRealTime, getMode, cat, getCategories }
})

if (import.meta.hot) {  
    import.meta.hot.accept(acceptHMRUpdate(useModeStore,import.meta.hot)) 
 }

export {modes}