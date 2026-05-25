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
  disabled?: boolean
  dictType?: string
  options?: Array<Record<string, any>>
  fieldNames?: { label: string, value: string }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  dictType: '',
  options: () => [],
  fieldNames: () => ({ label: 'name', value: 'value' }),
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// 复选框的值（数组）
const checkboxValue = ref<string[]>([])

// 复选框的列表数据
const checkboxOptions = ref<Array<Record<string, any>>>([])

/**
 * 加载数据
 */
async function loadData() {
  if (props.dictType) {
    try {
      const res: any = await dictTreeData({ dictType: props.dictType })
      checkboxOptions.value = res || []
    }
    catch (error) {
      console.error('加载字典数据失败:', error)
    }
  }
  else {
    checkboxOptions.value = props.options || []
  }
}

/**
 * 值变化处理
 */
function handleChange() {
  const value = checkboxValue.value
  const result = value && value.length > 0 ? value.join(',') : ''
  emit('update:modelValue', result)
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    // 将逗号分隔的字符串转换为数组，并过滤空值
    if (newVal && typeof newVal === 'string' && newVal.trim() !== '') {
      const values = newVal.split(',').filter(v => v && v.trim() !== '').map(v => String(v).trim())
      checkboxValue.value = values
    }
    else {
      checkboxValue.value = []
    }
  },
  { immediate: true },
)

// 监听 options 变化
watch(
  () => props.options,
  (newVal) => {
    if (!props.dictType) {
      checkboxOptions.value = newVal || []
    }
  },
  { deep: true },
)

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})
</script>

<template>
  <view class="js-checkbox">
    <wd-checkbox-group
      v-model="checkboxValue"
      :disabled="disabled"
      direction="horizontal"
      @change="handleChange"
    >
      <wd-checkbox
        v-for="(item, index) in checkboxOptions"
        :key="index"
        :name="item[fieldNames.value]"
        type="square"
      >
        {{ item[fieldNames.label] }}
      </wd-checkbox>
    </wd-checkbox-group>
  </view>
</template>

<style scoped>
.js-checkbox {
  width: 100%;
}
</style>
