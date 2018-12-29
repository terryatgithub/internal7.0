#2019春节活动

##页面简单说明：


#活动产品文档
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20245529

###开发中需要的信息：
##后台接口
1. 购物商城那边提供的接口文档
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20239629

2. 春节活动-接口 （王雪）
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20246516&tdsourcetag=s_pcqq_aiomsg#id-%E6%98%A5%E8%8A%82%E6%B4%BB%E5%8A%A8-2.3%E3%80%81%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BB%BB%E5%8A%A1%E5%88%97%E8%A1%A8
	
3. 奖品信息公共参数(包括各类奖品typeid)
	http://wiki.skyoss.com/pages/viewpage.action?pageId=12712189&tdsourcetag=s_pcqq_aiomsg

-------------------------------------------测试地址---------------------------------------------------
#测试配置url（主页入口配置需要）：
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "http://beta.webapp.skysrt.com/yuanbo/test/2019SpringFestival/taskcenter.html"; logcat | grep chrom; \r
	

