<template>
   <div class="content1" >
       <div class="title1" @click="toPages(1)" :class="{'active':isActive==1}">录入</div>
       <div class="title1" @click="toPages(2)"  :class="{'active':isActive==2}">搜索</div>
       <div class="title1" @click="toPages(3)"  :class="{'active':isActive==3}">关联</div>
       <div class="title1" @click="toPages(4)"  :class="{'active':isActive==4}">订单</div>


   </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isActive:1,
    };
  },
  methods: {
     getPath() {
      var that = this;
      console.log(that.$route.path)
      if ( that.$route.path.indexOf("details") != -1 ) {
          that.isActive = 1;
      }
    },
    toPages(index) {
      var that = this;
      that.isActive = index;
      if (index == 1) {
        that.$router.push({
          name: "Content",
          params: {
          }
        });
      } else if(index == 2){
        that.$router.push({
          name: "Map",
          params: {
          }
        });
      }else if(index == 3){
        that.$router.push({
          name: "Association",
          params: {
          }
        });
      }else if(index == 4){
        that.$router.push({
          name: "Order",
          params: {
          }
        });
      }
    }
  },
  watch: {
    $route: "getPath"
  },
  mounted(){
     var that = this;
    
    if(that.$route.path === "/content"){
        that.isActive = 1;
    }else if(that.$route.path === "/content/map"){
       that.isActive = 2;
    }else if(that.$route.path === "/content/association"){
       that.isActive = 3;
    }else if(that.$route.path === "/content/order"){
       that.isActive = 4;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content1 {
  width: 100%;
  // min-height: 1080px;
  height: 100%;
  float: left;
  background-color: rgb(18, 23, 34);
  box-sizing: border-box;
  padding-top: 150px;
  .title1 {
    width: 100%;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-color: rgb(26,35,57);
    font-size: 40px;
    font-family: PingFang-SC-Medium;
    color: #fff;
  }
  .active{
    background-color: rgb(43, 126, 255);
  }
}
</style>
