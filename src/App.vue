<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name:'App',
  provide(){
			return{
				reload:this.reload
			}
		},
		data(){
			return{
				isRouterAlive:true
			}
		},
		created(){
			console.log(process.env);
		},
		methods:{
			reload(){
				this.isRouterAlive=false
				this.$nextTick(function(){
					this.isRouterAlive=true
				})
			}
		}
}
</script>
<style lang="scss">


</style>