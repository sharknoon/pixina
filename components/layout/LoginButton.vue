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
          <button class="dropdown-item" @click="loginWith(provider.name)">
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
const favoriteTilesStore = useFavoriteTilesStore();

onMounted(() => {
  authStore.refresh();
});

const authProviders = await authStore.authProviders;

async function loginWith(provider: string) {
  try {
    const authData = await authStore.login(provider);

    // get local and cloud favorite tiles
    const localFavoriteTiles = favoriteTilesStore.favoriteTiles;
    let cloudFavoriteTiles: number[] = [];
    if (authData?.record?.favorite_tiles) {
      try {
        cloudFavoriteTiles = authData.record.favorite_tiles;
      } catch (error) {
        console.log("Failed to parse cloud favorite tiles: " + error);
      }
    }

    // merge local and cloud favorite tiles
    const mergedFavoriteTiles = Array.from(
      new Set([...localFavoriteTiles, ...cloudFavoriteTiles]),
    );

    // save merged favorite tiles
    favoriteTilesStore.favoriteTiles = mergedFavoriteTiles;
  } catch (error) {
    console.log("Login failed: " + error);
  }
}
</script>

<style lang="scss" scoped>
a {
  text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);

  svg {
    filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
  }
}
</style>
