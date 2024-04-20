<script setup lang="ts">
definePageMeta({
  middleware: function () {
    return navigateTo({ name: "templates" });
  },
});
</script>
