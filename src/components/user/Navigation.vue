<template>
  <div class="row mx-0 h-100">
    <!-- Navigation Sidebar -->
    <div
      id="navigation-sidebar"
      class="col-md-2 col-1 text-left h-100 d-flex flex-column background"
    >
      <!-- Logo Area -->
      <div class="ns-logo">
        <img id="navigation-logo" class="img-fluid mb-2" src="./../../assets/logo.svg" />
      </div>
      <!-- Items Area -->
      <router-link to="/" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'home']" />Home
      </router-link>
      <router-link to="/profile" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'user-circle']" />Profil
      </router-link>
      <router-link to="/templates" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'home']" />Vorlagen
      </router-link>
      <router-link to="/chats" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'comments']" />Chats
      </router-link>
      <router-link to="/reservations" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'home']" />Reservierungen
      </router-link>
      <router-link to="/place" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'image']" />Place
      </router-link>
      <router-link to="/history" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'history']" />Entstehung
      </router-link>
      <router-link to="/atlas" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'compass']" />Atlas
      </router-link>
      <router-link to="/tools" class="router-link">
        <font-awesome-icon class="mr-2" :icon="['fal', 'wrench']" />Werkzeuge
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
  box-shadow: inset -0.5rem 0 2rem -0.5rem rgba(0, 0, 0, 0.15);

  * {
    z-index: 2;
  }

  .router-link {
    font-size: x-large;
    color: black;
    margin-right: -0.75rem;
    margin-left: 1.5rem;
    padding: 0.2rem 0 0.2rem 0.6rem;
    margin-bottom: 0.5rem;
    text-decoration: initial;
  }

  .router-link-exact-active {
    background: white;
    border-radius: 0.6rem 0 0 0.6rem;
    color: black;
    box-shadow: -1rem 0.5rem 1rem rgba(0, 0, 0, 0.15);
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