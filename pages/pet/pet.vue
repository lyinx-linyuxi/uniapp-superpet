<template>
  <view class="container">
    <view class="header">
      <navigator url="/pages/pet/card/card" >
      		<text class="centered-bottom-text">我的萌宠</text>
          </navigator>
      
    </view>
    <view class="section top-section">
      <view class="pet-info">
        <view class="info">
          <text class="name">{{ pet.name }} ({{ pet.breed }})\n</text>
          <text class="detail">年龄：4岁4个月 \n</text>
          <text class="detail">体重：1.5kg \n</text>
          <text class="detail">爱好：想吃什么就吃什么 \n</text>
        </view>
        <image :src="pet.avatar" class="avatar"></image>
      </view>
    </view>
    <view class="section middle-section">
      <view class="tab-bar">
        <view class="tab-item">
          <text class="count">{{ photoCount }}\n</text>
          <text>写真</text>
        </view>
        <view class="tab-item">
          <text class="count">{{ diaryCount }}\n</text>
          <text>传记</text>
        </view>
        <view class="tab-item">
          <text class="count">{{ healthCount }}\n</text>
          <text>健康</text>
        </view>
      </view>
    </view>
    <view class="section bottom-section">
      <scroll-view scroll-y class="content">
        <view v-for="(post, index) in posts" :key="index" class="timeline-item">
          <view class="date">{{ post.date }}\n</view>
          <view class="post">
            <text class="title">{{ post.title }}\n</text>
            <text class="subtitle">{{ post.subtitle }}\n</text>
            <view class="actions">
              <text class="like">❤</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pet: {
        avatar: '/static/pet-avatar.jpg',
        name: '旺财',
        breed: '柯基'
      },
      posts: [
        { date: '8月14日', title: '体内驱虫', subtitle: '体内驱虫', type: 'health' },
        { date: '8月14日', title: '体重1.5千克', subtitle: '体内驱虫', type: 'health' },
        // 添加更多帖子
      ]
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
    goToPetCardPage() {
      uni.navigateTo({
        url: '/pages/pet/card/card'
      });
    },
    navigateBack() {
      uni.navigateBack();
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
.header {
  background-color: #FFD3D3;
  padding: 15px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.centered-bottom-text {
  text-align: center;
}
.left-icon, .right-icon {
  font-size: 24px;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.section {
  width: 100%;
}
.top-section {
  background-color: #fff;
  padding: 15px;
}
.pet-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #FFD3D3;
  padding: 15px;
  border-radius: 10px;
}
.info {
  flex: 1;
  margin-right: 10px;
}
.name {
  font-weight: bold;
  font-size: 16px;
}
.detail {
  color: #555;
  font-size: 14px;
  margin-top: 5px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.middle-section {
  background-color: #fff;
  padding: 10px 0;
}
.tab-bar {
  display: flex;
  justify-content: space-around;
}
.tab-item {
  text-align: center;
  flex: 1;
  font-weight: bold;
}
.count {
  font-size: 18px;
  color: #FF69B4;
  margin-bottom: 5px;
}
.bottom-section {
  background-color: #F5F5F5;
  flex: 1;
  padding: 10px;
}
.content {
  flex: 1;
  margin-top: 10px;
}
.timeline-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.date {
  width: 60px;
  text-align: center;
  color: #FF69B4;
  font-size: 14px;
}
.post {
  flex: 1;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.title {
  font-weight: bold;
}
.subtitle {
  color: #888;
  font-size: 14px;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
.like {
  font-size: 20px;
  color: #FF69B4;
}
</style>
