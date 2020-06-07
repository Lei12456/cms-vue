import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入自定义样式
import './style/commen.css'
//导入首页
import App from './App.vue';

//导入登录页面
import Login from './Login.vue';

import router from './router'
import store from './store'
//导入状态机的辅助函数
import {mapState,mapActions,mapMutations} from 'vuex'

Vue.use(ElementUI);

let vm = new Vue({
  el: '#app',
  computed:{
    ...mapState('login',['token'])
  },
  created(){
    this.initToken()
  },
  methods: {
    ...mapMutations('login',['initToken'])
  },
  
  router,
  store,

  //渲染
  render:function(createElement){
    let page = Login;
    if(this.token){
      page = App
    }
    return createElement(page)
  }
});