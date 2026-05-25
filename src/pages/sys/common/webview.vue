<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

defineOptions({
  name: 'CommonWebview',
})

definePage({
  style: {
    navigationBarTitleText: '',
  },
})

// WebView URL
const webviewUrl = ref('')

// WebView 样式配置
const webviewStyles = {
  progress: {
    color: '#FF7200',
  },
}

/**
 * 页面加载
 */
onLoad((params: any) => {
  if (params.url) {
    webviewUrl.value = decodeURIComponent(params.url)
  }

  // 设置标题
  if (params.title) {
    uni.setNavigationBarTitle({
      title: params.title,
    })
  }
})
</script>

<template>
  <view>
    <web-view
      :update-title="false"
      :webview-styles="webviewStyles"
      :src="webviewUrl"
    />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
