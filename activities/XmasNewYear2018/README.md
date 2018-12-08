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
http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html?actEnd=true&awardToast=true&from=street
##输入参数说明： 
1. actEnd=true 
	活动已结束，传true
	默认false
2. awardToast=true 
	需要“奖励弹窗”，传true
	默认false
3. from=street
	从福利节进传street
	其它情况默认为主页进（可以传home或不传)
	
	
	
#活动产品文档
http://wiki.skyoss.com/pages/viewpage.action?pageId=20239930

###开发中需要的信息：
##后台接口
1. 购物商城那边提供的接口文档
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20239629

2. 双旦活动-接口
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20241841
	
3. 奖品信息公共参数(包括各类奖品typeid)
http://wiki.skyoss.com/pages/viewpage.action?pageId=12712189&tdsourcetag=s_pcqq_aiomsg