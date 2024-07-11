<template>
	<swiper class="swiper" :indicator-dots="true">
					<swiper-item>
						<uni-grid :column="3" :highlight="true" @change="change">
							<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
								<view class="grid-item-box">
									<image :src="item.url" class="image" mode="aspectFill" />
									<text class="text">{{ item.text }}</text>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="3" :highlight="true" @change="change">
							<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
								<view class="grid-item-box">
									<image :src="item.url" class="image" mode="aspectFill" />
									<text class="text">{{ item.text }}</text>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="3" :highlight="true" @change="change">
							<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
								<view class="grid-item-box">
									<image :src="item.url" class="image" mode="aspectFill" />
									<text class="text">{{ item.text }}</text>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
	</swiper>
	<view class="container">
		
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				dynamicList: [],
				list: [{
						url: '/static/c1.png',
						text: 'Grid 1',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/c2.png',
						text: 'Grid 2',
						badge: '1',
						type: "success"
					},
					{
						url: '/static/c3.png',
						text: 'Grid 3',
						badge: '99',
						type: "warning"
					},
					{
						url: '/static/c4.png',
						text: 'Grid 4',
						badge: '2',
						type: "error"
					},
					{
						url: '/static/c5.png',
						text: 'Grid 5'
					},
					{
						url: '/static/c6.png',
						text: 'Grid 6'
					},
					{
						url: '/static/c7.png',
						text: 'Grid 7'
					},
					{
						url: '/static/c8.png',
						text: 'Grid 8'
					},
					{
						url: '/static/c9.png',
						text: 'Grid 9'
					}
				]
			}
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
				this.list[index].badge && this.list[index].badge++

				uni.showToast({
					title: `选择该皮肤`,
					icon: 'none'
				})
			}
		}
	}
</script>


<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}
	
	.grid-item-box {
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
		}

	.swiper {
		height: 420px;
	}
	.container{
		margin-top: 20px;
		height: 400px;
		background-color: gray;
	}

</style>


