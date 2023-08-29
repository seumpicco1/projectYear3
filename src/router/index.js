<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import adminAnn from "../component/adminAnn.vue"
import adminAnnDetail from "../component/adminAnnDetail.vue"
import CreatePage from "../component/CreatePage.vue"
import EditPage from "../component/EditPage.vue"
import User from "../component/User.vue"
import UserDetail from "../component/UserDetail.vue"
import adminUser from "../component/AdminUser.vue"
import userAdd from "../component/userAdd.vue"
import UserEdit from "../component/UserEdit.vue"
=======
import { createRouter, createWebHistory } from "vue-router"
import adminAnn from "../component/adminAnn.vue"
import adminAnnDetail from "../component/adminAnnDetail.vue"
import adminAnnCreate from "../component/adminAnnCreate.vue"
import adminAnnEdit from "../component/adminAnnEdit.vue"
import userAnn from "../component/userAnn.vue"
import userAnnDetail from "../component/userAnnDetail.vue"
import adminUser from "../component/AdminUser.vue"
import adminUserCreate from "../component/adminUserCreate.vue"
import adminUserEdit from "../component/adminUserEdit.vue"

>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'c',
  routes: [
    {
      path: "/admin/user",
      name: "adminUser",
<<<<<<< HEAD
      component: adminUser,
=======
      component: adminUser
>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)
    },
    {
      path: "/admin/announcement",
      name: "adminAnn",
<<<<<<< HEAD
      component: adminAnn,
=======
      component: adminAnn
>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)
    },
    {
      path: "/admin/announcement/:annId",
      name: "adminAnnDetail",
<<<<<<< HEAD
      component: adminAnnDetail,
    },
    {
      path: "/admin/announcement/add",
      name: "create",
      component: CreatePage,
    },
    {
      path: "/admin/announcement/:annId/edit",
      name: "edit",
      component: EditPage,
    },
    {
      path: "/admin/users/:uId/edit",
      name: "UserEdit",
      component: UserEdit,
    },
    {
      path: "/announcement",
      name: "user",
      component: User,
    },
    {
      path: "/announcement/:userId",
      name: "userdetail",
      component: UserDetail,
    },
    {
      path: "/announcement/user/add",
      name: "userAdd",
      component: userAdd,
    }
=======
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
      path: "/admin/user/add",
      name: "adminUserCreate",
      component: adminUserCreate
    },
    {
      path: "/admin/user/:userId/edit",
      name: "adminUserEdit",
      component: adminUserEdit
    },
>>>>>>> 5e3227d (Fix Router/Component Name/Class/Handler)
  ],
});

export default router;
