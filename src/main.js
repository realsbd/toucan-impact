/*
 * Main file
 */

// Vue, Vue Router, App and Vuex store
import Vue from 'vue'
import router from './router/starter'
// You can use the following starter router instead of the default one as a clean starting point
// import router from './router/starter'
import App from './App.vue'
import store from './store'

// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue'

// Import axios
import axios from "axios"

// Custom components
import BaseLayoutModifier from '@/components/BaseLayoutModifier'
import BaseBlock from '@/components/BaseBlock'
import BaseBackground from '@/components/BaseBackground'
import BasePageHeading from '@/components/BasePageHeading'
import BaseNavigation from '@/components/BaseNavigation'

// Custom directives
import clickRipple from '@/directives/clickRipple'
import toggleClass from '@/directives/toggleClass'

// Register global plugins
Vue.use(BootstrapVue)

// Register global components
Vue.component(BaseLayoutModifier.name, BaseLayoutModifier)
Vue.component(BaseBlock.name, BaseBlock)
Vue.component(BaseBackground.name, BaseBackground)
Vue.component(BasePageHeading.name, BasePageHeading)
Vue.component(BaseNavigation.name, BaseNavigation)

// Register global directives
Vue.directive('click-ripple', clickRipple)
Vue.directive('toggle-class', toggleClass)

// Disable tip shown in dev console when in development mode
Vue.config.productionTip = false

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost"

// Fix token expiry
axios.interceptors.response.use(undefined, function (err) {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      this.$store.dispatch('logout')
    }
    throw err;
});

// Auto-authentication
const token = localStorage.getItem('token')

if(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

axios.interceptors.response.use(null, error => {
  if (error.response.status == 401) {
  store.commit("logout");
  router.push("/auth/signin");
  }

  return Promise.reject(error);
});

// Craft new application
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
