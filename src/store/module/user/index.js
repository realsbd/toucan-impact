import axios from "axios"

const state = {
  users: [],
  usersArray: [],
  user: {},
  status: ""
}

const mutations = {
  ADD_USER(state, payload) {
    state.user = payload
    state.status = "success"
  },
  SET_USER(state, users) {
    state.users = users
  },
  ADD_USER_ID(state, payload) {
    state.user = payload
    state.status = "success"
  },
  SET_USER_ARRAY(state, usersArray) {
    state.usersArray = usersArray
  },
  ERROR_USER(state) {
    state.status = "error"
  },
  REMOVE_USER(state, id) {
    state.users.filter(user => user.id !== id)
    state.users.splice(user => user.id, 1)
  }
}

const actions = {
  getUsers({ commit }) {
    axios
      .get(
        "https://api.toucanimpact.com/api/users")
      .then(resp => {
        commit("SET_USER", resp.data)
      })
      .catch(err => {
        commit("ERROR_USER", err)
      })
  },
  getUsersById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/users/${id}`).then(resp => {
        commit("ADD_USER_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_USER", err)
        reject(err)
      })
    })
  },
  getUsersArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/users-to-array").then(resp => {
        commit("SET_USER_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_ACTION_TYPE", err)
        reject(err)
      })
    })
  },
  addUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/users",
        data: user,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_USER", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_USER", err)
          reject(err)
        })
    })
  },
  updateUsers({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/users/${user.id}`,
        data: user,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_USER", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_USER", err)
          reject(err)
        })
    })
  },
  async deleteUser({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/users/${id}`);
    commit("REMOVE_USER", id)
  }
}

const getters = {
  users: state => state.users,
  usersArray: state => state.usersArray,
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
