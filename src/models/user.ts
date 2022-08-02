export default {
    namespace: 'user',
    state: {
      list: [],
      total: 0, //总用户个数
      current: 0, //当前页码
    },
    reducers: {
      save(state: any, { payload }) {
        const { list, total, current } = payload;
        return { ...state, list, total, current };
      }
    }
}
