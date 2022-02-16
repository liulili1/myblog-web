<template>
  <div class="pagination-box">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :prev-text="prevText"
      :next-text="nextText"
      :total="total"
      @size-change="handleSize"
      @current-change="handleCurrentPage"
      >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name:'Pagination',
  props:{
    page:{
      type: Number,
      default: 1
    },
    total:{
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: [],
      default() {
        return [10,20,30]
      }
    },
    prevText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    }
  },
  computed:{
    currentPage:{
      get(){
        return this.page
      },
      set(val){
        this.$emit('update:page',val)
      }
    },
    pageSize:{
      get(){
        return this.limit
      },
      set(val){
        this.$emit('update:limit',val)
      }
    }
  },
  methods:{
    handleSize(val){
      this.$emit('pagination',{page:this.currentPage,size:val})
    },
    handleCurrentPage(val){
      this.$emit('pagination',{page:val,size:this.pageSize})
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination-box{
  margin-top: 20px;
}
</style>