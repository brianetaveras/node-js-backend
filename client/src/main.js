import Vue from 'vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import VueChatScroll from 'vue-chat-scroll'
import Animate from 'animate.css'
Vue.use(Animate)
Vue.use(VueChatScroll)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
