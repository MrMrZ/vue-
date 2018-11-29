<template>
   <div class="content"  >
             <!-- 创建新用户弹框 -->
            <div class="Tip" >
                <div class="title" v-show="phoneNum">{{phoneNum}}</div>
                <div class="msg">这是新用户，是否创建？</div>
                <div class="btn">
                    <div class="quit" @click="toAdd(0)">取消</div>
                    <div class="sure" @click="toAdd(1)">创建新用户</div>
                </div>
            </div>
   </div>

</template>

<script>
import AddUser from "./AddUser";
import Details from "./Details";
import Navigation from "./Navigation";
export default {
  name: "Home",
  data() {
    return {
      phoneNum: "", //手机号
      isNew: false,
      to_add: false, //去创建
      showDes: false, //显示详情用户信息
      info: {},
      isRouterAlive: true
    };
  },
  components: {
    AddUser,
    Details,
    Navigation
  },

  methods: {
    //去添加新用户
    toAdd(index) {
      var that = this;
      that.isNew = false;
      that.to_add = true;

      if (index == 1) {
        that.$router.push({
          name: "AddUser",
          params: {
            phoneNum: that.phoneNum
          }
        });
      } else if (index == 0) {
        that.$router.push({
          name: "Content",
          params: {
            // phoneNum: that.phoneNum
          }
        });
      }
    },

    //显示用户信息
    showInfo(data) {
      console.log(data, "===============子组件参数");
    }
  },
  created() {
    var that = this;
    //获取传入的参数
    if (that.$route.params.phoneNum) {
      that.phoneNum = that.$route.params.phoneNum;
      console.log(that.phoneNum, "==============参数============");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  width: 100%;
  height: 500px;
  background-color: rgb(30, 39, 58);

  .Tip {
    width: 743px;
    height: 350px;
    margin: 132px auto;
    box-sizing: border-box;
    .title {
      width: 100%;
      height: 80px;
      text-align: center;
      line-height: 80px;
      font-size: 72px;
      color: rgb(143, 113, 255);
      font-family: PingFang-SC-Bold;
    }
    .msg {
      width: 100%;
      height: 160px;
      text-align: center;
      line-height: 160px;
      font-size: 60px;
      font-family: PingFang-SC-Medium;
      color: #fff;
      margin-top: 40px;
    }

    .btn {
      width: 100%;
      height: 80px;
      clear: both;
      box-sizing: border-box;
      margin-top: 100px;
      div {
        text-align: center;
        line-height: 80px;
        font-size: 24px;
        font-family: PingFang-SC-Medium;
        font-size: 48px;
        border-radius: 10px;
      }
      .quit {
        width: 326px;
        float: right;
        background-color: rgb(66, 81, 114);
        color: #fff;
      }
      .sure {
        width: 326px;
        float: left;
        background-color: rgb(90, 58, 208);
        color: #fff;
      }
    }
  }
}
</style>


