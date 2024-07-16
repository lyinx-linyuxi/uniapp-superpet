<template>
  <view class="app">
	<ul>
		<li class="list" v-for="follower in followers" :key="follower.hostId" >
		    <span class="body" >
		  		<view class="f-image">
		  			<image :src="follower.headshotUrl" />
		  		</view><br>
		  		<view class="f-name" >
		  			<text>{{follower.hostName}}</text>
		  		</view>
		  		<view class="block"></view>
		  		<view class="f-time" >
		  			<text>{{follower.followTime}}</text>
		  		</view>
		  	</span>
		</li>
	</ul>
	
  </view>
</template>

<script>
import { currentUser } from '../../../global/userinfo';

export default {
  data() {
    return {
	  user : currentUser,
      message: '',
	  followers: [],
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
	  getMessage(){
		  uni.request({
		  	url: "http://localhost:8080/admin/message/getNewFollowersDetail/12",
					  	// url: "http://localhost:8080/admin/message/getNewFollowersDetail/" + this.user.getProperty("userId"),
		  	method: "GET",
		  	success:(res) => {
		  		console.log("success", res.data)
		  		if (res.statusCode == 200) {
		  			this.followers=res.data.data;
					console.log(this.followers[0])
		  		}
		  		else {
		  			console.log("here", res.data);
		  			this.handleFetchError();
		  		}
		  	},
		  	fail: () => {
		  		this.handleFetchError();
		  	}
		  });
	  },
	  handleFetchError(){
		  this.followers = [{}] 
	  }
	  
  //   async getMessage() {
  //     try {
  //       const response = await axios.post('http://localhost:3001/api/message', { message: this.id });
		// this.followers=response.data.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  }
};
</script>

<style scoped lang="scss">
	ul{
		padding: 0px;
		list-style:none;
	}
	li{
		padding: 5px;
	}
	.test{
		padding: 10px;
		height:40px;
		width:40px;
	}
	.body{display:flex;
		height: 40px;
		background-color: Azure;
		flex-direction:row;
		.f-image{display:flex;
			width: 40px;
			image{
				height: 40px;
				width: 40px;
			}
		}
		.f-name{display:flex;
			width: 60px;
			justify-content: flex-start;
			align-items:flex-start;
			text{
				font-size: 10px;
			}
		}
		.block{display:flex;
			flex-grow: 1;
		}
		.f-time{display:flex;
			width: 110px;
			height: 40px;
			justify-content: flex-end;
			align-items:center;
			text{display:flex;
				font-size: 10px;
			}
		}
	}
</style>
