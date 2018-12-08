<template>
   <div class="cont">
        <div class="search_left">
              <div class="search_bar">
                     <input type="text" v-model="name" @keyup="search">
                     <i class="el-icon-search search_icon" @click="search"></i>
              </div>

              <div class="lists">
                      <ul class="list" ref="list">
                        <li  :class="{'active':isDetails==index}" v-for="(item , index ) in stopList" :key="index" >
                            <div class="name_msg">
                              <span class="el-icon-star-on " v-if="item.work==1"></span>
                              <span class="type" v-if="item.cuisine">{{item.cuisine}}</span>

                              <span class="stopName">{{item.name}}</span>
                            </div>
                            <div class="stop_phone">
                              <span class="price"><span> &yen; </span>{{item.per_person}}/元</span>
                              <span class="number">{{item.telphone}}</span>
                            </div>
                             <div v-show="isDetails === index">
                                <div class="location">
                                      {{item.address}} 
                            </div>
                            <div class="_input">
                                 <div class="user_phone">手机号:</div>
                                 <div class="input_num"><input type="text" v-model="user_phone"></div>
                            </div>
                             <div class="_input">
                                 <div class="user_phone">称呼:</div>
                                 <div class="input_num w90"><input type="text" v-model="username"></div>
                                 <div class="sex_con">
                                      <el-radio v-model="sex" label="1">先生</el-radio>
                                      <el-radio v-model="sex" label="2">女士</el-radio>
                                 </div>
                            </div>
                             <div class="_input">
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
                            <div class="submit" @click="sendMsg(item.id)">发送短信</div>
                             </div>
                            <div class="showDes">
                              <i class="el-icon-caret-bottom triangle" v-show="isShow == 0 
                              " @click="showDes(1,index)"></i>
                              <i class="el-icon-caret-top triangle" v-show="isShow == 1"  @click="showDes(0,index)"></i>
                            </div>
                        </li>
                      </ul>
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
      centerLocation: [113.332124, 23.133135]
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
        zoom: 13,
        center: that.centerLocation,
        resizeEnable: true,
        icon:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png"
      });

      if(that.centerLocation){
         var marker1 = new AMap.Marker({
            icon: "//power.anlly.net/fuyan/public/pc/current.png",
            position:that.centerLocation,
            offset: new AMap.Pixel(-13, -30)
        });
          marker1.setMap(that.map);
      }

      var lnglats = lnglatsArr;
      that.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -50)
      });

      for (var j = 0, marker; j < lnglats.length; j++) {
        var marker = new AMap.Marker({
          position: lnglats[j],
          map: that.map,
          icon: "//power.anlly.net/fuyan/public/pc/location.png"
        });
        marker.setExtData({ ext: that.merchantsList[j] });

        marker.content = that.$refs.msg;

        marker.on("click", that.markerClick);
        marker.emit("click", { target: marker });
      }
      that.map.setFitView();
    },
    showDes(isShow, index) {
      var that = this;
      if (that.isDetails == index) {
        that.isDetails = -1;
        that.isShow = isShow;
      } else {
        that.isShow = isShow;
        that.isDetails = index;
      }
    },
    markerClick(e) {
      var that = this;
      that.showMsg = true;
      // e.target.getExtrData().ext;
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
          // var r_h = i*152;
          // that.$refs.list.animate({ scrollTop: r_h }, 800)
        }
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
              that.stopList = res.data.list;
              setTimeout(function() {
                that.showMap(that.merchantsList);
                var location = [];
                 that.centerLocation = [];
                location.push(Number(res.data.location.longitude));
                location.push(Number(res.data.location.latitude));
                that.centerLocation = location;
                console.log(
                  location,
                  "=====================location"
                );
              }, 100);

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

    //发短信
    sendMsg(id) {
      var that = this;
      var data = {
        name: that.username,
        sex: that.sex,
        phone: that.user_phone,
        id: id,
        eat_time: that.eat_time / 1000
      };
      var token = localStorage.getItem("token");

      if (!token) {
        that.$router.push({
          name: "Login",
          params: {}
        });
        return;
      }

      console.log(token, "==========token", data, "==========请求参数");
      that.axios
        .post(
          "https://power.anlly.net/fuyan/v1/service/sms",
          that.qs.stringify(data),
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
              that.merchantsList = res.data.list;
              console.log("======================发送成功", res.data.list);
              setTimeout(function() {
                that.showMap(that.merchantsList);
              }, 100);
            } else {
              console.log(res.data.list, "=================发送失败");
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
    width: 26%;
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
      height: 930px;
      margin-top: 20px;
      border-radius: 4px;
      background-color: rgb(48, 63, 95);
      overflow: hidden;
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
            display: flex;
            justify-content: flex-start;
            align-items: center;
            line-height: 30px;
            .el-icon-star-on {
              color: rgb(255, 216, 0);
              font-size: 28px;
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
              margin-left: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .stopName {
              display: inline-block;
              width: 80%;
              font-family: PingFang-SC-Medium;
              font-size: 30px;
              color: #fff;
              margin-left: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
            margin-top: 19px;
            .user_phone {
              font-family: PingFang-SC-Medium;
              font-size: 26px;
              color: #fff;
              flex: auto;
            }
            .input_num {
              width: 236px;
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
            .w90 {
              width: 90px;
            }
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
        width: 0 !important;
      }
    }
  }
  .map_right {
    width: 75%;
    height: 100%;
    background-color: #ffc;
    flex: auto;
    div.msg_con {
      min-width: 209px;
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
        min-width: 24px;
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

