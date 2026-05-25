<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { dictTreeData } from '@/api/sys/login'

interface Props {
  modelValue?: string
  labelValue?: string
  placeholder?: string
  disabled?: boolean
  tree?: boolean
  dictType?: string
  multiple?: boolean
  options?: Array<Record<string, any>>
  fieldNames?: { label: string, value: string }
  returnFullName?: boolean
  returnFullNameSplit?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  labelValue: '',
  placeholder: '请选择选项',
  disabled: false,
  tree: false,
  dictType: '',
  multiple: false,
  options: () => [],
  fieldNames: () => ({ label: 'name', value: 'value' }),
  returnFullName: false,
  returnFullNameSplit: '/',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:labelValue': [label: string]
  'confirm': [value: string, label: string]
}>()

// picker 的值（wd-picker 和 wd-select-picker 都期望数组类型）
const pickerValue = ref<string[]>([])
// picker 的列数据
const pickerColumns = ref<Array<Record<string, any>>>([])
// 内部存储的 label
const currentLabel = ref('')
// 控制选择器显示/隐藏
const showPicker = ref(false)

/**
 * 点击 cell 打开选择器
 */
function handleCellClick() {
  if (!props.disabled) {
    showPicker.value = true
  }
}

/**
 * 加载数据
 */
async function loadData() {
  if (props.dictType) {
    try {
      const res: any = await dictTreeData({ dictType: props.dictType })
      setOptions(res)
    }
    catch (error) {
      console.error('加载字典数据失败:', error)
    }
  }
  else if (props.options && props.options.length > 0) {
    setOptions(props.options)
  }
}

/**
 * 设置列表数据
 */
function setOptions(data: Array<Record<string, any>>) {
  let items = data || []

  // 如果是树结构，转换数据
  if (props.tree) {
    items = convertTree(items)
  }

  // 如果数据为空，添加空项
  if (!items || items.length === 0) {
    items = [{
      [getItemValue()]: '',
      [getItemLabel()]: '',
    }]
  }

  // 转换为 wd-select-picker 所需的格式（使用 label 而非 text）
  const itemValue = getItemValue()
  const itemLabel = getItemLabel()
  pickerColumns.value = items.map(item => ({
    label: String(item[itemLabel] || ''),
    value: String(item[itemValue] || ''),
    ...item, // 保留原始数据
  }))

  selectValue()
}

/**
 * 获取 itemLabel 字段名
 */
function getItemLabel() {
  return props.fieldNames.label || 'name'
}

/**
 * 获取 itemValue 字段名
 */
function getItemValue() {
  return props.fieldNames.value || (props.tree ? 'id' : 'value')
}

/**
 * 选中值
 */
function selectValue() {
  if (!props.modelValue) {
    currentLabel.value = ''
    pickerValue.value = []
    return
  }

  // 查找匹配项
  const matchedItem = pickerColumns.value.find(
    item => String(item.value) === String(props.modelValue),
  )

  if (matchedItem) {
    currentLabel.value = matchedItem.label
    // wd-picker 和 wd-select-picker 的 v-model 都是数组
    pickerValue.value = [String(matchedItem.value)]
  }
  else {
    // 如果没找到匹配项，重置显示
    currentLabel.value = ''
    pickerValue.value = []
  }
}

/**
 * 转换树结构
 */
function convertTree(data: Array<Record<string, any>>) {
  const key = 'id'
  const parentKey = 'pId'
  const childKey = 'children'

  if (!Array.isArray(data)) {
    return [data]
  }

  const treeData: Array<Record<string, any>> = []
  const map: Record<string, any> = {}

  // 第一遍：复制数据并建立映射
  data.forEach((item) => {
    const newItem = { ...item }
    map[newItem[key]] = newItem
  })

  // 第二遍：构建树结构
  data.forEach((item) => {
    const newItem = map[item[key]]
    const parent = map[item[parentKey]]

    if (parent && item[key] !== item[parentKey]) {
      if (!parent[childKey]) {
        parent[childKey] = []
      }
      parent[childKey].push(newItem)
    }
    else {
      treeData.push(newItem)
    }
  })

  return treeData
}

/**
 * 确认选择
 */
function onConfirm(event: any) {
  if (props.multiple) {
    // 多选模式：wd-select-picker 的 confirm 返回 { value: string[] }
    const values = event?.value || []

    if (!values || values.length === 0) {
      currentLabel.value = ''
      pickerValue.value = []
      emit('update:modelValue', '')
      emit('update:labelValue', '')
      emit('confirm', '', '')
      return
    }

    // 从 columns 中查找对应的 label
    const labels = values.map((val: string) => {
      const item = pickerColumns.value.find(col => String(col.value) === String(val))
      return item ? String(item.label || '') : ''
    }).filter(label => label !== '')

    // 更新内部状态
    pickerValue.value = values
    currentLabel.value = labels.join(',')

    // 触发事件（多选时 modelValue 为逗号分隔的字符串）
    const newValue = values.join(',')
    emit('update:modelValue', newValue)
    emit('update:labelValue', currentLabel.value)
    emit('confirm', newValue, currentLabel.value)
  }
  else {
    // 单选模式：wd-picker 的 confirm 返回 { value, selectedItems }
    const selectedItems = event?.selectedItems

    // 确保 selectedItems 是数组
    if (!selectedItems || !Array.isArray(selectedItems) || selectedItems.length === 0) {
      return
    }

    const selectedItem = selectedItems[0]
    if (selectedItem) {
      const newValue = String(selectedItem.value || '')
      const newLabel = String(selectedItem.label || '')

      // 更新内部状态
      pickerValue.value = [newValue]
      currentLabel.value = newLabel

      // 触发事件
      emit('update:modelValue', newValue)
      emit('update:labelValue', newLabel)
      emit('confirm', newValue, newLabel)
    }
  }
}

/**
 * 监听 modelValue 变化
 */
watch(
  () => props.modelValue,
  (newVal) => {
    pickerValue.value = newVal ? [newVal] : []
    selectValue()
  },
)

/**
 * 监听 labelValue 变化
 */
watch(
  () => props.labelValue,
  (newVal) => {
    currentLabel.value = newVal
  },
)

/**
 * 监听 options 变化
 */
watch(
  () => props.options,
  (newVal) => {
    setOptions(newVal)
  },
  { deep: true },
)

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})
</script>

<template>
  <view class="js-select">
    <wd-cell
      :title="currentLabel || placeholder"
      :is-link="!disabled"
      title-width="80%"
      custom-style="padding: 5rpx 0;"
      @click="handleCellClick"
    />
    <wd-picker
      v-if="!props.multiple"
      v-model="pickerValue"
      v-model:visible="showPicker"
      :columns="pickerColumns"
      :placeholder="placeholder"
      :disabled="disabled"
      :title="placeholder"
      @confirm="onConfirm"
    />
    <wd-select-picker
      v-else
      v-model="pickerValue"
      v-model:visible="showPicker"
      :columns="pickerColumns"
      :placeholder="placeholder"
      :disabled="disabled"
      :title="placeholder"
      @confirm="onConfirm"
    />
  </view>
</template>

<style lang="scss" scoped>
.js-select {
  width: 100%;
}
</style>
