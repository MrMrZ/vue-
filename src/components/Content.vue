<template>
   <div class="content"  >
      <div class="nav"><Navigation></Navigation></div>
      <div class="box">
        <div class="user">
            <i class="el-icon-caret-bottom logout"></i>
            <span class="username">客服一号</span>
             <img src="../assets/mine.png" alt="" class="mine">
            <div class="quit">注销</div>
        </div>
          <div class="search">
              <i class="el-icon-search search_icon" @click="search"></i>
              <input type="text" placeholder="输入完整手机号码" v-model="phoneNum">
         </div>
         <div class="line"></div>
             <!-- 创建新用户弹框 -->
            <div class="Tip" v-show="isNew">
                <div class="title" v-show="phoneNum">{{phoneNum}}</div>
                <div class="msg">这是新用户，是否创建？</div>
                <div class="btn">
                    <div class="quit" @click="isNew=false">取消</div>
                    <div class="sure" @click="toAdd">创建新用户</div>
                </div>
            </div>

            <router-view v-if="isRouterAlive"/>

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
      isRouterAlive:true,
    };
  },
  components: {
    AddUser,
    Details,
    Navigation
  },

  methods: {
    open4() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [h("span", null, "这是新用户，是否创建？")]),
        showCancelButton: true,
        confirmButtonText: "创建新用户",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
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
          type: "info",
          message: "action: " + action
        });
      });
    },

    // 搜索手机号
    search() {
      var that = this;
      if (!that.phoneNum) {
        alert("请输入手机号");
        return;
      }
      var data = {
        phone: that.phoneNum
      };
      var token = localStorage.getItem("token");
      console.log(
        data,
        "===================请求参数",
        token,
        "==========token"
      );
      that.axios
        .get(
          "https://power.anlly.net/fuyan/v1/service/phone",
          {
            params: data,
            headers: {
              // "Access-Control-Allow-Origin": "*",
              // "Content-Type": "application/json; charset=utf-8"
              token: token
            }
          },
          {
            xhrFields: { withCredentials: true }
          }
        )
        .then(
          function(res) {
            console.log(res.data, "=================请求成功");
            if (res.data.status == "success") {
              if (res.data.info == null) {
                that.isNew = true;
              } else {

                console.log(that.$route.path, "==============当前路由");

                that.info = res.data.info;
                localStorage.setItem("phone", that.info.phone);

                if (that.$route.path === "/content/details") {
                
                  //表示在当前用户信息页，不用跳转,刷新当前组件
                  that.isRouterAlive = false; 
                   that.$nextTick(() => (that.isRouterAlive = true))
                  
                } else {
                  that.$router.push({
                    name: "Details",
                    params: {
                      info: that.info
                    }
                  });
                }
              }
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err.response) {
              console.log(err.response, "=================失败");
              //控制台打印错误返回的内容
            }
            //bind(this)可以不用
          }.bind(this)
        );
    },

    //去添加新用户
    toAdd() {
      var that = this;
      that.isNew = false;
      that.to_add = true;

      that.$router.push({
        name: "AddUser",
        params: {
            phoneNum: that.phoneNum
        }
      });
    },

    //显示用户信息
    showInfo(data) {
      console.log(data, "===============子组件参数");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  width: 100%;
  height: 1080px;
  background-color:rgb(30,39,58) ;
  .nav {
    width: 20%;
    float: left;
  }
  .box {
    width: 80%;
    float: right;
    .user{
        width: 100%;
        height: 102px;
        background-color: rgb(58,72,104);
        box-sizing: border-box;
        padding-right: 70px;
        position: relative;
        z-index:22;
        .username{
          display: inline-block;
          float: right;
          font-family: PingFang-SC-Medium;
          font-size: 30px;
          color:#fff;
          height: 100%;
          line-height: 102px;
        }
        .logout{
          display: inline;
          width: 12px;
          height: 14px;
          line-height: 102px;
          float:right;
          color:rgb(101,144,238);
          margin-left: 20px;
        }
        .active{
          background-color: rgb(48,59,85);
        }
        .mine{
          float:right;
          margin-top: 26px;
          margin-right: 28px;
        }
        .quit{
          width: 141px;
          height: 60px;
         background-color: rgb(75,92,132);
         text-align: center;
         line-height: 60px;
         color:#fff;
         font-family: PingFang-SC-Medium;
         font-size: 30px;
         border-radius: 6px;
         position: absolute;
         top: 82px;
         right: 70px;
        }

    }
    .search {
      width: 100%;
      height:148px;
      background-color: rgb(30,39,58);
      box-sizing: border-box;
      padding-top: 48px;
      position: relative;
      float: right;
      input {
        width: 414px;
        height: 60px;
        border-radius: 26px;
        outline: none;
        font-size: 28px;
        padding-left: 20px;
        background-color: rgb(23,31,46);
        border-radius: 6px;
        font-family: PingFang-SC-Bold;
        font-size: 36px;
        color:#FFf;
        float:right;
        margin-right: 121px;
        border: none;
      }

      .search_icon {
        width: 54px;
        height:54px;
        color:#fff;
        float: right;
        position: absolute;
        top:64px;
        right: 126px;
 
      }
      .el-icon-search{
        font-size: 34px;
      }
    }
    .line{
      width: 1270px;
      height: 2px;
      background-color: rgb(72,92,133);
      margin-top: 148px;
      margin-left: 121px;
    }

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
        font-size:72px;
        color:rgb(143,113,255);
        font-family: PingFang-SC-Bold;
      }
      .msg {
        width: 100%;
        height: 160px;
        text-align: center;
        line-height: 160px;
        font-size: 60px;
        font-family: PingFang-SC-Medium;
        color:#fff;
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
          width:326px;
          float: right;
          background-color: rgb(66,81,114);
          color:#fff;
        }
        .sure {
          width:326px;
          float: left;
          background-color: rgb(90,58,208);
          color:#fff;
        }
      }
    }
  }
}
</style>


