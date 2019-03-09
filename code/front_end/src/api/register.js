import ajax from '../util/ajax';

export const register = (parms) => ajax({
	url: '/api/register',
	method: 'post',
	data: parms
});
