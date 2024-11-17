import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const routes: RouteRecordRaw[] = [
  {
    component: Layout,
    meta: {
      icon: "",
      order: 9999,
      title: "工作台"
    },
    name: "Dashboard",
    path: "/",
    children: [
      {
        name: "Workspace",
        path: "/workspace",
        component: () => import("@/view/dashboard/dashboard.vue"),
        meta: {
          affixTab: true,
          icon: "",
          title: "工作台"
        }
      }
    ]
  }
]

export default routes