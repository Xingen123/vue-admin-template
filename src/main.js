import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n
import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import request from "@/utils/request";
import * as filters from "@/utils/filter";

import "@/icons"; // icon
import "@/permission"; // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.prototype.req = request;

Vue.config.productionTip = false;

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
