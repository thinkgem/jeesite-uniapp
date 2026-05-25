<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { login as apiLogin, wxLogin as apiWxLogin, getIndexData, getWxCode } from '@/api/sys/login'
import { useConfig } from '@/hooks/useConfig'
import { useLocaleStore } from '@/store/locale'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import { btoa } from '@/utils/base64'

definePage({
  style: {
    // navigationStyle: 'custom',
    navigationBarTitleText: '%login.title%',
  },
})

// Base64 编码函数（跨平台兼容，支持 Unicode）
function base64Encode(str: string): string {
  // 先进行 UTF-8 编码，然后使用 btoa
  return btoa(unescape(encodeURIComponent(str)))
}

const { t } = useI18n()
const tokenStore = useTokenStore()
const userStore = useUserStore()
const config = useConfig()
const localeStore = useLocaleStore()

// 表单数据
const username = ref('')
const password = ref('admin')
const showPassword = ref(false)
const remember = ref(true)
const isValidCodeLogin = ref(false)
const validCode = ref('')
const imgValidCodeSrc = ref('')
const terms = ref(false)

// 服务器列表
const baseUrlList = config.baseUrlList
const baseUrlValue = ref(config.currentServerIndex.toString())

/**
 * 初始化账号
 */
function initAccount() {
  const currentBaseUrl = config.getBaseUrl()
  if (currentBaseUrl.includes('jeesite.com')) {
    username.value = 'user1'
  }
  else {
    username.value = 'system'
  }
}

/**
 * 切换密码显示
 */
function togglePassword() {
  showPassword.value = !showPassword.value
}

/**
 * 刷新验证码
 */
async function refreshValidCode() {
  try {
    // loginCheck=true 仅用于检查登录状态,不会触发跳转
    const res: any = await getIndexData({ loginCheck: true })
    // 从响应数据中获取 sessionid
    const sessionId = res?.sessionid || ''
    imgValidCodeSrc.value = `${config.getBaseUrl()}/validCode?__sid=${sessionId}&t=${new Date().getTime()}`
    validCode.value = ''
  }
  catch (error) {
    console.error('获取验证码失败:', error)
  }
}

/**
 * 提交登录
 */
async function submit() {
  if (!username.value) {
    uni.showToast({ title: t('login.pleaseEnterAccount'), icon: 'none' })
    return
  }
  if (!password.value) {
    uni.showToast({ title: t('login.pleaseEnterPassword'), icon: 'none' })
    return
  }
  if (!terms.value) {
    uni.showToast({ title: t('comment.readPrivacy'), icon: 'none' })
    return
  }

  try {
    const res: any = await apiLogin({
      username: base64Encode(username.value),
      password: base64Encode(password.value),
      validCode: base64Encode(validCode.value),
      param_deviceType: 'mobileApp',
      param_remember: remember.value,
    })

    uni.showToast({ title: res.message || t('login.serverNotConnected'), icon: 'none' })

    if (res.result === 'true') {
      login(res)
    }

    if (res.isValidCodeLogin) {
      isValidCodeLogin.value = true
      refreshValidCode()
    }
  }
  catch (error: any) {
    console.error('登录失败:', error)
    // 显示错误信息给用户
    const errorMsg = error?.message || error?.msg || error?.data?.message || error?.data?.msg || t('login.loginFailed')
    uni.showToast({ title: errorMsg, icon: 'none' })
  }
}

function login(res: any) {
  // 保存完整的登录响应信息
  userStore.setLoginInfo(res)

  // 保存 token（JeeSite4 使用 sessionid 作为 token）
  const sessionId = (res as any).sessionid
  if (sessionId) {
    // JeeSite4 是单 token 模式
    tokenStore.setTokenInfo({
      token: sessionId,
      expiresIn: 3600, // 默认 1 小时
    })
  }

  setTimeout(() => {
    uni.reLaunch({ url: '/pages/sys/home/index' })
  }, 500)
}

/**
 * 切换服务器
 */
function updateBaseUrl() {
  const index = Number(baseUrlValue.value)
  config.setCurrentServer(index)
  uni.showToast({ title: t('login.switchSuccess'), icon: 'success' })
  initAccount()
}

// 页面加载时检查是否已登录
onMounted(async () => {
  try {
    const res = await getIndexData({ loginCheck: true })
    if (res && (res as any).result && (res as any).result !== 'login') {
      uni.showToast({ title: t('login.alreadyLoggedIn'), icon: 'success' })
      login(res)
    }
  }
  catch (error) {
    // 未登录，继续显示登录页
  }

  // 设置当前服务器值
  baseUrlValue.value = config.currentServerIndex.toString()
  initAccount()
})

/**
 * 微信登录
 */
async function wxLogin() {
  try {
    // #ifdef MP-WEIXIN
    uni.showLoading({ title: '专业版中实现...' })
    // #endif

    // #ifndef MP-WEIXIN
    uni.showToast({ title: t('login.wechatLoginInMiniProgram'), icon: 'none' })
    // #endif
  }
  catch (error: any) {
    uni.hideLoading()
    console.error('微信登录失败:', error)
    const errorMsg = error?.message || error?.msg || t('login.wechatLoginFailed')
    uni.showToast({ title: errorMsg, icon: 'none' })
  }
}

/**
 * QQ 登录（暂时保留为空）
 */
function qqLogin() {
  uni.showToast({ title: t('login.qqLogin'), icon: 'none' })
}
</script>

<template>
  <view class="wrap">
    <!-- 语言切换 -->
    <view class="lang-switch">
      <js-lang />
    </view>

    <!-- Logo -->
    <view class="logo">
      <image src="/static/jeesite/logo200.png" mode="aspectFit" />
    </view>

    <!-- 表单 -->
    <view class="list">
      <!-- 账号 -->
      <view class="list-call">
        <js-icon icon="i-carbon-user" :size="20" />
        <input
          v-model="username"
          class="u-input"
          type="text"
          :maxlength="32"
          :placeholder="t('login.placeholderAccount')"
        >
      </view>

      <!-- 密码 -->
      <view class="list-call">
        <js-icon icon="i-carbon-password" :size="20" />
        <input
          v-model="password"
          class="u-input"
          type="text"
          :maxlength="32"
          :placeholder="t('login.placeholderPassword')"
          :password="!showPassword"
        >
        <image
          class="u-icon-right"
          :src="`/static/jeesite/login/eye_${showPassword ? 'open' : 'close'}.png`"
          @click="togglePassword"
        />
      </view>

      <!-- 验证码 -->
      <view v-if="isValidCodeLogin" class="list-call">
        <js-icon icon="i-carbon-security" :size="20" />
        <input
          v-model="validCode"
          class="u-input"
          type="text"
          :maxlength="4"
          placeholder="验证码"
        >
        <image
          class="img-valid-code"
          :src="imgValidCodeSrc"
          mode="aspectFit"
          @click="refreshValidCode"
        />
      </view>

      <!-- 服务器选择 -->
      <view class="list-call base-url">
        <js-icon icon="i-carbon-settings" :size="20" />
        <js-select
          v-model="baseUrlValue"
          class="u-input base-url-select"
          :options="baseUrlList"
          :field-names="{ label: 'name', value: 'value' }"
          placeholder="快速切换服务器地址"
          @confirm="updateBaseUrl"
        />
      </view>
    </view>

    <!-- 自动登录 -->
    <view class="remember">
      <wd-checkbox v-model="remember" shape="square">
        {{ t('login.autoLogin') }}
      </wd-checkbox>
    </view>

    <!-- 协议 -->
    <view class="agreement">
      <wd-checkbox v-model="terms" shape="square">
        {{ t('comment.agreeTerms') }} &nbsp;
      </wd-checkbox>
      <navigator url="/pages/sys/login/terms" open-type="navigate">
        {{ t('comment.privacyPolicy') }}
      </navigator>
    </view>

    <!-- 登录按钮 -->
    <view class="button" hover-class="button-hover" @click="submit">
      <text>{{ t('login.loginButton') }}</text>
    </view>

    <!-- 底部链接 -->
    <view class="footer">
      <navigator url="/pages/sys/login/forget" open-type="navigate">
        {{ t('login.forget') }}
      </navigator>
      <text>|</text>
      <navigator url="/pages/sys/login/register" open-type="navigate">
        {{ t('login.reg') }}
      </navigator>
    </view>

    <!-- OAuth2 登录 -->
    <view class="oauth2">
      <view @click="wxLogin">
        <js-icon icon="i-ri:wechat-fill" :size="60" color="#00d969" />
      </view>
      <view @click="qqLogin">
        <js-icon icon="i-ri:qq-line" :size="60" color="#4fa1e8" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
  padding: 0 20rpx;
  min-height: 100vh;
  background: #fff;
}

.lang-switch {
  text-align: right;
  padding: 20rpx;
}

.logo {
  width: 230rpx;
  height: 230rpx;
  background: #1790ff;
  box-shadow: 0rpx 5rpx 20rpx 5rpx rgba(45, 127, 235, 0.5);
  border-radius: 50%;
  margin: 70rpx auto 10rpx auto;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    // width: 200rpx;
    // height: 200rpx;
    border-radius: 50%;
  }
}

.list {
  margin-top: 40rpx;
}

.list-call {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;

  .u-input {
    flex: 1;
    margin-left: 20rpx;
  }

  .u-icon-right {
    width: 40rpx;
    height: 40rpx;
  }

  .img-valid-code {
    width: 200rpx;
    height: 50rpx;
    margin-left: 20rpx;
  }
}

.base-url-select {
  flex: 1;
}

.remember {
  margin-top: 20rpx;
  padding: 0 20rpx;
}

.agreement {
  display: flex;
  flex-direction: row;
  // align-items: center;
  // justify-content: center;
  color: #666;
  margin-top: 20rpx;
  padding: 0 20rpx;

  navigator {
    color: #46afff;
  }
}

.button {
  margin: 50rpx auto 0;
  width: 600rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background: linear-gradient(to right, #46afff, #69cbff);
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;

  &-hover {
    opacity: 0.8;
  }
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
  font-size: 28rpx;
  margin-top: 50rpx;

  text {
    font-size: 24rpx;
    margin-left: 25rpx;
    margin-right: 25rpx;
  }
}

.oauth2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 40rpx 100rpx;
}
</style>
