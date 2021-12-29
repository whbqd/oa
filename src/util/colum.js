//按需表头
const columns = [
	//户线整改
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		
		{
			title: "区县",
			key: "county",
			width: 100,
		},
		{
			title: "业务接入地址",
			key: "address",
			width: 200,
		},
		{
			title: "账号",
			key: "accountNumber",
			width: 150,
		},
		{
			title: "设备接入名称",
			key: "deviceName",
			minWidth: 200,
		},
		{
			title: "手机号",
			key: "contactNumber",
			width: 150,
		},
		{
			title: "下派时间",
			key: "lowerTime",
			width: 180,
		},
		{
			title: "整改人员",
			key: "personnel",
			width: 100,
		},
		{
			title: "整改有效期",
			key: "periodTime",
			width: 180,
		},
		{
			title: "质检",
			key: "test",
			width: 100,
		},
		{
			title: "派单状态",
			key: "status",
			width: 100,
		},
		{
			title: "是否完成",
			key: "completion",
			width: 100,
		},
		{
			title: "上传时间",
			key: "fileUpload",
			width: 180,
		},
		{
			title: "Action",
			slot: "action",
			width: 250,
			align: "center",
			fixed: "right",
		},
	],
	// 分纤箱
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		{
			title: "id",
			key: "id",
			width: 100,

		},
		{
			title: "区县",
			key: "county",
			width: 100,

		},
		{
			title: "名称",
			key: "name",
			minWidth: 200,

		},
		{
			title: "所属站点",
			key: "site",
			width: 200,
		},
		{
			title: "所属机房",
			key: "computerRoom",
			width: 200,
		},
		{
			title: "下派时间",
			key: "lowerTime",
			width: 180,
		},
		{
			title: "整改人员",
			key: "correctivePersonnel",
			width: 100,
		},
		{
			title: "整改日期",
			key: "correctiveTime",
			width: 180,
		},
		{
			title: "质检",
			key: "test",
			width: 100,
		},
		{
			title: "派单状态",
			key: "status",
			width: 100,
		},
		{
			title: "是否完成",
			key: "completion",
			width: 100,
		},
		{
			title: "上传时间",
			key: "fileUpload",
			width: 180,
		},
		{
			title: "Action",
			slot: "action",
			width: 250,
			align: "center",
			fixed: "right",
		},
	],
	// 分光器
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		
		{
			title: "区县",
			key: "county",
			width: 100,
		},
		{
			title: "名称",
			key: "spectrometerName",
			minWidth: 200,
		},
		{
			title: "下派时间",
			key: "nextTime",
			width: 180,
		},
		{
			title: "整改人员",
			key: "correctivePersonnel",
			width: 100,
		},
		{
			title: "整改时间",
			key: "rectificationDate",
			width: 180
		},
		{
			title: "质检",
			key: "qualityInspection",
			width: 100,
		},
		{
			title: "派单状态",
			key: "status",
			width: 100,
		},
		{
			title: "是否完成",
			key: "completion",
			width: 100,
		},
		{
			title: "上传时间",
			key: "fileUpload",
			width: 180,
		},
		{
			title: "Action",
			slot: "action",
			width: 250,
			align: "center",
			fixed: "right",
		},
	],
	// 零星
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		
		{
			title: "工单编号",
			key: "number",
			width: 200,
		},
		{
			title: "工单完成时间",
			key: "finishTime",
			width: 150,
		},
		{
			title: "区县",
			key: "county",
			width: 100,
		},
		{
			title: "分光器名称",
			key: "spectroscopeName",
			minWidth: 200,
		},
		{
			title: "下派时间",
			key: "lowerTime",
			width: 180,
		},
		{
			title: "整改人员",
			key: "personnel",
			width: 100,
		},
		{
			title: "整改日期",
			key: "changeTime",
			width: 180,
		},
		{
			title: "质检",
			key: "qualityTesting",
			width: 100,
		},
		{
			title: "派单状态",
			key: "status",
			width: 100,
		},
		{
			title: "是否完成",
			key: "completion",
			width: 100,
		},
		{
			title: "上传时间",
			key: "fileUpload",
			width: 180,
		},
		{
			title: "Action",
			slot: "action",
			width: 250,
			align: "center",
			fixed: "right",
		},
	],
];
//结算表头
const columns_js = [
	//户线整改
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		
		{
			title: "区县",
			key: "county",
			width: 100
		},
		{
			title: "宽带账号",
			key: "accountNumber",
			minWidth: 150
		},

		{
			title: "手机号",
			key: "userPhone",
			minWidth: 130
		},
		{
			title: "整改人员",
			key: "people",
			width: 100
		},
	
		{
			title: "质检",
			key: "test",
			width: 100
		},
		{
			title: "结算金额",
			key: "money",
			width: 100
		},
		{
			title: "结算状态",
			key: "balance",
			width: 100
		},
		{
			title: "上传时间",
			key: "fileUpload",
			minWidth: 180
		},
		{
			title: "Action",
			slot: "action",
			width: 150,
			align: "center",
			fixed: "right",
		},
	],
	// 分纤箱
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		
		{
			title: "区县",
			key: "county",
			minWidth: 100
		},
		
		{
			title: "整改人员",
			key: "correctivePersonnel",
			minWidth: 100
		},
	
		{
			title: "质检",
			key: "test",
			minWidth: 100
		},
		{
			title: "结算金额",
			key: "money",
			minWidth: 130
		},
		{
			title: "结算状态",
			key: "balance",
			minWidth: 100
		},
		{
			title: "上传时间",
			key: "fileUpload",
			minWidth: 200
		},
		{
			title: "Action",
			slot: "action",
			width: 150,
			align: "center",
			fixed: "right",
		},
	],
	// 分光器
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		
		{
			title: "区县",
			key: "county",
			minWidth: 100
		},
	
		{
			title: "整改人员",
			key: "correctivePersonnel",
			minWidth: 100
		},
	
		
		{
			title: "结算金额",
			key: "money",
			minWidth: 120
		},
		{
			title: "结算状态",
			key: "balance",
			minWidth: 100
		},
		{
			title: "上传时间",
			key: "fileUpload",
			minWidth: 180
		},
		{
			title: "Action",
			slot: "action",
			width: 150,
			align: "center",
			fixed: "right",
		},
	],
	// 零星
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		
		{
			title: "区县",
			key: "county",
			minWidth: 100
		},
		
		{
			title: "整改人员",
			key: "personnel",
			minWidth: 100
		},

		{
			title: "质检",
			key: "test",
			minWidth: 100
		},
		{
			title: "结算金额",
			key: "money",
			minWidth: 120
		},
		{
			title: "结算状态",
			key: "balance",
			minWidth: 100
		},
		{
			title: "上传时间",
			key: "fileUpload",
			minWidth: 150
		},
		{
			title: "Action",
			slot: "action",
			width: 150,
			align: "center",
			fixed: "right",
		},
	],
	// B改H,
	[
		{
			type: "selection",
			width: 60,
			align: "center",
		},
		{
			title: "id",
			key: "id",
		},
	],
];

export function getColums(type) {
	let index = 0;
	switch (type) {
		case "Hxzg":
			index = 0;
			break;
		case "Fqx":
			index = 1;
			break;
		case "Fgq":
			index = 2;
			break;
		case "Lx":
			index = 3;
			break;
		case "Bgh":
			index = 4;
			break;
	}
	return columns[index];
}

//获取结算表头
export function getColumsJs(type) {
	let index = 0;
	switch (type) {
		case "Hxzg":
			index = 0;
			break;
		case "Fqx":
			index = 1;
			break;
		case "Fgq":
			index = 2;
			break;
		case "Lx":
			index = 3;
			break;
	}
	return columns_js[index];
}
