#(1)会员等级权益页
输入参数说明：
level:[1-7],表示用户等级，默认值为1

#测试相关信息：
1.测试环境配置url（主页入口配置需要）：
https://beta.webapp.skysrt.com/yuanbo/memberLevelInterest/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/memberLevelInterest/index.html?level=5";

2.预发布url：
https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/memberLevelInterest/index.html?level=5
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/preReleaseDir/memberLevelInterest/index.html?level=5";

3.正式环境url:
https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html";

#(2)玩转会员攻略-页面
1.测试环境配置url：
https://beta.webapp.skysrt.com/yuanbo/memberLevelInterest/index2.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/memberLevelInterest/index2.html";

2.正式环境url:
https://webapp.skysrt.com/cc7.0/memberLevelInterest/index2.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://webapp.skysrt.com/cc7.0/memberLevelInterest/index2.html";

###后台服务器接口：
1.成长值等级划分
http://wiki.skyoss.com/pages/viewpage.action?pageId=20236737