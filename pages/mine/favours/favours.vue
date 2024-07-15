<template>
	<view class="container">
		<uni-list>
			<uni-list-item v-for="item in items" :title="item.text" :note="item.username" :thumb="item.headshotUrl"
				thumb-size="lg" :rightText="item.postTime" :clickable="true" @click="getInfo(item.id)"/>
		</uni-list>
	</view>
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
		onLoad() {
			console.log('fetchdata');
			this.fetchData();
			console.log(this.items)
		},
		methods: {
			getInfo(id) {
				console.log(id)
			},
			fetchData() {
				uni.request({
					url: "http://localhost:8080/admin/post/LikedPosts/3",
					method: "POST",
					success: (res) => {
						if (res.statusCode == 200) {
							console.log("res.data", res.data);
							this.items = res.data.data;
							console.log("this.itmes", this.items);
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
						headshotUrl: defaultAvatarUrl, // 发帖人的头像
						time: "8:17:20", // 发帖时间
						username: 'sfasdf', // 传title，可以是null（如果有标题，就是tiltle， 如果没有，用发帖的内容截取一段内容作为标题）
						text: "afasdfa", // 发帖的内容。
					},
					{
						headshotUrl: defaultAvatarUrl,
						postTime: "8:14:20",
						username: 'guanyu',
						text: "nodesherer",
					},
				];
				console.log('Default data loaded:', this.items);
			}

		},
	}
</script>
<style>
	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 5px;
		margin-right: 10px;
	}

	.content {
		width: 100%;
		height: 100%;
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