import type { AuthModel } from "pocketbase";

export const useUserStore = defineStore("user", () => {
  const user = ref<AuthModel | null>(null);

  function setUser(newUser: AuthModel | null) {
    user.value = newUser;
  }

  const isLoggedIn = computed(() => user.value !== null);

  return { user, setUser, isLoggedIn };
});
