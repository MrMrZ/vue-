<template>
   <div class="content">
     
     
        <!-- 用户信息 -->

        <div class="message">
              <div class="phone">{{info.phone}}</div>
              <div class="details">
                   <div class="msg_con">
                       <div class="_input">
                          <div class="left">称&nbsp;&nbsp;&nbsp;呼：</div>
                          <div  class="input_name" >
                            <input type="text" v-model="info.realname" :class="{'active':isEdit}" :readonly="!isEdit" >
                          </div>
                          <div class="sex_con">
                              <el-radio class="sex" v-model="info.sex" label="1" :disabled="!isEdit">先生</el-radio>
                              <el-radio class="sex" v-model="info.sex" label="2" :disabled="!isEdit">女士</el-radio>
                          </div>
                        </div>

                         <div class="_input">
                          <div class="left">备&nbsp;&nbsp;&nbsp;注：</div>
                          <div  class="input_name w200" >
                            <input type="text" :class="{'active':isEdit}" v-model="info.remarks"  :readonly="!isEdit">
                          </div>
                        </div>
                   </div>
                   <div class="btn_con">
                       <div class="modify" v-if="!isEdit" @click="toEdit(1)">修改</div>
                       <div class="modify" v-else @click="modify">确定</div>
                       <div class="cancel" @click="toEdit(2)">取消</div>
                   </div>
              </div>
        </div>

        <!-- 记录列表 -->
        <div class="record_con">
              <div class="title_con">
                  <div class="title">记录</div>
                  <div class="add_record" @click="isAddRecord=true">新增记录</div>
              </div>

              <div class="record_list">
                <div  v-for="item in list" :key="item">
                      <div class="time">{{item.day}}</div>
                      <div class="lists" v-for="item1 in item.list" :key="item1">
                              <ul>
                                <li>
                                   <span class="phone_icon"> <img src="../assets/call_in.png" alt=""></span>
                                    <span class="start_time">{{item1.start_time}}</span>
                                    <span class="line">|</span>
                                    <span class="howlong">{{item1.talk_time}}分钟</span>
                                    <span class="line">|</span>
                                    <span class="des">{{item1.remarks}}</span>
                                </li>
                              </ul>
                      </div> 
                </div>
                      
              </div>
        </div>
    

     <div class="mask" v-show="isAddRecord">
        <div class="new_record">
          <div class="title">新增记录</div>
          <div class="time_msg">
            <div class="left">
                 <div class="type">记录类型</div>
                  <select v-model="caty" class="_select">
                    <option :value ="1" class="_option">
                      拨入
                    </option>
                    <option :value ="2">拨出</option>
                 </select>
                 
            </div>
            <div class="right">
              <div class="time_des">
                   <span>通话时间</span>
                   <span>通话时长</span>
              </div>
              <div class="_time_det">
                <div class="date">
                    <el-date-picker class="select_time"
                      v-model="start_time"
                      type="datetime"
                      value-format="timestamp"
                      placeholder="">
                    </el-date-picker>
                </div>
                <div class="long">
                     <input class="minute" placeholder="20" type="text" v-model="talk_time">
                     分钟
                </div>
              </div>
            </div>
          </div>

            <div class="add_txt">
              <input type="text" v-model="remarks" >
            </div>

            <div class="button_con">
                 <div class="sure" @click="addRecord" >提交</div>
                 <div class="no"  @click="isAddRecord=false">取消</div>
            </div>

        </div>
     </div>

     <!-- 添加记录弹框 -->
     
      </div>

  
</template>

<script>
export default {
  name: "Home",
  props: ["msg"],

  data() {
    return {
      radio: "1",
      textarea: "",
      centerDialogVisible: false,
      value1: "",
      caty: "", //1,拨入,2,拨出
      talk_time: "", //通话时长
      start_time: "", //通话开始时间
      remarks: "", //备注
      username: "",
      id: "", //当前用户id
      info: {
        id: "",
        phone: "",
        realname: "",
        remarks: "",
        sex: "1"
      },
      list: [],
      isEdit: false,
      isAddRecord:false
    };
  },
  components: {},

  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D = date.getDate() + " " + "日";

      return Y + M + D;
    },

    // 是否修改
    toEdit(index) {
      var that = this;
      if (index == 1) {
        that.isEdit = true;
      } else {
        that.isEdit = false;
      }
    },
    // 搜索手机号
    search() {
      var that = this;

      var data = {
        phone: that.info.phone
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
              that.info = res.data.info;
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

    // 修改用户信息
    modify() {
      var that = this;
      var data = that.info;
      var token = localStorage.getItem("token");
      console.log(
        data,
        "===================请求参数",
        token,
        "==========token"
      );
      that.axios
        .put("https://power.anlly.net/fuyan/v1/service/phone", {
          params: data,
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Content-Type": "application/json; charset=utf-8"
            token: token
          }
        })
        .then(
          function(res) {
            console.log(res.data, "=================请求成功");
            if (res.data.status == "success") {
              that.search();
              alert("修改成功");
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
    //获取记录
    getRecord() {
      var that = this;
      var data = {
        phone: that.info.phone
      };
      var token = localStorage.getItem("token");
      console.log(
        data,
        "===================请求参数",
        token,
        "==========token"
      );
      that.axios
        .get("https://power.anlly.net/fuyan/v1/service/callrecord", {
          params: data,
          headers: {
            token: token
          }
        })
        .then(
          function(res) {
            console.log(res.data, "=================获取记录成功");
            if (res.data.status == "success") {
              that.list = res.data.lists;
              console.log(that.list.length, "=================长度");
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

    //添加记录
    addRecord() {
      var that = this;

      var data = {
        phone: that.info.phone,
        caty: that.caty,
        talk_time: that.talk_time,
        start_time: that.start_time / 1000,
        remarks: that.remarks
      };
      var token = localStorage.getItem("token");
      console.log(
        data,
        "===================请求参数",
        token,
        "==========token"
      );

      that.axios
        .post(
          "https://power.anlly.net/fuyan/v1/service/callrecord",
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
            console.log(res.data, "=================添加记录成功");
            if (res.data.status == "success") {
              that.getRecord();
              that.isAddRecord = false;
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
  },
  mounted() {
    var that = this;
  },
  created() {
    var that = this;
    //获取传入的参数
    if (that.$route.params.info) {
      that.info = that.$route.params.info;
      console.log(that.info, "==============参数============");
    }

    if (localStorage.getItem("phone")) {
      var phone = localStorage.getItem("phone");
      that.info.phone = phone;
      that.search();
      that.getRecord();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  width: 100%;
  float: left;
  box-sizing: border-box;
  padding-left: 22px;
  //  height:1800px;
  background-color: rgb(30, 39, 58);

  .message {
    width: 1250px;
    height: 293px;
    margin-left: 101px;
    margin-top: 36px;
    .phone {
      font-family: PingFang-SC-Bold;
      font-size: 60px;
      color: #fff;
    }
    .details {
      width: 100%;
      height: 219px;
      clear: both;
      background-color: rgb(43, 55, 81);
      border-radius: 20px;
      box-sizing: border-box;
      padding-left: 48px;
      padding-top: 30px;
      .msg_con {
        width: 70%;
        height: 100%;
        float: left;
        ._input {
          width: 800px;
          clear: both;
          margin-top: 20px;
          overflow: hidden;
          .left {
            line-height: 60px;
            float: left;
            font-family: PingFang-SC-Medium;
            font-size: 44px;
            color: #fff;
          }
          .right {
            height: 100%;
            float: left;
            font-family: PingFang-SC-Medium;
            font-size: 28px;
            color: rgb(58, 58, 58);
            // line-height: 60px;
            outline: none;
            border: none;
          }
          .input_name {
            width: 30%;
            height: 50px;
            float: left;
            outline: none;
            input {
              width: 100%;
              height: 100%;
              border: none;
              outline: none;
              background: none;
              font-family: PingFang-SC-Medium;
              font-size: 40px;
              color: #fff;
              // margin-top: 4px;
            }
            .active {
              border-radius: 10px;
              border: 1px solid rgb(75, 92, 132);
              background-color: rgb(35, 46, 69);
            }
          }
          .w200 {
            width: 70%;
            font-size: 40px;
            margin-top: 4px;
            input {
              font-size: 30px;
            }
          }
          .edit {
            width: 24px;
            height: 24px;
            margin-top: 28px;
            margin-left: 20px;
          }
          .sex_con {
            width: 300px;
            height: 60px;
            float: left;
            box-sizing: border-box;
            padding-top: 15px;
            .sex {
              margin-left: 20px;
              font-size: 30px !important;
            }
          }

          .note {
            width: 80%;
            float: left;
            margin-top: 10px;
            outline: none;
          }
        }
      }
      .btn_con {
        width: 28%;
        height: 100%;
        float: right;
        box-sizing: border-box;
        padding-top: 20px;
        padding-left: 40px;
        div {
          width: 205px;
          height: 50px;
          border-radius: 10px;
          text-align: center;
          line-height: 50px;
          font-size: 30px;
          font-family: PingFang-SC-Medium;
          color: #fff;
          cursor: pointer;
        }
        .modify {
          background-color: rgb(90, 58, 208);
        }
        .cancel {
          background-color: rgb(66, 81, 114);
          margin-top: 23px;
        }
      }
    }
  }

  .record_con {
    width: 1250px;
    // height: 293px;
    margin-left: 101px;
    margin-top: 36px;

    .title_con {
      width: 100%;
      height: 91px;
      clear: both;
      .title {
        line-height: 91px;
        font-family: PingFang-SC-Medium;
        font-size: 60px;
        float: left;
        color: #fff;
      }
      .add_record {
        float: left;
        width: 185px;
        height: 65px;
        border-radius: 10px;
        background-color: rgb(77, 50, 177);
        text-align: center;
        line-height: 65px;
        font-family: PingFang-SC-Medium;
        font-size: 36px;
        color: rgba(255, 255, 255, 0.5);
        margin-left: 50px;
        margin-top: 12px;
      }
    }

    .record_list {
      width: 100%;
      // height:293px ;
      background-color: rgb(43, 55, 81);
      border-radius: 20px;
      box-sizing: border-box;
      padding-left: 32px;
      padding-top: 26px;
      padding-bottom: 36px;
      margin-top: 20px;
      .time {
        font-family: PingFang-SC-Medium;
        font-size: 36px;
        color: #fff;
      }

      .lists {
        width: 100%;
        ul {
          padding-left: 0;
          li {
            width: 80%;
            height: 80px;
            line-height: 80px;
            background-color: rgb(61, 75, 108);
            border-radius: 10px;
            clear: both;
            margin-top: 10px;
            box-sizing: border-box;
            padding-left: 20px;
            .start_time,
            .howlong,
            .des {
              font-family: PingFang-SC-Medium;
              font-size: 36px;
              color: #fff;
              margin-left: 20px;
              float: left;
            }
            .line {
              font-size: 36px;
              color: rgb(117, 149, 217);
              margin-left: 20px;
              float: left;
            }
            .phone_icon {
              display: inline-block;
              width: 46px;
              height: 100%;
              box-sizing: border-box;
              padding-top: 15px;
              float: left;
              img {
                width: 46px;
              }
            }
          }
        }
      }
    }
  }

  .record {
    margin-top: 20px;
    clear: both;
    height: 800px;

    .top {
      width: 100%;
      height: 60px;
      clear: both;
      box-sizing: border-box;
      padding-left: 40px;
      .title {
        width: 170px;
        height: 60px;
        line-height: 60px;
        border-bottom: 6px solid rgb(125, 125, 125);
        border-radius: 2px;
        font-family: PingFang-SC-Medium;
        font-size: 34px;
        color: rgb(29, 29, 29);
        float: left;
        text-align: center;
      }
      .add_record {
        float: left;
        width: 105px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #000;
        margin-left: 20px;
        margin-top: 10px;
        cursor: pointer;
        font-family: PingFang-SC-Medium;
        font-size: 20px;
        color: rgb(29, 29, 29);
        text-align: center;
      }
    }
    .history {
      width: 100%;
      margin-top: 30px;
      box-sizing: border-box;
      padding-top: 10px;
      height: 700px;
      overflow-y: scroll;
      .item {
        .date {
          width: 180px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          background-color: rgb(191, 191, 191);
          font-family: PingFang-SC-Regular;
          font-size: 20px;
          color: rgb(42, 42, 42);
          margin-left: 40px;
        }
        .lists {
          list-style: none;
          li {
            width: 100%;
            margin-top: 10px;
            .phone_icon {
              font-size: 20px;
            }
            .line {
              font-size: 24px;
              margin-left: 10px;
            }
            .time,
            .howlong,
            .des {
              font-family: PingFang-SC-Regular;
              font-size: 20px;
              color: rgb(42, 42, 42);
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 1080px;
    background-color: rgba(3, 3, 3, 0.89);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .new_record {
      width: 916px;
      height: 540px;
      background-color: rgb(52, 69, 104);
      margin: 311px auto;
      border-radius: 20px;
      box-sizing: border-box;
      padding-left: 40px;
      padding-top: 27px;
      padding-right: 43px;
      .title {
        font-family: PingFang-SC-Medium;
        font-size: 36px;
        color: #fff;
      }
      .time_msg {
        width: 100%;
        // height: 100px;
        margin-top: 20px;
        overflow: hidden;
        .left {
          width: 30%;
          height: 100%;
          float: left;
          .type {
            font-family: PingFang-SC-Medium;
            font-size: 23px;
            color: #fff;
          }
          ._select {
            width: 175px;
            height: 75px;
            border-radius: 10px;
            outline: none;
            font-size: 29px;
            font-family: PingFang-SC-Medium;
            color: #fff;
            text-align: center;
            margin-top: 19px;
            border: none;
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            background: url("../assets/tri.png") no-repeat scroll right center
              transparent;
            background-color: rgb(75, 92, 132);
            box-sizing: border-box;
            padding-left: 10px;
            padding-right: 10px;

            ._option {
              width: 175px;
              height: 75px;
              border-radius: 10px;
            }
          }
        }
        .right {
          width: 68%;
          height: 100%;
          float: right;
          .time_des {
            width: 100%;
            display: inline-block;
            clear: both;
            span:first-child {
              width: 64%;
              height: 100%;
              float: left;
            }
            span:last-child {
              width: 35%;
              height: 100%;

              float: right;
            }
            span {
              font-family: PingFang-SC-Medium;
              font-size: 23px;
              color: #fff;
            }
          }
          ._time_det {
            width: 100%;
            height: 73px;
            border-radius: 10px;
            background-color: rgb(75, 92, 132);
            clear: both;
            font-family: PingFang-SC-Medium;
            color: #fff;
            font-size: 29px;
            line-height: 73px;
            box-sizing: border-box;
            padding-left: 24px;
            padding-right: 24px;
            margin-top: 20px;

            .date {
              float: left;
              .select_time {
                .el-input__inner {
                  background: none;
                }
              }
            }
            .long {
              float: right;
              .minute {
                display: inline-block;
                width: 113px;
                height: 53px;
                text-align: center;
                line-height: 53px;
                background-color: rgb(35, 46, 69);
                border: 1px solid rgb(117, 136, 177);
                border-radius: 6px;
                outline: none;
                font-family: PingFang-SC-Medium;
                font-size: 29px;
                color: #fff;
              }
            }
          }
        }
      }
      .add_txt {
        width: 100%;
        height: 86px;
        border: 1px solid rgb(117, 136, 177);
        background-color: rgb(35, 46, 69);
        border-radius: 10px;
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #fff;
        margin-top: 68px;
        input {
          width: 100%;
          height: 100%;
          background: none;
          outline: none;
          font-family: PingFang-SC-Medium;
          font-size: 30px;
          color: #fff;
          border: none;
          box-sizing: border-box;
          padding-left: 18px;
        }
      }
      .button_con{
        width: 100%;
        height: 50px;
        overflow: hidden;
        margin-top: 50px;
        box-sizing: border-box;
        padding-left: 201px;
        div{
            width: 205px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            float: left;
            color:rgba(255,255,255,0.5);
            border-radius:10px;
        }
        .sure{
          background-color: rgb(77,50,177);
        }
         .no{
          background-color: rgb(41,52,75);
          margin-left: 51px;
        }
      }
    }
  }
  .add_item {
    height: 800px !important;
  }
  .input_txt {
    width: 500px;
    height: 40px;
    clear: both;
    margin-top: 10px;
    .left {
      float: left;
      font-family: PingFang-SC-Medium;
      font-size: 20px;
      color: rgb(80, 80, 80);
    }
    .right {
      width: 220px;
      height: 100%;
      float: left;
      margin-left: 20px;
      border: 1px solid #000;
      color: rgb(80, 80, 80);
      font-size: 20px;
      box-sizing: border-box;
      padding-left: 10px;

      padding-right: 10px;
      select {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        border: none;
      }

      .minute {
        float: right;
      }

      input {
        width: 100px;
        height: 90%;
        outline: none;
        border: none;
        color: rgb(80, 80, 80);
        font-size: 20px;
        line-height: 30px;
      }

      textarea {
        width: 200px;
        height: 90%;
        resize: none;
        outline: none;
        font-size: 20px;
        border: none;
      }

      .select_time {
        width: 100%;
        height: 100%;
        border: none;
      }
    }

    .w300 {
      width: 220px;
    }
  }
  .h200 {
    height: 100px;
  }
}
</style>

