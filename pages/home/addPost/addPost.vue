<template>
	<view class="container">
		<view class="section form-section">
			<view class="form">
				<view class="form-item">
					<text class="label">标题：</text>
					<input type="text" placeholder="点击输入标题,如果有的话" v-model="post.title" class="input" />
				</view>
				<view class="form-item">
					<text class="label">文字：</text>
					<input type="text" placeholder="点击输入副标题" v-model="post.text" class="input" />
				</view>
				<view class="photo">
					<uni-icons class="icon" type="images-filled" size="100px" @click="selectPhoto()"></uni-icons>
					<!-- <image src="../../../static/pages/index/home/images/greenpet.jpg" class="avatar"></image> -->
				</view>
				
			</view>
			<button class="submit-button" @click="submitPost">完成填写</button>
			<view class="section empty-section"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				post: {
					hostId: -1,
					title: '',
					text: '',
					imageUrl: ''
				}
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
			submitPost() {
				uni.request({
					url:arguments,
					data:arguments,
					
				})
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

	.section {
		width: 100%;
	}

	.form-section {
		background-color: #fff;
		padding: 15px;
		flex: 1;
	}

	.empty-section {
		background-color: #F5F5F5;
		flex: 1;
	}

	.photo {
		display: flex;
		margin-right: auto;
	}

	.icon {
		width: 100px;
		height: 100px;
	}

	.form {
		background-color: #fff;
		border-radius: 10px;
		padding: 15px;
		flex: 1;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}

	.label {
		width: 100px;
		font-size: 16px;
	}

	.input {
		flex: 1;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.submit-button {
		width: 100%;
		padding: 10px;
		background-color: #32CD32;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		text-align: center;
	}
</style>