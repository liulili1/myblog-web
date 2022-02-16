<template>
  <div class="article-content markdown-body" v-html="compiledMarkdown" :style="{height:height}">
   </div>
</template>
<script>
import marked from 'marked'

var rendererMD = new marked.Renderer ()
marked . setOptions ({
renderer: rendererMD ,
gfm: true ,
tables: true ,
breaks: false ,
pedantic: false ,
sanitize: false ,
smartLists: true ,
smartypants: false
})
export default {
  name: 'Content',
  data() {
    return {

    }
  },
  props: {
    mdContent: {
      type: String,
      require: true
    },
    height: {
      type: String,
      default: '300px'
    }
  },
   computed: {
    compiledMarkdown : function () {
      return marked ( this.mdContent, { sanitize: true })
      }
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/markdown.scss';
.markdown-body {
  padding: 0 18px;
  overflow: hidden;
}
</style>