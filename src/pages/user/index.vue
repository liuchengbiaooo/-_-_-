<template>
  <div class="index">
    <div class="head">
      <img
        class="bgm"
        src="../../../static/kuang2@3x.png"
        alt=""
      >
      <div class="user">
        <img
          :src="userInfo.avatarUrl"
          alt=""
          class="show"
        >
        <p class="name">
          {{userInfo.nickName}}
        </p>
      </div>
    </div>
    <div class="content">
      <div
        class="list"
        @click="goPage('order')"
      >
        <img
          src="../../../static/1@2x.png"
          alt=""
        >
        <p class="title">我的订单</p>
        <img
          src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_next.png"
          alt=""
          class="right"
        >
      </div>
      <div
        class="list"
        @click="goPage('discount')"
      >
        <img
          src="../../../static/2@2x.png"
          alt=""
        >
        <p class="title">我的优惠券</p>
        <img
          src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_next.png"
          alt=""
          class="right"
        >
      </div>
      <div
        class="list"
        @click="goPage('help')"
      >
        <img
          src="../../../static/4@2x.png"
          alt=""
        >
        <p class="title">使用帮助</p>
        <img
          src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_next.png"
          alt=""
          class="right"
        >
      </div>
      <div
        class="list"
        @click="tel('servant')"
      >
        <img
          src="../../../static/3@2x.png"
          alt=""
        >
        <p class="title">客服咨询</p>
        <img
          src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_next.png"
          alt=""
          class="right"
        >
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: ""
    };
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "个人中心"
    });

    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.userInfo = userInfo;
    }
  },
  methods: {
    tel() {
      wx.makePhoneCall({
        phoneNumber: "13818781005"
      });
    },
    goPage(page) {
      wx.navigateTo({
        url: `/pages/${page}/main`
      });
    }
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

