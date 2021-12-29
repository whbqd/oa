import axios from "../http";
// import { formatData } from "../util/index";
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

// 获取
export async function getJs(url, option) {
	// if (url === "Fqx" || url === "Fgq") {
	// 	return axios({
	// 		url,
	// 		method: "get",
	// 		params: {
	// 			county,
	// 			beginDateScope: date,
	// 			// accountNumber,
	// 			balanceStatus: jsStatus,
	// 			address,
	// 			page,
	// 			pageSize,
	// 		},
	// 	});
	// }
	return axios({
		url,
		method: "get",
		data: option,
	});
}

// 批量结算
export async function batchJs(url, { idList }) {
	const ids = formarString(idList);
	console.log("批量结算id:", ids);
	return axios({
		url,
		method: "post",
		params: {
			ids,
		},
	});
}

//文件上传
export async function uploadJsFile(url, formData) {
	return axios.post(url, formData, { "Content-Type": "multipart/form-data" });
}

// 查看
export function showJsById(url, id) {
	return axios({
		url,
		method: "get",
		params: {
			id: +id,
		},
	});
}
