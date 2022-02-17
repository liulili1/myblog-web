<template>
<div>
      <el-form class="listForm" ref="listForm">
      <el-row>
        <el-col :span="5" style="margin-right:10px">
        <el-input v-model="formInline.key" placeholder="关键字" ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="formInline.categoryId" placeholder="分类">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryText" :value="item.id"></el-option>
        </el-select>
      </el-col>
        <el-button type="primary" @click="onQuery()">查询</el-button>
        <el-button type="primary" @click="uploadBlog">新增</el-button>
      </el-row>
    </el-form>
       <el-table
       height="80vh"
        border
        :data="blogList"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="categoryText"
          label="分类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建者">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间">
          <template slot-scope="scope">
              <p>{{ scope.row.createDate | timeFilter }}</p>
            </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button @click="deleteBlog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  <Pagination
    :total="total"
    :page.sync="formInline.page"
    :limit.sync="formInline.size"
    @pagination="queryFilter"
    ></Pagination>
</div>
 
</template>
<script>
import {getList, deleteBlog, getCategoryList} from '@/api/blog'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ListView',
  inject:['reload'],
  data () {
    return {
      formInline:{
        page:1,
        size:10
      },
      blogList: [],
      categoryList:[],
      total:0
    }
  },
  filters:{
    timeFilter(time){
      return parseTime(time)
    }
  },
  created(){
    this.reload()
    this.initList()
    this.getCategoryList()
  },
 
  components:{
    Pagination
  },
  methods: {
    setQueryParams(pageParams){
      this.formInline = {...this.formInline,...pageParams}
    },
    queryFilter(pageParams){
      this.setQueryParams(pageParams)
      this.initList()
    },
    getCategoryList(){
      getCategoryList().then(data => {
        if(data.code === 0){
          this.categoryList = data.data
        
        }
      })
    },
    initList(){
       getList(this.formInline).then(res => {
        if(res.code === 0){
          this.blogList = res.data.result
          this.total = res.data.total
        }
      }).catch(err=> {
        this.$message({
          type:'error',
          message: err
        })
      })
    },
    onQuery(){
      this.initList()
    },
    uploadBlog() {
      this.$router.push({
        path:'/admin/addView'
      })
    },
    deleteBlog(row) {
      this.$confirm('确认删除该博客？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlog(row.id).then(data => {
          const { code, msg } = data
          if (code !== 0) {
            this.$message({
              type: 'error',
              message: msg
            })
            return false
          }
          this.initList()
          this.$notify({
            title: '成功',
            type: 'success',
            message: '删除博客成功',
            duration: 60 * 60
          })
        }).catch(err => {
          this.$message({
            type:'error',
            message: err
          })
        })
      })
      
    },
    handleClick(row) {
      this.$router.push({
        path:'/admin/addView',
        query:{
          id:row.id,
          isEdit:true
        }
      })
    },
  
    
  }
}
</script>
<style lang="scss" scoped>
  .el-form{
  padding: 10px;
  }
  .el-button{
    margin-left: 10px;
  }
  .el-table{
    margin-top: 20px;
  }


</style>

