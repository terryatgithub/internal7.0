#感恩节活动2018.11.22

#测试配置url（主页入口配置需要）：
#1. 活动弹窗：
https://beta.webapp.skysrt.com/yuanbo/thanksGaving2018/index.html?source=dialog&action=157
对应测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/thanksGaving2018/index.html?source=dialog&action=157";

#2. 活动主页面：
https://beta.webapp.skysrt.com/yuanbo/thanksGaving2018/index.html?source=&action=157
对应测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url"  "https://beta.webapp.skysrt.com/yuanbo/thanksGaving2018/index.html?source=&action=157";


##活动产品文档：
20181122 感恩节活动
http://wiki.skyoss.com/pages/viewpage.action?pageId=20237674

##页面简单说明：
页面由2大部分组成：
1. 活动弹窗： 用户在其它任何界面时，跳出活动弹窗，吸引用户前往活动主页面；
2. 活动主页面：本次活动的主页面；


##输入参数说明：
#1. source： 由运营配置，当前显示为“活动弹窗”时，配置source=dialog; 否则配置为其它值（不配置或为空"")
source=dialog 

#2. action：由后台配置的活动id； 
#放在url里传入的好处是，不用等后台最终配置好再改代码（比较耗时），直接由运营在url里配置：
#157是本次活动id：
action=157

###开发中需要的信息：
##后台接口
#0.抽奖系统——接口文档
http://wiki.skyoss.com/pages/viewpage.action?pageId=12712183&tdsourcetag=s_pcqq_aiomsg

#1. 抽奖接口
http://wiki.skyoss.com/pages/viewpage.action?pageId=12712189
	一：接口基本信息说明
	lottery_url 地址说明：
	测试环境接口地址： http://beta.restful.lottery.coocaatv.com
	    	或者是接口ip地址:http://172.20.132.129:8081
	正式环境接口地址：https://restful.skysrt.com 

#2. 活动id：
157