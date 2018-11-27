<template>
   <div class="content">
     
       <div class="infonation">
           <div class="title">用户信息</div>

     <div class="_input">
         <div class="left">手机号：</div>
         <div  class="right" >{{info.phone}}</div>
     </div>
     <div class="_input">
         <div class="left">称&nbsp;&nbsp;&nbsp;呼：</div>
         <div  class="input_name" >
           <input type="text" v-model="info.realname" style="text-align:center">
         </div>
         <i class="el-icon-edit edit"></i>
           <el-radio class="sex" v-model="info.sex" label="1">先生</el-radio>
          <el-radio v-model="info.sex" label="2">女士</el-radio>
     </div>
    <div class="_input h160">
            <div class="left">备&nbsp;&nbsp;&nbsp;注：</div>
            <el-input class="note"
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="info.remarks">
            </el-input>
      </div>

      <div class="btn">
        <div class="quit">取消</div>
        <div class="submit" @click="modify">提交</div>
      </div>
       </div>

       <!-- 记录 -->
       <div class="record">
             <div class="top">
                <div class="title">记录</div>
            <div class="add_record"  @click="centerDialogVisible = true">添加记录</div>
             </div>
       
            <div class="history" >
              <div v-for="item in list" :key="item.id">
                <div class="item">
                   <div class="date">{{item.day}}</div>
                    <ul class="lists" v-for="item1 in item.list" :key="item1.id">
                      <li>
                        <i class="el-icon-phone-outline phone_icon"></i>
                        <span class="time">{{item1.start_time}}</span>
                        <span class="howlong">{{item1.talk_time}}分钟</span>
                        <span class="line">|</span>
                        <span class="des">{{item1.remarks}}</span>
                      </li>
                    </ul>
                 </div>
              </div>
                 
            </div>


       </div>
     

     <!-- 添加记录弹框 -->
       <el-dialog class="add_item"
        title="添加记录"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="input_txt">
          <div class="left">记录类型：</div>
          <div class="right">
            <select v-model="caty">
                <option :value ="1">
                  拨入
                </option>
                <option :value ="2">拨出</option>
              </select>
          </div>
        </div>

        <div class="input_txt">
            <div class="left">通话时间：</div>
            <div class="right">
              <el-date-picker class="select_time"
                v-model="start_time"
                type="datetime"
                value-format="timestamp"
                placeholder="">
              </el-date-picker>
            </div>
       </div>

        <div class="input_txt">
          <div class="left">通话时间：</div>
          <div class="right">
                <input type="text" v-model="talk_time"> <span class="minute">分钟</span>
          </div>
       </div>

        <div class="input_txt h200">
            <div class="left">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</div>
            <div class="right w300 ">
                <textarea name="" id="" v-model="remarks"></textarea>
            </div>
       </div>


            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRecord">确 定</el-button>
            </span>
          </el-dialog>
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
      list:[],
    };
  },
  components: {},

  methods: {

    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '年';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) +'月';
        var D = date.getDate() + ' ' + '日';
       
        return Y+M+D;
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
        .put(
          "https://power.anlly.net/fuyan/v1/service/phone",
          {
            params: data,
            headers: {
              // "Access-Control-Allow-Origin": "*",
              // "Content-Type": "application/json; charset=utf-8"
              token: token
            }
          },
        )
        .then(
          function(res) {
            console.log(res.data, "=================请求成功");
            if (res.data.status == "success") {
              that.search();
              alert('修改成功');
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
        .get(
          "https://power.anlly.net/fuyan/v1/service/callrecord",
         {
            params: data,
            headers: {
              token: token
            }
          },
        )
        .then(
          function(res) {
            console.log(res.data, "=================获取记录成功");
            if (res.data.status == "success") {
                 that.list = res.data.lists;
                 console.log(that.list.length,'=================长度')
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
        phone:that.info.phone,
        caty: that.caty,
        talk_time: that.talk_time,
        start_time: that.start_time/1000,
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
              'token':token
            }
          }
        )
        .then(
          function(res) {
            console.log(res.data, "=================添加记录成功");
            if (res.data.status == "success") {
                   that.getRecord();
                  that.centerDialogVisible = false;
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
    if(that.$route.params.info){
       that.info = that.$route.params.info;
       console.log(that.info, "==============参数============");
    }
   
    if(localStorage.getItem('phone')){
         var phone = localStorage.getItem('phone');
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
  .infonation {
    width: 100%;
    height: 550px;
    border-bottom: 1px solid #000;
    padding-left: 20px;
    .title {
      width: 170px;
      height: 60px;
      line-height: 60px;
      border-bottom: 6px solid rgb(125, 125, 125);
      border-radius: 2px;
      font-family: PingFang-SC-Medium;
      font-size: 34px;
      color: rgb(29, 29, 29);
      text-align: center;
    }

    ._input {
      width: 500px;
      height: 60px;
      clear: both;
      margin-top: 20px;

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
        margin-left: 20px;
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
      width: 600px;
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

