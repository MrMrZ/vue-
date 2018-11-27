<template>
   <div class="content">
       <div class="box">
          <div class="dailog">
                <div class="title">登录账号</div>

                <div class="_input">
                  <div class="left">
                    账号：
                  </div>
                  <div class="right">
                    <input type="text" v-model="username">
                  </div>
                </div>

                <div class="_input">
                  <div class="left">
                    密码：
                  </div>
                  <div class="right">
                    <input type="password" v-model="password">
                  </div>
                </div>
              <!-- <router-link class="_router" to="/">  <div class="submit" @click="Login">登录</div> </router-link> -->
            <div class="submit" @click="Login()">登录</div>    
          </div>
       </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    Login() {
      console.log("========点击登录");
      var that = this;
      var user = {
        username: that.username,
        password: that.password
      };
      console.log(user, "===================请求参数");
      that.axios.post(
          "https://power.anlly.net/fuyan/v1/service/login",
          that.qs.stringify(user),
          {
            headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
          }
        )
        .then(
          function(res) {
            console.log(res.data,'=================请求成功');
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err.response) {
              console.log(err.response,'=================失败');
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
  height: 930px;
  position: relative;
  .box {
    width: 100%;
    height: 930px;
    position: absolute;
    left: 0;
    top: 0;

    .dailog {
      width: 444px;
      height: 347px;
      background-color: #fff;
      position: absolute;
      border: 1px solid #000;
      left: 50%;
      top: 50%;
      margin-left: -222px;
      margin-top: -173px;
      .title {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 24px;
      }
      ._input {
        width: 100%;
        height: 80px;
        clear: both;

        .left {
          width: 30%;
          float: left;
          height: 100%;
          line-height: 80px;
          font-size: 20px;
          text-align: center;
        }
        .right {
          float: left;
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          padding-top: 25px;
          input {
            width: 100%;
            height: 50%;
          }
        }
      }

      ._router {
        text-decoration: none;
      }

      .submit {
        width: 50%;
        margin: 30px auto;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: #ccc;
        color: #fff;
        font-size: 28px;
      }
    }
  }
}
</style>
