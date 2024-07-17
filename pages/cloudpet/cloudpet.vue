<template>
  <view class="contain">
    <view class="image-container">
      <image src="../../static/pages/weather/未来2.gif" class="gif-image"></image>
    </view>
    <view class="button-container">
      <button class="left-button" @click="goToWeatherPage">天气查询</button>
      <button class="center-button" @click="goToAiPage">AI问答</button>
      <button class="right-button" @click="goToVoicePage">语音交互</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      goToWeatherPage() {
        uni.navigateTo({
         url:'/pages/cloudpet/weather/weather' // 请替换为实际的页面路径
        });
      },
      goToAiPage() {
        uni.navigateTo({
          url:'/pages/cloudpet/ask/ask' // 请替换为实际的页面路径
        });
      },
      goToVoicePage() {
        uni.navigateTo({
         url:'/pages/cloudpet/voice/voice' // 请替换为实际的页面路径
        });
      }
    }
  }
</script>

<style>
  .contain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
	background-color: #fff5d9;
  }
  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
	
  }
  .gif-image {
    width: 100%;
    max-width: 400px;
    height: 330px;
  }
  .button-container {
    display: flex;
	flex-direction: column;
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
	
  }
  .left-button, .center-button, .right-button {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    color: white;
    border: none;
    border-radius: 25px;
	font-size: 20px;
	font-weight: bold;
    text-align: center;
    background-size: cover;
    background-position: center;
	box-shadow: #374667 3px 3px;
	margin-top: 10px;
  }
  .left-button {
    background-color: #ff9aab;
  }
  .center-button {
    background-color: #06b3fe;
  }
  .right-button {
    background-color: #fdc000;
  }
</style>
