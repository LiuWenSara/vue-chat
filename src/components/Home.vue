<template>
  <div class="home" v-show="getlogintoggle">
    <div class="recent">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="history">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import mapGetters from 'vuex'

  export default{
    data () {
      return {
        name: '',
        password: '',
        alarmtext: ''
      }
    },
    methods: {

    },
    computed: {
      ...mapGetters([
        'getlogintoggle'
      ])
  }
  }
</script>
