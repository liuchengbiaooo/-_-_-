<template>
  <div class="index">
    <div class="show">
      <swiper
        class="swiper"
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000"
        style="width:100%;height:100%;"
      >
        <block v-for="(item, index) in movies" :index="index" :key="index">
          <swiper-item v-if="item.sort == 3" @click="webview(item)">
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
      <p class="number">S/N {{deviceCode}}的密码</p>
      <p class="title">请输入以下的密码</p>
      <div class="sum">
        <p class="list" v-for="(itme,index) in pass" v-bind:key="index">{{itme}}</p>
      </div>
      <p class="next" @click="next()">剩余时长</p>
      <!-- <p class="next pass" @click="passWord()">获取新密码</p> -->
    </div>
  </div>
</template>  

<script>
export default {
  data() {
    return {
      deviceCode: "",
      pass: "",
      img: "",
      movies: [],
      passInformation:{}
    };
  },
  mounted() {
    let query = this.$root.$mp.query;
    if (query.pass != undefined) {
      console.log("Fasfsadfsda",query.deviceCode)
      this.deviceCode = query.deviceCode;
      // this.deviceCode = this.deviceCode.substring(
      //   0,
      //   this.deviceCode.length - 3
      // );
      this.pass = query.pass.split("");
    }

    // // 轮播图
    // this.$request({
    //   url: "/app/selectAppBanner",
    //   method: "POST",
    //   success: res => {
    //     if (res.statusCode == 200) {
    //       this.img = res.data.data[1].bannerImg;
    //     }
    //   }
    // });
    this.moviesCont();
    this.inquiryPassWord();
  },
  methods: {
    webview(item) {
      let src = item.bannerContent;
      wx.navigateTo({
        url: `/pages/web/main?src=${src}`
      });
    },
    moviesCont() {
      this.$request({
        url: "/app/selectAppBanner",
        method: "POST",
        data: {
          deviceCode: this.deviceCode + "000"
        },
        success: res => {
          wx.hideLoading();
          console.log("ggggggg,zhix");
          this.movies = res.data.data;
        }
      });
    },
    next() {
      wx.navigateTo({
        url: `/pages/remain/main?deviceCode=${this.deviceCode}`
      });
    },
    inquiryPassWord() {
      const userid = wx.getStorageSync("userid");
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
          if (res.data.status == '1') {
            this.passInformation = res.data.data[0];
            let query = res.data.data[0];
            this.pass = query.roll_code.split("");
            console.log("passInformation",this.passInformation)
          }
        }
      });
    },
    //获取新密码
    // passWord() {
    //   console.log("passInformation",this.passInformation)
    //   const orderId = this.passInformation.id
    //   console.log("mim", orderId);
    //   this.$request({
    //     url: "/app/getPassWord",
    //     method: "POST",
    //     data: {
    //       orderId: orderId
    //     },
    //     success: res => {
    //       console.log("重新获取密码", res);
    //       if (res.data.status == "1") {
    //         this.inquiryPassWord();
    //         wx.hideLoading();
    //       } else {
    //         wx.hideLoading();
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: "none",
    //           duration: 1000 //持续的时间
    //         });
    //       }
    //     }
    //   });
    // }
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
    width: 100%;
    height: 100%;
  }
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
    margin-top: 20px;
    font-size: 22px;
    text-align: center;
    color: #999;
    width: 70%;
    height: 35px;
    font-size: 14px;
    left: 15%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .list {
      width: 35px;
      height: 100%;
      float: left;
      text-align: center;
      line-height: 35px;
      margin: 5px;
      border-radius: 5px;
      background: #f6f6f6;
    }
  }
  .next {
    width: 70%;
    height: 35px;
    font-size: 14px;
    color: #fff;
    background-color: #6a61bc;
    text-align: center;
    line-height: 35px;
    position: relative;
    border-radius: 5px;
    left: 15%;
    top: 10px;
  }
  .pass {
    top: 20px;
  }
}
</style>
