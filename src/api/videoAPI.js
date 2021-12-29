import axios from "../http/index";

// 查询视频列表
export function queryVideoList(url, options) {
	return axios({
		url,
		method: "post",
		params: options,
	});
}
//下载视频
export function videoDownload(url, a) {
	return axios({
		url,
		method: "post",
		params: {
			a,
		},
	});
}

// 报表
export function getTable(url, date) {
	return axios({
		url,
		method: "get",
		params: {
			date,
		},
	});
}

// 导出
export function downloadTable(url, date, county) {
	return axios({
		url,
		method: "get",
		params: {
			date,
			county,
		},
	});
}
