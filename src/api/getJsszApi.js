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

// 全查
export async function getSalary(url, { page, pagesize }) {
	return axios({
		url,
		method: "get",
		params: {
			page,
			pagesize,
		},
	});
}

// 新增
export async function setSalary(
	url,
	{ rectificationType, operationType, settlementUnit, coefficient, losses }
) {
	// "Content-Type": "application/json
	return axios({
		url,
		method: "post",
		params: {
			rectificationType: rectificationType,
			operationType: operationType,
			settlementUnit: settlementUnit,
			coefficient: coefficient,
			losses: losses,
		},
	});
}

// 修改
export async function updateSalary(
	url,
	{ id, rectificationType, operationType, settlementUnit, coefficient, losses }
) {
	return axios({
		url,
		method: "post",
		params: {
			id,
			rectificationType,
			operationType,
			settlementUnit,
			coefficient,
			losses,
		},
	});
}

// 删除
export async function delSalary(url, { idList }) {
	const type = typeof idList;
	let ids = null;
	if (type == "object") {
		ids = formarString(idList);
	} else {
		ids = idList;
	}

	return axios({
		url,
		method: "post",
		params: {
			ids,
		},
	});
}
