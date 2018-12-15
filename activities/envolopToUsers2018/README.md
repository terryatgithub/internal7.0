#致用户信

###本web页面调用方法：
输入参数说明：
from: 
	默认从教育板块进入；
	from=kids:从少儿板块进入，

#测试相关信息：
1.测试环境配置url主页入口配置需要：
综合教育板块进入：
https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html
少儿板块进入：
https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html?from=kids

测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html";
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html?from=kids";
 
3.正式环境url:
https://webapp.skysrt.com/cc7.0/memberGrowth/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://webapp.skysrt.com/cc7.0/memberGrowth/index.html";




#给运营的配置参数：
致用户信活动，正式提测。 
建议用第三方启动，而不用（默认网页启动）的原因： 
	因为默认配置背景是透明的，会在跳转页面返回活动主页面时，闪一下酷开主页背景； 所以必须用这个action（有黑色背景）

配置方式：	   第三方启动
浏览器包名： com.coocaa.app_browser
启动action：   coocaa.intent.action.browser.no_trans
版本：  	   103008
参数： 
url : https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html (综合教育入口)
或
url : https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html?from=kids (少儿板块入口)