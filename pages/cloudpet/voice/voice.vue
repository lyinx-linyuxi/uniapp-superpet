<template>
  <view>
    <view>浏览器录音听写：<button @click="controlRecording">{{ buttonText }}</button></view>
    <view>音频文件听写(16kHz, s16le, pcm)：<input type="file" @change="handleFileChange" /></view>
    <view id="result">{{ resultText }}</view>
  </view>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      APPID: "2e3c1bde",
      API_SECRET: "MzU5NTE1YjFiMzIyZDM0OGJmMDE5YmRj",
      API_KEY: "bcd59f930f0b781a3894f2225244651e",
      btnStatus: "UNDEFINED",
      buttonText: "开始录音",
      resultText: "",
      resultTextTemp: "",
      uniSocketTask: null,
      countdownInterval: null,
    };
  },
  methods: {
    getWebSocketUrl() {
      const url = "wss://iat-api.xfyun.cn/v2/iat";
      const host = "iat-api.xfyun.cn";
      const apiKey = this.API_KEY;
      const apiSecret = this.API_SECRET;
      const date = new Date().toGMTString();
      const algorithm = "hmac-sha256";
      const headers = "host date request-line";
      const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
      const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
      const signature = CryptoJS.enc.Base64.stringify(signatureSha);
      const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
      const authorization = uni.arrayBufferToBase64(new TextEncoder().encode(authorizationOrigin));
      return `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    },
    toBase64(buffer) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return uni.arrayBufferToBase64(new TextEncoder().encode(binary));
    },
    renderResult(resultData) {
      const jsonData = JSON.parse(resultData);
      if (jsonData.data && jsonData.data.result) {
        const data = jsonData.data.result;
        let str = '';
        const ws = data.ws;
        for (let i = 0; i < ws.length; i++) {
          str += ws[i].cw[0].w;
        }
        if (data.pgs) {
          if (data.pgs === "apd") {
            this.resultText = this.resultTextTemp;
          }
          this.resultTextTemp = this.resultText + str;
        } else {
          this.resultText = this.resultText + str;
        }
        this.resultText = this.resultTextTemp || this.resultText || "";
      }
      if (jsonData.code === 0 && jsonData.data.status === 2) {
        this.uniSocketTask.close();
      }
      if (jsonData.code !== 0) {
        this.uniSocketTask.close();
        console.error(jsonData);
      }
    },
    connectWebSocket(callback) {
      const websocketUrl = this.getWebSocketUrl();
      if (this.uniSocketTask === null) {
        this.uniSocketTask = uni.connectSocket({
          url: websocketUrl,
          success: () => {
            console.log("WebSocket连接成功");
          },
          fail: (error) => {
            console.error("WebSocket连接失败", error);
          }
        });

        this.uniSocketTask.onOpen(() => {
          const params = {
            common: { app_id: this.APPID },
            business: {
              language: "zh_cn",
              domain: "iat",
              accent: "mandarin",
              vad_eos: 5000,
              dwa: "wpgs",
            },
            data: { status: 0, format: "audio/L16;rate=16000", encoding: "raw" },
          };
          this.uniSocketTask.send({ data: JSON.stringify(params) });
          callback();
        });

        this.uniSocketTask.onMessage((e) => {
          this.renderResult(e.data);
        });

        this.uniSocketTask.onError((e) => {
          console.error(e);
        });

        this.uniSocketTask.onClose(() => {
          this.uniSocketTask = null;
        });
      }
    },
    controlRecording() {
      if (this.btnStatus === "UNDEFINED" || this.btnStatus === "CLOSED") {
        this.connectWebSocket(() => {
          this.startRecording();
        });
      } else if (this.btnStatus === "CONNECTING" || this.btnStatus === "OPEN") {
        this.stopRecording();
      }
    },
    startRecording() {
      this.changeBtnStatus("CONNECTING");
      const recordManager = uni.getRecorderManager();
      recordManager.onStart(() => {
        this.changeBtnStatus("OPEN");
        this.countdown();
      });
      recordManager.start({
        duration: 60000,
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 96000,
        format: 'pcm'
      });
      recordManager.onFrameRecorded((res) => {
        const { isLastFrame, frameBuffer } = res;
        if (this.uniSocketTask && this.uniSocketTask.readyState === this.uniSocketTask.OPEN) {
          this.uniSocketTask.send({
            data: JSON.stringify({
              data: {
                status: isLastFrame ? 2 : 1,
                format: "audio/L16;rate=16000",
                encoding: "raw",
                audio: this.toBase64(frameBuffer),
              },
            }),
          });
          if (isLastFrame) {
            this.changeBtnStatus("CLOSING");
          }
        }
      });
      recordManager.onStop((res) => {
        clearInterval(this.countdownInterval);
      });
    },
    stopRecording() {
      const recordManager = uni.getRecorderManager();
      recordManager.stop();
    },
    countdown() {
      let seconds = 60;
      this.buttonText = `录音中（${seconds}s）`;
      this.countdownInterval = setInterval(() => {
        seconds -= 1;
        if (seconds <= 0) {
          clearInterval(this.countdownInterval);
          this.stopRecording();
        } else {
          this.buttonText = `录音中（${seconds}s）`;
        }
      }, 1000);
    },
    changeBtnStatus(status) {
      this.btnStatus = status;
      if (status === "CONNECTING") {
        this.buttonText = "建立连接中";
        this.resultText = "";
        this.resultTextTemp = "";
      } else if (status === "OPEN") {
        this.countdown();
      } else if (status === "CLOSING") {
        this.buttonText = "关闭连接中";
      } else if (status === "CLOSED") {
        this.buttonText = "开始录音";
      }
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.connectWebSocket(() => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = (evt) => {
            const audioString = this.toBase64(evt.target.result);
            let offset = 0;
            while (offset < audioString.length) {
              const subString = audioString.substring(offset, offset + 1280);
              offset += 1280;
              const isEnd = offset >= audioString.length;
              this.uniSocketTask.send({
                data: JSON.stringify({
                  data: {
                    status: isEnd ? 2 : 1,
                    format: "audio/L16;rate=16000",
                    encoding: "raw",
                    audio: subString,
                  },
                }),
              });
            }
          };
          reader.onerror = () => {
            this.uniSocketTask.close();
          };
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
