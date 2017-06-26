<template>
  <div class="home">
    <Row class="header">
      <Col span="20" class="title">Vue聊天室</Col>
      <Col span="4" class="logout"><div class="logout-btn" @click="logout">退出登录</div></Col>
    </Row>
    <Row class="chatroomlist">
      <Col span="6" >
        <div class="img" @click="goToRoom('room1')">
          <img src="../assets/img/room1.jpg" alt="">
        </div>
        <div class="roomid">聊天室一</div>
      </Col>
      <Col span="6">
        <div class="img"  @click="goToRoom('room2')">
          <img src="../assets/img/room2.jpg" alt="">
        </div>
        <div class="roomid">聊天室二</div>
      </Col>
      <Col span="6">
        <div class="img" @click="goToRoom('room3')" >
          <img src="../assets/img/room3.jpg" alt="">
        </div>
        <div class="roomid">聊天室三</div>
      </Col>
    </Row>
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
