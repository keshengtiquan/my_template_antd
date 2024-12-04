import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const routes: RouteRecordRaw[] = [
  {
    component: Layout,
    meta: {
      icon: "lucide:layout-dashboard",
      title: "测试"
    },
    name: "Test",
    path: "/test",
    redirect: "/test1",
    children: [
      {
        name: "Test1",
        path: "/test1",
        component: () => import("@/view/test/test1.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试1"
        }
      },
      {
        name: "Test2",
        path: "/test2",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试2"
        }
      },
      {
        name: "Test3",
        path: "/test3",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试3"
        }
      },
      {
        name: "Test4",
        path: "/test4",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试4"
        }
      },
      {
        name: "Test5",
        path: "/test5",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试5"
        }
      },
      {
        name: "Test6",
        path: "/test6",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试6"
        }
      },
      {
        name: "Test7",
        path: "/test7",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试7"
        }
      },
      {
        name: "Test8",
        path: "/test8",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试8"
        }
      },
      {
        name: "Test9",
        path: "/test9",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试9"
        }
      },
      {
        name: "Test10",
        path: "/test10",
        component: () => import("@/view/test/test2.vue"),
        meta: {
          affixTab: false,
          icon: "lucide:layout-dashboard",
          title: "测试10"
        }
      }
    ]
  }
]

export default routes
