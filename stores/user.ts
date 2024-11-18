import type { AuthModel } from "pocketbase";

export const useUserStore = defineStore("user", () => {
  const pocketBase = usePocketBase();

  const user = ref<AuthModel | null>(pocketBase.authStore.model);

  pocketBase.authStore.onChange((_, model) => {
    user.value = model;
  });

  const isLoggedIn = computed(() => user.value !== null);

  return { user, isLoggedIn };
});
