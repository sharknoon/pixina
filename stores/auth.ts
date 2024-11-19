import type { AuthModel, RecordModel } from "pocketbase";

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

  onMounted(() => {
    refresh();
  });

  const onLoginListeners: ((user: RecordModel) => void)[] = [];
  const onLogin = (listener: (user: RecordModel) => void) => {
    onLoginListeners.push(listener);
  };

  const login = async (provider: string) => {
    const authData = await pocketBase
      .collection("users")
      .authWithOAuth2({ provider });

    // Set name of user
    await pocketBase.collection("users").update(authData.record.id, {
      name: authData.meta?.name ?? "Unknown",
    });

    for (const listener of onLoginListeners) {
      listener(authData.record);
    }

    return authData;
  };

  const onLogoutListeners: (() => void)[] = [];
  const onLogout = (listener: () => void) => {
    onLogoutListeners.push(listener);
  };

  const logout = () => {
    pocketBase.authStore.clear();
    for (const listener of onLogoutListeners) {
      listener();
    }
  };

  return {
    user,
    isLoggedIn,
    authProviders,
    refresh,
    login,
    onLogin,
    logout,
    onLogout,
  };
});
