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
  height: 900px;
  float: left;
  border: 1px solid #000;
  .title1{
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: rgb(63,63,63);
    font-size: 34px;
    color:#fff;
    
  }
}
</style>
