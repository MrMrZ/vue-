<template>
   <div class="content">
       <div class="title">录入</div>
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
.content{
  width: 20%;
  height: 900px;
  float: left;
  .title{
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
