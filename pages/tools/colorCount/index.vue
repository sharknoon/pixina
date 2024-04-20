<script setup lang="ts">
definePageMeta({
  middleware: function (from) {
    return navigateTo({ name: "tools-color-count", query: from.query });
  },
});
</script>
