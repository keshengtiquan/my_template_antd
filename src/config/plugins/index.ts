import CreateDevTools from "./devTools.ts"

export default (viteEnv: any): [] => {
  const vitePlugins: any = []
  vitePlugins.push(CreateDevTools(viteEnv))
  return vitePlugins
}
