<template>
	<view class="container">
		<view class="tab-bar">
			<view :class="{'active-tab': activeTab === 'follow'}" @click="switchTab('follow')">关注</view>
			<view :class="{'active-tab': activeTab === 'circle'}" @click="switchTab('circle')">宠物圈</view>
		</view>
		<scroll-view scroll-y class="content">
			<view v-if="activeTab === 'follow'">
				<view class="post" v-for="(post, index) in followPosts" :key="index">
					<view class="user-info">
						<image :src="post.avatar" class="avatar"></image>
						<view class="info">
							<text class="username">{{ post.username }}</text>
							<text class="time">{{ post.time }}</text>
						</view>
					</view>
					<text class="content">{{ post.content }}</text>
					<image :src="post.image" class="post-image"></image>
					<view class="actions">
						<view class="action" @click="likePost">
							<uni-icons :type="liked ? 'heart-filled' : 'heart'" size="14" color="#999"></uni-icons>
							<text> {{ post.likes }}</text>
						</view>
						<view class="action" @click="toggleComments">
							<uni-icons type="chat" size="14" color="#999"></uni-icons>
							<text >{{ post.comments }}</text>
						</view>
						<view class="action" @click="sharePost">
							<uni-icons type="pyq" size="14" color="#999"></uni-icons>
							<text> {{ post.shares }}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="activeTab === 'circle'">
				<view class="post" v-for="(post, index) in circlePosts" :key="index">
					<view class="user-info">
						<image :src="post.avatar" class="avatar"></image>
						<view class="info">
							<text class="username">{{ post.username }}</text>
							<text class="time">{{ post.time }}</text>
						</view>
					</view>
					<text class="content">{{ post.content }}</text>
					<image :src="post.image" class="post-image"></image>
					<view class="actions">
						<view class="action" @click="likePost">
							<uni-icons :type="liked ? 'heart-filled' : 'heart'" size="14" color="#999"></uni-icons>
							<text> {{ post.likes }}</text>
						</view>
						<view class="action" @click="toggleComments">
							<uni-icons type="chat" size="14" color="#999"></uni-icons>
							<text >{{ post.comments }}</text>
						</view>
						<view class="action" @click="sharePost">
							<uni-icons type="pyq" size="14" color="#999"></uni-icons>
							<text> {{ post.shares }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
	const defaultPostImage = '/static/pages/index/home/images/3.png'
	export default {
		data() {
			return {
				activeTab: 'follow',
				followPosts: [{
						avatar: defaultAvatarUrl,
						username: '用户1',
						time: '1小时前',
						content: '这是关注内容1',
						image: defaultPostImage,
						likes: 10,
						liked: false,
						comments: 5,
						shares: 2
					},
					{
						avatar: defaultAvatarUrl,
						username: '用户2',
						time: '2小时前',
						content: '这是关注内容2',
						image: defaultPostImage,
						likes: 20,
						liked: false,
						comments: 10,
						shares: 5
					}
				],
				circlePosts: [{
						avatar: defaultAvatarUrl,
						username: '用户3',
						time: '3小时前',
						content: "nihoa",
						image: defaultPostImage,
						likes: 15,
						comments: 7,
						shares: 3
					},
					{
						avatar: defaultAvatarUrl,
						username: '用户4',
						time: '4小时前',
						content: '这是宠物圈内容2',
						image: defaultPostImage,
						likes: 25,
						comments: 12,
						shares: 8
					}
				]
			}
		},
		methods: {
			switchTab(tab) {
				this.activeTab = tab;
			},
			likePost(){
				this.like = !this.like;
				this.like ? this.likes++ : this.likes--;
				console.log("hit");
				this.$forceUpdate();
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.tab-bar {
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		padding: 10px 0;
	}

	.tab-bar view {
		padding: 10px;
		font-weight: bold;
	}

	.active-tab {
		color: #FF69B4;
		border-bottom: 2px solid #FF69B4;
	}

	.content {
		flex: 1;
		height: 100vh;
		width: 100%;
	}

	.post {
		margin-bottom: 15px;
		padding: 10px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.info {
		display: flex;
		flex-direction: column;
	}

	.username {
		font-weight: bold;
		font-size: 16px;
	}

	.time {
		color: #888;
		font-size: 14px;
	}


	.content {
		margin-bottom: 10px;
	}

	.post-image {
		width: 100%;
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.actions {
		display: flex;
		justify-content: space-between;
	}

	.action {
		font-size: 14px;
		color: #888;
	}
</style>