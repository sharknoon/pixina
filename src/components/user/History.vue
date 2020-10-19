<template>
    <div>
        <img :src="items[current_item].src">
        <form>
            <input type="range" class="form-control-range" min="0" max="99" v-model="current_item">
        </form>
    </div>
</template>
<script>
export default {
  name: "History",
  data() {
    return {
      items: [],
      current_item: 0,
    };
  },
  methods: {
    getItemUrl(number) {
      return require("./../../assets/images/history/" + number + ".webp");
    },
  },
  mounted() {
    for (let index = 0; index < 100; index++) {
      let image = new Image();
      image.src = this.getItemUrl(index);
      this.items.push(image);
    }
  },
};
</script>
