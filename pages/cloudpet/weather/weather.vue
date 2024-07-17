<template>
	<view class = "weather">
		
		<view class = "weather-info">
			<view class="location">
				<uni-icons type="map-pin-ellipse" size="25" color="#fff"></uni-icons>
				<text> {{ province + city }}</text>
			</view><br>
			<view class="temperature">
				<text>{{ temperature }}°C</text>
			</view><br>
			<view class="todayweather">
				<uni-icons type="cloud-download-filled" size="120" color="#fff"></uni-icons>
				<!-- <el-icon color="#fff"><Drizzling /></el-icon> -->
				<text>{{ weather }}</text>
			</view><br>
			
			<view class="wind">
				<text>风向 : {{ winddirection }}  风级 : {{ windpower }}</text>
				
			</view>
		</view>
		<view>
			<button class="getweather" size="default"   @click="getAdcode">
				获取天气
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adcode: "",
				province: "",
				city: "",
				weather: "",
				temperature: "",
				winddirection: "",
				windpower: "",
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			getAdcode() {
				uni.request({
				    url: "https://restapi.amap.com/v3/ip?key=21bd3d58902f67974f972385282ad93b",
				    method: "GET",
				    success: (res) => {
				        console.log(res.data);
				        this.adcode = res.data.adcode;
				        this.province = res.data.province;
				        this.city = res.data.city;
				        
				        // 在第一个请求成功后，发送第二个请求
				        uni.request({
				            url: "https://restapi.amap.com/v3/weather/weatherInfo?city=" + this.adcode + "&key=21bd3d58902f67974f972385282ad93b",
				            method: "GET",
				            header: {
				                "Content-Type": "application/json"
				            },
				            success: (ret) => {
				                if (ret.data.status == '0') {
				                    // uni.showToast({
				                    //     title: '发生错误，请重试',
				                    //     icon: 'error'
				                    // })
				                    setTimeout(function () {
				                        uni.hideToast()
				                    }, 2000);
				                    // console.log("https://restapi.amap.com/v3/weather/weatherInfo?city=" + this.adcode + "&key=21bd3d58902f67974f972385282ad93b")
				                }
				                else {
				                    this.weather = ret.data.lives[0].weather;
				                    this.temperature = ret.data.lives[0].temperature;
				                    this.winddirection = ret.data.lives[0].winddirection;
				                    this.windpower = ret.data.lives[0].windpower;
				                }
				                // console.log("https://restapi.amap.com/v3/weather/weatherInfo?city=" + this.adcode + "&key=21bd3d58902f67974f972385282ad93b")
				                // console.log(ret.data);
				            },
				            fail() {
				                console.error("Weather request failed");
				            }
				        });
				    },
				    fail() {
				        console.error("IP request failed");
				    }
				});
				
			},
		},
	}
</script>

<style>
	.warp {
		background-color: #fff;
	}
	
	.weather{
		background-color: #4a749f;
		height: 680px;
	}
	.getweather{
		background-color: #ffc000;
		box-shadow: #374667 3px 3px;
		border-radius: 30px;
		color: #fff;
		font-size: 25px;
		font-weight: bold;	
	}
	.weather-info{
		padding: 10px;
	}
	.location{
		font-size: 20px;
		color: #fff;
		padding-top: 10px;
		background-color: #86e2fc;
		text-align: center;
		box-shadow: #374667 3px 3px;
		border-radius: 25px;
		position: ;
		height: 40px;
		font-weight: bold;
	}
	.temperature{
		margin-top: 50px;
		font-size: 75px;
		text-align: center;
		color:#fff;
		font-weight: bold;
	}
	.todayweather{display: flex;
		flex-direction: column;
		margin-top: 20px;
		font-size: 25px;
		text-align: center;
		color:#fff;
		font-weight: bold;
	}
	.wind{
		margin-top: 20px;
		font-size: 20px;
		text-align: center;
		color:#fff;
		font-weight: bold;
		margin-bottom: 60px;
	}
	
.second-contain{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>