<template>
  <button @click="goBack()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'times']" size="lg" />
  </button>
</template>
<script>
export default {
  name: "CloseButton",
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$router.push(this.route);
    },
  },
};
</script>