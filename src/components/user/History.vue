<template>
    <div>
        <img :src="items[current_item]">
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
  created() {
    for (let index = 0; index < 100; index++) {
      this.items.push(this.getItemUrl(index));
    }
  },
};
</script>
