<template>
   <div class="search_content">
       <div class="search" v-show="true">
            <i class="el-icon-search search_icon" @click="toSearch"></i>
            <input type="text" placeholder="输入完整手机号" v-model="phoneNum" @input="toSearch"  @keyup.enter="search">
        </div>
         <div class="line" v-show="true"></div>
    </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      phoneNum: ""
    };
  },
  components: {},
  methods: {
    toSearch() {
      if (this.phoneNum.length == 11) {
        this.search();
      }
    },

    isPoneAvailable(phoneNum) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(phoneNum)) {
        return false;
      } else {
        return true;
      }
    },

    // 搜索手机号
    search() {
      var that = this;
      if (!that.phoneNum) {
        that.$message({
          message: "请输入手机号",
          type: "warning",
          center: true
        });
        return;
      }
      if (that.phoneNum.length != 11) {
        that.$message({
          message: "请输入正确手机号",
          type: "warning",
          center: true
        });
        return;
      }

      if (!that.isPoneAvailable(that.phoneNum)) {
        that.$message({
          message: "请输入正确手机号码",
          type: "warning",
          center: true
        });
        return;
      }
      var data = {
        phone: that.phoneNum
      };
      var token = localStorage.getItem("token");

      if (!token) {
        that.$router.push({
          name: "Login",
          params: {}
        });
        return;
      }

      console.log(
        data,
        "===================请求参数",
        token,
        "==========token"
      );

      var loading = that.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
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
              loading.close();
              if (res.data.info == null) {
                //  that.isNew = true;\

                if (that.$route.path === "/content/newuser") {
                  //表示在当前用户信息页，不用跳转,刷新当前组件

                  that.$router.push({
                    name: "Content",
                    params: {
                     
                    }
                  });

                  setTimeout(() => {
                    that.$router.push({
                      name: "NewUser",
                      params: {
                        phoneNum: that.phoneNum,
                      }
                    });
                  }, 100);
                } else {
                  loading.close();
                  that.$router.push({
                    name: "NewUser",
                    params: {
                      phoneNum: that.phoneNum
                    }
                  });
                }
              } else {
                console.log(that.$route.path, "==============当前路由");

                that.info = res.data.info;
                localStorage.setItem("phone", that.info.phone);

                if (that.$route.path.indexOf("details") != -1) {
                  // //表示在当前用户信息页，不用跳转,刷新当前组件
                    console.log('=============当前组件');
                    that.$router.go(0);
                } else {
                  that.$router.push({
                    name: "Details",
                    params: {
                      info: that.info,
                      id:that.info.id
                    }
                  });
                }
              }
            } else if (res.data.status == "error") {
              loading.close();

              that.$message({
                message: "网络错误",
                type: "error",
                 center:true,
              });
            }

            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err.response) {
              loading.close();
              that.$message({
                message: "登录超时，请重新登录",
                type: "error",
                 center:true,
              });
              console.log(err.response, "=================失败");
              //控制台打印错误返回的内容
              if (err.response.status === 401) {
                that.$router.push({
                  name: "Login",
                  params: {
                    // info: that.info
                  }
                });
              }
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
.search_content {
  width: 100%;
  // height: 1080px;
  border: 1px solid rgb(30, 39, 58);
  .search {
    width: 100%;
    height: 148px;
    background-color: rgb(30, 39, 58);
    box-sizing: border-box;
    padding-top: 40px;
    position: relative;
    float: right;
    input {
      width: 414px;
      height: 74px;
      border-radius: 26px;
      outline: none;
      font-size: 28px;
      padding-left: 20px;
      background-color: rgb(23, 31, 46);
      border-radius: 6px;
      font-family: PingFang-SC-Bold;
      font-size: 30px;
      // float: right;
      margin-right: 121px;
      border: none;
      text-align: center;
      color: #fff;
      position: absolute;
      left: 50%;
      margin-left: -207px;
    }
    input::-webkit-input-placeholder {
      color: rgb(32, 112, 231);
    }

    .search_icon {
      width: 54px;
      height: 54px;
      color: #fff;
      float: right;
      position: absolute;
      top: 66px;
      right: 50%;
      margin-right: -220px;
      z-index: 22;
    }
    .el-icon-search {
      font-size: 34px;
    }
  }
  .line {
    width: 80%;
    height: 2px;
    background-color: rgb(72, 92, 133);
    // margin-left: 121px;
    margin: 148px auto 0;
  }
}
</style>

