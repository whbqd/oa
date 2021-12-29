


//在api文件夹里引入刚才创建好的request文件
import qs from "qs";
import request from './request'
import axios from "../http";

//在这里统一管理请求方法 ， 
request.defaults.headers.common["token"] = sessionStorage.getItem(
    "token"
);
// 查看
// export function gets(url, params) {
//     return request.get(url, {
//         params
//     })
// }

export function gets(url, data) {
    return request({
        url: url,
        method: 'get',
        params: data

    })
}
export function getp(url, data) {
    return request({
        url: url,
        method: 'get',
        params: qs.stringify(data)

    })
}
// post转麻
// export function posts(url, data) {
//     return request.post(url, qs.stringify(data))
// }

export function posts(url, data) {
    return request({
        url: url,
        method: 'post',
        data: qs.stringify(data)
    })
}
// post
export function postp(url, data) {
    return request({
        url: url,
        method: 'post',
        data: data,
    })
}

export function postt(url, data) {
    return axios.post(url, data, { "Content-Type": "multipart/form-data" });
}
// post携带params
export function ports(url, data) {
    return request({
        url: url,
        method: 'post',
        params: {
            ids: data
        }
    })
}
