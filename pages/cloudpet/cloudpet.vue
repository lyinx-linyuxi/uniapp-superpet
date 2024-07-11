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
          url: '/pages/voice/voice-query' // 请替换为实际的页面路径
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
  }
  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .gif-image {
    width: 100%;
    max-width: 500px;
    height: 400px;
  }
  .button-container {
    display: flex;
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
    border-radius: 5px;
    text-align: center;
    background-size: cover;
    background-position: center;
  }
  .left-button {
    background-color: #ff7f50;
  }
  .center-button {
    background-color: #32cd32;
  }
  .right-button {
    background-color: #1e90ff;
  }
</style>
