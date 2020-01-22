<template>
  <div class="index">
    导航
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let query = this.$root.$mp.query;
    wx.getLocation({
      type: "gcj02", // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        });
      }
    });
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
