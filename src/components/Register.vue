<template>
  <div class="register" v-show="getregistertoggle">
    <form action="">
      <div class="inp name">
        <Input v-model="name" placeholder="用户名" style="width: 300px"/>
      </div>
      <div class="inp password">
        <Input v-model="password" placeholder="密码" style="width: 300px"/>
      </div>
      <div class="alarm">{{alarmtext}}</div>
      <button @click="submit">注册</button>
    </form>
    <div @click="changePlat">已有账号</div>
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

