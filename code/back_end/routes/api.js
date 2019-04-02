const express = require('express');
const router = express.Router();
const connection = require('../db/db');
const Util = require('../util/util');
const md5 = require("blueimp-md5");
const token = require('../util/token');
const admins = ['lemon'];
const vaildAdmin = (tokenStr) => {
	let user = token.verifyToken(tokenStr).user || '';
	return admins.indexOf(user) !== -1;
};

const {
	copyJson, 
	treeMenu
} = Util;

let resWrap = {
  "data": {},
	"msg": "",
	"result": false
};
const mergeRes = (json, ...moreJson) => {
	return Object.assign(copyJson(resWrap), json, ...moreJson);
};

router.get('/', (req, res, next) => {
	res.send('api');
	return;
});

// 获取登录页网站描述信息
router.get('/getDescText', (req, res, next) => {
	let sql = `SELECT * FROM texts WHERE(id = 1);`;

	connection.query(sql, (error, results, fields) => {
		if (error) throw error;

		return res.json(mergeRes({
			data: results[0],
			result: true
		}));
	});
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

// 获取作者信息
router.post('/getAuthorInfo', (req, res, next) => {
	let sqlAuthor = `SELECT * FROM author;`,
		sqlEducations = `SELECT * FROM educations;`,
		sqlExperiences = `SELECT * FROM experiences;`;

	connection.query(sqlAuthor + sqlEducations + sqlExperiences, (error, results, fields) => {
		if (error) throw error;

		let data = results[0] && results[0][0] ? results[0][0] : {};
		data.educations = results[1] || [];
		data.experiences = results[2] || [];
		return res.json(mergeRes({
			result: true,
			data: data
		}));
	});
});

// 获取框架信息
router.post('/getFrames', (req, res, next) => {
	let sql = `SELECT * FROM frames;`;

	connection.query(sql, (error, results, fields) => {
		if (error) throw error;

		return res.json(mergeRes({
			result: true,
			data: results
		}));
	});
});

// 获取语言信息
router.post('/getLanguages', (req, res, next) => {
	let sql = `SELECT * FROM languages;`;

	connection.query(sql, (error, results, fields) => {
		if (error) throw error;

		return res.json(mergeRes({
			result: true,
			data: results
		}));
	});
});

// 获取技能信息
router.post('/getSkills', (req, res, next) => {
	let sql = `SELECT * FROM skills;`;

	connection.query(sql, (error, results, fields) => {
		if (error) throw error;

		return res.json(mergeRes({
			result: true,
			data: results
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

// 获取菜单列表
router.post('/getMenuList', (req, res, next) => {
 	let sql = `SELECT * FROM menu;`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	result: true,
	  	data: results
	  }));
	});
});

// 编辑菜单
router.post('/editMenu', (req, res, next) => {
	if (!vaildAdmin(req.get('Auth-Token') || '')) {
		return res.json(mergeRes({
			result: false,
			msg: '该账号无权限编辑菜单'
		}));
	}

	let menus = req.body;
	let sqlValues = [];
	menus.forEach(item => {
		sqlValues.push(`(${item.id}, ${item.parent_id}, '${item.menu}', '${item.icon}', '${item.path}')`);
	});
 	let sqlDel = `DELETE FROM menu;`;
 	let sqlAdd = `INSERT INTO menu (id, parent_id, menu, icon, path) VALUES ${sqlValues.join(',')};`;

	connection.query(sqlDel + sqlAdd, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	result: true,
	  	msg: '更新系统菜单成功,刷新页面可看到效果'
	  }));
	});
});

// 删除菜单
router.post('/delMenu', (req, res, next) => {
	if (!vaildAdmin(req.get('Auth-Token') || '')) {
		return res.json(mergeRes({
			result: false,
			msg: '该账号无权限删除菜单'
		}));
	}

	let { ids } = req.body;
	ids = ids.join(',');
 	let sql = `DELETE FROM menu WHERE(id in (${ids}));`;
	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;

	  return res.json(mergeRes({
	  	msg: '删除菜单成功',
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
	  delete userInfo.password;
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

// 修改信息
router.post('/edit', (req, res, next) => {
	let {
		id,
		originalPassword,
		password,
		phone,
		email,
		sex,
		remark
	} = req.body;

	originalPassword = md5(originalPassword);
	password = md5(password);

	let sql01 = `SELECT * FROM user WHERE(id = ${id});`;

	connection.query(sql01, (error, results, fields) => {
	  if (error) throw error;

	  if (originalPassword !== results[0].password) {
	  	return res.json(mergeRes({
	  		msg: '原密码错误，请重新输入',
				result: false
	  	}));
	  };

	  let sql02 = `UPDATE user SET password='${password}', phone='${phone}', email='${email}', sex=${sex}, remark='${remark}';`;
	  connection.query(sql02, (error, results, fields) => {
	  	return res.json(mergeRes({
	  		msg: '修改信息成功',
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

// 获取前端组件
router.post('/getComps', (req, res, next) => {
	let { id } = req.body;
 	let sqlId = id ? `WHERE(id = '${id}');` : '';
 	let sql = `SELECT * FROM comps ${sqlId};`;

	connection.query(sql, (error, results, fields) => {
	  if (error) throw error;
	  return res.json({
	  	data: results,
	  	result: true
	  });
	});
});

module.exports = router;
