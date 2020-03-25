const baseURL = 'http://182.92.66.130:6677'
const Userapi = {
	Userinfo:{api:'/user/info'},
	UserLogin:{api:'/user/login'},
	UserLogout:{api:'/user/logout',methods:'POST'}
}
// const UserAddressapi = {
// 	UserDeleteId:{api:'/address/deleteById?id='},
// 	UserfindById:{api:baseURL + '/address/findByCustomerId?id=',methods:'GET'},
// 	UsersaveOrUpdate:{api:baseURL + '/address/saveOrUpdate',methods:'POST'}
// }
// const Customerapi = {
// 	CustomerFind:{api:baseURL + '/customer/findAll',methods:'GET'},
// 	CustomerSave:{api:'/customer/saveOrUpdate'}
// }
const Commentapi = {
	CommentFind:{api:'/comment/findAll',methods:'GET'},
	CommenSaveOrUpdate:{api:'/comment/saveOrUpdate'}
}
const Productapi= {
	ProductFindAll:{api:baseURL + '/product/findAll',methods:'GET'},
	ProductFindById:{api:baseURL + '/product/findById',methods:'GET'}
}
const Orderapi = {
	OrderConfirm:{api:'/order/confirmOrder?orderId='},
	OrderFindAll:{api:'/order/findAll'},
	OrderFindById:{api:'/order/getOrderLinesByOrderId?orderId='},
	OrderserviceComplete:{api:'/order/serviceCompleteOrder?orderId='}
}
export {
	Userapi,
	Productapi,
	// UserAddressapi,
	// Customerapi,
	Orderapi,
	Commentapi
	
}