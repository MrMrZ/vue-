<template>
   <div class="cont">
        <div class="search_left">
              <div class="search_bar">
                     <input type="text" v-model="name" @keyup.enter="search">
                     <i class="el-icon-search search_icon" @click="search"></i>
              </div>

              <div class="lists">
                      <ul class="list" ref="list" >
                        <li  :class="{'active':isDetails==index}" v-for="(item , index ) in stopList" :key="index"  @click="showDes(0,index)"  >
                            <div class="name_msg">
                              <span class="el-icon-star-on " v-if="item.work==1"></span>
                              <span class="type" v-if="item.cuisine">{{item.cuisine}}</span>

                              <span class="stopName">{{item.name}}</span>
                              <span class="distance">{{item.distance}}</span>

                            </div>
                            <div class="stop_phone">
                              <span class="price"><span> &yen; </span>{{item.per_person}}/人</span>
                              <span class="number">{{item.telphone}}</span>
                            </div>
                             <div v-show="isDetails === index">
                                <div class="location">
                                      {{item.address}} 
                            </div>
                            <div class="line"></div>
                            <div class="send_title">发送短信给用户</div>
                            <div class="_input">
                                 <div class="user_phone">手机号码:</div>
                                 <div class="input_num" @click.stop><input type="text" v-model="user_phone"></div>
                            </div>
                             <div class="_input">
                                 <div class="user_phone">称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;呼:</div>
                                 <div class="input_num w98" @click.stop><input type="text" v-model="username"></div>
                                 <div class="sex_con" @click.stop>
                                      <el-radio v-model="sex" label="1">先生</el-radio>
                                      <el-radio v-model="sex" label="2">女士</el-radio>
                                 </div>
                            </div>
                             <div class="_input" @click.stop>
                                 <div class="user_phone">用餐时间:</div>
                                 <div class="input_num">
                                    <div class="date">
                                    <el-date-picker class="select_time"
                                      v-model="eat_time"
                                      type="datetime"
                                      value-format="timestamp"
                                      placeholder=""
                                      default-time	
                                      default-value	>
                                    </el-date-picker>
                                 </div>
                                 </div>
                            </div>
                            <div class="submit" @click.stop="sendMsg(item.id,item.name)">发送短信</div>
                             </div>
                            <div class="showDes">
                              <i class="el-icon-caret-top triangle" v-if="isDetails ==index" ></i>
                              <i class="el-icon-caret-bottom triangle" v-else></i>

                            </div>
                        </li>
                      </ul>


                     
              </div>

               <div class="confirm_box" v-show="isComfirm">
                    <div class="title">向用户发送预定通知</div>

                    <ul class="message_ul">
                        <li class=""> 
                          <span>用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</span>
                           <span>{{confirmData.name}}</span>
                           <span v-if="confirmData.sex == 1">先生</span>
                           <span v-else>女士</span>
                        </li>
                         <li class=""> 
                          <span>联系电话：</span>
                           <span>{{confirmData.phone}}</span>
                        </li>
                         <li class=""> 
                            <span>预定店名：</span>
                            <span class="w200">{{confirmName}}</span>
                        </li>
                         <li class=""> 
                          <span>用餐时间：</span>
                           <span>{{confirmTime}}</span>
                        </li>
                    </ul>

                    <div class="btn_con">
                      <div class="quit" @click="isComfirm=false">取消</div>
                      <div class="sure" @click="toConfirm">确定发送</div>
                    </div>
              </div>
        </div>
        <div class="map_right " id ="container">
               <div class="msg_con" v-show="showMsg" ref="msg" >
                  <span class="el-icon-star-on" v-if="star"></span>
                  <span class="type" v-if="type">{{type}}</span>
                  <span class="stopName">{{stopName}}</span>
                  <span class="el-icon-caret-bottom triangle2"></span>
               </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      showMsg: false,
      infoWindow: "",
      map: "",
      isDetails: -1,
      stopList: [],
      isShow: 0, //是否展示详情
      name: "", //搜索

      merchantsList: [], //商家列表

      stopName: "",
      type: "",
      star: false,

      username: "",
      user_phone: "",
      sex: "",
      eat_time: new Date(),

      locationIcon: "@/assets/location@2x.png",
      centerLocation: [113.332124, 23.133135],
      markers: [], //点集合

      isComfirm: false,
      confirmData: {}, //确认消息
      confirmName: "",
      confirmTime:'',
    };
  },
  components: {},
  methods: {
    //自定义信息窗体
    createInfoWindow(content) {
      // 窗体容器
      var info = document.createElement("div");
      info.className = "msg_con";

      //  里面内容
      var star = document.createElement("span");
      var type = document.createElement("span");
      var stopName = document.createElement("span");
      var triangle = document.createElement("span");

      star.className = "el-icon-star-on";
      type.className = "type";
      stopName.className = "stopName";
      triangle.className = "el-icon-caret-bottom triangle2";

      if (content.cuisine) {
        type.innerHTML = content.cuisine;
      }

      if (content.work) {
        star.style.display = "none";
      }

      stopName.innerHTML = content.name;

      info.appendChild(star);
      info.appendChild(type);
      info.appendChild(stopName);
      info.appendChild(triangle);

      return info;
    },
    showMap(lists) {
      var that = this;
      var loca = [];

      var lnglatsArr = []; //商家经纬度数组

      for (var i = 0; i < lists.length; i++) {
        var arr = [];
        arr.push(lists[i].longitude); //经度
        arr.push(lists[i].latitude); //纬度
        lnglatsArr.push(arr); //经纬度集合
      }

      // 创建地图实例
      that.map = new AMap.Map("container", {
        zoom: 15,
        center: that.centerLocation,
        resizeEnable: true,
        icon:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png"
      });

      setTimeout(() => {
        that.map.setCenter(that.centerLocation);
        that.map.setZoom(15); //设置地图层级
      }, 1000);
      // 限制地图显示范围为中心点范围
      // var bounds = that.map.getBounds();
      // that.map.setLimitBounds(bounds);

      if (that.centerLocation) {
        var marker1 = new AMap.Marker({
          icon: "//power.anlly.net/fuyan/public/pc/current.png",
          position: that.centerLocation,
          offset: new AMap.Pixel(-13, -30)
        });
        marker1.setMap(that.map);
      }

      var lnglats = lnglatsArr;
      that.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -50)
      });

      that.markers = []; //每次push列表的时候，清空markers数组
      for (var j = 0, marker; j < lnglats.length; j++) {
        var marker = new AMap.Marker({
          position: lnglats[j],
          map: that.map,
          icon: "//power.anlly.net/fuyan/public/pc/location.png"
        });

        marker.pos = lnglats[j];
        marker.setExtData({ ext: lists[j] });

        marker.content = that.$refs.msg;
        // marker.content= that.createInfoWindow(that.merchantsList[j]);

        that.markers.push(marker);

        marker.on("click", that.markerClick);
        marker.emit("click", { target: marker });
      }
      that.map.setFitView();
    },

    // 关联右边地图商家
    connectMap(event, merchant) {
      var that = this;
      console.log(merchant, "================merchant");
      that.showMsg = true;
      that.stopName = merchant.name;
      if (merchant.cuisine) {
        that.type = merchant.cuisine;
      } else {
        that.type = "";
      }
      if (merchant.work) {
        that.star = true;
      } else {
        that.star = false;
      }
      that.map.setCenter(event.lnglat); //设置当前位置居中显示

      for (var i = 0; i < that.markers.length; i++) {
        var temp = [];
        temp.push(that.markers[i].pos[0]);
        temp.push(that.markers[i].pos[1]);
        if (JSON.stringify(temp) === JSON.stringify(event.lnglat)) {
          that.markers[i].setAnimation("AMAP_ANIMATION_BOUNCE");
        } else {
          that.markers[i].setAnimation("AMAP_ANIMATION_NONE");
        }
      }

      that.infoWindow.setContent(that.$refs.msg);
      that.infoWindow.open(that.map, event.lnglat);
    },

    //点击列表展示详情
    showDes(isShow, index) {
      var that = this;

      if (that.isDetails == index) {
        that.isDetails = -1;
        that.isShow = isShow;
      } else {
        that.isShow = isShow;
        that.isDetails = index;

        console.log(
          that.stopList[index],
          "==============当前商家============="
        );
        var lnglat = [];
        lnglat.push(that.stopList[index].longitude);
        lnglat.push(that.stopList[index].latitude);
        console.log(
          lnglat,
          "==============当前点击商家===========经纬度=========="
        );
        var clickHandler = function(e) {
          console.log(e, "========点击事件======", that.stopList[index]);
          that.connectMap(e, that.stopList[index]);
        };
        that.map.on("click", clickHandler);
        that.map.emit("click", {
          lnglat: lnglat
        });
      }
    },
    markerClick(e) {
      var that = this;
      that.showMsg = true;
      that.stopName = e.target.getExtData().ext.name;
      if (e.target.getExtData().ext.cuisine) {
        that.type = e.target.getExtData().ext.cuisine;
      } else {
        that.type = "";
      }
      if (e.target.getExtData().ext.work) {
        that.star = true;
      } else {
        that.star = false;
      }

      for (var i = 0; i < that.stopList.length; i++) {
        if (that.stopList[i].id == e.target.getExtData().ext.id) {
          that.isDetails = i;
          // that.$refs.list.scrollTop = i*152+'px';
          console.log("点击==========================匹配到同一家");
        }
        //  else{
        //   that.isDetails = -1;
        // }
      }

      for (var i = 0; i < that.markers.length; i++) {
        that.markers[i].setAnimation("AMAP_ANIMATION_NONE");
      }
      that.infoWindow.setContent(e.target.content);
      that.infoWindow.open(that.map, e.target.getPosition());
    },

    // 搜索商家
    search() {
      var that = this;
      var data = {
        name: that.name
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
          "https://power.anlly.net/fuyan/v1/service/search",
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
            if (res.data.status == "success") {
              if (res.data.list.length > 0) {
                that.stopList = res.data.list;
                setTimeout(function() {
                  var location = [];
                  that.centerLocation = [];
                  location.push(Number(res.data.location.longitude));
                  location.push(Number(res.data.location.latitude));
                  that.centerLocation = location;
                  that.showMap(that.stopList);
                  console.log(res.data, "====================商家列表");
                }, 100);
              } else {
                that.$message("暂无搜索结果");
              }

              console.log("======================搜索商家成功", red.data).list;
            } else {
              console.log(res.data, "=================请求失败");
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

    // 获取商家列表
    getStopLists() {
      var that = this;

      var token = localStorage.getItem("token");

      if (!token) {
        that.$router.push({
          name: "Login",
          params: {}
        });
        return;
      }

      console.log(token, "==========token");
      that.axios
        .get(
          "https://power.anlly.net/fuyan/v1/service/business",
          {
            // params: data,
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
            if (res.data.status == "success") {
              that.merchantsList = res.data.list;
              console.log("======================获取商家列表", res.data.list);
              setTimeout(function() {
                that.showMap(that.merchantsList);
              }, 100);
            } else {
              console.log(res.data, "=================请求失败");
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
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + ".";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + ".";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //发短信
    sendMsg(id, name) {
      var that = this;

      if (!that.username) {
        that.$message("请输入称呼");
        return;
      }

      if (!that.user_phone) {
        that.$message("请输入手机号码");
        return;
      }

      if (!that.sex) {
        that.$message("请选择性别");
        return;
      }
      if (!that.eat_time) {
        that.$message("请选择时间");
        return;
      }

      var data = {
        name: that.username,
        sex: that.sex,
        phone: that.user_phone,
        id: id,
        eat_time: that.eat_time / 1000
      };

      that.confirmData = data;
      that.confirmName = name;
      that.confirmTime = that.timestampToTime(that.eat_time);
      that.isComfirm = true;
    },

    toConfirm() {
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
        token,
        "==========token",
        that.confirmData,
        "==========请求参数"
      );
      that.axios
        .post(
          "https://power.anlly.net/fuyan/v1/service/sms",
          that.qs.stringify(that.confirmData),
          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
              // "Content-Type": "application/json; charset=utf-8"
              token: token
            }
          }
          // {
          //   xhrFields: { withCredentials: true }
          // }
        )
        .then(
          function(res) {
            if (res.data.status == "success") {
              console.log("======================发送成功", res.data.list);
              that.confirmData = {};
              that.isComfirm = false;
              that.confirmName = "";
              that.$message({
                message: "发送成功",
                type: "success"
              });
            } else {
              console.log(res.data.list, "=================发送失败");
              that.$message.error("发送失败");
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
    that.getStopLists();
    this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.cont {
  width: 100%;
  height: 1080px;
  display: flex;
  .search_left {
    // width: 570px;
    width: 35%;
    height: 1000px;
    // background-color: #cff;
    flex: auto;
    box-sizing: border-box;
    padding-top: 23px;
    padding-left: 23px;
    padding-right: 23px;
    .search_bar {
      width: 100%;
      height: 60px;
      background-color: rgb(48, 63, 95);
      border-radius: 6px;
      border: 1px solid rgb(117, 136, 177);
      input {
        width: 80%;
        height: 100%;
        background: none;
        border: none;
        outline: none;
        font-size: 40px;
        font-family: PingFang-SC-Medium;
        color: #fff;
        padding-left: 20px;
      }
      .search_icon {
        font-size: 30px;
        float: right;
        line-height: 60px;
        color: #fff;
        margin-right: 20px;
      }
    }
    .lists {
      width: 100%;
      height: 960px;
      margin-top: 20px;
      border-radius: 4px;
      background-color: rgb(48, 63, 95);
      overflow: hidden;
      position: relative;
      ul {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        li {
          box-sizing: border-box;
          padding-left: 18px;
          padding-right: 18px;
          padding-top: 19px;
          border: 2px solid rgb(117, 136, 177);
          .name_msg {
            // display: flex;
            // justify-content: flex-start;
            align-items: center;
            line-height: 30px;
            overflow: hidden;
            // border: 1px solid #000;
            .el-icon-star-on {
              color: rgb(255, 216, 0);
              font-size: 28px;
              float: left;
              margin-right: 12px;
            }
            .type {
              display: inline-block;
              min-width: 24px;
              height: 24px;
              background-color: rgb(204, 158, 90);
              text-align: center;
              line-height: 22px;
              color: #fff;
              font-size: 20px;
              font-family: PingFang-SC-Bold;
              margin-right: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
              margin-top: 4px;
            }
            .stopName {
              display: inline-block;
              width: 60%;
              font-family: PingFang-SC-Medium;
              font-size: 30px;
              color: #fff;
              // margin-left: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
            }
            .distance {
              font-family: PingFang-SC-Medium;
              color: rgb(234, 188, 119);
              font-size: 30px;
              float: right;
            }
          }
          .stop_phone {
            width: 100%;
            margin-top: 19px;
            display: flex;
            justify-content: space-around;
            .price {
              width: 35%;
              font-family: PingFang-SC-Medium;
              font-size: 28px;
              color: #fff;
              // flex: auto;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              float: left;
            }
            .number {
              width: 65%;
              margin-left: 25px;
              font-family: PingFang-SC-Medium;
              text-align: right;
              font-size: 28px;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .location {
            font-family: PingFang-SC-Medium;
            font-size: 26px;
            color: #fff;
            margin-top: 19px;
          }
          ._input {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 29px;
            .user_phone {
              font-family: PingFang-SC-Medium;
              font-size: 28px;
              color: #fff;
              flex: auto;
            }
            .input_num {
              width: 282px;
              height: 44px;
              border-radius: 4px;
              background-color: rgb(48, 63, 95);
              border: 1px solid rgb(117, 136, 177);
              margin-left: 10px;
              input {
                width: 100%;
                height: 100%;
                background: none;
                border: none;
                outline: none;
                font-family: PingFang-SC-Medium;
                font-size: 26px;
                color: #fff;
                padding-left: 11px;
              }
              /deep/.el-input__inner {
                background: none;
                color: #fff;
                font-size: 17px;
                border: none;
                margin-top: 4px;
              }
            }
            .sex_con {
              // width: 170px;
              margin-left: 10px;

              /deep/ .el-radio {
                margin-left: 5px;
              }
              /deep/ .el-radio__label {
                font-size: 21px;
                color: #fff;
              }
            }
            .w98 {
              width: 125px;
            }
          }
          .line {
            width: 100%;
            height: 2px;
            background-color: rgb(48, 63, 95);
            margin-top: 26px;
          }
          .send_title {
            color: rgb(90, 58, 208);
            font-family: AdobeHeitiStd-Regular;
            font-size: 30px;
            text-align: center;
            margin-top: 27px;
          }
          .submit {
            width: 303px;
            height: 56px;
            text-align: center;
            line-height: 56px;
            background-color: rgb(90, 58, 208);
            border-radius: 10px;
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            color: #fff;
            margin: 34px auto 10px;
          }
          .showDes {
            width: 100%;
            overflow: hidden;
            .triangle {
              float: right;
              color: rgb(117, 136, 177);
              font-size: 40px;
            }
          }
        }
        .active {
          background-color: rgb(10, 25, 58);
        }
      }

      .list::-webkit-scrollbar {
        width: 22px;
        height: 100%;
        background-color: rgb(117, 136, 177);
      }
      .list::-webkit-scrollbar-track {
        background-color: rgb(117, 136, 177);
      } /* 滚动条的滑轨背景颜色 */

      .list::-webkit-scrollbar-thumb {
        height: 120px;
        border-radius: 11px;
        background-color: rgb(48, 63, 95);
      } /* 滑块颜色 */
    }
    .confirm_box {
      width: 609px;
      height: 453px;
      background-color: rgb(24, 43, 86);
      border-radius: 15px;
      border: 4px solid rgb(117, 136, 177);
      position: absolute;
      left: 134px;
      top: 290px;
      z-index: 22;
      .title {
        width: 100%;
        height: 91px;
        text-align: center;
        line-height: 91px;
        color: #fff;
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        border-bottom: 4px solid rgb(48, 63, 95);
      }
      .message_ul {
        width: 100%;
        box-sizing: border-box;
        padding-left: 67px;
        padding-top: 28px;
        li {
          font-family: PingFang-SC-Medium;
          font-size: 32px;
          color: #fff;
          margin-top: 10px;
        }
        .w200 {
          display: inline-block;
          width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .btn_con {
        width: 100%;
        height: 60px;
        display: flex;
        flex: auto;
        box-sizing: border-box;
        padding-left: 80px;
        margin-top: 38px;
        div {
          border-radius: 10px;
          height: 60px;
          text-align: center;
          font-family: PingFang-SC-Medium;
          font-size: 32px;
          line-height: 60px;
          color: rgb(254, 254, 255);
        }
        .quit {
          width: 170px;
          height: 100%;
          background-color: rgb(66, 81, 114);
        }
        .sure {
          width: 247px;
          height: 100%;
          background-color: rgb(90, 58, 208);
          margin-left: 32px;
        }
      }
    }
  }
  .map_right {
    width: 65%;
    height: 100%;
    background-color: #ffc;
    flex: auto;
    div.msg_con {
      width: 250px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      position: relative;
      z-index: 9999;
      background-color: rgb(30, 39, 58);
      color: #fff;
      border-radius: 6px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      padding-left: 5px;
      padding-right: 5px;
      .el-icon-star-on {
        color: rgb(255, 216, 0);
        font-size: 28px;
      }
      .type {
        display: inline-block;
        min-width: 50px;
        height: 24px;
        background-color: rgb(204, 158, 90);
        text-align: center;
        line-height: 22px;
        color: #fff;
        font-size: 20px;
        font-family: PingFang-SC-Bold;
        margin-left: 5px;
      }
      .stopName {
        display: inline-block;
        width: 80%;
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 5px;
      }
      .triangle2 {
        color: rgb(30, 39, 58);
        font-size: 30px;
        position: absolute;
        left: 45%;
        bottom: -16px;
      }
    }
  }

  #container {
    width: 75%;
    height: 100%;
    background-color: #ffc;
    flex: auto;
  }
}
</style>

