<template>
  <view class="container">
    <view class="section form-section">
      <view class="user-info">
        <image src="../../../static/pages/index/home/images/greenpet.jpg" class="avatar"></image>
      </view>
      <view class="form">
        <view class="form-item">
          <text class="label">标题：</text>
          <input type="text" placeholder="点击输入标题" v-model="post.title" class="input" />
        </view>
        <view class="form-item">
          <text class="label">内容：</text>
          <input type="text" placeholder="点击输入内容" v-model="post.subtitle" class="input" />
        </view>
        <view class="form-item">
          <text class="label">日期：</text>
          <uni-datetime-picker @change="onDateChange" :value="post.date" type="date" placeholder="点击设置日期"></uni-datetime-picker>
        </view>
        <button class="submit-button" @click="submitPost">完成填写</button>
      </view>
    </view>
    <view class="section empty-section"></view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        subtitle: '',
        date: ''
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
    onDateChange(event) {
      this.post.date = event.detail.value;
    },
	submitPost(){
		uni.navigateTo({
			url:"/pages/pet/pet"
		})
	}
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.section {
  width: 100%;
}
.form-section {
  background-color: #fff;
  padding: 15px;
  flex: 1;
}
.empty-section {
  background-color: #F5F5F5;
  flex: 1;
}
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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
}
.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #32CD32;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
}
</style>


