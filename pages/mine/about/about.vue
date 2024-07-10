<template>
	<view class="container">
		<view class="avatar">
			<image src="/static/pages/userinfo/about/images/logo3.png" class="pic"></image>
		</view>
		<view class="title">小伴</view>

		<view class="content">‘小伴’ 是一款为爱宠用户提供名片生成，专属相册宠物介绍，宠物科普等功能的小程序。</view>
		<view class="content m40">
			我们希望每一只宠物都有自己专属的名片，保存每一只宠物的资料，同时也希望每一位主人能够科学的饲养，有责任心，陪它们度过完美的一生，相信有你们的支持，我们一定可以让人与动物的关系变得更美好。</view>
		<view class="text">
			<text>微信：jsh_2912257030</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding-top: 20px;
		display: flex;
		height: 100%;
		width: 100%;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.avatar {
		width: 64px;
		height: 64px;
		align-items: center;
	}

	.pic {
		text-align: center;
		display: block;
		width: 64px;
		height: 64px;
	}

	.title {
		color: #ffc3c3;
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 40px;
	}

	.content {
		width: 80%;
		text-align: justify;
		text-indent: 2em;
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	.text{
		width: 100%;
		text-indent: 2em;
		margin-top: 40px;
		text-align: left;
		color: darkgrey;
	}
</style>