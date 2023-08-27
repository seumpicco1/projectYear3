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
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'c',
  routes: [
    {
      path: "/admin/user",
      name: "adminUser",
      component: adminUser,
    },
    {
      path: "/admin/announcement",
      name: "adminAnn",
      component: adminAnn,
    },
    {
      path: "/admin/announcement/:annId",
      name: "adminAnnDetail",
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
  ],
});

export default router;
