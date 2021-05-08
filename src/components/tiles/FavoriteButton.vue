<template>
  <button @click="toggleFavorite()" class="btn btn-dark">
    <font-awesome-icon :icon="[iconStyle, 'star']" size="lg" />
  </button>
</template>
<script>
export default {
  name: "FavoriteButton",
  props: {
    tileNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    iconStyle() {
      return this.$store.getters.isFavorite(this.tileNumber) ? "fas" : "fal";
    },
  },
  methods: {
    toggleFavorite() {
      this.$store.commit("toggleFavoriteTile", this.tileNumber);
    },
  },
};
</script>