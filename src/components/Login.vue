<template>
   <div class="content">
       <div class="box">

         <div class="login_title">楼上请客服系统</div>
          <div class="dailog">
                <div class="title">登录账号</div>

                <div class="_input">
                  <div class="left">
                    账&nbsp;&nbsp;&nbsp;&nbsp;号
                  </div>
                  <div class="right">
                    <input type="text" v-model="username">
                  </div>
                </div>

                <div class="_input">
                  <div class="left">
                    密&nbsp;&nbsp;&nbsp;&nbsp;码
                  </div>
                  <div class="right">
                    <input type="password" v-model="password"  @keyup.enter="Login()">
                    <div class="tip" v-show="loginError">提示：{{tip}}</div>
                  </div>
                </div>
              <!-- <router-link class="_router" to="/">  <div class="submit" @click="Login">登录</div> </router-link> -->
            <div class="submit" @click="Login()" >登录</div>    
          </div>
       </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loginError: false,
      tip: ""
    };
  },
  methods: {
    Login() {
      var that = this;
      var data = {
        username: that.username,
        password: that.password
      };
      console.log(data, "===================请求参数");
       var loading = that.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      that.axios
        .post("https://power.anlly.net/fuyan/v1/service/login", data)
        .then(
          function(res) {
            if (res.data.status == "success") {
              loading.close();
              console.log(res.data, "=================登录成功");

              // 将token保存到本地
              localStorage.setItem("token", res.data.token);

              localStorage.setItem("name", that.username);

              console.log(localStorage.getItem("token"), "============token");
              that.$router.push({
                name: "Content",
                params: {
                  name: that.username
                }
              });
            } else {
              loading.close();
              that.$message({
                message: "网络错误",
                type: "error",
                 center:true,
              });
              that.tip = res.data.msg;
              that.loginError = true;
              console.log(res.data, "=================请求失败", res.headers);
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err.response) {
              that.loginError = true;
              console.log(err.response, "=================登录失败");
              //控制台打印错误返回的内容
            }
            //bind(this)可以不用
          }.bind(this)
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  width: 100%;
  // height: 1080px;
  height: 100%;
  position: relative;
  background-color: rgb(30, 39, 58);
  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 51px;
    .login_title {
      width: 100%;
      text-align: center;
      font-family: PingFang-SC-Bold;
      font-size: 60px;
      color: rgb(255, 255, 255);
    }

    .dailog {
      width: 538px;
      height: 398px;
      background-color: rgb(43, 55, 81);
      border-radius: 10px;
      margin: 142px auto;
      box-sizing: border-box;
      padding-top: 36px;
      padding-left:35px;
      padding-right: 35px;

      .title {
        width: 100%;
        height: 60px;
        text-align: center;
        font-size: 40px;
        color: rgb(255, 255, 255);
        font-family: PingFang-SC-Bold;
      }
      ._input {
        width: 100%;
        height: 61px;
        clear: both;
        margin-top: 15px;
        .left {
          width: 30%;
          float: left;
          height: 61px;
          line-height: 60px;
          font-size: 34px;
          // text-align: center;
          font-family: PingFang-SC-Medium;
          color: #fff;
        }
        .right {
          float: left;
          width:70%;
          height: 61px;
          box-sizing: border-box;
          // padding-top: 25px;
          border-radius: 10px;
          background-color: rgb(35, 46, 69);
          input {
            width: 100%;
            height: 61px;
            background-color: rgb(35, 46, 69);
            border: 1px solid rgb(83, 103, 149);
            outline: none;
            border-radius: 10px;
            color: #fff;
            font-family: PingFang-SC-Regular;
            font-size: 34px;
            box-sizing: border-box;
            padding-left: 17px;
          }
          .tip {
            font-family: PingFang-SC-Regular;
            color: rgb(252, 79, 79);
            font-size: 20px;
            margin-top: 16px;
          }
        }
      }

      ._router {
        text-decoration: none;
      }

      .submit {
        width: 225px;
        height: 55px;
        text-align: center;
        line-height: 55px;
        background-color: rgb(90, 58, 208);
        color: #fff;
        font-size: 30px;
        border-radius: 10px;
        font-family: PingFang-SC-Medium;
        margin: 50px auto ;
      }
    }
  }
}
</style>
