import Vue from "vue"

import ElementUI from "element-ui"
import "./assets/styles/theme.scss"
Vue.use(ElementUI)

import VCharts from "v-charts"
Vue.use(VCharts)

import App from "./App"
import router from "./router"
import store from "./store"
import db from "./datastore"

if (!process.env.IS_WEB) Vue.use(require("vue-electron"))
Vue.config.productionTip = false
Vue.prototype.$db = db

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: "<App/>",
}).$mount("#app")
