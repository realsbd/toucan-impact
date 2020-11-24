import axios from "axios"

const state = {
  impactTypes: [],
  impactTypesArray: [],
  impactType: {},
  status: ""
}

const mutations = {
  ADD_IMPACT_TYPE(state, payload) {
    state.impactType = payload
    state.status = "success"
  },
  SET_IMPACT_TYPE(state, impactTypes) {
    state.impactTypes = impactTypes
  },
  ADD_IMPACT_TYPE_ID(state, payload) {
    state.impactType = payload
    state.status = "success"
  },
  SET_IMPACT_TYPE_ARRAY(state, impactTypesArray) {
    state.impactTypesArray = impactTypesArray
  },
  ERROR_IMPACT_TYPE(state) {
    state.status = "error"
  },
  REMOVE_IMPACT_TYPE(state, id) {
    state.impactTypes.filter(impactType => impactType.id !== id)
    state.impactTypes.splice(impactType => impactType.id, 1)
  }
}

const actions = {
  getImpactTypes({ commit }) {
    axios.get("https://api.toucanimpact.com/api/impact-type").then(resp => {
      commit("SET_IMPACT_TYPE", resp.data)
    }).catch(err => {
      commit("ERROR_IMPACT_TYPE", err)
    })
  },
  getImpactTypeById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/impact-type/${id}`).then(resp => {
        commit("ADD_IMPACT_TYPE_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_IMPACT_TYPE", err)
        reject(err)
      })
    })
  },
  getImpactTypesArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/impact-type-to-array").then(resp => {
        commit("SET_IMPACT_TYPE_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_IMPACT_TYPE", err)
        reject(err)
      })
    })
  },
  addImpactType({ commit }, impactType) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/impact-type",
        data: impactType,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_IMPACT_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_IMPACT_TYPE", err)
          reject(err)
        })
    })
  },
  updateImpactType({ commit }, impactType) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/impact-type/${impactType.id}`,
        data: impactType,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_IMPACT_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_IMPACT_TYPE", err)
          reject(err)
        })
    })
  },
  async deleteImpactType({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/impact-type/${id}`);
    commit("REMOVE_IMPACT_TYPE", id)
  }
}

const getters = {
    impactTypes: state => state.impactTypes,
    impactType: state => state.impactType,
    impactTypesArray: state => state.impactTypesArray
}

const impact_typeModule = {
  state,
  mutations,
  actions,
  getters
}

export default impact_typeModule
