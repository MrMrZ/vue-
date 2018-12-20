<template>
   <div class="connet_content">
           <div class="_table">
             <!-- 表格数据 -->
               <el-table
                    :data="data"
                     
                    style="width: 100%;">
                    <el-table-column
                      label="用户信息"
                      width="338"
                      height="155"
                      class="cell"  > 
                      <template slot-scope="scope">
                           <div class="user_phone" >
                              <div class="call_time" >
                                  <img class="phone_icon" src="../assets/user@2x.png" alt="">
                                   <span style="margin-left:20px">{{scope.row.username}}</span>
                            </div>
                            <div class="call_time mt31">
                                  <img class="phone_icon" src="../assets/user_phone@2x.png" alt="">
                                   <span style="margin-left:20px">{{scope.row.phoneNum}}</span>
                            </div>
                           </div>
                      </template> 
                    </el-table-column>
                    <el-table-column
                      label="预约商家信息"
                      width="1270"
                          height="155">
                     <template slot-scope="scope"  >
                         <div class="msg_con">
                         <div class="left">
                           <div class="merchant">
                               <img src="../assets/merchant@2x.png" alt="" style="margin-top:8px">
                               <span>{{scope.row.merchant}}</span>
                           </div>
                           <div class="merchantPhone">
                              <img src="../assets/phone@2x.png" alt="" style="margin-top:2px">
                               <span>{{scope.row.merchantPhone}}</span>
                           </div>
                        </div>
                        <div class="middle">
                              <div class="roomNum">
                                <img src="../assets/room@2x.png" alt="" style="margin-top:4px">
                                <span>{{scope.row.roomNum}}</span>
                              </div>
                                 <div class="orderTime">
                                <img src="../assets/time@2x.png" alt="">
                                <span>{{scope.row.orderTime}}</span>
                              </div>
                        </div>
                        <div class="right">
                              <div class="quit" v-if="scope.row.status==1" @click="toQuit">取消订单</div>
                              <div class="quit has_quit" v-else>已取消</div>

                        </div>
                         </div>
                     </template>
                    </el-table-column>
                  
               </el-table>

               


               <!-- 取消成功 -->
               <div class="success" v-show="false">
                  <img src="../assets/quit_success@2x.png" alt="">
               </div>
           </div>


           <!-- 弹窗，确认关联 -->
               <div class="confirm_box" v-show="isQuit">
                 <div class="title">是否确认取消？</div>
                 <div class="btn">
                     <div class="quit" @click="isQuit=false">取消</div>
                     <div class="sure">确认取消</div>

                 </div>
               </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          username: "林夕女士",
          phoneNum: "18813960131",
          merchant: "大舜丽池国际酒店(汉正街一号)中山大道",
          orderTime: "2018-12-18  12:00",
          roomNum: "沈阳站",
          merchantPhone: "18816898887",
          status: 1
        },
        {
          username: "张女士",
          phoneNum: "18813960131",
          merchant: "苏子花艺西餐厅",
          orderTime: "2018-12-18  12:00",
          roomNum: "沈阳站",
          merchantPhone: "18816898887",
          status: 1
        },
        {
          username: "彭于晏先生",
          phoneNum: "18813960131",
          merchant: "水锅锅海鲜蒸汽料理",
          orderTime: "2018-12-18  12:00",
          roomNum: "沈阳站",
          merchantPhone: "18816898887",
          status: 0
        }
      ],
      isQuit: false //是否确认取消
    };
  },
  components: {},
  methods: {
    // 是否取消
    toQuit() {
      var that = this;
      that.isQuit = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.connet_content {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  ._table {
    width: 1614px;
    // height: 780px;
    // border: 1px solid #fcc;
    margin: 48px auto;
    .connet_icon {
      width: 100%;
      height: 100%;
      text-align: center;
      img {
        width: 76px;
        height: 78px;
      }
    }
    .user_phone {
      width: 100%;
      height: 100%;
      text-align: center;
      box-sizing: border-box;
      padding-left: 47px;
      .call_time {
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #fff;
        display: flex;
        justify-content: flex-start;
      }
      .mt31 {
        margin-top: 31px;
      }
    }

    .msg_con {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      .left {
        width: 550px;
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #fff;
        box-sizing: border-box;
        padding-top: 38px;
        padding-left: 48px;
        img {
          width: 22px;
        }
        span {
          display: inline-block;
          width: 450px;
          line-height: 1;
          margin-left: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .merchantPhone {
          margin-top: 30px;
        }
      }
      .middle {
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #fff;
        box-sizing: border-box;
        padding-top: 38px;
        padding-left: 48px;

        img {
          width: 22px;
        }
        span {
          margin-left: 15px;
        }
        .orderTime {
          margin-top: 30px;
        }
      }
      .right {
        box-sizing: border-box;
        padding-top: 49px;
        padding-bottom: 49px;
        padding-left: 120px;

        .quit {
          width: 175px;
          height: 64px;
          border-radius: 10px;
          background-color: rgb(90, 58, 208);
          text-align: center;
          line-height: 64px;
          font-size: 32px;
          font-family: PingFang-SC-Medium;
          color: #fff;
        }
        .has_quit {
          background-color: rgb(46, 60, 89);
        }
      }
    }

    //选中行为背景色
    .bg_active {
      background-color: rgb(36, 50, 80);
    }
    .bdt {
      // border-top: 2px solid rgb(117, 136, 177);
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
    /deep/ .el-table::before {
      height: 0;
    }
    /deep/.el-table--border::after,
    .el-table--group::after {
      width: 0px !important;
    }
    /deep/ .has-gutter .cell {
      height: 93px;
      line-height: 93px;
    }
    /deep/ .has-gutter tr th {
      border-bottom: 2px solid rgb(117, 136, 177);
    }
    /deep/ .el-table--border th {
      border-right: 2px solid rgb(117, 136, 177);
    }
    /deep/ .has-gutter tr th {
      // border-bottom: 2px solid rgb(117, 136, 177);
      border: 2px solid rgb(117, 136, 177);
    }
    /deep/ .has-gutter tr th:nth-child(1) {
      border-right: none;
    }
    /deep/ .has-gutter tr th:nth-child(3) {
      // border-left:none;
    }
    /deep/ .el-table__row {
      background-color: rgb(24, 33, 53);
      color: #fff;
    }

    /deep/ .el-table__row td {
      padding: 0;
      // border: 2px solid rgb(117, 136, 177);
      border-left: 2px solid rgb(117, 136, 177);
      border-bottom: 2px solid rgb(117, 136, 177);
      border-right: 2px solid rgb(117, 136, 177);
    }
    /deep/ .el-table__row td:first-child {
      padding: 0;
      border-right: none;
    }

    /deep/ .el-table__row .cell {
      padding: 0;
    }
    /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgb(24, 33, 53);
    }
    /deep/ .el-table__row {
      .el-table_1_column_1 {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .el-table--border th,
    .el-table__fixed-right-patch {
      border-bottom: none;
    }
    /deep/.el-table,
    .el-table__expanded-cell {
      background-color: none;
    }
  }
  .confirm_box {
    width: 609px;
    height: 269px;
    border: 4px solid rgb(117, 136, 177);
    background-color: rgb(24, 43, 86);
    border-radius: 15px;
    position: absolute;
    left: 50%;
    margin-left: -305px;
    top: 10px;
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
      }
      .quit {
        width: 170px;
        background-color: rgb(66, 81, 114);
        color: rgb(254, 254, 255);
      }
      .sure {
        width: 247px;
        background-color: rgb(90, 58, 208);
        color: rgb(254, 254, 255);
        margin-left: 32px;
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
</style>

