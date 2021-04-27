//引入mockjs
/* eslint-disable */
import Mock from 'mockjs'
//使用mockjs模拟数据

Mock.mock('/api/approval', {
    'list|20': [{
        "number": /[a-z][A-Z][0-9]/,
        "type|1": [
            "物品领用",
            "通用审批",
            "用印申请",
            "用料申领",
        ],
        "applicant": "张呵呵",
        "content|1": ["一个文件夹", "两个订书机", "四个热熔机", "十袋口罩"],
        "approved": "@cname",
        "state|1": { "pend": "", "proce": "@boolean" },
    }]
});
Mock.mock('/api/myAgent', {
    'list|20': [{
        "name|1": ["行政会议", "普通工作"],
        "explain": "@csentence",
        "urgency|1": ["紧急不重要", "紧急重要", "非常紧急", "非常重要"],
        "executor": "张呵呵",
        "supervisor": "@cname",
        "start": "@datetime",
        "ends": "@datetime",
        "completion|1": ["已完成", "未完成"],
        "panduan|1": [1, 2,]

    }]
});
Mock.mock('/api/notice', {
    'list|400': [{
        "state|1": ["已读", "未读"],
        "depa|1": ["维护部", "财务部", "工程部", "家集客中心"],
        "type|1": ["通知", "通告", "新闻", "学习", "企业文化", "规章制度"],
        "explain": "@csentence",
        "date": "@date",
    }]
});
Mock.mock('/api/library', {
    'list|400': [{
        "name|1": ["关于表彰2020业务", "关于表彰2018业务", "业务表彰", "先进标兵"],
        "type|1": ["政策文件", "管理考核", "办公模板", "学习", "上传文件"],
        "size|1-100": 0,
        "date": "@date",
    }]
});
Mock.mock('/api/choice', {
    "list": [{
        'ling|20': [{
            "name": "@cname",
        }],
        'weihu|20': [{
            "name": "@cname",
        }],
        'weihu2|50': [{
            "name": "@cname",
        }],
        'jianshe|50': [{
            "name": "@cname",
        }],
        'jianshe2|50': [{
            "name": "@cname",
        }]
    }
    ],
});