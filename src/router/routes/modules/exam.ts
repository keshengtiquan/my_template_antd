import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const routes: RouteRecordRaw[] = [
  {
    component: Layout,
    meta: {
      icon: "lucide:layout-dashboard",
      title: "考试管理"
    },
    name: "Exam",
    path: "/exam",
    redirect: "/topic",
    children: [
      {
        name: "Topic",
        path: "/topic",
        component: () => import("@/view/exam/topic/index.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:a-arrow-up",
          title: "题目列表"
        }
      }
    ]
  }
]

export default routes
