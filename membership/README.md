#7.0会员体系之Web页面


##正式发布配置参数
发布地址	https://webapp.skysrt.com/cc7.0/	

No.	页面名称	页面地址	开发人员
1	新手学习页面	https://webapp.skysrt.com/cc7.0/beginner/index.html	原博
2	微信扫二维码领取电子会员卡页面	https://webapp.skysrt.com/cc7.0/coocaaMemberCardQr/index.html	原博
3	电视派TVPi页面	https://webapp.skysrt.com/cc7.0/tvPi/index.html	原博
4	会员成长秘籍页面	https://webapp.skysrt.com/cc7.0/memberGrowth/index.html	原博
5	会员影视VIP权益页面 	https://webapp.skysrt.com/cc7.0/memberMovieVIPInterest/index.html	原博
6	会员教育VIP权益页面 	https://webapp.skysrt.com/cc7.0/memberEducationVIPInterest/index.html	原博
7	会员等级权益页面 	https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html			原博
8	服务协议	https://webapp.skysrt.com/cc7.0/trans/index3.html	林心旺
9	隐私政策	https://webapp.skysrt.com/cc7.0/trans/index4.html	林心旺
10	酷开公众号	https://webapp.skysrt.com/cc7.0/trans/index1.html	林心旺
11	版本信息	暂未提测     预留地址 https://webapp.skysrt.com/cc7.0/trans/index2.html	林心旺
12	探索发现	https://webapp.skysrt.com/cc7.0/guide2/index.html	林心旺
13	帮助反馈	暂未提测     预留地址 https://webapp.skysrt.com/cc7.0/guide2/index2.html	林心旺

##测试板上输入信息：
logcat -c;  am start -a coocaa.intent.action.browser --es "url" "https://webapp.skysrt.com/cc7.0/tvPi/index.html" ; logcat  -v threadtime| grep chrom

##给后台的配置参数如下格式：
{"dowhat":"startActivity","bywhat":"action","byvalue":"coocaa.intent.action.browser","packagename":"com.coocaa.app_browser","appversion":"","params":{"url":"https://webapp.skysrt.com/guide2/index.html"}}   
格式化后为：
{
	"dowhat": "startActivity",
	"bywhat": "action",
	"byvalue": "coocaa.intent.action.browser",
	"packagename": "com.coocaa.app_browser",
	"appversion": "",
	"params": {
		"url": "https://webapp.skysrt.com/guide2/index.html"
	}
}