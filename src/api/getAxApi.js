import axios from "../http";
import { formatData } from "../util/index";
//数组转换String 1,2,3,4
function formarString(ids) {
	if (typeof ids === "number") {
		return ids;
	}
	let str = "";
	for (let i = 0; i < ids.length; i++) {
		str += ids[i] + ",";
	}
	return str.slice(0, str.length - 1);
}

//批量删除
export async function delAx(url, ids) {
	const str = formarString(ids);
	return await axios({
		url,
		method: "get",
		params: {
			id: str,
		},
	});
}

//批量导入
export async function uploadFile(url, formData) {
	// return axios({
	// 	url,
	// 	method: "post",
	//     headers: {
	//         'Content-Type': 'multipart/form-data'
	//     },
	// 	body: formData,
	// });

	return axios.post(url, formData, { "Content-Type": "multipart/form-data" });
}

//查询小组
export async function queryClass(url, { page, pagesize }) {
	return axios.get(url, { page, pagesize });
}

//批量删除小组
export async function delClass(url, ids) {
	const teamIds = formarString(ids);
	return axios({
		url,
		method: "post",
		params: {
			teamIds,
		},
	});
	// return axios.get(url, {teamIds});
}

//修改小组状态
export async function editStatusClass(url, id) {
	return axios({
		url,
		method: "post",
		params: {
			teamId: id,
		},
	});
}

//区县查员工
export async function deptQueryClass(url, { dept, page, pagesize }) {
	return axios({
		url,
		method: "get",
		params: {
			dept,
			page,
			pageSize: pagesize,
		},
	});
}

//创建班组
export async function createClass(
	url,
	{ value, lookDept, targetKeys3, nameArr, dept }
) {
	const teamPeople = formarString(nameArr); // 小组成员
	const teamPeopleId = formarString(targetKeys3);
	return axios({
		url,
		method: "post",
		params: {
			teamName: value,
			teamPeople,
			teamsVisible: lookDept,
			teamPeopleId,
			dept, //区县
		},
	});
}

//批量派单
export async function bacthPd(url, { ids, teamids }) {
	ids = formarString(ids);
	const periodTime = formatData(new Date());
	return axios({
		url,
		method: "post",
		params: {
			ids,
			teamids,
			periodTime,
			// periodTime: new Date()
		},
	});
}

//单个派单 hxzg
export async function singlePd_hxzg(url, { id, type, time, teamName }) {
	const periodTime = formatData(time);
	return axios({
		url,
		method: "post",
		params: {
			id,
			type,
			periodTime,
			lowerGroup: teamName,
		},
	});
}
// 单个派单 fqx fgq
export async function singlePd_other(url, { id, time, teamName }) {
	console.log(time);
	const periodTime = formatData(time);
	return axios({
		url,
		method: "post",
		params: {
			id,
			periodTime,
			lowerGroup: teamName,
		},
	});
}

//工单详情
export async function workDetails(url, id) {
	return axios({
		url,
		method: "get",
		params: {
			id,
		},
	});
}

// 按需改进 api

// 批量删除 -> 根据日期

export function delForDate(url, { type, time }) {
	const periodTime = `${formatData(time[0])},${formatData(time[1])}`;
	return axios({
		url,
		method: "get",
		params: {
			type,
			periodTime,
		},
	});
}

// 按需全查+高级筛选
export async function getAx(url, options) {
	console.log("高级筛选",options);
	return await axios({
		url,
		method: "post",
		data: options,
	});
}

// 按需派单修改
export function editAx(url, options) {
	console.log(options);
	
	return axios({
		url,
		method: "post",
		data: options,
	});
}

// 批量导出
export function batchDownloadAx(url, periodTime) {
	return axios.get(url, periodTime);
}
