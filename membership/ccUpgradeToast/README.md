#微信扫码关注酷开会员公众号

#测试相关信息：
1.测试环境配置url（主页入口配置需要）：
https://beta.webapp.skysrt.com/yuanbo/ccMemberGuidePage/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "http://beta.webapp.skysrt.com/yuanbo/ccMemberGuidePage/index.html"; \r logcat | grep chrom \r


2.正式环境url:
找林心旺要之前发布的地址
测试板上输入命令：


###后台服务器调用接口信息：
//后台 陈希光
接口地址
http://wiki.skyoss.com/pages/viewpage.action?pageId=20222268

http://wiki.skyoss.com/pages/viewpage.action?pageId=20222263  看下这个，参数是要加密的

//url后跟的参数：
couponId 优惠券id  逗号分隔的
points  奖励的金币数
gradeLevel  奖励的等级，数字，1表示1级

//获取优惠券详细信息：（甘泉组 王雪）
http://beta.active.tc.skysrt.com/coupon_receive/couponInfo?couponId=481
{
	"code": 0,
	"data": {
		"businessLine": "tvmall",
		"couponIcon": "",
		"couponId": 481,
		"couponName": "购物优惠券",
		"couponNote": "",
		"couponSubName": "优惠券",
		"createTime": 1551340070000,
		"effectiveBeginTime": 1551340088000,
		"effectiveDays": 0,
		"effectiveEndTime": 1552722492000,
		"grantCount": 10000,
		"isActivity": 1,
		"isSuperpositUse": 0,
		"issuedQuantity": 6,
		"onClickData": "{\"packageName\":\"com.coocaa.mall\",\"versionCode\":\"1\",\"dowhat\":\"startActivity\",\"bywhat\":\"action\",\"byvalue\":\"coocaa.intent.action.MALL_LIST_ZONE\",\"param\":{\"pageId\":\"2\"},\"exception\":{\"packageName\":\"\",\"versionCode\":\"\",\"dowhat\":\"sendBroadcast\",\"bywhat\":\"action\",\"byvalue\":\"\",\"param\":{\"\":\"\"}}}",
		"preferentialDiscount": 0,
		"preferentialPrice": 500,
		"preferentialQuota": 10000,
		"preferentialType": "price",
		"remark": "满100－5",
		"status": 1,
		"updateTime": 1551340070000,
		"userReceiveCount": 10
	},
	"msg": "获取成功"
}


preferentialType:  '优惠方式，''discount''：优惠折扣，''price''：优惠金额'
preferentialQuota:  '优惠门槛金额：达到此金额才参与优惠(单位：分)'
preferentialPrice: 优惠方式为''price'' 时的优惠金额(单位：分)'
preferential_discount:  '优惠方式为''discount'' 时的优惠折扣,小于100的整数' 80->8折 78->7.8折
优惠券id
485 ：优惠金额 — 有效时间
482 ：优惠折扣 — 有效时间
474 ：优惠金额 — 有效天数