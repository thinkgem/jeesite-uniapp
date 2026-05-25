<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
defineOptions({
  name: 'JsAddButton',
})

const props = withDefaults(defineProps<Props>(), {
  bottom: '50rpx',
  right: '50rpx',
  size: 40,
  color: '#3d87ff',
})

const emit = defineEmits<{
  click: []
}>()

interface Props {
  bottom?: string
  right?: string
  size?: number
  color?: string
}

function handleClick() {
  emit('click')
}
</script>

<template>
  <view
    class="js-add-button"
    :style="{ bottom, right }"
    @click="handleClick"
  >
    <js-icon icon="i-carbon-add" :size="size" color="#fff" />
  </view>
</template>

<style lang="scss" scoped>
.js-add-button {
  position: fixed;
  z-index: 10;
  opacity: 0.6;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid v-bind(color);
  border-radius: 50%;
  background: v-bind(color);

  .js-icon {
    color: #fff;
  }

  &:active {
    opacity: 1;
  }
}
</style>
