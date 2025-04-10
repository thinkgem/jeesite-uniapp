<template>
	<view class="wrap">
		<view class="article-title">软件使用隐私保护须知</view>
		<view class="article-content">
			1.我们将逐一说明我们收集的你的个人信息类型及其对应的用途，以便你了解我们针对某一特定功能所收集的具体个人信息的类别、使用理由及收集方式。
			</p><p>
			2.当你使用某些功能时，我们会在获得你的同意后，收集你的敏感个人信息。除非按照相关法律法规要求必须收集，拒绝提供这些信息仅会使你无法使用相关特定功能，但不影响你正常使用软件的其他功能。
			</p><p>
			3.我们不会主动共享或转让你的个人信息至我们外的第三方。如存在其他共享或转让你的个人信息，或你需要我们将你的个人信息共享或转让至我们外的第三方情形时，我们会直接征得或确认第三方征得你对上述行为的明示同意，但法律法规另有规定或因保护用户权益或保护软件生态安全需要除外。此外，我们会对对外提供信息的行为进行风险评估。
			</p><p>
			4.我们不会主动从我们外的第三方获取你的个人信息。如为业务发展需要从第三方获取你的个人信息，我们会依法核实来源的合法性，或在获取前向你明示你个人信息的来源、类型及使用范围，如软件开展业务需进行的个人信息处理活动超出你原本向第三方提供个人信息时的授权同意范围，我们将在处理你的该等个人信息前，征得你的明示同意；此外，我们也将会严格遵守相关法律法规的规定，并要求第三方保障其提供的信息的合法性。
			</p><p>
			5.你可以通过本指引所列途径及方式查阅、更正、复制、删除你的个人信息，也可以撤回同意、注销账号、投诉举报以及设置个性化广告等隐私功能。
			</p><p>
			6.为了在本指引下收集你的信息，或者向你提供服务、优化我们的服务以及保障你的账号安全，我们将需要向你索取相关的权限；其中的敏感权限例如通讯录、位置、摄像头、麦克风、相册等均不会默认开启，只有在你明确同意后我们才会在你同意的范围内调用或使用。对你已经向我们授权的该等权限，你也可以在“我—设置—个人信息与权限—系统权限管理”中查询我们已调用或使用的系统权限类型、使用目的，并进行统一管理。
			</p><p>
			需要特别说明的是，我们获得具体某一项敏感权限并不代表我们必然会收集你的相关信息；即使我们已经获得敏感权限，也仅在必要范围内，并在你使用相关的服务或功能期间根据本指引来收集你的相关信息。
			</p>
		</view>
		<view class="u-p-t-5"></view>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
export default {
	data() {
		return {};
	},
	onLoad() {
		
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>
<style lang="scss">
page {
	background-color: #f8f8f8;
}
.article-title {
	font-size: 38rpx;
	font-weight: 400;
	text-align: center;
	padding-bottom: 30rpx;
	margin: 30rpx;
	border-bottom: 1px solid #c0c4cb;
	color: #51a0d5;
}
.article-meta {
	padding: 10rpx 50upx 30rpx;
	color: gray;
}
.article-content {
	padding: 0 30upx;
	overflow: hidden;
	font-size: 30rpx;
	line-height: 50rpx;
	margin-bottom: 30rpx;
	text-indent: 60rpx;
	p {
		margin-bottom: 20rpx;
	}
}
</style>
