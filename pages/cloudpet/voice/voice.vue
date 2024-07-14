<template>
  <view class="content">
	<textarea class="result" placeholder="语音识别内容" :value="result"></textarea>
	<view class="recogniz">
		<view style="color: #0000CC;">
			<text>{{title}}</text>
		</view>
		<view class="partial">
			<text>{{partialResult}}</text>
		</view>
		<view class="volume" :style="{width:valueWidth}"></view>
	</view>
	<button type="default" @touchstart="startRecognize" @touchend="endRecognize">按下开始&amp;松开结束</button>
  </view>
</template>
<script>
export default {
    data() {
      return {
		title: '未开始',
        text: '',
		partialResult: '...',
        result: '',
		valueWidth: '0px'
      }
    },
    onLoad() {
// #ifdef APP-PLUS
		// 监听语音识别事件
		plus.speech.addEventListener('start', this.ontStart, false);
		plus.speech.addEventListener('volumeChange', this.onVolumeChange, false);
		plus.speech.addEventListener('recognizing', this.onRecognizing, false);
		plus.speech.addEventListener('recognition', this.onRecognition, false);
		plus.speech.addEventListener('end', this.onEnd, false);
// #endif
    },
	methods: {
		ontStart() {
			this.title = '...倾听中...';
			this.text = '';
			console.log('Event: start');
		},
		onVolumeChange(e) {
			this.valueWidth = 100*e.volume+'px';
			console.log('Event: volumeChange '+this.valueWidth);
		},
		onRecognizing(e) {
			this.partialResult = e.partialResult;			
			console.log('Event: recognizing');
		},
		onRecognition(e) {
			this.text += e.result;
			this.text?(this.text+='\n'):this.text='';
			this.result = this.text;
			this.partialResult = e.result;
			console.log('Event: recognition');
		},
		onEnd() {
			if(!this.text||this.text==''){
				plus.nativeUI.toast('没有识别到内容');
			}
			this.result = this.text;
			this.title = '未开始';
			this.valueWidth = '0px';
			this.partialResult = '...';
		},
		startRecognize() {
			console.log('startRecognize');
// #ifdef APP-PLUS
			plus.speech.startRecognize({
				engine: 'baidu',
				lang: 'zh-cn',
				'userInterface': false,
				'continue': true
			});
// #endif
		},
		endRecognize() {
			console.log('endRecognize');
// #ifdef APP-PLUS
			plus.speech.stopRecognize();
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
.recogniz {
    width: 200px;
    height: 100px;
    padding: 12px;
    margin: 50px auto;
    background-color: rgba(0,0,0,0.5);
    border-radius: 16px;
	text-align: center;
}
.partial {
    width: 100%;
    height: 40px;
    margin-top: 16px;
    font-size: 12px;
    color: #FFFFFF;
}
.volume {
	width: 10px;
	height: 6px;
	border-style:solid;
	display:inline-block;
	box-sizing:border-box;
	border-width:1px;
	border-color:#CCCCCC;
	border-radius: 50%;
    background-color: #00CC00;
}
.result {
	color: #CCCCCC;
	border: #00CCCC 1px solid;
	margin: 25px auto;
	padding: 6px;
	width: 80%;
	height: 100px;
}
</style>

