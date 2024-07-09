<template>
	<view>
		<uni-list>
			<uni-list-item :show-extra-icon="true" :extra-icon="heart" :show-badge="true" showArrow title="收到的赞"
				:clickable="true" @click="navigateTo('/pages/message/likes/likes')" />
			<uni-list-item :show-extra-icon="true" :extra-icon="chat" :show-badge="true" showArrow title="收到的评论"
				link="navigateTo" to="/pages/message/comments/comments" />
			<uni-list-item :show-extra-icon="true" :extra-icon="star" :show-badge="true" showArrow title="新的关注"
				link="navigateTo" to="/pages/message/follow/follow" />
			<uni-list-item title="宠物卡" note="来聊一聊是什么让你决定养宠物的" :show-extra-icon="true" :extra-icon="chatbox"
				:show-arrow="true" link="navigateTo" to="/pages/pet/card/card"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				heart: {
					color: '#ff0000',
					size: '20',
					type: 'heart-filled', //icon名
				},
				chat: {
					color: '#00aaff',
					size: '20',
					type: 'chat-filled',
				},
				star: {
					color: '#ffff00',
					size: '20',
					type: 'star-filled'
				},
				chatbox: {
					color: '#aa55ff',
					size: '20',
					type: 'chatboxes-filled'
				}
			};
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>
<style>
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}


	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.content {
		flex: 1;
		background-color: #f5f5f5;
	}

	.item {
		display: flex;
		align-items: center;
		padding: 10px;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.icon {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	.arrow {
		margin-left: auto;
		width: 20px;
		height: 20px;
		background: url('/static/pages/news/arrow-30.png') no-repeat center;
		background-size: cover;
	}

	.tab {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.active {
		color: #409eff;
	}
</style>