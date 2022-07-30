import { request } from '@umijs/max';

// export function queryUserList({ current = 1, pageSize = 5 }) {
//     return request(`/api/users?current=${current}&pageSize=${pageSize}`)
// }

// export function queryUserById(id: number) {
//     return request(`/api/users/${id}`);
// }

// export function deleteUserById(id: number, { current = 1, pageSize = 5 }) {
//     // return request(`/api/users/delete/${id}?current=${current}&pageSize=${pageSize}`);
//     return request(`/api/users/delete/${id}`, {
//         params: { current: current, pageSize: pageSize },
//     })
// }

// export function createUser(user: any) {
//Y     return request(`/api/users/create`, {
//         method: "POST",
//         data: user,
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         }
//     });
// }
//获取排行
export function getcol() {
    return request(`/api/v2/pweb/rank_type_list`)
}
export function getexactrank(id:number) {
    return request(`/api/v2/pweb/rank/topics`,{
        params: { rank_id: id,  },
    })
}

//获取类别
export function getsort() {
    return request(`/api/v1/search/by_tag?since=0&count=24&f=3&tag=0&sort=1&query_category={"update_status":1}`)
}

//根据类别来获取数据
export function searchsort(tag:number,sort:number,update_status:number) {
    return request(`/api/v1/search/by_tag?since=0&count=24&f=3&tag=${tag}&sort=${sort}&query_category={"update_status":${update_status}}`)
}