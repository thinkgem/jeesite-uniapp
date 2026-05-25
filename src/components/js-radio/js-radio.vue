<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { dictTreeData } from '@/api/sys/login'

interface Props {
  modelValue?: string | number | boolean
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
  'update:modelValue': [value: string | number | boolean]
}>()

// 单选框的值
const radioValue = ref<string | number | boolean>('')

// 单选框的列表数据
const radioOptions = ref<Array<Record<string, any>>>([])

/**
 * 加载数据
 */
async function loadData() {
  if (props.dictType) {
    try {
      const res: any = await dictTreeData({ dictType: props.dictType })
      radioOptions.value = res || []
    }
    catch (error) {
      console.error('加载字典数据失败:', error)
    }
  }
  else {
    radioOptions.value = props.options || []
  }
}

/**
 * 值变化处理
 */
function handleChange() {
  const value = radioValue.value
  const result = value !== '' && value !== false && value !== null ? String(value) : ''
  emit('update:modelValue', result)
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    // 将逗号分隔的字符串转换为数组，并过滤空值
    if (newVal && typeof newVal === 'string' && newVal.trim() !== '') {
      radioValue.value = String(newVal)
    }
    else {
      radioValue.value = ''
    }
  },
  { immediate: true },
)

// 监听 options 变化
watch(
  () => props.options,
  (newVal) => {
    if (!props.dictType) {
      radioOptions.value = newVal || []
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
  <view class="js-radio">
    <wd-radio-group
      v-model="radioValue"
      :disabled="disabled"
      direction="horizontal"
      @change="handleChange"
    >
      <wd-radio
        v-for="(item, index) in radioOptions"
        :key="index"
        :value="item[fieldNames.value]"
        type="dot"
      >
        {{ item[fieldNames.label] }}
      </wd-radio>
    </wd-radio-group>
  </view>
</template>

<style scoped>
.js-radio {
  width: 100%;
}
</style>
