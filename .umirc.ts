import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  alias: {},
  base: '/',
  publicPath: '/',
  history: {
    type: 'browser',
  },
  access: {},
  model: {},
  dva: {},
  initialState: {},
  proxy: {
    '/api': {
      target: 'https://www.kuaikanmanhua.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  request: {
    dataField: 'data',
  },
  routes: [
    { path: '/', component: 'home', title: '首页' },
    { path: '/renew', component: 'renew', title: '更新' },
    { path: '/rank', component: 'rank', title: '排行榜' },
    { path: '/sort', component: 'sort', title: '分类' },
    { path: '/chapter', component: 'chapter', title: '章节' },
    { path: '/content', component: 'content', title: '章节内容' },
    { path: '/my', component: 'my', title: '我的' },
    { path: '/search', component: 'search', title: '搜索' },
  ],
  npmClient: 'pnpm',
});
