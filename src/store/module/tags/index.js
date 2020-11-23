import axios from "axios"

const state = {
  tags: [],
  tagsArray: [],
  recipient: {},
  status: ""
}

const mutations = {
  ADD_TAG(state, payload) {
    state.tag = payload
    state.status = "success"
  },
  SET_TAG(state, tags) {
    state.tags = tags
  },
  ADD_TAG_ID(state, payload) {
    state.tag = payload
    state.status = "success"
  },
  SET_TAG_ARRAY(state, tagsArray) {
    state.tagsArray = tagsArray
  },
  ERROR_TAG(state) {
    state.status = "error"
  },
  REMOVE_TAG(state, id) {
    state.tags.filter(tag => tag.id !== id)
    state.tags.splice(tag => tag.id, 1)
  }
}

const actions = {
  gettags({ commit }) {
    axios.get("https://api.toucanimpact.com/api/tags").then(resp => {
      commit("SET_TAG", resp.data)
    }).catch(err => {
      commit("ERROR_TAG", err)
    })
  },
  gettagsById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/tags/${id}`).then(resp => {
        commit("ADD_TAG_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_TAG", err)
        reject(err)
      })
    })
  },
  gettagsArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/tags-to-array").then(resp => {
        commit("SET_TAG_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_TAG", err)
        reject(err)
      })
    })
  },
  addtag({ commit }, tag) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/tags",
        data: tag,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_TAG", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_TAG", err)
          reject(err)
        })
    })
  },
  updatetags({ commit }, tag) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/tags/${tag.id}`,
        data: tag,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_TAG", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_TAG", err)
          reject(err)
        })
    })
  },
  async deletetag({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/tags/${id}`);
    commit("REMOVE_TAG", id)
  }
}

const getters = {
    tags: state => state.tags,
    tagsArray: state => state.tagsArray,
}

const tagsModule = {
  state,
  mutations,
  actions,
  getters
}

export default tagsModule
