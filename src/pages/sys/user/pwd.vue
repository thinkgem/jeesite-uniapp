<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { userInfoSavePwd } from '@/api/sys/user'
import { btoa } from '@/utils/base64'

defineOptions({
  name: 'UserPwd',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%user.pwd%',
  },
  excludeLoginPath: true,
})

// 表单引用
const formRef = ref<any>()

// 表单数据
const model = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

// Base64 编码函数（支持 Unicode）
function base64Encode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
}

// 表单规则
const rules = {
  oldPassword: [
    {
      required: true,
      message: t('pwd.enterOldPassword'),
    },
  ],
  newPassword: [
    {
      required: true,
      message: t('pwd.enterNewPassword'),
    },
    {
      validator: (value: string) => {
        // 需同时含有字母和数字，长度在6-12之间
        return /^(?!\d+$)(?![a-z]+$)[a-z\d]{6,12}$/i.test(value)
      },
      message: t('pwd.passwordRule'),
    },
  ],
  confirmNewPassword: [
    {
      required: true,
      message: t('pwd.enterConfirmPassword'),
    },
    {
      validator: (value: string) => {
        return value === model.value.newPassword
      },
      message: t('pwd.notMatch'),
    },
  ],
}

/**
 * 提交表单
 */
async function handleSave() {
  try {
    await formRef.value?.validate()

    const res = await userInfoSavePwd({
      oldPassword: base64Encode(model.value.oldPassword),
      newPassword: base64Encode(model.value.newPassword),
      confirmNewPassword: base64Encode(model.value.confirmNewPassword),
    })

    uni.showModal({
      title: t('pwd.hint'),
      content: (res as any).message,
      showCancel: false,
      success: () => {
        if ((res as any).result === 'true') {
          uni.navigateBack()
        }
      },
    })
  }
  catch (error) {
    uni.showToast({
      title: t('pwd.formError'),
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="wrap">
    <!-- 表单 -->
    <wd-form ref="formRef" :model="model" :rules="rules" :border="true">
      <wd-form-item :title="$t('pwd.oldPassword')" prop="oldPassword">
        <wd-input
          v-model="model.oldPassword"
          :placeholder="$t('pwd.enterOldPassword')"
          :show-password="true"
          clearable
        />
      </wd-form-item>

      <wd-form-item :title="$t('pwd.newPassword')" prop="newPassword">
        <wd-input
          v-model="model.newPassword"
          :placeholder="$t('pwd.enterNewPassword')"
          :show-password="true"
          clearable
        />
      </wd-form-item>

      <wd-form-item :title="$t('pwd.confirmPassword')" prop="confirmNewPassword">
        <wd-input
          v-model="model.confirmNewPassword"
          :placeholder="$t('pwd.enterConfirmPassword')"
          :show-password="true"
          clearable
        />
      </wd-form-item>
    </wd-form>

    <!-- 底部按钮 -->
    <view class="form-footer">
      <wd-button type="primary" block @click="handleSave">
        {{ $t('common.save') }}
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
