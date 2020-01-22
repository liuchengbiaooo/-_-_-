<template>
  <div class="index">
    <div class="content">
      <div
        class="list"
        v-for="(item,index) in list"
        v-bind:key="index"
        @click="IndexCont(index)"
      >
        <div class="top">
          <p class="title">
            {{item.title}}
          </p>
          <img
            src="https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/ic_next.png"
            alt=""
            class="right"
          >
        </div>
        <p
          class="show"
          v-if="index ==select"
        >
          {{item.message}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: 0,
      list: [
        {
          title: "1.如何使用龙享物联共享充电线？",
          message: "1.按键盘时指示灯---蓝色(响) 2.输入密码时，按一次灯闪烁一次(蓝)"
        },
        {
          title: "2.龙享物联共享充电线是否安全可靠？",
          message:
            "龙享物联共享充电线输出标准安全充电电流，只能进行电能传输，不支持数据传输，无法获取任何手机信息，百分之一百是安全的。"
        },
        {
          title: "3.龙享物联共享充电线是否支持快充？",
          message:
            "支持。龙享物联共享充电线可以根据插入的设备，自动识别是否进行快充，充电速度比一般的充电器快1倍不止，且具有多重保护功能，可以在不损伤手机电池的情况下达到最快的充电速度。"
        },
        {
          title: "4.支持同时充电多台设备吗？",
          message:
            "支持。龙享物联共享充电线充电头采取了分流算法设计，当用户插入多台充电设备时，可根据最优分流算法进行充电，设备互相之间不影响。"
        },
        {
          title: "5.龙享物联共享充电线支持哪些手机类型？",
          message:
            "龙享物联共享充电线自带三合一接口充电线，能支持安卓手机、苹果5/6及以上机型和Type-c接口手机。"
        },
        {
          title: "6.忘记了充电密码怎么办？",
          message:
            "龙享物联共享充电线充电密码在使用时间内，可以重复使用。用户进入龙享物联小程序，可以查看尚在使用时间内的充电线密码。"
        },
        {
          title: "7.付款后充电密码无法使用怎么办？",
          message:
            "出现这种情况，请联系我们的客服，说明情况，让我们的客服帮您解决相关充电问题。"
        }
      ]
    };
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "常见问题"
    });
  },
  methods: {
    IndexCont(index) {
      this.select = index;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  width: 100%;
  float: left;
  padding: 5px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  .top {
    position: relative;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    img {
      height: 20px;
      width: 20px;
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }
  .show {
    font-size: 13px;
    line-height: 20px;
    width: 100%;
    color: #555;
  }
}
</style>
