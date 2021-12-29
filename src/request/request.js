//引入axios
import axios from 'axios'
// import store from '../store'
import URL from '../http/URL2';
import router from '@/router';
//1. 创建新的axios实例，
const instance = axios.create({
    //设置公共接口
    baseURL: URL.apiUrl,
    //设置超时时间
})

// 请求拦截器
instance.interceptors.request.use((config) => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    let token = sessionStorage.getItem("token");
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        // config.headers.token = token  //请求头加上tokens
        // console.log(sessionStorage.getItem("token"))
        // console.log("123")
    }
    return config
})

// 响应拦截器
instance.interceptors.response.use((res) => {
    // if(res.status === 402) {
    //     console.log(111);
    // }
    return res;
},(error) => {
    console.log(error);
    if(error.length < 41) {
        return;
    }
    const err = error.slice(0, 41);
    if (err.includes('402')) {
        router.push('/');
    }
    console.log('111111',err);
})

// 将新创建的一个axios导出
export default instance
