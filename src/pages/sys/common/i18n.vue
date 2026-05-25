<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { ref } from 'vue'
import i18n, { t } from '@/locale/index'
import { setTabbarItem } from '@/tabbar/i18n'
import { testI18n } from '@/utils/i18n'

definePage({
  style: {
    navigationBarTitleText: '%i18n.title%',
  },
})

const current = ref(uni.getLocale())
const user = { name: '张三', detail: { height: 178, weight: '75kg' } }
const languages = [
  {
    value: 'zh-Hans',
    name: '中文',
    checked: 'true',
  },
  {
    value: 'en',
    name: '英文',
  },
]

function radioChange(evt) {
  // console.log(evt)
  current.value = evt.detail.value
  // 下面2句缺一不可！！！
  uni.setLocale(evt.detail.value)
  i18n.global.locale = evt.detail.value

  // 底部tabbar需要重新设置一下
  setTabbarItem()
  // 本页的标题也需要重新设置一下
  uni.setNavigationBarTitle({
    title: t('i18n.title'),
  })
}
</script>

<template>
  <view class="mt-4 center flex-col">
    <js-lang title="i18n.title" />
    <view class="m-4">
      点击右侧 “中” 或 “EN” 切换语言
    </view>
    <view class="m-2">
      {{ $t("i18n.title") }}
    </view>
    <view class="text-gray-500 italic">
      使用$t: {{ $t("weight", { heavy: 100 }) }}
    </view>
    <view class="m-2">
      {{ $t("weight", { heavy: 100 }) }}
    </view>
    <view class="text-gray-500 italic">
      使用t: {{ t("weight", { heavy: 100 }) }}
    </view>
    <view class="m-2">
      {{ t("weight", { heavy: 100 }) }}
    </view>
    <view class="m-2">
      {{ t("introduction", user) }}
    </view>
    <button class="m-3 mb-44" @click="testI18n">
      {{ $t("i18n.testPopup") }}
    </button>
  </view>
</template>

<style lang="scss" scoped>
.uni-list {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
}

.radio-group {
  width: 200px;
  margin: 10px auto;
  border-radius: 12px;
}

.uni-list-cell {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #eee;
  border-radius: 12px;
  margin-bottom: 10px;
}
</style>
