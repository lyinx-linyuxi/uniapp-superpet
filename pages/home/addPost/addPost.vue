<template>
	<view class="container">
		<view class="section form-section">
			<view class="form">
				<input type="text" placeholder="标题" v-model="post.title" class="input" />
				<textarea type="text" placeholder="点击输入文字" v-model="post.text" class="inputbox" />
				
				<view class="photo">
					<view class="picture">
						<uni-icons class="icon" type="images-filled" size="150px" @click="selectPhoto()"></uni-icons>
					</view>
					<view class="camera">
						<uni-icons class="icon" type="camera-filled" size="150px" @click="selectPhoto()"></uni-icons>
					</view>					
					<!-- <image src="../../../static/pages/index/home/images/greenpet.jpg" class="avatar"></image> -->
				</view>
			</view>
			<button class="submit-button" @click="submitPost">发表</button>
			<view class="section empty-section"></view>
		</view>
	</view>
</template>

<script>
	import {
		currentUser
	} from '../../../global/userinfo';

	export default {
		data() {
			return {
				user: currentUser,
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
			selectPhoto() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //压缩图
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(res.tempFilePaths);
						this.post.imageUrl = res.tempFilePaths[0];
					}
				});

			},

			submitPost() {
				this.post.hostId = this.user.getProperty("userId");
				console.log(this.post);
				uni.request({
					url: "http://localhost:8080/admin/post/addPost",
					method: 'POST',
					data: this.post,
					success: (res) => {
						console.log("success", res);
						if(res.statusCode == 200){
							if(res.data.code == 1){}
							console.log("addpost success");
						}
					},
					fail: (res) => {
						console.log(res);
					}
				});
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color:#fff;
	}

	.section {
		width: 100%;
		background-color: #fff;
	}
	
	.form-section {
		background-color: #fff;
		padding: 15px;
		flex: 1;
	}

	.empty-section {
		background-color: #fff;
		flex: 1;
	}

	.photo {
		display: flex;
		margin-top: 20px;
		justify-content:space-evenly;
		
	}
	.picture{
		background-color: #ffbd00;
		border-radius: 25px;
		margin-right: 10px;
		box-shadow: #374667 3px 3px;
		
	}
	.camera{
		background-color: #ff9ab0;
		border-radius: 25px;
		box-shadow: #374667 3px 3px;
	}

	

	.form {
		background-color: #fff;
		border-radius: 10px;
		padding: 15px;
		flex: 1;
	}


	.input {
		flex: 1;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	
		margin-right: 10px;
		font-size: 25px;
	}	
	.inputbox{
		width: auto;
		height:250px;
		font-size: 20px;
		margin-right: 10px;
		margin-top: 10px;
		border-bottom: 1px solid #e7e7e7;
		margin-bottom: 10px;
	}
	

	.submit-button {
		width: 80%;
		padding: 10px;
		background-color: #0bb5fc;
		color: #fff;
		border: none;
		border-radius: 25px;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		margin-top: 30px;
		box-shadow: #374667 3px 3px;
	}
</style>