import axios from 'axios'
export const state = () => ({
  page: 1,
  perPage: 5,
  numbers: [],
  url: 'https://63e4e2d98e1ed4ccf6e859a0.mockapi.io/api/numbers/',
})

export const actions = {
  ADD_NUMBER: async ({ dispatch, state }, payload ) => {
    let newNum = {
      number: payload.number,
      timeStamp: payload.timeStamp
    }
    await axios({
      method: 'post',
      url: state.url,
      data: newNum
    })
      .then(response => {
        dispatch('SET_NUMBERS', {
          page: getters.GET_PAGE,
          limit: 5,
          sort: 'desc'
        })
        alert(response.statusText)
      })
      .catch(err => console.log(err))
  },
  SET_NUMBERS: async ({ commit, state }, payload) => {
    const url = new URL(state.url)
    console.log('2', payload)
    url.searchParams.append('page', payload.page)
    url.searchParams.append('limit', payload.limit);
    url.searchParams.append('order', payload.sort);
    await axios({
      method: 'get',
      url: url,
    })
      .then((response) => {
        commit('SAVE_NUMBERS', response.data)
        if (response.data.status == 200) alert(response.status.text)
      })
      .catch((err) => console.log(err));
  },
  UPDATE_NUMBER: async ({ dispatch, state, getters }, updateInfo) => {
    await axios({
      method: 'put',
      url: state.url + updateInfo.id,
      data: {
        id: updateInfo.id,
        number: updateInfo.number
      }
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch("SET_NUMBERS", {
            page: getters.GET_PAGE,
            limit: 5,
            sort: 'desc'
          })
          alert(response.statusText);
        } else {
          alert(response.statusText);
        }
      });
  },
  DELETE_NUMBER: async ({ dispatch, state, getters }, id) => {
    await axios({
      method: 'delete',
      url: state.url + id,
    })
      .then((response) => {
        if (response.status === 200) {
          alert(response.statusText)
          dispatch("SET_NUMBERS", {
            page: getters.GET_PAGE,
            limit: 5,
            sort: 'desc'
          })
        } else {
          alert(response.statusText);
        }
      })
      .catch((err) => console.log(err));
  },
  SEARCH_NUMBER: async ({ commit, state }, searchParam ) => {
    const url = new URL(state.url)
    url.searchParams.append('number', searchParam);
    await axios({
      method: 'get',
      url: url,
    })
      .then((response) => {
        if (response.data.status == 200) alert(response.status.text)
        commit('SAVE_NUMBERS', response.data)
      })
      .catch((err) => console.log(err));
  },
  SORT_ASC: async ({ commit, state }, payload) => {
    const url = new URL(state.url)
    url.searchParams.append('sortBy', 'timeStamp')
    url.searchParams.append('order', payload.sort)
    url.searchParams.append('page', payload.page)
    url.searchParams.append('limit', payload.limit)
    await axios({
      method: 'get',
      url: url,
    })
      .then((response) => {
        if (response.data.status == 200) alert(response.status.text)
        commit('SAVE_NUMBERS', response.data)
      })
      .catch((err) => console.log(err));
  },
  SORT_DESC: async ({ commit, state }, payload) => {
    const url = new URL(state.url)
    url.searchParams.append('sortBy', 'timeStamp')
    url.searchParams.append('order', payload.sort)
    url.searchParams.append('page', payload.page)
    url.searchParams.append('limit', payload.limit)
    await axios({
      method: 'get',
      url: url,
    })
      .then((response) => {
        if (response.data.status == 200) alert(response.status.text)
        commit('SAVE_NUMBERS', response.data)
      })
      .catch((err) => console.log(err));
  },
  PAGE_UP: ({commit}) => {
    commit("PAGE_UP")
  },
  PAGE_DOWN: ({ commit }) => {
    commit("PAGE_DOWN")
  },
  SET_PER_PAGE: ({ commit }, payload) => {
    commit("PER_PAGE", payload)
  }
}

export const mutations = {
  SAVE_NUMBERS(state, payload) {
    state.numbers = payload
  },
  PAGE_UP(state) {
    state.page++
  },
  PAGE_DOWN(state) {
    state.page--
  },
  PER_PAGE(state, payload) {
    state.perPage = payload
  }
}

export const getters = {
  GET_NUMBERS: (state) => {
    return state.numbers
  },
  GET_PER_PAGE(state) {
    return state.perPage
  },
  GET_PAGE(state) {
    return state.page
  }
}