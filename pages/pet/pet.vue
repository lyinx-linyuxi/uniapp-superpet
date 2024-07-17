<template>
	<view class="container">
		<view class="header">
			<view @click="togglePopup" class="menu-icon">
				<uni-icons type="list" size="25"></uni-icons>
			</view>
			<navigator url="/pages/pet/card/card">
				<text class="centered-bottom-text">我的萌宠</text>
			</navigator>
		</view>
		<view class="section top-section">
			<view class="pet-info">
				<view class="info">
					<text class="name">{{ pet.name }} ({{ pet.breed }})\n</text>
					<text class="detail">年龄：{{pet.age}}\n</text>
					<text class="detail">体重：{{pet.weigh}}\n</text>
					<text class="detail">爱好：{{pet.habit}}</text>
				</view>
				<image src="../../static/pages/index/home/images/greenpet.jpg" class="avatar"></image>
			</view>
		</view>
		<view class="section middle-section">
			<view class="tab-bar">
				<view class="tab-item">
					<text class="count">{{ photoCount }}\n</text>
					<text>写真</text>
				</view>
				<view class="tab-item">
					<text class="count">{{ diaryCount }}\n</text>
					<text>传记</text>
				</view>
				<view class="tab-item">
					<text class="count">{{ healthCount }}\n</text>
					<text>健康</text>
				</view>
			</view>
		</view>
		<view class="section bottom-section">
			<scroll-view scroll-y class="content">
				<view v-for="(post, index) in posts" :key="index" class="timeline-item">
					<view class="date">{{ post.date }}</view>
					<view class="post">
						<text class="title">{{ post.title }}\n</text>
						<text class="subtitle">{{ post.subtitle }}</text>
						<view class="actions">
							<uni-icons :type="post.liked ? 'heart-filled' : 'heart'" size="40"
								:color="post.liked ? 'red' : ''" @click="toggleLike(index)"></uni-icons>
						</view>
					</view>
				</view>
			</scroll-view>
			<button class="fab" @click="goToAddPage">+</button>
		</view>
		<uni-popup ref="popup" type="left">
			<view class="popup-content">
				<text class="popup-header">更多</text>
				<uni-list>
					<uni-list-item title="编辑萌宠卡" clickable link="navigateTo" to="/pages/pet/card/card"
						@click="onClick($event,1)" show-arrow="true" thumb="/static/pages/pet/画笔.png"></uni-list-item>
					<uni-list-item title="换皮肤" clickable link="navigateTo" to="/pages/pet/picstyles/picstyles"
						@click="onClick()" show-arrow="true" thumb="/static/pages/pet/旗帜.png"></uni-list-item>
					<uni-list-item title="保存萌卡图" clickable link="navigateTo" to="/pages/pet/card/card"
						@click="onClick($event,1)" show-arrow="true" thumb="/static/pages/pet/图片.png"></uni-list-item>
					<uni-list-item title="设置" clickable link="navigateTo" to="/pages/pet/card/card"
						@click="onClick($event,1)" show-arrow="true" thumb="/static/pages/pet/齿轮.png"></uni-list-item>
				</uni-list>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				pet: {
					avatar: '/static/pages/index/home/greenpet.jpg',
					name: '旺财',
					breed: '柯基',
					age: '4岁3个月',
					weigh: '100斤',
					habit: '爱吃多拉'
				},
				posts: [{
						date: '8月14日',
						title: '体内驱虫',
						subtitle: '体内驱虫',
						type: 'health',
						liked: false
					},
					{
						date: '8月14日',
						title: '体重1.5千克',
						subtitle: '体内驱虫',
						type: 'health',
						liked: false
					},
					// 添加更多帖子
				]
			}
		},
		computed: {
			photoCount() {
				return this.posts.filter(post => post.type === 'photo').length;
			},
			diaryCount() {
				return this.posts.filter(post => post.type === 'diary').length;
			},
			healthCount() {
				return this.posts.filter(post => post.type === 'health').length;
			}
		},
		methods: {
			goToPetCardPage() {
				uni.navigateTo({
					url: '/pages/pet/card/card'
				});
			},
			goToAddPage() {
				uni.navigateTo({
					url: '/pages/pet/add/add'
				});
			},
			toggleLike(index) {
				this.posts[index].liked = !this.posts[index].liked;
			},
			navigateBack() {
				uni.navigateBack();
			},
			togglePopup() {
				this.$refs.popup.open();
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.header {
		width: 100%;
		position: fixed;
		top: 0px;
		z-index: 9999;
		background-color: #FFD3D3;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.menu-icon {
		position: absolute;
		left: 15px;
		top: 17.5px;
	}

	.centered-bottom-text {
		text-align: center;
	}

	.section {
		margin-top: 60px;
		width: 100%;
	}

	.top-section {
		display: flex;
		background-color: #FFD3D3;
		padding-top: 15px;
		padding-bottom: 15px;
		justify-content: center;
	}

	.pet-info {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background-color: #fff;
		padding: 15px;
		border-radius: 10px;
		width: 350px;
		height: 100px;
	}

	.info {
		flex: 1;
		margin-right: 5px;
	}

	.name {
		font-weight: bold;
		font-size: 20px;
		/* 增大字体大小 */
	}

	.detail {
		color: #555;
		font-size: 14px;
		margin-top: 5px;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.middle-section {
		background-color: #fff;
		padding: 10px 0;
	}

	.tab-bar {
		display: flex;
		justify-content: space-around;
	}

	.tab-item {
		text-align: center;
		flex: 1;
		font-weight: bold;
	}

	.count {
		font-size: 18px;
		color: #FF69B4;
		margin-bottom: 5px;
	}

	.bottom-section {
		background-color: #F5F5F5;
		flex: 1;
		position: relative;
	}

	.content {
		flex: 1;
		margin-top: 10px;
	}

	.timeline-item {
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
	}

	.date {
		margin-left: 20px;
		text-align: left;
		/* 调整日期位置 */
		color: #FF69B4;
		font-size: 14px;
		margin-bottom: 5px;
	}

	.post {
		flex: 1;
		background-color: #fff;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.title {
		font-weight: bold;
	}

	.subtitle {
		color: #888;
		font-size: 14px;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
	}

	.like {
		font-size: 20px;
		color: #FF69B4;
	}

	.fab {
		position: fixed;
		right: 20px;
		bottom: 60px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #32CD32;
		color: #fff;
		font-size: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.popup-content {
		padding: 70px 15px 15px;
		/* 调整内容位置 */
		background-color: #fff;
		height: 100%;
		width: 200px;
	}

	.popup-header {
		position: absolute;
		left: 15px;
		top: 50px;
	}

	.popup-item {
		display: flex;
		align-items: center;
		height: 50px;
		padding: 10px 0;
	}
</style>