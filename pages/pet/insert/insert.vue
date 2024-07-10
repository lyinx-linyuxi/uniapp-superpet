<template>
	<view class="container">
		<view class="user-info">
			<image src="../../../static/pages/index/home/images/greenpet.jpg" class="avatar"></image>
		</view>
		<view class="form">
			<view class="form-item">
				<text class="label">爱宠名：</text>
				<input type="text" placeholder="点击输入爱宠名" class="input" />
			</view>
			<view class="form-item">
				<text class="label">性别：</text>
				<view class="gender-buttons">
					<button :class="{'button': true, 'active': gender === 'male', 'male': true}"
						@click="selectGender('male')">
						<text :class="{'male-text': true, 'active-text': gender === 'male'}">男</text>
					</button>
					<button :class="{'button': true, 'active': gender === 'female', 'female': true}"
						@click="selectGender('female')">
						<text :class="{'female-text': true, 'active-text': gender === 'female'}">女</text>
					</button>
				</view>
			</view>
			<view class="form-item">
				<text class="label">体重：</text>
				<input type="text" placeholder="点击输入体重(kg)" class="input" />
			</view>
			<view class="form-item">
				<text class="label">一句描述：</text>
				<input type="text" placeholder="爱吃啥，有啥特点..." class="input" />
			</view>
			<view class="form-item">
				<text class="label">是否绝育：</text>
				<view class="neuter-buttons">
					<button :class="{'button': true, 'active': neuter === 'yes', 'yes': true}"
						@click="selectNeuter('yes')">
						<text :class="{'yes-text': true, 'active-text': neuter === 'yes'}">已绝育</text>
					</button>
					<button :class="{'button': true, 'active': neuter === 'no', 'no': true}"
						@click="selectNeuter('no')">
						<text :class="{'no-text': true, 'active-text': neuter === 'no'}">未绝育</text>
					</button>
				</view>
			</view>
			<view class="form-item">
				<text class="label">出生日期：</text>
				<uni-datetime-picker @change="onDateChange" :value="birthDate" type="date" placeholder="点击设置日期"
					data-type="birthDate"></uni-datetime-picker>
			</view>
			<view class="form-item">
				<text class="label">到家日期：</text>
				<uni-datetime-picker @change="onDateChange" :value="arrivalDate" type="date" placeholder="点击设置日期"
					data-type="arrivalDate"></uni-datetime-picker>
			</view>
			<navigator url="/pages/pet/card/card">
				<button class="submit-button">完成注册</button>
			</navigator>
		</view>
		<view class="agreement-container">
			<text class="agreement">注册即代表同意</text>
			<navigator url="/pages/pet/agreement/agreement">
				<text class="agreement" style="color: blue;">宠爱用户协议</text>
			</navigator>
			
			
			
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				gender: '', // 用于存储选择的性别
				neuter: '', // 用于存储是否绝育的选择
				birthDate: '', // 出生日期
				arrivalDate: '' // 到家日期
			}
		},
		methods: {
			selectGender(gender) {
				this.gender = gender;
			},
			selectNeuter(neuter) {
				this.neuter = neuter;
			},
			onDateChange(event) {
				const {
					detail,
					currentTarget: {
						dataset
					}
				} = event;
				if (dataset.type === 'birthDate') {
					this.birthDate = detail.value;
				} else if (dataset.type === 'arrivalDate') {
					this.arrivalDate = detail.value;
				}
			}
		}
	}
</script>
<style>
	.container {
		background-color: #fff;
		padding: 5px;
	}

	.user-info {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}

	.form {
		background-color: #fff;
		border-radius: 10px;
		padding: 15px;
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
		font-size: 14px;
	}

	.gender-buttons,
	.neuter-buttons {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.gender-buttons .button {
		display: flex;
		flex: auto;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 35px;
		border: 1px solid #ccc;
		border-radius: 10px;
		text-align: center;
		margin-right: 10px;
		background-color: #fff;

	}

	.gender-buttons .button:last-child {
		margin-right: 0;
	}

	.neuter-buttons .button {
		display: flex;
		flex: auto;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 35px;
		border: 1px solid #ccc;
		border-radius: 10px;
		text-align: center;
		margin-right: 10px;
		background-color: #fff;
	}

	.neuter-buttons .button:last-child {
		margin-right: 0;
	}

	.male-text {
		font-size: 14px;
		color: #0000ff;

	}

	.female-text {
		font-size: 14px;
		color: #ff0000;
	}

	.yes-text {
		font-size: 14px;
		color: #00ff00;
	}

	.no-text {
		font-size: 14px;
		color: #ffa500;
	}

	.active-text {
		color: #fff !important;
	}

	.active.male {
		background-color: #0000ff;
		color: #fff;
		border-color: #0000ff;
	}

	.active.female {
		background-color: #ff0000;
		color: #fff;
		border-color: #ff0000;
	}

	.active.yes {
		background-color: #00ff00;
		color: #fff;
		border-color: #00ff00;
	}

	.active.no {
		background-color: #ffa500;
		color: #fff;
		border-color: #ffa500;
	}

	.submit-button {
		width: 50%;
		padding: 10px;
		background-color: #32CD32;
		color: #fff;
		border: none;
		border-radius: 25px;
		font-size: 16px;
		text-align: center;
	}
	
	.agreement-container{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.agreement {
		align-items: center;
		text-align: right;
		color: #888;
	}
</style>