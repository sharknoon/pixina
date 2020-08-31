<template>
  <div class="row mx-0 h-100">
    <!-- Navigation Sidebar -->
    <div id="navigation-sidebar" class="col-md-2 col-1 text-left">
      <div class="h-100 d-flex flex-column">
        <!-- Logo Area -->
        <div class="ns-logo">
          <router-link to="/">
            <img id="navigation-logo" class="img-fluid mb-2" src="./../../assets/logo.svg" />
          </router-link>
        </div>
        <!-- Items Area -->
        <router-link class="ns-item" to="/">
          <font-awesome-icon :icon="['fal', 'home']" />Home
        </router-link>
        <router-link to="/profile">
          <font-awesome-icon :icon="['fal', 'user-circle']" />Profil
        </router-link>
        <router-link to="/templates">
          <font-awesome-icon :icon="['fal', 'home']" />Vorlagen
        </router-link>
        <router-link to="/chats">
          <font-awesome-icon :icon="['fal', 'comments']" />Chats
        </router-link>
        <router-link to="/reservations">
          <font-awesome-icon :icon="['fal', 'home']" />Reservierungen
        </router-link>
        <router-link to="/place">
          <font-awesome-icon :icon="['fal', 'image']" />Place
        </router-link>
        <router-link to="/history">
          <font-awesome-icon :icon="['fal', 'history']" />Entstehung
        </router-link>
        <router-link to="/atlas">
          <font-awesome-icon :icon="['fal', 'compass']" />Atlas
        </router-link>
        <router-link to="/tools">
          <font-awesome-icon :icon="['fal', 'wrench']" /> Werkzeuge
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
    </div>
    <div id="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped lang="scss">
#navigation-sidebar {
  background: lightblue;
}
.router-link-active {
  font-size: x-large;
  background: white;
  border-radius: 1rem 0 0 1rem;
  margin-right: -0.75rem;
  margin-left: 1.5rem;
  padding-left: 0.5rem;
}
</style>