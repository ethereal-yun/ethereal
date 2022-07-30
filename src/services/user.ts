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
