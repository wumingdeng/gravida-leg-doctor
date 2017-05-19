<template>
  <div id="app">
   <transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="css" rel="stylesheet/css">
  .notice {
    width:20px;
    height:20px;
    line-height:20px;
    font-size:10px;
    color:#fff;
    text-align:center;
    background-color:#f00;
    border-radius:50%;
    position:absolute;
    right:60px;
    top:5px;
  }
  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px -10px;
    padding-bottom: 0px;
  }
  .toolbar .el-form-item {
		margin-bottom: 10px;
	}
</style>
