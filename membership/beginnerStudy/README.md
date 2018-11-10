#学习与反馈 之 新手学习页面

输入参数说明：

#测试相关信息：
测试配置url（主页入口配置需要）：
http://beta.webapp.skysrt.com/yuanbo/CordovaJSdist/index.html

测试板上输入命令：
am start -a coocaa.intent.action.browser --es "url" "http://beta.webapp.skysrt.com/yuanbo/CordovaJSdist/index.html" ;


#以下信息备份供参考
1、新手学习页： 
am start -a coocaa.intent.action.browser --es "url" "https://beta.webapp.skysrt.com/yuanbo/CordovaJSdist/index.html" ; logcat | grep chrom
2、探索发现页：
am start -a coocaa.intent.action.browser --es "url" "https://beta.webapp.skysrt.com/lxw/guide2/index.html" ; logcat | grep chrom
3、帮助与反馈：
am start -a coocaa.intent.action.browser --es "url" "https://beta.webapp.skysrt.com/lxw/guide2/index3.html" ; logcat | grep chrom
