/**
 * 报表中心 汇总
 */

import axios from '@/http/report';

// 获取报表汇总列表
export function getSummary(page = 1, pageSize = 10, {
  county,
  startDate,
  endDate,
  name
} = {}) {
  return axios({
    url: '/summary',
    method: 'get',
    params: {
      page,
      pageSize,
      county,
      startDate,
      endDate,
      name
    }
  })
}

// 下载
export function summaryDownload(id) {
  return axios.get('/summary/' + id);
}


// 删除
export function summaryDel(id) {
  return axios.delete('/summary/' + id);
}
