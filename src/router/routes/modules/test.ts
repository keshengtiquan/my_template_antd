import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const routes: RouteRecordRaw[] = [
    {
        component: Layout,
        meta: {
            icon: "",
            title: "测试"
        },
        name: "Test",
        path: "/test",
        children: [
            {
                name: "Test1",
                path: "/test1",
                component: () => import("@/view/dashboard/dashboard.vue"),
                meta: {
                    affixTab: false,
                    icon: "",
                    title: "测试1"
                }
            },
            {
                name: "Test2",
                path: "/test2",
                component: () => import("@/view/dashboard/dashboard.vue"),
                meta: {
                    affixTab: true,
                    icon: "",
                    title: "测试2"
                }
            }
        ]
    }
]

export default routes
