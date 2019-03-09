export default {
	copyJson(json = {}) {
		return JSON.parse(JSON.stringify(json));
	},
	getCookie(name = '') {
		let cookies = document.cookie.split(';');
		for (let i = cookies.length - 1; i >= 0; i--) {
			let cookie = cookies[i].trim();
    	if (cookie.indexOf(name) === 0)
    		return cookie.substring(name.length + 1, cookie.length);
		}
		return '';
	},
	setCookie(cname, cvalue, exdays) {
		let date = new Date();
	  date.setTime(date.getTime()+(exdays*24*60*60*1000));
	  let expires = 'expires='+date.toGMTString();
	  document.cookie = cname + '=' + cvalue + '; ' + expires;
	}
}
