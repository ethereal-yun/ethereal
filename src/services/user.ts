import { request } from '@umijs/max';

//首页home数据  
export function queryHome() {
    return request("/api/v2/pweb/home")
}

//首页home编辑推荐
export function queryHomeRectopics(){
    return request("/api/v2/pweb/ugc/rec_topics")
}
//首页home最新上架
export function queryHomeTopics(){
    return request("/api/v2/pweb/ugc/topics")
}

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

//获取漫画每一章内容
export function queryContent(id:string) {
    return request(`/api/v2/pweb/comic/${id}`)
}

// 获取漫画章节
export function getChapter(id: number) {
    return request(`/api/v2/pweb/topic/${id}`);
}

// 获取更新内容
export function getRenew({pos}) {
    return request(`/api/v2/pweb/daily/topics?pos=${pos}`)
}
