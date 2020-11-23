const axios = require('axios').default;

const state = {
  globalgoals: [],
  globalgoalsarray: [],
  globalgoal: {},
  status: ""
}

const mutations = {
  ADD_GLOBALGOAL(state, payload) {
    state.globalgoal = payload
    state.status = "success"
  },
  SET_GLOBALGOAL(state, globalgoals) {
    state.globalgoals = globalgoals
  },
  SET_GLOBALGOAL_ARRAY(state, globalgoalsarray) {
    state.globalgoalsarray = globalgoalsarray
  },
  ADD_GLOBALGOAL_ID(state, payload) {
    state.globalgoal = payload
    state.status = "success"
  },
  ERROR_GLOBALGOAL(state) {
    state.status = "error"
  },
  REMOVE_GLOBALGOAL(state, id) {
    state.globalgoals.filter(globalgoal => globalgoal.id !== id)
    state.globalgoals.splice(globalgoal => globalgoal.id, 1)
  }
}

const actions = {
  getGlobalgoals({ commit }) {
    axios.get("https://api.toucanimpact.com/api/global-goals").then(resp => {
      commit("SET_GLOBALGOAL", resp.data)
    }).catch(err => {
      commit("ERROR_GLOBALGOAL", err)
    })
  },
  getGlobalgoalById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/global-goals/${id}`).then(resp => {
        commit("ADD_GLOBALGOAL_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_GLOBALGOAL", err)
        reject(err)
      })
    })
  },
  getGlobalgoalArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/global-goals-to-array").then(resp => {
        commit("SET_GLOBALGOAL_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_GLOBALGOAL", err)
        reject(err)
      })
    })
  },
  addGlobalgoal({ commit }, globalgoal) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/global-goals",
        data: globalgoal,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_GLOBALGOAL", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_GLOBALGOAL", err)
          reject(err)
        })
    })
  },
  updateGlobalgoal({ commit }, globalgoal) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/global-goals/${globalgoal.id}`,
        data: globalgoal,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_GLOBALGOAL", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_GLOBALGOAL", err)
          reject(err)
        })
    })
  },
  async deleteGlobalgoal({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/global-goals/${id}`);
    commit("REMOVE_GLOBALGOAL", id)
  }
}

const getters = {
  globalGoals: state => state.globalgoals
}

const globalgoalModule = {
  state,
  mutations,
  actions,
  getters
}

export default globalgoalModule
