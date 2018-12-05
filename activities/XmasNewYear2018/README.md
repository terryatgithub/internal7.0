#感恩节活动2018.11.22

##页面简单说明：
1. 我的礼物页面  
	myaward.html 
2. 打包清单页面 
	packlist.html

#测试配置url（主页入口配置需要）：
//打包清单页面入口：
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "https://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html"; logcat | grep chrom; \r
//我的奖品页面入口：
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "https://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/packlist.html"; logcat | grep chrom; \r

##输入参数说明： 
			 	是否显示奖励弹窗
我的礼物页面	 
打包清单页面	 	AwardTip=true
**默认不传或其他值，都是活动在进行中；


###开发中需要的信息：
##后台接口
1. 购物商城那边提供的接口文档
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20239629

2. 双旦活动-接口
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20241841