<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<button @click="voiceBegain">讯飞语音识别</button>
		<view v-if="words1">
			这是searchValue：{{words1}}
		</view>
		<view v-if="words2">
			这是searchText：{{words2}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				words1: '',
				words2: ''
			}
		},
		onLoad() {

		},
		methods: {
			send() {
				uniCloud.callFunction({
					name: 'sendcode',
					success: (e) => {
						console.log('这是发送验证码', e);
					}
				})
			},
			// 调用讯飞语音识别
			voiceBegain() {
				let _this = this;
				let options = {};
				//#ifdef APP-PLUS || APP-PLUS-NVUE
				options.engine = 'iFly';
				options.punctuation = false; // 是否需要标点符号 
				options.timeout = 10 * 1000; //语音录入持续时长
				plus.speech.startRecognize(options, function(s) {
					_this.searchText = _this.searchText + s;
					console.log(_this.searchText) //拿到语音识别的结果
					//下面是逻辑  
					_this.searchValue = s;
					_this.searchText = ""
					
					// 打印输出结果
					 _this.words1 = _this.searchValue
					 _this.words2 = _this.searchText
					 
					// 关闭语音
					plus.speech.stopRecognize();
				});
				//#endif
				// #ifdef H5
				alert("只有h5平台才有alert方法")
				// #endif
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

