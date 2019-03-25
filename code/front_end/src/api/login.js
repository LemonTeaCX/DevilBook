import ajax from '../util/ajax';

// 获取登录页网站描述信息
export const getDescText = () => ajax({
  url: '/api/getDescText',
  method: 'get'
});

// 登录
export const login = (parms) => ajax({
	url: '/api/login',
	method: 'post',
	data: parms
});
