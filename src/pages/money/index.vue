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
          <swiper-item v-if="item.sort == 1" @click="webview(item)">
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
      <!-- <div class="fakey" @click="goPage('forget')">
        <img src="../../../static/wenhao.png" alt />
        <p>忘记密码</p>
      </div> -->
      <div class="head">
        <img src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_zifei.png" alt />
        <p>资费标准</p>
      </div>
      <div class="func head" @click="goPage('method')">
        <img src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_fangfa.png" alt />
        <p>使用方法</p>
      </div>

      <div class="body">
        <div
          class="list"
          v-for="(item,index) in PayList"
          v-bind:key="index"
          :class="{now:indexSelect==index}"
          @click="indexCont(index,item.id)"
        >
          <div class="time">
            <span>{{item.money}}元</span>
            <span> / </span>
            <span >{{item.hour}}分钟</span>
          </div>
          <!-- <div class="right">
            <p class="title">可充电</p>
            <p class="lang">{{item.hour}}分钟</p>
          </div>-->
        </div>
        <!-- <div
          class="list"
          :class="{now:index==1}"
          @click="indexCont(1)"
        >
          <p class="time">3元</p>
          <div class="right">
            <p class="title">
              可充电
            </p>
            <p class="lang">12小时</p>
          </div>
        </div>-->
      </div>
      <div class="next" @click="submit()" v-show="isOK">
        <img src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_wechat.png" alt />
        <p>微信支付</p>
      </div>
      <div class="next" v-show="isShow">
        <img src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_wechat.png" alt />
        <p>正在支付中</p>
      </div>
    </div>
    <div class="nogg" v-show="mesh">网络貌似不给力~</div>
    <audio :src="src" id="myAudio" loop></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
      deviceCode: "",
      img: "",
      indexSelect: 0,
      src:'https://sldc.oss-cn-beijing.aliyuncs.com/xiaochengxu/%E9%BE%99%E4%BA%AB%E7%89%A9%E8%81%94.mp3',
      // src:
      //   "https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/%E4%BA%AE%E7%9F%A5%E5%85%85%E7%94%B5%E5%99%A8.mp3",
      innerAudioContext: "",
      movies: [],
      isOK: true,
      isShow: false,
      mesh: false,
      PayList: [],
      mealID:1 //套餐id
    };
  },
  onUnload() {
    this.innerAudioContext.stop();
  },
  mounted() {
    this.start();
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.src;
    // innerAudioContext.loop = true;
    innerAudioContext.onPlay(() => {
      console.log("开始播放");
    });
    innerAudioContext.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    this.innerAudioContext = innerAudioContext;
    // 轮播图
    this.moviesCont();

    //判断是否有订单
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
        wx.hideLoading();
        //this.mesh = false;
        if (res.statusCode == 200) {
          console.log("ssggg", res.data.status);
         
          if (res.data.status == "1") {
            wx.showModal({
              title: "提示",
              content: "您还有未完成的订单，是否进入",
              confirmText: "进入",
              success: showModal => {
                if (showModal.confirm) {
                  let deviceCode = res.data.data[0].deviceCode;
                  let roll_code = res.data.data[0].roll_code || 4321;
                  wx.reLaunch({
                    url: `/pages/pass/main?pass=${roll_code}&deviceCode=${deviceCode}`
                  });
                }
              }
            });
          }
        }
        return;
      }
      // fail: err =>{
      //   this.mesh = true;
      //    this.shijian = setInterval(()=>{ //做网络异常处理，4秒 不断的循环拿到数据
      //     this.start();
      //   },4000)
      // }
    });
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
          deviceCode: this.deviceCode
        },
        success: res => {
          wx.hideLoading();
          this.movies = res.data.data;
        }
      });
    },
    goPage(page) {
      wx.navigateTo({
        url: `/pages/${page}/main`
      });
    },
    indexCont(index,id) {
      //网络监听
      console.log("sssnihao",index);
      wx.getNetworkType({
        success(res) {
          console.log("网络", res);
        }
      });
      this.mealID = id;
      this.indexSelect = index;
    },
    start() {
      let query = this.$root.$mp.query;
      let deviceDate = query.device_code;
      let device = deviceDate.substring(0, 1); //拿到设备码进行判断

      console.log("toc", deviceDate);
      // this.$request({
      //     url: "app/getPayList",
      //     method: "POST",
      //     header: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     },
      //     data: {
      //       deviceCode: query.device_code
      //     },
      //     success: res => {
      //       wx.hideLoading();
      //       if (res.statusCode == 200) {
      //         this.info = res.data.data;
      //       }
      //     }
      //   });


      if (query.device_code != undefined) {
        this.deviceCode = query.device_code;
        this.$request({
          url: "/app/qrCode",
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            deviceCode: query.device_code
          },
          success: res => {
            wx.hideLoading();
            if (res.statusCode == 200) {
              this.info = res.data.data;
            }
          }
        });
         this.$request({
          url: "/app/qrCode",
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            deviceCode: query.device_code
          },
          success: res => {
            wx.hideLoading();
            if (res.statusCode == 200) {
              this.info = res.data.data;
            }
          }
        });
         this.$request({
          url: "/app/getPayList",
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            deviceCode: query.device_code
          },
          success: res => {
            wx.hideLoading();
            if(res.data.status == 1){
              this.PayList = res.data.data;
            }
              console.log("susnfiasjgina",res)
          
          }
        });
      }
      // if (device == "A") {
      //   let PayList = [
      //     { id: 1, hour: "5", money: "5" },
      //     { id: 2, hour: "10", money: "8" }, //8
      //     { id: 3, hour: "20", money: "12" }
      //   ];
      //   this.PayList = PayList;
      // } else if (device == "B") {
      //   let PayList = [
      //     { id: 1, hour: "10", money: "10" },
      //     { id: 2, hour: "20", money: "15" },
      //     { id: 3, hour: "30", money: "20" }
      //   ];
      //   this.PayList = PayList;
      // } else if (device == "C") {
      //   let PayList = [
      //     { id: 1, hour: "10", money: "10" },
      //     { id: 2, hour: "20", money: "15" },
      //     { id: 3, hour: "30", money: "20" }
      //   ];
      //   this.PayList = PayList;
      // }

      // this.$request({
      //   url: "/app/getPayList",
      //   method: "POST",
      //   data: {
      //     deviceCode: this.deviceCode
      //   },
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   success: res => {
      //     wx.hideLoading();
      //     this.PayList = res.data.data;
      //     console.log("套餐2",res.data.data)
      //   }
      // });

      // // 轮播图
      // this.$request({
      //   url: "/app/selectAppBanner",
      //   method: "POST",
      //   success: res => {
      //     if (res.statusCode == 200) {
      //       this.img = res.data.data[0].bannerImg;
      //     }
      //   }
      // });
    },
    paysucc() {
      wx.showToast({
        title: "支付成功",
        icon: "success",
        duration: 2000
      });

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
          wx.hideLoading();
          console.log("ss", res);
          let data = res.data.data[0];
          let deviceCode = data.deviceCode;
          let roll_code = data.roll_code;
          wx.reLaunch({
            url: `/pages/pass/main?pass=${roll_code}&deviceCode=${deviceCode}`
          });
        }
      });
    },
    submit() {
      if (this.isOK) {
        this.isOK = false;
        this.isShow = true;
        if (this.deviceCode != "") {
          // 获取时间 价格
          
          let money = this.PayList[this.indexSelect].money * 1;
          // let time = this.PayList[this.indexSelect].hour;
          let value = this.indexSelect + 1;
          //let time = this.mealID;
          console.log("id",value)
          let user_id = wx.getStorageSync("userid");
          let openid = wx.getStorageSync("openid");
          console.log("付钱按钮", this.deviceCode);
          this.mesh = false;
          this.$request({
            url: "/app/CreatwXinfo",
            method: "POST",
            data: {
              deviceCode: this.deviceCode,
              user_id: user_id,
              actual_price: money * 100,
              //actual_price: money,
              hour: value,
              open_id: openid
            },

            success: res => {
              wx.hideLoading();
              setTimeout(() => {
                this.isOK = true;
                this.isShow = false;
              }, 1000);

              console.log("sa", res.data);
              res = res.data;
              this.$request({
                url: "/app/generateSignature",
                method: "POST",
                data: {
                  prepay_id: res.prepay_id
                },
                success: res => {
                  res = res.data;
                  wx.hideLoading();
                  wx.requestPayment({
                    timeStamp: res.timeStamp + "",
                    nonceStr: res.nonceStr,
                    package: res.package,
                    signType: "MD5",
                    paySign: res.paySign,
                    success: res => {
                      console.log('执行进来',res);
                      if (res.errMsg == "requestPayment:ok") {
                        this.paysucc();
                        return;
                      }
                    },
                    fail(res) {
                      console.log(res);
                      if (res.errMsg == "requestPayment:fail cancel") {
                        wx.showToast({
                          title: "取消支付",
                          icon: "none",
                          duration: 2000
                        });
                        return;
                      }
                    }
                  });
                }
              });
              // return;
              //
            },
            fail: err => {
              console.log("思路");
              this.mesh = true;
              wx.hideLoading();
              this.isOK = true;
              this.isShow = false;
            }
          });
          return;
          //
        }
      }
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
.content {
  position: absolute;
  width: 100%;
  top: 60%;
  margin-top: 20px;
  .head {
    position: relative;
    width: 115px;
    margin-left: 50px;
    font-size: 15px;
    color: #555;
    img {
      width: 20px;
      float: left;
      height: 20px;
      margin-right: 10px;
    }
  }
  .fakey {
    width: 90px;
    position: absolute;
    left: 30px;
    color: #555;
    font-size: 15px;
    display: flex;
    justify-content: space-evenly;
    margin-right: 10px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
      position: relative;
      top: -1px;
    }
  }
  .func {
    position: absolute;
    right: 0;
    font-size: 15px;
    float: left;
    top: 0;
    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
}
.body {
  position: relative;
  /* width: 70%; */
  left: 4%;
  height: 50px;
  float: left;
  top: 20px;
  .list {
    width: 100px;
    float: left;
    height: 100%;
    margin-right: 20px;
    border-radius: 5px;
    border: 1px solid #f4f4f4;
    font-size: 14px;
    position: relative;
    margin-bottom: 10px;
    .time {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 12px;
      // float: left;
    }
    .right {
      width: 55px;
      height: 100%;
      text-align: center;
      float: left;
      padding: 5px;
      box-sizing: border-box;
      font-size: 13px;
      line-height: 20px;
    }
  }
  .now {
    border: 1px solid #27a4ff;
  }
}

.next {
  width: 70%;
  position: relative;
  float: left;
  left: 15%;
  font-size: 16px;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  background-color: #009944;
  top: 90px;
  img {
    width: 25px;
    height: 25px;
    float: left;
    text-align: center;
    position: absolute;
    left: 25%;
    top: 5px;
  }
  p {
    text-align: center;
    float: left;
    color: #fff;
    width: 100%;
  }
}
</style>
