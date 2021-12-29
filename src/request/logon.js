//在api文件夹里引入刚才创建好的request文件
import request from './request'
//在这里统一管理请求方法 ， 
export function gets(url, data) {
    return request.get(url, {
        params: data,
    })
}

// 发送短信
export function posts(url, data) {
    return request.post(url, data)
}
