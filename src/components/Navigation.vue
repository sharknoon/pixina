<template>
  <div class="h-100 d-flex">
    <!-- In case of desktop wiew, display left navigation bar -->
    <div
      id="navigation-sidebar"
      class="text-start d-none d-md-flex flex-column background p-2"
    >
      <!-- Logo Area -->
      <router-link to="/">
        <img
          id="navigation-logo"
          class="img-fluid mb-2"
          src="@/assets/images/logo-white.svg"
        >
      </router-link>
      <!-- Items Area -->
      <nav class="d-flex flex-column">
        <div
          class="indicator"
          :style="`transform: translateY(${translationY}rem);`"
        />
        <router-link
          v-for="item in items"
          :key="item.name"
          :to="item.to"
          class="router-link d-flex align-items-center"
        >
          <font-awesome-icon
            class="me-2"
            :icon="item.icon"
          />
          <span class="pt-1">{{ item.name }}</span>
        </router-link>
      </nav>
      <div class="mt-auto d-grid gap-2">
        <DonationButton />
        <LanguageDropdown class="d-grid" />
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
          <router-link
            class="navbar-brand p-0 ps-2"
            to="/"
          >
            <img
              id="navigation-logo"
              class="img-fluid"
              src="@/assets/images/logo-white.svg"
            >
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div
            id="navbarSupportedContent"
            class="collapse navbar-collapse"
          >
            <ul class="navbar-nav me-auto pt-2">
              <li
                v-for="item in items"
                :key="item.name"
                class="nav-item"
              >
                <router-link
                  :to="item.to"
                  class="nav-link router-link"
                >
                  <div
                    class="d-flex align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                  >
                    <font-awesome-icon
                      class="me-2"
                      :icon="item.icon"
                    />
                    <span class="pt-1">{{ item.name }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <div class="d-grid gap-2">
              <DonationButton />
              <LanguageDropdown class="d-grid" />
            </div>
          </div>
        </div>
      </nav>
      <div
        id="main-content"
        class="overflow-auto w-100 h-100"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, watchEffect, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import DonationButton from "@/components/navigation/DonationButton";
import LanguageDropdown from "@/components/navigation/LanguageDropdown";

const router = useRouter();
const { t } = useI18n();

const items = computed(() => [
  {
    name: t("templates"),
    icon: ["fal", "images"],
    to: "/templates",
  },
  {
    name: t("informations"),
    icon: ["fal", "book-open"],
    to: "/informations",
  },
  {
    name: t("image"),
    icon: ["fal", "image"],
    to: "/place",
  },
  {
    name: t("history"),
    icon: ["fal", "history"],
    to: "/history",
  },
  {
    name: t("atlas"),
    icon: ["fal", "compass"],
    to: "/atlas",
  },
  {
    name: t("tools"),
    icon: ["fal", "wrench"],
    to: "/tools",
  }
]);

const translationY = ref(-0.25);

watchEffect(() => {
  const path = router.currentRoute.value.path;
  const index = items.value.findIndex((item) => path.startsWith(item.to));
  translationY.value = (index * 2.8) - 0.25;
});
</script>
<style scoped lang="scss">
// Common styles for mobile and desktop

.background {
  background: url("./../assets/images/background.webp") no-repeat;
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
      svg {
        filter: drop-shadow(0rem 0.25rem 0.45rem rgba(0, 0, 0, 0.95));
      }
      transition: 0.1s;
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
    border-color: rgba(0, 0, 0, 0.5);
    border-width: 0.15rem;
    backdrop-filter: blur(0.5rem);
    -webkit-backdrop-filter: blur(0.5rem);
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
