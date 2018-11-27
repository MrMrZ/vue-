<template>
   <div class="content">
     
     <div class="title">创建新用户</div>

     <div class="_input">
         <div class="left">手机号：</div>
         <input  class="right" type="text"  v-model="phoneNum">
     </div>
     <div class="_input">
         <div class="left">称呼：</div>
         <div  class="input_name" >
           <input type="text" v-model="username">
         </div>
         <i class="el-icon-edit edit"></i>
           <el-radio class="sex" v-model="radio" label="1">先生</el-radio>
          <el-radio v-model="radio" label="2">女士</el-radio>
     </div>
    <div class="_input h160">
            <div class="left">备注：</div>
            <el-input class="note"
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
      </div>

      <div class="btn">
        <div class="quit">取消</div>
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
    // 提交
    submit() {
      console.log('=================hhhh');
      var that = this;

      var data = {
        phone: that.phoneNum,
        realname: that.username,
        remarks: that.textarea,
        sex: that.radio
      };
      var token = localStorage.getItem('token');
      console.log(data, "===================请求参数",token,'==========token');
      that.axios
        .post(
          "https://power.anlly.net/fuyan/v1/service/phone",
          that.qs.stringify(data),
          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
              // "Content-Type": "application/json; charset=utf-8"
              'token':token
            }
          }
        )
        .then(
          function(res) {
            console.log(res.data, "=================请求成功");
            if (res.data.status == "success") {
                 
           localStorage.setItem('phone',that.phoneNum);
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
  width: 600px;
  height: 600px;
  border: 1px solid #000;
  float: left;
  box-sizing: border-box;
  padding-left: 22px;
  .title {
    width: 170px;
    height: 60px;
    line-height: 60px;
    border-bottom: 2px solid rgb(125, 125, 125);
    border-radius: 2px;
    font-family: PingFang-SC-Medium;
    font-size: 34px;
    color: rgb(29, 29, 29);
  }

  ._input {
    width: 500px;
    height: 60px;
    clear: both;
    margin-top: 41px;

    .left {
      line-height: 60px;
      float: left;
      font-family: PingFang-SC-Medium;
      font-size: 24px;
      color: rgb(42, 42, 42);
    }
    .right {
      height: 90%;
      float: left;
      font-family: PingFang-SC-Medium;
      font-size: 28px;
      color: rgb(58, 58, 58);
      line-height: 60px;
      outline: none;
      border: none;
      border-bottom: 1px solid #000;
    }
    .input_name {
      width: 30%;
      height: 30px;
      border-bottom: 1px solid rgb(191, 191, 191);
      float: left;
      margin-top: 15px;
      outline: none;
      input {
        width: 100%;
        height: 80%;
        border: none;
        outline: none;
        font-size: 24px;
      }
    }

    .edit {
      width: 24px;
      height: 24px;
      margin-top: 28px;
      margin-left: 10px;
    }
    .sex {
      margin-left: 20px;
    }
    .note {
      width: 80%;
      float: left;
      margin-top: 10px;
      outline: none;
    }
  }

  .h160 {
    height: 160px;
  }

  .btn {
    width: 100%;
    height: 40px;
    clear: both;
    margin-top: 40px;
    cursor: pointer;
    margin-left: 70px;

    .quit {
      width: 20%;
      height: 100%;
      line-height: 40px;
      text-align: center;
      float: left;
      border: 1px solid #000;
    }
    .submit {
      width: 20%;
      height: 100%;
      line-height: 40px;
      text-align: center;
      float: left;
      border: 1px solid #000;
      margin-left: 60px;
    }
  }
}
</style>

