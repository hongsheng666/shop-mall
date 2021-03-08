<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, delay = 2000) {
      this.message = message;
      this.delay = delay;
      this.isShow = true;
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, delay);
    },
  },
};
</script>

<style scoped>
.toast {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  border-radius: 8px;
}
</style>