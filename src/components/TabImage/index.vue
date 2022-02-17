<template>
  <div class="blog-content-img" :style="{top:top}">
      <div class="blog-icon-qu"><a href="#">{{textContent}}</a></div>
    </div>
</template>
<script>
export default {
  name: 'TabImage',
  props: {
    textContent: {
      type: String
    },
    top: {
      type: String,
      default: '90px'
    }
  }
}
</script>
<style lang="scss" scoped>
$icon_bg_color:#a7ddfa;
$fn_color:#fff;
  .blog-content-img{
    position: absolute;
    left: -18px;
    color: $fn_color;
    .blog-icon-qu{
      display: inline-block;
      height: 25px;
      background-color: #a7ddfa;
      line-height: 25px;
      text-align: center;
      border-radius: 0 4px 4px 0;
      box-shadow: 1px 1px 2px #47456a;
      padding: 0 10px 0 10px;
    }
    .blog-icon-qu:after{
      position: absolute;
      content: '';
      top: 100%;
      left: 0;
      border-top: 0 solid transparent;
      border-right-width: 1em;
      border-right-color: #47456a;
      border-right-style: solid;
      border-bottom: 1em solid transparent;
      border-left: 0 solid transparent;
      width: 0;
      height: 0;
    }
  }
</style>