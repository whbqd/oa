/**
 * 
 * 报表审批
 * 
 */
import axios from '@/http/report';

// 获取报表列表
export function approve(page, pageSize, { startDate, endDate, name, county }) {
  return axios.get(`/approve?startDate=${startDate}&endDate=${endDate}&name=${name}&county=${county}&page=${page}&pageSize=${pageSize}`);
}
// 下载
export function approveDownload(id) {
  return axios.get('/approve/' + id);
}

// 删除报表
export function approveDel(id) {
  return axios.delete('/approve/' + id);
}
// 修改报表状态
export function approveEdit(id, status) {
  return axios.put('/approve/' + id, { status });
}