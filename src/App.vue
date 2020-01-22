<script>
export default {
  created() {
    console.log("app created and cache logs by setStorageSync");
    console.log("白墨科技 xingmh@wicoding.com");
    wx.login({
      success: res => {
        if (res.code) {
          // 发起网络请求
          //console.log('app',res.code)
          this.$request({
            url: "/app/wxLogin",
            method: "POST",
            data: {
              code: res.code
            },
            success: res => {
              wx.hideLoading();
              if (res.statusCode == 200) {
                let userID = res.data.data;
                console.log('id',userID)
                wx.setStorageSync("openid", userID);
              }
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  }
};
</script>

<style>
page {
  background-color: #fff;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
