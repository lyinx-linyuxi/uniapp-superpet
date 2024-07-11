<template>
  <view >
    <uni-easyinput  v-model="TEXT"  focus="true" clearable="true"  :palceholderstyle="placeholderstyle" :style="style" placeholder="请输入内容"@input="input"  />
    <button style="background-color: blue; color: white;  margin-top: 15px;" @click="sendToSpark()">发送</button>
    <text style="width: 90%; flex-wrap: wrap;">{{sparkResult}}</text>
  </view>
</template>
<script>
  import * as base64 from "base-64";
  import CryptoJS from "crypto-js";
  import parser from "fast-xml-parser";
  import * as utf8 from "utf8";
  import URL from 'url';

  export default {
    
    data() {
      return {
        TEXT: '',
		placeholderStyle: "color:#2979FF;font-size:14px",
						styles: {
							color: '#2979FF',
							borderColor: '#2979FF'
						},
        httpUrl: "https://spark-api.xf-yun.com/v3.5/chat",
        modelDomain: '',
        APPID: '6c3aa33b',
        APISecret: 'Y2UzOTVjY2YxZTdlNjI3ZjE0NGI2NTg4',
        APIKey: 'a1d7d3cbf7be5e84e12bbb52bb684e9f',
        sparkResult: '',
        historyTextList: [],
        tempRes: ''
      }
    },
    methods: {
		input(e) {
			console.log('输入内容：', e);
		},
      async sendToSpark() {
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
          console.info("wss的onOpen成功执行...", res);
          let params = {
            "header": {
              "app_id": this.APPID,
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
          this.sparkResult = this.sparkResult + "\r\n——————————————————————————————————————————————————"+"\r\n我：" + this.TEXT + "\r\n";
          this.sparkResult = this.sparkResult + "初音未来：";
          console.log("发送第一帧...", params);
          realThis.socketTask.send({
            data: JSON.stringify(params),
            success() {
              console.log('第一帧发送成功');
            }
          });
        });

        realThis.socketTask.onMessage((res) => {
          console.log('收到API返回的内容：', res.data);
          let obj = JSON.parse(res.data);
          let dataArray = obj.payload.choices.text;
          for (let i = 0; i < dataArray.length; i++) {
            realThis.sparkResult = realThis.sparkResult + dataArray[i].content;
            realThis.tempRes = realThis.tempRes + dataArray[i].content;
          }
          let temp = JSON.parse(res.data);
          if (temp.header.code !== 0) {
            console.log(`${temp.header.code}:${temp.message}`);
            realThis.socketTask.close({
              success(res) {
                console.log('关闭成功', res);
                realThis.wsLiveFlag = false;
              },
              fail(err) {
                console.log('关闭失败', err);
              }
            });
          }
          if (temp.header.code === 0) {
            if (res.data && temp.header.status === 2) {
              realThis.sparkResult = realThis.sparkResult + "\r\n——————————————————————————————————————————————————";
              this.historyTextList.push({
                "role": "assistant",
                "content": this.tempRes
              });
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
          }
        });
      },
      getWebSocketUrl() {
        console.log(this.httpUrl);
        var httpUrlHost = (this.httpUrl).substring(8, 28);
        var httpUrlPath = (this.httpUrl).substring(28);
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
          var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.APISecret);
          var signature = CryptoJS.enc.Base64.stringify(signatureSha);
          var authorizationOrigin = `${apiKeyName}="${this.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
          var authorization = base64.encode(authorizationOrigin);
          url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

          resolve(url);
        });
      },
    }
  }
</script>

<style>
	
</style>