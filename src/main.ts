import App from './App.vue'
import { createApp } from 'vue'

import store from './store/store'

const standart_width = 300
const standart_height = 100
export const windows_count = 5

export const setWindow = (obj: any) => {
    obj.w = standart_width
    obj.h = standart_height
    obj.x = window.innerWidth / 2 - standart_width / 2
    obj.y = window.innerHeight / 2 - standart_height / 2
    return obj
}


export const app = createApp(App)
app.use(store)
import VueNativeSock from "vue-native-websocket-vue3";
app.use(VueNativeSock, 'wss://ws.blockchain.info/inv', {})


app.mount("#app")

