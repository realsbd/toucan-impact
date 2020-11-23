import axios from "axios"

const state = {
  token: localStorage.getItem("token") || "",
  status: "",
  user: null
}

const mutations = {
  AUTH_REQUEST(state) {
    state.status = "loading"
  },
  AUTH_SUCCESS(state, token) {
    state.status = "success"
    state.token = token
  },
  SET_USER(state, user){
    state.user = user
  },
  AUTH_ERROR(state) {
    state.status = "error"
  },
  LOGOUT(state) {
    state.status = ""
    state.token = ""
    state.user = ""
  }
}

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("AUTH_REQUEST")
      axios({
        url: "https://api.toucanimpact.com/api/login",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.access_token
          const user = resp.data.user

          localStorage.setItem("token", token)
          localStorage.setItem('first_name', user.first_name)
          localStorage.setItem('last_name', user.last_name)

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
          axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
          commit("AUTH_SUCCESS", token)
          commit("SET_USER", user)
          resolve(resp)
        })
        .catch(err => {
          commit("AUTH_ERROR")
          localStorage.removeItem("token")
          reject(err)
        })
    })
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("AUTH_REQUEST")
      axios({
        url: "https://api.toucanimpact.com/api/register",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.access_token
          const user = resp.data.user;
          
          localStorage.setItem("token", token)
          localStorage.setItem('first_name', user.first_name)
          localStorage.setItem('last_name', user.last_name)

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
          axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
          commit("AUTH_SUCCESS", token)
          commit("SET_USER", user)
          resolve(resp)
        })
        .catch(err => {
          commit("AUTH_ERROR", err)
          localStorage.removeItem("token")
          localStorage.removeItem("first_name")
          localStorage.removeItem("last_name")
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("LOGOUT")
      localStorage.removeItem("token")
      localStorage.removeItem("first_name")
      localStorage.removeItem("last_name")
      delete axios.defaults.headers.common["Authorization"]
      resolve()
    })
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user
}

const authModule = {
  state,
  mutations,
  actions,
  getters
}

export default authModule
