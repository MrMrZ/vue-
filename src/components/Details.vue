<template>
   <div class="content">
     
       <div class="infonation">
           <div class="title">用户信息</div>

     <div class="_input">
         <div class="left">手机号：</div>
         <div  class="right" >18813960141</div>
     </div>
     <div class="_input">
         <div class="left">称呼：</div>
         <div  class="input_name" >
           <input type="text">
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
        <div class="submit">提交</div>
      </div>
       </div>

       <!-- 记录 -->
       <div class="record">
             <div class="top">
                <div class="title">记录</div>
            <div class="add_record"  @click="centerDialogVisible = true">添加记录</div>
             </div>
            
            <div class="history">
                 <div class="item">
                   <div class="date">2018年11月20日</div>
                    <ul class="lists">
                      <li>
                        <i class="el-icon-phone-outline phone_icon"></i>
                        <span class="time">19:00</span>
                        <span class="howlong">20分钟</span>
                        <span class="line">|</span>
                        <span class="des">订房</span>
                      </li>
                        <li>
                        <i class="el-icon-phone-outline phone_icon"></i>
                        <span class="time">19:00</span>
                        <span class="howlong">20分钟</span>
                        <span class="line">|</span>
                        <span class="des">告知订房成功</span>
                      </li>
                    </ul>
                 </div>


                    <div class="item">
                   <div class="date">2018年11月20日</div>
                    <ul class="lists">
                      <li>
                        <i class="el-icon-phone-outline phone_icon"></i>
                        <span class="time">19:00</span>
                        <span class="howlong">20分钟</span>
                        <span class="line">|</span>
                        <span class="des">订房</span>
                      </li>
                        <li>
                        <i class="el-icon-phone-outline phone_icon"></i>
                        <span class="time">19:00</span>
                        <span class="howlong">20分钟</span>
                        <span class="line">|</span>
                        <span class="des">取消订单</span>
                      </li>
                    </ul>
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
            <select>
                <option value ="volvo">
                  拨入
                </option>
                <option value ="saab">拨出</option>
              </select>
          </div>
        </div>

        <div class="input_txt">
            <div class="left">通话时间：</div>
            <div class="right">
              <el-date-picker class="select_time"
                v-model="value1"
                type="datetime"
                placeholder="">
              </el-date-picker>
            </div>
       </div>

        <div class="input_txt">
          <div class="left">通话时间：</div>
          <div class="right">
                <input type="text"> <span class="minute">分钟</span>
          </div>
       </div>

        <div class="input_txt h200">
            <div class="left">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</div>
            <div class="right w300 ">
                <textarea name="" id="" ></textarea>
            </div>
       </div>


            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
      </div>


  
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      radio: "1",
      textarea: "",
      centerDialogVisible: false,
      value1:''
    };
  },
  components: {},

  methods: {}
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
            width: 400px;
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


  .add_item{
    height:800px !important;
    border: 1px solid RED;
    
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

      .minute{
        float: right;
      }

      input{
        width: 100px;
        height: 90%;
        outline: none;
        border: none;
         color: rgb(80, 80, 80);
        font-size: 20px;
        line-height: 30px;
      }

      textarea{
        width: 100%;
        height: 90%;
        resize: none;
        outline: none;
        font-size: 20px;
        border: none;
      }

      .select_time{
        width: 100%;
        height: 100%;
        border:none;
      }
    }

    .w300{
      width: 300px;
    }
 
  }
    .h200{
      height: 100px;
    }
}
</style>

