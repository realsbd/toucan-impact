/*
 * VueX - State Management
 */

import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./module/auth"
import configuration from "./module/configuration"
import impact from "./module/impact"
import user from "./module/user"
import company from "./module/company"
import globalgoal from "./module/globalgoal"
import category from "./module/category"
import impact_type from "./module/impact_type"
import action_type from "./module/action_type"
import wntk_type from "./module/wntk_type"
import recipient from "./module/recipient"
import tags from "./module/tags"
import link_user from "./module/link_user"
// Register Vuex
Vue.use(Vuex)



// Vuex Store
export default new Vuex.Store({
  modules: {
    auth,
    configuration,
    impact,
    user,
    company,
    globalgoal,
    category,
    impact_type,
    action_type,
    wntk_type,
    recipient,
    tags,
    link_user
  }
})
