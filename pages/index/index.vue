<template>
	<view class="container">
		<view class="tab-bar">
			<view :class="{'active-tab': activeTab === 'follow'}" @click="switchTab('follow')">关注</view>
			<view :class="{'active-tab': activeTab === 'circle'}" @click="switchTab('circle')">宠物圈</view>
		</view>
		<scroll-view scroll-y class="content">
			<view v-if="activeTab === 'follow'">
				<view class="post" v-for="(post, index) in posts" :key="index">
					<view class="user-info">
						<image :src="post.headshot_url" class="avatar"></image>
						<view class="info">
							<text class="username">{{ post.username }}</text>
							<text class="time">{{ post.time }}</text>
						</view>
					</view>
					<text class="content">{{ post.text }}</text>
					<image :src="post.image" class="post-image"></image>
					<view class="actions">
						<view class="action" @click="likePost(post)">
							<uni-icons :type="post.liked ? 'heart-filled' : 'heart'" size="14" color="#999"></uni-icons>
							<text> {{ post.likes }}</text>
						</view>
						<view class="action" @click="toggleComments">
							<uni-icons type="chat" size="14" color="#999"></uni-icons>
							<text>{{ post.comments }}</text>
						</view>
						<view class="action" @click="sharePost">
							<uni-icons type="pyq" size="14" color="#999"></uni-icons>
							<text> {{ post.shares }}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="activeTab === 'circle'">
				<view class="post" v-for="(post, index) in posts" :key="index">
					<view class="user-info">
						<image :src="post.avatar" class="avatar"></image>
						<view class="info">
							<text class="username">{{ post.username }}</text>
							<text class="time">{{ post.time }}</text>
						</view>
					</view>
					<text class="content">{{ post.text }}</text>
					<image :src="post.image" class="post-image"></image>
					<view class="actions">
						<view class="action" @click="likePost">
							<uni-icons :type="post.liked ? 'heart-filled' : 'heart'" size="14" color="#999"></uni-icons>
							<text> {{ post.likes }}</text>
						</view>
						<view class="action" @click="toggleComments">
							<uni-icons type="chat" size="14" color="#999"></uni-icons>
							<text>{{ post.comments }}</text>
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
	import axios from 'axios';
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
	const defaultPostImage = '/static/pages/index/home/images/3.png'
	export default {
		data() {
			return {
				activeTab: 'follow',
				posts: []
			}
		},
		onLoad() {
			console.log('fetchdata');
			this.fetchData();
		},
		methods: {
			switchTab(tab) {
				this.activeTab = tab;
				this.fetchData();
			},
			likePost(post) {
				post.liked = !post.liked;
				post.liked ? post.likes++ : post.likes--;
				console.log("hit");
				// this.$forceUpdate();
			},
			fetchData() {
				uni.request({
					url: "http://localhost:8090/api/data",
					method: "GET",
					success:(res) => {
						console.log("success", res.data)
						if (res.statusCode == 200) {
							this.posts = res.data;
							console.log(res.data);
						}
						else {
							console.log("here", res.data);
							this.handleFetchError();
						}
					},
					fail: () => {
						// console.log("there", res.data)
						this.handleFetchError();
					}
				});
			},
			handleFetchError() {
				console.log('Failed to fetch data');
				this.posts = [
					{
						host_id: '',
						post_order: '',
						username: 'xiaoxi',
						headshot_url: defaultAvatarUrl,
						text: 'default nulla',
						image: defaultPostImage,
						time: "1days",
						liked: false,
						likes: 100,
						comments: 200,
						shares: 29
					}
				]
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
		width: 100%;
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
		height: 100%;
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