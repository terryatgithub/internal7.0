#7.0会员体系之Web页面

##内部测试配置参数



##正式发布配置参数
发布地址	https://webapp.skysrt.com/cc7.0/			

No.	Web页面						跳转配置参数
1	新手学习页面				https://webapp.skysrt.com/cc7.0/beginner/index.html
2	微信扫二维码领取电子会员卡页面 	https://webapp.skysrt.com/cc7.0/coocaaMemberCardQr/index.html
3	电视派TVPi页面  				https://webapp.skysrt.com/cc7.0/tvPi/index.html
4	会员成长秘籍页面 				https://webapp.skysrt.com/cc7.0/memberGrowth/index.html
5	会员影视VIP权益页面 			https://webapp.skysrt.com/cc7.0/memberMovieVIPInterest/index.html
6	会员教育VIP权益页面 			https://webapp.skysrt.com/cc7.0/memberEducationVIPInterest/index.html
7	会员等级权益页面 				https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html?level=1
							https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html?level=2
							https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html?level=3
							https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html?level=4
							https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html?level=5
							https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html?level=6
							https://webapp.skysrt.com/cc7.0/memberLevelInterest/index.html?level=7

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