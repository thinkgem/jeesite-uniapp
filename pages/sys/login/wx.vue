<template>
	<view class="wrap">
		<js-lang title="login.title" :showBtn="true"></js-lang>
		<view class="logo"><image src="/static/jeesite/logo200.png"></image></view>
		<view class="list">
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="account"></u-icon>
				<input class="u-input" type="text" v-model="username" maxlength="32" :placeholder="$t('login.placeholderAccount')" />
			</view>
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="lock"></u-icon>
				<input class="u-input" type="text" v-model="password" maxlength="32" :placeholder="$t('login.placeholderPassword')" :password="!showPassword" />
				<image class="u-icon-right" :src="'/static/jeesite/login/eye_' + (showPassword ? 'open' : 'close') + '.png'" @click="showPass()"></image>
			</view>
		</view>
		<view class="button" hover-class="button-hover" @click="submit()"><text>绑定微信</text></view>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
import base64 from '@/common/base64.js';
import config from '@/common/config.js';
export default {
	data() {
		return {
			username: '',
			password: '',
			showPassword: false
		};
	},
	onLoad() {
		if (!this.vuex_wxSessionKey || this.vuex_wxSessionKey == '') {
			this.$u.toast('请先在登录页，点击微信登录图标后再试！');
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/sys/login/index'
				});
			}, 500);
			return;
		};
		this.initAccount();
	},
	methods: {
		initAccount() {
			if (this.vuex_baseUrl.indexOf('jeesite.com') != -1){
				this.username = 'user1';
			} else {
				this.username = 'system';
			}
			if (this.password == '') {
				this.password = 'admin';
			}
		},
		showPass() {
			this.showPassword = !this.showPassword;
		},
		submit() {
			if (this.username.length == 0) {
				this.$u.toast('请输入账号');
				return;
			}
			if (this.password.length == 0) {
				this.$u.toast('请输入密码');
				return;
			}
			let self = this;
			self.$u.get('/wx/ma/user/default/bind', {
				username: this.username,
				password: this.password
			})
			.then(res => {
				if (res.result == 'true') {
					uni.showModal({
						title: '提示',
						content: res.message + '请再次点击微信图标登录系统',
						showCancel: false,
						success: function (res2) {
							uni.reLaunch({
								url: '/pages/sys/login/index'
							});
						}
					});
				} else {
					this.$u.toast(res.message || '未连接服务器');
				}
			});
		}
	}
};
</script>
<style lang="scss">
@import 'index.scss';

.logo {
	width: 260rpx;
	height: 260rpx;
	background: rgba(59, 121, 235, 1);
	box-shadow: 0rpx 5rpx 20rpx 5rpx rgba(45, 127, 235, 0.5);
	border-radius: 50%;
	margin: 70rpx auto 10rpx auto;
}

.logo image {
	width: 260rpx;
	height: 260rpx;
	border-radius: 50%;
}

.base-url js-select {
	width: 100%;
}

.button {
	margin: 30rpx auto 0;
}

.footer {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #46afff;
	height: 40rpx;
	line-height: 40rpx;
	font-size: 35rpx;
	margin-top: 60rpx;
}

.footer text {
	font-size: 30rpx;
	margin-left: 25rpx;
	margin-right: 25rpx;
}

.oauth2 {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 55rpx 100rpx;

	image {
		height: 100rpx;
		width: 100rpx;
	}
}
</style>
