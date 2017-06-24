import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    socket: '',
    user: {
      name: '',
      imgsrc: '',
      roomid: ''
    },
    roomdetail: {
      id: '',
      users: '',
      infos: []
    },
    messhistory: {
      infos: []
    },
    alarmtext: '',
    chattoggle: false,
    logintoggle: true,
    registertoggle: false
  },
  getters: {
    getsocket: state => state.socket,
    getusername: state => state.user.name,
    getalarmtext: state => state.alarmtext,
    getuserimgsrc: state => state.user.imgsrc,
    getuserroomid: state => state.user.roomid,
    getid: state => state.roomdetail.id,
    getusers: state => state.roomdetail.users,
    getinfos: state => state.roomdetail.infos,
    getmesshistoryinfos: state => state.messhistory.infos,
    getchattoggle: state => state.chattoggle,
    getlogintoggle: state => state.logintoggle,
    getregistertoggle: state => state.registertoggle
  },
  mutations: {
    setgetsocket (state, data) {
      state.socket = data
    },
    setusername (state, data) {
      state.user.name = data
    },
    setuserimgsrc (state, data) {
      state.user.imgsrc = data
    },
    setuserroom (state, data) {
      state.user.room = data
    },
    addroomdetailinfos (state, data) {
      state.roomdetail.infos.push(data)
    },
    setroomdetailinfos (state) {
      state.roomdetail.infos = []
    },
    setusers (state, data) {
      state.roomdetail.users = data
    },
    setmesshistoryinfos (state, data) {
      state.messhistory.infos = data
    },
    changechattoggle (state) {
      state.chattoggle = !state.chattoggle
    },
    openlogintoggle (state) {
      state.logintoggle = true
    },
    closelogintoggle (state) {
      state.logintoggle = false
    },
    openregistertoggle (state) {
      state.registertoggle = true
    },
    closeregistertoggle (state) {
      state.registertoggle = false
    },
    setalarmtext (state, data) {
      state.alarmtext = data
    }
  },
  actions: {
    regsubmit ({commit}, data) {
      axios.post('/user/register', data).then(function (data) {
        if (data.data.errno === 0) {
          commit('closeregistertoggle')
          commit('setusername', data.data.name)
          commit('setuserimgsrc', data.data.imgsrc)
        } else {
          commit('setalarmtext', data.data.data)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    logsubmit ({commit}, data) {
      axios.post('/user/login', data).then(function (data) {
        if (data.data.errno === 0) {
          commit('closelogintoggle')
          commit('setusername', data.data.name)
          commit('setuserimgsrc', data.data.imgsrc)
        } else {
          commit('setalarmtext', data.data.data)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    showmesshistory ({commit}, data) {
      axios.get('/message', {params: data}).then(function (data) {
        commit('setmesshistoryinfos', data.data.data)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
})

export default store
