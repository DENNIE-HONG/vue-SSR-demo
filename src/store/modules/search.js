/**
 * 搜索数据存储
 * 只支持异步
 * @author luyanhong 2018-10-31
*/
import { getSearch } from 'api/search';
const search = {
  namespaced: true,
  state: () => ({
    searchList: []
  }),
  mutations: {
    // 搜索数据只支持异步
    FETCH: (state, res) => {
      for (const item of res.data.searchm.Paragraph) {
        item.sku = item.wareid;
        item.img = item.Content.imageurl;
        item.t = item.Content.warename;
        item.jp = item.dredisprice * 100;
      }
      state.searchList = res.data.searchm.Paragraph;
    },
    LOADMORE: (state, res) => {
      for (const item of res.data.searchm.Paragraph) {
        item.sku = item.wareid;
        item.img = item.Content.imageurl;
        item.t = item.Content.warename;
        item.jp = item.dredisprice;
      }
      state.searchList = state.searchList.concat(res.data.searchm.Paragraph);
    }
  },
  actions: {
    FETCH: ({ commit }, { page, keyword, sort_type, filt_type }) => new Promise(async (resolve, reject) => {
      try {
        const res = await getSearch({ page, keyword, sort_type, filt_type });
        page === 1 && commit('FETCH', res);
        page > 1 && commit('LOADMORE', res);
        resolve(res);
      } catch(err) {
        reject(err);
      }
    })
  }
};
export default search;
