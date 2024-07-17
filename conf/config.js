export const voiceConf = {
	APPID: '6c3aa33b',
	APISecret: 'Y2UzOTVjY2YxZTdlNjI3ZjE0NGI2NTg4',
	APIKey: 'a1d7d3cbf7be5e84e12bbb52bb684e9f',
	
}




import CryptoJS from "crypto-js";
import { Base64 } from "js/base64js.js";



/**
 * 获取websocket url
 * 该接口需要后端提供，这里为了方便前端处理
 */
function getWebSocketUrl() {
  return new Promise((resolve, reject) => {
    // 请求地址根据语种不同变化
    var url = "wss://ise-api.xfyun.cn/v2/open-ise";
    var host = "ise-api.xfyun.cn";
    var apiKeyName = "api_key";
    var apiKey = API_KEY;
    var apiSecret = API_SECRET;
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/open-ise HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `${apiKeyName}="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}
