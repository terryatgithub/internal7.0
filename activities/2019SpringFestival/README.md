#2018春节活动

##页面简单说明：


#活动产品文档
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20245529

###开发中需要的信息：
##后台接口
1. 购物商城那边提供的接口文档
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20239629

2. 双旦活动-接口
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20241841
	
3. 奖品信息公共参数(包括各类奖品typeid)
	http://wiki.skyoss.com/pages/viewpage.action?pageId=12712189&tdsourcetag=s_pcqq_aiomsg

-------------------------------------------测试地址---------------------------------------------------
#测试配置url（主页入口配置需要）：
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/packlist.html"; logcat | grep chrom; \r
	

