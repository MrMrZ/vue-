<template>
   <div class="content2"   v-show="isRouterAlive">
     

        <!-- 用户信息 -->
        <div class="message">
              <div class="phone">{{showInfo.phone}}</div>
              <div class="details">
                   <div class="msg_con">
                       <div class="_input">
                          <div class="left">称&nbsp;&nbsp;&nbsp;呼：</div>
                          <div  class="input_name" >
                            <input type="text" v-model="showInfo.realname" :class="{'active':isEdit}" :readonly="!isEdit" >
                          </div>
                          <div class="sex_con">
                              <el-radio class="sex" v-model="showInfo.sex" label="1" :disabled="!isEdit" style="font-size:40px">先生</el-radio>
                              <el-radio class="sex" v-model="showInfo.sex" label="2" :disabled="!isEdit">女士</el-radio>
                          </div>
                        </div>

                         <div class="_input w1000">
                          <div class="left lh68">备&nbsp;&nbsp;&nbsp;注：</div>
                          <div  class="input_name w200" >
                            <div class="show_remarks" v-if="!isEdit"> {{showInfo.remarks}}</div>
                            <textarea type="text" class="active" v-model="showInfo.remarks"  :readonly="!isEdit"  v-else></textarea>
                           
                            <!-- <textarea type="text" :class="{'active':isEdit}" v-model="showInfo.remarks"  :readonly="!isEdit" ></textarea> -->
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
                  <div class="add_record" @click="isAddRecord=true" v-show="false">新增记录</div>
              </div>

              <div class="record_list" :class="{'pgtb':list.length>0}" v-show="list.length>0">
                <div  v-for="item in list" :key="item.id">
                      <div class="time">{{item.day}}</div>
                      <div class="lists" v-for="(item1) in item.list" :key="item1.id">
                              <ul>
                                <li class="_record">
                                   <div v-if="item1.type == 1">
                                      <div class="phone_icon" v-if="item1.caty == 1"> <img src="../assets/call_in.png" alt=""></div>
                                      <div class="phone_icon" v-else-if="item1.caty == 2"> <img src="../assets/call_out.png" alt=""></div>
                                   </div>
                                   <div class="msg_icon" v-else-if="item1.type==2">  <img src="../assets/message@2x.png" alt=""></div>
                                    <div class="start_time">{{item1.start_time}}</div>
                                    <div class="line">|</div>
                                    <div class="howlong" v-show="item1.type==1">{{item1.talk_time}}分钟</div>
                                    <div class="line" v-show="item1.type==1">|</div>
                                    <textarea class="des w50  modify_txt"   v-if="isModify === item1.id"  v-show="item1.type==1" v-model="item1.remarks"></textarea>
                                    <div class="des w50 "    v-else  v-show="item1.type==1"  > {{item1.remarks}}</div>

                                    <!-- <textarea class="des w50 "  :disabled="isModify !== item1.id" :class="{'modify_txt':isModify === item1.id}" v-show="item1.type==1" v-model="item1.remarks"></textarea> -->
                                    <div class="des w50" v-show="item1.type==2">{{item1.name}}&nbsp;&nbsp;&nbsp;{{item1.eat_time}}</div>
                                    <div class="el-icon-edit modify"  v-show="item1.type==1 &&isModify!=item1.id " @click="AMend(item1.id)" ></div>
                                    <div class="el-icon-check sureModify" v-show="item1.type==1 && isModify === item1.id" @click="toAmend(item1.id,item1.remarks)" ></div>


                                </li>
                              </ul>
                      </div> 
                </div>
                      
              </div>
        </div>

  
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
                      format="yyyy-MM-dd HH:mm"
                      placeholder=""
                      default-time	
                      default-value	>
                    </el-date-picker>
                </div>
                <div class="long">
                     <input class="minute"  type="number" v-model="talk_time" min='1'>
                     分钟
                </div>
              </div>
            </div>
          </div>


           <div class="remark_con">
             <div class="add_remark">备注</div>
              <div class="add_txt">
                <!-- <input type="text" v-model="remarks" > -->
                <textarea name="" id=""  v-model="remarks"></textarea>
            </div>
           
           </div>

            <div class="more" v-show="false">
                  <div class="more_txt" >
                        <span>更多</span>
                          <i class="el-icon-caret-bottom  triangle" v-show="isShowOthers==2" @click="showMore(2)"></i>
                          <i class="el-icon-caret-top  triangle" v-show="isShowOthers==1" @click="showMore(1)"></i>
                  </div>

                  <div class="more_list" v-show="isShowOthers==2">
                        <ul>
                          <li  class="more_item">
                             <el-select v-model="cars" placeholder="车辆" class="more_sel" >
                                <el-option
                                  v-for="item in options1"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </li>
                          <li  class="more_item">
                            <el-select v-model="jobs" placeholder="职业" class="more_sel" >
                                <el-option
                                  v-for="item in optioins2"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </li>
                         
                          <li  class="more_item" >
                             <el-select v-model="marriage" placeholder="婚姻" class="more_sel" >
                                <el-option
                                  v-for="item in options3"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </li >
                            <li  class="more_item" style="margin-right:0">
                             <el-select v-model="years" placeholder="年龄" class="more_sel" >
                                <el-option
                                  v-for="item in options4"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </li>
                            <li  class="more_item">
                              <el-select v-model="kids" placeholder="孩子" class="more_sel" >
                                <el-option
                                  v-for="item in options5"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </li>
                        
                          
                          <li  class="more_item">
                              <el-select v-model="areas" placeholder="地点" class="more_sel" >
                                <el-option
                                  v-for="item in options6"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </li>
                        </ul>
                  </div>
            </div>
            <div class="button_con">
                 <div class="sure" @click="addRecord" >新增记录</div>
                 <div class="no"  @click="clearInput" >取消</div>
            </div>
        </div>
        <!-- 添加记录弹框 --> 
      </div>

</template>

<script>
import Search from "./Search";

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
      start_time: new Date(), //通话开始时间
      remarks: "", //备注
      username: "",
      id: "", //当前用户id
      info: {
        //存储信息的
        // id: "",
        // phone: "",
        // realname: "",
        // remarks: "",
        // sex: "1",
      },

      showInfo: {}, //展示用户信息的

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
      ],

      options1: [
        {
          label: "1辆",
          value: "1"
        },
        {
          label: "2辆",
          value: "2"
        }
      ], //车辆
      optioins2: [
        {
          label: "老板",
          value: "1"
        },
        {
          label: "业务",
          value: "2"
        },
        {
          label: "其他",
          value: "3"
        }
      ], //职业
      options3: [
        {
          label: "未婚",
          value: "1"
        },
        {
          label: "已婚",
          value: "2"
        }
      ], //婚姻
      options4: [
        {
          label: "18~25",
          value: "1"
        },
        {
          label: "26~30",
          value: "2"
        },
        {
          label: "30~40",
          value: "3"
        },
        {
          label: "40以上",
          value: "4"
        }
      ], //年龄
      options5: [
        {
          label: "1个",
          value: "1"
        },
        {
          label: "2个",
          value: "2"
        },
        {
          label: "2个以上",
          value: "3"
        }
      ], //孩子
      options6: [
        {
          label: "海珠",
          value: "1"
        },
        {
          label: "越秀",
          value: "2"
        },
        {
          label: "天河",
          value: "3"
        },
        {
          label: "白云",
          value: "4"
        },

        {
          label: "荔湾",
          value: "5"
        },
        {
          label: "萝岗",
          value: "6"
        },
        {
          label: "南沙",
          value: "7"
        },
        {
          label: "花都",
          value: "8"
        },
        {
          label: "番禺",
          value: "9"
        },
        {
          label: "黄埔",
          value: "10"
        }
      ], //地点
      cars: "",
      jobs: "",
      marriage: "",
      years: "",
      kids: "",
      areas: "",
      isShowOthers: 1,
      isRouterAlive: true,

      isModify: -1
    };
  },
  components: {
    Search
  },

  methods: {
    AMend(index) {
      var that = this;
      that.isModify = index;
    },
    // 取消，清空输入框
    clearInput() {
      var that = this;
      that.caty = "";
      that.talk_time = "";
      that.start_time = "";
      that.remarks = "";
    },
    // 是否展示更多
    showMore(index) {
      var that = this;
      if (index == 2) {
        that.isShowOthers = 1;
      } else {
        that.isShowOthers = 2;
      }
    },

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
        console.log(that.info, "==============修改===========", that.showInfo);
        that.showInfo = JSON.parse(that.info);
        // that.showInfo =  that.info;

        that.isEdit = false;
      }
    },
    // 搜索手机号
    search() {
      var that = this;

      var data = {
        phone: that.showInfo.phone
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

      var loading = that.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

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
              that.showInfo = res.data.info;
              that.info = JSON.stringify(res.data.info);

              console.log(
                that.info,
                "=========================",
                that.showInfo
              );
              loading.close();
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

    // 修改记录
    toAmend(id, remarks) {
      var that = this;
      var data = {};
      data.id = id;
      data.remarks = remarks;

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
        .put("https://power.anlly.net/fuyan/v1/service/callrecord", data, {
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
              loading.close();
              that.getRecord();
              that.isModify = -1;
              that.$message({
                message: "修改成功",
                type: "success",
                center: true
              });
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
    // 修改用户信息
    modify() {
      var that = this;
      var data = that.showInfo;
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
              loading.close();
              that.search();
              that.isEdit = false;
              that.$message({
                message: "修改成功",
                type: "success",
                center: true
              });
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
    //获取记录
    getRecord() {
      var that = this;
      var data = {
        phone: that.showInfo.phone
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

      var loading = that.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
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

    //添加记录
    addRecord() {
      var that = this;

      if (!that.caty) {
        that.$message({
          message: "请选择记录类型",
          type: "warning",
          center: true
        });
        return;
      }
      if (!that.start_time) {
        that.$message({
          message: "请选择通话时间",
          type: "warning",
          center: true
        });
        return;
      }
      if (!that.talk_time) {
        that.$message({
          message: "请选择通话时长",
          type: "warning",
          center: true
        });
        return;
      }

      if (that.talk_time <= 0) {
        that.$message({
          message: "通话时长必须大于0",
          type: "warning",
          center: true
        });
        return;
      }

      var current = new Date().getTime();
      console.log(current, "=================", that.start_time);
      if (that.start_time > current) {
        that.$message({
          message: "通话时间必须小于当前时间",
          type: "warning",
          center: true
        });
        return;
      }

      // if (that.start_time.length != 13) {
      //   that.start_time = parseInt(new Date().getTime() / 1000);
      // }

      console.log(
        new Date(that.start_time).getTime(),
        "=================================shijianshijaihhhhhhh"
      );
      var time = parseInt(new Date(that.start_time).getTime() / 1000);
      var data = {
        phone: that.showInfo.phone,
        caty: that.caty,
        talk_time: that.talk_time,
        start_time: time,
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

      var loading = that.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
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
              loading.close();
              that.caty = "";
              that.talk_time = "";
              that.start_time = "";
              that.remarks = "";
              that.getRecord();
              that.isAddRecord = false;
              that.$message({
                message: "添加成功",
                type: "success",
                center: true
              });
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
    toDelete(id) {
      var that = this;
      var data = {};
      data.id = id;
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
        .delete("https://power.anlly.net/fuyan/v1/service/callrecord", {
          data: data,
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
              loading.close();
              that.getRecord();
              // that.router.go(0);
              that.$message({
                message: "删除成功",
                type: "success",
                center: true
              });
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
    }
  },
  mounted() {
    var that = this;
    //获取传入的参数
    if (that.$route.params.info) {
      that.info = that.$route.params.info;
      console.log(that.info, "==============参数============");
      that.showInfo = that.$route.params.info;
    }

    if (localStorage.getItem("phone")) {
      var phone = localStorage.getItem("phone");
      that.showInfo.phone = phone;
      that.search();
      that.getRecord();
    }
  },
  created() {
    // var that = this;
    // //获取传入的参数
    // if (that.$route.params.info) {
    //   that.info = that.$route.params.info;
    //   console.log(that.info, "==============参数============");
    //   that.showInfo = that.$route.params.info;
    // }
    // if (localStorage.getItem("phone")) {
    //   var phone = localStorage.getItem("phone");
    //   that.showInfo.phone = phone;
    //   that.search();
    //   that.getRecord();
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"  >
.content2 {
  width: 100%;
  // height: 800px;
  height: 100%;
  float: left;
  box-sizing: border-box;
  background-color: rgb(30, 39, 58);
  padding-bottom: 50px;
  overflow-y: scroll;
  // position: absolute;
  .message {
    width: 90%;
    // height: 293px;
    margin-left: 101px;
    margin-top: 20px;

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
      // box-sizing: border-box;
      padding-left: 48px;
      padding-top: 10px;
      margin: 20px;

      .msg_con {
        width: 70%;
        height: 100%;
        float: left;
        ._input {
          width: 800px;
          height: 60px;
          clear: both;
          margin-top: 20px;
          // overflow: hidden;
          clear: both;
          .left {
            line-height: 60px;
            float: left;
            font-family: PingFang-SC-Medium;
            font-size: 44px;
            color: #fff;
          }
          .lh68 {
            line-height: 74px;
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
              box-sizing: border-box;
              padding-left: 10px;
            }
            .show_remarks {
              font-family: PingFang-SC-Medium;
              font-size: 30px;
              color: #fff;
              margin-top: 18px; 
            }
            .active {
              border-radius: 10px;
              border: 1px solid rgb(75, 92, 132);
              background-color: rgb(35, 46, 69);
            }
          }
          .w200 {
            width: 83%;
            height: 80px;
            font-size: 30px;
            textarea {
              width: 100%;
              height: 80px;
              padding-top: -20px;
              padding-bottom: 8px;
              font-size: 30px;
              background-color: rgb(43, 55, 81);
              color: #fff;
              resize: none;
              border: none;
              box-sizing: border-box;
              padding: 5px;
              outline: none;
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
            .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
              background-color: #409eff;
            }
          }

          .note {
            width: 80%;
            float: left;
            margin-top: 10px;
            outline: none;
          }
        }
        .w1000 {
          width: 1100px;
        }
      }
      .btn_con {
        width: 28%;
        height: 100%;
        float: right;
        box-sizing: border-box;
        padding-top: 40px;
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
    width: 90%;
    // width: 1470px;
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
      // height: 560px;
      // height:293px ;
      background-color: rgb(43, 55, 81);
      border-radius: 20px;
      padding-left: 32px;
      padding-bottom: 32px;
      overflow: hidden;
      // overflow-y: scroll;

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
            // height: 80px;
            // line-height: 80px;
            background-color: rgb(61, 75, 108);
            border-radius: 10px;
            clear: both;
            margin-top: 10px;
            box-sizing: border-box;
            padding-top: 12px;
            padding-bottom: 12px;
            padding-left: 20px;

            display: flex;
            justify-content: flex-start;
            .start_time,
            .howlong,
            .des {
              font-family: PingFang-SC-Medium;
              font-size: 36px;
              color: #fff;
              margin-left: 20px;
              float: left;
              // line-height: 80px;
            }
            textarea {
              background-color: rgb(61, 75, 108);
              border: none;
              outline: none;
              resize: none;
            }
            .w50 {
              display: inline-block;
              width: 70%;
              min-height: 50px;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
            }

            .modify_txt {
              display: inline-block;
              width: 70%;
              // height: 100px;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              // border: 1px solid #000;
              outline: none;
              background-color: rgb(48, 63, 95);
              border: 1px solid rgb(117, 136, 177);
              border-radius: 6px;
              padding-left: 10px;
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
              padding-top: 4px;
              float: left;
              img {
                width: 46px;
              }
            }
            .msg_icon {
              display: inline-block;
              width: 46px;
              height: 100%;
              box-sizing: border-box;
              // padding-top: 15px;
              color: rgb(117, 149, 217);
              margin-top: 7px;
              img {
                width: 46px;
              }
            }
            .modify {
              font-size: 40px;
              color: #fff;
              float: right;
              margin-top: 4px;
              margin-left: 10px;
            }
            .sureModify {
              // line-height:80px ;
              font-family: PingFang-SC-Medium;
              font-size: 40px;
              margin-top: 4px;
              color: #fff;
              margin-left: 10px;
            }
            .start_time {
              /deep/.el-input--suffix .el-input__inner {
                color: #fff;
                border: 1px solid red;
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
  }

  .new_record {
    width: 916px;
    // height: 580px;
    background-color: rgb(52, 69, 104);
    margin-left: 101px;
    margin-top: 39px;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 27px 43px 30px 40px;
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
          background-color: rgb(75, 92, 132);
          box-sizing: border-box;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 10px;
          /deep/.el-input__inner {
            font-size: 18px;
            color: #fff;
            background-color: rgb(35, 46, 69);
            border: 1px solid rgb(117, 136, 177);
          }
          /deep/.el-select-dropdown__item {
            span {
              font-size: 18px !important;
            }
          }
          /deep/.el-select-dropdown__item.selected {
            font-size: 18px;
          }
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
                width: 220px;
                background-color: rgb(35, 46, 69);
                border: 1px solid rgb(117, 136, 177);
              }
            }
            /deep/.el-input__inner {
              color: #fff;
              font-size: 18px;
            }
            /deep/.el-input__icon {
              font-size: 20px;
              margin-top: 0px;
              margin-right: 4px;
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
      margin-top: 68px;
      overflow: hidden;
      .add_remark {
        width: 10%;
        height: 86px;
        float: left;
        text-align: left;
        line-height: 86px;
        color: #fff;
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
        textarea {
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
          padding-top: 4px;
        }
      }
    }
    .more {
      width: 100%;
      // height: 240px;
      margin-top: 26px;
      .more_txt {
        overflow: hidden;
        span:first-child {
          display: inline-block;
          font-family: PingFang-SC-Medium;
          font-size: 24px;
          color: #fff;
          float: left;
        }
        .triangle {
          display: inline-block;
          color: rgb(101, 144, 238);
          font-size: 36px;
          float: left;
        }
      }
      .more_list {
        width: 100%;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;

          li {
            width: 171px;
            height: 73px;
            border-radius: 10px;
            background-color: rgb(75, 92, 132);
            text-align: center;
            line-height: 73px;
            margin-right: 42px;
            margin-top: 24px;
            box-sizing: border-box;
            padding-top: 5px;
            .more_sel {
              color: #fff;
            }
            /deep/.el-input__inner {
              font-family: PingFang-SC-Medium;
              font-size: 29px;
              color: #fff;
              text-align: center;
              border: none;
              background: none;
            }

            /deep/ .el-input__icon {
              width: 100%;
              margin-right: 25px;
              margin-top: -10px;
            }

            /deep/ .el-icon-arrow-up {
              font-size: 28px;
              color: #fff;
            }
          }
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

  .pages {
    width: 100%;
    height: 50px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
  }
}
</style>

