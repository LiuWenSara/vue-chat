<template>
  <div class="chat" v-show="getchattoggle">
    <div class="chat-room">
      <div class="chat-title">
        <p @click="closeChat">后退</p>
        <span>在线人数{{Object.keys(getusers).length}}</span>
      </div>
      <div class="chatting">
        <div class="history" v-for="obj in getmesshistoryinfos">
          <div class="other" v-if="obj.username!=getusername">
            <div class="other-head">
              <div class="other-img">
                <img :src="obj.imgsrc" alt="">
              </div>
              <div class="other-name">
                {{obj.username}}
              </div>
            </div>
            <div class="other-msg">
              {{obj.text}}
            </div>
          </div>
          <div class="me" v-if="obj.username=getusername">
            <div class="me-head">
              <div class="me-img">
                <img :src="obj.imgsrc" alt="">
              </div>
              <div class="me-name">
                {{obj.username}}
              </div>
            </div>
            <div class="me-msg">
              {{obj.text}}
            </div>
          </div>
        </div>
        <div class="now" v-for="obj in getinfos">
          <div class="other" v-if="obj.username!=getusername">
            <div class="other-head">
              <div class="other-img">
                <img :src="obj.imgsrc" alt="">
              </div>
              <div class="other-name">
                {{obj.username}}
              </div>
            </div>
            <div class="other-msg">
                {{obj.text}}
            </div>
          </div>
          <div class="me" v-if="obj.username=getusername">
            <div class="me-head">
              <div class="me-img">
                <img :src="obj.imgsrc" alt="">
              </div>
              <div class="me-name">
                {{obj.username}}
              </div>
            </div>
            <div class="me-msg">
              {{obj.text}}
            </div>
          </div>
        </div>
      </div>
      <div class="input-msg">
        <input type="text" v-model="nowMsg"/>
        <button @click="submitMess">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default{
    data () {
      return {
        socket: '',
        nowMsg: ''
      }
    },
    created() {
      const self = this;
      this.getsocket.on('message' ,function (obj) {
        self.$store.commit('addroomdetailinfos' ,obj);
        window.scrollTo(0 ,900000)
      });
      this.getsocket.on('logout' ,function (obj) {
        self.$store.commit('setusers' ,obj)
      })
    },
    methods: {
      submitMess () {
        if  (this.nowMsg === '') {
          window.alert('发送内容不能为空');
        } else {
          var obj = {
            name: this.getusername,
            roomid: this.getuserroomid,
            text: this.nowMsg,
            imgsrc:this.getuserimgsrc
          }
          this.getsocket.emit('message' ,obj);
          this.nowMsg = ''
        }
      },
      closeChat() {
        this.$store.commit('changechattoggle')
        var obj = {
          name: this.getusername,
          roomid: this.getuserroomid
        }
        this.getsocket.emit('logout', obj)
      }
    },
    computed: {
    ...mapGetters([
        'getmesshistoryinfos',
        'getusers',
        'getinfos',
        'getsocket',
        'getchattoggle',
        'getusername',
        'getuserroomid',
        'getuserimgsrc'
      ])
    }
  }
</script>
