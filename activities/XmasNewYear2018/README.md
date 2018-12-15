#感恩节活动2018.11.22

##页面简单说明：
1. 我的礼物页面  
	myaward.html 
2. 打包清单页面 
	packlist.html

#测试配置url（主页入口配置需要）：
//打包清单页面入口：（合入了主页面）
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "https://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html"; logcat | grep chrom; \r

//我的奖品页面入口：
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "https://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/packlist.html"; logcat | grep chrom; \r
	
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


---------------------------------------双旦测试地址---------------------------------------------------
福利街页面：
	默认、影视分入口--http://beta.webapp.skysrt.com/games/webapp/christmas/test/index.html
	教育分入口--http://beta.webapp.skysrt.com/games/webapp/christmas/test/index.html?from=edu
	购物分入口--http://beta.webapp.skysrt.com/games/webapp/christmas/test/index.html?from=mall
	应用分入口--http://beta.webapp.skysrt.com/games/webapp/christmas/test/index.html?from=apk
启动方式：coocaa.intent.action.browser.no_trans

圣诞小屋页面：
	主活动--http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=gold
	打包清单页面--http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=pack
	打包小屋--http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=pack
启动方式：coocaa.intent.action.browser.no_trans.no_route

我的礼物页面：
	从福利街进入：http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html?actEnd=true&awardToast=true&from=street
	从圣诞小屋进入:http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html?actEnd=true&awardToast=true&from=home
		1. actEnd=true 
			活动已结束，传true
			默认false
		2. awardToast=true 
			需要“奖励弹窗”，传true
			默认false
		3. from=street
			从福利节进传street
			其它情况默认为主页进（可以传home)
启动方式：coocaa.intent.action.browser.no_route


