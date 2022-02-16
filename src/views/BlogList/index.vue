<template>
    <div class="blog-list-box">
        <el-row class="blog-list-item" v-for="item in blogList" :key="item.id">
              <blog-contents :content="item"></blog-contents>
        </el-row>
         <Pagination
          :total="total"
          :page.sync="formInline.page"
          :limit.sync="formInline.size"
          @pagination="queryFilter"
          >
        </Pagination>
    </div>
</template>
<script>
import { getList } from '@/api/blog'
import BlogContents from '@/components/BlogContents'
import Pagination from '@/components/Pagination'
export default {
name: 'BlogList',
data() {
  return {
    blogList:[],
     formInline:{
        page:1,
        size:10
      },
      total:0
  }
},
components: {
  BlogContents,
  Pagination
},
created() {
  this.initData()
},
methods:{
   setQueryParams(pageParams){
      this.formInline = pageParams
    },
    queryFilter(pageParams){
      this.setQueryParams(pageParams)
      this.initData()
    },
    initData(){
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
    }
}
}
</script>
<style lang="scss" scoped>
.blog-list-box {
  .blog-list-item {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  margin-bottom: 20px;
}
</style>