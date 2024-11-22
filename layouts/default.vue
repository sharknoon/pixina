<template>
  <div class="h-100 d-flex">
    <!-- In case of desktop wiew, display left navigation bar -->
    <div
      id="navigation-sidebar"
      class="text-start d-none d-md-flex flex-column background p-2"
    >
      <!-- Logo Area -->
      <NuxtLink to="/">
        <img
          id="navigation-logo"
          class="img-fluid mb-2"
          src="/images/logo-white.svg"
        />
      </NuxtLink>
      <!-- Items Area -->
      <nav class="d-flex flex-column">
        <div
          class="indicator"
          :style="`transform: translateY(${translationY}rem);`"
        />
        <NuxtLink
          v-for="item in items"
          :key="item.name"
          :to="item.to"
          class="router-link d-flex align-items-center"
          :class="{ 'router-link-active': $route.path.startsWith(item.to) }"
        >
          <!-- eslint-disable vue/no-v-html -->
          <span class="me-2" v-html="item.icon" />
          <span class="pt-1">{{ item.name }}</span>
        </NuxtLink>
      </nav>
      <div class="mt-auto d-flex justify-content-between align-items-center">
        <NuxtLink to="/privacy" class="link-light link-underline-opacity-0">{{
          $t("privacy")
        }}</NuxtLink>
        <div class="d-flex gap-2">
          <LayoutLanguageButton />
          <LayoutLoginButton />
        </div>
      </div>
    </div>
    <div class="d-flex flex-grow-1 flex-column">
      <!-- In case of mobile view, display top navigation bar -->
      <nav
        id="navigation-bar"
        class="navbar d-md-none navbar-expand-lg navbar-light p-2 background flex-grow-0 flex-shrink-0"
      >
        <div class="container-fluid p-0">
          <!-- Logo Area -->
          <NuxtLink class="navbar-brand p-0 ps-2" to="/">
            <img
              id="navigation-logo"
              src="/images/logo-white.svg"
              class="img-fluid"
            />
          </NuxtLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div id="offcanvasNavbar" class="offcanvas offcanvas-end background">
            <div class="offcanvas-header">
              <NuxtLink class="navbar-brand p-0 ps-2" to="/">
                <img
                  id="navigation-logo"
                  src="/images/logo-white.svg"
                  class="img-fluid"
                />
              </NuxtLink>
              <button
                type="button"
                class="btn text-white ms-auto"
                style="border: 0"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div
              class="offcanvas-body d-flex flex-column justify-content-between"
            >
              <ul class="navbar-nav pt-2">
                <li v-for="item in items" :key="item.name" class="nav-item">
                  <NuxtLink :to="item.to" class="nav-link router-link">
                    <div
                      class="d-flex align-items-center"
                      data-bs-dismiss="offcanvas"
                    >
                      <!-- eslint-disable vue/no-v-html -->
                      <span class="me-2" v-html="item.icon" />
                      <span class="pt-1">{{ item.name }}</span>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
              <div class="d-flex justify-content-between align-items-center">
                <NuxtLink
                  to="/privacy"
                  class="link-light link-underline-opacity-0"
                  >{{ $t("privacy") }}</NuxtLink
                >
                <div class="d-flex gap-2">
                  <LayoutLanguageButton />
                  <LayoutLoginButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!-- Main content area -->
      <div id="main-content" class="overflow-auto w-100 h-100">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();

useHead({
  titleTemplate: computed(() => {
    const name = router.currentRoute.value.name?.toString();
    return name ? `Pixina - ${t(name)}` : "Pixina";
  }),
});

const items = computed(() => [
  {
    name: t("templates"),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>`,
    to: "/templates",
  },
  {
    name: t("informations"),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>`,
    to: "/informations",
  },
  {
    name: t("image"),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>`,
    to: "/image",
  },
  {
    name: t("history"),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
    to: "/history",
  },
  {
    name: t("atlas"),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>`,
    to: "/atlas",
  },
  {
    name: t("tools"),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
  <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
</svg>`,
    to: "/tools",
  },
]);

const translationY = ref(-0.25);

watchEffect(() => {
  const path = router.currentRoute.value.path;
  const index = items.value.findIndex((item) => path.startsWith(item.to));
  if (index !== -1) {
    translationY.value = index * 2.8 - 0.25;
  } else {
    translationY.value = -999;
  }
});
</script>

<style scoped lang="scss">
// Common styles for mobile and desktop

.background {
  background: url("/images/background.webp") no-repeat;
  background-size: cover;
}

#navigation-sidebar {
  min-width: 20rem;
  box-shadow: inset -0.5rem 0 2rem -0.5rem rgba(0, 0, 0, 0.15);

  nav {
    margin: 0.5rem -0.5rem 0.5rem 2.1rem;
    gap: 0.75rem;
    position: relative;

    .router-link {
      position: relative;
      font-size: larger;
      color: white;
      text-decoration: initial;
      text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);

      svg {
        filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
      }
    }

    .indicator {
      position: absolute;
      left: 0;
      right: 0;
      height: 2.55rem;
      margin-left: -0.6rem;
      background: white;
      border-radius: 0.6rem 0 0 0.6rem;
      box-shadow: -1rem 0.5rem 1rem rgba(0, 0, 0, 0.15);
      transition: 0.2s;
    }

    .indicator::before {
      content: "";
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      background: transparent;
      top: -0.6rem;
      right: 0;
      border-bottom-right-radius: 0.6rem;
      box-shadow: 0.2rem 0.2rem 0 0.2rem white;
    }

    .indicator::after {
      content: "";
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      background: transparent;
      bottom: -0.6rem;
      right: 0;
      border-top-right-radius: 0.6rem;
      box-shadow: 0.2rem -0.2rem 0 0.2rem white;
    }

    .router-link-active {
      color: black;
      text-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.95);
      transition: 0.1s;

      svg {
        filter: drop-shadow(0rem 0.25rem 0.45rem rgba(0, 0, 0, 0.95));
      }
    }
  }

  #navigation-logo {
    max-height: 4.5rem;
    margin-left: 1.5rem;
    filter: drop-shadow(0rem 0.25rem 1.5rem rgba(0, 0, 0, 0.95));
  }

  &.background {
    background-attachment: fixed;
    background-position: left;
  }
}

#navigation-bar {
  .navbar-toggler {
    border-color: rgba(255, 255, 255, 0.85);
    border-width: 0.15rem;
    backdrop-filter: blur(0.5rem);
    -webkit-backdrop-filter: blur(0.5rem);
    --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.85%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  .navbar-nav {
    .router-link {
      font-size: larger;
      color: white;
      border-radius: 0.6rem;
      padding: 0.25rem 0.75rem 0.25rem 0.75rem;
      margin: 0.25rem;
      text-decoration: initial;
      text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);

      svg {
        filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
      }
    }

    .router-link-active {
      background: white;
      color: black;
      box-shadow: -1rem 0.5rem 1rem rgba(0, 0, 0, 0.15);
      text-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.95);

      svg {
        filter: drop-shadow(0rem 0.25rem 0.45rem rgba(0, 0, 0, 0.95));
      }
    }
  }

  #navigation-logo {
    max-height: 2.5rem;
    filter: drop-shadow(0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95));
  }

  &.background {
    background-position: top;
  }
}
</style>
