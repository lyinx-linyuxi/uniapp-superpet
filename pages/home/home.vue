<template>
	<view class="header">
		<text class="title">萌宠圈</text>
		<uni-icons class="add-post-icon" type="plus" size="25px" @click="addPost()"></uni-icons>
	</view>
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
							@click="followUser(post)"></uni-icons>
					</view>
					<text class="text-content">{{ post.text }}</text>
					<image
						:src="post.imageUrl === 'null' ? '/static/pages/index/home/images/banner4.png': post.imageUrl"
						class="post-image"></image>
					<view class="actions">
						<view class="action" @click="likePost(post)">
							<uni-icons :type="post.liked ? 'heart-filled' : 'heart'" size="14" color="#999"></uni-icons>
							<text> {{ post.likes }}</text>
						</view>
						<view class="action" @click="CommentDetail(post)">
							<uni-icons type="chat" size="14" color="#999"></uni-icons>
							<text>{{ post.comments }}</text>
						</view>
						<view class="action" @click="sharePost">
							<uni-icons type="pyq" size="14" color="#999"></uni-icons>
							<text> {{ post.shares }}</text>
						</view>

					</view>
					<view class="ipt">
						<uni-easyinput type="text" v-model="text" @input="inputcomments"
							placeholder="请输入评论"></uni-easyinput>
						<view class="action" @click="postComment(post)">
							<uni-icons type="paperplane" size="35" color="#999"></uni-icons>
						</view>
					</view>
					<view class="dispaly-comments" v-if="comments[post.postOrder]">
						<view class="list" v-for="comment in comments[post.postOrder]" :key="comment.commentOrder">
							<view class="comment-detail">
								<text class="comment-username">{{comment.username}} :</text>
								<text class="comment-text">{{comment.text}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="activeTab === 'circle'">
				<view class="post" v-for="(post, index) in posts" :key="index">
					<view class="user-info">
						<image :src="post.headshotUrl" class="avatar"></image>
						<view class="info">
							<text class="username">{{ post.userName }}</text>
							<text class="time">{{ post.postTime }}</text>
						</view>
						<uni-icons class="star-button" :type="post.followed ? 'person-filled' : 'personadd'" size="20px"
							@click="followUser(post)"></uni-icons>
					</view>
					<text class="text-content">{{ post.text }}</text>
					<image
						:src="post.imageUrl === 'null' ? '/static/pages/index/home/images/banner4.png': post.imageUrl"
						class="post-image"></image>
					<view class="actions">
						<view class="action" @click="likePost(post)">
							<uni-icons :type="post.liked ? 'heart-filled' : 'heart'" size="14" color="#999"></uni-icons>
							<text> {{ post.likes }}</text>
						</view>
						<view class="action" @click="CommentDetail(post)">
							<uni-icons type="chat" size="14" color="#999"></uni-icons>
							<text>{{ post.comments }}</text>
						</view>
						<view class="action" @click="sharePost">
							<uni-icons type="pyq" size="14" color="#999"></uni-icons>
							<text> {{ post.shares }}</text>
						</view>

					</view>
					<view class="ipt">
						<uni-easyinput type="text" :value="text" @input="inputcomments"
							placeholder="请输入评论"></uni-easyinput>
						<view class="action" @click="postComment(post)">
							<uni-icons type="paperplane" size="35" color="#999"></uni-icons>
						</view>
					</view>
					<view class="dispaly-comments" v-if="comments[post.postOrder]">
						<view class="list" v-for="comment in comments[post.postOrder]" :key="comment.commentOrder">
							<view class="comment-detail">
								<text class="comment-username">{{comment.username}} :</text>
								<text class="comment-text">{{comment.text}}</text>
							</view>
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
				text: '',
				comments: {},
				user: currentUser,
				activeTab: 'follow',
				posts: []
			}
		},
		onLoad() {
			if(this.user.userId === -1){
				uni.navigateTo({
					url: "/pages/index/index"
				})
			}
			console.log('fetchdata');
			this.fetchData(this.activeTab);
		},
		methods: {
			followUser(post) {
				let path = '';
				if (post.followed === false) {
					path = 'addFollow';
				} else if (post.followed === true) {
					path = 'deleteFollow';
				}
				uni.request({
					url: "http://localhost:8080/admin/post/" + path,
					method: 'POST',
					data: {
						followerId: this.user.userId,
						followingId: post.hostId,
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log("success", res.data)
						if (res.statusCode == 200) {
							console.log("fetch data");
							//成功了需要将相关的post展示时显示关注关系
							// method 1
							//this.fetchData(this.activeTab)
							// method 2
							let len = this.posts.length;
							console.log("len", len);
							for (let i = 0; i < len; i++) {
								if (this.posts[i].hostId == post.hostId) {
									this.posts[i].followed = !this.posts[i].followed;
								}
							}
						} else {
							console.log("here", res.data.data);
						}
					},
					fail: () => {}
				});
			},
			sharePost() {},
			addPost() {
				uni.navigateTo({
					url: "/pages/home/addPost/addPost"
				})
			},
			switchTab(tab) {
				this.activeTab = tab;
				this.fetchData(this.activeTab);
				console.log("switchTab to", tab);
			},
			likePost(post) {
				let path = 'addPLike';
				if (post.liked === true) {
					path = 'deletePLike';
				}
				post.liked = !post.liked;
				post.liked ? post.likes++ : post.likes--;
				console.log("hit");
				uni.request({
					url: 'http://localhost:8080/admin/post/' + path,
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
			inputcomments() {
				console.log(this.text);
			},
			postComment(post) {
				console.log(this.text);
				let that = this;
				let path = 'addComment';
				console.log(typeof(this.comments), this.comments);
				uni.request({
					url: 'http://localhost:8080/admin/post/' + path,
					method: 'POST',
					data: {
						hostId: post.hostId,
						commenterId: this.user.getProperty("userId"),
						postOrder: post.postOrder,
						text: that.text,
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log("success update comment", that.text);
						console.log(res);
					},
					fail: (res) => {
						console.log("Failed to update like");
					}
				});
				this.text = "";
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
						if (res.statusCode == 200) {
							if (res.data.code) {
								console.log("success", res.data)
								this.posts = res.data.data;
								console.log(res.data.data);
								if (this.posts.length === 0) {
									console.log("no posts found");
								} else {
									let that = this;
									let temps = that.posts
									for (let i = 0; i < temps.length; i++) {
										let key = temps[i].postOrder;
										console.log("key", key);
										let value;
										uni.request({
											url: "http://localhost:8080/admin/post/postComments",
											method: 'POST',
											data: {
												hostId: temps[i].hostId,
												postOrder: temps[i].postOrder,
											},
											success(res) {
												if (res.statusCode == 200) {
													if (res.data.code == 1) {
														console.log("temp[i]'s res'", res);
														value = res.data.data
														console.log("value", value);
													}
												}
												that.$set(that.comments, key, value);
											}
										});
									}
									console.log("comments info", this.comments);
								}
							}
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

<style scoped lang="scss">
	.header {
		width: 100%;
		position: fixed;
		z-index: 999;
		background-color: #FFD3D3;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;

		.title {
			font-weight: bold;
		}
	}

	.container {
		display: flex;
		flex-direction: column;

		.tab-bar {
			position: fixed;
			top: 44px;
			z-index: 9999;
			height: 36px;
			width: 100%;
			display: flex;
			justify-content: space-around;
			background-color: #fff;
			padding: 10px 0;
		}

		.content {
			margin-top: 100px;
			margin-bottom: 10px;
		}

		.post {
			display: flex;
			flex-direction: column;
			margin-bottom: 15px;
			padding: 10px;
			background-color: #fff;
			border-radius: 5px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			height: 100%;

			.user-info {
				display: flex;
				align-items: center;
				margin-bottom: 10px;

				.avatar {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-right: 10px;
				}

				.info {
					display: flex;
					flex-direction: column;

					.username {
						font-weight: bold;
						font-size: 16px;
					}
					
					.time {
						color: #888;
						font-size: 14px;
					}
				}

				.star-button {
					margin-left: auto;
					color: yellow;
				}

			}

			.text-content {
				flex: 1;
				height: auto;
				width: 100%;
			}

			.post-image {
				width: 100%;
				border-radius: 5px;
				margin: 10px 0px;
			}

			.actions {
				display: flex;
				justify-content: space-between;

				.action {
					font-size: 14px;
					color: #888;
				}
			}

			.ipt {
				display: flex;
				flex-direction: row;
				margin-top: 10rpx;
				width: 100%;
				height: 10;

				input {
					font-size: 10rpx;
				}
			}

			.dispaly-comments {
				display: flex;
				flex-direction: column;
				padding: 10px;
				height: auto;

				.comment-detail {
					display: flex;
					flex-direction: row;
					width: 100%;
					border: #000;
					
					.comment-username{
						font-size: 12px;
						font-weight: bold;
						white-space: nowrap;
						color:#537aa6;
					}
					
					.comment-text{
						margin-left: 5px;
						font-size: 12px;
					}
				}
			}

		}
	}

	.add-post-icon {
		position: fixed;
		top: 9.5px;
		right: 5px;
	}



	.tab-bar view {
		padding: 10px;
		font-weight: bold;
	}

	.active-tab {
		color: #FF69B4;
		border-bottom: 2px solid #FF69B4;
	}


</style>