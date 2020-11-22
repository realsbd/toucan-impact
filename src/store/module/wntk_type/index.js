import axios from "axios"

const state = {
  wntkTypes: [],
  wntkType: {},
  status: ""
}

const mutations = {
  ADD_WNTK_TYPE(state, payload) {
    state.wntkType = payload
    state.status = "success"
  },
  SET_WNTK_TYPE(state, wntkTypes) {
    state.wntkTypes = wntkTypes
  },
  ADD_WNTK_TYPE_ID(state, payload) {
    state.wntkType = payload
    state.status = "success"
  },
  ERROR_WNTK_TYPE(state) {
    state.status = "error"
  },
  REMOVE_WNTK_TYPE(state, id) {
    state.wntkTypes.filter(wntkType => wntkType.id !== id)
    state.wntkTypes.splice(wntkType => wntkType.id, 1)
  }
}

const actions = {
  getwntkTypes({ commit }) {
    axios.get("https://api.toucanimpact.com/api/whoneedstoknow").then(resp => {
      commit("SET_WNTK_TYPE", resp.data)
    }).catch(err => {
      commit("ERROR_WNTK_TYPE", err)
    })
  },
  getwntkTypesById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/whoneedstoknow/${id}`).then(resp => {
        commit("ADD_WNTK_TYPE_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_WNTK_TYPE", err)
        reject(err)
      })
    })
  },
  addwntkType({ commit }, wntkType) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/whoneedstoknow",
        data: wntkType,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_WNTK_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_WNTK_TYPE", err)
          reject(err)
        })
    })
  },
  updatewntkTypes({ commit }, wntkType) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/whoneedstoknow/${wntkType.id}`,
        data: wntkType,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_WNTK_TYPE_ID", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_WNTK_TYPE", err)
          reject(err)
        })
    })
  },
  async deletewntkType({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/whoneedstoknow/${id}`);
    commit("REMOVE_WNTK_TYPE", id)
  }
}

const getters = {
    wntkTypes: state => state.wntkTypes
}

const wntk_typeModule = {
  state,
  mutations,
  actions,
  getters
}

export default wntk_typeModule
