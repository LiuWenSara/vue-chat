<template>
  <div class="register">
    <div class="inp name">
      <Input v-model="name" placeholder="用户名" style="width: 300px">
    </div>
    <div class="inp password">
      <Input v-model="password" placeholder="密码" style="width: 300px">
    </div>
    <div class="inp passwordag">
      <Input v-model="passwordag" placeholder="确认密码" style="width: 300px">
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        name: '',
        password: '',
        passwordag: ''
      }
    }
  }
</script>
