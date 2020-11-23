import axios from "axios"

const state = {
  actionTypes: [],
  actionTypesArray: [],
  actionType: {},
  status: ""
}

const mutations = {
  ADD_ACTION_TYPE(state, payload) {
    state.actionType = payload
    state.status = "success"
  },
  SET_ACTION_TYPE(state, actionTypes) {
    state.actionTypes = actionTypes
  },
  ADD_ACTION_TYPE_ID(state, payload) {
    state.actionType = payload
    state.status = "success"
  },
  SET_ACTION_TYPE_ARRAY(state, actionTypesArray) {
    state.actionTypesArray = actionTypesArray
  },
  ERROR_ACTION_TYPE(state) {
    state.status = "error"
  },
  REMOVE_ACTION_TYPE(state, id) {
    state.actionTypes.filter(actionType => actionType.id !== id)
    state.actionTypes.splice(actionType => actionType.id, 1)
  }
}

const actions = {
  getactionTypes({ commit }) {
    axios.get("https://api.toucanimpact.com/api/action-type").then(resp => {
      commit("SET_ACTION_TYPE", resp.data)
    }).catch(err => {
      commit("ERROR_ACTION_TYPE", err)
    })
  },
  getactionTypesById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/action-type/${id}`).then(resp => {
        commit("ADD_ACTION_TYPE_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_ACTION_TYPE", err)
        reject(err)
      })
    })
  },
  getactionTypesArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/action-type-to-array").then(resp => {
        commit("SET_ACTION_TYPE_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_ACTION_TYPE", err)
        reject(err)
      })
    })
  },
  updateactionTypes({ commit }, actionType) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/action-type/${actionType.id}`,
        data: actionType,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_ACTION_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_ACTION_TYPE", err)
          reject(err)
        })
    })
  },
  addactionType({ commit }, actionType) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/action-type",
        data: actionType,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_ACTION_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_ACTION_TYPE", err)
          reject(err)
        })
    })
  },
  async deleteactionType({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/action-type/${id}`);
    commit("REMOVE_ACTION_TYPE", id)
  }
}

const getters = {
    actionTypes: state => state.actionTypes,
    actionTypesArray: state => state.actionTypesArray,
}

const action_typeModule = {
  state,
  mutations,
  actions,
  getters
}

export default action_typeModule
