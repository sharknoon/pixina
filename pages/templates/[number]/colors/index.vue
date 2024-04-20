<script setup lang="ts">
definePageMeta({
  middleware: function (from) {
    const paramsNumber = from.params.number;
    let number: number;
    if (Array.isArray(paramsNumber)) {
      number = parseInt(paramsNumber[0]);
    } else {
      number = parseInt(paramsNumber);
    }
    return navigateTo({ name: "tools-color-count", query: { tiles: number } });
  },
});
</script>
