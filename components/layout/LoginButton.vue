<template>
  <ClientOnly>
    <div v-if="!authStore.isLoggedIn" class="dropdown">
      <button
        class="btn btn-sm btn-outline-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ $t("login") }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li v-for="provider in authProviders" :key="provider.name">
          <button class="dropdown-item" @click="authStore.login(provider.name)">
            {{ $t("login-with-provider", { provider: provider.displayName }) }}
          </button>
        </li>
      </ul>
    </div>

    <div v-if="authStore.isLoggedIn" class="dropdown">
      <button
        class="btn btn-sm btn-outline-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ authStore.user?.name }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <button class="dropdown-item" @click="authStore.logout()">
            {{ $t("logout") }}
          </button>
        </li>
      </ul>
    </div>
    <template #fallback>
      <button
        class="btn btn-sm btn-outline-light dropdown-toggle"
        type="button"
        aria-expanded="false"
      >
        {{ $t("loading") }}
      </button>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const authProviders = await authStore.authProviders;
</script>

<style lang="scss" scoped>
a {
  text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);

  svg {
    filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
  }
}
</style>
