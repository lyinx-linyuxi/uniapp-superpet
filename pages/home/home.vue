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
						<image :src="post.headshotUrl" class="avatar"></image>
						<view class="info">
							<text class="username">{{ post.userName }}</text>
							<text class="time">{{ post.postTime }}</text>
						</view>
						<uni-icons class="star-button" :type="post.followed ? 'person-filled' : 'personadd'" size="20px"
							@click="followUser(post.hostId)"></uni-icons>
					</view>
					<text class="content">{{ post.text }}</text>
					<image
						:src="post.imageUrl === 'null' ? '/static/pages/index/home/images/banner4.png': post.imageUrl"
						class="post-image"></image>
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
							<text class="username">{{ post.userName }}</text>
							<text class="time">{{ post.postTime }}</text>
						</view>
					</view>
					<text class="content">{{ post.text }}</text>
					<image
						:src="post.imageUrl === 'null' ? '/static/pages/index/home/images/banner4.png': post.imageUrl"
						class="post-image"></image>
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
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
	const defaultPostImage = '/static/pages/index/home/images/3.png';
	import {
		currentUser
	} from '../../global/userinfo';
	export default {
		data() {
			return {
				user: currentUser,
				activeTab: 'follow',
				posts: []
			}
		},
		onLoad() {
			console.log('fetchdata');
			this.fetchData(this.activeTab);
		},
		methods: {
			followUser(hostId) {
				uni.request({
					url: "http://localhost:8080/admin/post/addFollow",
					method: 'POST',
					data: {
						followerId: hostId,
						followingId: this.user.userId,
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log("success", res.data)
						if (res.statusCode == 200) {
							this.posts = res.data.data;
							console.log(res.data.data);
						} else {
							console.log("here", res.data.data);
						}
					},
					fail: () => {
					}
				});
			},
			sharePost() {},
			toggleComments() {},
			switchTab(tab) {
				this.activeTab = tab;
				this.fetchData(this.activeTab);
			},
			likePost(post) {
				post.liked = !post.liked;
				post.liked ? post.likes++ : post.likes--;
				console.log("hit");
				uni.request({
					url: 'http://localhost:8080/admin/post/addPLike',
					method: 'POST',
					data: {
						hostId: post.hostId,
						likerId: this.user.getProperty("userId"),
						postOrder: post.postOrder
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log("success update like");
						console.log(res);
					},
					fail: (res) => {
						console.log("Failed to update like");
					}
				});
			},
			fetchData(tabName) {
				let address = 'petCircle'
				if (tabName === 'follow') {
					address = 'MyFollowedPetCircle';
				}
				uni.request({
					url: "http://localhost:8080/admin/post/" + address + "/" + this.user.getProperty("userId"),
					method: "POST",
					success: (res) => {
						console.log("success", res.data)
						if (res.statusCode == 200) {
							this.posts = res.data.data;
							console.log(res.data.data);
						} else {
							console.log("here", res.data.data);
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
				this.posts = [{
					hostId: '',
					postOrder: '',
					userName: 'xiaoxi',
					headshotUrl: defaultAvatarUrl,
					text: 'default nulla',
					imageUrl: defaultPostImage,
					postTime: "1days",
					liked: false,
					likes: 100,
					comments: 200,
					shares: 29,
					followed: false,
				}]
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
		height: 100%;
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

	.star-button {
		margin-left: auto;
		color: yellow;
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