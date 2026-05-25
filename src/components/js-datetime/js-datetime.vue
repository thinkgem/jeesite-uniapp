<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type DateTimeType = 'date' | 'datetime' | 'year' | 'year-month' | 'time'

interface Props {
  modelValue?: string | number | null
  placeholder?: string
  disabled?: boolean
  type?: DateTimeType
  format?: string
  // 可以选择的最小日期，如：2025-01-01
  minDate?: string | number | null
  // 可以选择的最大日期，如：2027-01-01
  maxDate?: string | number | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: '请选择',
  disabled: false,
  type: 'date',
  format: '',
  minDate: null,
  maxDate: null,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'confirm': [value: string | number | null]
}>()

// 组件的值
const datetimeValue = ref<string | number | Array<string | number>>('')
// 显示的文本
const displayValue = ref('')
// 控制日历显示/隐藏
const showPicker = ref(false)

/**
 * 点击 cell 打开日历
 */
function handleCellClick() {
  if (!props.disabled) {
    showPicker.value = true
  }
}

/**
 * 格式化日期
 */
function formatDate(date: Date, format: string): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化显示值
 */
function formatDisplayValue(value: string | number | null): string {
  if (!value) {
    return ''
  }

  // 如果是时间戳，转换为日期字符串
  if (typeof value === 'number') {
    const date = new Date(value)

    // 根据类型选择格式
    let format = props.format
    if (!format) {
      if (props.type === 'datetime') {
        format = 'yyyy-MM-dd HH:mm:ss'
      }
      else {
        format = 'yyyy-MM-dd'
      }
    }

    return formatDate(date, format)
  }

  // 如果已经是字符串，直接返回
  return String(value)
}

/**
 * 确认选择
 */
function onConfirm(event: any) {
  const value = event?.value

  if (value !== undefined && value !== null) {
    datetimeValue.value = value
    displayValue.value = formatDisplayValue(value)

    // 触发事件
    emit('update:modelValue', displayValue.value)
    emit('confirm', displayValue.value)
  }
}

/**
 * 将值转换为组件接受的格式（Number | Array | Null）
 */
function convertDatetimeValue(value: string | number | null): number | string {
  if (!value) {
    return ''
  }

  // 如果已经是数字（时间戳），直接返回
  if (typeof value === 'number') {
    return value
  }

  // 如果是字符串，尝试转换为时间戳
  const date = new Date(value)
  if (!Number.isNaN(date.getTime())) {
    return date.getTime()
  }

  return ''
}

/**
 * 计算传递的其他属性
 */
const otherProps = computed(() => {
  const otherAttrs: Record<string, any> = {}

  const minDateTimestamp = convertDatetimeValue(props.minDate)
  const maxDateTimestamp = convertDatetimeValue(props.maxDate)

  if (minDateTimestamp) {
    otherAttrs['min-date'] = minDateTimestamp
  }

  if (maxDateTimestamp) {
    otherAttrs['max-date'] = maxDateTimestamp
  }

  return otherAttrs
})

/**
 * 监听 modelValue 变化
 */
watch(
  () => props.modelValue,
  (newVal) => {
    datetimeValue.value = convertDatetimeValue(newVal)
    displayValue.value = formatDisplayValue(newVal)
  },
  { immediate: true },
)
</script>

<template>
  <view class="js-datetime">
    <wd-cell
      :title="displayValue || placeholder"
      :is-link="!disabled"
      title-width="80%"
      custom-style="padding: 5rpx 0;"
      @click="handleCellClick"
    />
    <wd-datetime-picker
      v-model="datetimeValue"
      v-model:visible="showPicker"
      :type="props.type"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="otherProps"
      @confirm="onConfirm"
    />
  </view>
</template>

<style lang="scss" scoped>
.js-datetime {
  width: 100%;
}
</style>
