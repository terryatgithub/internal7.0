#2019春节活动

##页面简单说明：


#活动产品文档
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20245529

###开发中需要的信息：
##后台接口
1. 购物商城更多商品信息（运营 游嘉玲）
	//	http://wiki.skyoss.com/pages/viewpage.action?pageId=20239629

2. 春节活动-接口 （王雪）
	http://wiki.skyoss.com/pages/viewpage.action?pageId=20246516&tdsourcetag=s_pcqq_aiomsg#id-%E6%98%A5%E8%8A%82%E6%B4%BB%E5%8A%A8-2.3%E3%80%81%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BB%BB%E5%8A%A1%E5%88%97%E8%A1%A8
	
3. 微信助力二维码（谢永超）

4. 广告（代蕾，樊彦博）
	http://wiki.skyoss.com/pages/viewpage.action?pageId=4979470
	广告参考代码（from 谢金融）
	
设计：
1. 任务中心-练桉彤
	
-------------------------------------------测试地址---------------------------------------------------
#测试配置url（主页入口配置需要）：
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "http://beta.webapp.skysrt.com/yuanbo/test/2019SpringFestival/taskcenter.html"; logcat | grep chrom; \r


------------------------------测试地址发布页面----------------------------------
//张瑶：
我的福卡页：http://beta.webapp.skysrt.com/zy/spring/index.html?part=mycard
福卡集市页：http://beta.webapp.skysrt.com/zy/spring/index.html?part=market
我的交易页：http://beta.webapp.skysrt.com/zy/spring/index.html?part=mytrade
//活动主页面：
http://beta.webapp.skysrt.com/games/webapp/springfestival/dev/index.html


#客户端下载地址	from 李奇文 
//com.coocaa.app_browser
//C7390841A72A7AC3FBCD67A0332FDFC0
//104039
//https://apk-sky-fs.skysrt.com/uploads/20190112/20190112092209221535.apk
//
//
//com.coocaa.activecenter
//67EF020FE82A5BBF1D3F9E719886EB8A
//103010
//https://apk-sky-fs.skysrt.com/uploads/20190109/20190109191141936672.apk

-------------------------------------------正式地址---------------------------------------------------
正式地址：
        https://webapp.skysrt.com/springfestival19/  【springfestival19为新建目录】
附件下有  main     taskcenter   两个文件夹；请直接放置在springfestival19/下即可【另明天还有foca    address   等文件夹需要发布，同样放置于springfestival19下】

@嘉玲：
        启动的版本请配置为  104039  ；测试要求重新配置入口，目前测试的入口请保留不动。
        活动主页面地址：
        https://webapp.skysrt.com/springfestival19/main/index.html
        打开的action请采用  coocaa.intent.action.browser.no_trans

各个业务入口地址：
	默认分入口-- https://webapp.skysrt.com/springfestival19/main/index.html
        影视分入口-- https://webapp.skysrt.com/springfestival19/main/index.html?from=movie
	教育分入口-- https://webapp.skysrt.com/springfestival19/main/index.html?from=edu
	购物分入口-- https://webapp.skysrt.com/springfestival19/main/index.html?from=mall
	应用分入口-- https://webapp.skysrt.com/springfestival19/main/index.html?from=apk
启动方式： coocaa.intent.action.browser.no_trans  