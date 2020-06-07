<template>
    <div class="login">
        <h3>看点资讯精选</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button tyoe="primary" @click="loginHandler">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
    export default {
        data(){
            return {
                form:{}
            }
        },
        created() {
           
        },
        methods: {
            ...mapActions('login',['login']),
            loginHandler(){
                this.login(this.form);
            }
        },
    }
</script>
<style>
.login{
    width: 400px;
    margin: 0 auto;
}
.login h3 {
    text-align: center;
}
</style>