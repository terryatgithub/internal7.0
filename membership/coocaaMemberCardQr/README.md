#CoocaaMemberCardQr

#测试相关信息：
1.测试环境配置url（主页入口配置需要）：
https://beta.webapp.skysrt.com/yuanbo/CoocaaMemberCardQr/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/CoocaaMemberCardQr/index.html";

2.预发布url：
https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/coocaaMemberCardQr/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/coocaaMemberCardQr/index.html";

3.正式环境url:
https://webapp.skysrt.com/cc7.0/coocaaMemberCardQr/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://webapp.skysrt.com/cc7.0/coocaaMemberCardQr/index.html";



###后台服务器调用接口信息：
（ajax跨域）获取临时二维码接口：
http://wiki.skyoss.com/pages/viewpage.action?pageId=12687826