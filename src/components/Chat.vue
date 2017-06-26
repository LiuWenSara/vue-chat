<template>
  <div class="chat" v-show="getchattoggle">
    <div class="header">
      <div class="title">Vue聊天室</div>
    </div>
    <div class="chat-room">
      <div class="chat-title">
        <span @click="closeChat"><Icon type="chevron-left"/></span>
        <span>在线人数{{Object.keys(getusers).length}}</span>
      </div>
      <div class="chatting">
        <div class="history" v-for="obj in getmesshistoryinfos">
          <Row class="other" v-if="obj.username!=getusername">
            <Col  span="3" class="other-head">
              <div class="other-img">
                <img :src="obj.imgsrc" alt="">
              </div>
              <div class="other-name">
                {{obj.username}}
              </div>
            </Col>
            <Col span="21" class="other-msg">
            <div class="box"><div class="little"></div>{{obj.text}}</div>
            </Col>
          </Row>
          <Row class="me" v-if="obj.username==getusername">
            <Col span="9" offset="12" class="me-msg">
            <div class="box"><div class="little"></div>{{obj.text}}</div>
            </Col>
            <Col span="3" class="me-head">
            <div class="me-img">
              <img :src="obj.imgsrc" alt="">
            </div>
            <div class="me-name">
              {{obj.username}}
            </div>
            </Col>
          </Row>
        </div>
        <div class="now" v-for="obj in getinfos">
          <Row class="other" v-if="obj.username!=getusername">
            <Col span="3" class="other-head">
              <div class="other-img">
                <img :src="obj.imgsrc" alt="">
              </div>
              <div class="other-name">
                {{obj.username}}
              </div>
            </Col>
            <Col span="21" class="other-msg">
            <div class="box"><div class="little"></div>{{obj.text}}</div>
            </Col>
          </Row>
          <Row class="me" v-if="obj.username==getusername">
            <Col span="9" offset="12" class="me-msg">
            <div class="box"><div class="little"></div>{{obj.text}}</div>
            </Col>
            <Col span="3" class="me-head">
            <div class="me-img">
              <img :src="obj.imgsrc" alt="">
            </div>
            <div class="me-name">
              {{obj.username}}
            </div>
            </Col>
          </Row>
        </div>
      </div>
      <Row class="input-msg">
        <Col span="20"><Input type="text" v-model="nowMsg"/></Col>
        <Col span="3" offset="1"><Button type="info" @click="submitMess">发送</Button></Col>
      </Row>
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
