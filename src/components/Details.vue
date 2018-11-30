<template>
   <div class="content" >
     
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
                              <el-radio class="sex" v-model="info.sex" label="1" :disabled="!isEdit" style="font-size:40px">先生</el-radio>
                              <el-radio class="sex" v-model="info.sex" label="2" :disabled="!isEdit">女士</el-radio>
                          </div>
                        </div>

                         <div class="_input">
                          <div class="left">备&nbsp;&nbsp;&nbsp;注：</div>
                          <div  class="input_name w200" >
                            <input type="text" :class="{'active':isEdit}" v-model="info.remarks"  :readonly="!isEdit" >
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

              <div class="record_list" :class="{'pgtb':list.length>0}" v-show="list.length>0">
                <div  v-for="item in list" :key="item.id">
                      <div class="time">{{item.day}}</div>
                      <div class="lists" v-for="item1 in item.list" :key="item1.id">
                              <ul>
                                <li>
                                   <span class="phone_icon" v-if="item1.caty == 1"> <img src="../assets/call_in.png" alt=""></span>
                                   <span class="phone_icon" v-else> <img src="../assets/call_out.png" alt=""></span>
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

        <div class="pages">
            <!-- <el-pagination
            background
            small
            layout="prev, pager, next"
            :total="50">
          </el-pagination> -->
        </div>
    

     <div class="mask" v-show="isAddRecord" >
        <div class="new_record">
          <div class="title">新增记录</div>
          <div class="time_msg">
            <div class="left">
                 <div class="type">记录类型</div>
                 <div class="_select">
                   <el-select v-model="caty" placeholder="请选择" >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                 </div>
                  
                                  
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
                      placeholder=""
                      default-time	
                      default-value	>
                    </el-date-picker>
                </div>
                <div class="long">
                     <input class="minute"  type="text" v-model="talk_time">
                     分钟
                </div>
              </div>
            </div>
          </div>


           <div class="remark_con">
             <div class="add_remark">备注</div>
              <div class="add_txt">
                <input type="text" v-model="remarks" >
            </div>

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
      isAddRecord: false,
      options: [
        {
          value: "1",
          label: "拨入"
        },
        {
          value: "2",
          label: "拨出"
        }
      ]
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
    },

    // 修改用户信息
    modify() {
      var that = this;
      var data = that.info;
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
        .put("https://power.anlly.net/fuyan/v1/service/phone", data, {
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
              that.isEdit = false;

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
    },
    //获取记录
    getRecord() {
      var that = this;
      var data = {
        phone: that.info.phone
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
              if (res.data.lists) {
                that.list = res.data.lists;
                console.log(that.list.length, "=================长度");
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
    },

    //添加记录
    addRecord() {
      var that = this;

      if (!that.caty) {
        alert("请选择记录类型");
        return;
      }
      if (!that.start_time) {
        alert("请选择通话时间");
        return;
      }
      if (!that.talk_time) {
        alert("请选择通话时长");
        return;
      }

      var data = {
        phone: that.info.phone,
        caty: that.caty,
        talk_time: that.talk_time,
        start_time: that.start_time / 1000,
        remarks: that.remarks
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

              that.caty = '';
              that.talk_time = '';
              that.start_time = '';
              that.remarks = '';
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
<style lang="less" >
.content {
  width: 100%;
  float: left;
  box-sizing: border-box;
  // padding-left: 22px;
  background-color: rgb(30, 39, 58);
  height: auto;
  // padding-bottom: 50px;
  .message {
    width: 1470px;
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
      padding-top: 10px;
      margin: 20px;
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
            height: 100%;
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
            input {
                height: 80px;

              // padding-top: 9px;
              padding-bottom: 8px;
              font-size: 30px;
            }
          }
          // .w200 {
          //   width: 70%;
          //   // height: 100%;
          //   font-size: 40px;
          //   // line-height: 60px;
          //   input {
          //     font-size: 30px;
          //     //  line-height: 60px;
          //     //  height: 100%;

          //   }
          // }
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
            .el-radio__label {
              font-size: 30px;
            }
            .el-radio__inner {
              width: 24px;
              height: 24px;
            }
            .el-radio__inner::after {
              width: 10px;
              height: 10px;
            }
            .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
                background-color: #409EFF;
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
    width: 1470px;
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
        color: rgb(255, 255, 255);
        margin-left: 50px;
        margin-top: 12px;
      }
    }

    .record_list {
      width: 100%;
      height: 560px;
      // height:293px ;
      background-color: rgb(43, 55, 81);
      border-radius: 20px;
      padding-left: 32px;
      overflow: hidden;
      overflow-y: scroll;

      margin-top: 20px;
      .pdtb {
        box-sizing: border-box;
        padding-top: 26px;
        padding-bottom: 36px;
      }
      .time {
        font-family: PingFang-SC-Medium;
        font-size: 36px;
        color: #fff;
        margin-top: 20px;
      }

      .lists {
        width: 100%;
        ul {
          padding-left: 0;
          li {
            width: 98%;
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
            .start_time {
              /deep/.el-input--suffix .el-input__inner {
                color: #fff;
              }
            }
          }
        }
      }
    }
    .record_list::-webkit-scrollbar {
      display: none;
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
      margin: 180px auto;
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
            height: 73px;
            border-radius: 10px;
            outline: none;
            font-size: 29px;
            font-family: PingFang-SC-Medium;
            color: #fff;
            text-align: center;
            margin-top: 19px;
            border: none;
            // appearance: none;
            // -moz-appearance: none;
            // -webkit-appearance: none;
            // background: url("../assets/tri.png") no-repeat scroll right center
            //   transparent;
            background-color: rgb(75, 92, 132);
            box-sizing: border-box;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 10px;

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
            margin-top: 14px;

            .date {
              float: left;
              position: relative;
              .select_time {
                position: absolute;
                top: 0px;
                .el-input__inner {
                  background: none;
                }
              }
              /deep/.el-input__inner{
                   color:#fff;
                   font-size: 16px;
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
      .remark_con {
        overflow: hidden;
          margin-top: 68px;
        
        .add_remark{
          width: 10%;
          height: 86px;
          float: left;
          text-align: left;
          line-height: 86px;
          color:#fff;
          font-size: 30px;
        }
        .add_txt {
          width: 88%;
          height: 86px;
          border: 1px solid rgb(117, 136, 177);
          background-color: rgb(35, 46, 69);
          border-radius: 10px;
          font-family: PingFang-SC-Medium;
          font-size: 30px;
          color: #fff;
          float: left;
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
      }

      .button_con {
        width: 100%;
        height: 50px;
        overflow: hidden;
        margin-top: 50px;
        box-sizing: border-box;
        padding-left: 201px;
        div {
          width: 205px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-family: PingFang-SC-Medium;
          font-size: 30px;
          float: left;
          color: rgb(255, 255, 255);
          border-radius: 10px;
        }
        .sure {
          background-color: rgb(90, 58, 208);
        }
        .no {
          background-color: rgb(41, 52, 75);
          margin-left: 51px;
        }
      }
    }
  }

  .pages {
    width: 100%;
    height: 50px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
  }
}
</style>

