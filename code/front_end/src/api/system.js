import ajax from '../util/ajax';

// 获取所有权限
export const getAuth = () => ajax({
	url: '/api/getAuth'
});

// 获取所有角色
export const getRole = () => ajax({
	url: '/api/getRole'
});

// 获取所有账号列表
export const getAccountList = (parms) => ajax({
	url: '/api/getAccountList',
	method: 'post',
	data: parms
});

// 获取账号详情
export const getAccountDetail = (parms) => ajax({
	url: '/api/getAccountDetail',
	method: 'post',
	data: parms,
	loading: true
});

// 添加账号
export const addAccount = (parms) => ajax({
	url: '/api/addAccount',
	method: 'post',
	data: parms,
	loading: true
});

// 编辑账号
export const editAccount = (parms) => ajax({
	url: '/api/editAccount',
	method: 'post',
	data: parms,
	loading: true
});

// 删除账号
export const delAccount = (parms) => ajax({
	url: '/api/delAccount',
	method: 'post',
	data: parms,
	loading: true
});

// 获取菜单列表
export const getMenuList = () => ajax({
	url: '/api/getMenuList',
	method: 'post',
	loading: true
});
