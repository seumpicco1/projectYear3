import { createRouter, createWebHistory } from "vue-router"
import adminAnn from "../component/adminAnn.vue"
import adminAnnDetail from "../component/adminAnnDetail.vue"
import adminAnnCreate from "../component/adminAnnCreate.vue"
import adminAnnEdit from "../component/adminAnnEdit.vue"
import userAnn from "../component/userAnn.vue"
import userAnnDetail from "../component/userAnnDetail.vue"
import adminUser from "../component/adminUser.vue"
import adminUserCreate from "../component/adminUserCreate.vue"
import adminUserEdit from "../component/adminUserEdit.vue"
import adminUserMatch from "../component/adminUserMatch.vue"
import login from "../component/login.vue"
import jwt_decode from "jwt-decode";

const API_TOKEN = import.meta.env.VITE_ROOT_API + "/api/token"

const token = localStorage.getItem("accessToken")
const refreshToken = localStorage.getItem("refreshToken")
const currentEdit = localStorage.getItem("currentEdit")

const jwtDecoded = () => {
  if (token === null) return false
  else return jwt_decode(token)
}

async function isAuthenticated() {
  console.log(localStorage.getItem("accessToken"))
  const res = await fetch(`${API_TOKEN}/checkToken`,{
    headers:{
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if(res.ok){
    console.log(true);
    return true
  } else {
    console.log(false);
    return false
  }
}

const notOwner = () => {
  if(jwtDecoded().sub !== currentEdit){
    localStorage.removeItem("currentEdit")
    console.log("Not Owner!")
    return true
  } else {
    localStorage.removeItem("currentEdit")
    console.log("Owner!")
    return false
  }
}

const router = createRouter({ 
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'c',
  routes: [
    
    {
      path: "/admin/announcement",
      name: "adminAnn",
      component: adminAnn
    },
    {
      path: "/admin/announcement/:annId",
      name: "adminAnnDetail",
      component: adminAnnDetail
    },
    {
      path: "/admin/announcement/add",
      name: "adminAnnCreate",
      component: adminAnnCreate
    },
    {
      path: "/admin/announcement/:annId/edit",
      name: "adminAnnEdit",
      component: adminAnnEdit
    },
    {
      path: "/announcement",
      name: "userAnn",
      component: userAnn
    },
    {
      path: "/announcement/:annId",
      name: "userAnnDetail",
      component: userAnnDetail
    },
    {
      path: "/admin/user",
      name: "adminUser",
      component: adminUser
    },
    {
      path: "/admin/user/add",
      name: "adminUserCreate",
      component: adminUserCreate
    },
    {
      path: "/admin/user/:userId/edit",
      name: "adminUserEdit",
      component: adminUserEdit
    },
    {
      path: "/admin/user/match",
      name: "adminUserMatch",
      component: adminUserMatch
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
  ],
});

console.log(jwtDecoded())
console.log(localStorage.getItem("accessToken"))
console.log(localStorage.getItem("currentEdit"))

router.beforeEach(async (to, from, next) => {
  if (!await isAuthenticated() && to.name !== 'login' && to.name !== 'userAnn' && to.name !== 'userAnnDetail') {
    next('/login')
  } else if (await isAuthenticated() && to.name === 'login') {
    console.log(isAuthenticated());
    next('/announcement')
    alert("You're already login!")
  } else if (jwtDecoded().role !== 'admin' && (to.name === 'adminUser' || to.name === 'adminUserCreate' || to.name === 'adminUserEdit' || to.name === 'adminUserMatch')) {
    next('/announcement')
    alert("You don't have permission!")
  // } else if (await isAuthenticated() && jwtDecoded().role !== 'admin' && notOwner() && to.name === 'adminAnnEdit') {
  //   next('/announcement')
  //   alert("You don't have permission to edit announcement that you are not the owner of!")
  } else {
    next()
  }
})

export default router;
