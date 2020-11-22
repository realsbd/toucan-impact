import axios from "axios"

const state = {
  linkuser: {},
  status: ""
}

const mutations = {
  ADD_LINKUSER_TYPE(state, payload) {
    state.linkuser = payload
    state.status = "success"
  },
  ERROR_LINKUSER_TYPE(state) {
    state.status = "error"
  }
}

const actions = {
  addLinkUser({ commit }, linkuser) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/companies/${linkuser.company_id}/user`,
        data: linkuser,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_LINKUSER_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_LINKUSER_TYPE", err)
          reject(err)
        })
    })
  }
}

const getters = {
  linkuser: state => state.linkuser,
}

const link_userModule = {
  state,
  mutations,
  actions,
  getters
}

export default link_userModule
