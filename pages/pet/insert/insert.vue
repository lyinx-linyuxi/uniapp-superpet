<template>
  <view class="container">
    <view class="user-info">
      <image src="https://i.loli.net/2017/08/21/599a521472424.jpg" class="avatar"></image>
    </view>
    <view class="form">
      <view class="form-item">
        <text class="label">爱宠名：</text>
        <input type="text" placeholder="点击输入爱宠名" class="input" />
      </view>
      <view class="form-item">
        <text class="label">性别：</text>
        <view class="gender-buttons">
          <button  :class="{'button': true, 'active': gender === 'male', 'male': true}" @click="selectGender('male')">男</button>
          <button :class="{'button': true, 'active': gender === 'female', 'female': true}" @click="selectGender('female')">女</button>
        </view>
      </view>
      <view class="form-item">
        <text class="label">体重：</text>
        <input type="text" placeholder="点击输入体重(kg)" class="input" />
      </view>
      <view class="form-item">
        <text class="label">一句描述：</text>
        <input type="text" placeholder="爱吃啥，有啥特点..." class="input" />
      </view>
      <view class="form-item">
        <text class="label">是否绝育：</text>
        <view class="neuter-buttons">
          <button :class="{'button': true, 'active': neuter === 'yes', 'yes': true }" @click="selectNeuter('yes')">已绝育</button>
          <button :class="{'button': true, 'active': neuter === 'no', 'no': true}" @click="selectNeuter('no')">未绝育</button>
        </view>
      </view>
      <view class="form-item">
        <text class="label">出生日期：</text>
        <input type="text" placeholder="点击设置日期" class="input" />
      </view>
      <view class="form-item">
        <text class="label">到家日期：</text>
        <input type="text" placeholder="点击设置日期" class="input" />
      </view>
      <navigator url="/pages/pet/card/card">
        <button class="submit-button">完成注册</button>
      </navigator>
    </view>
    <text class="agreement">注册即代表同意
	<navigator url="/pages/pet/agreement/agreement">
		<text class="agreement" style="color: blue;">
			爱宠用户协议
		</text>
	</navigator>
	</text>
  </view>
  <view class="elsecontainer">
	  
  </view>
</template>

<script>
export default {
  data() {
    return {
      gender: '', // 用于存储选择的性别
      neuter: '' // 用于存储是否绝育的选择
    }
  },
  methods: {
    selectGender(gender) {
      this.gender = gender;
    },
    selectNeuter(neuter) {
      this.neuter = neuter;
    }
  }
}
</script>

<style>
.container {
  background-color: #fff;
  padding: 15px;
}
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.form {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
}
.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.label {
  width: 100px;
  font-size: 16px;
}
.input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.gender-buttons, .neuter-buttons {
  display: flex;
  
}
.gender-buttons .button {
  flex: 1;
  padding: 8px 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  margin-right: 10px;
  background-color: #fff;
}
.gender-buttons .button:last-child {
  margin-right: 0;
}
.neuter-buttons .button {
  flex: 1;
  padding: 5px 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  margin-right: 10px;
  background-color: #fff;
}
.neuter-buttons .button:last-child {
  margin-right: 0;
}
.active.male {
  background-color: #0000ff;
  color: #fff;
  border-color: #0000ff;
}
.active.female {
  background-color: #ff0000;
  color: #fff;
  border-color: #ff0000;
}
.active.yes {
  background-color: #00ff00;
  color: #fff;
  border-color: #00ff00;
}
.active.no {
  background-color: #ffa500;
  color: #fff;
  border-color: #ffa500;
}
.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #32CD32;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
}
.agreement {
  margin-top: 15px;
  text-align: center;
  color: #888;
  display: flex;
  justify-content: center;
}

</style>
