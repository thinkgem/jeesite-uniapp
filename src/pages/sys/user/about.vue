<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfig } from '@/hooks/useConfig'

defineOptions({
  name: 'UserAbout',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%user.about%',
  },
})

const config = useConfig()

// 当前年份
const currentYear = computed(() => new Date().getFullYear())

/**
 * 检查更新(仅 APP)
 */
function upgrade() {
  // #ifdef APP-PLUS
  uni.showToast({
    title: t('about.checkUpdateWait'),
    icon: 'none',
  })
  // #endif
  // #ifndef APP-PLUS
  uni.showToast({
    title: t('about.noNeedCheckUpdate'),
    icon: 'none',
  })
  // #endif
}

/**
 * 跳转到意见反馈
 */
function goToComment() {
  uni.navigateTo({
    url: '/pages/sys/user/comment',
  })
}

/**
 * 打开网页
 */
function openWebview(title: string, url: string) {
  uni.navigateTo({
    url: `/pages/sys/common/webview?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  })
}
</script>

<template>
  <view class="wrap">
    <!-- Logo 和版本信息 -->
    <view class="flex flex-col items-center pb-3 pt-5">
      <image src="/static/jeesite/logo200.png" mode="aspectFit" class="h-120px w-120px" />
      <view class="my-3 flex items-baseline justify-center">
        <view class="text-right text-40rpx">
          {{ config.productName || 'JeeSite' }}
        </view>
        <view class="ml-2 text-left text-30rpx text-#999">
          {{ config.productVersion || 'v1.0.0' }}
        </view>
      </view>
    </view>

    <!-- 菜单列表 -->
    <wd-cell-group :border="true">
      <wd-cell
        title="检查更新"
        :is-link="true"
        :center="true"
        title-width="90%"
        @click="upgrade"
      />
      <wd-cell
        title="意见反馈"
        :is-link="true"
        :center="true"
        title-width="90%"
        @click="goToComment"
      />
      <wd-cell
        title="公司首页"
        label="https://jeesite.com"
        :is-link="true"
        :center="true"
        title-width="90%"
        @click="openWebview('公司首页', 'https://jeesite.com')"
      />
      <wd-cell
        title="服务条款"
        label="http://s.jeesite.com/"
        :is-link="true"
        :center="true"
        title-width="90%"
        @click="openWebview('服务条款', 'http://s.jeesite.com/')"
      />
    </wd-cell-group>

    <!-- 版权信息 -->
    <view class="copyright">
      <view>Copyright &copy; 2013-{{ currentYear }} jeesite.com</view>
      <view>All Rights Reserved</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.copyright {
  margin-top: 50rpx;
  text-align: center;
  line-height: 60rpx;
  color: #999;
}
</style>
