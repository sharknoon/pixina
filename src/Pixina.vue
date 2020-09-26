<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Pixina",
};
</script>

<style>
#app {
  font-family: Kumbh Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body, #app {
  height: 100%;
}
@font-face {
    font-family: 'Kumbh Sans';
    src: url('./assets/fonts/KumbhSans-Bold.woff2') format('woff2'),
        url('./assets/fonts/KumbhSans-Bold.woff') format('woff');
    font-weight: bold;
}

@font-face {
    font-family: 'Kumbh Sans';
    src: url('./assets/fonts/KumbhSans-Regular.woff2') format('woff2'),
        url('./assets/fonts/KumbhSans-Regular.woff') format('woff');
    font-weight: normal;
}

@font-face {
    font-family: 'Kumbh Sans';
    src: url('./assets/fonts/KumbhSans-Light.woff2') format('woff2'),
        url('./assets/fonts/KumbhSans-Light.woff') format('woff');
    font-weight: 300;
}
</style>
