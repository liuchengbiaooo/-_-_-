<template>
  <div class="index">
    <div class="logo">
      <img src="../../../static/laingzhiLongin.jpg" alt>
    </div>
    <div class="message">
      <p class="title">龙享物联申请获得以下权限</p>
      <p class="details">获得您的公开信息(昵称，头像等)</p>
    </div>
    <!-- <Natwork/> -->
     <!-- <div class="nogg" v-show="isShow">
        网络貌似不给力~
     </div> -->
    <button
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo"
      @click="getUserInfo1"
      class="login"
    >授权登陆</button>
  </div>
</template>

<script>
//import {Natwork} from '../natwork';
export default {
  data() {
    return {
      logs: [],
      loginState: false,
      qrcode: "",
      isShow:false,
    };
  },
  // components:{
  //    Natwork
  // },
  mounted() {
    // 判断用户是否是第一次授权
    let query = this.$mp.query;
    if (query.login == "first") {
      this.loginState = true;
      this.qrcode = query.device_code;
    }

    const userState = wx.getStorageSync("userState");
    if (userState) {
      wx.reLaunch({
        url: "/pages/index/main"
      });
      return;
    }
    wx.setNavigationBarTitle({
      title: "权限获取"
    });
    this.getSetting();
  },
  methods: {
    getSetting() {
      const than = this;
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo);
                //用户已经授权过
                console.log("123123");
                console.log("用户已经授权过1");
                than.getInfo();
              }
            });
          } else {
            console.log("用户还未授权过");
          }
        }
      });
    },
    getUserInfo1() {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo(e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
        // 获取用户信息
        this.getInfo();
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
        wx.reLaunch({
          url: "/pages/index/main"
        });
      }
    },
    getInfo() {
      console.log("1");

      const openid = wx.getStorageSync("openid");

      let loginState = this.loginState;
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo);
          const userInfo = res.userInfo;
          //
          this.isShow = false;
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
              console.log("sss", res.data.data.id, loginState);
              this.isShow = false;
              wx.setStorageSync("userid", res.data.data.id);
              //
              wx.setStorageSync("userState", true);
              //
              wx.setStorageSync("userInfo", userInfo);
              //

              if (loginState == true) {
                wx.redirectTo({
                  url: `/pages/money/main?device_code=${this.qrcode}`
                });
                return;
              } else {
                wx.redirectTo({
                  url: "/pages/index/main"
                });
              }
            },
            fail: err => {
              wx.hideLoading();
              this.isShow = true;
            }
          });
        }
      });
    }
  }
  // created() {}
};
</script>

<style lang="scss" scoped>
.index{
  position: relative;
}
.logo {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: relative;
  margin-top: 50px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
}
.message {
  position: relative;
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  .details {
    position: relative;
    color: #555;
  }
}

.nogg{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 40px;
  background-color: #42463F;
  color: white;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  border-radius: 6px;
}
.login {
  height: 40px;
  line-height: 40px;
  padding: 0;
  font-size: 16px;
  color: #fff;
  background-color: #4d8ad7;
  width: 80%;
  position: relative;
  border: none;
  top: 10px;
}
</style>
