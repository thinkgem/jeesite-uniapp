<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, unref, useAttrs } from 'vue'

defineOptions({
  name: 'JsIcon',
})

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: undefined,
  },
  spin: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  click: []
}>()

const attrs = useAttrs()

/**
 * 获取图标引用（处理不同图标库前缀）
 */
const getIconRef = computed(() => {
  const prefix = 'i-'
  let icon = props.icon || ''

  if (!icon.startsWith(prefix)) {
    icon = `${prefix}${icon}`
  }

  // 处理旧版图标前缀
  if (icon.startsWith(`${prefix}icon-`)) {
    icon = `${prefix}simple-line-icons:${icon.substring(7)}`
  }
  // else if (icon.startsWith(`${prefix}fa fa-`)) {
  //   icon = `${prefix}fa:${icon.substring(8)}`
  // }

  return icon
})

/**
 * 获取样式类名
 */
const getClass = computed(() => {
  const prefixCls = 'js-icon'
  return [
    attrs.class,
    `${prefixCls}`,
    {
      [`${prefixCls}-spin`]: props.spin,
      // [`${prefixCls}-fa`]: unref(getIconRef).startsWith('i-fa:'),
    },
    // 直接添加 UnoCSS 图标类名
    unref(getIconRef),
  ]
})

/**
 * 判断是否为图片图标
 */
const isImgIcon = computed(() => props.icon?.includes('.'))

/**
 * 获取图片图标路径
 */
const getImgIcon = computed(() => props.icon)

/**
 * 获取包裹样式
 */
const getWrapStyle = computed((): CSSProperties => {
  const { color, size } = props
  let fs = size

  if (typeof size === 'string') {
    fs = Number.parseInt(size, 10)
  }

  const icon = unref(getIconRef)
  // if (fs && icon && icon.startsWith('i-fa:')) {
  //   fs = (fs as number) - 1 // fa 图标偏大，整体缩小下
  // }

  return {
    color,
    fontSize: `${fs}px`,
  }
})
</script>

<template>
  <img
    v-if="isImgIcon"
    :src="`/resource/img/${getImgIcon}`"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :class="getClass"
    alt=""
  >
  <!-- #ifdef H5 -->
  <view
    v-else
    :style="getWrapStyle"
    :class="getClass"
  />
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <!-- 小程序环境使用 wd-icon 组件 -->
  <wd-icon
    v-if="!isImgIcon"
    :name="getIconRef"
    :color="color"
    :size="typeof size === 'number' ? `${size}px` : size"
    css-icon
    :custom-class="attrs.class as string"
    @click="$emit('click')"
  />
  <!-- #endif -->
</template>

<style scoped lang="scss">
.js-icon {
  display: inline-flex !important;
  justify-content: center;
  align-items: center;

  &-spin {
    animation: loadingCircle 1s infinite linear;
  }

  &-fa {
    opacity: 0.9;
  }

  span {
    vertical-align: baseline;
  }
}

@keyframes loadingCircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
