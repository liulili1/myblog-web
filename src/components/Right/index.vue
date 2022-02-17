<template>
  <div class="rightBox">
    <personal-card></personal-card>
    <hot-list></hot-list>
    <tag-list></tag-list>
  </div>
</template>
<script>
import PersonalCard from './components/PersonalCard'
import HotList from './components/HotList'
import TagList from './components/TagList'
export default {
  name: 'Right',
  components: {
    PersonalCard,
    HotList,
    TagList
  },
  methods:{
   
  }
}
</script>
<style lang="scss" scoped>
.rightBox{
  height: 800px;
  width: 400px;
}

</style>