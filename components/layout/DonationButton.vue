<template>
  <a
    href="https://www.paypal.com/donate/?hosted_button_id=2XRA22TYQP2FY"
    class="btn btn-outline-light"
    target="_blank"
    role="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="height: 1.5rem; width: 1.5rem"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    {{ $t("donate") }}
  </a>
</template>

<style lang="scss" scoped>
a {
  text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);

  svg {
    filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
  }
}
</style>
