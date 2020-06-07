export default {
    namespaced:true,
    state:{
        categories:[],
        categories_parent:[], 
    },
    getters:{

    },
    //突变
    mutations:{
        refreshCategory(state,category){
            state.categories = category
            state.categories_parent = category.filter(function(item){
                return !item.parent;
            })
        }

    },
    actions:{
        //查询所有栏目
        async findAllCategory(context){
            let res  = await $.get('http://39.108.158.38:8099/manager/category/findAllCategory',{})
            //提交突变
            context.commit('refreshCategory',res.data)
        }
    }
}