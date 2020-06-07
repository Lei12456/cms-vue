<template>
    <div class="category">
        <el-button type="primary" @click="showAdd">新增</el-button>
        <el-dialog title="新增栏目" :visible.sync="categoryVisible">
            <el-form :model="category_form">
                <el-form-item label="栏目名称" :label-width="formLabelWidth">
                    <el-input v-model="category_form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="category_form.comment" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="序号" :label-width="formLabelWidth">
                    <el-input v-model="category_form.no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属父栏目" :label-width="formLabelWidth">
                    <el-select v-model="category_form.parentId" placeholder="请选择父栏目">
                        <el-option :value="item.id"  v-for="item in categories_parent" :key="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="categoryVisible = false">取 消</el-button>
                <el-button type="primary"  @click="saveCategory">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 遍历表格数据 -->
        <el-table
                :data="categories"
                stripe
                style="width: 100%">
            <el-table-column
                prop="name" 
                label="栏目名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="comment"
                label="栏目内容"
                width="500">
            </el-table-column>
            <el-table-column
                prop="parent.name"
                label="所属父栏目">
            </el-table-column>
            <el-table-column
                label="操作"> 
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-edit" @click="editCategory(scope.row)"></el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="deleteCategory(scope.row)"></el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
    export default {
        name:'Category',
        data(){
            return{
               categoryVisible:false,
               category_form:{},
               formLabelWidth:'120px'
            }
        },
        created(){
            this.findAllCategory();
        },
        computed: {
            ...mapState('category',['categories']),
            ...mapState('category',['categories_parent'])
        },
        methods: {
             // 加载所有栏目
            ...mapActions('category',['findAllCategory']),
            // 显示新增模态框{}
            showAdd(){
                this.categoryVisible = true;
            },
            // 新增栏目
            saveCategory(){
                $.ajax({
                    url: 'http://39.108.158.38:8099/manager/category/saveOrUpdateCategory',
                    method: 'post',
                    data: this.category_form,
                    success: (res) => {
                        if(res.status == 200){
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                        // 刷新数据
                        this.findAllCategory();
                        this.categoryVisible = false;
                    }
                }) 
            },
             //删除栏目
            deleteCategory(row){
                $.ajax({
                    url: 'http://39.108.158.38:8099/manager/category/deleteCategoryById',
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
                        this.findAllCategory();
                    }
                }) 
            },
            //修改栏目
            editCategory(row){

            }

        },
    }
    
</script>