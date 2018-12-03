<template>
   <div class="content1">
       <div class="title1">录入</div>
   </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content1{
  width: 100%;
  // height: 1438px;
  height: 100%;
  float: left;
  background-color: rgb(18,23,34);
  box-sizing: border-box;
  padding-top: 150px;
  .title1{
    width: 100%;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-color: rgb(43,126,255);
    font-size: 40px;
    font-family: PingFang-SC-Medium;
    color:#fff;
    
  }
}
</style>
