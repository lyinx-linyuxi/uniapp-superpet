<template>
	<view class="content">
		<view class="topBox">
			<h3>WELCOME</h3>
			<h3>欢迎使用云端宠物</h3>
		</view>
		<view class="inputBox">
			<view class="ipt">
				<h4>账号</h4>
				<uni-easyinput type="text" v-model="username" @input="inputusername" placeholder="请输入用户名"></uni-easyinput>
			</view>
			<view class="ipt">
				<h4>密码</h4>
				<uni-easyinput type="password" v-model="password" placeholder="请输入密码"
					@input="inputpassword"></uni-easyinput>
			</view>
			<button class="loginBtn" @click="userlogin">登录</button>
			<button class="registerBtn" @click="gotoregister">注册</button>

			<view class="tipbox">
				<view class="txt">
					—— 其他账号登录 ——
				</view>
				<view class="otherUser">
					<uni-icons type="qq" size="40" color="rgb(66,157,250)"></uni-icons>
					<uni-icons type="weixin" size="40" color="rgb(2,187,17)"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { currentUser } from '../../global/userinfo'
	export default {
		data() {
			return {
				user: currentUser,
				username: '',
				password: ''
			}
		},
		methods: {
			gotohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			gotoregister() {
				uni.navigateTo({
					url: '/pages/pet/insert/register/register'
				})
			},
			inputusername() {
				// this.userid = userid,
				console.log(this.username)
			},
			inputpassword() {
				// this.password = password,
				console.log(this.password);
			},
			userlogin() {
				console.log(typeof(this.username), this.username);
				console.log(typeof(this.password), this.password);
				if (this.password == 88888888) {
					uni.switchTab({
						url: '/pages/home/home'
					})
				};
				if (this.username.length < 3 || this.username.length > 10) {
					uni.showToast({
						title: '用户名应在3~10位之间',
						icon: 'none'
					})
					return
				} else if (this.password.length < 6 || this.password.length > 12) {
					uni.showToast({
						title: '密码应在6~12位之间',
						icon: 'none'
					})
					return
				} else {
					uni.request({
						url: 'http://localhost:8080/admin/user/login',
						method: 'POST',
						data: {
							username: this.username,
							password: this.password,
						},
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							console.log(res);
							if (res.data.code == 1) {
								console.log(res.data.data);
								for(const key in res.data.data){
									if(res.data.data.hasOwnProperty(key)){
										console.log(key,res.data.data[key]);
										this.user.updateProperty(key, res.data.data[key])
									}
								}
								uni.switchTab({
									url: '/pages/home/home'
								})
							}
							if (res.data.code == 0) {
								uni.showToast({
									title: '账号或密码错误',
									icon: "none",
								})
								return
							}
						},
						fail: (res) => {
							console.log("Failed to connect");
						}
					});
				}
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

	.otherUser .uni-icons {
		margin-left: 20rpx;
	}
</style>