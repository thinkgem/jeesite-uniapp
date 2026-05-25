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
  dictType?: string
  treeData?: Array<Record<string, any>>
  fieldNames?: { label: string, value: string, children: string }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  labelValue: '',
  placeholder: '请选择',
  disabled: false,
  dictType: '',
  treeData: () => [],
  fieldNames: () => ({ label: 'name', value: 'id', children: 'children' }),
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:labelValue': [label: string]
  'confirm': [value: string, label: string]
}>()

// cascader 的值（路径数组）
const cascaderValue = ref<string[]>([])
// 显示的文本
const displayValue = ref('')
// 控制级联选择器显示/隐藏
const showCascader = ref(false)
// 级联选择器的选项数据
const cascaderOptions = ref<Array<Record<string, any>>>([])

/**
 * 点击 cell 打开级联选择器
 */
function handleCellClick() {
  if (!props.disabled) {
    showCascader.value = true
  }
}

/**
 * 加载数据
 */
async function loadData() {
  if (props.dictType) {
    try {
      const res: any = await dictTreeData({ dictType: props.dictType })
      setTreeData(res)
    }
    catch (error) {
      console.error('加载字典数据失败:', error)
    }
  }
  else if (props.treeData && props.treeData.length > 0) {
    setTreeData(props.treeData)
  }
}

/**
 * 设置列表数据
 */
function setTreeData(data: Array<Record<string, any>>) {
  const items = data || []

  // 判断是否为扁平数据（包含 pId 字段）
  const isFlatData = items.length > 0 && 'pId' in items[0]

  let treeData: Array<Record<string, any>>
  if (isFlatData) {
    // 将扁平数据转换为树形结构
    treeData = convertFlatToTree(items)
  }
  else {
    treeData = items
  }

  // 转换数据格式为 wd-cascader 所需的格式
  cascaderOptions.value = treeData

  // 如果有 modelValue，设置初始值
  if (props.modelValue) {
    selectValue()
  }
}

/**
 * 将扁平数据转换为树形结构
 */
function convertFlatToTree(data: Array<Record<string, any>>): Array<Record<string, any>> {
  const map: Record<string, any> = {}
  const tree: Array<Record<string, any>> = []

  // 第一遍：建立映射
  data.forEach((item) => {
    map[item.id] = { ...item, [props.fieldNames.children]: [] }
  })

  // 第二遍：构建树形结构
  data.forEach((item) => {
    const node = map[item.id]
    const parentId = item.pId || '0'

    node.value = String(item[props.fieldNames.value] || '')
    node.text = String(item[props.fieldNames.label] || '')

    if (parentId === '0' || !map[parentId]) {
      // 根节点
      tree.push(node)
    }
    else {
      // 子节点
      map[parentId][props.fieldNames.children].push(node)
    }
  })

  return tree
}

/**
 * 根据值查找路径
 */
function findPathByValue(data: Array<Record<string, any>>, targetValue: string, path: string[] = []): string[] | null {
  for (const item of data) {
    const currentPath = [...path, String(item[props.fieldNames.value])]

    if (String(item[props.fieldNames.value]) === String(targetValue)) {
      return currentPath
    }

    if (item[props.fieldNames.children] && Array.isArray(item[props.fieldNames.children])) {
      const result = findPathByValue(item[props.fieldNames.children], targetValue, currentPath)
      if (result) {
        return result
      }
    }
  }

  return null
}

/**
 * 根据路径查找最后一项
 */
function findItemByPath(data: Array<Record<string, any>>, path: string[]): Record<string, any> | null {
  let currentData = data
  let lastItem: Record<string, any> | null = null

  for (const value of path) {
    const item = currentData.find(item => String(item[props.fieldNames.value]) === String(value))
    if (!item) {
      return null
    }
    lastItem = item
    currentData = item[props.fieldNames.children] || []
  }

  return lastItem
}

/**
 * 选中值
 */
function selectValue() {
  if (!props.modelValue) {
    cascaderValue.value = []
    displayValue.value = ''
    return
  }

  // 查找路径
  const path = findPathByValue(cascaderOptions.value, props.modelValue)

  if (path) {
    cascaderValue.value = path

    // 查找最后一项获取 label
    const lastItem = findItemByPath(cascaderOptions.value, path)
    if (lastItem) {
      displayValue.value = String(lastItem[props.fieldNames.label] || '')
    }
  }
  else {
    cascaderValue.value = []
    displayValue.value = ''
  }
}

/**
 * 确认选择
 */
function onConfirm(event: any) {
  const { value, selectedOptions } = event

  if (!selectedOptions || selectedOptions.length === 0) {
    return
  }

  // 获取最后一项的值和标签
  const lastOption = selectedOptions[selectedOptions.length - 1]
  const newValue = String(lastOption[props.fieldNames.value] || '')
  const newLabel = String(lastOption[props.fieldNames.label] || '')

  // 更新内部状态
  cascaderValue.value = value
  displayValue.value = newLabel

  // 触发事件
  emit('update:modelValue', newValue)
  emit('update:labelValue', newLabel)
  emit('confirm', newValue, newLabel)
}

/**
 * 监听 modelValue 变化
 */
watch(
  () => props.modelValue,
  (newVal) => {
    selectValue()
  },
)

/**
 * 监听 labelValue 变化
 */
watch(
  () => props.labelValue,
  (newVal) => {
    displayValue.value = newVal
  },
)

/**
 * 监听 treeData 变化
 */
watch(
  () => props.treeData,
  (newVal) => {
    setTreeData(newVal)
  },
  { deep: true },
)

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})
</script>

<template>
  <view class="js-tree-select">
    <wd-cell
      :title="displayValue || placeholder"
      :is-link="!disabled"
      title-width="80%"
      custom-style="padding: 5rpx 0;"
      @click="handleCellClick"
    />
    <wd-cascader
      v-model="cascaderValue"
      v-model:visible="showCascader"
      :options="cascaderOptions"
      :value-key="fieldNames.value"
      :text-key="fieldNames.label"
      :children-key="fieldNames.children"
      :placeholder="placeholder"
      :disabled="disabled"
      :title="placeholder"
      @confirm="onConfirm"
    />
  </view>
</template>

<style lang="scss" scoped>
.js-tree-select {
  width: 100%;
}
</style>
