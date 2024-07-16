<template>
  <view class="app">
	<ul>
		<li class="list" v-for="comment in comments" :key="comment.hostId" >
		    <span class="body" >
		  		<view class="f-image">
		  			<image :src="comment.headshotUrl" />
		  		</view>
		  		<view class="f-name" >
		  			<text>{{comment.userName}}</text>
		  		</view>
				<view class="f-content0" >
					<text>评论了你的帖子</text>
				</view>
				<view class="f-image">
					<image :src="comment.imageUrl" />
				</view>
				<view class="f-content" >
					<text>“{{comment.ptext}}……”</text>
				</view>

		  		<view class="block"></view>
				<view class="f-content1" >
					<text>“{{comment.ctext}}”</text>
				</view>
		  		<view class="f-time" >
		  			<text>{{comment.commentTime}}</text>
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
	  comments: [],
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
	  getMessage(){
		  uni.request({
		  	url: "http://localhost:8080/admin/message/getComments/1",
					  	// url: "http://localhost:8080/admin/message/getNewcommentsDetail/" + this.user.getProperty("userId"),
		  	method: "GET",
		  	success:(res) => {
		  		console.log("success", res.data)
		  		if (res.statusCode == 200) {
		  			this.comments=res.data.data;
					console.log(this.comments[0])
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
		  this.comments = [{}] 
	  }
	  
  //   async getMessage() {
  //     try {
  //       const response = await axios.post('http://localhost:3001/api/message', { message: this.id });
		// this.comments=response.data.data;
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
		.f-content0{display:flex;
			width: 80px;
			justify-content: flex-start;
			align-items:flex-start;
			text{
				font-size: 10px;
			}
		}
		.f-content{display:flex;
			width: 250px;
			justify-content: flex-start;
			align-items:flex-start;
			text{
				font-size: 10px;
			}
		}
		.f-content1{display:flex;
			width: 250px;
			justify-content: flex-start;
			align-items:flex-start;
			text{
				font-size: 10px;
				text-align: right;
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
