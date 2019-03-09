import ajax from '../util/ajax';

export const login = (parms) => ajax({
	url: '/api/login',
	method: 'post',
	data: parms
});
