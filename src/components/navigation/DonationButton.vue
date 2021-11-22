<template>
  <a
    href="https://www.paypal.com/donate/?hosted_button_id=2XRA22TYQP2FY"
    class="btn btn-outline-light"
    role="button"
  >
    <font-awesome-icon class="me-2" :icon="['fal', 'donate']" />
    {{ $t("donate") }}
  </a>
</template>
<script>
export default {
  name: "DonationButton",
};
</script>
<style lang="scss" scoped>
a {
  text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);
  svg {
    filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
  }
}
</style>