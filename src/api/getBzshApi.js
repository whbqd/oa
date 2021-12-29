import axios from "@/http";
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

//全查
export async function getExamineClass(url, { page, pagesize }) {
	return axios({
		url,
		method: "get",
		params: {
			page,
			pagesize,
		},
	});
}

// 同意驳回
export async function agreeRebut(url, { id, type }) {
	return axios({
		url,
		method: "post",
		params: {
			id,
			type,
		},
	});
}

// 审批通过
export async function batchAgree(url, { idList }) {
	const is = formarString(idList);
	return axios({
		url,
		method: "post",
		params: {
			id: is,
			type: 2,
		},
	});
}
