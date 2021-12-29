export function formatData(date) {
	if (!date) {
		return '';
	}
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	return `${year}-${month}-${day}`;
}
const dept = [
	"上城",
	"下城",
	"西湖",
	"江干",
	"拱墅",
	"滨江",
	"萧山",
	"余杭",
	"临安",
	"富阳",
	"建德",
	"桐庐",
	"淳安",
	"武林",
];

//获取所有区县

export function getDept() {
	const deptObj = [];
	dept.forEach((it) => {
		deptObj.push({
			value: it,
			label: it,
			id: +new Date() + Math.random() * 10,
		});
	});
	return deptObj;
}

// 获取所有区县及全部
export function getAllDept() {
	const deptObj = [];
	deptObj.push({
		value: "",
		label: "全部",
		id: +new Date() + Math.random() * 10,
	});
	dept.forEach((it) => {
		deptObj.push({
			value: it,
			label: it,
			id: +new Date() + Math.random() * 10,
		});
	});
	return deptObj;
}
// 获取所有区县及全部 value: '全部'
export function getAllDeptV() {
	const deptObj = [];
	deptObj.push({
		value: "全部",
		label: "全部",
		id: +new Date() + Math.random() * 10,
	});
	dept.forEach((it) => {
		deptObj.push({
			value: it,
			label: it,
			id: +new Date() + Math.random() * 10,
		});
	});
	return deptObj;
}




//通过type转换文字
export function typeFormat(type) {
	if (type === "Hxzg") {
		return "户线整改";
	} else if (type === "Fqx") {
		return "分纤箱";
	} else if (type === "Fgq") {
		return "分光器";
	} else if (type === "Lx") {
		return "零星";
	} else if (type === "Bgh") {
		return "B改H";
	}
}

//结算data -> 存 SessionStroage
export function setSessionStorage(data) {
	sessionStorage.setItem("singeData", JSON.stringify(data));
}

// 获取sessionStorage data
export function getSessionStorage() {
	const data = sessionStorage.getItem("singeData");
	return data ? JSON.parse(data) : null;
}


// 判断是否是市公司
export function judge(dept) {
	const arr = [
		"上城",
		"下城",
		"西湖",
		"江干",
		"拱墅",
		"滨江",
		"萧山",
		"余杭",
		"临安",
		"富阳",
		"建德",
		"桐庐",
		"淳安",
		"武林",
	];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == dept) {
			return false;
		}
	}
	return true;

}
