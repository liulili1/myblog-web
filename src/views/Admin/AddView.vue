<template>
    <div id="main">
      <header class="header">
        <el-button class="draftBtn" @click="saveDraft">保存为草稿</el-button>
        <el-button type="success" @click="save">新增</el-button>
      </header>
      <el-form ref="blogForm" v-model="blogForm" class="blogForm">
            <el-row>
              <el-col :span="8">
                <el-input v-model="blogForm.title" placeholder="标题" size="small"></el-input>
              </el-col>
              <el-col :span="3">
                <el-select v-model="blogForm.category" placeholder="分类" size="small">
                  <el-option v-for="item in categoryList"
                  :key="item.id"
                  :label="item.categoryText" :value="item.category"></el-option>
                </el-select>
              </el-col>
            </el-row>
          <mavon-editor
            ref="md"
            placeholder="请输入文档内容..."
            :boxShadow="false"
            style="z-index:1;border: 1px solid #d9d9d9;height:70vh"
            v-model="blogForm.content"
            :toolbars="toolbars"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          />
      </el-form>  
    </div>  
</template>
<script>
import {upload, saveData, getDetail, getCategoryList} from '@/api/blog'
export default {
  name: 'AddView',
  data() {
    return {
      blogForm:{
        title: '',
        category: '',
        content: ''
      },
      categoryList: "",
      img_file:{
        pos:''
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  created(){
      this.getCategoryList()
      if(this.$route.query.isEdit){
        this.getDetailById()
      }
      },
  methods: {
    getCategoryList(){
      getCategoryList().then(data => {
        if(data.code === 0){
          this.categoryList = data.data
        }
      })
    },
    getDetailById(){
      getDetail(this.$route.query.id,'','edit').then(data => {
        if(data.code === 0){
          this.blogForm.content = data.data[0].content
          this.blogForm.title = data.data[0].title
          this.blogForm.category = data.data[0].categoryId
        }
    })
    },
    $imgAdd(pos, $file) {
    // 第一步.将图片上传到服务器.
    var formdata = new FormData();
    formdata.append('image', $file);
    this.img_file[pos] = $file;
    upload(formdata).then(res => {
      let _res = res.data;
       const url = _res.url
          this.$refs.md.$img2Url(
            pos,
            url
          )
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   this.$refs.md.$img2Url(pos, _res.path);
    })
    // this.$http({
    //     url: '/api/edit/uploadimg',
    //     method: 'post',
    //     data: formdata,
    //     headers: { 'Content-Type': 'multipart/form-data' },
    // }).then((res) => {
    //     let _res = res.data;
    //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //     this.$refs.md.$img2Url(pos, _res.url);
    // })
},
  $imgDel(pos) {
      delete this.img_file[pos];
  },
  saveDraft() {
  },
  save() {
    saveData({param: JSON.stringify(this.blogForm)}).then(res => {
      if(res.code === 0){
        this.$notify({
          type: 'success',
          title: '保存成功',
          message: '上传成功'
        })
        this.$router.push({
          path: '/admin/listView'
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
  }

}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #55b0f2 , #3c76e9);
  line-height: 50px;
  text-align: right;
  padding-right: 20px;
  .el-button {
    width: 120px;
    text-align: center;
    &:first-child{
      color: #3c76e9;
    }
  }
}
.blogForm{
  padding: 20px;
  .el-row{
    margin-bottom: 20px;
    .el-col{
      margin-right: 20px;
    }
  }
}
</style>