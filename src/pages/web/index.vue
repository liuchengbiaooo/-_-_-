<template>
  <div class="index">
    <web-view :src="src"></web-view>

  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      src: ""
    };
  },
  mounted() {
    let query = this.$root.$mp.query;
    this.query = query;
    if (query.src != undefined) {
      this.src = query.src;
    }
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
 