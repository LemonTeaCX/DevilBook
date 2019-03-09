let express = require('express');
let router = express.Router();
let connection = require('../db/db');
let Util = require('../util/util');
let md5 = require("blueimp-md5");
let token = require('../util/token');

let {
	copyJson, 
	treeMenu
} = Util;

let resWrap = {
  "data": {},
	"msg": "",
	"result": false
};
let mergeRes = (json, ...moreJson) => {
	return Object.assign(copyJson(resWrap), json, ...moreJson);
};

router.get('/', (req, res, next) => {
	res.send('api');
	return;
});

// 获取菜单
router.post('/getMenu', (req, res, next) => {
 	let sql = `SELECT * FROM menu;`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  let menuArr = treeMenu(results);
	  return res.json(mergeRes({
	  	result: true,
	  	data: menuArr
	  }));
	});
});

// 获取账号列表
router.post('/getAccountList', (req, res, next) => {
	let {
		searchVal,
		pageIndex,
		pageSize
	} = req.body;

	let sqlAuth = `SELECT * FROM auth;`;
	let sqlRole = `SELECT * FROM role;`;
 	let sqlSearchVal = searchVal
 		? `WHERE(name REGEXP '${searchVal}' OR email REGEXP '${searchVal}')`
 		: '';
 	let sqlPage = `limit ${(pageIndex-1)*pageSize}, ${pageSize}`;
 	let sql = `SELECT SQL_CALC_FOUND_ROWS * FROM account ${sqlSearchVal} ${sqlPage}; SELECT FOUND_ROWS() as total;`;

	connection.query(sql + sqlAuth + sqlRole, (error, results, fields) => {
	  if (error) throw error;

	  let list = results[0],
	  	auths = results[2],
	  	roles = results[3];

	  list = list.map(item => {
	  	item.status = item.status === 1 ? true : false;
	  	item.role = roles.filter(role => {
	  		return role.value === item.role;
	  	})[0];
	  	item.auth = auths.filter(auth => {
	  		return item.auth.indexOf(auth.value) !== -1;
	  	});
	  	return item;
	  });
	  return res.json(mergeRes({
	  	data: {
	  		list: list,
	  		total: results[1][0].total
	  	},
	  	result: true
	  }));
	});
});

// 获取账号详情
router.post('/getAccountDetail', (req, res, next) => {
	let { id } = req.body;
 	let sql = `SELECT * FROM account WHERE(id = '${id}');`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  let account = results[0];
	  account.status = account.status === 1 ? true : false;
	  account.auth = account.auth.split(',').map(Number);

	  return res.json(mergeRes({
	  	data: account || {},
	  	result: true
	  }));
	});
});

// 获取所有权限
router.get('/getAuth', (req, res, next) => {
 	let sql = `SELECT * FROM auth;`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	data: results,
	  	result: true
	  }));
	});
});

// 获取所有角色
router.get('/getRole', (req, res, next) => {
 	let sql = `SELECT * FROM role;`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	data: results,
	  	result: true
	  }));
	});
});

// 添加账号
router.post('/addAccount', (req, res, next) => {
	console.log(req.body);
	let {
		name,
		email,
		auth,
		role,
		status,
		remark
	} = req.body;
	status = status ? 1 : 0;
	auth = auth.join(',');
 	let sql = `INSERT INTO account (name, email, auth, role, status, remark) VALUES ('${name}', '${email}', '${auth}', ${role}, ${status}, '${remark}');`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	msg: '添加账号成功',
	  	result: true
	  }));
	});
});

// 编辑账号
router.post('/editAccount', (req, res, next) => {
	let {
		id,
		name,
		email,
		auth,
		role,
		status,
		remark
	} = req.body;
	status = status ? 1 : 0;
	auth = auth.join(',');

 	let sql = `UPDATE account SET name='${name}', email='${email}', auth='${auth}', role=${role}, status=${status}, remark='${remark}' WHERE(id=${id});`;
	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	msg: '修改账号信息成功',
	  	result: true
	  }));
	});
});

// 删除账号
router.post('/delAccount', (req, res, next) => {
	let { ids } = req.body;
	ids = ids.join(',');
 	let sql = `DELETE FROM account WHERE(id in (${ids}));`;
	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	msg: '删除账号成功',
	  	result: true
	  }));
	});
});

// 登录
router.post('/login', (req, res, next) => {
	let {
		user,
		password
	} = req.body;

	password = md5(password);

	let sql = `SELECT * FROM user WHERE(username = '${user}' OR phone = '${user}');`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  let userInfo = results[0];
	  if (!userInfo) {
	  	return res.json(mergeRes({
	  		msg: '该账号尚未注册',
				result: false
	  	}));
	  };
	  if (password !== userInfo.password) {
	  	return res.json(mergeRes({
		  	msg: '密码错误，请重试',
		  	result: false
		  }));
	  };
	  return res.json(mergeRes({
	  	msg: '登录成功',
	  	result: true,
	  	token: token.signToken({user}),
	  	data: userInfo
	  }));
	});
});

// 注册
router.post('/register', (req, res, next) => {
	let {
		username,
		password,
		phone,
		email,
		sex,
		remark
	} = req.body;

	let sql01 = `SELECT * FROM user WHERE(username = '${username}' OR phone = '${phone}');`;

	connection.query(sql01, (error, results, fields) => {
	  if (error) throw error;
	  if (results.length !== 0) {
	  	return res.json(mergeRes({
	  		msg: '该账号或手机号已被注册',
				result: false
	  	}));
	  };
	  password = md5(password);
	  let sql02 = `INSERT INTO user (username, password, phone, email, sex, remark) VALUES ('${username}', '${password}', '${phone}', '${email}', '${sex}', '${remark}');`;
	  connection.query(sql02, (error, results, fields) => {
	  	return res.json(mergeRes({
	  		msg: '注册成功',
				result: true
	  	}));
	  });
	});
});

// 获取前端博客
router.post('/getBlogs', (req, res, next) => {
	let { id } = req.body;
 	let sqlId = id ? `WHERE(id = '${id}');` : '';
 	let sql = `SELECT * FROM blogs ${sqlId};`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;
	  return res.json({
	  	data: results,
	  	result: true
	  });
	});
});

module.exports = router;
