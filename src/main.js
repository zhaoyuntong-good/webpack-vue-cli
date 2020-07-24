import Vue from 'vue';
import App from '@/App.vue';
import {router} from '@/router';
import store from '@/store'
import '@/utils/watchRouter.js';
import '@/assets/css/reset.css';
import '@/assets/css/public.css';
import {
	openLoading,
  closeLoading,
  successMsg,
  errorMsg,
  warningMsg
} from '@/elementui';
Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')