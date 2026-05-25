<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { userIndex, userInfoSaveBase } from '@/api/sys/user'
import { useConfig } from '@/hooks/useConfig'
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'UserInfo',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%user.info%',
  },
  excludeLoginPath: true,
})

const userStore = useUserStore()
const config = useConfig()

// 表单引用
const formRef = ref<any>()

// 表单数据
const model = ref({
  userName: '',
  sex: '1',
  email: '',
  mobile: '',
  phone: '',
  sign: '',
  lastLoginDate: '',
  lastLoginIp: '',
})

// 头像 base64
const avatarBase64 = ref('')

// 是否显示裁剪器
const showCropper = ref(false)

// 待裁剪的图片路径
const cropImageUrl = ref('')

// 原始用户数据（用于保存时对比）
const originalUserData = ref<any>(null)

// 表单规则
const rules = {
  userName: [
    {
      required: true,
      message: t('info.enterNickname'),
    },
    {
      min: 2,
      max: 32,
      message: t('info.enterNickname'),
    },
  ],
  mobile: [
    {
      validator: (value: string) => {
        if (!value)
          return true
        return /^1[3-9]\d{9}$/.test(value)
      },
      message: t('info.enterMobile'),
    },
  ],
}

// 头像 URL
const avatarUrl = computed(() => {
  if (avatarBase64.value) {
    return avatarBase64.value
  }

  // 优先使用登录信息中的头像
  let url = userStore.userInfo?.avatarUrl || '/static/images/default-avatar.png'

  // 如果包含 /ctxPath/，替换为当前服务器地址
  if (url.includes('/ctxPath/')) {
    const baseUrl = config.getBaseUrl()
    url = url.replace('/ctxPath/', `${baseUrl}/`)
  }

  return url
})

/**
 * 加载用户信息
 */
onLoad(() => {
  loadUserInfo()
})

/**
 * 加载用户信息
 */
async function loadUserInfo() {
  try {
    const res: any = await userIndex()

    if (res.result === 'true') {
      // 保存原始用户数据
      originalUserData.value = res.user

      // 映射用户信息到表单
      model.value = {
        userName: res.user.userName || '',
        sex: res.user.sex || '1',
        email: res.user.email || '',
        mobile: res.user.mobile || '',
        phone: res.user.phone || '',
        sign: res.user.sign || '',
        lastLoginDate: res.user.lastLoginDate || '',
        lastLoginIp: res.user.lastLoginIp || '',
      }

      console.log('用户信息加载成功', model.value)
    }
    else if (res.result === 'login') {
      uni.reLaunch({
        url: '/pages/sys/login/index',
      })
    }
    else {
      uni.showToast({
        title: res.message || t('info.saveFailed'),
        icon: 'none',
      })
    }
  }
  catch (error) {
    console.error('加载用户信息失败', error)
    uni.showToast({
      title: t('info.saveFailed'),
      icon: 'none',
    })
  }
}

/**
 * 选择头像
 */
function chooseAvatar() {
  // 使用 uni-app 原生 API 选择图片
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      // 设置待裁剪图片并显示裁剪器
      cropImageUrl.value = tempFilePath
      showCropper.value = true
    },
    fail: (err) => {
      console.error('选择图片失败', err)
      uni.showToast({
        title: t('info.saveFailed'),
        icon: 'none',
      })
    },
  })
}

/**
 * 裁剪成功回调
 */
function onCropSuccess(event: { tempFilePath: string }) {
  console.log('裁剪成功回调数据:', event)

  const { tempFilePath } = event

  if (tempFilePath) {
    avatarBase64.value = tempFilePath
    // 如果不是 base64 格式，需要转换
    if (avatarBase64.value !== '' && !avatarBase64.value.startsWith('data:')) {
      // #ifdef APP-PLUS
      const fileUrl = avatarBase64.value
      ;(plus as any).io.resolveLocalFileSystemURL(fileUrl, (entry: any) => {
        entry.file((file: any) => {
          const fileReader = new (plus as any).io.FileReader()
          fileReader.onload = (data: any) => {
            avatarBase64.value = data.target.result
          }
          fileReader.onerror = (error: any) => {
            console.error('读取文件失败', error)
          }
          fileReader.readAsDataURL(file)
        }, (error: any) => {
          console.error('获取文件失败', error)
        })
      }, (error: any) => {
        console.error('解析文件路径失败', error)
      })
      // #endif
      // #ifndef APP-PLUS
      try {
        const base64Data = uni.getFileSystemManager().readFileSync(avatarBase64.value, 'base64')
        avatarBase64.value = `data:image/jpeg;base64,${base64Data}`
      }
      catch (error) {
        console.error('读取图片文件失败', error)
        uni.showToast({
          title: t('info.saveFailed'),
          icon: 'none',
        })
      }
      // #endif
    }
    showCropper.value = false
  }
  else {
    console.error('裁剪成功但未获取到图片路径', event)
    uni.showToast({
      title: t('info.saveFailed'),
      icon: 'none',
    })
  }
}

/**
 * 裁剪取消回调
 */
function onCropCancel() {
  showCropper.value = false
}

/**
 * 提交表单
 */
async function handleSave() {
  try {
    await formRef.value?.validate()

    const data = { ...model.value }

    // 添加头像数据
    if (avatarBase64.value) {
      ;(data as any).avatarBase64 = avatarBase64.value
    }

    const res: any = await userInfoSaveBase(data)

    if (res.result === 'true') {
      uni.showToast({
        title: res.message || t('info.saveSuccess'),
        icon: 'success',
      })

      // 重新加载用户信息
      // setTimeout(() => {
      //   loadUserInfo()
      // }, 1000)
      uni.navigateTo({ url: '/pages/sys/user/index' })
    }
    else {
      uni.showModal({
        title: t('pwd.hint'),
        content: res.message || t('info.saveFailed'),
        showCancel: false,
      })
    }
  }
  catch (error) {
    console.error('表单验证失败', error)
    uni.showToast({
      title: t('info.formError'),
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="wrap">
    <!-- 头像区域 -->
    <view class="image flex flex-col items-center justify-center pt-30rpx">
      <image :src="avatarUrl" mode="aspectFill" class="h-240rpx w-240rpx rounded-full" />
      <wd-button size="medium" round class="my-30rpx" @click="chooseAvatar">
        {{ $t('info.selectAvatar') }}
      </wd-button>
    </view>

    <!-- 图片裁剪器 -->
    <wd-img-cropper
      v-model="showCropper"
      :img-src="cropImageUrl"
      :quality="0.8"
      file-type="png,jpg,jpeg"
      :width="200"
      :height="200"
      circular
      @confirm="onCropSuccess"
      @cancel="onCropCancel"
    />

    <!-- 表单 -->
    <wd-form ref="formRef" :model="model" :rules="rules" :title-width="100">
      <wd-form-item :title="$t('info.nickname')" prop="userName">
        <wd-input
          v-model="model.userName"
          :placeholder="$t('info.enterNickname')"
          clearable
        />
      </wd-form-item>

      <wd-form-item :title="$t('info.gender')" prop="sex">
        <wd-radio-group v-model="model.sex" shape="dot" class="flex gap-20rpx">
          <wd-radio value="1">
            {{ $t('info.male') }}
          </wd-radio>
          <wd-radio value="2">
            {{ $t('info.female') }}
          </wd-radio>
          <wd-radio value="0">
            {{ $t('info.unknown') }}
          </wd-radio>
        </wd-radio-group>
      </wd-form-item>

      <wd-form-item :title="$t('info.email')" prop="email">
        <wd-input
          v-model="model.email"
          :placeholder="$t('info.enterEmail')"
          clearable
        />
      </wd-form-item>

      <wd-form-item :title="$t('info.mobile')" prop="mobile">
        <wd-input
          v-model="model.mobile"
          :placeholder="$t('info.enterMobile')"
          type="number"
          :maxlength="11"
          clearable
        />
      </wd-form-item>

      <wd-form-item :title="$t('info.phone')" prop="phone">
        <wd-input
          v-model="model.phone"
          :placeholder="$t('info.enterPhone')"
          clearable
        />
      </wd-form-item>

      <wd-form-item :title="$t('info.sign')" prop="sign">
        <wd-textarea
          v-model="model.sign"
          :placeholder="$t('info.enterSign')"
          auto-height
          :maxlength="50"
          show-word-limit
        />
      </wd-form-item>

      <wd-form-item :title="$t('info.lastLoginTime')" :border="true">
        {{ model.lastLoginDate }}
      </wd-form-item>

      <wd-form-item :title="$t('info.lastLoginAddress')">
        {{ model.lastLoginIp }}
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
  padding-bottom: 120rpx;
}

.image {
  background-color: #fff;
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
