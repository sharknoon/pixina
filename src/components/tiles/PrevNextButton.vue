<template>
  <button @click="goToPrevNext()" class="btn btn-dark m-3" :disabled="disabled">
    <font-awesome-icon :icon="icon" size="2x" />
  </button>
</template>
<script>
export default {
  name: "PrevNextButton",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      return ["far", this.type === "next" ? "chevron-right" : "chevron-left"];
    },
    number() {
      return parseInt(this.$route.params.number);
    },
    disabled() {
      return this.type === "next" ? this.number >= 499 : this.number <= 0;
    },
  },
  methods: {
    goToPrevNext() {
      const number = this.type === "next" ? this.number + 1 : this.number - 1;
      this.$router.push({ name: "Template", params: { number } });
    },
  },
};
</script>