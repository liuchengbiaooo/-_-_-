<template>
  <div class="index">
    <div class="content">
      <div class="title">
        <p>10:26</p>
      </div>
      <div class="title">
        <p>编号001为您服务</p>
      </div>

      <div
        v-for="(item,index) in list"
        v-bind:key="index"
        class="ke"
        :class="{user:item.type == 1}"
      >
        <img
          v-if="item.type ==0"
          src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_customerservice.png"
        >
        <img
          v-else
          :src="userImg"
        >

        <p>
          {{item.message}}
        </p>
      </div>

      <!-- <div class="user ke">
        <img :src="userImg">
        <p>
          如何扫码?
        </p>
      </div> -->

    </div>
    <div class="footer">
      <input
        type="text"
        v-model="input"
        placeholder="请输入"
      >
      <p
        class="spend"
        @click="spend()"
      >
        发送
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      userImg: "",
      list: [
        {
          type: 0,
          message: "请问有什么能帮助到您?"
        },
        {
          type: 1,
          message: "如何扫码?"
        }
      ],
      help: [
        {
          title: "如何使用龙享物联共享充电线？",
          message:
            "1.按键盘时指示灯---蓝色(响) 2.输入密码时，按一次灯闪烁一次(蓝)"
        },
        {
          title: "龙享物联共享充电线是否安全可靠？",
          message:
            "龙享物联共享充电线输出标准安全充电电流，只能进行电能传输，不支持数据传输，无法获取任何手机信息，百分之一百是安全的。"
        },
        {
          title: "龙享物联共享充电线是否支持快充？",
          message:
            "支持。龙享物联共享充电线可以根据插入的设备，自动识别是否进行快充，充电速度比一般的充电器快1倍不止，且具有多重保护功能，可以在不损伤手机电池的情况下达到最快的充电速度。"
        },
        {
          title: "支持同时充电多台设备吗？",
          message:
            "支持。龙享物联共享充电线充电头采取了分流算法设计，当用户插入多台充电设备时，可根据最优分流算法进行充电，设备互相之间不影响。"
        },
        {
          title: "龙享物联共享充电线支持哪些手机类型？",
          message:
            "龙享物联共享充电线自带三合一接口充电线，能支持安卓手机、苹果5/6及以上机型和Type-c接口手机。"
        },
        {
          title: "忘记了充电密码怎么办？",
          message:
            "龙享物联共享充电线充电密码在使用时间内，可以重复使用。用户进入龙享物联小程序，可以查看尚在使用时间内的充电线密码。"
        },
        {
          title: "付款后充电密码无法使用怎么办？",
          message:
            "出现这种情况，请联系我们的客服，说明情况，让我们的客服帮您解决相关充电问题。"
        }
      ]
    };
  },
  mounted() {
    const userInfo = wx.getStorageSync("userInfo");
    this.userImg = userInfo.avatarUrl;
  },
  methods: {
    spend() {
      this.list.push({
        type: 1,
        message: this.input
      });
      this.help.map((item, index) => {
        if (item.title == this.input) {
          this.list.push({
            type: 0,
            message: item.message
          });
        }
      });
      this.input = "";
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  width: 100%;
  float: left;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
}
.content {
  position: relative;
  width: 100%;
  .title {
    width: 100%;
    height: 20px;
    text-align: center;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    p {
      font-size: 10px;
      padding: 5px 10px;
      text-align: center;
      line-height: 10px;
      color: #fff;
      float: left;
      border-radius: 5px;
      background-color: #cecece;
    }
  }
  .ke {
    width: 100%;
    font-size: 14px;
    position: relative;
    top: 30px;
    float: left;
    margin-bottom: 20px;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      float: left;
    }
    p {
      margin-left: 15px;
      line-height: 20px;
      position: relative;
      top: 5px;
      text-align: left;
      padding: 8px 15px;
      background-color: #f1f1f1;
      border-radius: 5px;
      float: left;
      max-width: 70%;
    }
  }
  .user {
    img {
      float: right;
    }
    p {
      float: right !important;
      margin-right: 15px !important;
      color: #fff !important;
      background-color: #456baf;
    }
  }
}

.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  font-size: 14px;
  background-color: #f1f1f1;
  left: 0;
  input {
    width: 70%;
    height: 30px;
    line-height: 30px;
    position: relative;
    top: 5px;
    left: 10px;
    padding-left: 15px;
    border-radius: 5px;
    background-color: #fff;
    float: left;
  }
  .spend {
    font-size: 14px;
    color: #fff;
    background-color: #72a4ff;
    border-radius: 5px;

    line-height: 16px;
    top: 8px;
    padding: 5px;
    box-sizing: border-box;
    height: 25px;
    width: 40px;
    float: right;
    position: relative;
    right: 10px;
  }
}
</style>
