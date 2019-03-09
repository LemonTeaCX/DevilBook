import ajax from '../util/ajax';

export const getMenu = () => ajax({
	url: '/api/getMenu',
	method: 'post',
	loading: true
});

export * from './login';
export * from './register';
export * from './system';
export * from './blogs';
