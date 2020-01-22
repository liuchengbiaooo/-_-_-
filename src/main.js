import Vue from "vue";
import App from "./App";


Vue.config.productionTip = false;
App.mpType = "app";
//const $URL = "https://cd.lzmalls.com";
const $URL = "https://longxiang.mobi";

function request(data) {
    wx.showLoading({
        title: '加载中',
    });
    data.url = $URL + data.url;
    data.header = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    return new wx.request(data);

}
Vue.prototype.$request = request;
Vue.prototype.$URL = $URL;

const app = new Vue(App);
app.$mount();