<template>
   <div class="connet_content">
           <div class="_table">
             <!-- 表格数据 -->
               <el-table
                    :data="tableData"
                    height="790"
                    style="width: 100%;">
                    <el-table-column
                      label="拨入电话"
                      width="360"
                      class="cell"
                      > 
                      <template slot-scope="scope">
                           <div class="user_phone"  >
                              <div class="phone_con">
                                  <!-- <span class="el-icon-phone"></span> -->
                                  <img class="phone_icon" src="../assets/phone@2x.png" alt="">
                                  <span class="phone">{{scope.row.phoneNum}}</span>
                            </div>
                            <div class="call_time">
                                {{scope.row.time}}
                            </div>
                           </div>
                      </template> 
                    </el-table-column>
                    <el-table-column
                      label="用户行为记录"
                       width="1203">
                     <template slot-scope="scope" >
                       <div class="action" :class="{'bdt':index!=0}" v-for="(item,index) in scope.row.actions" :key="item.id"  > 
                          <span class="action_id">用户{{item.uid}}</span>
                          <span class="action_time">时间: &nbsp;&nbsp;{{item.time}}</span>
                          <span class="connect"  @click="toConnect">关联该用户</span>
                       </div>
                     </template>
                    </el-table-column>
                    <!-- <el-table-column
                      label="关联"
                      width="395" >
                     <template slot-scope="scope" >
                          <div class="connet_icon" :class="{'bg_active':currentRow == scope.row.phoneNum}" v-if="currentRow == scope.row.phoneNum" @click="toConnect">
                                  <div class="img_con">
                                     <img src="../assets/connet_active@2x.png" alt=""    >
                            
                                  </div>
                          </div>
                            <div class="connet_icon" :class="{'bg_active':currentRow == scope.row.phoneNum}"  v-else>
                                  <div class="img_con">
                                    <img src="../assets/connet@2x.png" alt="" >
                                  </div>
                          </div>
                     </template>
                    </el-table-column> -->
               </el-table>

               <!-- 关联成功 -->
               <div class="success" v-show="success">
                  <img src="../assets/connect_success@2x.png" alt="">
               </div>

             
           </div>

          <!-- 弹窗，确认关联 -->
         <div class="confirm_box" v-show="isConnect">
              <div class="title">是否确认关联？</div>
              <div class="btn">
                  <div class="quit" @click="isConnect=false">取消</div>
                  <div class="sure">确认</div>
              </div>
          </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentAction: -1, //当前选中行为
      currentRow: "", //当前关联行
      tableData: [
        {
          phoneNum: 18813960131,
          time: "2018-12-18  10:05",
          actions: [
            {
              uid: 1,
              id: 1,
              time: "2018-12-18  10:02"
            },
            {
              uid: 2,
              id: 2,
              time: "2018-12-18  10:02"
            },
            {
              uid: 1,
              id: 3,
              time: "2018-12-18  10:02"
            }
          ]
        },
        {
          phoneNum: 18813960132,
          time: "2018-12-18  10:05",
          actions: [
            {
              uid: 1,
              id: 4,
              time: "2018-12-18  10:02"
            },
            {
              uid: 1,
              id: 5,
              time: "2018-12-18  10:02"
            },
            {
              uid: 3,
              id: 6,
              time: "2018-12-18  10:02"
            },
            {
              uid: 4,
              id: 7,
              time: "2018-12-18  10:02"
            }
          ]
        },
        {
          phoneNum: 18813960133,
          time: "2018-12-18  10:05",
          actions: [
            {
              uid: 5,
              id: 8,
              time: "2018-12-18  10:02"
            },
            // {
            //   uid: 5,
            //   id: 9,
            //   time: "2018-12-18  10:02"
            // }
          ]
        }
      ],
      list:[], //数据列表
      isConnect: false,
      success:false,
    };
  },
  components: {},
  methods: {
    //是否确认关联
    toConnect() {
      var that = this;
      that.isConnect = true;
    },

    selectAction(index, rowPhone) {
      var that = this;
      that.currentAction = index;
      that.currentRow = rowPhone;
      console.log(rowPhone, "======================row");
    },

     //获取订单列表
    getList() {
      var that = this;
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
        .get("https://power.anlly.net/fuyan/v1/service/callrecord", {
          // params: data,
          headers: {
            token: token
          }
        })
        .then(
          function(res) {
            console.log(res.data, "=================获取数据成功");
            if (res.data.status == "success") {
              loading.close();
              if (res.data.lists) {
                that.list = res.data.lists;
                console.log(that.list.length, "=================长度");
              }
            } else if (res.data.status == "error") {
              loading.close();
              that.$message({
                message: "网络错误",
                type: "error",
                center: true
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
                center: true
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
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.connet_content {
  width: 100%;
  height: 100%;
  // overflow-y: scroll;
  position: relative;
  ._table {
    width: 1563px;
    // height: 780px;
    // border: 1px solid #fcc;
    margin: 48px auto;
     -moz-user-select:none; /* Firefox私有属性 */
    -webkit-user-select:none; /* WebKit内核私有属性 */
    -ms-user-select:none; /* IE私有属性(IE10及以后) */
    -khtml-user-select:none; /* KHTML内核私有属性 */
    -o-user-select:none; /* Opera私有属性 */
    user-select:none; /* CSS3属性 */
      border-bottom: 2px solid rgb(117, 136, 177);

    .connet_icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      .img_con {
        width: 100%;
        text-align: center;
        img {
          width: 76px;
          height: 78px;
          vertical-align: middle;
        }
      }
    }
    .user_phone {
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .phone_con {
        display: flex;
        justify-content: center;
        .phone_icon {
          width: 33px;
          height: 40px;
          // color:rgba(91,155,255,0.71);
          // font-size: 36px;
        }
        .phone {
          font-family: PingFang-SC-Medium;
          font-size: 36px;
          color: #fff;
          margin-top: 8px;
        }
      }
      .call_time {
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: rgb(101, 144, 238);
        margin-top: 20px;
      }
    }
    .action {
      width: 100%;
      height: 134px;
      line-height: 134px;
      // border: 2px solid rgb(117,136,177);
      // border-top:2px solid rgb(117,136,177);
      box-sizing: border-box;
      padding-left: 64px;

      .action_id {
        font-family: PingFang-SC-Medium;
        font-size: 36px;
        color: #fff;
      }
      .action_time {
        font-family: PingFang-SC-Medium;
        font-size: 36px;
        color: rgb(101, 144, 238);
        margin-left: 52px;
      }

      .connect{
        display: inline-block;
        width: 189px;
        height: 64px;
        background-color: rgb(90,58,208);
        border-radius: 10px;
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color:rgb(255,254,254);
        text-align: center;
        line-height: 64px;
        margin-left: 302px;
        cursor: pointer;

      }
    }
   
    //选中行为背景色
    .bg_active {
      background-color: rgb(36, 50, 80);
    }
    .bdt {
      border-top: 2px solid rgb(117, 136, 177);
    }

         //滚动条的宽度
    /deep/ .el-table__body-wrapper::-webkit-scrollbar {
        width: 22px;
        height: 100%;
        background-color: rgb(117, 136, 177);
    }
    //滚动条的滑块
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
        height: 120px;
        border-radius: 11px;
        background-color: rgb(48, 63, 95);
    }
 
    /deep/ .el-table--border {
      border: 2px solid rgb(117, 136, 177);
    }
    /deep/ .el-table th,
    .el-table tr {
      background-color: rgb(36, 50, 80);
      height: 93px;
      color: #fff;
      font-family: PingFang-SC-Medium;
      font-size: 36px;
      text-align: center;
    }
      /deep/ thead.has-gutter{
        border: 1px solid red;
      }
    /deep/ .has-gutter .cell {
      height: 93px;
      line-height: 93px;
    }
    /deep/ .has-gutter tr th {
      // border-bottom: 2px solid rgb(117, 136, 177);
      border: 2px solid rgb(117, 136, 177);
      font-weight: normal;
        padding: 0;
    }
    /deep/ .has-gutter tr th:nth-child(1) {
      border-right: none;
    }
    /deep/ .el-table--border th {
      border-right: 2px solid rgb(117, 136, 177);
    }

    /deep/ .el-table__row {
      background-color: rgb(24, 33, 53);
      color: #fff;

    }

    /deep/ .el-table__row .el-table_1_column_3 {
      padding: 0;
      .cell {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .el-table::before {
      height: 0;
    }

    /deep/ .el-table__row td {
      padding: 0;
      // border: 2px solid rgb(117, 136, 177);
      border-left: 2px solid rgb(117, 136, 177);
      border-bottom: 2px solid rgb(117, 136, 177);
    }

    /deep/ .el-table__row td:first-child {
      // border-left: none;
      border-right: none;
      // border-top: 2px solid rgb(117, 136, 177);
    }
    /deep/ .el-table__row td:last-child {
      border-right: 2px solid rgb(117, 136, 177);
    }
    /deep/ .el-table__row .cell {
      width: 100%;
      height: 100%;
      padding: 0;

    }
    /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgb(24, 33, 53);
    }
  /deep/.el-table, .el-table__expanded-cell{
    background:none;
  }
     /deep/ .el-table__row {
      td {
        width: 100%;
        height: 100%;
      }
      
    }
  }
  .confirm_box {
    width: 609px;
    height: 269px;
    border: 4px solid rgb(117, 136, 177);
    background-color: rgb(24, 43, 86);
    border-radius: 15px;
    position: fixed;
    left: 50%;
    margin-left: -305px;
    top: 50px;
    box-sizing: border-box;
    padding-top: 50px;
       z-index: 999;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 40px;
      color: rgb(254, 254, 254);
      text-align: center;
    }
    .btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 50px;
      div {
        height: 60px;
        border-radius: 10px;
        font-family: PingFang-SC-Medium;
        text-align: center;
        line-height: 60px;
        font-size: 32px;
        cursor: pointer;

      }
      .quit {
        width: 170px;
        background-color: rgb(66, 81, 114);
        color: rgb(254, 254, 255);
      }
      .sure {
        width: 170px;
        background-color: rgb(90, 58, 208);
        color: rgb(254, 254, 255);
        margin-left: 100px;
      }
    }
  }
   .success {
    width: 429px;
    height: 85px;
    position: absolute;
    left: 50%;
    margin-left: -214px;
    top: 10px;
  }
}
  .connet_content::-webkit-scrollbar {
        width: 22px;
        height: 100%;
        background-color: rgb(117, 136, 177);
      }
  .connet_content::-webkit-scrollbar-track {
    background-color: rgb(117, 136, 177);
  } /* 滚动条的滑轨背景颜色 */

  .connet_content::-webkit-scrollbar-thumb {
    height: 120px;
    border-radius: 11px;
    background-color: rgb(48, 63, 95);
  }  
</style>

