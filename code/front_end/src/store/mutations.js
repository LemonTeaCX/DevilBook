import {
	SET_MENU,
	SET_USER_INFO,
	SET_AUTH_LIST,
	SET_ROLE_LIST
} from './mutation-types';

export default {
	[SET_MENU](state, menu) {
		state.menu = menu;
	},
	[SET_USER_INFO](state, userInfo) {
		state.userInfo = userInfo;
	},
	[SET_AUTH_LIST](state, auth) {
		state.authList = auth;
	},
	[SET_ROLE_LIST](state, role) {
		state.roleList = role;
	}
}
