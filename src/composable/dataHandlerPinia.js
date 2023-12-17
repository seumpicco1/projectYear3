import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";


const API_USER = import.meta.env.VITE_ROOT_API + "/api/users"
const API_ANN = import.meta.env.VITE_ROOT_API + "/api/announcements"
const API_CAT = import.meta.env.VITE_ROOT_API + "/api/categories"
const API_ANNUSER = import.meta.env.VITE_ROOT_API + "/api/announcements/pages"
const API_ANNUSERCLOSE = import.meta.env.VITE_ROOT_API + "/api/announcements/pages?mode=close"
const API_TOKEN = import.meta.env.VITE_ROOT_API + "/api/token"
const API_OTP = import.meta.env.VITE_ROOT_API + "/api/otps"
const API_FILE = import.meta.env.VITE_ROOT_API + "/api/files"

export const useDataStore = defineStore('Data', () => {

  const userData = ref([])
  const annData = ref([])
  const router = useRouter()
  // ========================================================================================================================================================
  // Announcement
  const getAnnData = async () => {
    try {
      const res = await fetch(`${API_ANN}`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      // console.log(res.);
      if (res.ok) {
        const result = await res.json()
        // console.log(result);
        annData.value = result
        return annData.value
      }
      else if(res.status === 401){
        getNewAccessToken()
        
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      // console.log('get ann  error');
      // getNewAccessToken()
    }
  }

  const getOneAnnData = async (id, count = true) => {
    try {
        const res = await fetch(`${API_ANN}/${id}${count ? `?count=${count}` : ''}`)
        // console.log(res.body);
      if (res.ok) {
        const result = await res.json()
        console.log(result);
        result.file =  convertFile(result.file)
        return result
      }
      if (res.status === 400 || res.status === 404) {
        alert('The request page is not available')
        router.push("/admin/announcement")
      } else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.log(error);
    }
  }

  const postCreateAnn = async (anmt,file) => {

    try {
      const res = await fetch(`${API_ANN}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(anmt)
      });
      if (res.ok) {
        const data = await res.json()
        console.log(data.id);
        const fileRes = await uploadFile(file,data.id)
        if(fileRes.ok){
          console.log("file upload successfully");
        }
        console.log("Create successfully");
      }else if(res.status === 401){
        getNewAccessToken()
        
      } 
      else throw new error("Error, create data!");
    } catch (error) {
      console.log(error);
    }
  }

  const putUpdateAnn = async (data,fileList) => {
    try {
      const res = await fetch(`${API_ANN}/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const fileRes = await uploadFile(fileList,data.id)
        console.log("Edit and upload file successfully");
      }else if(res.ok){
        console.log("Edit successfully");
      }else if(res.status === 401){
        getNewAccessToken()
      } 
      else throw new error("Error, edit data!");
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAnn = async (id) => {
    const confirmDelete = confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const res = await fetch(`${API_ANN}/${id}`, { 
          method: "DELETE",
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
          } 
        })
        if (res.ok) {
          annData.value = annData.value.filter((ann) => ann.id != id)
          alert(`Announcement has been deleted successfully.`);
          console.log('Delete succesfully');
          return annData.value
        }else if(res.status === 401){
          getNewAccessToken()
        }
        else { throw new error('Error, cannot get data') }
      } catch (error) {
        console.log(error);
        alert("An error occurred while deleting announcement.");
      }
    }

  }

  const getActiveOrCloseMode = async (mode, page = 0, cat) => {
    try {
      const res = await fetch(`${API_ANNUSER}${mode ? `?mode=${mode}` : ''}${cat ? `&category=${cat}` : ''}${page ? `&page=${page}` : ''}`)
      if (res.ok) {
        const result = await res.json()
        console.log(result);
        return result
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.log(error);
    }
  }
  // =================================================================================================================================================
  // User
  const getUserData = async () => {
    try {
      const res = await fetch(`${API_USER}`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      if (res.ok) {
        const result = await res.json()
        userData.value = result
        return userData.value
      }else if(res.status === 401){
        getNewAccessToken()
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.log(error);
    }
  }

  const getOneUserData = async (id) => {
    try {
      const res = await fetch(`${API_USER}/${id}`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      if (res.ok) {
        const result = await res.json()
        return result
      }
      if (res.status === 400 || res.status === 404) {
        alert('The request page is not available')
        // router.push("/admin/announcement")
      }else if(res.status === 401){
        getNewAccessToken()
      } 
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.log(error);
    }
  }


  const createUser = async (data) => {
    // console.log(data);
    try {
      const res = await fetch(`${API_USER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(data),
      });
      // console.log(JSON.parse(await res.text()).detail);
      if (res.status == 400) {
        // alert('Not Unique')
        throw JSON.parse(await res.text()).detail
      } else if (res.ok) {
        console.log("Create successfully");
      } else if(res.status === 401){
        getNewAccessToken()
      }
      else throw new error("Error, create data!");
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const putUpdateUser = async (data) => {
    try {
      const res = await fetch(`${API_USER}/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        throw JSON.parse(await res.text()).detail
      }
      else if (res.ok) {
        console.log('update success');
      } else if(res.status === 401){
        getNewAccessToken()
      } 
      else {
        console.error('Failed to update user:', res.status);
      }
    } catch (error) {
      
      throw error
    }
  }

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${API_USER}/${id}`, { 
        method: "DELETE",
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        } 
      })
      if (res.ok) {
        userData.value = userData.value.filter((user) => user.id != id)
        return userData.value
      }else if(res.status === 401){
        getNewAccessToken()
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.error(error)
    }
  }

  const checkPasswordMatch = async (data) => {
    try {
      const res = await fetch(`${API_USER}/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        console.log("password match!");
        return "PasswordMatch"
      } else if (res.status === 401) {
        console.log("password don't match!");
        return "PasswordNotMatch";
      } else if (res.status === 404) {
        console.log("Username not found!");
        return "UserNotFound";
      } else {
        console.log("An error occurred!");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  // =================================================================================================================================================
  // Catagory
  const getCategoriesId = async () => {
    try {
      const res = await fetch(`${API_CAT}`)
      if (res.ok) {
        const Categories = await res.json()
        return Categories

      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.log(error);
    }
  }

  // =================================================================================================================================================
  // Token

  const createNewToken = async (data) => {
    try {
      const res = await fetch(`${API_TOKEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        const token = await res.json()
        // console.log(token.value);
        localStorage.setItem("accessToken", token.token)
        localStorage.setItem("refreshToken", token.refreshToken)
      }  
      else if (res.status === 401 || res.status === 404) {
        throw res.status
      }
        else { throw new error(`Error, ${res.status}`) }
    } catch (error) {
        throw error
    }
  }

  const getNewAccessToken = async () => {
    try {
      const res = await fetch(`${API_TOKEN}`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('refreshToken')}`
        }
      })
      console.log(localStorage.getItem("accessToken"));
      if (res.ok) {
        await res.json()
          .then((token)=>{
            localStorage.setItem("accessToken", token.token)
            console.log(token.accessToken);
          })
          .then(()=>{
            console.log('get new token');
            location.reload()
          })
      }else if(res.status===401){
        console.log("Unauthorized")
        // router.push({name : 'login'})
      }
      else { throw new error('Error, cannot get token') }
    } catch (error) {
      console.error(error)
    }
  }

 // =================================================================================================================================================
  // Email 

  const subscribeEmail = async (data) => {
    try {
      const res = await fetch(`${API_OTP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      if (res.status === 400) {
         throw new Error("Bad Request: " + res.statusText);
      } else if (res.ok) {
        console.log("Send successfully");
      } else if(res.status === 401){
        console.log("Send fail");
      }
      else throw new error("Error, send email!");
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const subscribeOtp = async (data) => {
    // console.log(data);
    try {
      const res = await fetch(`${API_OTP}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        throw new Error("Bad Request: " + res.statusText);
      } else if (res.ok) {
        console.log("Send successfully");
      } else if(res.status === 401){
        console.log("Send fail");
      }
      else throw new error("Error, send otp!");
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const uploadFile = async(file,id)=>{
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file",file[i])
    }
    try {
      const res = await fetch(`${API_FILE}/upload/${id}`, {
        method: "POST",
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }, 
        body: formData
      })
      if (res.ok) {
        console.log("upload successfully");
      }
      else throw new error("Error, create data!");
    } catch (error) {
      console.log(error);
    }

  }

  const convertFile = (files)=>{

    const blobs = files.map(file => {
      try {
        const binary = atob(file.data)

        const byteNumbers = new Array(binary.length)
        for (let i = 0; i < binary.length; i++) {
          byteNumbers[i] = binary.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: file.name.split(".")[1] })
      } catch (error) {
        console.error(error);
      }
      
      // const convertedFile = new File([blob], file.name, { type: 'application/octet-stream' });
      // console.log(convertedFile);
    });
    const conFile = blobs.map((blob, index)=> new File([blob], files[index].name))
    return conFile
  }

  return { getNewAccessToken,createNewToken, userData, annData, getAnnData, getOneAnnData, postCreateAnn, putUpdateAnn, deleteAnn, getActiveOrCloseMode, getUserData, deleteUser, getCategoriesId, getOneUserData, createUser, putUpdateUser, checkPasswordMatch, subscribeEmail, subscribeOtp }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}