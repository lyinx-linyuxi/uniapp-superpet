<template>
	<view class="ai-chat-view">
		<ul class="ai-chat-list" ref="aiChatListRef">
			<li class="ai-chat-item">
				<!-- 头像 -->
				<div class="ai-chat-avatar">
					<image
						src="https://img1.baidu.com/it/u=2640995470,2945739766&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" />
				</div>
				<!-- 内容 -->
				<div class="ai-chat-content-box init-box">
					<div class="ai-chat-title">AI 工具</div>
					<div class="ai-chat-text">能够学习和理解人类的语言，进行多轮对话</div>
					<div class="ai-chat-text">
						回答问题，高效便捷地帮助人们获取信息、知识和灵感
					</div>
				</div>
			</li>
			<!-- 会话列表 -->
			<li class="ai-chat-item" v-for="(chatItem, index) of historyTextList">
				<!-- 用户头像 -->
				<div class="ai-chat-avatar" v-if="chatItem.role === 'user'">
					<image src="../../../static/pages/ai/天气.jpg" />
				</div>
				<!-- AI头像 -->
				<div class="ai-chat-avatar" v-if="chatItem.role === 'assistant'">
					<image :size="40"
						src="https://img1.baidu.com/it/u=2640995470,2945739766&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" />
				</div>
				<!-- 用户提问问题 -->
				<div class="ai-chat-content-box" :class="chatItem.role + '-box'" v-if="chatItem.role === 'user'">
					{{ chatItem.content }}
				</div>
				<!-- AI回复内容 -->
				<div class="ai-chat-content-box" :class="chatItem.role + '-box'" v-if="chatItem.role === 'assistant'">
					AI 回复内容{{index}}
					<zero-markdown-view :markdown="chatItem.content"></zero-markdown-view>
					<!-- 加载图表 -->
					<div class="loading-icon-box" v-if="loadingIndex === index">
						<uni-icons type="spinner-cycle" size="20"></uni-icons>
					</div>
					<!-- 操作容器（重新回答、删除、复制） -->
					<div class="ai-chat-operate">
						<span class="re-reply-btn" @click="reReply(index)" :class="{ disabled: sendBtnDisabled }">
							重新回答
						</span>
						<div class="operate-icon-box" :class="{ disabled: sendBtnDisabled }">
							<uni-icons @click="copyRecord(chatItem, index)" type="paperclip" size="20px"></uni-icons>
							<uni-icons @click="deleteRecord(index)" type="trash" size="20px"></uni-icons>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="ai-chat-form-wrapper">
			<div class="ai-chat-form-box">
				<textarea v-model="TEXT" :rows="4" placeholder="在此输入您想了解的内容..."
					@keydown.enter.exact.prevent="sendToSpark" @keydown.enter.shift.exact.prevent="TEXT += '\n'">
		        </textarea>
				<div class="chat-form-footer">
					<div class="btns">
						<uni-icons :type="stared ? 'star-filled' : 'star'" size="20px" color="#ff0000"
							@click="starReply()"></uni-icons>
						<span class="content-tips">
							{{ TEXT.length }} / {{ maxCharCount }}
						</span>
						<span>
							<button type="primary" @click="sendToSpark()" :disabled="sendBtnDisabled">
								发送
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 其他内容 -->
		<!-- 		<view class="input-container">
			<uni-easyinput v-model="TEXT" type="textarea" :auto-height="true" :focus="true" :clearable="true"
				placeholder="请输入内容" @input="input" class="input-box" />
			<button class="send-button" @click="sendToSpark()">发送</button>
		</view> -->
		<!-- 		<view class="content-container">

			<text style="width: 90%; flex-wrap: wrap;">{{sparkResult}}</text>
		</view> -->

	</view>
</template>

<script>
	import * as base64 from "base-64";
	import CryptoJS from "crypto-js";
	import parser from "fast-xml-parser";
	import * as utf8 from "utf8";
	import URL from 'url';
	import {
		copyToClipboard
	} from "/utils/commonUtils.js";
	const httpUrl = "https://spark-api.xf-yun.com/v4.0/chat";
	const APPID = '6c3aa33b';
	const APISecret = 'Y2UzOTVjY2YxZTdlNjI3ZjE0NGI2NTg4';
	const APIKey = 'a1d7d3cbf7be5e84e12bbb52bb684e9f';
	export default {

		data() {
			return {
				stared: false,
				sendBtnDisabled: false,
				loadingIndex: -1,
				TEXT: '',
				placeholderStyle: "color:#2979FF;font-size:14px",
				styles: {
					color: '#2979FF',
					borderColor: '#2979FF'
				},
				maxCharCount: 400,
				modelDomain: '',
				sparkResult: '',
				historyTextList: [],
				tempRes: '',
				status: 'Available'
			}
		},
		methods: {
			starReply() {
				this.stared = !this.stared;
				const fs = require('fs');
				const jsonData = JSON.stringify(this.historyTextList, null, 2);
				fs.writeFile('data.json', jsonData, (err) => {
					if (err) {
						console.error('Error writing file:', err);
					} else {
						console.log('File has been written');
					}
				});
			},
			copyRecord(chatItem, index) {
				if (!this.sendBtnDisabled) {
					const content = chatItem.content;
					copyToClipboard({
						content: content,
						success: () => {
							//复制成功
							uni.showToast({
								message: "复制成功",
								icon: "success",
							});
						},
						error: () => {
							//复制失败
							uni.showToast({
								message: "复制失败",
								icon: "fail"
							});
						},
					});
				}
			},
			//删除聊天记录
			deleteRecord(index) {
				if (!this.sendBtnDisabled) {
					this.historyTextList.splice(index, 1);
				}
			},
			reReply(index) {
				if (this.status !== "Answering") {
					// 如果是最后一条内容，直接删除最后一条回答记录并重新作答
					if (this.historyTextList.length - 1 === index) {
						this.TEXT = this.historyTextList[index - 1].content;
						console.log("换原问题:", this.TEXT);
						this.deleteRecord(index);
						// 重新回答的按钮变为禁用状态
						this.sendBtnDisabled = true;
						console.log("删除最后一条重发:", this.historyTextList);
						this.sendToSpark()
					} else {
						let i = index - 1;
						while (i >= 0) {
							if (this.historyTextList[i].role === "user" && this.historyTextList[i].content) {
								this.historyTextList.push({
									role: "user",
									content: this.historyTextList[index - 1].content,
								});
								// 禁用重新回答按钮
								this.sendBtnDisabled = true;
								console.log("删除最后?条重发:", this.historyTextList);
								this.sendToSpark()
								break;
							}
							i--;
						}
					}
				}
			},
			input(e) {
				console.log('输入内容：', e);
			},
			async sendToSpark() {
				console.log("historylist", this.historyTextList);
				this.sendBtnDisabled = true;
				let myUrl = await this.getWebSocketUrl();
				this.tempRes = "";
				let realThis = this;
				this.socketTask = uni.connectSocket({
					url: myUrl,
					method: 'GET',
					success: res => {
						console.log(res, "ws成功连接...", myUrl)
						realThis.wsLiveFlag = true;
					}
				});
				realThis.socketTask.onError((res) => {
					console.log("连接发生错误，请检查appid是否填写", res)
				});
				realThis.socketTask.onOpen((res) => {
					this.historyTextList.push({
						"role": "user",
						"content": this.TEXT
					});
					this.loadingIndex = this.historyTextList.length;
					console.info("wss的onOpen成功执行...", res);
					console.log("loadingIdex", this.loadingIndex);
					let params = {
						"header": {
							"app_id": APPID,
							"uid": "aef9f963-7"
						},
						"parameter": {
							"chat": {
								"domain": this.modelDomain,
								"temperature": 0.5,
								"max_tokens": 1024
							}
						},
						"payload": {
							"message": {
								"text": this.historyTextList
							}
						}
					};
					console.log("请求的params：" + JSON.stringify(params));
					this.TEXT = '';
					console.log("发送第一帧...", params);
					realThis.socketTask.send({
						data: JSON.stringify(params),
						success() {
							console.log('第一帧发送成功');
						},
						failed() {
							console.log('第一帧发送失败');
							this.sendBtnDisabled = false;
						}
					});
				});

				realThis.socketTask.onMessage((res) => {
					let obj = JSON.parse(res.data);
					console.log('收到API返回的内容：', res.data);
					if (obj.header.code !== 0) {
						console.log(`${obj.header.code}:${obj.message}`);
						realThis.socketTask.close({
							success(res) {
								console.log('关闭成功', res);
								realThis.wsLiveFlag = false;
							},
							fail(err) {
								console.log('关闭失败', err);
							}
						});
						return;
					}
					let statusCode = obj.header.status;
					let dataArray = obj.payload.choices.text;
					if (statusCode === 0) {
						this.status = "Answering";
						this.historyTextList.push({
							"role": "assistant",
							"content": ""
						});
					}
					for (let i = 0; i < dataArray.length; i++) {
						// realThis.sparkResult = realThis.sparkResult + dataArray[i].content;
						// realThis.tempRes = realThis.tempRes + dataArray[i].content;
						this.historyTextList[this.historyTextList.length - 1].content += dataArray[i].content;
						console.log("最近一条记录", this.historyTextList[this.historyTextList.length - 1]);
					}
					if (res.data && obj.header.status === 2) {
						this.status = 'Available';
						this.sendBtnDisabled = false;
						this.loadingIndex = -1;
						setTimeout(() => {
							realThis.socketTask.close({
								success(res) {
									console.log('关闭成功', res);
								},
								fail(err) {
									console.log('关闭失败', err);
								}
							});
						}, 1000);

					}
				});
			},
			getWebSocketUrl() {
				console.log(httpUrl);
				var httpUrlHost = (httpUrl).substring(8, 28);
				var httpUrlPath = (httpUrl).substring(28);
				console.log(httpUrlHost);
				console.log(httpUrlPath);
				switch (httpUrlPath) {
					case "/v1.1/chat":
						this.modelDomain = "general";
						break;
					case "/v2.1/chat":
						this.modelDomain = "generalv2";
						break;
					case "/v3.1/chat":
						this.modelDomain = "generalv3";
						break;
					case "/v3.5/chat":
						this.modelDomain = "generalv3.5";
						break;
					case "/v4.0/chat":
						this.modelDomain = "4.0Ultra";
						break;
				}
				console.log(this.modelDomain);

				return new Promise((resolve, reject) => {
					var url = "wss://" + httpUrlHost + httpUrlPath;
					var host = "spark-api.xf-yun.com";
					var apiKeyName = "api_key";
					var date = new Date().toGMTString();
					var algorithm = "hmac-sha256";
					var headers = "host date request-line";
					var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrlPath} HTTP/1.1`;
					var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, APISecret);
					var signature = CryptoJS.enc.Base64.stringify(signatureSha);
					var authorizationOrigin =
						`${apiKeyName}="${APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
					var authorization = base64.encode(authorizationOrigin);
					url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;
					console.log("url:"+url);
					resolve(url);
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.ai-chat-view {
		background-color: #fff;
		padding: 20px 8px;
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		image {
			max-width: 40px;
			max-height: 40px;
		}

		.ai-chat-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow-y: auto;

			// 去掉滚动条
			/* Firefox */
			scrollbar-width: none;
			/* IE10+ */
			-ms-overflow-style: none;
			/* Firefox */
			overflow: -moz-scrollbars-none;

			/* webkit */
			&::-webkit-scrollbar {
				display: none;
			}

			// 会话项
			.ai-chat-item {
				display: flex;
				align-items: flex-start; //子元素在y轴上从上到下排列
				margin-bottom: 20px;
			}

			// 会话头像
			.ai-chat-avatar {
				margin-right: 12px;
			}

			// 会话内容盒子
			.ai-chat-content-box {
				padding: 8px 15px;

				// 会话加载图标盒子
				.loading-icon-box {
					.uni-icon {
						transform: translate(0, 0); //2d位移
						animation: rotate 3s linear infinite; //动画效果持续3s 的无限动画
					}

					@keyframes rotate {

						//规定动画位移的动作
						0% {
							transform: translate(0, 0) rotate(0deg);
						}

						100% {
							transform: translate(0, 0) rotate(360deg);
						}
					}
				}

				// 会话列表初始化盒子
				&.init-box {
					width: 100%;
					background: #eff7ff;
					border-radius: 10px;
					background-image: url("https://ydcqoss.ydcode.cn/static/officialhome/ai-chat-init-bg.png");
					background-size: cover;
					background-repeat: no-repeat;

					.ai-chat-title {
						font-size: 20px;
						color: #005fdb;
						margin-bottom: 5px;
					}

					.ai-chat-text {
						font-size: 12px;
						color: #666666;
						line-height: 1.8;
					}
				}

				&.user-box {
					background: #fff;
					padding-left: 0;
					padding-top: 0;
					line-height: 2;
				}

				//ai会话项
				&.assistant-box {
					width: 100%;
					background: #eff7ff;
					border-radius: 10px;
				}
			}

			.ai-chat-operate {
				display: flex;
				justify-content: space-between;
				align-items: center;
				cursor: pointer;

				// 重新回答
				.re-reply-btn {
					font-size: 14px;
					color: #2984ff;

					&.disabled {
						color: #ccc;
					}
				}

				//  操作图标
				.operate-icon-box {
					display: flex;
					align-items: center;

					.uni-icon {
						color: #7094c4;
						margin-left: 16px;
						cursor: pointer;
					}

					&.disabled .el-icon {
						color: #ccc;
					}
				}
			}
		}

		.ai-chat-form-wrapper {
			padding-left: calc(20px + 12px); // 20px:头像的宽度  12px:头像和会话框的距离
			background-color: #fff;
			z-index: 1;

			.ai-chat-form-box {
				border: 1px solid #526ef9;
				border-radius: 10px;
				position: relative;
			}

			// 多行文本
			textarea {
				width: auto; // 减去滚动条的宽度
				box-sizing: border-box;
				margin-top: 2px;
				padding: 0.5rem 6rem 1rem 1.25rem;
				padding-bottom: 0;
				border: none;
				outline: none;
				resize: none;
				background: #fff;
				border-radius: 10px;
				font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei,
					Helvetica Neue, sans-serif;
				color: #666666;

				&::-webkit-scrollbar {
					width: 3px;
				}
			}

			// 发送问题表单footer
			.chat-form-footer {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin-top: -5px;
				background: #fff;
				position: absolute;
				bottom: 1rem;
				right: 1rem;

				// 内容字数提示
				.content-tips {
					margin-right: 1.25rem;
				}
			}
		}
	}

	// 		.ai-chat-view {
	// 	background-color: #fff;
	// 	padding: 40px 16px;
	// 	flex: 1;
	// 	display: flex;
	// 	flex-direction: column;
	// 	overflow: hidden;
	// }

	// .ai-chat-view .ai-chat-list {
	// 	flex: 1;
	// 	display: flex;
	// 	flex-direction: column;
	// 	overflow-y: auto;
	// }

	// .ai-chat-view .ai-chat-item {
	// 	display: flex;
	// 	align-items: flex-start;
	// 	margin-bottom: 40px;
	// }

	// .ai-chat-view .ai-chat-avatar {
	// 	margin-right: 24px;
	// }

	// .ai-chat-view .ai-chat-content-box {
	// 	padding: 16px, 30px;
	// }

	// .ai-chat-view .ai-chat-content-box .loading-icon-box {}

	// &.init-box {
	// 	width: 100%;
	// 	background: #000;
	// 	border-radius: 10px;
	// 	background-image: url("https://ydcqoss.ydcode.cn/static/officialhome/ai-chat-init-bg.png");
	// 	background-size: cover;
	// 	background-repeat: no-repeat;
	// }

	// .ai-chat-view .ai-chat-content-box .init-box .ai-chat-title {
	// 	font-size: 1.125rem;
	// 	color: #005fdb;
	// 	margin-bottom: 1rem;
	// }

	// .ai-chat-view .ai-chat-content-box .init-box .ai-chat-text {
	// 	font-size: 0.875rem;
	// 	color: #666666;
	// 	line-height: 1.8;
	// }
	uni-page-body {
		min-height: 100% !important;
		height: auto !important;
		padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
		/*兼容 IOS<11.2*/
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
		/*兼容 IOS>11.2*/
		display: flex;
	}
</style>