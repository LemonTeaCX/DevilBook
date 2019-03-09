export default {
	// 校验手机号
	isPhone(rule, value, callback) {
		if (!value) return callback(new Error('手机号为空'));
		
		const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;

		if (!reg.test(value)) return callback(new Error('请输入正确的手机号2'));
    
    callback();
	}
}
