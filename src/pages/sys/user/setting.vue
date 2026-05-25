<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTokenStore } from '@/store/token'

defineOptions({
  name: 'UserSetting',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%setting.title%',
  },
})

// 消息提醒开关
const message = ref(true)
const messageBar = ref(true)
const soundAndVibration = ref(true)
const upgrade = ref(true)

/**
 * 加载本地存储的设置
 */
function loadSettings() {
  try {
    const settings = uni.getStorageSync('userSettings')
    if (settings) {
      message.value = settings.message ?? true
      messageBar.value = settings.messageBar ?? true
      soundAndVibration.value = settings.soundAndVibration ?? true
      upgrade.value = settings.upgrade ?? true
    }
  }
  catch (error) {
    console.error('加载设置失败:', error)
  }
}

/**
 * 保存设置到本地存储
 */
function saveSettings() {
  try {
    uni.setStorageSync('userSettings', {
      message: message.value,
      messageBar: messageBar.value,
      soundAndVibration: soundAndVibration.value,
      upgrade: upgrade.value,
    })
  }
  catch (error) {
    console.error('保存设置失败:', error)
  }
}

/**
 * 打开系统设置（仅 APP）
 */
function openSettings() {
  // #ifdef APP-PLUS
  uni.getSystemInfo({
    success(res) {
      if (res.platform === 'ios') {
        plus.runtime.openURL('app-settings://')
      }
      else if (res.platform === 'android') {
        const main = plus.android.runtimeMainActivity() as any
        const Intent = plus.android.importClass('android.content.Intent') as any
        const mIntent = new Intent('android.settings.SOUND_SETTINGS')
        main.startActivity(mIntent)
      }
    },
  })
  // #endif
  // #ifndef APP-PLUS
  uni.showToast({
    title: '小程序端或H5端无法打开系统设置',
    icon: 'none',
  })
  // #endif
}

/**
 * 退出登录
 */
function handleLogout() {
  uni.showModal({
    title: t('setting.logout'),
    content: t('setting.logoutConfirm'),
    success: async (res) => {
      if (res.confirm) {
        try {
          const tokenStore = useTokenStore()
          await tokenStore.logout()
        }
        catch (e) {
          // 忽略错误
        }
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/sys/login/index',
          })
        }, 500)
      }
    },
  })
}

// 组件挂载时加载设置
onMounted(() => {
  loadSettings()
})
</script>

<template>
  <view class="wrap setting">
    <!-- 消息提醒 -->
    <wd-cell-group :border="true" :title="$t('setting.messageReminder')">
      <wd-cell :label="$t('setting.acceptMessage')">
        <wd-switch v-model="message" @change="saveSettings" />
      </wd-cell>
      <wd-cell :title="$t('setting.notificationBar')" :label="$t('setting.notificationBarDesc')">
        <wd-switch v-model="messageBar" @change="saveSettings" />
      </wd-cell>
    </wd-cell-group>

    <!-- 声音与振动 -->
    <wd-cell-group :border="true" :title="$t('setting.soundAndVibration')">
      <wd-cell :title="$t('setting.playSound')" :label="$t('setting.playSoundDesc')">
        <wd-switch v-model="soundAndVibration" @change="saveSettings" />
      </wd-cell>
    </wd-cell-group>

    <!-- 软件更新提醒 -->
    <wd-cell-group :border="true" :title="$t('setting.softwareUpdate')">
      <wd-cell :title="$t('setting.softwareUpdate')" :label="$t('setting.softwareUpdateDesc')">
        <wd-switch v-model="upgrade" @change="saveSettings" />
      </wd-cell>
    </wd-cell-group>

    <!-- 退出登录按钮 -->
    <view class="u-m-40">
      <wd-button type="primary" block @click="handleLogout">
        {{ $t('setting.logout') }}
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.u-m-40 {
  margin: 40rpx;
}
</style>
