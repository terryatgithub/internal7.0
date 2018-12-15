#致用户信

###本web页面调用方法：
输入参数说明：
from: 
默认从教育板块进入；
from=kids:从少儿板块进入，

#测试相关信息：
1.测试环境配置url（主页入口配置需要）：
https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html
从少儿板块进入：
https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html?from=kids

测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/test/envolopToUsers2018/index.html";
 
3.正式环境url:
https://webapp.skysrt.com/cc7.0/memberGrowth/index.html
测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://webapp.skysrt.com/cc7.0/memberGrowth/index.html";


  