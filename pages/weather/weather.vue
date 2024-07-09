<template>
	<view>
		<view>
			<button size="default" type="primary" hover-class="is-hover" @click="getAdcode">
				获取天气
			</button>
		</view>
		<view>
			<text>地址 : {{ province + city }}</text>
			<br>
			<text>天气 : {{ weather }}</text>
			<br>
			<text>温度 : {{ temperature }}</text>
			<br>
			<text>风向 : {{ winddirection }}</text>
			<br>
			<text>风级 : {{ windpower }}</text>
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
	.is-hover {
		color: rgba(255, 255, 255, 0.6);
		background-color: #179b16;
		border-color: #179b16;
	  }
</style>