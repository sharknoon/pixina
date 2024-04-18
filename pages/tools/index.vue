<template>
    <div v-if="$router.currentRoute.value.path === '/tools'" id="tools-wrapper" class="h-100">
      <ToolsTileSelection />
    </div>
    <!--<router-view />-->
  </template>