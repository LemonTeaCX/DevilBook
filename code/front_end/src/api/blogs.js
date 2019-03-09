import ajax from '../util/ajax';

export const getBlogs = (parms) => ajax({
	url: '/api/getBlogs',
	method: 'post',
	data: parms
});
