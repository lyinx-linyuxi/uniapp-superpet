<template>
	<view class="container">

		<view class="user-info">
			<image :src="user.avatar" class="avatar"></image>
			<view class="info">
				<text class="name">{{ user.username }}\n</text>
				<text class="pets">有{{ user.petNum }}个宠物</text>
			</view>
		</view>
		<navigator url="/pages/pet/insert/insert">
			<view class="card">
				<view class="card-content">
					<text class="card-title">有宠，注册爱宠卡\n</text>
					<text class="card-subtitle">记录爱宠的一生</text>
				</view>
				<image src="../../../static/pages/pet/card/images/img-pet-card-add.png" class="card-image"
					mode="aspectFit"></image>
			</view>
		</navigator>
		<ul>
			<li class="list" v-for="card in cards" :key="card.id">
				<view class="card" >
					<view class="pet-info">
						<view class="info">
							<text class="name" space="emsp">{{ card.petName }} ： {{ card.description }}\n</text>
							<text class="detail" space="emsp">品种：{{card.species}}\n</text>
							<text class="detail" space="emsp">性别：{{card.gender}} 体重：{{card.weight}}kg
								绝育情况：{{card.sterilized}}\n</text>
							<text class="detail" space="emsp">出生日期：{{card.birthDate}}\n</text>
							<text class="detail" space="emsp">到家日期：{{card.homeDate}}   cardID:{{card.id}}</text>
							<button @click="changecard(card.id)"><text class="detail"> 展示该卡片</text></button>
						</view>
					</view>
				</view>
			</li>
		</ul>
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
				cards: [],
				
				// petName: '',
				// weight: '',
				// description: '',
				// gender: '', // 用于存储选择的性别
				// sterilized: '', // 用于存储是否绝育的选择
				// birthDate: '', // 出生日期
				// homeDate: '' // 到家日期
			}
		},
		created() {
			//this.changecard();
			this.getMessage();
		},
		methods: {
			changecard(e){
				console.log(e)
				this.user.updateProperty("cardId",e);
				// uni.navigateTo({
				// 	url:"/pages/pet/pet"
				// })
			},
			navigateBack() {
				uni.navigateBack();
			},
			getMessage() {
				uni.request({
					url: "http://localhost:8080/admin/petcard/myPet/" + this.user.getProperty("userId"),
					// url: "http://localhost:8080/admin/message/getNewFollowersDetail/" + this.user.getProperty("userId"),
					method: "POST",
					success: (res) => {
						console.log("success", res.data.data)
						if (res.statusCode == 200) {

							this.cards = res.data.data;
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
				this.followers = [{}]
			}
		},
		
	}
</script>

<style>
	ul {
		padding: 0px;
		list-style: none;
	}
<<<<<<< HEAD

	.container {
		background-color: #FFD3D3;
		padding: 15px;
	}

	.user-info {
		display: flex;
		align-items: center;
		margin-top: 20px;
	}

	.avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.info {
		flex: 1;
	}

	.name {
		font-weight: bold;
		font-size: 16px;
	}

	.pets {
		color: #555;
		font-size: 14px;
	}

	.card {
		background-color: #fff;
		border-radius: 10px;
		padding: 15px;
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-content {
		flex: 1;
	}

	.card-title {
		font-size: 16px;
		font-weight: bold;
	}

	.card-subtitle {
		color: #888;
		font-size: 14px;
		margin-top: 5px;
	}

	.card-image {
		width: 80px;
		height: 80px;
		margin-left: 10px;
	}
	.select{
		background-color: #fff;
	}
</style>
=======
.container {
  background-color: #FFD3D3;
  height: 100vh;
  padding: 15px;
}
.user-info {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.info {
  flex: 1;
}
.name {
  font-weight: bold;
  font-size: 16px;
}
.pets {
  color: #555;
  font-size: 14px;
}
.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: #374667 3px 3px;
}
.card-content {
  flex: 1;
}
.card-title {
  font-size: 16px;
  font-weight: bold;
}
.card-subtitle {
  color: #888;
  font-size: 14px;
  margin-top: 5px;
}
.card-image {
  width: 80px;
  height: 80px;
  margin-left: 10px;
}
</style>
>>>>>>> 2fd60b8de0d4c7737712169f1c04bd15cffc1515
