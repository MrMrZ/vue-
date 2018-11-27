<template>
   <div class="content">
     
     <div class="search">
         <input type="text" placeholder="输入完整手机号码">
         <img class="search_icon" src="../assets/search@2x.png" alt="">
     </div>

      <!-- 创建新用户弹框 -->
     <div class="Tip" v-show="false">
         <div class="title">提示</div>
         <div class="msg">这是新用户，是否创建？</div>
         <div class="btn">
             <div class="quit">取消</div>
             <div class="sure">创建新用户</div>
         </div>
     </div>


     <!-- 创建新用户 -->
     <AddUser v-show="false"></AddUser>


     <!-- 用户信息 -->
     <Details></Details>
   </div>
</template>

<script>
import AddUser from './AddUser'
import Details from './Details'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    AddUser,
    Details
  },

  methods:{
     open4() {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '这是新用户，是否创建？'),
          ]),
          showCancelButton: true,
          confirmButtonText: '创建新用户',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content{
  width: 78%;
  // height: 900px;
  float:right;
  .search{
    width: 100%;
    height: 80px;
    background-color: rgb(125,125,125);
    box-sizing: border-box;
    padding-top: 12px;
    position: relative;
    input{
      width: 616px;
      height: 53px;
      border-radius: 26px;
      outline: none;
      font-size: 28px;
      padding-left: 20px;
      text-align: center;
      margin-left: 460px;
    }

    .search_icon{
      width: 26px;
      height: 26px;
      position: absolute;
      right: 400px;
      top: 26px;
    }
  }

  .Tip{
    width: 500px;
    height: 350px;
    border: 1px solid #000;
    margin:60px auto;
    box-sizing: border-box;
    .title{
        width: 100%;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 28px;
        border-bottom: 1px solid #ccc;;

    }
    .msg{
      width: 100%;
      height: 160px;
      text-align: center;
      line-height: 160px;
      font-size: 24px;
    }

    .btn{
      width: 100%;
      height: 60px;
      clear: both;
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 20px;
      div{
        text-align: center;
        line-height: 60px;;
        font-size: 24px;
        border: 1px solid #000;
      }
      .quit{
        width: 30%;
        float: left;

      }
      .sure{
        width: 30%;
        float: right;

      }
    }
  }


}
</style>

