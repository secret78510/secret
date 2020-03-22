// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay' //全域啟用元件需要用Vue.components啟用
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filter/currency'
import VeeValidate from 'vee-validate'//驗證用
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n';
import dateFilter from './filter/date';


Vue.use(VueAxios, axios)
Vue.filter('currency',currencyFilter)
Vue.filter('date',dateFilter)
Vue.component('Loading',Loading);

Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  i18n,
})



//導航守衛 用來阻擋未登入進去主頁
router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`
    //這裡非router 要改用axios
    axios.post(api).then(response => {
      if (response.data.success) {
        next()
      }else {
        next({
          path:'/login'
        });
      }
    });
  } else {
    next() //確保一定能調用
  }

})
