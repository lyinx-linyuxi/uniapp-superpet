<template>
	<view class="app">
		<ul>
			<li class="list" v-for="follower in followers" :key="follower.host_id">
				<span class="body" v-if="follower.checked==='1'">
					<view class="f-image" @click="aa">
						<image :src="follower.headshot_url" />
					</view><br>
					<view class="f-name">
						<text>{{follower.username}}</text>
					</view>
					<view class="block"></view>
					<view class="f-time">
						<text>{{follower.time}}</text>
					</view>
				</span>
			</li>
		</ul>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: '',
				user_id: '3',
				followers: [],
			};
		},
		created() {
			this.getMessage();
		},
		methods: {
			getMessage() {
				uni.request({
					url: "http://localhosti:8080/admin/user/getFollowing/" + this.user_id,
					method: "POST",
					// message: this.id,
					success: (res) => {
						console.log("success", res.data)
						if (res.statusCode == 200) {
							this.followers = res.data.data;
							console.log(res.data);
						} else {
							console.log("here", res.data);
							this.handleFetchError();
						}
					},
					fail: () => {
						this.handleFetchError();
					}
				});
			},
			handleFetchError() {
				this.followers = [{

				}]
			}

			//   async getMessage() {
			//     try {
			//       const response = await axios.post('http://localhost:3001/api/message', { message: this.id });
			// this.followers=response.data.data;
			//     } catch (error) {
			//       console.error(error);
			//     }
			//   }
		}
	};
</script>

<style scoped lang="scss">
	ul {
		padding: 0px;
		list-style: none;
	}

	li {
		padding: 5px;
	}

	.test {
		padding: 10px;
		height: 40px;
		width: 40px;
	}

	.body {
		display: flex;
		height: 40px;
		background-color: Azure;
		flex-direction: row;

		.f-image {
			display: flex;
			width: 40px;

			image {
				height: 40px;
				width: 40px;
			}
		}

		.f-name {
			display: flex;
			width: 60px;
			justify-content: flex-start;
			align-items: flex-start;

			text {
				font-size: 10px;
			}
		}

		.block {
			display: flex;
			width: 160px;
		}

		.f-time {
			display: flex;
			width: 100px;
			height: 40px;
			justify-content: flex-end;
			align-items: center;

			text {
				display: flex;
				font-size: 10px;
			}
		}
	}
</style>