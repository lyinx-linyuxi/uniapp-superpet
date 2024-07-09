<template>
	<view class="container">
		<uni-list>
			<uni-list-item v-for="item in items" :key="item.id">
				<view class="list-item">
					<image class="avatar" :src="item.avatar"></image>
					<view class="content">
						<view class="header">
							<text class="title">{{ item.title }}</text>
							<text class="time">{{ item.time }}</text>
						</view>
						<text class="description">{{ item.description }}</text>
						<text class="category">{{ item.category }}</text>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
	</view>
	<view>hellow?></view>
</template>


<script>
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
	const defaultPostImage = '/static/pages/index/home/images/3.png'
	export default {
		data() {
			return {
				items: []
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
			console.log(this.items);
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			fetchData() {
				uni.request({
					url: "https://api.examplesdaf",
					method: "GET",
					success: (res) => {
						if (res.statusCode == 200) {
							this.items = res.data;
						} else {
							this.handleFetchError();
						}
					},
					fail: () => {
						this.handleFetchError();
					}
				});
			},
			handleFetchError() {
				console.log('Failed to fetch data');
				this.items = [{
					avater: defaultAvatarUrl,
					content: 'default nulla',
					image: defaultPostImage,
					time: "8:17:20",
					title: 'sfasdf',
					description: "afasdfa",
					category: "nlsdf"
				}]
			},
			onLoad(){
				console.log('fetchdata');
				this.fetchData();
			},
		},
	}
</script>
<style>
	.container {
		padding: 10px;
	}

	.list-item {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 5px;
		margin-right: 10px;
	}

	.content {
		flex: 1;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}

	.title {
		font-size: 16px;
		font-weight: bold;
	}

	.time {
		font-size: 14px;
		color: #999;
	}

	.description {
		font-size: 14px;
		color: #333;
	}

	.category {
		font-size: 12px;
		color: #999;
	}
</style>