<template>
  <div class="login" v-show="getlogintoggle">
    <form action="">
      <div class="inp name">
        <Input v-model="name" placeholder="用户名" style="width: 300px"/>
      </div>
      <div class="inp password">
        <Input v-model="password" placeholder="密码" style="width: 300px"/>
      </div>
      <div class="alarm">{{alarmtext}}</div>
      <button @click="submit">登录</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default{
    data () {
      return {
        name: '',
        password: '',
        alarmtext: ''
      }
    },
    methods: {
      submit () {
        const name = this.name
        const password = this.password
        const alarmtext = this.alarmtext
        if (name !== '' && password !== '') {
          const data = {
            name: name,
            password: password
          }
          this.$store.dispatch('logsubmit', data)
        } else {
          this.alarmtext = '账号密码不能为空'
        }
      }
    },
    computed: {
      ...mapGetters([
        'getlogintoggle'
      ])
    }
  }
</script>
