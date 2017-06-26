<template>
  <div class="home">
    <div class="header">
      <div class="title">Vue聊天室</div>
      <div class="logout"><button @click="logout">退出登录</button></div>
    </div>
    <div class="chatroomlist">
      <div @click="goToRoom('room1')">
        <img src="" alt="">
        <div>聊天室一</div>
      </div>
      <div @click="goToRoom('room2')">
        <img src="" alt="">
        <div>聊天室二</div>
      </div>
      <div @click="goToRoom('room3')">
        <img src="" alt="">
        <div>聊天室三</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import io from 'socket.io-client'

  export default {
    data () {
      return {
        socket: ''
      }
    },
    created() {
      const self = this;
      this.$store.commit('setgetsocket', io.connect('localhost:8080/'));
      console.log(io.connect('localhost:8080/'));
      this.getsocket.on('login' ,function (obj) {
        self.$store.commit('setusers', obj);
      });
       this.$nextTick(function () {
            if (this.getusername) {
              this.$store.commit('closeregistertoggle');
              this.$store.commit('closelogintoggle');
            }
       });
    },
    computed: {
      ...mapGetters([
        'getusername',
        'getuserimgsrc',
        'getsocket'
      ])
    },
    methods: {
      logout () {
        this.$store.commit('setusername', '')
        this.$store.commit('setuserimgsrc', '')
        this.$store.commit('openlogintoggle')
      },
      goToRoom(roomId) {
        this.$store.commit('changechattoggle');
        const obj = {
          name: this.getusername,
          imgsrc: this.getuserimgsrc,
          roomid: roomId
        }
        this.$store.commit('setuserroomid' ,roomId);
        this.getsocket.emit('login' ,obj);
        const data = {
          roomid: roomId
        }
        this.$store.dispatch('showmesshistory' ,data);
        this.$store.commit('setroomdetailinfos');
      }
    }
  }
</script>
