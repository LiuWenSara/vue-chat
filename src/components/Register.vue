<template>
  <div class="register" v-show="getregistertoggle">
    <div class="top">
      <p>欢迎来到Vue聊天室！</p>
      <p>快来注册吧</p>
    </div>
    <div class="form">
      <form action="">
        <div class="inp name">
          <Input type="text" v-model="name" placeholder="用户名" />
        </div>
        <div class="inp password">
          <Input type="password" v-model="password" placeholder="密码" />
        </div>
        <div class="alarm">{{alarmtext}}</div>
        <Button type="info" @click="submit">注册</Button>
      </form>
      <div class="havecount" @click="changePlat">已有账号</div>
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
      changePlat() {
        this.$store.commit('openlogintoggle');
        this.$store.commit('closeregistertoggle');
      },
      submit () {
        const name = this.name
        const password = this.password
        var imgsrc = '../assets/img' + Math.ceil(Math.random() * 10) + '.jpg'
        if (name !== '' && password !== '') {
          const data = {
            name: name,
            password: password,
            imgsrc: imgsrc
          }
          this.$store.dispatch('regsubmit', data)
        } else {
          this.alarmtext = '账号密码不能为空'
        }
      }
    },
    computed: {
      ...mapGetters([
        'getregistertoggle',
      ])
    }
  }
</script>

