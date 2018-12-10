<template>
   <div class="add_content">
     

     <div class="add_con">
         <div class="con_l">
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
              
         </div>
         <div class="con_r">
             <div class="_input h160">
                        <div class="left">备&nbsp;&nbsp;&nbsp;&nbsp;注</div>
                          <textarea  class="_textarea" type="text"  v-model="textarea"></textarea>
                           <div class="more" >
                  
                              <div class="more_list" >
                                    <ul>
                                      <li  class="more_item">
                                        <el-select v-model="cars" placeholder="车辆" class="more_sel" >
                                            <el-option
                                              v-for="item in options1"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                          </el-select>
                                      </li>
                                      <li  class="more_item">
                                        <el-select v-model="jobs" placeholder="职业" class="more_sel" >
                                            <el-option
                                              v-for="item in optioins2"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                          </el-select>
                                      </li>
                                    
                                      <li  class="more_item" >
                                        <el-select v-model="marriage" placeholder="婚姻" class="more_sel" >
                                            <el-option
                                              v-for="item in options3"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                          </el-select>
                                      </li >
                                        <li  class="more_item" >
                                        <el-select v-model="years" placeholder="年龄" class="more_sel" >
                                            <el-option
                                              v-for="item in options4"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                          </el-select>
                                      </li>
                                        <li  class="more_item">
                                          <el-select v-model="kids" placeholder="孩子" class="more_sel" >
                                            <el-option
                                              v-for="item in options5"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                          </el-select>
                                        </li>
                                    
                                      
                                      <!-- <li  class="more_item">
                                          <el-select v-model="areas" placeholder="地点" class="more_sel" >
                                            <el-option
                                              v-for="item in options6"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                          </el-select>
                                      </li> -->
                                    </ul>
                              </div>
            </div>
                  </div>
         </div>

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
      username: "", //用户名

      options1: [
        {
          label: "1辆",
          value: "1"
        },
        {
          label: "2辆",
          value: "2"
        }
      ], //车辆
      optioins2: [
        {
          label: "老板",
          value: "1"
        },
        {
          label: "业务",
          value: "2"
        },
        {
          label: "其他",
          value: "3"
        }
      ], //职业
      options3: [
        {
          label: "未婚",
          value: "1"
        },
        {
          label: "已婚",
          value: "2"
        }
      ], //婚姻
      options4: [
        {
          label: "18~25",
          value: "1"
        },
        {
          label: "26~30",
          value: "2"
        },
        {
          label: "30~40",
          value: "3"
        },
        {
          label: "40以上",
          value: "4"
        }
      ], //年龄
      options5: [
        {
          label: "1个",
          value: "1"
        },
        {
          label: "2个",
          value: "2"
        },
        {
          label: "2个以上",
          value: "3"
        }
      ], //孩子
      options6: [
        {
          label: "海珠",
          value: "1"
        },
        {
          label: "越秀",
          value: "2"
        },
        {
          label: "天河",
          value: "3"
        },
        {
          label: "白云",
          value: "4"
        },

        {
          label: "荔湾",
          value: "5"
        },
        {
          label: "萝岗",
          value: "6"
        },
        {
          label: "南沙",
          value: "7"
        },
        {
          label: "花都",
          value: "8"
        },
        {
          label: "番禺",
          value: "9"
        },
        {
          label: "黄埔",
          value: "10"
        }
      ], //地点
      cars: "",
      jobs: "",
      marriage: "",
      years: "",
      kids: "",
      areas: ""
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
        that.$message("请输入称呼");
        return;
      }

      if (that.phoneNum.length != 11) {
        that.$message("请输入正确手机号");
        return;
      }
      var remarks = that.textarea;

      if (that.cars) {
        remarks += "," + that.cars + "辆车";
      }
      if (that.jobs) {
        var jobs = "";
        if (that.jobs == 1) {
          jobs = "老板";
        }
        if (that.jobs == 2) {
          jobs = "业务";
        } else {
          jobs = "其他职业";
        }
        remarks += "," + jobs;
      }
      if (that.marriage) {
        var marriage = "";

        if (that.marriage == 1) {
          marriage = "已婚";
        } else {
          marriage = "未婚";
        }
        remarks += "," + marriage;
      }
      if (that.years) {
        var years = "";
        if (that.year == 1) {
          years = "18~25";
        }
        if (that.year == 2) {
          years = "26~30";
        }
        if (that.year == 3) {
          years = "30~40";
        }
        if (that.year == 4) {
          years = "40以上";
        }

        remarks += "," + years;
      }
      if (that.kids) {
        if (that.kids == 3) {
          remarks += "," + that.kids + "个孩子以上";
        } else {
          remarks += "," + that.kids + "个孩子";
        }
      }
      var data = {
        phone: that.phoneNum,
        realname: that.username,
        remarks: remarks,
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
              that.$message('提交成功');
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
  width: 1529px;
  height: 529px;
  float: left;
  box-sizing: border-box;
  background-color: rgb(30, 39, 58);
  margin-left: 121px;
  margin-top: 100px;

  .add_con {
    width: 100%;
    height: 100%;
    display: flex;
    flex: auto;
    .con_l {
      width: 920px;
      height: 100%;
      background-color: rgb(24, 33, 53);
      box-sizing: border-box;
      padding-left: 133px;
      padding-top: 68px;
    }
    .con_r {
      width: 601px;
      height: 100%;
      box-sizing: border-box;
      padding-left: 57px;
      // padding-top: 67px;
      background-color: rgb(36, 50, 80);
      ._textarea {
        width: 483px;
        height: 112px;
        background-color: rgb(48, 63, 95);
        border: 1px solid rgb(117, 136, 177);
        border-radius: 10px;
        resize: none;
        font-family: PingFang-SC-Regular;
        font-size: 30px;
        color: #fff;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 32px;
        outline: none;
      }
      .more_list {
        width: 100%;
        margin-top: 41px;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 137px;
            height: 59px;
            border-radius: 10px;
            background-color: rgb(48, 63, 95);
            border: 1px solid rgb(117, 136, 177);
            text-align: center;
            line-height: 59px;
            margin-right: 42px;
            margin-top: 24px;
            box-sizing: border-box;
            padding-top: 5px;
            .more_sel {
              color: #fff;
            }
            /deep/.el-input__inner {
              font-family: PingFang-SC-Medium;
              font-size: 29px;
              color: #fff;
              text-align: center;
              border: none;
              background: none;
            }

            /deep/ .el-input__icon {
              width: 100%;
              margin-right: 25px;
              margin-top: -10px;
            }

            /deep/ .el-icon-arrow-up {
              font-size: 28px;
              color: #fff;
            }
          }
        }
      }
    }
  }
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
    width: 740px;
    height: 80px;
    clear: both;
    margin: 65px auto;
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

