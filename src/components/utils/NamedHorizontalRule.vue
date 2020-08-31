<template>
  <div class="d-flex align-items-center my-2">
    <hr class="w-100" />
    <div class="text-muted mx-3">
      <small>{{ text }}</small>
    </div>
    <hr class="w-100" />
  </div>
</template>

<script>
export default {
  name: "NamedHorizonzalRule",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>