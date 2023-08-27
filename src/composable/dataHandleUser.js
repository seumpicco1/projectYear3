// import { useDataStore } from "../composable/dataHandlePinia";
const API_USER =  import.meta.env.VITE_ROOT_API+"/api/users"

// const dataUser = useDataStore()

const getUser = async () => {
    try {
      // default method is get
      const res = await fetch(`${API_USER}`)
      // if(res.status === 201) จะเขียน หรือ ok = 200 ก็ได้
  
      if (res.ok) {
        const showUser = res.json()
        return showUser
  
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      //ดัก try catch หากการอะไรก่อนที่จะได้ check if ex. machine error?  
      console.log(error);
    }
  
    //return await res.json()   //await เพราะเป็นบรรทัดต่อเนื่องกัน
  
  
  }

  const getOneUserData = async (id) => {
    try {
      const res = await fetch(`${API_USER}/${id}`)
      if (res.ok ) {
        const result = await res.json()
        return result
      }
      if(res.status === 400 || res.status === 404){
        alert('The request page is not available')
        // router.push("/admin/announcement")
      }else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.log(error);
    }
  }


  const createUser = async (data) => {
    // console.log(data);
  try {
    const res = await fetch(`${API_USER}` ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
    console.log("Create successfully");
    } else throw new error("Error, create data!");
  } catch (error) {
    console.log(error);
  }
}

const putUpdateUser = async (data) => {
  try {
    const response = await fetch(`${API_USER}/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const updatedData = await response.json();
    data.value = updatedData;
  } catch (error) {
    console.log(error);
  }
}


// const deleteUser = async (id) => {

//   try {
//     // default method is get

//     const res = await fetch(`${API_USER}/${id}`, 
//       {
//         method: "DELETE"
//       }
//     )
//     // if(res.status === 201) จะเขียน หรือ ok = 200 ก็ได้

//     if (res.ok  ) {
//       dataUser.userData = dataUser.userData.filter((user)=>user.id!=id)
//       return console.log('Delete succesfully'); 
//     }
//     else { throw new error('Error, cannot get data') }
//   } catch (error) {
//     //ดัก try catch หากการอะไรก่อนที่จะได้ check if ex. machine error?  
//     console.log(error);
//   }

//   //return await res.json()   //await เพราะเป็นบรรทัดต่อเนื่องกัน


// }



  //return await res.json()   //await เพราะเป็นบรรทัดต่อเนื่องกัน










  export {getUser,createUser,getOneUserData,putUpdateUser}
