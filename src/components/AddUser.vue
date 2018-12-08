<template>
   <div class="add_content">
     
     <div class="title">创建新用户</div>

     <div class="_input">
         <div class="left">手机号</div>
         <input  class="right" type="text"  v-model="phoneNum">
     </div>
     <div class="_input">
         <div class="left">称&nbsp;&nbsp;&nbsp;&nbsp;呼</div>
         <div  class="input_name" >
           <input type="text" v-model="username">
         </div>
         <!-- <i class="el-icon-edit edit"></i> -->
         <div class="sex">
             <el-radio  v-model="radio" label="1" size="medium" >先生</el-radio>
             <el-radio v-model="radio" label="2"  size="medium">女士</el-radio>
         </div>
     </div>
    <div class="_input h160">
            <div class="left">备&nbsp;&nbsp;&nbsp;&nbsp;注</div>
              <input  class="right" type="text"  v-model="textarea">
            <!-- <el-input class="note"
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input> -->
      </div>

      <div class="btn">
        <div class="quit" v-on:click="cancel">取消</div>
        <div class="submit" v-on:click="submit">提交</div>
      </div>
   </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      radio: "1", //性别
      textarea: "", //备注
      phoneNum: "", //手机号
      username: "" //用户名
    };
  },
  components: {},

  methods: {
    cancel() {
      var that = this;
      that.$router.push({
        name: "Search",
        params: {
          // phoneNum: that.phoneNum
        }
      });
    },
    // 提交
    submit() {
      console.log("=================hhhh");
      var that = this;

      if (!that.username) {
        alert("请输入称呼");
        return;
      }

      if (that.phoneNum.length != 11) {
        alert("请输入正确手机号");
        return;
      }
      var data = {
        phone: that.phoneNum,
        realname: that.username,
        remarks: that.textarea,
        sex: that.radio
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
      that.axios
        .post(
          "https://power.anlly.net/fuyan/v1/service/phone",
          that.qs.stringify(data),
          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
              // "Content-Type": "application/json; charset=utf-8"
              token: token
            }
          }
        )
        .then(
          function(res) {
            console.log(res.data, "=================请求成功");
            if (res.data.status == "success") {
              localStorage.setItem("phone", that.phoneNum);
              that.$router.push({
                name: "Details",
                params: {
                  // info: that.info
                }
              });
            }

            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err.response) {
              console.log(err.response, "=================失败");
              if (err.response.status === 401) {
                that.$router.push({
                  name: "Login",
                  params: {
                    // info: that.info
                  }
                });
              }
              //控制台打印错误返回的内容
            }
            //bind(this)可以不用
          }.bind(this)
        );
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
.add_content {
  width: 743px;
  height: 542px;
  float: left;
  box-sizing: border-box;
  background-color: rgb(30, 39, 58);
  margin-left: 496px;
  margin-top: 100px;
  .title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 2px;
    font-family: PingFang-SC-Medium;
    font-size: 60px;
    color: #fff;
  }

  ._input {
    width: 100%;
    height: 80px;
    clear: both;
    margin-top: 41px;
    .left {
      line-height: 80px;
      float: left;
      font-family: PingFang-SC-Medium;
      font-size: 44px;
      color: #ffffff;
    }
    .right {
      width: 483px;
      height: 80px;
      background-color: rgb(35, 46, 69);
      border: 1px solid rgb(75, 92, 132);
      border-radius: 10px;
      float: left;
      font-family: PingFang-SC-Regular;
      font-size: 48px;
      color: #ffffff;
      line-height: 60px;
      outline: none;
      border: none;
      margin-left: 28px;
      box-sizing: border-box;
      padding-left: 30px;
    }
    .input_name {
      width: 200px;
      height: 80px;
      float: left;
      outline: none;
      input {
        width: 100%;
        height: 100%;
        outline: none;
        font-size: 24px;
        background-color: rgb(35, 46, 69);
        border: 1px solid rgb(75, 92, 132);
        font-family: PingFang-SC-Regular;
        font-size: 48px;
        border-radius: 10px;
        border: none;
        margin-left: 28px;
        box-sizing: border-box;
        padding-left: 30px;
        color: #ffffff;
      }
    }

    .edit {
      width: 24px;
      height: 24px;
      margin-top: 28px;
      margin-left: 10px;
    }
    .sex {
      margin-left: 400px;
      line-height: 80px;
      font-size: 30px;
      /deep/ .el-radio__label {
        font-size: 30px;
      }
      /deep/ .el-radio__inner {
        width: 24px;
        height: 24px;
        margin-top: -8px;
      }
      /deep/ .el-radio__inner::after {
        width: 10px;
        height: 10px;
      }
    }

    .note {
      width: 483px;
      height: 80px;
      float: left;
      margin-top: 10px;
      outline: none;
    }
  }

  .btn {
    width: 100%;
    height: 80px;
    clear: both;
    margin-top: 65px;
    cursor: pointer;
    div {
      width: 326px;
      height: 100%;
      border-radius: 10px;
      text-align: center;
      line-height: 80px;
      font-family: PingFang-SC-Medium;
      font-size: 48px;
      color: #fff;
    }

    .quit {
      background-color: rgb(46, 58, 84);

      float: right;
    }
    .submit {
      float: left;
      background-color: rgb(77, 50, 177);
    }
  }
}
</style>

