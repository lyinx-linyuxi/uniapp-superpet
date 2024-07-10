<template>
	<view class="container">
		<uni-list>
			<uni-list-item v-for="item in items" :title="item.title" :note="item.description" :thumb="item.avatar"
				thumb-size="lg" :rightText="item.time" :clickable="true" @click="getInfo(item.id)"/>
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
						id : 100,
						avatar: defaultAvatarUrl,
						image: defaultPostImage,
						time: "8:17:20",
						title: 'sfasdf',
						description: "afasdfa",
						category: "nlsdf"
					},
					{
						id: 102,
						avatar: defaultAvatarUrl,
						image: defaultPostImage,
						time: "8:14:20",
						title: 'guanyu',
						description: "nodesherer",
						category: "nlsdf"
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