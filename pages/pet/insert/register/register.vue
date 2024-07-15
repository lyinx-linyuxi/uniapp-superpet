<template>
	<view class="content">
		<view class="topBox">
			<h3>WELCOME</h3>
			<h3>欢迎使用云端宠物</h3>
		</view>
		<view class="inputBox">
			<view class="ipt">
				<h4>用户名</h4>
				<uni-easyinput type="text" v-model="username" placeholder="请输入用户名"
					@input="inputusername"></uni-easyinput>
			</view>
			<view class="ipt">
				<h4>账号</h4>
				<uni-easyinput type="text" v-model="userid" @input="inputuserid" placeholder="请输入账号"></uni-easyinput>
			</view>
			<view class="ipt">
				<h4>密码</h4>
				<uni-easyinput type="password" v-model="password" placeholder="请输入密码"
					@input="inputpassword"></uni-easyinput>
			</view>
			<view @click="registerBtn"><button class="loginBtn">完成注册</button></view>
	</view>
</view>
			

</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				password: ''
			}
		},
		methods: {
			gotohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			inputusername(){
				this.username = username,
				console(this.username)
			},
			inputuerid() {
				this.userid = uerid,
					console(this.userid)
			},
			inputpassword() {
				this.password = password,
					console(this.password)
			},
			registerBtn() {
				console.log(typeof(this.username),this.username)
				console.log(typeof(this.userid), this.userid);
				console.log(typeof(this.password), this.password);
				uni.request({
					url: 'http://localhost:8080/admin/user/addUser',
					method: 'POST',
					data: {
						username: this.username,
						userid: this.userid,
						password: this.password,
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(res.data);
						uni.navigateBack();
					},
					fail: (res) => {
						console.log("Failed to connect");
					}
				});
			}
		}

	}
</script>

<style scoped>
	.content {
		height: 100vh;
		background-color: aquamarine;
		background: url("https://www.galaxyclub.cn/Upload/IMAGES/15/0615/38af439784544e95b7c64cad64a14157_650x650.jpg") no-repeat;
		background-size: cover;
	}

	.topBox {
		font-size: 34rpx;
		color: #fff;
		padding: 80rpx 50rpx;
	}

	h3 {
		margin-bottom: 10rpx;
	}

	.inputBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 85vh;
		background-color: #fff;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		padding: 60rpx;
		box-sizing: border-box;
	}

	.ipt {
		margin-bottom: 50rpx;
	}

	.ipt h4 {
		margin-bottom: 20rpx;
		font-size: 36rpx;
		color: #333;
	}

	.ipt input {
		border-bottom: 1px solid #dedede;
		padding-bottom: 20rpx;
		font-size: 28rpx;
	}

	.loginBtn {
		margin-top: 20rpx;
		line-height: 85rpx;
		text-align: center;
		background: linear-gradient(to right, rgb(86, 104, 214), rgb(86, 104, 214));
		border-radius: 40rpx;
		color: #fff;
		margin-top: 50rpx;
	}

	.registerBtn {
		margin-top: 20rpx;
		line-height: 85rpx;
		text-align: center;
		border-radius: 40rpx;
		color: rgb(86, 104, 214);
		margin-top: 50rpx;
		border: none;
	}

	.otherUser {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
	}

	.txt {
		font-size: 28rpx;
		color: #969696;
		text-align: center;
		margin-top: 36rpx;
	}

</style>
