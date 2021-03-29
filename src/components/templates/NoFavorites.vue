<template>
  <div class="d-flex flex-column align-items-center">
    <div>{{ $t("no-favorites") }}</div>
    <div>
      <i18n path="add-favorites" tag="small">
        <font-awesome-icon
          :icon="['far', 'star']"
          style="color: orange"
          size="lg"
        />
      </i18n>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoFavorites",
};
</script>
