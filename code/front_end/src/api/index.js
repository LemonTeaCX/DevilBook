import ajax from '../util/ajax';

// 获取系统菜单
export const getMenu = () => ajax({
	url: '/api/getMenu',
	method: 'post',
	loading: true
});

// 获取作者信息
export const getAuthorInfo = () => ajax({
  url: '/api/getAuthorInfo',
  method: 'post'
});

// 获取框架信息
export const getFrames = () => ajax({
  url: '/api/getFrames',
  method: 'post'
});

// 获取语言信息
export const getLanguages = () => ajax({
  url: '/api/getLanguages',
  method: 'post'
});

// 获取技能信息
export const getSkills = () => ajax({
  url: '/api/getSkills',
  method: 'post'
});

export * from './login';
export * from './register';
export * from './edit';
export * from './system';
export * from './blogs';
