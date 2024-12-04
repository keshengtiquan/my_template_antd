import type { RouteRecordRaw } from "vue-router"
import { h } from "vue"
import { Icon } from "@iconify/vue"

interface RouteModuleType {
  default: RouteRecordRaw[]
}

/**
 * 合并路由
 * @param routeModules
 */
export const mergeRouteModules = (routeModules: Record<string, unknown>): RouteRecordRaw[] => {
  const mergedRoutes: RouteRecordRaw[] = []
  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = (routeModule as RouteModuleType)?.default ?? []
    mergedRoutes.push(...moduleRoutes)
  }
  return mergedRoutes
}

/**
 * 路由转menu
 * @param routes
 */
export const routesToMenu = (routes: RouteRecordRaw[]) => {
  // 清理每个路由对象
  const cleanRoute = (route: any) => {
    const { meta, component, path, title, ...rest } = route // 提取 meta 和其他字段，移除 component
    const cleanedRoute = {
      ...rest,
      ...(meta || {}), // 将 meta 的内容合并到父对象
      key: path, // 替换 path 为 key
      label: meta?.title || route.title || "" // 替换 title 为 label，优先从 meta 中获取
    }
    if (cleanedRoute.icon) {
      cleanedRoute.iconStr = cleanedRoute.icon
      cleanedRoute.icon = h(Icon, { icon: cleanedRoute.icon, size: 16 })
    }

    if (route.children) {
      cleanedRoute.children = route.children.map(cleanRoute) // 递归处理 children
    }
    return cleanedRoute
  }

  // 返回处理后的路由
  return routes.map(cleanRoute)
}

/**
 * 获取路由的父级key
 * @param routes
 */
export const getSubmenuKeys = (routes: RouteRecordRaw[]) => {
  return routes.map((route) => route.path)
}

/**
 * 获取当前路由的所有父级
 * @param targetPath
 * @param treeData
 */
export const getParentKeys = (targetPath: string, treeData: RouteRecordRaw[]) => {
  let result: string[] = []

  // 递归查找
  function traverse(nodes: RouteRecordRaw[], parentPaths: string[] = []) {
    for (let node of nodes) {
      // 如果当前节点的 path 和目标路径匹配
      if (node.path === targetPath) {
        result = parentPaths // 找到匹配的路径，返回父级路径（不包含目标路径）
        return
      }
      // 如果存在子节点，递归
      if (node.children) {
        traverse(node.children, [...parentPaths, node.path])
      }
    }
  }

  traverse(treeData)
  return result
}

/**
 * 模糊搜索路由
 * @param searchTerm
 * @param tree
 */
export const searchTreeByTitle = (searchTerm: string, tree: RouteRecordRaw[]) => {
  const results: RouteRecordRaw[] = []

  // 深度优先搜索
  function dfs(node: any) {
    // 如果 `meta.title` 包含搜索关键字，加入结果
    if (searchTerm && node.title?.includes(searchTerm)) {
      results.push(node)
    }

    // 如果有子节点，递归搜索
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => dfs(child))
    }
  }

  // 遍历根节点
  tree.forEach((root) => dfs(root))

  return results
}

/**
 * 打平树形结构
 * @param tree
 * @returns
 */
export const flatRouteTree = (tree: RouteRecordRaw[]) => {
  const results: RouteRecordRaw[] = []
  function dfs(node: RouteRecordRaw) {
    results.push(node)
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => dfs(child))
    }
  }
  // 遍历根节点
  tree.forEach((root) => dfs(root))
  return results
}
