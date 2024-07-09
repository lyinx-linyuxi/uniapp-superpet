<template>
	<view class="container">
		<view class="header">
			<image class="avatar" src="/static/pages/index/home/images/1.png"></image>
			<view class="user-info">
				<text class="username">我是你爹</text>
				<text class="pet-num">有好多个宠物</text>
			</view>
			<button class="update-avatar" plain="true" size="default">
				<uni-icons type="person" size="20"></uni-icons>
				更新头像
			</button>
		</view>

		<view class="list">
			<uni-list>
				<uni-list-item :show-extra-icon="true" :extra-icon="star" :show-badge="true" showArrow title="我的关注"
					link="navigateTo" to="/pages/message/follow/follow" />
				<uni-list-item :show-extra-icon="true" :extra-icon="heart" :show-badge="true" showArrow title="我赞过的"
					:clickable="true" @click="navigateTo('/pages/message/likes/likes')" />
			</uni-list>
		</view>

		<view class="list">
			<uni-list>
				<uni-list-item :showExtraIcon="true" :extra-icon="flag" :show-badge="true" showArrow title="关于"
					link="navigateTo" to="/pages/message/follow/follow"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>


<script>
	export default {
		components: {},
		data() {
			return {
				heart: {
					color: '#000000',
					size: '20',
					type: 'heart', //icon名
				},
				star: {
					color: '#000000',
					size: '20',
					type: 'star'
				},
				flag:{
					color: '#000000',
					size: '20',
					type: 'flag'
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
	.header {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.avatar {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-right: 10px;
	}

	.user-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.username {
		font-size: 16px;
		font-weight: bold;
	}

	.pet-num {
		font-size: 14px;
		color: #888;
	}

	.update-avatar {
		background-color: #f0f0f0;
		border: none;
		border-radius: 25px;
		font-size: 12px;
	}

	.list {
		margin-top: 10px;
	}
</style>