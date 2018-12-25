<template>
   <div class="connet_content">
          <!-- <Search></Search> -->
            <div class="search_content">
              <div class="search" v-show="true">
                    <i class="el-icon-search search_icon" @click="getList(2)"></i>
                    <input type="text" placeholder="输入完整手机号" v-model="phoneNum" @input="getList(2)"  maxlength="11">
                </div>
                <div class="line" v-show="true"></div>
            </div>
                
           <div class="_table" :class="{'bdt':list.length>3}">
             <!-- 表格数据 -->
               <el-table
                    :data="list"
                     height="620"
                    style="width: 100%;">
                    <el-table-column
                      label="用户信息"
                      width="281"
                      height="93"
                      class="cell"  > 
                      <template slot-scope="scope" class="usermsg">
                           <div class="user_phone"  @click="toDetails(scope.row)" >
                              <div class="call_time" >
                                   <!-- <img class="user_icon" src="../assets/user@2x.png" alt=""> -->
                                   <span style="margin-left:20px">{{scope.row.uid}}</span>
                            </div>
                            <div class="call_time mt31">
                                  <!-- <img class="phone_icon" src="../assets/user_phone@2x.png" alt=""> -->
                                   <span style="margin-left:20px">{{scope.row.phone}}</span>
                            </div>
                           </div>
                      </template> 
                    </el-table-column>
                    <el-table-column
                      label="预约商家信息"
                      width="1282"
                          height="93">
                     <template slot-scope="scope"  >
                         <div class="msg_con">
                         <div class="left">
                           <div class="merchant">
                               <!-- <img src="../assets/merchant@2x.png" alt="" style="margin-top:8px"> -->
                               <span class="w450">{{scope.row.name}}</span>
                           </div>
                           <div class="merchantPhone">
                              <!-- <img src="../assets/phone@2x.png" alt="" style="margin-top:2px"> -->
                              <span>商家电话：</span>
                               <span>{{scope.row.telphone}}</span>
                           </div>
                        </div>
                        <div class="middle">
                              <div class="roomNum">
                                <!-- <img src="../assets/room@2x.png" alt="" style="margin-top:4px"> -->
                              <span>预约房号：</span>

                                <span>{{scope.row.room_name}}</span>
                              </div>
                                 <div class="orderTime">
                                <!-- <img src="../assets/time@2x.png" alt=""> -->
                                 <span>预约时间：</span>
                                 <span>{{scope.row.eat_time}}</span>
                              </div>
                        </div>
                        <div class="right">
                              <div class="quit"   v-if="scope.row.status==4" @click="toQuit(scope.row.id)">取消订单</div>
                              <div class="quit has_quit" v-else>已取消</div>

                        </div>
                         </div>
                     </template>
                    </el-table-column>
                  
               </el-table>

               <!-- 取消成功 -->
               <div class="success" v-show="success">
                  <img src="../assets/quit_success@2x.png" alt="">
               </div>
           </div>


        <!-- 弹窗，确认关联 -->
        <div class="confirm_box" v-show="isQuit">
          <div class="title">是否确认取消？</div>
          <div class="btn">
              <div class="quit" @click="isQuit=false">不了</div>
              <div class="sure" @click="Quit">确认</div>

          </div>
        </div>
    </div>
</template>

<script>
import Search from "./Search";
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
        },
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
      list: [], //订单列表
      isQuit: false, //是否确认取消
      quitId: "",
      success: false,
      phoneNum:''
    };
  },
  components: {
    Search
  },
  methods: {
    // 是否取消
    toQuit(id) {
      var that = this;
      that.isQuit = true;
      that.quitId = id;
    },

    //获取订单列表
    getList(type) {
      var that = this;
      var data = {};

      if(type==1){
           data = {
                type: type
             };
      }else if(type==2){
         data = {
                type: type,
                phone:that.phoneNum
          };
      }
     
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
        "===================请求参数222",
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
        .get("https://power.anlly.net/fuyan/v1/service/order", {
          params: data,
          headers: {
            token: token
          }
        })
        .then(
          function(res) {
            console.log(res.data.list, "=================获取订单列表成功");
            if (res.data.status == "success") {
              loading.close();
              if (res.data.list) {
                that.list = res.data.list;
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
    // 取消订单
    Quit() {
      var that = this;
      var data = {};
      data.id = that.quitId;
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
        .put("https://power.anlly.net/fuyan/v1/service/order", data, {
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Content-Type": "application/json; charset=utf-8"
            token: token
          }
        })
        .then(
          function(res) {
            console.log(res.data, "=================取消成功");
            if (res.data.status == "success") {
              loading.close();
              that.isQuit = false;
              that.success = true;
              that.getList();
              setTimeout(function() {
                that.success = false;
              }, 1000);
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
              console.log(err.response, "=================失败");
              loading.close();
              that.$message({
                message: "登录超时，请重新登录",
                type: "error",
                center: true
              });
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

    // 跳转订单详情
    toDetails(item) {
      var that = this;
      localStorage.setItem("phone", item.phone);
      that.$router.push({
        name: "Details",
        params: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    var that = this;
    that.getList(1);
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
        top: 60px;
        right: 50%;
        margin-right: -220px;
        z-index: 22;
      }
      .el-icon-search {
        font-size: 34px;
      }
    }
    .line {
      width: 88.5%;
      height: 2px;
      background-color: rgb(72, 92, 133);

      margin-top: 148px;
      margin-left: 98px;
    }
  }

  ._table {
    // width: 1614px;
    width: 1563px;
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
      padding-left: 32px;

      .call_time {
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #fff;
        display: flex;
        justify-content: flex-start;
        -moz-user-select: none; /* Firefox私有属性 */
        -webkit-user-select: none; /* WebKit内核私有属性 */
        -ms-user-select: none; /* IE私有属性(IE10及以后) */
        -khtml-user-select: none; /* KHTML内核私有属性 */
        -o-user-select: none; /* Opera私有属性 */
        user-select: none; /* CSS3属性 */
        .user_icon {
          width: 22px;
          height: 25px;
        }
        .phone_icon {
          width: 21px;
          height: 26px;
        }
      }
      .mt31 {
        margin-top: 31px;
      }
    }

    .msg_con {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      -moz-user-select: none; /* Firefox私有属性 */
      -webkit-user-select: none; /* WebKit内核私有属性 */
      -ms-user-select: none; /* IE私有属性(IE10及以后) */
      -khtml-user-select: none; /* KHTML内核私有属性 */
      -o-user-select: none; /* Opera私有属性 */
      user-select: none; /* CSS3属性 */
      .left {
        width: 460px;
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #fff;
        box-sizing: border-box;
        padding-top: 38px;
        padding-left: 38px;
        img {
          width: 22px;
        }
        span {
          display: inline-block;
          // width: 450px;
          line-height: 1;
          // margin-left: 15px;
        }
        .w450 {
          color: rgb(101, 144, 238);
          width: 384px;
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
        padding-left: 10px;
        img {
          width: 22px;
        }
        span {
          margin-left: 15px;
          display: inline-block;
          line-height: 1;

          // width: 200px;
        }
        .orderTime {
          width: 100%;
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
      font-weight: normal;
      padding: 0;
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
      cursor: pointer;
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
      background: none;
      // background-color: #fcc;
    }
  }
  .bdt {
    border-bottom: 2px solid rgb(117, 136, 177);
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
</style>

