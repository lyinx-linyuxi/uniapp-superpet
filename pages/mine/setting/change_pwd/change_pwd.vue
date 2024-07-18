<template>
	<view class="content">
		<view class="inputBox">
			<view class="ipt">
				<h4>输入旧密码</h4>
				<uni-easyinput type="text" v-model="oldPassword" placeholder="请输入旧密码"></uni-easyinput>
			</view>

			<view class="ipt">
				<h4>输入新密码</h4>
				<uni-easyinput type="password" v-model="newPassword1" placeholder="请输入密码"></uni-easyinput>
			</view>
			<view class="ipt">
				<h4>确认新密码</h4>
				<uni-easyinput type="password" v-model="newPassword2" placeholder="请确认密码"></uni-easyinput>
			</view>
			<view @click="registerBtn"><button class="loginBtn">确认修改</button></view>
		</view>
	</view>
</template>

<script>
	import {
		currentUser
	} from '../../../../global/userinfo';
	export default {
		data() {
			return {
				user: currentUser,
				oldPassword: '',
				newPassword1: '',
				newPassword2: ''
			}
		},
		methods: {
			registerBtn() {
				console.log(this.user);
				if (this.user.password != this.oldPassword) {
					uni.showToast({
						title: '旧密码错误',
						icon: 'none'
					})
					return
				} 
				else if (this.newPassword1 != this.newPassword2) {
					uni.showToast({
						title: '两次密码不同',
						icon: 'none'
					})
					return
				}
				else if (this.newPassword1.length < 6 || this.newPassword.length > 12) {
					uni.showToast({
						title: '密码应在6~12位之间',
						icon: 'none'
					})
					return
				} else {
					this.user.updateProperty("password", this.newPassword1);
					uni.request({
						url: 'http://localhost:8080/admin/user/updateUser',
						method: 'POST',
						data: {
							userId: this.user.getProperty('userId'),
							username: this.user.getProperty('username'),
							password: this.user.getProperty('password'),
							email: this.user.getProperty('email'),
							phone: this.user.getProperty('phone'),
							headshotUrl: this.user.getProperty('headshotUrl'),
							petNum: this.user.getProperty('petNum'),
							gender: this.user.getProperty('gender'),
						},
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							//console.log(res.data);
							if(res.data.code==1){
								uni.showToast({
									title: '修改成功',
									icon: 'success'
								});
								console.log("success");
								uni.navigateBack();  	
							}
							else{
								uni.showToast({
									title: '修改失败',
									icon: 'fail'
								})
							}
							return
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
</style>