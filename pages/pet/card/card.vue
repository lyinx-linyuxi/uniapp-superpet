<template>
  <view class="container">
    
    <view class="user-info">
      <image :src="user.avatar" class="avatar"></image>
      <view class="info">
        <text class="name">{{ user.name }}\n</text>
        <text class="pets">有{{ user.petCount }}个宠物</text>
      </view>
    </view>
	<navigator url="/pages/pet/insert/insert">
		<view class="card">
		  <view class="card-content">
		    <text class="card-title">有宠，注册爱宠卡\n</text>
		    <text class="card-subtitle">记录爱宠的一生</text>
		  </view>
		  <image src="../../../static/pages/pet/card/images/img-pet-card-add.png" class="card-image" mode="aspectFit"></image>
		</view>
	</navigator>
</view>
</template>

<script>
export default {
  data() {
    return {
      user: {
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        name: '朝歌铲屎官',
        petCount: 2
      }
    }
  },
  methods: {
    navigateBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style>
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
