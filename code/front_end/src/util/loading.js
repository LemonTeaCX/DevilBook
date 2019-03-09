import { Loading } from 'element-ui';

export default class LoadingUtil {
	constructor(options) {
		this.config = Object.assign({
			text: '加载中',
			background: 'rgba(0, 0, 0, 0.8)'
		}, options);

		this.loadingInstance = null;
	}
	startLoading() {
		this.loadingInstance = Loading.service(this.config);
	}
	endLoading() {
		this.loadingInstance && this.loadingInstance.close();
	}
}
