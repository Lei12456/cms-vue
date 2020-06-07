<template>
  <div class="container">
    <div class="header">
      <span>看点资讯</span>
      <span class="btn_logout">
          <el-button tyoe="primary" @click="logout">退出</el-button>
      </span>
    </div>
    <div class="left">
        <el-menu 
          router 
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="article">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="category">
            <i class="el-icon-menu"></i>
            <span slot="title">栏目管理</span>
          </el-menu-item>
          <el-menu-item index="comment">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="warpper">
          <!-- <keep-alive>
            <component :is="currentPage"></component>
          </keep-alive> -->
          <!-- 路由出口 -->
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>

// import Article from './pages/Article.vue'
// import Category from './pages/Category.vue'
// import Comment from './pages/Comment.vue'
// import User from './pages/User.vue'

export default {
  name: 'App',
  // components: {
  //   Article,
  //   Category,
  //   User,
  //   Comment
  // },
  data(){
    return{
      // currentPage:'Article'
    }
  },
  methods:{
    // 切换右侧页面
    // selectPage(index){
    //   this.currentPage = index;
    // },
    //退出登录
    logout() {
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/user/logout',
                method: 'post',
                data: {},
                success: (res) => {
                    // 清空浏览器的token
                    localStorage.clear();
                    // 刷新浏览器
                    location.reload();
                }
            })
        },
  },
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  /* 头部样式 */
  .container .header{
    height: 50px;
    background-color: #545c64;
    line-height: 50px;
    color:#fff;
    font-size: 20px;
    font-family: '楷体';
    padding:0 1em;
  }
  .btn_logout {
    float:right;
  }
  /* 左部样式 */
  .container{
    height:100%;
    overflow: hidden;
  }
  .container .left{
    width: 200px;
    height: 100%;
    background-color: #545c64;
    float: left;
  }
  /* 右部样式 */
  .container .warpper {
    height:600px;
    margin: 1em;
    padding: 1em;
    border-radius: 5px;
    overflow:auto;
  }
  .container .right{
    margin-left: 200px;
  }
</style>
