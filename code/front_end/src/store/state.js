export default {
	menu: [],
	userInfo: window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {},
	authList: [],
	roleList: []
}
