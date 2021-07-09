import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Antd from 'ant-design-vue';
import Button from 'ant-design-vue/lib/button';
import Layout from 'ant-design-vue/lib/layout';
import Menu from 'ant-design-vue/lib/menu';
import 'ant-design-vue/dist/antd.css';
import Version from "./components/Version.vue"
import Sctop from "./components/Sctop.vue"
import 'es6-promise/auto'

import './static/ue/ueditor.config.js'

import './static/ue/ueditor.all.min.js'

import './static/ue/lang/zh-cn/zh-cn.js'

import './static/ue/ueditor.parse.min.js'

import http from './http'




Vue.component(Button.name, Button);
Vue.component(Layout.name, Layout);
Vue.component(Menu.name, Menu);
Vue.component("Version",Version);
Vue.component("Sctop",Sctop);


Vue.config.productionTip = false
Vue.use(Antd);

axios.defaults.baseURL="";
Vue.prototype.axios=axios;
Vue.prototype.$http = http
import './permission'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
