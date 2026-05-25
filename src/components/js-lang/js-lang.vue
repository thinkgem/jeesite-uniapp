<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { computed } from 'vue'
import { switchLang } from '@/api/sys/login'
import { useLocaleStore } from '@/store/locale'

const localeStore = useLocaleStore()

/**
 * 当前语言标签
 */
const currentLangLabel = computed(() => {
  const current = localeStore.supportedLocales.find(
    item => item.value === localeStore.locale,
  )
  return current?.label || '简体中文'
})

/**
 * 切换语言
 */
async function toggleLang() {
  // 先切换本地语言
  localeStore.toggleLocale()

  // 调用后端接口
  try {
    await switchLang(localeStore.locale === 'zh-Hans' ? 'zh_CN' : 'en')
  }
  catch (error) {
    console.error('切换语言失败:', error)
  }
}
</script>

<template>

</template>

<style lang="scss" scoped>
.js-lang {
  position: absolute;
  top: 13px;
  right: 13px;
  z-index: 1000;
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: 0.5;

  text {
    width: 12px;
    height: 12px;
    font-size: 12px;
    border: 1px solid #4b4c4d;
    background-color: #e4e8eb;
    padding: 8px 8px;
    border-radius: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
