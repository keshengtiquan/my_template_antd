import viteVueDevTools from "vite-plugin-vue-devtools"

export default (env: any) => {
  const { VITE_VUE_DEV_TOOLS } = env

  return VITE_VUE_DEV_TOOLS === "true" ? viteVueDevTools() : null
}
