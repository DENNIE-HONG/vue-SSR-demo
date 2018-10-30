import { getSearch } from 'api/search';
const search = {
  namespaced: true,
  state: () => ({
    searchList: []
  }),
  mutations: {
    FETCH: (state, res) => {

    }
  },
  actions: {
    FETCH: ({ commit }, { page, keyword, sort_type, filt_type }) => new Promise(async (resolve, reject) => {
      try {
        const res = await getSearch({ page, keyword, sort_type, filt_type });
        commit('FETCH', res);
        resolve(res);
      } catch(err) {
        reject(err);
      }
    })
  }
};
export default search;
