<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'UserHelp',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%user.help%',
  },
})

// 搜索关键词
const keywords = ref('')

// 原始列表数据（使用 computed 实现国际化）
const originalList = computed(() => [
  {
    code: 'a',
    name: t('help.faq'),
    icon: 'i-carbon-error',
    childList: [
      {
        code: 'a1',
        name: t('help.whyNoMessage'),
        createByName: '管理员',
        createDate: '2021-4-6 12:10',
      },
      {
        code: 'a2',
        name: t('help.howCloseMessage'),
        createByName: '管理员',
        createDate: '2021-4-6 12:10',
      },
      {
        code: 'a3',
        name: t('help.howHandleTicket'),
        createByName: '管理员',
        createDate: '2021-4-6 12:10',
      },
    ],
  },
  {
    code: 'a-1',
    name: t('help.taskRelated'),
    icon: 'i-carbon-time',
    childList: [
      {
        code: 'a1',
        name: '怎么办理任务？',
        createByName: '管理员',
        createDate: '2021-4-6 12:10',
      },
      {
        code: 'a2',
        name: '怎么完成任务？',
        createByName: '管理员',
        createDate: '2021-4-6 12:10',
      },
      {
        code: 'a3',
        name: '怎么查询任务？',
        createByName: '管理员',
        createDate: '2021-4-6 12:10',
      },
    ],
  },
])

// 过滤后的列表数据
const list = computed(() => {
  if (!keywords.value) {
    return originalList.value
  }

  const keyword = keywords.value.toLowerCase()
  return originalList.value
    .map((item) => {
      // 过滤子项
      const filteredChildList = item.childList.filter(child =>
        child.name.toLowerCase().includes(keyword),
      )

      // 如果父项名称匹配或子项有匹配，则保留
      if (item.name.toLowerCase().includes(keyword) || filteredChildList.length > 0) {
        return {
          ...item,
          childList: filteredChildList.length > 0 ? filteredChildList : item.childList,
        }
      }
      return null
    })
    .filter(item => item !== null)
})

// 展开的面板
const activeNames = ref(['0', '1'])

/**
 * 导航到指定页面
 */
function navTo(url: string) {
  uni.navigateTo({
    url,
  })
}

/**
 * 搜索（实时过滤，不需要手动触发）
 */
function search() {
  // 使用 computed 自动过滤，这里可以留空或添加额外逻辑
}
</script>

<template>
  <view class="wrap">
    <!-- 搜索框 -->
    <view class="search">
      <wd-search v-model="keywords" :placeholder="$t('comment.content')" :hide-cancel="true" @search="search" />
    </view>

    <!-- 折叠面板 -->
    <wd-collapse v-model="activeNames">
      <wd-collapse-item
        v-for="(item, index) in list"
        :key="item.code"
        :name="String(index)"
      >
        <template #title>
          <view class="title">
            <js-icon :icon="item.icon || 'i-carbon-home'" :size="15" />
            <view class="text">
              {{ item.name }}
            </view>
          </view>
        </template>

        <wd-cell-group :border="true">
          <wd-cell
            v-for="child in item.childList"
            :key="child.code"
            :title="child.name"
            :label="`发送者：${child.createByName} | ${child.createDate}`"
            :is-link="true"
            :center="true"
            title-width="90%"
            @click="navTo('/pages/sys/msg/form')"
          />
        </wd-cell-group>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.title {
  display: flex;
  align-items: center;

  .text {
    margin-left: 10rpx;
    font-size: 28rpx;
  }
}
</style>
