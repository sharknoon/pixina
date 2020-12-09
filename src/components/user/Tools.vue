<template>
  <div class="d-flex flex-wrap justify-content-evenly">
    <div
      v-for="item in items"
      :key="item.number"
      class="position-relative m-2"
    >
      <img :src="item.src_template" alt="picture" width="4.75rem" />
      <div
        class="thumbnail-footer position-absolute bottom-0 bg-light text-dark fs-5 fw-bold w-100"
      >
        {{ getTemplateTitle(item.number, false) }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tools",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getTemplateUrl(number) {
      return require("./../../assets/images/templates/" + number + ".webp");
    },
    getDetailedTemplateUrl(number) {
      return require("./../../assets/images/templates/" +
        number +
        "-detailed.webp");
    },
    getCoordinates(number) {
      let x = number % 20;
      let y = Math.floor(number / 20);
      return [x, y];
    },
    getTemplateTitle(number, long = true) {
      let coordinates = this.getCoordinates(number);
      let short = number + " (" + coordinates[0] + "|" + coordinates[1] + ")";
      if (long) {
        return "Bild Nr. " + short;
      } else {
        return short;
      }
    },
  },
  created() {
    this.items = [];
    for (let index = 0; index < 500; index++) {
      let item = {
        src_template: this.getTemplateUrl(index),
        src: this.getDetailedTemplateUrl(index),
        w: 5000,
        h: 4000,
        title: this.getTemplateTitle(index),
        number: index,
      };
      this.items.push(item);
    }
  },
};
</script>
<style lang="scss">
.thumbnail-footer {
  padding: 0.1rem; /* Some padding */
  font-family: arial;
}
</style>