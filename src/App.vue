<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="less">
html,body{
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 100%;
  height: 100%;
  color: #2c3e50;
  p,ul,li,h1{
    margin: 0;
    padding: 0;
  }
  ul,li{
    list-style: none;

  }

  a{
    text-decoration: none;
  }
}
</style>
