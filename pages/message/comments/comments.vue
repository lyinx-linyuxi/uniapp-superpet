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
				<view class="f-content0">
					<div><text>评论了你的帖子</text></div>
					
					<div><text>{{comment.commentTime}}</text></div>					
				</view>
				
				

		  		<view class="block"></view>
				<view class="f-content" >
					<text>“{{comment.text}}”</text>
				</view>
		  		<view class="u-image">
					<image :src="comment.imageUrl" />
				</view>
				<!-- <view class="f-time" >
		  			
		  		</view> -->
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
		  	url: "http://localhost:8080/admin/message/getComments/"  + this.user.userId,
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
			margin-left: 10px;
			justify-content: center;
			align-items:flex-start;
			color: #25259d;
			text{
				font-size: 15px;
			}
		}
		.f-content0{display:flex;
			margin-left: 5px;
			flex-direction: column;
			width: 200px;
			justify-content: center;
			align-content:flex-start;
			text{
				font-size: 12px;
			}
		}
		
		.f-content{display:flex;
			width: 250px;
			height: 40px;
			justify-content: flex-start;
			align-items:center;
			text{
				font-size: 14px;
				text-align: right;
			}
		}
		.block{display:flex;
			flex-grow: 1;
		}
		.u-image{display:flex;
			width: 50px;
			image{
				height: 50px;
				width: 50px;
				
			}
		}
		
	}
</style>
