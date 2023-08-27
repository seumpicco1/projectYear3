const API_ANN =  import.meta.env.VITE_ROOT_API+"/api/announcements"
const API_CAT =  import.meta.env.VITE_ROOT_API+"/api/categories"


const getCategoriesId = async () => {
    try {
      // default method is get
      const res = await fetch(`${API_CAT}`)
      // if(res.status === 201) จะเขียน หรือ ok = 200 ก็ได้
  
      if (res.ok) {
        const Categories = res.json()
        return Categories
  
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      //ดัก try catch หากการอะไรก่อนที่จะได้ check if ex. machine error?  
      console.log(error);
    }
    //return await res.json()   //await เพราะเป็นบรรทัดต่อเนื่องกัน
  }

  const postCreate = async (data) => {
    // console.log(data);
  try {
    const res = await fetch(`${API_ANN}` ,{
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

const getData = async () => {
    try {
      // default method is get
      const res = await fetch(`${API_ANN}`)
      // if(res.status === 201) จะเขียน หรือ ok = 200 ก็ได้
  
      if (res.ok) {
        const Categories = res.json()
        return Categories
  
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      //ดัก try catch หากการอะไรก่อนที่จะได้ check if ex. machine error?  
      console.log(error);
    }
  
    //return await res.json()   //await เพราะเป็นบรรทัดต่อเนื่องกัน
  
  
  }

  const getDelete = async (id) => {
    
    try {
      // default method is get

      const res = await fetch(`${API_ANN}/${id}`, 
        {
          method: "DELETE"
        }
      )
      // if(res.status === 201) จะเขียน หรือ ok = 200 ก็ได้
  
      if (res.ok  ) {
        return console.log('Delete succesfully'); 
      }
      else { throw new error('Error, cannot get data') }
    } catch (error) {
      //ดัก try catch หากการอะไรก่อนที่จะได้ check if ex. machine error?  
      console.log(error);
    }
  
    //return await res.json()   //await เพราะเป็นบรรทัดต่อเนื่องกัน
  

  }

  const getOne = async (id,count = true) => {
    try {
      const res = await fetch(`${API_ANN}/${id}${count?`?count=${count}`:''}`)
      if (res.ok ) {
        const Categoties = res.json()
        return Categoties
      }
      if(res.status === 400 || res.status === 404){
        alert('The request page is not available')
        const Categoties = res.json()
        router.push("/admin/announcement")
        return Categoties
      }else { throw new error('Error, cannot get data') }
    } catch (error) {
      console.log(error);
    }
  }

  const putUpdate = async (data) => {
    try {
      const response = await fetch(`${API_ANN}/${data.id}`, {
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
  
export {getCategoriesId,postCreate,getData,getDelete,getOne,putUpdate}