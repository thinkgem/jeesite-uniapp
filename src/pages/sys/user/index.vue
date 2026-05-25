<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfig } from '@/hooks/useConfig'
import { LOGIN_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'UserCenter',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%user.center%',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
const config = useConfig()

// 使用 storeToRefs 保持响应式
const { userInfo } = storeToRefs(userStore)

// 头像 URL
const avatarUrl = computed(() => {
  let url = userInfo.value?.avatarUrl || userInfo.value?.avatar || '/static/images/user1.jpg'

  // 如果包含 /ctxPath/，替换为当前服务器地址
  if (url.includes('/ctxPath/')) {
    const baseUrl = config.getBaseUrl()
    url = url.replace('/ctxPath/', `${baseUrl}/`)
  }

  return `${url}?t=${new Date().getTime()}`
})

// 是否已登录
const isLoggedIn = computed(() => tokenStore.hasLogin)

/**
 * 导航到指定页面
 */
function navTo(url: string) {
  // 检查登录状态
  if (!isLoggedIn.value) {
    uni.showToast({
      title: t('user.pleaseLogin'),
      icon: 'none',
    })
    setTimeout(() => {
      uni.navigateTo({
        url: LOGIN_PAGE,
      })
    }, 1000)
    return
  }

  uni.navigateTo({
    url: `/pages/sys/user/${url}`,
  })
}

/**
 * 跳转到登录页
 */
function goToLogin() {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
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
          await tokenStore.logout()
          uni.showToast({
            title: t('setting.logout'),
            icon: 'success',
          })
          // 延迟跳转到登录页
          setTimeout(() => {
            uni.reLaunch({
              url: LOGIN_PAGE,
            })
          }, 500)
        }
        catch (error) {
          console.error('退出登录失败:', error)
          uni.showToast({
            title: t('setting.logout'),
            icon: 'error',
          })
        }
      }
    },
  })
}

/**
 * 检查更新(仅 APP)
 */
function upgrade() {
  // #ifdef APP-PLUS
  uni.showToast({
    title: t('user.checkUpdateWait'),
    icon: 'none',
  })
  // #endif
  // #ifndef APP-PLUS
  uni.showToast({
    title: t('user.noNeedCheckUpdate'),
    icon: 'none',
  })
  // #endif
}
</script>

<template>
  <view class="wrap">
    <!-- 头部信息 -->
    <view class="header">
      <!-- 已登录状态 -->
      <view v-if="isLoggedIn" class="userinfo">
        <view class="image" @click="navTo('info')">
          <image :src="avatarUrl" mode="aspectFill" />
        </view>
        <view class="info">
          <view class="username">
            {{ userInfo?.userName || '用户' }}
          </view>
          <view class="usercode">
            {{ userInfo?.loginCode || '' }}
          </view>
        </view>
      </view>

      <!-- 未登录状态 -->
      <view v-else class="userinfo">
        <view class="image">
          <image src="/static/images/user1.jpg" mode="aspectFill" />
        </view>
        <view class="info">
          <view class="username">
            {{ $t('user.clickToLogin') }}
          </view>
          <view class="usercode">
            {{ $t('user.loginForMoreServices') }}
          </view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="logout">
        <wd-button v-if="isLoggedIn" size="small" type="success" round @click="handleLogout">
          {{ $t('user.logout') }}
        </wd-button>
        <wd-button v-else size="small" type="primary" round @click="goToLogin">
          {{ $t('user.login') }}
        </wd-button>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="pb-3 pt-1">
      <view class="mt-3">
        <wd-cell-group :border="true">
          <wd-cell
            is-link
            @click="navTo('info')"
          >
            <template #title>
              <js-icon icon="i-carbon-user" :size="14" color="#266bff" />
              {{ $t('user.info') }}
            </template>
          </wd-cell>
          <wd-cell
            is-link
            @click="navTo('pwd')"
          >
            <template #title>
              <js-icon icon="i-carbon-password" :size="14" color="#1bca6a" />
              {{ $t('user.pwd') }}
            </template>
          </wd-cell>
          <wd-cell
            is-link
            @click="navTo('help')"
          >
            <template #title>
              <js-icon icon="i-carbon-help" :size="14" color="#d99e59" />
              {{ $t('user.help') }}
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>

      <view class="mt-3">
        <wd-cell-group :border="true">
          <wd-cell
            is-link
            @click="navTo('about')"
          >
            <template #title>
              <js-icon icon="i-carbon-favorite" :size="14" color="#0a1aff" />
              {{ $t('user.about') }}
            </template>
          </wd-cell>
          <wd-cell
            is-link
            @click="navTo('comment')"
          >
            <template #title>
              <js-icon icon="i-carbon-customer-service" :size="14" color="#a571fd" />
              {{ $t('user.comment') }}
            </template>
          </wd-cell>
          <wd-cell
            is-link
            @click="upgrade"
          >
            <template #title>
              <js-icon icon="i-carbon-time" :size="14" color="#ff6f27" />
              {{ $t('user.checkUpdate') }}
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>

      <view class="mt-3">
        <wd-cell-group :border="true">
          <wd-cell
            is-link
            @click="navTo('setting')"
          >
            <template #title>
              <js-icon icon="i-carbon-settings" :size="14" color="#1a94ff" />
              {{ t('setting.title') }}
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.header {
  padding: 40rpx 30rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .userinfo {
    display: flex;
    align-items: center;
    flex: 1;

    .image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      overflow: hidden;
      border: 4rpx solid rgba(255, 255, 255, 0.5);
      margin-right: 20rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      .username {
        font-size: 32rpx;
        color: #fff;
        font-weight: bold;
        margin-bottom: 10rpx;
      }

      .usercode {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .logout {
    margin-left: 20rpx;
  }
}
</style>
