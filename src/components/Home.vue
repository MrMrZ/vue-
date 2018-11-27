<template>
   <div class="content">
     <Navigation></Navigation>
     <Content></Content>
    </div>
</template>

<script>
import Navigation from './Navigation'
import Content from './Content'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    Navigation,
    Content
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content{
  width:100%;
  height: 1500px;
  border: 1px solid #000;
}
</style>

