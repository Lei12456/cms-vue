<template>
<!-- 文章管理模块 -->
    <div class="article">
        <!-- 发布文章 -->
        <el-button type="primary" round @click="showArticleVisible">发布文章</el-button>
        <!-- 日期选择器 -->
        <div class="block">
            <el-date-picker
                v-model="regTime.beginTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-date-picker
                v-model="regTime.endTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
            <!-- 关键字搜索 -->
            <el-input
                style="width:250px;"
                placeholder="请输入关键字搜索"
                v-model="keywords"
                clearable>
            </el-input>
        </div>
        <!-- 遍历表格数据 -->
        <el-table
                :data="articles.list"
                stripe
                @cell-click="showBigImg"
                style="width: 100%">
            <el-table-column
                prop="title"
                label="文章标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="content"
                label="文章内容"
                width="500">
            </el-table-column>
            <el-table-column
                :formatter="dateFormate"
                prop="publishtime"
                label="发布时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="category.name"
                label="所属栏目">
            </el-table-column>
            <!-- 文章封面 -->
            <el-table-column
                prop="source"
                label="文章封面"> 
                <!-- 使用插槽 -->
                <template slot-scope="scope" >
                    <img style="height: 100px;width: 120px;" :src="scope.row.source" alt="">
                </template>
            </el-table-column>
            <!-- 开关 -->
            <el-table-column
                prop="status"
                label="状态">
                <!-- 使用插槽 -->
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        :active-value="1"
                        :nactive-value="0"
                        @change="changeArticleStatus(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"> 
                <template slot-scope="scope">
                    <span style="font-size: 25px;">
                        <i class="el-icon-edit-outline" @click="editArticle(scope.row)"></i>
                    </span>
                    <span style="font-size: 25px;">
                        <i class="el-icon-delete" @click="deleteArticle(scope.row)"></i>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 发布文章模态框 -->
        <el-dialog title="发布文章" :visible.sync="articleVisible">
            <el-form :model="article_form">
                <el-form-item label="文章标题" :label-width="formLabelWidth">
                    <el-input v-model="article_form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="列表样式" :label-width="formLabelWidth">
                    <el-radio-group v-model="article_form.liststyle">
                        <el-radio label="样式一"></el-radio>
                        <el-radio label="样式二"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文章封面" :label-width="formLabelWidth">
                    <el-upload
                        action="http://134.175.100.63:5588/file/upload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="successHandler">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="所属栏目" :label-width="formLabelWidth">
                    <el-select v-model="article_form.categoryId" placeholder="请选择栏目">
                        <el-option :value="item.id"  v-for="item in categories" :key="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章正文" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="article_form.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="articleVisible = false">取 消</el-button>
                <el-button type="primary"  @click="saveArticle">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
            background
            :current-page="articles.page+1"
            :page-size="articles.pageSize"
            layout="prev, pager, next"
            @current-change ="changePage"
            :total="articles.total">
        </el-pagination>
        <!-- 查看大图模态框 -->
        <el-dialog
            title="大图显示"
            :visible.sync="picture_visible">
            <img  width="100%" :src="imgUrl" alt="">
            <span slot="footer" class="dialog-footer">
                <el-button @click="picture_visible = false">取 消</el-button>
                <el-button type="primary" @click="picture_visible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import {mapState,mapActions} from 'vuex'
export default {
    name:'Article',
    data(){
        return {
            formLabelWidth:'120px',
            articles:[],
            categories:[],
            params:{
                    page:0,
                    pageSize:5
            },
            picture_visible: false,
            imgUrl:'',
            articleVisible:false,
            article_form:{},
            formLabelWidth:'120px',
            dialogVisible:false,
            dialogImageUrl:'',
            regTime:{},
            keywords:''
        }   
    },
    // 页面加载之后
    created() {
        let token = localStorage.getItem('token');
        if (token) {
            //查询用户信息
            this.findMsg(token);
            // // 查询所有文章
            this.loadArticle();
            // 查询所有栏目
            this.findAllCategory();
        }
    },
    //监听
    watch: {
        params:{
            handler(){
                this.loadArticle();
            },
            deep:true
        },
        // 监听日期搜索
        regTime:{
            handler(now){
                $.ajax({
                    url: 'http://39.108.158.38:8099/manager/article/findArticle',
                    method: 'get',
                    data: {page:0,pageSize:5,beginTime:now.beginTime,endTime:now.endTime},
                    success: (res) => {
                        this.articles = res.data;
                    }
                })
            },
            deep:true
        },
        //监听关键字搜索
        keywords:function(now){
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/article/findArticle',
                method: 'get',
                data: {page:0,pageSize:5,keywords:now},
                success: (res) => {
                    this.articles = res.data;
                }
                
            })
        }
    },
    methods: {
        //根据token查询用户信息
        findMsg(token) {
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/user/info',
                method: 'get',
                data: { token },
                success: (res) => {
                    this.username = res.data.username
                }
            })
        },
        //加载所有文章
        loadArticle() {
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/article/findArticle',
                method: 'get',
                data: this.params,
                success: (res) => {
                    this.articles = res.data;
                    res.data.list.map((item)=>{
                        if(item.status == '审核通过'){
                            return item.status = 1;
                        }else if(item.status == '未通过'){
                            return item.status = 0;
                        }
                    })
                }
            })
        },
         
        //日期事件处理函数
        dateFormate(row,column){
            return moment(row[column.property]).format('YYYY-MM-DD hh:mm:ss');
        },
        //显示大图
        showBigImg(row,column){
            if(column.label == '文章封面'){
                this.picture_visible = true;
                //将当前点击的图片地址放到模态矿中
                this.imgUrl = row.source;
            }
        },
        //分页函数
        changePage(page){
            this.params.page = page - 1;
        },
        //改变文章状态(审核文章)
        changeArticleStatus(item){
            if(item.status == 1){
                var obj = {
                    id:item.id,
                    status:'审核通过'
                }
            } else {
                var obj = {
                    id:item.id,
                    status:'审核不通过'
                }
            }
            // 调用接口
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/article/checkArticle',
                method: 'get',
                data: obj,
                success: (res) => {
                    const h = this.$createElement;
                    if(res.status == 500){
                        this.$notify({
                            title: '警告',
                            message: h('i', { style: 'color: teal'}, res.message)
                        });
                    } else {
                        this.$notify({
                            title: '成功',
                            message: h('i', { style: 'color: teal'}, res.message)
                        });
                    }
                    // 刷新数据
                    this.loadArticle();
                }
            })

        },
        //显示发布文章模态框
        showArticleVisible(){
            this.articleVisible = true;
        },
        //图片上传
        successHandler(res){
            this.article_form.source = ' http://134.175.100.63:8686/group1/' + res.data.id;
        },
        //显示上传图片大图
        handlePictureCardPreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //保存文章函数
        saveArticle(){
            //关闭模态框
            this.articleVisible = false;
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/article/saveOrUpdateArticle',
                method: 'post',
                data: this.article_form,
                success: (res) => {
                    if(res.status == 200){
                        this.$message({
                            showClose: true,
                            message: '发布成功',
                            type: 'success'
                          });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '发布失败',
                            type: 'error'
                        });
                    }
                    // 刷新数据
                    this.loadArticle();
                }
            })
        },
        //删除文章函数
        deleteArticle(row){
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/article/deleteArticleById',
                method: 'get',
                data: {id:row.id},
                success: (res) => {
                    if(res.status == 200){
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                          });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                    // 刷新数据
                    this.loadArticle();
                }
            })
        },
        // 修改文章
        editArticle(row){
            //显示新增模态框
            this.articleVisible = true;
            //通过id查询出文章信息
            $.ajax({
                url: 'http://39.108.158.38:8099/manager/article/findArticleById',
                method: 'get',
                data: {id:row.id},
                success: (res) => {
                    console.log(res.data)
                    this.article_form  = res.data;
                    this.article_form.categoryId = res.data.category.id;
                }
            })
        },
    }
}
</script>
<style>
    .block {
         margin-left: 300px;
    }
</style>