<template>
  <div class="h-100">
    <!-- Navigation Sidebar Desktop-->
    <div class="d-none d-md-flex h-100">
      <div
        id="navigation-sidebar"
        class="text-left d-flex flex-column background p-2"
      >
        <!-- Logo Area -->
        <div class="ns-logo">
          <img
            id="navigation-logo"
            class="img-fluid mb-2"
            src="./../../assets/images/logo-white.svg"
          />
        </div>
        <!-- Items Area -->
        <nav>
          <router-link
            v-for="item in items"
            :key="item.name"
            :to="item.to"
            class="router-link d-flex align-items-center"
          >
            <font-awesome-icon class="mr-2" :icon="item.icon" />
            <span class="pt-2">
              {{ item.name }}
            </span>
          </router-link>
        </nav>
        <!-- Footer Area -->
        <div class="ns-footer mt-auto">
          <GoogleLogin
            v-if="this.$store.getters.isGoogleIdentityProvider"
            class="btn btn-danger btn-block"
            :params="{ client_id: this.$store.state.googleClientId }"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
            :logoutButton="true"
          >
            <font-awesome-icon
              class="mr-2"
              :icon="['fal', 'power-off']"
            />Abmelden
          </GoogleLogin>
        </div>
      </div>
      <div id="main-content" class="overflow-auto w-100 h-100">
        <router-view></router-view>
      </div>
    </div>
    <div class="h-100 d-md-none d-flex flex-column">
      <!-- Navigation bar Mobile -->
      <nav
        id="navigation-bar"
        class="navbar navbar-expand-lg navbar-light p-2 background flex-grow-0 flex-shrink-0"
      >
        <!-- Logo Area -->
        <router-link class="navbar-brand p-0" to="/">
          <img
            id="navigation-logo"
            class="img-fluid"
            src="./../../assets/images/logo-white.svg"
          />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto pt-2">
            <li v-for="item in items" :key="item.name" class="nav-item active">
              <router-link
                :to="item.to"
                class="nav-link router-link d-flex align-items-center"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <font-awesome-icon class="mr-2" :icon="item.icon" />
                <span class="pt-2">
                  {{ item.name }}
                </span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/login"
                class="nav-link router-link d-flex align-items-center sign-out-router-link bg-danger text-white"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <font-awesome-icon class="mr-2" :icon="['fal', 'power-off']" />
                <span class="pt-2">Abmelden</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div id="main-content" class="overflow-auto w-100 h-100">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/pro-light-svg-icons";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import { faBoxCheck } from "@fortawesome/pro-light-svg-icons";
import { faBookOpen } from "@fortawesome/pro-light-svg-icons";
import { faComments } from "@fortawesome/pro-light-svg-icons";
import { faImage } from "@fortawesome/pro-light-svg-icons";
import { faHistory } from "@fortawesome/pro-light-svg-icons";
import { faCompass } from "@fortawesome/pro-light-svg-icons";
import { faWrench } from "@fortawesome/pro-light-svg-icons";
import { faPowerOff } from "@fortawesome/pro-light-svg-icons";

library.add(
  faHome,
  faUserCircle,
  faBookOpen,
  faComments,
  faBoxCheck,
  faImage,
  faHistory,
  faCompass,
  faWrench,
  faPowerOff
);

export default {
  name: "Navigation",
  data() {
    return {
      items: [
        {
          name: "Home",
          icon: ["fal", "home"],
          to: "/",
        },
        {
          name: "Profil",
          icon: ["fal", "user-circle"],
          to: "/profile",
        },
        {
          name: "Vorlagen",
          icon: ["fal", "book-open"],
          to: "/templates",
        },
        {
          name: "Chats",
          icon: ["fal", "comments"],
          to: "/chats",
        },
        {
          name: "Reservierungen",
          icon: ["fal", "box-check"],
          to: "/reservations",
        },
        {
          name: "Place",
          icon: ["fal", "image"],
          to: "/place",
        },
        {
          name: "Entstehung",
          icon: ["fal", "history"],
          to: "/history",
        },
        {
          name: "Atlas",
          icon: ["fal", "compass"],
          to: "/atlas",
        },
        {
          name: "Werkzeuge",
          icon: ["fal", "wrench"],
          to: "/tools",
        },
      ],
    };
  },
  components: {
    GoogleLogin: () => import('vue-google-login')
  },
  methods: {
    logout() {
      let idendityProvider = this.$store.state.identityProvier;
      switch (idendityProvider) {
        case "google":
          console.log("Google Logout TODO");
          break;
      }
    },
    onSuccess(/*googleUser*/) {
      this.$store.commit("setIdentityProvier", null);
      this.$store.commit("setLoginState", 0);
      this.$router.push("/login");
    },
    onFailure(error) {
      console.error("Login attempt error: " + error);
    },
  },
};
</script>
<style scoped lang="scss">
#navigation-sidebar {
  min-width: 20rem;
  box-shadow: inset -0.5rem 0 2rem -0.5rem rgba(0, 0, 0, 0.15);

  * {
    z-index: 2;
  }

  .router-link {
    font-size: larger;
    color: white;
    margin-right: -0.5rem;
    margin-left: 1.5rem;
    padding: 0.2rem 0 0.2rem 0.6rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    text-decoration: initial;
    text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);
    svg {
      filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
    }
  }

  .router-link-exact-active {
    background: white;
    border-radius: 0.6rem 0 0 0.6rem;
    color: black;
    box-shadow: -1rem 0.5rem 1rem rgba(0, 0, 0, 0.15);
    text-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.95);
    svg {
      filter: drop-shadow(0rem 0.25rem 0.45rem rgba(0, 0, 0, 0.95));
    }
  }

  #navigation-logo {
    max-height: 4.5rem;
    margin-left: 1.5rem;
    filter: drop-shadow(0rem 0.25rem 1.5rem rgba(0, 0, 0, 0.95));
  }

  &.background {
    background: url("./../../assets/images/background-blurry.webp") no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: left;
  }

}

#navigation-bar {
  z-index: 1;

  .router-link:not(.navbar-brand) {
    font-size: larger;
    color: white;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    padding: 0.25rem 0.75rem 0.25rem 0.75rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    text-decoration: initial;
    text-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95);
    svg {
      filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.95));
    }
  }

  .router-link-exact-active:not(.navbar-brand) {
    background: white;
    border-radius: 0.6rem;
    color: black;
    box-shadow: -1rem 0.5rem 1rem rgba(0, 0, 0, 0.15);
    text-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.95);
    svg {
      filter: drop-shadow(0rem 0.25rem 0.45rem rgba(0, 0, 0, 0.95));
    }
  }

  .sign-out-router-link {
    @extend .router-link-exact-active;
  }

  #navigation-logo {
    max-height: 2.5rem;
    filter: drop-shadow(0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.95));
  }

  &.background {
    background: url("./../../assets/images/background-blurry.webp") no-repeat;
    background-size: cover;
    background-position: top;
  }

}
</style>