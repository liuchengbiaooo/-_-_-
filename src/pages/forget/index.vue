<template>
    <div class="shadow">
     <div class="const">
        <div class="method">
          扫码支付后，忘记了密码？或者支付后因为网络的原因没有获取到密码？下面的两种方式让你找回龙享物联充电线的密码。
        </div>
        <div class="methodOne">
           <span class="means">方法一</span>
           <span class="introduce">重新扫描设备二维码获取忘记的密码。</span>
           <span>第一步：退出小程序，返回微信。打开扫一扫，重新扫描设备二维码。</span>
           <img src="../../../static/mima1.jpg" alt="" mode='scaleToFill' style="width: 225px; height: 400px;"/>
           <span>第二步：扫描后进入小程序，小程序会弹出提示有‘未完成订单’。</span>
           <img src="../../../static/mima2.jpg" alt="" mode='scaleToFill' style="width: 225px; height: 400px;"/>
           <span>第三步：点击进入，即可查看到密码。</span>
           <img src="../../../static/mima4.jpg" alt="" mode='scaleToFill' style="width: 225px; height: 400px;"/>
        </div>
        <div class="methodTwo">
           <span class="means">方法二</span>
           <span class="introduce">查看订单获取忘记的密码。</span>
           <span>第一步：点击小程序左上角的返回符号，返回到小程序首页地图页面。</span>
           <span>第二步：点击首页左上角的个人头像，进入个人中心。</span>
           <img src="../../../static/mima5.jpg" alt="" mode='scaleToFill' style="width: 225px; height: 400px;"/>
           <span>第三步：在个人中心，点击我的订单，进入到订单列表。</span>
           <img src="../../../static/mima6.jpg" alt="" mode='scaleToFill' style="width: 225px; height: 400px;"/>
           <span>第四步：在我的订单列表里，可查看到您正在进行的订单。</span>
           <img src="../../../static/mima7.jpg" alt="" mode='scaleToFill' style="width: 225px; height: 400px;"/>
           <span>点击此进行中的订单，即可查看到您忘记的密码。</span>
           <img src="../../../static/mima8.jpg" alt="" mode='scaleToFill' style="width: 225px; height: 400px;"/>
        </div>
     </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
};
</script>

<style scoped lang="scss">
  .const{
    margin:15px 10px 0px 10px;
    background-color: white;
    font-size: 14px;
    line-height: 25px;
    color: #555;
    .method{
      color: #E82E2E;
    }
    .methodOne{
      margin-top: 15px;
      .means{
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }
      .introduce{
        color: #E82E2E;
      }
      span{
        display: block;
        margin: 4px 0px 4px 0px;
     }
    }
    .methodTwo{
      margin-top: 15px;
      .means{
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }
      .introduce{
        color: #E82E2E;
      }
      span{
        display: block;
        margin: 4px 0px 4px 0px;
      }
    }
  }

</style>
