#电视派页面
输入参数说明：

#测试相关信息：
1.测试环境配置url（主页入口配置需要）：
https://beta.webapp.skysrt.com/yuanbo/TVPai/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/TVPai/index.html";

2.预发布url：
https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/tvPi/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/tvPi/index.html";

3.正式环境url:
https://webapp.skysrt.com/cc7.0/tvPi/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://webapp.skysrt.com/cc7.0/tvPi/index.html";