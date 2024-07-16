<template>
	<view class="container">
		<view class="header">
			<image  class="avatar" :src='user.getProperty("headshotUrl")' mode="aspectFill" lazy-load></image>
			<view class="user-info">
				<text class="username">{{user.getProperty("username")}}</text>
				<text class="pet-num">有{{user.getProperty("petNum")}}个宠物</text>
			</view>
			<view @click="changeimage">
				<button class="update-avatar" plain="true" size="default">
					<uni-icons type="person" size="20"></uni-icons>
					更改头像
				</button>
			</view>
		</view>

		<view class="list">
			<uni-list>
				<uni-list-item :show-extra-icon="true" :extra-icon="star" :show-badge="true" showArrow title="我的关注"
					link="navigateTo" to="/pages/message/follow/follow" />
				<uni-list-item :show-extra-icon="true" :extra-icon="heart" :show-badge="true" showArrow title="我赞过的"
					:clickable="true" @click="navigateTo('/pages/mine/favours/favours')" />
			</uni-list>
		</view>

		<view class="list">
			<uni-list>
				<uni-list-item :showExtraIcon="true" :extra-icon="flag" :show-badge="true" showArrow title="关于"
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
	import { currentUser } from '../../global/userinfo';
	export default {
		components: {},
		data() {
			return {
				user: currentUser,
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
				flag: {
					color: '#000000',
					size: '20',
					type: 'flag'
				},
				type: 'center'
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			onConfirm(e){
				this.pickerText=JSON.stringify(e.label)
				console.log(this.pickerText);
			},
			openPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			changeimage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //压缩图
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(res.tempFilePaths);
						this.user.updateProperty("headshot_url", res.tempFilePaths[0]);
					}
				});
			
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
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