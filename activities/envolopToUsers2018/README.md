#7.0会员体系之会员成长秘籍页面

###本web页面调用方法：
输入参数说明：
无

#测试相关信息：
1.测试环境配置url（主页入口配置需要）：
https://beta.webapp.skysrt.com/yuanbo/memberGrowth/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/memberGrowth/index.html";

2.预发布url：
https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/memberGrowth/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/memberGrowth/index.html";

3.正式环境url:
https://webapp.skysrt.com/cc7.0/memberGrowth/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://webapp.skysrt.com/cc7.0/memberGrowth/index.html";




##会员体系-整体交互原型(wiki)
http://wiki.skyoss.com/pages/viewpage.action?pageId=20220067

###服务器后台调用接口：
1. 某个用户的成长值、金币与等级信息查询接口
http://wiki.skyoss.com/pages/viewpage.action?pageId=20224340

2. 获取产品源列表接口：
	服务端API Http Header参数旧版本
	http://wiki.skyoss.com/pages/viewpage.action?pageId=4966507

	2.获取产品源列表接口定义V3
	http://wiki.skyoss.com/pages/viewpage.action?pageId=4976064