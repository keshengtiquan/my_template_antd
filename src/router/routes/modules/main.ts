import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const routes: RouteRecordRaw[] = [
  {
    component: Layout,
    meta: {
      icon: "lucide:layout-dashboard",
      title: "概览"
    },
    name: "Dashboard",
    path: "/main",
    redirect: "/analyze",
    children: [
      {
        name: "Analyze",
        path: "/analyze",
        component: () => import("@/view/dashboard/dashboard.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:a-arrow-up",
          title: "分析页"
        }
      },
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
