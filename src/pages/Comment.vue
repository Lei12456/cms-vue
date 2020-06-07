<template>
<!-- 评论管理 -->
    <div class="Comment">
        <!-- 遍历表格内容 -->
        <el-table
                :data="comments.list"
                stripe
                style="width: 100%">
            <el-table-column
                prop="id" 
                label="编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="article.title"
                label="文章标题"
                width="180">
            </el-table-column>
            <!-- <el-table-column
                prop="article.category.name"
                label="所属栏目">
            </el-table-column> -->
            <el-table-column
                prop="customer.nickname"
                label="作者">
            </el-table-column>
            <el-table-column
                prop="article.publishtime"
                label="发布时间">
            </el-table-column>
            <el-table-column
                prop="article.readtimes"
                label="阅读次数">
            </el-table-column>
            <el-table-column
                label="评论状态"> 
                <template v-slot="">
                    <el-button type="success" icon="el-icon-check" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            background
            :current-page="comments.page+1"
            :page-size="comments.pageSize"
            layout="prev, pager, next"
            @current-change ="changePage"
            :total="comments.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name:'Comment',
        created(){
            this.loadComment()
        },
        data(){
            return {
                params:{
                    page:0,
                    pageSize:5
                },
                comments:[]
            }
        },
        watch: {
            //分页管理是设置监听
            params:{
                handler(now){
                    this.loadComment()
                },
                deep:true
            }
        },
        methods: {
            //加载所有评论
            loadComment(){
                 $.ajax({
                    url: 'http://39.108.158.38:8099/manager/comment/findComment',
                    method: 'get',
                    data: this.params,
                    success: (res) => {
                        // res.data.list.forEach(function(item){
                        //     //查询所有栏目
                        //     if(item.article){ 
                        //         myAjax('/manager/category/findAllCategory','get',{},function(res){
                        //             item.categoryName = res.data.filter(function(it){
                        //             return it.id == item.article.categoryId;
                        //             })[0].name;
                        //         })
                        //         newData.push(item);
                        //     }
                        // })
                        this.comments = res.data;
                    }
                })
            },
            //分页处理
            changePage(page){
                this.params.page = page - 1;
            },
        },
    }
</script>