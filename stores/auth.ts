import type { AuthModel } from "pocketbase";

export const useAuthStore = defineStore("user", () => {
  const pocketBase = usePocketBase();

  const user = ref<AuthModel | null>(pocketBase.authStore.model);

  const isLoggedIn = computed(() => user.value !== null);

  const authProviders = computed(async () => {
    const authMethods = await pocketBase.collection("users").listAuthMethods();
    return authMethods.authProviders;
  });

  const refresh = () => {
    user.value = pocketBase.authStore.model;
  };

  pocketBase.authStore.onChange(() => {
    refresh();
  });

  const login = async (provider: string) => {
    const authData = await pocketBase
      .collection("users")
      .authWithOAuth2({ provider });

    // Set name of user
    await pocketBase.collection("users").update(authData.record.id, {
      name: authData.meta?.name ?? "Unknown",
    });

    return authData;
  };

  const logout = () => {
    pocketBase.authStore.clear();
  };

  return { user, isLoggedIn, authProviders, refresh, login, logout };
});
