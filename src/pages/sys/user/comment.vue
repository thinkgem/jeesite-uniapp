<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { commentSave } from '@/api/sys/user'

defineOptions({
  name: 'UserComment',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%user.comment%',
  },
})

// 表单引用
const formRef = ref<any>()

// 表单数据
const model = ref({
  id: '',
  category: '',
  content: '',
  contact: '',
  deviceInfo: '',
})

// 是否同意条款
const terms = ref(false)

// 表单规则
const schema = {
  validate(model: any) {
    const errors = []
    if (!model.category) {
      errors.push({ path: ['category'], message: t('comment.selectCategory') })
    }
    if (!model.content) {
      errors.push({ path: ['content'], message: t('comment.contentPlaceholder') })
    }
    else if (model.content.length < 10 || model.content.length > 500) {
      errors.push({ path: ['content'], message: t('comment.contentLengthError') })
    }
    return errors
  },
  isRequired(path: string) {
    return path === 'category' || path === 'content'
  },
}

/**
 * 获取设备信息
 */
onMounted(() => {
  uni.getSystemInfo({
    success: (res) => {
      model.value.deviceInfo = JSON.stringify(res)
    },
  })
})

/**
 * 提交表单
 */
async function handleSubmit() {
  if (!terms.value) {
    uni.showToast({
      title: t('comment.readPrivacy'),
      icon: 'none',
    })
    return
  }

  try {
    const { valid } = await formRef.value.validate()
    if (!valid) {
      uni.showToast({ title: t('comment.formError'), icon: 'none' })
      return
    }

    const res: any = await commentSave(model.value)

    uni.showModal({
      title: t('pwd.hint'),
      content: res.message,
      showCancel: false,
      success: () => {
        if (res.result === 'true') {
          uni.navigateBack()
        }
      },
    })
  }
  catch (error) {
    uni.showToast({
      title: t('comment.formError'),
      icon: 'none',
    })
  }
}

/**
 * 打开隐私条款
 */
function openTerms() {
  uni.navigateTo({
    url: '/pages/sys/login/terms',
  })
}
</script>

<template>
  <view class="wrap">
    <!-- 表单 -->
    <wd-form ref="formRef" :model="model" :schema="schema" label-position="top" :border="true" custom-class="comment-form">
      <wd-form-item :title="$t('comment.category')" prop="category">
        <js-select
          v-model="model.category"
          :placeholder="$t('comment.selectCategory')"
          dict-type="app_comment_category"
        />
      </wd-form-item>

      <wd-form-item :title="$t('comment.content')" prop="content">
        <wd-textarea
          v-model="model.content"
          :placeholder="$t('comment.contentPlaceholder')"
          :maxlength="500"
          :autosize="{ minHeight: 200, maxHeight: 300 }"
        />
      </wd-form-item>

      <wd-form-item :title="$t('comment.uploadImage')">
        <js-upload v-model="model" biz-type="appComment_image" :max-count="3" />
      </wd-form-item>

      <wd-form-item :title="$t('comment.contact')" prop="contact">
        <wd-input
          v-model="model.contact"
          :placeholder="$t('comment.contactPlaceholder')"
          :maxlength="200"
          clearable
        />
      </wd-form-item>
    </wd-form>

    <!-- 协议勾选 -->
    <view class="agreement">
      <wd-checkbox v-model="terms">
        {{ $t('comment.agreeTerms') }}
      </wd-checkbox>
      <text class="link" @click="openTerms">{{ $t('comment.privacyPolicy') }}</text>
    </view>

    <!-- 底部按钮 -->
    <view class="form-footer">
      <wd-button type="primary" block @click="handleSubmit">
        {{ $t('comment.submit') }}
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background-color: #f8f8f8;
  // padding-bottom: 120rpx;
}

:deep(.wd-form.comment-form) {
  > .wd-cell.wd-form-item > .wd-cell__wrapper {
    flex-direction: column;
    align-items: flex-start;
    display: block;

    > .wd-cell__left {
      min-width: 100% !important;
      max-width: 100% !important;
      margin-bottom: 16rpx;
      text-align: left;
    }

    > .wd-cell__right {
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
}

.agreement {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30rpx;
  color: #666;
  padding: 20rpx 0;

  .link {
    color: #2979ff;
    margin-left: 10rpx;
  }
}

.form-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 30rpx;
  background-color: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}
</style>
