import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    socket: '',
    user: {
      name: '',
      src: '',
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
    chattoggle: false,
    logintoggle: true,
    registertoggle: false
  },
  getters: {
    getsocket: state => state.socket,
    getusername: state => state.user.name,
    getusersrc: state => state.user.src,
    getuserroom: state => state.user.room,
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
    setusername(state, data) {
      state.user.name = data
    },
    setusersrc(state, data) {
      state.user.src = data
    },
    setuserroom(state, data) {
      state.user.room = data
    },
    addroomdetailinfos(state, data) {
      state.roomdetail.infos.push(data)
    },
    setroomdetailinfos(state) {
      state.roomdetail.infos = []
    },
    setusers(state, data) {
      state.roomdetail.users = data
    },
    setmesshistoryinfos(state, data) {
      state.messhistory.infos = data
    },
    changechattoggle(state) {
      state.chattoggle = !state.chattoggle
    },
    openlogintoggle(state) {
      state.logintoggle = true
    },
    closelogintoggle(state) {
      state.logintoggle = false
    },
    openregistertoggle(state) {
      state.registertoggle = true
    },
    closeregistertoggle(state) {
      state.registertoggle = false
    }
  },
  actions: {

  }
});

export default store
