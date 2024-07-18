<template>
	<view class="container">
		<view class="list">
			<uni-list>
				<uni-list-item :show-extra-icon="true" :show-badge="true" showArrow title="账号资料"
					link="navigateTo" to="/pages/mine/setting/userinfo/userinfo" />
				<uni-list-item :show-extra-icon="true" :show-badge="true" showArrow title="修改密码"
					:clickable="true" @click="navigateTo('/pages/mine/setting/change_pwd/change_pwd')" />
				<uni-list-item :showExtraIcon="true" :show-badge="true" showArrow title="绑定邮箱"
					link="navigateTo" to="/pages/mine/about/about"></uni-list-item>
				<uni-list-item :showExtraIcon="true" :show-badge="true" showArrow title="绑定手机号"
					link="navigateTo" to="/pages/mine/about/about"></uni-list-item>
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
	} from '../../../global/userinfo';
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