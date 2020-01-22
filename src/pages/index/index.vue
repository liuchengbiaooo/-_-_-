<template>
  <div class="index">
    <map
      id="maps"
      class="map"
      :longitude="longitude"
      :latitude="latitude"
      scale="16"
      show-location	
      subkey="U34BZ-WWSWR-U77WZ-WQVQJ-DYON7-AUFMZ"
      :polyline="polyline"
      :markers="markers"
    ></map>
    <cover-view class="head">
      <!-- @click="goPage('user')"  -->
      <button
        class="user"
        open-type="getUserInfo"
        @click="make('user')"
        @getuserinfo="bindGetUserInfo"
      >
        <cover-image
          :src="userInfo.avatarUrl ? userInfo.avatarUrl : 'https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_customerservice.png'"
          alt
        />
      </button>
      <cover-view class="txt">个人中心</cover-view>
      <input type="text" />
      <cover-view class="other" @click="goPage('list')">
        <cover-image src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/cdb_lb.png" alt />
      </cover-view>
    </cover-view>

    <cover-view class="guang">
      <cover-image src="../../../../../static/kuang@3x.png" alt class="bgm" />
      <cover-image src="https://cd.lzmalls.com/static/index/ic_laba.png" alt class="laba" />
      <cover-view class="guang-title">低门槛，高收益，龙享物联招商火爆进行中</cover-view>
    </cover-view>

    <!-- <cover-view class="nogg" v-show="mesh">网络貌似不给力~</cover-view> -->
    <!-- @click="spend()" -->
    <cover-view class="spend">
      <button
        class="spend-body"
        open-type="getUserInfo"
        @click="make('camera')"
        @getuserinfo="bindGetUserInfo"
      >
        <cover-view class="list">
          <cover-image src="../../../../../static/cdb_sm@3x.png" alt />
          <cover-view class="list_txt">获取密码</cover-view>
        </cover-view>
      </button>
    </cover-view>

    <cover-view class="yuan" @click="clickcontrol">
      <cover-view class="dian"></cover-view>
    </cover-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      motto: "Hello World",
      longitude: "113.324520",
      latitude: "23.099994",
      markers: [
        {
          // id: 0,
          // iconPath: "./image/cdb_dwzhong@2x.png",
          // latitude: 22.53332,
          // longitude: 113.93041,
          // width: 50,
          // height: 50
        }
      ],
      polyline: [
        // {
        //   points: [
        //     {
        //       longitude: 116.313982,
        //       latitude: 39.98002
        //     },
        //     {
        //       longitude: 116.313992,
        //       latitude: 39.98003
        //     }
        //   ],
        //   color: "#FF0000DD",
        //   width: 20,
        //   dottedLine: true
        // }
      ],
      userState: false,
      userInfo: {},
      mesh: true,
      // 用户是否是第一次，且没有授权
      firstUserLogin: false,
      shijian: "",
      part: ""
    };
  },
  onLoad(options) {
    //
    // console.log("执行");
    // const userState = wx.getStorageSync("userState");
    // if (userState) {
    //   this.userState = userState;
    // }
    // const userInfo = wx.getStorageSync("userInfo");
    // if (userInfo) {
    //   this.userInfo = userInfo;
    // }
    // this.$request({
    //   url: "/app/test",
    //   data: {
    //     qrcode: JSON.stringify(options)
    //   },
    //   success: res => {
    //     // {"state":1,"data":2,"qrcode":3}
    //     wx.hideLoading();
    //     let data = res.data;
    //     if (typeof res.data == "string") {
    //       data = JSON.parse(res.data);
    //     }
    //     // 判断
    //     if (data.state == 0) {
    //       // 用户未授权
    //       if (this.power(data.qrcode)) {
    //         // 新用户
    //         this.firstUserLogin = true;
    //         wx.navigateTo({
    //           url: `/pages/money/main?device_code=${data.qrcode}`
    //         });
    //         return;
    //       } else {
    //         return;
    //       }
    //     } else {
    //       this.firstUserLogin = true;
    //     }
    //   }
    // });
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "龙享物联"
    });
    this.start();
    // 判断是否有订单
    //const userid = wx.getStorageSync("userid");

    // this.$request({
    //   url: "/app/selectUserAppOrder",
    //   method: "POST",
    //   data: {
    //     page: 1,
    //     limit: 20,
    //     user_id: userid,
    //     status: 0
    //   },
    //   success: res => {
    //     this.mesh = false;
    //     if (res.statusCode == 200) {
    //       console.log('ssggg',res.data.status,this.firstUserLogin)
    //       if (res.data.status == "1" && this.firstUserLogin) {
    //         wx.showModal({
    //           title: "提示",
    //           content: "您还有未完成的订单，是否进入",
    //           confirmText: "进入",
    //           success: showModal => {
    //             if (showModal.confirm) {
    //               let deviceCode = res.data.data[0].deviceCode;
    //               let roll_code = res.data.data[0].roll_code || 4321;
    //               wx.reLaunch({
    //                 url: `/pages/pass/main?pass=${roll_code}&deviceCode=${deviceCode}`
    //               });
    //             }
    //           }
    //         });
    //       }
    //     }
    //     return;
    //   },
    //   fail: err =>{
    //     this.mesh = true;
    //      this.shijian = setInterval(()=>{ //做网络异常处理，4秒 不断的循环拿到数据
    //       this.start();
    //     },4000)
    //   }
    // });

    let query = this.$root.$mp.query;
    if (query.device_code != undefined) {
      wx.navigateTo({
        url: `/pages/money/main?device_code=${query.device_code}`
      });
      return;
    }
  },
  methods: {
    power(qrcode) {
      if (!this.userState) {
        wx.showModal({
          title: "提示",
          content: "您为授权获取昵称等信息，此功能不可用，是否重新允许?",
          cancelText: "否",
          confirmText: "是",
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: `/pages/login/main?login=first&device_code=${qrcode}`
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
        return false;
      } else {
        return true;
      }
    },
    make(value) {
      //区分
      this.part = value;
    },
    bindGetUserInfo(e) {
      //点击扫码
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
        this.spend();
      }
    },
    spend() {
      const openid = wx.getStorageSync("openid");
      if (!this.userState) {
        wx.getUserInfo({
          success: res => {
            const userInfo = res.userInfo;
            //this.userState = true;
            console.log("用户信息", res);
            this.userInfo = userInfo;
            if (this.part == "user") {
              this.goPage("user");
            } else if (this.part == "camera") {
              this.camera();
            }
            this.$request({
              url: "/app/getWxInfo",
              method: "POST",
              data: {
                open_id: openid,
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              },
              success: res => {
                wx.hideLoading();
                console.log("保存信息", res.data.data.id);
                wx.setStorageSync("userid", res.data.data.id);
                //
                //wx.setStorageSync("userState", true);
                wx.setStorageSync("userInfo", userInfo);
                this.userState = true;
              },
              fail: err => {
                wx.hideLoading();
              }
            });
          }
        });
      } else {
        if (this.part == "user") {
          this.goPage("user");
        } else if (this.part == "camera") {
          this.camera();
        }
      }
    },

    camera() {
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          console.log("gagaggggggggaggggggg", res);
          if (res.result != undefined) {
            let result = res.result;
            let index = result.indexOf("?") + 1;
            let qrcode = result.substring(index + 7, result.length);
            console.log("里面执行", qrcode);
            // qrcode = "A010050001009";
            this.$request({
              url: "/app/qrCode",
              method: "POST",
              data: {
                deviceCode: qrcode
              },
              success: res => {
                wx.hideLoading();
                if (res.data.status === 1) {
                  wx.navigateTo({
                    url: `/pages/money/main?device_code=${qrcode}`
                  });
                  return;
                } else {
                  wx.showModal({
                    title: "提示",
                    content: "设备故障",
                    showCancel: false,
                    success(res) {}
                  });
                }
              }
            });
          }
          // return;
          // wx.navigateTo({
          //   url: `${path}`
          // });
        }
      });
    },
    start() {
      this.$request({
        url: "/app/selectAllNet",
        method: "POST",
        success: res => {
          wx.hideLoading();
          console.log("数据");
          clearInterval(this.shijian); //做网络异常处理，有数据时 关闭定时器
          this.mesh = false;
          let markersList = [];
          res.data.data.map((item, index) => {
            markersList.push({
              iconPath: "https://cd.lzmalls.com/images/banner/tubiao.png",
              id: index,
              latitude: item.addressLon,
              longitude: item.addressLat,
              width: 50,
              height: 50,
              callout: {
                content: item.address,
                color: "#000000",
                bgColor: "#ffffff", //酱紫
                fontSize: 14,
                borderRadius: 8,
                display: "BYCLICK",
                padding: 8
              }
            });
          });
          this.markers = markersList;
        },
        fail: err => {
          this.mesh = true;
        }
      });

      wx.login({
        success: res => {
          if (res.code) {
            // 发起网络请求
            this.$request({
              url: "/app/wxLogin",
              method: "POST",
              data: {
                code: res.code
              },
              success: res => {
                wx.hideLoading();
                if (res.statusCode == 200) {
                  let userID = res.data.data;
                  wx.setStorageSync("openid", userID);
                }
              }
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    },
    goPage(page) {
      // if (!this.userState) {
      //   wx.showModal({
      //     title: "提示",
      //     content: "您为授权获取昵称等信息，此功能不可用，是否重新允许允许?",
      //     cancelText: "否",
      //     confirmText: "是",
      //     success(res) {
      //       if (res.confirm) {
      //         wx.reLaunch({
      //           url: "/pages/login/main"
      //         });
      //       } else if (res.cancel) {
      //         console.log("用户点击取消");
      //       }
      //     }
      //   });
      //   return;
      // }
      wx.navigateTo({
        url: `/pages/${page}/main`
      });
    },
    getUserMap() {
      wx.authorize({
        scope: "scope.userLocation",
        success: () => {
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          wx.getLocation({
            type: "gcj02",//gcj02 wgs84
            success: res => {
              //console.log('ssg',res);
              this.latitude = res.latitude;
              this.longitude = res.longitude;
              this.markers = [{
                id: 0,
                iconPath: "/static/cdb_dwzhong@2x.png",
                latitude: res.latitude,
                longitude: res.longitude,
                width: 50,
                height: 50
              }]
              this.start();
              return;
            }
          });
        }
      });
    },
    /**
     * 回到自己位置，在cover-image上绑定点击事件即可.
     */
    clickcontrol(e) {
      let mpCtx = wx.createMapContext("maps");
      mpCtx.moveToLocation();
    }
  },
  created() {
    wx.setNavigationBarTitle({
      title: "龙享物联"
    });
    // 获取用户坐标
    this.getUserMap();
  }
};
</script>

<style lang="scss" scoped>
.guang {
  width: 100%;
  height: 30px;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 5px;
  top: 15px;
  .bgm {
    height: 100%;
    width: 100%;
  }
  .laba {
    height: 30px;
    width: 25px;
    margin-left: 10px;
    margin-right: 10px;
    top: -30px;
    position: relative;
    float: left;
  }
  .guang-title {
    font-size: 14px;
    color: #fff;
    line-height: 30px;
    float: left;
    top: -30px;
    position: relative;
  }
}
.map {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.head {
  position: relative;
  top: 10px;
  width: 90%;
  height: 50px;
  left: 5%;
  border-radius: 5px;
  background-color: #fff;
  button::after {
    border: none;
  }
  button {
    height: 80px;
    width: 80px;
  }
  button {
    border-radius: 50%;
  }
  .user {
    height: 50px;
    width: 50px;
    box-sizing: border-box;
    float: left;
    cover-image {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin-right: 10px;
      z-index: 999;
    }
  }
  .txt {
    position: absolute;
    left: 0;
    bottom: 10px;
    font-size: 12px;
    color: white;
  }
  input {
    position: relative;
    top: 10px;
    float: left;
    width: calc(100% - 80px);
    padding-left: 10px;
    margin-left: 5px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-left: 1px solid #e5e5e5;
  }
  .other {
    z-index: 9;
    position: absolute;
    top: 10px;
    height: 30px;
    width: 30px;
    right: 10px;
    border-left: 1px solid #e5e5e5;
    margin-left: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cover-image {
      height: 25px;
      width: 25px;
    }
  }
}
.yuan {
  position: fixed;
  z-index: 9;
  bottom: 40px;
  right: 10px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #fff;
  border: 3px solid #4d8ad7;
  .dian {
    height: 10px;
    width: 10px;
    position: relative;
    top: 10px;
    left: 10px;
    background-color: #4d8ad7;
    border-radius: 50%;
  }
}
.nogg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 40px;
  background-color: #42463f;
  color: white;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  border-radius: 6px;
}
.spend {
  position: fixed;
  width: 100%;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: 30px;
  button::after {
    border: none;
  }
  button {
    height: 80px;
    width: 80px;
  }
  button {
    border-radius: 50%;
  }
}
.spend-body {
  .list {
    position: relative;
    .list_txt {
      position: absolute;
      bottom: 10px;
      left: 17px;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>

