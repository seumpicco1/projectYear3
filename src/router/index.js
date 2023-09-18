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
  ],
});

export default router;
