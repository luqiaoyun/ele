// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from "vue-resource";
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false;
/* eslint-disable no-new */
import Goods from './components/goods/goods.vue';
import Ratings from './components/ratings/ratings.vue';
import Seller from './components/seller/seller.vue';
const routers = [{path:'/goods',component:Goods},
				{path:'/ratings',component:Ratings},
				{path:'/seller',component:Seller},
				{path:'/*',component:Goods}
			];
const router =new VueRouter({
	routes:routers
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
