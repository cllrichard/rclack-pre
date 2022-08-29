const state = {
  cou: "",
}

const mutations = {
  NODE_COUT: (state, val) => {
    state.cou = val
  },
  
}

const actions = {
  checkChange({ commit }, val) {
    console.log(val);
    commit('NODE_COUT', val)
  },
 
}


export default {
    namespaced: true,
    mutations,
    actions,
    state,
}