<template>
  <div class="index">
    <!-- <div class="nogg" v-show="mesh">
        网络貌似不给力~
     </div> -->
    <div class="show">
      <swiper
        class="swiper"
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000"
        style="width:100%;height:100%;"
      >
        <block
          v-for="(item, index) in movies"
          :index="index"
          :key="index"
        >
          <swiper-item
            v-if="item.sort == 2"
            @click="webview(item)"
          >
            <image
              :src="item.bannerImg"
              class="slide-image"
              mode="aspectFill"
              style="width:100%;height:100%;"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="content">
      <p class="number">
        S/N {{deviceCode}}的使用时间
      </p>
      <p class="title">
        <!-- 如果结束重新使用需要重新输入密码 -->
      </p>
      <p class="sum">
        {{spendTime}}
      </p>
      <p
        class="next"
        @click="goPage()"
      >
        充电密码
      </p>
      <img
        @click="goHome()"
        class="home"
        src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/%E7%9F%A2%E9%87%8F%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1.png"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      info: "",
      deviceCode: "",
      spendTime: "",
      createTime: "",
      endTime: "",
      movies: [],
      mesh:true,
    };
  },
  mounted() {
    let query = this.$root.$mp.query;
    if (query.deviceCode != undefined) {
      console.log("query.deviceCode",query.deviceCode)
      this.deviceCode = query.deviceCode;
      let userid = wx.getStorageSync("userid");
      // 获取细腻些
      this.$request({
        url: "/app/selectUserAppOrder",
        method: "POST",
        data: {
          page: 1,
          limit: 20,
          user_id: userid,
          status: 0
        },
        success: res => {
          wx.hideLoading();
          if (res.statusCode == 200) {
            this.info = res.data.data[0];
            this.createTime = this.info.createTime;
            this.enendTimed = this.info.endeTime;
            // this.spendTime = this.countdown(res.data.data.createTime);
            this.start();
          }
        },

      });
    }

    // 轮播图
    this.moviesCont();
  },
  methods: {
    webview(item) {
      let src = item.bannerContent;
      wx.navigateTo({
        url: `/pages/web/main?src=${src}`
      });
    },
    moviesCont() {
      this.mesh = false;
      this.$request({
        url: "/app/selectAppBanner",
        method: "POST",
        data: {
          deviceCode: this.deviceCode + "000"
        },
        success: res => {
          wx.hideLoading();
          this.movies = res.data.data;
        },
        fail: err =>{
          this.mesh = true;
        }
      });
    },
    goHome() {
      wx.navigateTo({
        url: `/pages/index/main`
      });
    },
    goPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    start() {
      this.mesh = false;
      setTimeout(() => {
        // this.spendTime = this.countdown(this.createTime + 60 * 60 * 3 * 1000);
        this.spendTime = this.countdown(this.enendTimed);
        this.start();
      }, 1000);
    },
    countdown(startTime, endTime) {
      console.log(startTime, endTime);

      var nowTime = new Date();
      if (endTime == "undefined") {
        endTime = nowTime;
      }
      // var targetTime = new Date("2018/2/27 15:44:15");
      var spanTime = startTime - endTime;
      var hours = Math.floor(spanTime / (1000 * 60 * 60));
      spanTime -= hours * 60 * 60 * 1000;
      var minute = Math.floor(spanTime / (1000 * 60));
      spanTime -= minute * 60 * 1000;
      var second = Math.floor(spanTime / 1000);
      hours < 10 ? (hours = "0" + hours) : hours;
      minute < 10 ? (minute = "0" + minute) : minute;
      second < 10 ? (second = "0" + second) : second;
      return hours + ":" + minute + ":" + second;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.show {
  width: 100%;
  position: absolute;
  height: 60%;
  background-color: #f0f0f0;
  float: left;
  img {
    height: 100%;
    width: 100%;
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
  z-index: 55;
}
.content {
  position: absolute;
  float: left;
  top: 60%;
  margin-top: 20px;
  width: 100%;
  .number {
    font-size: 14px;
    text-align: center;
    color: #72a4ff;
    line-height: 25px;
  }
  .title {
    font-size: 14px;
    text-align: center;
    color: #999;
    line-height: 25px;
  }
  .sum {
    font-size: 22px;
    text-align: center;
    color: #999;
    line-height: 50px;
  }
  .next {
    width: 70%;
    height: 35px;
    font-size: 14px;
    color: #fff;
    background-color: #bc6161;
    text-align: center;
    line-height: 35px;
    position: relative;
    border-radius: 5px;
    left: 15%;
    top: 20px;
  }
  .home {
    height: 30px;
    width: 30px;
    position: relative;
    float: right;
    top: -18px;
    right: 15px;
  }
}
</style>
