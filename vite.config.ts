import { ConfigEnv, loadEnv, UserConfigExport } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import CreatePlugins from "./src/config/plugins/index.ts"
// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH, VITE_PORT } = viteEnv
  console.log(VITE_PORT)
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      port: Number(VITE_PORT),
      proxy: {
        // [VITE_BASE_PREFIX]: {
        //   target: "http://127.0.0.1:48080",
        //   ws: false,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(new RegExp(`^${VITE_BASE_PREFIX}`), "")
        // }
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      }),
      ...CreatePlugins(viteEnv)
    ],
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"]
          }
        }
      }
    }
  }
}
