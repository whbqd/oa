import axios from 'axios';
import url from './URL2';
import store from '@/store';
const myaxios = axios.create({
  baseURL: url.apiUrl,
  // baseURL: "",
})

myaxios.interceptors.request.use((config) => {
  const token = store.state.token;
  config = {
    ...config,
    headers: {
      ...config.headers,
      token
    }
  };
  console.log('请求头:', config)
  return config;
})

myaxios.interceptors.response.use((resp) => {
  if (resp.data.code === 200) {
    return resp.data;
  }
  return Promise.reject(resp.data);
}, (error) => {
  console.log(error);
  return Promise.reject(error);
})

export default myaxios;