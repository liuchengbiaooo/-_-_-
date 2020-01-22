<template>
  <div class="index">
    <div class="content">
      <p class="title">设备密码</p>
      <div class="pass">
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
      <p class="title">充电进程及操作</p>
      <div class="flow">
        <p>a.通电时:指示灯显示颜色--红色</p>
        <p>a.通电时:指示灯显示颜色--蓝色</p>
        <p>a.通电时:指示灯显示颜色--绿色</p>
      </div>
      <p class="title">1.按键盘时指示灯---蓝色(响)</p>
      <p class="title">2.输入密码时，按一次灯闪烁一次(蓝)</p>
      <p class="title">密码输入正确:密码匹配一致，开始充电.(绿等亮)</p>
      <p class="title">密码输入错误:闪烁3秒(蓝灯),蜂鸣器3秒，密码回复初始归零</p>

      <p class="tips">
        注意:如付费充电一次,实际充电30分钟断了，如需要继续使用充电，则需要重新输入已知密码，否则充电不能正常进行
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs: []
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;
}
.content {
  width: 100%;
  position: relative;
  height: 100%;
  .title {
    height: 30px;
    line-height: 30px;
    float: left;
    width: 100%;
  }
  .pass {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    float: left;
    p {
      width: 100%;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
  }
  .flow {
    padding: 10px 20px;
    box-sizing: border-box;
    float: left;
    border: 1px dashed #ccc;
    width: 100%;
    p {
      width: 100%;
      height: 25px;
      line-height: 25px;
    }
  }
  .tips {
    top: 40px;
    position: relative;
    @extend .title;
    color: #c82020;
  }
}
</style>
