<template>
  <ClientOnly>
    <div class="dropdown" v-if="!userStore.isLoggedIn">
      <button
        class="btn btn-sm btn-outline-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ $t("login") }}
      </button>
      <ul class="dropdown-menu">
        <li v-for="provider in authMethods.authProviders">
          <button class="dropdown-item" @click="loginWith(provider.name)">
            Login with {{ provider.displayName }}
          </button>
        </li>
      </ul>
    </div>

    <div class="dropdown" v-if="userStore.isLoggedIn">
      <button
        class="btn btn-sm btn-outline-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ userStore.user?.meta?.name }}
      </button>
      <ul class="dropdown-menu">
        <li>
          <button class="dropdown-item" @click="logout()">
            {{ $t("logout") }}
          </button>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const pocketBase = usePocketBase();
const userStore = useUserStore();
const favoriteTilesStore = useFavoriteTilesStore();

const authMethods = await pocketBase.collection("users").listAuthMethods();

async function loginWith(provider: string) {
  if (!pocketBase) return;
  try {
    // login
    const authData = await pocketBase
      .collection("users")
      .authWithOAuth2({ provider });
    userStore.setUser(authData);

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
      new Set([...localFavoriteTiles, ...cloudFavoriteTiles])
    );

    // save merged favorite tiles
    favoriteTilesStore.favoriteTiles = mergedFavoriteTiles;
  } catch (error) {
    console.log("Login failed: " + error);
  }
}

async function logout() {
  if (!pocketBase) return;
  try {
    pocketBase.authStore.clear();
    userStore.setUser(null);
  } catch (error) {
    console.log("Logout failed: " + error);
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
