<template>
	<view class="wrap">
		<u-form class="form" :model="model" :rules="rules" ref="uForm" label-position="left">
			<u-form-item label="编号" prop="id" label-width="180" v-if="model.id">
				<u-input placeholder="请输入编号" v-model="model.id" type="text" maxlength="64"></u-input>
			</u-form-item>
			<u-form-item label="单行文本" prop="testInput" label-width="180">
				<u-input placeholder="请输入单行文本" v-model="model.testInput" type="text" maxlength="200"></u-input>
			</u-form-item>
			<u-form-item label="上传图片（1）" prop="testData_image1" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image1"></js-uploadfile>
			</u-form-item>
			<u-form-item label="上传图片（2）" prop="testData_image2" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image2"></js-uploadfile>
			</u-form-item>
			<u-form-item label="上传图片（3）" prop="testData_image3" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image3"></js-uploadfile>
			</u-form-item>
			<u-form-item label="上传图片（4）" prop="testData_image4" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image4"></js-uploadfile>
			</u-form-item>
			<u-form-item label="上传图片（5）" prop="testData_image5" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image5"></js-uploadfile>
			</u-form-item>
			<u-form-item label="上传图片（6）" prop="testData_image6" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image6"></js-uploadfile>
			</u-form-item>
			<u-form-item label="上传图片（7）" prop="testData_image7" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image7"></js-uploadfile>
			</u-form-item>
			<u-form-item label="上传图片（8）" prop="testData_image8" label-position="top">
				<js-uploadfile @input="updateDataMap" :biz-key="model.id" biz-type="testData_image8"></js-uploadfile>
			</u-form-item>
			<view>==image1: {{dataMap['testData_image1']}}</view>
			<view>==image2: {{dataMap['testData_image2']}}</view>
			<view>==image3: {{dataMap['testData_image3']}}</view>
			<view>==image4: {{dataMap['testData_image4']}}</view>
			<view>==image5: {{dataMap['testData_image5']}}</view>
			<view>==image6: {{dataMap['testData_image6']}}</view>
			<view>==image7: {{dataMap['testData_image7']}}</view>
			<view>==image8: {{dataMap['testData_image8']}}</view>
		</u-form>
		<view class="form-footer">
			<u-button class="btn" type="primary" @click="submit">提交</u-button>
			<!-- <u-button class="btn" type="default" @click="cancel">关闭</u-button> -->
		</view>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
export default {
	data() {
		return {
			model: {
				id: '',
				testInput: '',
				testTextarea: '',
				testSelect: '',
				testSelectMultiple: '',
				testSelectMultipleLabel: '',
				testRadio: '',
				testCheckbox: '',
				testUser: {
					userCode: '',
					userName: ''
				},
				testUser2: {
					userCode: '',
					userName: ''
				},
				testOffice: {
					officeCode: '',
					officeName: ''
				}
			},
			rules: {
				testInput: [
					{
						required: true,
						message: '请输入单行文本',
						trigger: ['change','blur'],
					}
				]
			},
			officeSelectList: [],
			userSelectList: [],
			dataMap: {},
		};
	},
	onLoad(params){
		this.$u.api.testData.form(params).then(res => {
			Object.assign(this.model, res.testData);
			this.$refs.uForm.setRules(this.rules);
			// 机构数据
			this.$u.api.office.treeData().then(res => {
				this.officeSelectList = res;
			});
			// 人员和机构数据
			this.$u.api.office.treeData({isLoadUser: true}).then(res => {
				this.userSelectList = res;
			});
		});
	},
	methods: {
		updateDataMap (data) {
			this.model.dataMap = Object.assign({}, this.model.dataMap, data);
			this.dataMap = this.model.dataMap;
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					// console.log('testData-save: ' + JSON.stringify(this.model));
					this.$u.api.testData.save(this.model).then(res => {
						uni.showModal({
							title: '提示',
							content: res.message,
							showCancel: false,
							success: function () {
								if (res.result == 'true') {
									uni.setStorageSync('refreshList', true);
									uni.navigateBack();
								}
							}
						});
					});
				} else {
					this.$u.toast('您填写的信息有误，请根据提示修正。');
				}
			});
		},
		cancel() {
			uni.navigateBack();
		}
	}
};
</script>
<style lang="scss">

</style>
