<template>
  <div class="index">
     <!-- <div class="nogg" v-show="mesh">
        网络貌似不给力~
     </div> -->
    <div class="content">
      <div
        class="list"
        v-for="(item,index) in list"
        v-bind:key="index"
      >
        <img
          class="show"
          src="../../../static/laingzhiLongin.jpg"
          alt=""
        >
        <div class="info">
          <div class="left">
            <p class="title">{{item.address}}</p>
            <div class="item time">
              <img
                src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/cdb_shjian.png"
                alt=""
              >
              <p>周一至周五 10:00-20:00</p>
            </div>
            <div class="item address">
              <img
                src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/cdb_dizhi.png"
                alt=""
              >
              <p>周一至周五 10:00-20:00</p>
            </div>
          </div>
          <div class="right">
            <p class="distance">距离{{item.m}}km</p>
            <div
              class="dao"
              @click="goPage(index)"
            >
              <img
                src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/cdb_daohang.png"
                alt=""
              >
              <p>导航</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      latitude: "",
      longitude: "",
      mesh:false,
    };
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "门店列表"
    });
    wx.authorize({
      scope: "scope.userLocation",
      success: () => {
        wx.getLocation({
          type: "wgs84",
          success: res => {
            this.latitude = res.latitude;
            this.longitude = res.longitude;

            this.start();
            return;
          }
        });
      }
    });

    // this.start();
  },
  methods: {
    start() {
      this.$request({
        url: "/app/selectNearbyNet",
        method: "POST",
        data: {
          lat: this.longitude,
          lng: this.latitude
        },
        success: res => {
          wx.hideLoading();
          this.mesh = false;
          if (res.statusCode == 200) {
            this.list = "";
            console.log(res.data.data);
            let list = [];
            res.data.data.map((item, index) => {
              item.address = item.address.toString().substring(0, 10) + "...";
              item.m = (item.m * 0.001).toFixed(2);
            });
            this.list = res.data.data;
          } else {
            console.log("请求错误");
          }
        },
        fail: err =>{
          this.mesh = true;
          setTimeout(()=>{
            this.start();
          },3000)
        }
      });
    },
    goPage(index) {
      if (this.list[index].addressLat != "") {
        let addressLat = Number(this.list[index].addressLat);
        let addressLon = Number(this.list[index].addressLon);
        console.log(addressLat, addressLon);

        wx.openLocation({
          latitude: addressLon,
          longitude: addressLat,
          scale: 18
        });
      } else {
        console.log("坐标错误");
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  float: left;
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
.list {
  position: relative;
  width: 100%;
  float: left;
  height: 100px;
  padding: 20px 10px;
  box-sizing: border-box;
  font-size: 14px;
  border-bottom: 1px solid #ebebeb;
  .show {
    height: 60px;
    width: 60px;
    border-radius: 5px;
    float: left;
  }
  .info {
    position: relative;
    width: 100%;
    float: left;
    margin-left: 10px;
    width: calc(100% - 70px);
    .right {
      position: absolute;
      right: 0px;
      height: 100%;
      float: right;
      .distance {
        font-size: 12px;
        color: #afafaf;
        float: right;
      }
      .dao {
        position: absolute;
        bottom: 0px;
        width: 55px;
        box-shadow: 0px 0px 5px 0px #ccc;
        img {
          height: 20px;
          width: 20px;
          float: left;
        }
        p {
          font-size: 12px;
          color: #afafaf;
          line-height: 20px;
          float: left;
        }
      }
    }
    .left {
      height: 100%;
      width: 100%;
      float: left;
      .title {
        font-size: 16px;
        line-height: 25px;
      }
      .item {
        float: left;
        width: 100%;
        line-height: 20px;
        color: #afafaf;
        img {
          position: relative;
          top: 5px;
          height: 10px;
          width: 10px;
          float: left;
          margin-right: 5px;
        }
        p {
          font-size: 12px;
          float: left;
        }
      }
    }
  }
}
</style>
