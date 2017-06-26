<template>
  <div id="app">
    <router-view></router-view>
    <login></login>
    <register></register>
    <chat></chat>
  </div>
</template>

<script>
  import Chat from './components/Chat.vue'
  import Login from './components/Login.vue'
  import Register from './components/Register.vue'

  export default {
    components: {
      Chat,
      Login,
      Register
    }
  }
</script>

