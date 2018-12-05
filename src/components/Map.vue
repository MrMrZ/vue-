<template>
   <div class="cont">
        <div class="search_left">
              <div class="search_bar">
                     <input type="text">
                     <i class="el-icon-search search_icon"></i>
              </div>

              <div class="lists">
                      <ul class="list">
                        <li  :class="{'active':isDetails==1}">
                            <div class="name_msg">
                              <span class="el-icon-star-on "></span>
                              <span class="type">粤</span>
                              <span class="stopName">大舜丽池(天河区中山大道西汉正街一号)</span>
                            </div>
                            <div class="stop_phone">
                              <span class="price">188/元</span>
                              <span class="number">020-23360089</span>
                            </div>
                             <div v-show="isDetails === 1">
                                <div class="location">
                              广州天河区林和西路中信广场大厦旁
                            </div>
                            <div class="_input">
                                 <div class="user_phone">手机号:</div>
                                 <div class="input_num"><input type="text"></div>
                            </div>
                             <div class="_input">
                                 <div class="user_phone">称呼:</div>
                                 <div class="input_num w90"><input type="text"></div>
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
                            <div class="submit">发送短信</div>
                             </div>
                            <div class="showDes">
                              <i class="el-icon-caret-top triangle" v-show="isDetails == 0" @click="showDes(1)"></i>
                              <i class="el-icon-caret-bottom triangle" v-show="isDetails ==1"  @click="showDes(0)"></i>

                            </div>
                        </li>
                        <li>
                            <div class="name_msg">
                              <span class="el-icon-star-on "></span>
                              <span class="type">粤</span>
                              <span class="stopName">大舜丽池(天河区中山大道西汉正街一号)</span>
                            </div>
                            <div class="stop_phone">
                              <span class="price">188/元</span>
                              <span class="number">020-23360089</span>
                            </div>
                            <div class="showDes">
                              <i class="el-icon-caret-top triangle"></i>
                            </div>
                        </li>
                           <li>
                            <div class="name_msg">
                              <span class="el-icon-star-on "></span>
                              <span class="type">粤</span>
                              <span class="stopName">大舜丽池(天河区中山大道西汉正街一号)</span>
                            </div>
                            <div class="stop_phone">
                              <span class="price">188/元</span>
                              <span class="number">020-23360089</span>
                            </div>
                            <div class="showDes">
                              <i class="el-icon-caret-top triangle"></i>
                            </div>
                        </li>
                           <li>
                            <div class="name_msg">
                              <span class="el-icon-star-on "></span>
                              <span class="type">粤</span>
                              <span class="stopName">大舜丽池(天河区中山大道西汉正街一号)</span>
                            </div>
                            <div class="stop_phone">
                              <span class="price">188/元</span>
                              <span class="number">020-23360089</span>
                            </div>
                            <div class="showDes">
                              <i class="el-icon-caret-top triangle"></i>
                            </div>
                        </li>
                           <li>
                            <div class="name_msg">
                              <span class="el-icon-star-on "></span>
                              <span class="type">粤</span>
                              <span class="stopName">大舜丽池(天河区中山大道西汉正街一号)</span>
                            </div>
                            <div class="stop_phone">
                              <span class="price">188/元</span>
                              <span class="number">020-23360089</span>
                            </div>
                            <div class="showDes">
                              <i class="el-icon-caret-top triangle"></i>
                            </div>
                        </li>
                      </ul>
              </div>
        </div>
        <div class="map_right " id ="container">
               <div class="msg_con" v-show="showMsg" ref="msg">
                 <span class="el-icon-star-on "></span>
                  <span class="type">粤</span>
                  <span class="stopName">大舜丽池</span>
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
      sex: "",
      eat_time: new Date(),
      isDetails: 0
    };
  },
  components: {},
  methods: {
    showMap() {
      var that = this;
      // 创建地图实例
      that.map = new AMap.Map("container", {
        zoom: 13,
        center: [116.4, 39.92],
        resizeEnable: true
      });

      // // 创建一个 Marker 实例：
      // var marker = new AMap.Marker({
      //   position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //   title: "北京"
      // });

      // // 将创建的点标记添加到已有的地图实例：
      // map.add(marker);

      // //使用上面例子已有的地图和点标记
      // var infoWindow = new AMap.InfoWindow({
      //   // isCustom: true, //使用自定义窗体
      //   // content:"<div>信息窗体内容1</div><div>信息窗体内容2</div><div>信息窗体内容3</div>",//信息窗体的内容
      //   content:that.$refs.msg,
      //   offset: new AMap.Pixel(16, -45) //窗体位置的偏移量
      // });
      // //当点击点标记时出现信息窗体
      // AMap.event.addListener(marker, "click", function() {
      //      that.showMsg = true;
      //      infoWindow.open(map, marker.getPosition());
      // });

      var lnglats = [
        [116.368904, 39.923423],
        [116.382122, 39.921176],
        [116.387271, 39.922501],
        [116.398258, 39.9146]
      ];
      that.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -50)
      });
      for (var i = 0, marker; i < lnglats.length; i++) {
        var marker = new AMap.Marker({
          position: lnglats[i],
          map: that.map
        });
        marker.content = that.$refs.msg;
        marker.on("click", that.markerClick);
        marker.emit("click", { target: marker });
      }
      that.map.setFitView();
    },
    showDes(index) {
      var that = this;
      that.isDetails = index;
    },
    markerClick(e) {
      var that = this;
      that.showMsg = true;
      that.infoWindow.setContent(e.target.content);
      that.infoWindow.open(that.map, e.target.getPosition());
    }
  },
  mounted() {
    var that = this;
    that.showMap();
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
    height: 1080px;
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
      height: 970px;
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
              width: 24px;
              height: 24px;
              background-color: rgb(204, 158, 90);
              text-align: center;
              line-height: 22px;
              color: #fff;
              font-size: 20px;
              font-family: PingFang-SC-Bold;
              margin-left: 12px;
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
            .price {
              font-family: PingFang-SC-Medium;
              font-size: 30px;
              color: #fff;
              flex: auto;
            }
            .number {
              margin-left: 25px;
              font-family: PingFang-SC-Medium;
              font-size: 30px;
              color: #fff;
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
    .msg_con {
      // width: 209px;
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
        width: 24px;
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
      .triangle2{
        color:rgb(30,39,58);
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

