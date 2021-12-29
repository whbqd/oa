/**
 * 报表上传
 */

import axios from '@/http/report';

// 上传
export function upload(formData) {
  return axios.post('/report/upload', formData);
}

// 重新上传
export function reupload(formData) {
  return axios.post('/report/reupload', formData);
}

export function download(id) {
  return axios.get('/report/download?id='+id);
}

// 获取列表
export function getreport() {
  return axios.get('/report/getreport');
}



