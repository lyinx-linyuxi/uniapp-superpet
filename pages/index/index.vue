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
						<view>
							<text class="username">{{ post.username }}</text>
							<text note="time">{{ post.time }}</text>
						</view>
					</view>
					<text class="content">{{ post.content }}</text>
					<image :src="post.image" class="post-image"></image>
					<view class="actions">
						<text class="action">点赞 {{ post.likes }}</text>
						<text class="action">评论 {{ post.comments }}</text>
						<text class="action">转发 {{ post.shares }}</text>
					</view>
				</view>
			</view>
			<view v-if="activeTab === 'circle'">
				<view class="post" v-for="(post, index) in circlePosts" :key="index">
					<view class="user-info">
						<image :src="post.avatar" class="avatar"></image>
						<view>
							<text class="username">{{ post.username }}</text>
							<text class="time">{{ post.time }}</text>
						</view>
					</view>
					<text class="content">{{ post.content }}</text>
					<image :src="post.image" class="post-image"></image>
					<view class="actions">
						<text class="action">点赞 {{ post.likes }}</text>
						<text class="action">评论 {{ post.comments }}</text>
						<text class="action">转发 {{ post.shares }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	export default {
		data() {
			return {
				activeTab: 'follow',
				followPosts: [{
						avatar: defaultAvatarUrl,
						username: '用户1',
						time: '1小时前',
						content: '这是关注内容1',
						image: '/static/post1.jpg',
						likes: 10,
						comments: 5,
						shares: 2
					},
					{
						avatar: '/static/avatar2.jpg',
						username: '用户2',
						time: '2小时前',
						content: '这是关注内容2',
						image: '/static/post2.jpg',
						likes: 20,
						comments: 10,
						shares: 5
					}
				],
				circlePosts: [{
						avatar: '/static/avatar3.jpg',
						username: '用户3',
						time: '3小时前',
						content: '这是宠物圈内容1',
						image: '/static/post3.jpg',
						likes: 15,
						comments: 7,
						shares: 3
					},
					{
						avatar: '/static/avatar4.jpg',
						username: '用户4',
						time: '4小时前',
						content: '这是宠物圈内容2',
						image: '/static/post4.jpg',
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

	.username {
		font-weight: bold;
	}

	.time {
		color: #888;
		font-size: 12px;
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