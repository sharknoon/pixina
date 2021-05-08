<template>
  <button @click="goBack()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'times']" size="lg" />
  </button>
</template>
<script>
export default {
  name: "BackButton",
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>