import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
// import {setupIcons} from "@/components/iconify-icon/index.ts"
import "./styles/index.css"
import "@/router/permission"

const app = createApp(App)
// setupIcons()
app.use(router)
app.use(store)
app.mount("#app")
