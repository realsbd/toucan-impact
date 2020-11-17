import axios from "axios"

const state = {
  impacts: [],
  impact: {},
  status: ""
}

const mutations = {
  ADD_IMPACT(state, payload) {
    state.impact = payload
    state.status = "success"
  },
  SET_IMPACT(state, impacts) {
    state.impacts = impacts
  },
  ADD_IMPACT_ID(state, payload) {
    state.impact = payload
    state.status = "success"
  },
  ERROR_IMPACT(state) {
    state.status = "error"
  }
}

const actions = {
  getImpacts({ commit }) {
    axios
      .get(
        "https://api.toucanimpact.com/api/impact")
      .then(resp => {
        commit("SET_IMPACT", resp.data)
      })
      .catch(err => {
        commit("ERROR_IMPACT", err)
      })
  },
  getImapctById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/impact/${id}`).then(resp => {
        commit("ADD_IMPACT_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_IMPACT", err)
        reject(err)
      })
    })
  },
  addImapct({ commit }, impact) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/impact",
        data: impact,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_IMPACT", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_IMPACT", err)
          reject(err)
        })
    })
  },
  updateImapct({ commit }, impact) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/impact/${impact.id}`,
        data: impact,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_IMPACT", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_IMPACT", err)
          reject(err)
        })
    })
  },
  deleteImpact({ commit }, impact) {
    axios
      .post("https://api.toucanimpact.com/api/impact", impact)
      .then(resp => {
        commit("ADD_IMPACT", resp.data)
      })
      .catch(err => {
        commit("ERROR_IMPACT", err)
      })
  }
}

const getters = {
  impacts: state => state.impacts
}

const impactModule = {
  state,
  mutations,
  actions,
  getters
}

export default impactModule
