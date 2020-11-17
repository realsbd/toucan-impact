import axios from "axios"

const state = {
  recipients: [],
  recipientsArray: [],
  recipient: {},
  status: ""
}

const mutations = {
  ADD_RECIPIENT_TYPE(state, payload) {
    state.recipient = payload
    state.status = "success"
  },
  SET_RECIPIENT_TYPE(state, recipients) {
    state.recipients = recipients
  },
  ADD_RECIPIENT_TYPE_ID(state, payload) {
    state.recipient = payload
    state.status = "success"
  },
  SET_RECIPIENT_TYPE_ARRAY(state, recipientsArray) {
    state.recipientsArray = recipientsArray
  },
  ERROR_RECIPIENT_TYPE(state) {
    state.status = "error"
  },
  REMOVE_RECIPIENT_TYPE(state, id) {
    state.recipients.filter(recipient => recipient.id !== id)
    state.recipients.splice(recipient => recipient.id, 1)
  }
}

const actions = {
  getrecipients({ commit }) {
    axios.get("https://api.toucanimpact.com/api/recipient/").then(resp => {
      commit("SET_RECIPIENT_TYPE", resp.data)
    }).catch(err => {
      commit("ERROR_RECIPIENT_TYPE", err)
    })
  },
  getrecipientsById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/recipient/${id}`).then(resp => {
        commit("ADD_RECIPIENT_TYPE_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_RECIPIENT_TYPE", err)
        reject(err)
      })
    })
  },
  getrecipientsArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/recipient-to-array/").then(resp => {
        commit("SET_RECIPIENT_TYPE_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_RECIPIENT_TYPE", err)
        reject(err)
      })
    })
  },
  addrecipient({ commit }, recipient) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/recipient/",
        data: recipient,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_RECIPIENT_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_RECIPIENT_TYPE", err)
          reject(err)
        })
    })
  },
  updaterecipient({ commit }, recipient) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/recipient/${recipient.id}`,
        data: recipient,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_RECIPIENT_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_RECIPIENT_TYPE", err)
          reject(err)
        })
    })
  },
  async deleterecipient({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/recipient/${id}`);
    commit("REMOVE_RECIPIENT_TYPE", id)
  }
}

const getters = {
    recipients: state => state.recipients,
    recipientsArray: state => state.recipientsArray,
}

const impact_typeModule = {
  state,
  mutations,
  actions,
  getters
}

export default impact_typeModule
