---
trigger: always_on
---

# 项目概览

这是一个基于 uniapp + Vue3 + TypeScript + Vite5 + UnoCSS 的跨平台开发框架。

## 项目特点
- 支持 H5、小程序、APP 多平台开发
- 使用最新的前端技术栈
- 内置约定式路由、layout布局、请求封装等功能
- 无需依赖 HBuilderX，支持命令行开发

## 核心配置文件
- [package.json](mdc:package.json) - 项目依赖和脚本配置
- [vite.config.ts](mdc:vite.config.ts) - Vite 构建配置
- [pages.config.ts](mdc:pages.config.ts) - 页面路由配置
- [manifest.config.ts](mdc:manifest.config.ts) - 应用清单配置
- [uno.config.ts](mdc:uno.config.ts) - UnoCSS 配置

## 主要目录结构
- `src/pages/` - 页面文件
- `src/components/` - 组件文件
- `src/layouts/` - 布局文件
- `src/api/` - API 接口
- `src/http/` - HTTP 请求封装
- `src/store/` - 状态管理
- `src/tabbar/` - 底部导航栏
- `src/App.ku.vue` - 全局根组件（类似 App.vue 里面的 template作用）

## 开发命令
- `pnpm dev` - 开发 H5 版本
- `pnpm dev:mp` - 开发微信小程序
- `pnpm dev:mp-alipay` - 开发支付宝小程序(含钉钉)
- `pnpm dev:app` - 开发 APP 版本
- `pnpm build` - 构建生产版本

## Vue 组件规范
- 使用 Composition API 和 `<script setup>` 语法
- 组件文件使用 PascalCase 命名
- 页面文件放在 `src/pages/` 目录下
- 全局组件文件放在 `src/components/` 目录下
- 局部组件文件放在页面的 `/components/` 目录下

## TypeScript 规范
- 严格使用 TypeScript，避免使用 `any` 类型
- 为 API 响应数据定义接口类型
- 使用 `interface` 定义对象类型，`type` 定义联合类型
- 导入类型时使用 `import type` 语法

## 状态管理
- 使用 Pinia 进行状态管理
- Store 文件放在 `src/store/` 目录下
- 使用 `defineStore` 定义 store
- 支持持久化存储

## UnoCSS 原子化 CSS
- 项目使用 UnoCSS 作为原子化 CSS 框架
- 配置在 [uno.config.ts]
- 支持预设和自定义规则
- 优先使用原子化类名，减少自定义 CSS

## Vue SFC 组件规范
- `<script lang="ts" setup>` 标签必须是第一个子元素
- `<template>` 标签必须是第二个子元素
- `<style lang="scss" scoped>` 标签必须是最后一个子元素（因为推荐使用原子化类名，所以很可能没有）

## 页面开发
- 页面文件放在 [src/pages/]目录下
- 使用约定式路由，文件名即路由路径
- 页面配置在仅需要在 宏`definePage` 中配置标题等内容即可，会自动生成到 `pages.json` 中
- definePage的顺序在最上面

## 组件开发
- 全局组件文件放在 `src/components/` 目录下
- 局部组件文件放在页面的 `/components/` 目录下
- 使用 uni-app 内置组件和第三方组件库
- 支持 wot-ui 组件库 和 z-paging 组件
- 自定义组件遵循 uni-app 组件规范

## Wot UI 组件库使用规范

### 组件查询流程
当用户询问关于 `wot-ui`（`wd-` 前缀）组件时，按以下顺序查询：

1. **优先使用 wot-ui-v2 skill**
   - 调用 [wot-ui-v2](./wot-ui-v2.md) 获取组件文档
   - 查询组件的 props、events、slots、CSS 变量
   - 查看官方示例和最佳实践

2. **常用组件参考**
   - 表单类：`wd-form`、`wd-form-item`、`wd-input`、`wd-textarea`
   - 反馈类：`wd-toast`、`wd-dialog`、`wd-notify`、`wd-loading`
   - 导航类：`wd-navbar`、`wd-tabbar`、`wd-tabs`
   - 展示类：`wd-cell`、`wd-cell-group`、`wd-image`、`wd-icon`
   - 选择类：`wd-picker`、`wd-select`、`wd-radio`、`wd-checkbox`
   - 其他：`wd-button`、`wd-img-cropper`、`wd-popup`、`wd-drawer`

3. **事件命名规范**
   - 确认事件：`@confirm`（如 `wd-img-cropper`）
   - 取消事件：`@cancel`
   - 变化事件：`@change`
   - 点击事件：`@click`
   - 成功事件：`@success`、`@crop-success`（注意区分具体组件）

4. **注意事项**
   - 反馈类组件（Toast、Dialog 等）需要使用 hooks + 组件实例配合
   - 主题定制优先使用 `ConfigProvider` 和 CSS 变量
   - 导入路径：npm 安装使用 `@wot-ui/ui`，uni_modules 使用 `@/uni_modules/wot-ui`
   - 所有组件都支持 `custom-class` 和 `custom-style` 自定义样式

### 示例代码
```vue
<script setup lang="ts">
import { ref } from 'vue'

const showCropper = ref(false)
const cropImageUrl = ref('')

function chooseImage() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      cropImageUrl.value = res.tempFilePaths[0]
      showCropper.value = true
    },
  })
}

function onConfirm(event: { tempFilePath: string }) {
  const { tempFilePath } = event
  console.log('裁剪后的图片路径:', tempFilePath)
  showCropper.value = false
}

function onCancel() {
  showCropper.value = false
}
</script>

<template>
  <wd-button @click="chooseImage">选择图片</wd-button>
  
  <wd-img-cropper
    v-model="showCropper"
    :img-src="cropImageUrl"
    @confirm="onConfirm"
    @cancel="onCancel"
    circular
  />
</template>
```

## 平台适配
- 使用条件编译处理平台差异
- 支持 H5、小程序、APP 多平台
- 注意各平台的 API 差异
- 使用 uni.xxx API 替代原生 API

## 示例代码结构
```vue
<script setup lang="ts">
// #ifdef H5
import { h5Api } from '@/utils/h5'
// #endif

// #ifdef MP-WEIXIN
import { mpApi } from '@/utils/mp'
// #endif

const handleClick = () => {
  // #ifdef H5
  h5Api.showToast('H5 平台')
  // #endif
  
  // #ifdef MP-WEIXIN
  mpApi.showToast('微信小程序')
  // #endif
}
</script>

<template>
  <view class="page">
    <!-- uni-app 组件 -->
    <button @click="handleClick">点击</button>
    
    <!-- 条件渲染 -->
    <!-- #ifdef H5 -->
    <view>H5 特有内容</view>
    <!-- #endif -->
  </view>
</template>
```

## 生命周期
- 使用 uni-app 页面生命周期
- onLoad、onShow、onReady、onHide、onUnload
- 组件生命周期遵循 Vue3 规范
- 注意页面栈和导航管理
