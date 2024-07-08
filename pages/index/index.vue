<template>
  <view class="container">
    <view class="tab-bar">
      <view :class="{'active-tab': activeTab === 'follow'}" @click="switchTab('follow')">关注</view>
      <view :class="{'active-tab': activeTab === 'circle'}" @click="switchTab('circle')">宠物圈</view>
    </view>
    <scroll-view scroll-y class="content">
      <view v-if="activeTab === 'follow'">
        <!-- 关注的内容 -->
        <view class="post" v-for="(post, index) in followPosts" :key="index">
          <image :src="post.image" class="post-image"></image>
          <text>{{ post.text }}</text>
        </view>
      </view>
      <view v-if="activeTab === 'circle'">
        <!-- 宠物圈的内容 -->
        <view class="post" v-for="(post, index) in circlePosts" :key="index">
          <image :src="post.image" class="post-image"></image>
          <text>{{ post.text }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'follow',
      followPosts: [
        { image: '/static/follow1.jpg', text: '这是关注内容1' },
        { image: '/static/follow2.jpg', text: '这是关注内容2' }
      ],
      circlePosts: [
        { image: '/static/circle1.jpg', text: '这是宠物圈内容1' },
        { image: '/static/circle2.jpg', text: '这是宠物圈内容2' }
      ]
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
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
.tab-bar {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px 0;
}
.tab-bar view {
  padding: 10px;
  font-weight: bold;
}
.active-tab {
  color: #FF69B4;
  border-bottom: 2px solid #FF69B4;
}
.content {
  flex: 1;
}
.post {
  padding: 15px;
  border-bottom: 1px solid #eee;
}
.post-image {
  width: 100%;
  height: 200px;
}
</style>
