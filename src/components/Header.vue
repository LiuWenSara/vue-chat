<template>
  <div class="header">
    <div class="title">Vue聊天室</div>
    <div class="logout"><button>退出登录</button><div/>
  </div>
</template>

<script>
  import mapGetters from 'vuex'

  export default{
    methods: {
      logout () {
        this.$store.commit('setusername', '')
        this.$store.commit('setusersrc', '')
        this.$store.commit('openlogintoggle')
      }
    },
    computed: {
      ...mapGetters([
        'getlogintoggle'
      ])
  }
  }
</script>
