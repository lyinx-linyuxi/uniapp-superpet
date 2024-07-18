<template>
	<view class="container">
		<view class="list">
			<uni-list>
				<uni-list-item class="item" title="昵称" :rightText="user.getProperty('username')||'未设置'" link>
				</uni-list-item>
				<uni-list-item class="item" title="性别" :rightText="user.getProperty('gender')||'未设置'" link>
				</uni-list-item>
				<uni-list-item class="item" title="邮箱" :rightText="user.getProperty('email')||'未绑定'" link>
				</uni-list-item>
				<uni-list-item class="item" title="手机号" :rightText="user.getProperty('phone')||'未绑定'" link>
				</uni-list-item>
				<uni-list-item class="item" title="宠物数量" :rightText="user.getProperty('petNum')||'无宠物'" link>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
	<!-- <view>
		<uni-popup ref="share" type="share" backgroundColor="#fff">
			<uni-popup-share></uni-popup-share>
		</uni-popup>
	</view> -->
</template>


<script>
	import {
		currentUser
	} from '../../../../global/userinfo';
	export default {
		components: {},
		data() {
			return {
				user: currentUser,
			};
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>



<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

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