<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'MsgList',
})

definePage({
  style: {
    navigationBarTitleText: '%sys.msgCenter%',
  },
  excludeLoginPath: true,
})

// 搜索关键词
const keywords = ref('')

// 原始列表数据（模拟数据）
interface MsgItem {
  code: string
  name: string
  icon?: string
  count?: number
  childList: {
    code: string
    name: string
    createByName: string
    createDate: string
  }[]
}
const originalList = ref<MsgItem[]>([
  {
    code: 'a',
    name: '重要消息',
    icon: 'i-carbon-error',
    count: 3,
    childList: [
      {
        code: 'a1',
        name: '系统将于今晚22:00进行维护升级，预计耗时2小时，请提前保存工作',
        createByName: '系统管理员',
        createDate: '2024-01-15 16:30',
      },
      {
        code: 'a2',
        name: '您的请假申请已被驳回，原因：年假余额不足，请联系HR部门',
        createByName: '人事部经理',
        createDate: '2024-01-15 14:20',
      },
      {
        code: 'a3',
        name: '检测到异常登录行为，如非本人操作请立即修改密码',
        createByName: '安全中心',
        createDate: '2024-01-15 10:05',
      },
    ],
  },
  {
    code: 'a-1',
    name: '一般消息',
    icon: 'i-carbon-chat',
    childList: [
      {
        code: 'a1',
        name: '关于2024年度绩效考核的通知，请各位同事按时提交自评报告',
        createByName: '人力资源部',
        createDate: '2024-01-14 09:15',
      },
      {
        code: 'a2',
        name: '本周五下午15:00召开全员大会，地点：三楼会议室，请准时参加',
        createByName: '行政部',
        createDate: '2024-01-14 08:30',
      },
      {
        code: 'a3',
        name: '食堂菜单更新：本周新增川菜窗口，欢迎品尝',
        createByName: '后勤部',
        createDate: '2024-01-13 17:45',
      },
    ],
  },
  {
    code: 'a-2',
    name: '系统通知',
    icon: 'bell',
    childList: [
      {
        code: 'a1',
        name: '您的OA流程「采购申请单-20240115」已审批通过，请前往查看',
        createByName: 'OA系统',
        createDate: '2024-01-15 11:20',
      },
      {
        code: 'a2',
        name: '密码即将过期，剩余7天，请及时修改密码以保证账户安全',
        createByName: '系统通知',
        createDate: '2024-01-14 00:00',
      },
      {
        code: 'a3',
        name: '新版本v2.5.0已发布，更新了多项功能优化和bug修复',
        createByName: '技术部',
        createDate: '2024-01-13 15:30',
      },
    ],
  },
  {
    code: 'a-3',
    name: '已读消息',
    icon: 'volume',
    childList: [
      {
        code: 'a1',
        name: '欢迎加入JeeSite团队！祝您工作顺利',
        createByName: '人力资源总监',
        createDate: '2024-01-10 09:00',
      },
      {
        code: 'a2',
        name: '您的工位已分配至A区3楼305室，办公用品已准备妥当',
        createByName: '行政助理',
        createDate: '2024-01-10 08:45',
      },
      {
        code: 'a3',
        name: '入职培训安排：明天上午9:00在培训室进行新员工入职培训',
        createByName: '培训部',
        createDate: '2024-01-09 16:00',
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
const activeNames = ref(['0', '1', '2', '3'])

/**
 * 导航到消息详情
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
      <wd-search v-model="keywords" placeholder="搜索消息" :hide-cancel="true" @search="search" />
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
            <wd-badge v-if="item.count && item.count > 0" :value="item.count" />
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

.search {
  padding: 20rpx;
  background-color: #fff;
}

.title {
  display: flex;
  align-items: center;

  .text {
    margin-left: 10rpx;
    font-size: 28rpx;
    flex: 1;
  }
}
</style>
