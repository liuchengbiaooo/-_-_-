<template>
  <div class="index">
    <map
      id="myMap"
      style="width: 100%; height: 600px;"
      longitude="116.313972"
      latitude="39.980014"
      scale='16'
      subkey="U34BZ-WWSWR-U77WZ-WQVQJ-DYON7-AUFMZ"
      :polyline="polyline"
      :markers="markers"
    ></map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      motto: "Hello World",
      markers: [
        {
          iconPath:
            "https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/cdb_dizhi.png",
          id: 0,
          latitude: 39.980014,
          longitude: 116.313972,
          width: 50,
          height: 50
        },
        {
          iconPath:
            "https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_shiyong.png",
          id: 2,
          latitude: 39.98002,
          longitude: 116.313982,
          width: 50,
          height: 50
        }
      ],
      polyline: [
        {
          points: [
            {
              longitude: 116.313982,
              latitude: 39.98002
            },
            {
              longitude: 116.313992,
              latitude: 39.98003
            }
          ],
          color: "#FF0000DD",
          width: 20,
          dottedLine: true
        }
      ]
    };
  },
  methods: {
    getSetting() {
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo);
                //用户已经授权过
                console.log("用户已经授权过");
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
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    login() {
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            console.log(res.code);
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  },
  created() {
    wx.setNavigationBarTitle({
      title: "个人中心"
    });
    this.getSetting();
    this.login();
  }
};
</script>

<style lang="scss" scoped>
.head {
  position: relative;
  width: 100%;
  height: 250px;
  .bgm {
    position: absolute;
    width: 100%;
    height: 170px;
  }
  .user {
    width: 100px;
    position: relative;
    margin: 0 auto;
    top: 120px;
    .show {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .name {
      font-size: 14px;
      line-height: 30px;
      width: 100%;
      text-align: center;
      height: 30px;
    }
  }
}
.content {
  width: 100%;
  float: left;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  .list {
    height: 40px;
    width: 100%;
    float: left;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    img {
      height: 20px;
      width: 20px;
      position: relative;
      top: 10px;
      margin-right: 15px;
      float: left;
    }
    .title {
      position: relative;
      float: left;
      line-height: 40px;
      height: 40px;
      font-size: 14px;
    }
    .right {
      position: absolute;
      right: 0px;
      margin-right: 0;
    }
  }
}
</style>

