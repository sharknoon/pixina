<template>
  <div class="h-100 d-flex">
    <!-- Navigation Sidebar -->
    <div
      id="navigation-sidebar"
      class="text-left h-100 d-none d-md-flex flex-column background p-2"
    >
      <!-- Logo Area -->
      <div class="ns-logo">
        <img id="navigation-logo" class="img-fluid mb-2" src="./../../assets/logo.svg" />
      </div>
      <!-- Items Area -->
      <router-link to="/" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'home']" /><span class="pt-2">Home</span>
      </router-link>
      <router-link to="/profile" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'user-circle']" /><span class="pt-2">Profil</span>
        <i class="fas fa-10x fa-globe"></i>
      </router-link>
      <router-link to="/templates" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'home']" /><span class="pt-2">Vorlagen</span>
      </router-link>
      <router-link to="/chats" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'comments']" /><span class="pt-2">Chats</span>
      </router-link>
      <router-link to="/reservations" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'box-check']" /><span class="pt-2">Reservierungen</span>
      </router-link>
      <router-link to="/place" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'image']" /><span class="pt-2">Place</span>
      </router-link>
      <router-link to="/history" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'history']" /><span class="pt-2">Entstehung</span>
      </router-link>
      <router-link to="/atlas" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'compass']" /><span class="pt-2">Atlas</span>
      </router-link>
      <router-link to="/tools" class="router-link d-flex align-items-center">
        <font-awesome-icon class="mr-2" :icon="['fal', 'wrench']" /><span class="pt-2">Werkzeuge</span>
      </router-link>
      <!-- Footer Area -->
      <div class="ns-footer mt-auto">
        <router-link to="/logout">
          <div class="btn btn-danger btn-block">
            <font-awesome-icon class="mr-2" :icon="['fal', 'power-off']" />Abmelden
          </div>
        </router-link>
      </div>
    </div>
    <div id="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
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
    margin-right: -0.75rem;
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
    text-shadow: none;
    svg {
      filter: none;
    }
  }

  #navigation-logo {
    max-height: 4.5rem;
    margin-left: 1.5rem;
  }
}

.background {
  background: url("./../../assets/background.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
  overflow: hidden;
  image-rendering: crisp-edges;
  position: relative;
}

.background:before {
  content: "";
  position: absolute;
  background: inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  margin: -20px;
}
</style>