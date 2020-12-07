<template>
	<div>
		<button v-on:click='show=!show'>show/hide</button>
		<transition name='fade'>
			<p v-if="show">THIS WORD IS SHOW</p>
		</transition>
		
	</div>
</template>
<script>
export default{
	name:'demo',
	data(){
	return {show:true}
	}
}
</script>
<style scoped>
.fade-enter-active,.fade-leave-active{
	transition:opacity 0.5s
}

.fade-enter, .fade-leave{
	opacity:0
}
</style>