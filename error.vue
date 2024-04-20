<template>
  <NuxtLayout>
    <div class="d-flex flex-column align-items-center justify-content-center h-100">
      <template v-if="error.statusCode === 404">
        <h1>404!</h1>
        <p>{{ $t("page-not-found-explanation") }}</p>
      </template>
      <template v-else>
        <h1>{{ $t("error-occured") }}</h1>
        <p>
          <strong>{{ error.message }}</strong>
        </p>
        <p>{{ $t("error-explanation") }}</p>
      </template>
      <button type="button" class="btn btn-primary" @click="handleError">
        {{ $t("go-back-home") }}
      </button>
    </div>
  </NuxtLayout>
</template>
<script setup>
const error = useError();
const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>
