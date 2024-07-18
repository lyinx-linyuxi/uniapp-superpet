<template>
  <view class="app">
	<ul>
		<li class="list" v-for="liker in likers" :key="liker.hostId" >
		    <span class="body" >
		  		
				<view class="f-image">
					<image :src="liker.headshotUrl" />
				</view><br>
		  		<view class="f-name" >
		  			<text>{{liker.userName}}</text>
		  		</view>
				<view class="f-content" >
					<text>赞了你的帖子 “{{liker.text}}……”</text>
					<text>{{liker.likeTime}}</text>
				</view>
		  		<view class="block"></view>
				<view class="f-image">
					<image :src="liker.imageUrl" />
				</view><br>
		  		
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
	  likers: [],
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
	  getMessage(){
		  uni.request({
		  	url: "http://localhost:8080/admin/message/getNewLikes/" + this.user.userId,
					  	// url: "http://localhost:8080/admin/message/getNewlikersDetail/" + this.user.getProperty("userId"),
		  	method: "GET",
		  	success:(res) => {
		  		console.log("success", res.data)
		  		if (res.statusCode == 200) {
		  			this.likers=res.data.data;
					console.log(this.likers[0])
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
		  this.likers = [{}] 
	  }
	  
  //   async getMessage() {
  //     try {
  //       const response = await axios.post('http://localhost:3001/api/message', { message: this.id });
		// this.likers=response.data.data;
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
	.body{display:flex;
		height: 50px;
		background-color: #fff;
		flex-direction:row;
		border-bottom:1px solid #e1e1e1;
		.f-image{display:flex;
			width: 40px;
			image{
				height: 40px;
				width: 40px;
				border-radius: 15%;
			}
		}
		.f-name{display:flex;
			width: 70px;
			justify-content: flex-start;
			margin-left: 10px;
			align-items:flex-start;
			color: #25259d;
			text{
				font-size: 15px;
			}
		}
		.f-content{display:flex;
			flex-direction: column;
			width: 250px;
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
