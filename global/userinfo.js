// 用户类
class User {
	constructor(name, age, email) {
		this.userId = 13;
		this.username = 'default';
		this.password = '';
		this.email = email;
		this.phone = '';
		this.headshotUrl = '/static/pages/index/home/images/1.png';
		this.petNum = 1;
		this.gender = 'female';
		this.cardId = 0;
	}

	getProperty(property){
		if(this.hasOwnProperty(property)){
			return this[property];
		}
		else{
			console.warn(`Property ${property} does not exist on User.`);
		}
	}

	// 更新用户的属性
	updateProperty(property, value) {
		if (this.hasOwnProperty(property)) {
			this[property] = value;
		} else {
			console.warn(`Property ${property} does not exist on User.`);
		}
	}
}

// 创建一个默认的用户对象
const currentUser = new User();

// 导出用户类和默认用户对象
export {
	User,
	currentUser
};