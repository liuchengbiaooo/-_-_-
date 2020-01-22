<template>
  <div class="index">
    <div class="head">
      <div
        class="list"
        v-for="(item,index) in headList"
        v-bind:key="index"
        @click="taber(index)"
        :class="{now:taberIndex==index}"
      >
        {{item}}
      </div>
    </div>

    <div class="content">
      <div
        class="wei"
        v-if="taberIndex==0"
      >
        <!-- <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              立即使用
            </p>
          </div>
        </div>
        <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              立即使用
            </p>
          </div>
        </div>
        <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              立即使用
            </p>
          </div>
        </div> -->
      </div>

      <!--  -->
      <div
        class="yi wei"
        v-if="taberIndex==1"
      >
        <!-- <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              已使用
            </p>
          </div>
        </div>
        <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              已使用
            </p>
          </div>
        </div>
        <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              已使用
            </p>
          </div>
        </div> -->
      </div>

      <!--  -->
      <div
        class="yi wei"
        v-if="taberIndex==2"
      >
        <!-- <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              已过期
            </p>
          </div>
        </div>
        <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              已过期
            </p>
          </div>
        </div>
        <div class="list">
          <p class="money">
            ￥10元
            <span>优惠卷</span>
          </p>
          <div class="time">
            <div class="axis">
              <p class="start">
                9月24日
              </p>
              <p class="zhi">至</p>
              <p class="end">
                10月10日
              </p>
            </div>
            <p class="spend">
              已过期
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headList: ["未使用", "已使用", "已过期"],
      taberIndex: 0
    };
  },
  methods: {
    taber(index) {
      this.taberIndex = index;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.head {
  position: relative;
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .list {
    flex: 1;
    line-height: 40px;
    text-align: center;
    border-bottom: 2px solid #fff;
  }
  .now {
    border-color: #27a4ff;
  }
}

.content {
  position: relative;
  top: 10px;
  float: left;
  width: 100%;
  .wei {
    width: 100%;
    float: left;
    position: relative;
    .list {
      height: 110px;
      margin: 10px 0;
      width: calc(100% - 20px);
      position: relative;
      left: 10px;
      box-sizing: border-box;
      float: left;
      background-image: url(https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/coupon1.png);
      background-size: 100% 100%;

      .money {
        position: relative;
        line-height: 110px;
        left: 40px;
        font-size: 18px;
        color: #fff;
        float: left;
        span {
          font-size: 12px;
        }
      }
      .time {
        position: absolute;
        right: 0px;
        height: 100%;
        width: 125px;
        font-size: 12px;
        .axis {
          position: relative;
          top: 10px;
          p {
            position: relative;
            width: 100%;
            line-height: 20px;
            text-align: center;
          }
        }
        .spend {
          font-size: 12px;
          padding: 5px 15px;
          color: #fff;
          float: left;
          text-align: center;
          background-color: #27a4ff;
          border-radius: 50px;
          margin: 0 auto;
          position: relative;
          left: 30px;
          top: 15px;
        }
      }
    }
  }
  .yi {
    .list {
      background-image: url(https://wi-liangzhi.oss-cn-shenzhen.aliyuncs.com/image/coupon2.png);
    }
    .spend {
      background-color: #dcdcdc !important;
    }
  }
}
</style>
