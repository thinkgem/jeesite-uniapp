<template>
	<view class="wrap">
		<js-lang title="login.title" :showBtn="true"></js-lang>
		<view class="logo"><image src="/static/jeesite/logo200.png"></image></view>
		<view class="list">
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="account"></u-icon>
				<input class="u-input" type="text" v-model="username" maxlength="32" :placeholder="$t('login.placeholderAccount')" />
				<u-checkbox v-model="remember" active-color="#69cbff">{{$t('login.autoLogin')}}</u-checkbox>
			</view>
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="lock"></u-icon>
				<input class="u-input" type="text" v-model="password" maxlength="32" :placeholder="$t('login.placeholderPassword')" :password="!showPassword" />
				<image class="u-icon-right" :src="'/static/jeesite/login/eye_' + (showPassword ? 'open' : 'close') + '.png'" @click="showPass()"></image>
			</view>
			<view class="list-call" v-if="isValidCodeLogin">
				<u-icon class="u-icon" size="40" name="coupon"></u-icon>
				<input class="u-input" type="text" v-model="validCode" maxlength="4" placeholder="验证码" />
				<u-image class="img-valid-code" width="300rpx" height="90rpx" :src="imgValidCodeSrc" @click="refreshImgValidCode()"></u-image>
			</view>
			<view class="list-call base-url">
				<u-icon class="u-icon" size="40" name="setting" style="padding-right:15rpx;"></u-icon>
				<js-select v-model="baseUrlValue" :items="baseUrlList" placeholder="快速切换服务器地址" @confirm="updateBaseUrl"></js-select>
			</view>
		</view>
		<view class="button" hover-class="button-hover" @click="submit()"><text>{{$t('login.loginButton')}}</text></view>
		<view class="footer">
			<navigator url="forget" open-type="navigate">{{$t('login.forget')}}</navigator>
			<text>|</text>
			<navigator url="reg" open-type="navigate">{{$t('login.reg')}}</navigator>
		</view>
		<view class="oauth2">
			<u-icon class="u-icon" size="120" color="#00d969" name="weixin-circle-fill" @click="wxLogin"></u-icon>
			<u-icon class="u-icon" size="120" color="#4fa1e8" name="qq-circle-fill" @click="qqLogin"></u-icon>
		</view>
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
			showPassword: false,
			remember: true,
			isValidCodeLogin: false,
			validCode: '',
			imgValidCodeSrc: null,
			baseUrlList: config.baseUrlList,
			baseUrlValue: ''
		};
	},
	onLoad() {
		this.$u.api.index({loginCheck: true}).then(res => {
			if (typeof res === 'object' && res.result && res.result !== 'login'){
				uni.reLaunch({
					url: '/pages/sys/home/index'
				});
			}
		});
		this.baseUrlList.forEach(item => {
			if (item.baseUrl == this.vuex_baseUrl){
				this.baseUrlValue = item.value;
				return;
			}
		});
		this.initAccount();
	},
	methods: {
		initAccount() {
			if (this.vuex_baseUrl.indexOf('jeesite.com') != -1){
				this.username = 'user1';
			} else if (this.username == 'user1') {
				this.username = 'system';
			}
			if (this.password == '') {
				this.password = 'admin';
			}
		},
		showPass() {
			this.showPassword = !this.showPassword;
		},
		refreshImgValidCode(e) {
			if (this.vuex_token == '') {
				this.$u.api.index().then(res => {
					this.imgValidCodeSrc = this.vuex_baseUrl + '/validCode?__sid='
						+ res.sessionid + '&t=' + new Date().getTime();
				});
			} else {
				this.imgValidCodeSrc = this.vuex_baseUrl + '/validCode?__sid='
						+ this.vuex_token + '&t=' + new Date().getTime();
			}
			this.validCode = '';
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
			this.$u.api.login({
				username: base64.btoa(this.username),
				password: base64.btoa(this.password),
				validCode: base64.btoa(this.validCode),
				param_deviceType: 'mobileApp',
				param_remember: this.remember
			})
			.then(res => {
				this.$u.toast(res.message || '未连接服务器');
				if (res.result == 'true') {
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/sys/home/index'
						});
					}, 500);
				}
				if (res.isValidCodeLogin){
					this.isValidCodeLogin = true;
					this.refreshImgValidCode();
				}
			});
		},
		wxLogin(res) {
			this.$u.toast('微信登录');
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(wxRes) {
					uni.showLoading('正在登录中...');
					console.error(wxRes);
					// 获取登录的token
					uni.setData('weixinToken', wxRes.code);
					// 获取登录的unionid 这个还是在开放平台做了 公众号 小程序 微信登录app关联才会有
					uni.setData('unionid', wxRes.authResult.unionid);
					// 获取openid
					uni.setData('weixinOpenid', wxRes.authResult.openid);
					// 这里吧数据全部提交给后台核验，有没有注册 注册了 后台代码会请求接口
					// String s = HttpClient.doGet("https://api.weixin.qq.com/sns/userinfo?access_token="
					//  + loginInfo.getToken() + "&openid=" + loginInfo.getOpenid()); 获取头像和昵称
					that.$u.postJson('/user/loginApp', {
						token: wxRes.authResult.access_token,
						unionid: wxRes.authResult.unionid,
						openid: wxRes.authResult.openid
					})
					.then(res => {
						if (res.status === 0) {
							// 绑定手机号直接登录
							that.getUserInfo(res.data.userId, res.data.uuid);
						} else {
							// 没有绑定手机号让绑定手机号
							uni.navigateTo({
								url: '/pages/public/wxmobile'
							});
						}
					});
				}
			});
		},
		qqLogin() {
			this.$u.toast('QQ 登录');
		},
		updateBaseUrl() {
			this.baseUrlList.forEach(item => {
				if (item.value == this.baseUrlValue){
					this.$u.vuex('vuex_baseUrl', item.baseUrl);
					this.$u.http.setConfig({ baseUrl: item.baseUrl });
					this.$u.toast('切换成功！');
					this.initAccount();
					return;
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
