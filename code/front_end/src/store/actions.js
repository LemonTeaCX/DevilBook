import {
	SET_MENU,
	SET_USER_INFO,
	SET_AUTH_LIST,
	SET_ROLE_LIST
} from './mutation-types';

import {
	getMenu,
	getAuth,
	getRole
} from '../api'

export default {
	async setMenu({commit}) {
		const result = await getMenu();
		commit(SET_MENU, result.data);
	},
	setUserInfo({commit}, userInfo) {
		window.localStorage.setItem('userInfo', JSON.stringify(userInfo) || '');
		commit(SET_USER_INFO, userInfo);
	},
	async setAuthList({commit}) {
		const result = await getAuth();
		commit(SET_AUTH_LIST, result.data);
	},
	async setRoleList({commit}) {
		const result = await getRole();
		commit(SET_ROLE_LIST, result.data);
	},
}
