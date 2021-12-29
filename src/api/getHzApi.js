import axios from "@/http";
import { formatData } from "../util/index";
//获取小组排名
export async function getHz_class(url, { time, teamname, page, pagesize }) {
	let t = "";
	const type = typeof time;
	if (type === "object") {
		if (time[0] && time[1]) {
			t = formatData(time[0]) + "," + formatData(time[1]);
		}
	}
	return axios({
		url,
		method: "get",
		params: {
			time: t,
			teamname,
			page,
			pagesize,
		},
	});
}

// 获取个人排名
export async function getHz_person(url, { time, workname, page, pagesize }) {
	let t = "";
	const type = typeof time;
	if (type === "object") {
		if (time[0] && time[1]) {
			t = formatData(time[0]) + "," + formatData(time[1]);
		}
	}
	return axios({
		url,
		method: "get",
		params: {
			time: t,
			workname,
			page,
			pagesize,
		},
	});
}

// 获取区县排名
export async function getHz_dept(url, { county, pagesize }) {
	return axios({
		url,
		method: "get",
		params: {
			county,
			pagesize,
		},
	});
}

//获取订单数
export async function getOrder(url, { time }) {
	return axios({
		url,
		method: "get",
		params: {
			time,
		},
	});
}
