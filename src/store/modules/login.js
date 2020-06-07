export default {
    namespaced:true,
    state:{
        token:'',
        userInfo:''
    },
    getters:{

    },
    //突变
    mutations:{
        //登录的突变
        refreshToken(state,token){
            state.token = token
        },
        //用于自动跳转
        initToken(state){
            let token = localStorage.getItem('token')
            this.token = token;
        },
        // 用户信息的突变
        refreshInfo(state,userInfo){
            state.userInfo = userInfo
        }
    },
    actions:{
        async login(context,params){
            let res = await $.ajax({
                url: 'http://39.108.158.38:8099/manager/user/login',
                method: 'post',
                data: JSON.stringify(params),
                contentType: 'application/json',
            })
            //将token设置到浏览器
            localStorage.setItem('token', res.data.token);

            context.commit('refreshToken',res.data.token);

            // 调用info方法
            context.dispatch('info')
        },
        //根据token获取用户信息
        async info(context){
            let token = localStorage.getItem('token');
            let res = await  $.ajax({
                url: 'http://39.108.158.38:8099/manager/user/info',
                method: 'get',
                data: {token},
            })
            //将用户信息放到浏览器中
            localStorage.setItem('userInfo',JSON.stringify(res.data));
            context.commit('refreshInfo',res.data)
        }
    }
}