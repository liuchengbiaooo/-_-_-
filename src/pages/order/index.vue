<template>
  <div class="index">
    <div class="head">
      <div class="list" :class="{now:taberIndex==0}" @click="taber(0)">
        <p>进行中</p>
      </div>
      <div class="list" :class="{now:taberIndex==1}" @click="taber(1)">
        <p>已完成</p>
      </div>
    </div>

    <div class="jin wei" v-if="taberIndex==0">
      <div class="list" v-for="(item,index) in taber1" v-bind:key="index" @click="goPage(item)">
        <p class="title">
          {{item.address}}
          <!-- <span>充值 ￥{{item.actualPrice}}元</span> -->
        </p>
        <p class="time">已使用: {{item.spendTime}}</p>
        <p class="state">进行中</p>
        <p class="state-tiem">{{item.createTime}}</p>
      </div>
    </div>

    <div class="yi jin wei" v-if="taberIndex==1">
      <div class="list" v-for="(list,index1) in taber2" v-bind:key="index1">
        <p class="title">{{list.address}}</p>
        <p class="time">已使用: {{list.spendTime}}</p>
        <p class="time">结束时间:{{list.endeTime}}</p>
        <p class="state">已完成</p>
        <p class="state-tiem">充值费用￥{{list.actualPrice}}</p>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      taberIndex: 0,
      taber1: [],
      taber2: []
    };
  },
  mounted() {
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
        console.log(res.data.data.length);
        wx.setStorageSync("orderId", res.data.data[0].id);
        wx.hideLoading();
        if (res.data.data.length == 0) {
          return false;
        } else {
          res.data.data.map(item => {
            item.spendTime = this.countdown(item.createTime);
            item.createTime = this.timestampToTime(
              item.createTime.toString().substring(0, 10)
            );
            item.address = item.address.substring(0, 8) + "...";
          });
          this.taber1 = res.data.data;
        }
      }
    });
    this.$request({
      url: "/app/selectUserAppOrder",
      method: "POST",
      data: {
        page: 1,
        limit: 20,
        user_id: userid,
        status: 1
      },
      success: res => {
        wx.hideLoading();
        if (res.data.data.length == 0) {
          return;
        } else {
          res.data.data.map(item => {
            item.spendTime = this.countdown(item.createTime, item.endeTime);
            item.endeTime = this.timestampToTime(
              item.endeTime.toString().substring(0, 10)
            );
            item.address = item.address.substring(0, 8) + "...";
          });
          this.taber2 = res.data.data;
        }
      }
    });
  },
  methods: {
    goPage(data) {
      wx.navigateTo({
        url: `/pages/pass/main?deviceCode=${data.deviceCode}&pass=${
          data.roll_code
        }`
      });
    },
    taber(index) {
      this.taberIndex = index;
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    countdown(startTime, endTime) {
      var nowTime = new Date();
      if (endTime == undefined) {
        endTime = nowTime;
      }
      // var targetTime = new Date("2018/2/27 15:44:15");
      var spanTime = endTime - startTime;
      var hours = Math.floor(spanTime / (1000 * 60 * 60));
      spanTime -= hours * 60 * 60 * 1000;
      var minute = Math.floor(spanTime / (1000 * 60));
      spanTime -= minute * 60 * 1000;
      var second = Math.floor(spanTime / 1000);
      hours < 10 ? (hours = "0" + hours) : hours;
      minute < 10 ? (minute = "0" + minute) : minute;
      second < 10 ? (second = "0" + second) : second;
      return hours + "小时" + minute + "分" + second + "秒";
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  position: fixed;
  font-size: 14px;
  height: 45px;
  z-index: 555;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  .list {
    flex: 1;
    text-align: center;
    border-bottom: 2px solid #fff;
    padding: 12px 0;
  }
  .now {
    border-bottom: 2px solid #27a4ff;
    box-sizing: border-box;
    color: #27a4ff;
  }
  /* .list {
    flex: 1;
    width: 100%;
    height: 100%;
    line-height: 45px;
    text-align: center;
  } */
}

.wei {
  width: 100%;
  position: relative;
  top: 45px;
  padding: 0 20px;
  box-sizing: border-box;
  .list {
    height: 60px;
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 5px;
    float: left;
    border-bottom: 1px solid #e5e5e5;
    .title {
      width: 100%;
      height: 30px;
      float: left;
      font-size: 16px;
      line-height: 30px;
      span {
        font-size: 14px;
        color: rgb(47, 255, 110);
      }
    }
    .time {
      font-size: 12px;
      width: 100%;
      line-height: 20px;
    }
    .state {
      position: absolute;
      font-size: 14px;
      right: 0px;
      top: 10px;
      color: #e0cd2d;
    }
  }
}

.jin {
  .state {
    color: #27a4ff !important;
  }

  .state-tiem {
    position: absolute;
    font-size: 12px;
    right: 0px;
    top: 40px;
  }
}

.yi {
  .list {
    height: 90px;
  }
  .state {
    color: rgb(47, 255, 110) !important;
  }
}
</style>
