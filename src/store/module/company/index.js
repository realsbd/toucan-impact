import axios from "axios"

const state = {
  companies: [],
  companiesArray: [],
  company: {},
  status: ""
}

const mutations = {
  ADD_COMPANY(state, payload) {
    state.company = payload
    state.status = "success"
  },
  SET_COMPANY(state, companies) {
    state.companies = companies
  },
  ADD_COMPANY_ID(state, payload) {
    state.company = payload
    state.status = "success"
  },
  SET_COMPANY_ARRAY(state, companiesArray) {
    state.companiesArray = companiesArray
  },
  ERROR_COMPANY(state) {
    state.status = "error"
  },
  REMOVE_COMPANY(state, id) {
    state.companies.filter(company => company.id !== id)
    state.companies.splice(company => company.id, 1)
  }
}

const actions = {
  getCompanies({ commit }) {
    axios
      .get(
        "https://api.toucanimpact.com/api/companies")
      .then(resp => {
        commit("SET_COMPANY", resp.data)
      })
      .catch(err => {
        commit("ERROR_COMPANY", err)
      })
  },
  getCompaniesById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.toucanimpact.com/api/companies/${id}`).then(resp => {
        commit("ADD_COMPANY_ID", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_COMPANY", err)
        reject(err)
      })
    })
  },
  getCompaniesArray({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("https://api.toucanimpact.com/api/companies-to-array").then(resp => {
        commit("SET_COMPANY_ARRAY", resp.data)
        resolve(resp)
      }).catch(err => {
        commit("ERROR_COMPANY", err)
        reject(err)
      })
    })
  },
  addCompany({ commit }, company) {
    return new Promise((resolve, reject) => {
      axios({
        url: "https://api.toucanimpact.com/api/companies",
        data: company,
        method: "POST"
      })
        .then(resp => {
          commit("ADD_COMPANY", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_COMPANY", err)
          reject(err)
        })
    })
  },
  updateCompanies({ commit }, categoryType) {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.toucanimpact.com/api/companies/${categoryType.id}`,
        data: categoryType,
        method: "PUT"
      })
        .then(resp => {
          commit("ADD_COMPANY", resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit("ERROR_COMPANY", err)
          reject(err)
        })
    })
  },
  async deleteCompany({ commit }, id) {
    await axios.delete(`https://api.toucanimpact.com/api/companies/${id}`);
    commit("REMOVE_COMPANY", id)
  }
}

const getters = {
  companies: state => state.companies
}

const companyModule = {
  state,
  mutations,
  actions,
  getters
}

export default companyModule
