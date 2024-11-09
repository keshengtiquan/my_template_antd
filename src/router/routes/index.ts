import type { RouteRecordRaw } from "vue-router";
import { coreRoutes } from "./core";

// const dynamicRouteFiles = import.meta.glob("./modules/**/*.ts", {
//   eager: true,
// });

// 有需要可以自行打开注释，并创建文件夹
// const externalRouteFiles = import.meta.glob('./external/**/*.ts', { eager: true });
// const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true });

/** 路由列表，由基本路由+静态路由组成 */
const routes: RouteRecordRaw[] = [...coreRoutes];
export { routes };
