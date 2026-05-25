<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { officeTreeData } from '@/api/sys/office'
import { testDataForm, testDataSave } from '@/api/test/testData'

defineOptions({
  name: 'TestDataForm',
})

const { t } = useI18n()

definePage({
  style: {
    navigationBarTitleText: '%testData.form%',
  },
  excludeLoginPath: true,
})

// 表单引用
const formRef = ref<any>()

// 表单数据
const model = ref({
  id: '',
  testInput: '',
  testTextarea: '',
  testSelect: '',
  testRadio: '',
  testCheckbox: '',
  testDate: null,
  testDatetime: null,
  testUser: {
    userCode: '',
    userName: '',
  },
  testUser2: {
    userCode: '',
    userName: '',
  },
  testOffice: {
    officeCode: '',
    officeName: '',
  },
  dataMap: {},
  isNewRecord: false,
  __t: 0,
})

// 表单规则
const schema = {
  validate(model: any) {
    const errors = []
    if (!model.testInput) {
      errors.push({ path: ['testInput'], message: '请输入单行文本' })
    }
    return errors
  },
  isRequired(path: string) {
    return path === 'testInput'
  },
}

// 机构和人员选择列表
const officeSelectList = ref<any[]>([])
const userSelectList = ref<any[]>([])

// 加载表单数据
onLoad(async (params: any) => {
  const res = await testDataForm(params)
  Object.assign(model.value, res.testData)
  model.value.__t = new Date().getTime()

  // 加载机构数据
  officeSelectList.value = await officeTreeData()
  // 加载人员和机构数据
  userSelectList.value = await officeTreeData({ isLoadUser: true })
})

/**
 * 提交表单数据
 */
async function handleSubmit() {
  const { valid } = await formRef.value.validate()
  if (!valid) {
    uni.showToast({ title: '您填写的信息有误，请根据提示修正。', icon: 'none' })
    return
  }
  try {
    const params = {
      isNewRecord: model.value.isNewRecord,
      id: model.value.id,
    }
    const res = await testDataSave(params, model.value)
    uni.showModal({
      title: '提示',
      content: res.message,
      showCancel: false,
      success: () => {
        if (res.result === 'true') {
          uni.setStorageSync('refreshList', true)
          uni.navigateBack()
        }
      },
    })
  }
  catch (error) {
    console.error('保存失败: ', error)
  }
}
</script>

<template>
  <view class="form-page">
    <wd-form ref="formRef" :model="model" :schema="schema" :hide-cancel="true">
      <!-- 编号 -->
      <wd-form-item v-if="model.id" prop="id" title="编号">
        <wd-input
          v-model="model.id"
          :maxlength="64"
          placeholder="请输入编号"
        />
      </wd-form-item>

      <!-- 单行文本 -->
      <wd-form-item prop="testInput" title="单行文本">
        <wd-input
          v-model="model.testInput"
          :maxlength="200"
          placeholder="请输入单行文本"
          required
        />
      </wd-form-item>

      <!-- 多行文本 -->
      <wd-form-item prop="testTextarea" title="多行文本">
        <wd-textarea
          v-model="model.testTextarea"
          :maxlength="500"
          placeholder="请输入多行文本"
          :auto-height="true"
          rows="3"
        />
      </wd-form-item>

      <!-- 下拉框 -->
      <wd-form-item prop="testSelect" title="下拉框">
        <js-select
          v-model="model.testSelect"
          dict-type="sys_menu_type"
          placeholder="请选择选项"
          :multiple="false"
        />
      </wd-form-item>

      <!-- 单选框 -->
      <wd-form-item prop="testRadio" title="单选框">
        <js-radio
          v-model="model.testRadio"
          dict-type="sys_menu_type"
        />
      </wd-form-item>

      <!-- 复选框 -->
      <wd-form-item prop="testCheckbox" title="复选框">
        <js-checkbox
          v-model="model.testCheckbox"
          dict-type="sys_menu_type"
        />
      </wd-form-item>

      <!-- 日期选择 -->
      <wd-form-item prop="testDate" title="日期选择">
        <js-datetime
          v-model="model.testDate"
          placeholder="请选择日期"
          type="date"
        />
      </wd-form-item>

      <!-- 日期时间 -->
      <wd-form-item prop="testDatetime" title="日期时间">
        <js-datetime
          v-model="model.testDatetime"
          placeholder="请选择日期时间"
          type="datetime"
        />
      </wd-form-item>

      <!-- 机构选择 -->
      <wd-form-item prop="testOffice.officeCode" title="机构选择">
        <js-tree-select
          v-model="model.testOffice.officeCode"
          v-model:label-value="model.testOffice.officeName"
          :tree-data="officeSelectList"
          placeholder="请选择机构"
        />
      </wd-form-item>

      <!-- 人员选择 -->
      <wd-form-item prop="testUser.userCode" title="人员选择">
        <js-tree-select
          v-model="model.testUser.userCode"
          v-model:label-value="model.testUser.userName"
          :tree-data="userSelectList"
          placeholder="请选择人员"
        />
      </wd-form-item>

      <!-- 上传图片 -->
      <wd-form-item prop="dataMap" title="上传图片">
        <js-upload v-model="model.dataMap" :biz-key="model.id" biz-type="testData_image" upload-type="image" :load-time="model.__t" />
      </wd-form-item>
      <!-- 上传文件 -->
      <wd-form-item prop="dataMap" title="上传文件">
        <js-upload v-model="model.dataMap" :biz-key="model.id" biz-type="testData_file" upload-type="all" :load-time="model.__t" />
      </wd-form-item>
    </wd-form>

    <view class="form-footer">
      <view class="button">
        <wd-button block type="primary" @click="handleSubmit">
          {{ t('common.save') }}
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
