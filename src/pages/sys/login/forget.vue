<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getFpValidCode, getIndexData, savePwdByValidCode } from '@/api/sys/login'
import { useConfig } from '@/hooks/useConfig'

defineOptions({
  name: 'AuthForget',
})

definePage({
  style: {
    navigationBarTitleText: '%login.forgetPassword%',
  },
})

const config = useConfig()

// 表单数据
const loginCode = ref('')
const password = ref('')
const validCode = ref('')
const fpValidCode = ref('')
const showPassword = ref(false)
const imgValidCodeSrc = ref('')
const tips = ref('获取验证码')
const seconds = ref(60)

/**
 * 显示/隐藏密码
 */
function showPass() {
  showPassword.value = !showPassword.value
}

/**
 * 刷新图片验证码
 */
async function refreshImgValidCode() {
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
 * 验证码倒计时变化
 */
function codeChange(text: string) {
  tips.value = text
}

/**
 * 表单验证
 */
function formValid(): boolean {
  if (loginCode.value.length === 0) {
    uni.showToast({ title: '请输入账号', icon: 'none' })
    return false
  }
  if (password.value.length === 0) {
    uni.showToast({ title: '请输入新密码', icon: 'none' })
    return false
  }
  if (validCode.value.length === 0) {
    uni.showToast({ title: '请输入图片验证码', icon: 'none' })
    return false
  }
  return true
}

/**
 * 获取手机验证码
 */
async function getValidCodeHandler() {
  if (!formValid()) {
    return
  }

  try {
    // 验证图片验证码
    const res = await getFpValidCode({
      loginCode: loginCode.value,
      validCode: validCode.value,
      validType: 'mobile',
    })

    uni.showToast({
      title: (res as any).message || '验证码已发送',
      icon: 'none',
      duration: 3000,
    })

    if ((res as any).result === 'false') {
      refreshImgValidCode()
    }
    else {
      // 启动倒计时
      tips.value = `${seconds.value}s后重新获取`
      const timer = setInterval(() => {
        seconds.value--
        tips.value = `${seconds.value}s后重新获取`
        if (seconds.value <= 0) {
          clearInterval(timer)
          tips.value = '重新获取'
          seconds.value = 60
        }
      }, 1000)
    }
  }
  catch (error) {
    console.error('获取验证码失败:', error)
  }
}

/**
 * 提交修改密码
 */
async function submit() {
  if (!formValid()) {
    return
  }

  if (fpValidCode.value.length === 0) {
    uni.showToast({ title: '请输入手机验证码', icon: 'none' })
    return
  }

  try {
    const res = await savePwdByValidCode({
      loginCode: loginCode.value,
      fpValidCode: fpValidCode.value,
      password: password.value,
    })

    uni.showModal({
      title: '提示',
      content: (res as any).message,
      showCancel: false,
      success: () => {
        if ((res as any).result === 'true') {
          uni.reLaunch({
            url: '/pages/sys/login/index',
          })
        }
      },
    })
  }
  catch (error) {
    console.error('修改密码失败:', error)
  }
}

/**
 * 页面加载
 */
onMounted(() => {
  refreshImgValidCode()
})
</script>

<template>
  <view class="wrap">
    <!-- 表单 -->
    <view class="list">
      <!-- 账号 -->
      <view class="list-call">
        <js-icon icon="i-carbon-user" :size="24" />
        <input
          v-model="loginCode"
          class="u-input"
          type="text"
          :maxlength="32"
          placeholder="请输入账号"
        >
      </view>

      <!-- 新密码 -->
      <view class="list-call">
        <js-icon icon="i-carbon-password" :size="24" />
        <input
          v-model="password"
          class="u-input"
          type="text"
          :maxlength="32"
          placeholder="请输入新密码"
          :password="!showPassword"
        >
        <image
          class="u-icon-right"
          :src="`/static/jeesite/login/eye_${showPassword ? 'open' : 'close'}.png`"
          @click="showPass"
        />
      </view>

      <!-- 图片验证码 -->
      <view class="list-call">
        <js-icon icon="i-carbon-bookmark" :size="24" />
        <input
          v-model="validCode"
          class="u-input"
          type="text"
          :maxlength="4"
          placeholder="图片验证码"
        >
        <image
          class="img-valid-code"
          mode="aspectFit"
          :src="imgValidCodeSrc"
          @click="refreshImgValidCode"
        />
      </view>

      <!-- 手机验证码 -->
      <view class="list-call">
        <js-icon icon="i-carbon-security" :size="24" />
        <input
          v-model="fpValidCode"
          class="u-input"
          type="text"
          :maxlength="6"
          placeholder="手机验证码"
        >
        <view
          class="btn-valid-code"
          :class="{ 'btn-valid-codes': tips !== '获取验证码' && tips !== '重新获取' }"
          hover-class="btn-valid-code-hover"
          @click="getValidCodeHandler"
        >
          {{ tips }}
        </view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="button" hover-class="button-hover" @click="submit">
      <text>修改密码</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
