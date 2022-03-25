import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import VueMask from 'v-mask'

import App from '@/App'

import '@/config/bootstrap'
import '@/config/msgs'
import '@/config/axios'
import '@/config/mq'

import store from '@/config/store'
import router from '@/config/router'

import FlashMessage from '@smartweb/vue-flash-message';

Vue.use(FlashMessage);
Vue.config.productionTip = false

Vue.use(VueMask)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')