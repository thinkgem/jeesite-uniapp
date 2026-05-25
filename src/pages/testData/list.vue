<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { testDataDelete, testDataListData } from '@/api/test/testData'
import { t } from '@/locale/index'

defineOptions({
  name: 'TestDataList',
})

definePage({
  style: {
    navigationBarTitleText: '%testData.list%',
  },
  excludeLoginPath: true,
})

// 搜索关键词
const keywords = ref('')

// 查询参数
const query = ref({
  pageNo: 1,
  pageSize: 20,
  testInput: '',
})

// 列表数据
const list = ref<any[]>([])

// 总数
const count = ref(0)

// z-paging 引用
const pagingRef = ref()

// 加载文本
const noMoreText = computed(() => {
  if (count.value > 0) {
    return `${t('common.noMore')}，${t('common.totalCount', { count: count.value })}`
  }
  return t('common.noMore')
})

/**
 * 查询列表数据
 */
async function queryList(pageNo: number, pageSize: number) {
  try {
    const res = await testDataListData({
      pageNo,
      pageSize,
      testInput: query.value.testInput,
    })
    if (!res.list || res.list.length === 0) {
      pagingRef.value.complete([])
      return
    }
    count.value = res.count
    query.value.pageNo = res.pageNo
    query.value.pageSize = res.pageSize
    pagingRef.value.complete(res.list)
  }
  catch (error) {
    console.error('加载列表失败:', error)
    uni.showToast({ title: t('common.loadFailed'), icon: 'none' })
    pagingRef.value.complete([])
  }
}

/**
 * 搜索
 */
function handleSearch() {
  query.value.testInput = keywords.value
  // 刷新 z-paging
  pagingRef.value?.reload()
}

onShow(() => {
  if (uni.getStorageSync('refreshList') === true) {
    uni.removeStorageSync('refreshList')
    keywords.value = ''
    handleSearch()
  }
})

/**
 * 导航跳转
 */
function navTo(url: string) {
  uni.navigateTo({ url })
}

/**
 * 滑动删除
 */
async function handleDelete(item, index) {
  uni.showModal({
    title: t('common.tip'),
    content: t('common.deleteConfirm'),
    showCancel: true,
    success: async (res2) => {
      if (res2.confirm) {
        try {
          const res: any = await testDataDelete({ id: item.id })
          uni.showToast({ title: res.message, icon: 'none' })
          if (res.result === 'true') {
            list.value.splice(index, 1)
          }
        }
        catch (error) {
          console.error('删除失败:', error)
        }
      }
    },
  })
}
</script>

<template>
  <view class="list-page">
    <z-paging
      ref="pagingRef"
      v-model="list"
      :loading-more-no-more-text="noMoreText"
      @query="queryList"
    >
      <template #top>
        <wd-search v-model="keywords" :placeholder="$t('common.searchPlaceholder')" :hide-cancel="true" @search="handleSearch" @clear="handleSearch" />
      </template>
      <view v-for="(item, index) in list" :key="item.id" class="list-item">
        <wd-swipe-action>
          <template #right>
            <view class="action">
              <view class="button" style="background: #dd524d;" @click="handleDelete(item, index)">
                {{ $t('common.delete') }}
              </view>
            </view>
          </template>
          <wd-cell
            :title="item.testInput || item.id"
            :label="`${$t('common.creator')}：${item.createBy} | ${item.createDate}`"
            :is-link="true"
            :border="true"
            :center="true"
            title-width="90%"
            @click="navTo(`form?id=${item.id}`)"
          />
        </wd-swipe-action>
      </view>
    </z-paging>
    <js-add-button @click="navTo('form')" />
  </view>
</template>

<style lang="scss" scoped>

</style>
