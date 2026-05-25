<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { bpmMyTaskListData } from '@/api/bpm/bpmMyTask'
import { useTokenStore } from '@/store/token'

defineOptions({
  name: 'Home',
})

definePage({
  type: 'home',
  style: {
    // navigationStyle: 'custom',
    navigationBarTitleText: '%sys.home%',
  },
})

// Banner 图片列表
const imgList = ref([
  '/static/jeesite/banner/1.svg',
  '/static/jeesite/banner/2.svg',
  '/static/jeesite/banner/3.svg',
])

// 待办任务数量
const todoCount = ref(0)

// 获取 token store
const tokenStore = useTokenStore()

// 菜单列表
const menuList = ref([
  {
    menuCode: 'a-1',
    menuName: '增删改查',
    menuIcon: 'i-carbon-document',
    menuColor: '',
    url: '',
    childList: [
      {
        menuCode: 'a13',
        menuName: '列表',
        menuIcon: 'i-carbon-thumbs-up',
        menuColor: '',
        url: '/pages/testData/list',
      },
      {
        menuCode: 'a11',
        menuName: '新增',
        menuIcon: 'i-carbon-add-alt',
        menuColor: '',
        url: '/pages/testData/form',
      },
      {
        menuCode: 'a10',
        menuName: '请假',
        menuIcon: 'i-carbon-time',
        menuColor: '',
        url: '/pages/oa/oaLeave/list',
      },
    ],
  },
  {
    menuCode: 'a',
    menuName: '公文管理',
    menuIcon: 'i-carbon-home',
    menuColor: '#919328',
    url: '',
    childList: [
      {
        menuCode: 'a1',
        menuName: '收文',
        menuIcon: 'i-carbon-email',
        menuColor: '#919328',
        url: '/pages/testData/form',
      },
      {
        menuCode: 'a2',
        menuName: '发文',
        menuIcon: 'i-carbon-bookmark',
        menuColor: '#919328',
        url: '/pages/testData/form',
      },
      {
        menuCode: 'a3',
        menuName: '查询',
        menuIcon: 'i-carbon-search',
        menuColor: '#919328',
        url: '/pages/testData/list',
      },
    ],
  },
  {
    menuCode: 'a-2',
    menuName: '功能列表',
    menuIcon: '',
    menuColor: '#0d9311',
    url: '',
    childList: [
      {
        menuCode: 'a21',
        menuName: '找回密码',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/sys/login/forget',
      },
      {
        menuCode: 'a22',
        menuName: '注册用户',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/sys/login/register',
      },
      {
        menuCode: 'a23',
        menuName: '个人资料',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/sys/user/info',
      },
      {
        menuCode: 'a24',
        menuName: '关于我们',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/sys/user/about',
      },
      {
        menuCode: 'a25',
        menuName: '修改密码',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/sys/user/pwd',
      },
      {
        menuCode: 'a26',
        menuName: '意见反馈',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/sys/user/comment',
      },
      {
        menuCode: 'a27',
        menuName: '系统设置',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/sys/user/setting',
      },
      {
        menuCode: 'a28',
        menuName: '列表演示',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/testData/list',
      },
      {
        menuCode: 'a29',
        menuName: '表单演示',
        menuIcon: '',
        menuColor: '#0d9311',
        url: '/pages/testData/form',
      },
    ],
  },
])

// 当前激活的菜单
const activeMenus = ref<string[]>(['a-1', 'a', 'a-2'])

// Banner 当前索引
const currentBanner = ref(0)

/**
 * 导航跳转
 */
function navTo(url: string) {
  if (!url)
    return
  if (url.includes('bpm') || url.includes('oa')) {
    uni.showToast({ title: '专业版中实现...', icon: 'none' })
    return
  }
  uni.navigateTo({ url })
}

/**
 * Banner 点击事件
 */
function onBannerClick(index: number) {
  console.log(`点击了第${index + 1}页图片`)
}

/**
 * 刷新待办数量
 */
async function refreshCount() {
  // 只有登录状态下才调用
  if (!tokenStore.hasLogin) {
    return
  }

  try {
    const res: any = {} // await bpmMyTaskListData({ status: 1, pageSize: 1 })
    // 兼容不同的返回数据结构
    todoCount.value = res?.count || res?.data?.count || 0
  }
  catch (error) {
    console.error('获取待办数量失败:', error)
    // 失败时设置为 0,不影响页面正常使用
    todoCount.value = 0
  }
}

// 页面显示时刷新待办数量
onMounted(() => {
  refreshCount()
})
</script>

<template>
  <view class="home-page">
    <!-- 语言切换 -->
    <js-lang title="home.title" :show-btn="true" />

    <!-- Banner 轮播 -->
    <wd-swiper
      v-model:current="currentBanner"
      :list="imgList"
      :autoplay="true"
      :interval="3000"
      height="350rpx"
      class="swiper-image"
      @click="onBannerClick"
    />

    <!-- 快捷入口 -->
    <view class="toolbar">
      <view class="custom-grid">
        <!-- 待办任务 -->
        <view class="custom-grid-item" @click="navTo('/pages/bpm/myTaskTodo')">
          <view class="grid-icon-wrapper">
            <wd-badge :value="todoCount" :max="99">
              <js-icon icon="i-carbon-time" :size="40" color="#ea9a44" />
            </wd-badge>
          </view>
          <text class="grid-text">待办任务</text>
        </view>

        <!-- 已办任务 -->
        <view class="custom-grid-item" @click="navTo('/pages/bpm/myTaskHistory')">
          <view class="grid-icon-wrapper">
            <js-icon icon="i-carbon-checkmark-filled" :size="40" color="#47cb66" />
          </view>
          <text class="grid-text">已办任务</text>
        </view>

        <!-- 我相关的 -->
        <view class="custom-grid-item" @click="navTo('/pages/bpm/myRuntime')">
          <view class="grid-icon-wrapper">
            <js-icon icon="i-carbon-list-boxes" :size="40" color="#5a98ea" />
          </view>
          <text class="grid-text">我相关的</text>
        </view>
      </view>
    </view>

    <!-- 动态菜单 -->
    <view class="menu-section">
      <wd-collapse v-model="activeMenus">
        <wd-collapse-item
          v-for="menu in menuList"
          :key="menu.menuCode"
          :name="menu.menuCode"
          :title="menu.menuName"
        >
          <template #title>
            <view class="collapse-title">
              <js-icon
                :icon="menu.menuIcon || 'i-carbon:container-image'"
                :size="20"
                :color="menu.menuColor || '#666'"
              />
              <text :style="{ color: menu.menuColor || '#666' }">{{ menu.menuName }}</text>
            </view>
          </template>

          <view class="custom-grid">
            <view
              v-for="child in menu.childList"
              :key="child.menuCode"
              class="custom-grid-item"
              @click="navTo(child.url)"
            >
              <view class="grid-icon-wrapper">
                <js-icon
                  :icon="child.menuIcon || 'i-carbon:container-image'"
                  :size="40"
                  :color="child.menuColor || '#666'"
                />
              </view>
              <text class="grid-text" :style="{ color: child.menuColor || '#666' }">{{ child.menuName }}</text>
            </view>
          </view>
        </wd-collapse-item>
      </wd-collapse>
    </view>
  </view>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 20rpx;
}

.swiper-image {
  width: 100%;
}

.toolbar {
  margin-bottom: 20rpx;
  background: #fff;
  padding: 20rpx 0;
}

.custom-grid {
  display: flex;
  flex-wrap: wrap;
}

.custom-grid-item {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
  cursor: pointer;
}

.custom-grid-item:active {
  opacity: 0.7;
}

.grid-icon-wrapper {
  position: relative;
  display: inline-block;
}

.grid-text {
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}

.menu-section {
  background: #fff;
}

.collapse-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 28rpx;
}
</style>
