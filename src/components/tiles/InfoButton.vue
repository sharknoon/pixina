<template>
  <button @click="showInfo()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'info-circle']" size="lg" />
  </button>
</template>
<script>
export default {
  name: "InfoButton",
  props: {
    tileNumber: {
      type: Number,
      required: true,
    },
  },
  methods: {
    showInfo() {
      this.$router.push({
        name: "ColorCountTile",
        query: { tiles: [this.tileNumber] },
      });
    },
  },
};
</script>