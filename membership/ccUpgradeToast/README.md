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
