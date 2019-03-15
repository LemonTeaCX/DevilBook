import ajax from '../util/ajax';

export const edit = (parms) => ajax({
	url: '/api/edit',
	method: 'post',
	data: parms
});
