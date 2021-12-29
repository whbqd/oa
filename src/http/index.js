

import axios from "axios";
import URL from './URL2';

const myAxios = axios.create({
    baseURL: URL.apiUrl
});

myAxios.interceptors.request.use(req => {
    console.log('请求', req)
    if (req.url.includes('video/player')) {
        return req;
    }
    req.headers.token = sessionStorage.getItem(
        "token"
    );
    return req;
});

myAxios.interceptors.response.use(res => {
    console.log(res);
    if (res.status === 200) {
        return res.data;
    }
    return null;
})

export default myAxios;