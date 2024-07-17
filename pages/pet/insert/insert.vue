<template>
	<view class="container">
		<view class="user-info" @click="changeImage()">
			<image :src="imageUrl" class="avatar"></image>
		</view>
		<view class="form">
			<view class="form-item">
				<text class="label">爱宠名：</text>
				<input type="text" placeholder="点击输入爱宠名" :value="petName" @input="inputPetName" class="input" />
			</view>
			<view class="form-item">
				<text class="label"> 品种：</text>
				<input type="text" placeholder="点击输入品种" :value="species" class="input" @input="inputspecies" />
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
				<input type="text" placeholder="点击输入体重(kg)" :value="weight" class="input" @input="inputWeight" />
			</view>
			<view class="form-item">
				<text class="label">一句描述：</text>
				<input type="text" placeholder="爱吃啥，有啥特点..." :value="description" class="input"
					@input="inputDescription" />
			</view>
			<view class="form-item">
				<text class="label">是否绝育：</text>
				<view class="sterilized-buttons">
					<button :class="{'button': true, 'active': sterilized === 'yes', 'yes': true}"
						@click="selectsterilized('yes')">
						<text :class="{'yes-text': true, 'active-text': sterilized === 'yes'}">已绝育</text>
					</button>
					<button :class="{'button': true, 'active': sterilized === 'no', 'no': true}"
						@click="selectsterilized('no')">
						<text :class="{'no-text': true, 'active-text': sterilized === 'no'}">未绝育</text>
					</button>
				</view>
			</view>
			<view class="form-item">
				<text class="label">出生日期：</text>
				<uni-datetime-picker @change="onBirthDateChange" :value="birthDate" type="date" placeholder="点击设置日期"
					data-type="birthDate"></uni-datetime-picker>
			</view>
			<view class="form-item">
				<text class="label">到家日期：</text>
				<uni-datetime-picker @change="onhomeDateChange" :value="homeDate" type="date" placeholder="点击设置日期"
					data-type="homeDate"></uni-datetime-picker>
			</view>
			<navigator url="/pages/pet/card/card">
				<button class="submit-button" @click="submitInfo">完成注册</button>
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
	import { currentUser } from '../../../global/userinfo';
	export default {
		data() {
			return {
				user: currentUser,
				petName: '',
				species:'',
				weight: '',
				description: '',
				gender: '', // 用于存储选择的性别
				sterilized: '', // 用于存储是否绝育的选择
				birthDate: '', // 出生日期
				homeDate: '' ,// 到家日期
				imageUrl: '../../../static/pages/index/home/images/greenpet.jpg',
			}
		},
		methods: {
			changeImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //压缩图
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(res.tempFilePaths);
						this.imageUrl = res.tempFilePaths[0];
					}
				});
			},
			inputPetName(input) {
				this.petName = input.detail.value;
				console.log(this.petName);
			},
			selectGender(gender) {
				this.gender = gender;
				console.log(gender);

			},
			selectsterilized(sterilized) {
				this.sterilized = sterilized;
				console.log(sterilized);
			},
			onBirthDateChange(date) {
				this.birthDate = date;
				console.log(this.birthDate);
			},
			onhomeDateChange(date) {
				this.homeDate = date;
				console.log(this.homeDate)
			},
			inputDescription(input) {
				this.description = input.detail.value;
				console.log(this.description);
			},
			inputWeight(input) {
				console.log(input);

				this.weight = parseFloat(input.detail.value);
				console.log(typeof(this.weight));

			},
			inputspecies(input){
				console.log(input);
				
				this.species = parseFloat(input.detail.value);
				console.log(typeof(this.species));
			},
			submitInfo() {
				console.log(typeof(this.petName), this.petName);
				console.log(typeof(this.species), this.species);
				console.log(typeof(this.weight), this.weight);
				console.log(typeof(this.description), this.description);
				console.log(typeof(this.gender), this.gender);
				console.log(typeof(this.sterilized), this.sterilized);
				console.log(typeof(this.birthDate), this.birthDate);
				console.log(typeof(this.homeDate), this.homeDate);
				uni.request({
					url: 'http://localhost:8080/admin/petcard/addPet',
					method: 'POST',
					data: {
						userId: this.user.userId,
						imageUrl: this.imageUrl,
						petName: this.petName,
						species:this.species,
						gender: this.gender,
						weight: this.weight,
						description: this.description,
						sterilized: this.sterilized,
						birthDate: this.birthDate,
						homeDate: this.homeDate,
						species: this.species,
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						let newVal = this.user.getProperty("petNum") + 1;
						console.log(newVal);
						console.log(res.data);
						this.user.updateProperty("petNum", newVal);
					
					},
					fail: (res) => {
						console.log("Failed to connect");
					}
				});
				uni.navigateBack();
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
	.sterilized-buttons {
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

	.sterilized-buttons .button {
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

	.sterilized-buttons .button:last-child {
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

	.agreement-container {
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