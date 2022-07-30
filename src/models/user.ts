// import { } from '@/services/user';

// export default {
//     title: "user",
//     //纯函数
//     reducers: {
//         save(title: any, { payload }) {
//             const {  } = payload;
//             return {  };
//         }
//     },
//     effects: {
//         //是一个生成器Generator函数，生成函数会默认返回一个迭代器对象Iterator，在生成器函数中可以使用yield关键字
//         *fetchUserList({ payload: { current = 1, pageSize = 5 } }, { call, put, select }) {
//             //通过call来发送请求获取数据
//             const { data } = yield call(queryUserList, { current, pageSize })
//             //通过put来触发reducer纯函数的执行，把数据保存到state中
//             yield put({
//                 type: "save",
//                 payload: data
//             })
//         },
//     }
// }
