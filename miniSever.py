from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许所有来源的跨域请求

defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
defaultPostImage = '/static/pages/index/home/images/3.png'

@app.route('/api/data', methods=['GET'])
def get_data():
    data = [
        {
            "host_id": '',
            "post_order": '',
            "username": 'xiaoxi',
            "headshot_url": defaultAvatarUrl,
            "text": 'default nulla',
            "image": defaultPostImage,
            "time": "1days",
            "liked": False,
            "likes": 100,
            "comments": 200,
            "shares": 29
        }
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=8090)
