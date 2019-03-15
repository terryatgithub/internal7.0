<template>
  <div id="app">
    <upload/>
  </div>
</template>

<script>
import upload from './components/upload'

export default {
  name: 'App',
  components: {
    upload
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
