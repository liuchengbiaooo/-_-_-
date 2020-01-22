<template>
  <div class="index">
    <div class="content">
      <p class="p title">
        龙享物联
      </p>
      <p class="p explain">
        您身边得充电神奇
      </p>
    </div>
    <div class="body">
      <div class="guize">
        <p>计费规则</p>
      </div>
      <div class="list">
        <p>1.前3小时扣费1元，3小时至24小时扣费3元</p>
        <p>2.该款项有龙享物联收取，与店家无关</p>
      </div>
    </div>
    <div
      class="foot"
      @click="goPage()"
    >
      <div class="img">
        <img
          src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/yuan.png"
          alt=""
        >
      </div>
      <p>获取密码</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "龙享物联"
    });
  },
  methods: {
    goPage() {
      let query = this.$root.$mp.query;
      wx.navigateTo({
        url: `/pages/money/main?device_code=${query.device_code}`
      });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 200px;
  background-size: 100% 100%;
  background-image: url(https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/bg.png);
  p {
    position: relative;
    float: left;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    left: 60px;
    width: 100%;
    top: 100px;
  }
}
.body {
  padding: 30px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  top: 10px;
  .guize {
    p {
      font-size: 16px;
      height: 30px;
      float: left;
      line-height: 30px;
      width: 100%;
    }
  }
  .list {
    position: relative;
    width: 100%;
    top: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }
}

.foot {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 100px;
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  p {
    font-size: 14px;
    color: #fff;
    text-align: center;
    position: relative;
    top: -35px;
  }
}
</style>
