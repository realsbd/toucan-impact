import axios from "axios"

const state = {
  categoryTypes: [],
  categoryTypesArray: [],
  categoryType: {},
  status: ""
}

const mutations = {
  ADD_CATEGORY_TYPE(state, payload) {
    state.categoryType = payload
    state.status = "success"
  },
  SET_CATEGORY_TYPE(state, categoryTypes) {
    state.categoryTypes = categoryTypes
  },
  ADD_CATEGORY_TYPE_ID(state, payload) {
    state.categoryType = payload
    state.status = "success"
  },
  SET_CATEGORY_TYPE_ARRAY(state, categoryTypesArray) {
    state.categoryTypesArray = categoryTypesArray
  },
  ERROR_CATEGORY_TYPE(state) {
    state.status = "error"
  },
  REMOVE_CATEGORY_TYPE(state, id) {
    state.categoryTypes.filter(categoryType => categoryType.id !== id)
    state.categoryTypes.splice(categoryType => categoryType.id, 1)
  }
}

const actions = {
  getcategoryTypes({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/categories",
        method: "GET"
      })
        .then(resp => {
          commit("SET_CATEGORY_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_CATEGORY_TYPE", err)
          reject(err)
        })
    })
  },
  getcategoryTypeById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/categories/${id}`).then(resp => {
        commit("ADD_CATEGORY_TYPE_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_CATEGORY_TYPE", err)
        reject(err)
      })
    })
  },
  getcategoryArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/categories-to-array").then(resp => {
        commit("SET_CATEGORY_TYPE_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_CATEGORY_TYPE", err)
        reject(err)
      })
    })
  },
  addcategoryType({ commit }, categoryType) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/categories",
        data: categoryType,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_CATEGORY_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_CATEGORY_TYPE", err)
          reject(err)
        })
    })
  },
  updatecategoryType({ commit }, categoryType) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/categories/${categoryType.id}`,
        data: categoryType,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_CATEGORY_TYPE", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_CATEGORY_TYPE", err)
          reject(err)
        })
    })
  },
  async deletecategoryType({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/categories/${id}`);
    commit("REMOVE_CATEGORY_TYPE", id)
  }
}

const getters = {
    categoriesTypes: state => state.categoryTypes,
    categoryTypesArray: state => state.categoryTypesArray,
}

const categoryModule = {
  state,
  mutations,
  actions,
  getters
}

export default categoryModule
