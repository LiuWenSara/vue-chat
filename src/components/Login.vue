<template>
  <div class="login" v-show="getlogintoggle">
    <div class="top">
      <p>欢迎来到Vue聊天室！</p>
      <p>快来登录吧</p>
    </div>
    <div class="form">
      <form action="">
        <div class="inp name">
          <Input type="text" v-model="name" placeholder="用户名" />
        </div>
        <div class="inp password">
          <Input type="password" v-model="password" placeholder="密码"/>
        </div>
        <div class="alarm">{{alarmtext}}</div>
        <Button type="info" @click="submit">登录</Button>
      </form>
    </div>
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
