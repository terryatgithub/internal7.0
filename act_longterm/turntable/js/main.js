var thirdUserId = "";
var needQQ = false;
var go_use = "";
var awardType = "";
var commodity_name = "";
var page_state = "";
var prize_null = false;
var _login_type = "";
var _vuserid = "";


var _testurl = "https://restful.skysrt.com";

//正式环境服务器：
var adressIp = 'https://restful.skysrt.com/platform';
var addressUrl = "https://webapp.skysrt.com/zy/turntable/address/";
var priceUrl = "https://api-business.skysrt.com";

//测试环境服务器：
//var adressIp = "http://172.20.155.51:4000/platform";
//var addressUrl = "http://beta.webapp.skysrt.com/zy/activity_1/address/";
//var priceUrl = "http://dev.business.video.tc.skysrt.com";//支付

var userKeyId = '';
var remainingTimes;
var timeInter = "";//清倒计时
var Ticket = "";//是否调起优惠券
var _version = null;
var _cVersion = null;
var _lotteryType = "";
var _mac = null;
var _chip = null;
var _model = null;
var _emmcCID = null;
var _udid = null;
var _cFMode = "Default";
var _appversion = "";
var _cSize = "";
var _cSdk = "";
var _cBrand = "";
var _accessToken = null;
var _openId = null;
var _nickName = null;
var _qsource = null;


var _loginstatus = null;

var _curFocusIndex = 0;
var _part = "";
var _curAwardId = "";//存储当前奖品点击时的id
var _flag = 0;
var _notGotAwardId = "";//存储当前奖品点击时的id

var needSentUserLog = false;//判断是否点了登录
var needSentUserLog2 = false;//判断是否登录成功
var activeId;
var encrypt;

//小程序变量：
var _bAppxFirstIn = false;
var _browserVerSupportAppX = '200043';

var activeId = getUrlParam("id");
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbuttondown', this.onBackButtonDown, false);
        document.addEventListener("backbutton", this.handleBackButton, false);
        document.addEventListener("resume", this.onresumeButton, false);
        document.addEventListener("pause", this.onPause, false);
    },
    onBackButtonDown: function() {
        closeWindow();
        // console.log("中奖弹窗状态" + document.getElementById('popUp').style.display); 

        if (document.getElementById('indexhtml').style.display == "block") { //首页
            if (document.getElementById('confirmInfo').style.display == "block") { //中奖弹窗
                document.getElementById('confirmInfo').style.display = "none";
                document.getElementById('popUp').style.display = "none";
                initActive(0);
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('startdDraw'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else if (document.getElementById('popUp').style.display == "block") {
                document.getElementById('popUp').style.display = "none";
                document.getElementById('confirmInfo').style.display = "none";
                initActive(0);
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('startdDraw'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else {
                navigator.app.exitApp();
            }
        } else if (document.getElementById('prize').style.display == "block") { //我的奖品
            if (document.getElementById('confirmInfo').style.display == "block") {
                document.getElementById('confirmInfo').style.display = "none";
                document.getElementById('popUp').style.display = "none";
                getPrizeList();
                map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else if (document.getElementById('popUp').style.display == "block") {
                document.getElementById('confirmInfo').style.display = "none";
                document.getElementById('popUp').style.display = "none";
                getPrizeList();
                map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else if (document.getElementById('prize_window_box').style.display == "block") {
                document.getElementById('prize_window_box').style.display = "none";
                getPrizeList();
                map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else {
                document.getElementById('prize').style.display = "none";
                document.getElementById('indexhtml').style.display = "block";
                map = new coocaakeymap($(".coocaabtn"), document.getElementById("prize_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                initActive(0);
            }
        } else if (document.getElementById('rule').style.display == "block") { //活动规则
                document.getElementById('rule').style.display = "none";
                if(activity_type == "未开始"){
                    document.getElementById('notBegin').style.display = "block";
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById("_rule_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }else{
                    document.getElementById('indexhtml').style.display = "block";
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById("rule_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }                
        } else {
            navigator.app.exitApp();
        }

    },
    onPause: function() {
    	console.log('pause');
    },
    onresumeButton: function() {
    	console.log('in onResume. _bAppxFirstIn:'+_bAppxFirstIn);
    	if(_bAppxFirstIn){
    		_bAppxFirstIn = false;
    		showWebPage();
    		return;
    	} 
    	
        downloadReturn = true;
        console.log(Ticket+"======其他页面返回============");
        closeWindow();
        document.getElementById('confirmInfo').style.display = "none";
        document.getElementById('popUp').style.display = "none";
        document.getElementById('prize_window_box').style.display = "none";

        if(document.getElementById("indexhtml").style.display == "block") { //首页使用优惠券后回调
            initActive(0);
        }else if(document.getElementById("prize").style.display == "block") {
            getPrizeList();
        }

        var _dateObj = {
            "page_name": "转盘抽奖活动主页面登录弹窗",
            "activity_id": activeId,
            "activity_name": activity_name,
            "login_result": "",
            "open_id":_openId
        }
        console.log(needSentUserLog+"登录监听====="+needSentUserLog2);
        if(needSentUserLog == true){
            needSentUserLog = false;
            if (needSentUserLog2 == true) {
                needSentUserLog2 = false;
                _dateObj.login_result = "登录成功";
                hasLogin(needQQ,0);//0-走初始化
            }else{
                needSentUserLog2 = false;
                _dateObj.login_result = "登录失败";
              
            }
            pageShowLog("result_event",_dateObj);
        }
    },
    handleBackButton: function() {},
    onDeviceReady: function() {
        cordova.require("com.coocaaosapi");
        judgeLaunchSource();
    }

};
app.initialize();

//********************小程序 start **************************
//如果是小程序调起的web页面，不再在web页面里起小程序，避免递归
function judgeLaunchSource() {
	console.log('window.url: '+window.location.href)
	var from = getUrlParam("from");
	console.log('judgeLaunchSource from:'+from);
	
	if(from == 'appx') {
		console.log('from appx....')
		showWebPage();
	}else {
		console.log('not from appx....')
		startpage();
	}
}

//根据浏览器版本是否支持插件，判断是起web页还是小程序插件
function startpage() {
	var pkgname = "com.coocaa.app_browser";
	var a = '{"pkgList":["' + pkgname + '"]}';
	coocaaosapi.getAppInfo(a, function(message){
			console.log("getAppInfo ok====" + message);
			var msg = JSON.parse(message);
			if(msg[pkgname].status == -1) {//此apk不存在
				coocaaosapi.startAppStoreDetail(pkgname, function(){},function(){});
			}else {
				hasversioncode = msg[pkgname].versionCode;
				console.log('com.coocaa.app_browser version: '+hasversioncode+', appx_browser ver:'+_browserVerSupportAppX)
				if(hasversioncode < _browserVerSupportAppX) {
					console.log('not appx')
					showWebPage();
				}else {
					console.log('appx go...')
					launchAppX();
				}
			}
		},function(error) {
            console.log("getAppInfo----error" + JSON.stringify(error));
            coocaaosapi.startAppStoreDetail(pkgname,function(){},function(){});
   });
}
/*
 testcase:
 1. 低版本调用startAppX2时,web会onpause/resume吗？
 2. startAppX2 fail时,会onpause/resume？
 
 * */
function launchAppX() {
	coocaaosapi.addGlobalBroadcastListener("com.coocaa.appx.broadcasr.action.appx_launched", function(message) {
	    console.log('AppX cb OK..'+JSON.stringify(message));
        webExit();
	});
	var param= window.location.href +'&from=appx';
	var url = 'appx://com.coocaa.appx.lite_browser?url='+encodeURIComponent(param);
	console.log('launchAppX start,url: '+url);
	coocaaosapi.startAppX2(url,"false",function(){
		console.log('startAppX2 success....');
		_bAppxFirstIn = true;
	},function(){
		console.log('startAppX2 fail....');
		showWebPage();
	});
}
function webExit() {
	navigator.app.exitApp();
}
function showWebPage(){
	console.log('showwebpage start...')
	sessionStorage.setItem("userTrack", "1");
    buttonEvent(); //按钮事件
    _appversion = accountVersion;
    getDeviceInfo();
    listenUserChange();
}
//******************************小程序 end ************************************

function buttonEvent() {
    //点击返回按钮返回主页面
    $('.returnBtn').bind('itemClick', function() {
        document.getElementById('downloadMask').style.display = "none";
        document.getElementById('download_win').style.display = "none";
        map = new coocaakeymap($(".coocaabtn"), $('.active'), "btnFocus", function() {}, function(val) {}, function(obj) {});
        downloadReturn = true;
    })
    $("#rule_btn,#_rule_btn").bind('itemClick', function(event) {
        document.getElementById("rule").style.display = "block";
        document.getElementById("notBegin").style.display = "none";
        document.getElementById("indexhtml").style.display = "none";
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("rule"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        var _dateObj = {
            "page_name":"转盘抽奖活动规则页",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
        }  
        pageShowLog("web_page_show_new",_dateObj);
        var dateObj = {
            "page_name":"转盘抽奖活动主页面",
            "button_name":"详细活动规则",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
            "page_state":activity_type,
        } 
        pageShowLog("web_button_clicked",dateObj);
    });
    clickIndex = false;
    $("#startdDraw").bind('itemClick', function(event) {
        console.log("是否可点击"+clickIndex);
        if(clickIndex == false){
            clickIndex = true;
            var _dateObj = {
                "page_name":"转盘抽奖结果页",
                "activity_id":activeId,
                "open_id": _openId,
                "page_state": "",
                "activity_name": activity_name,
            }  
            var dateObj = {
                "page_name":"转盘抽奖活动主页面",
                "button_name":"立即抽奖",
                "activity_id":activeId,
                "open_id": _openId,
                "activity_name": activity_name,
                "page_state":activity_type,
            } 
            pageShowLog("web_button_clicked",dateObj);
    
            if(prize_null == true){
                clickIndex = false;
                popUp("over"); 
                _dateObj.page_state="奖品抽完时";
                page_state = "奖品抽完时";
                pageShowLog("web_page_show_new",_dateObj);
            }else{
                if(_loginstatus == "false") {
                    clickIndex = false;
                    startLogin(needQQ);
                    needSentUserLog = true;
                    _dateObj.page_state="不符合抽奖条件";
                    page_state = "不符合抽奖条件";
                    pageShowLog("web_page_show_new",_dateObj);
                    var _dateObj = {
                        "page_name":"转盘抽奖活动主页面登录弹窗",
                        "activity_id":activeId,
                        "activity_name": activity_name,
                    }   
                    pageShowLog("web_page_show_new",_dateObj);
                } else {
                    if(remainingTimes != 0) {
                        $.ajax({
                            type: "POST",
                            async: true,
                            url: adressIp + "/turntable/start",
                            data: {
                                "activeId":activeId,
                                "cUDID": _udid,
                                "cOpenId": _openId,
                                "cModel": _model,
                                "cChip": _chip,
                                "MAC": _mac,
                                "cEmmcCID":_emmcCID,
                                "cNickName":_nickName,
                                "cAvatar":face,
                                "userKeyId": userKeyId,
                                "encrypt":encrypt,
                            },
                            success: function(data) {
                                console.log("抽奖结果" + JSON.stringify(data));
                                clickIndex = false;    
                                if (data.code == 10100) {
                                    prize_null = false;
                                    awardName = data.data.awardName;
                                    awardType = data.data.awardType;
                                    rememberId = data.data.rememberId;
                                    userKeyId = data.data.userKeyId;
                                    userOpenId =data.data.userOpenId;
                                    awardId = data.data.awardId;
                                    awardUrl = data.data.awardUrl;
                                    seq = data.data.seq;
                                    awardExtend = data.data.awardExtend;
                                    lotteryTime = data.data.lotteryTime; 
    
                                    sessionStorage.setItem("awardName", data.data.awardName);
                                    sessionStorage.setItem("awardType", data.data.awardType);
                                    sessionStorage.setItem("rememberId", data.data.rememberId);
                                    sessionStorage.setItem("userKeyId", data.data.userKeyId);
                                    sessionStorage.setItem("userOpenId", data.data.userOpenId);
            
                                    sessionStorage.setItem("awardId", data.data.awardId);
                                    sessionStorage.setItem("awardUrl", data.data.awardUrl);
                                    sessionStorage.setItem("awardExtend", data.data.awardExtend);
                                    sessionStorage.setItem("lotteryTime", data.data.lotteryTime);
    
                                    $("#chanceNum,#_chanceNum").html(remainingTimes - 1);
                                    console.log("-----------获奖---------" + awardName + "；awardType:" + awardType);
                                    setTimeout(function(){startDraw(seq,awardName); }, 1);         
                                } else if (data.code == 30203 || data.code == 30201) {
                                    popUp("over");
                                    _dateObj.page_state="活动结束";
                                    pageShowLog("web_page_show_new",_dateObj);
                                } else if(data.code == 30101 || data.code == 30102 || data.code == 30103){
                                    initActive(0);
                                    console.log("标识不对");
                                    _dateObj.page_state="特殊情况";
                                    page_state = "特殊情况";
                                    pageShowLog("web_page_show_new",_dateObj);
                                }else if(data.code == 30302){
                                    popUp("over"); 
                                    prize_null = true;
                                    _dateObj.page_state="奖品抽完时";
                                    page_state = "奖品抽完时";
                                    pageShowLog("web_page_show_new",_dateObj);
                                }
                            },
                            error: function(error) {
                                clickIndex = false;
                                popUp("over");
                                _dateObj.page_state="特殊情况";
                                pageShowLog("web_page_show_new",_dateObj);
                                console.log("--------访问失败" + JSON.stringify(error));
                            }
                        });
                    }else { //没机会
                        clickIndex = false;
                        popUp("noChance");
                        page_state = "无抽奖机会时";
                        var _dateObj = {
                            "page_name":"转盘抽奖结果页",
                            "activity_id":activeId,
                            "open_id": _openId,
                            "page_state": "无抽奖机会时",
                            "activity_name": activity_name,
                        }  
                        pageShowLog("web_page_show_new",_dateObj);
                    }
                }
            }
    
        }




    });

    //跳转成为会员
    // $("#bevip_btn").bind('itemClick', function(event) {
    //     console.log("获取机会:"+vipSourceKey);

    //     var dateObj = {
    //         "page_name":"转盘抽奖活动主页面",
    //         "button_name":"获取机会",
    //         "activity_id":activeId,
    //         "open_id": _openId,
    //         "activity_name": activity_name,
    //         "page_state":activity_type,
    //     } 
    //     pageShowLog("web_button_clicked",dateObj);
    //     document.getElementById("deviceready").setAttribute("NoStart","true");
    //     coocaaosapi.startMovieMemberCenter2(vipSourceKey,function(message) {
    //         console.log(message);
    //     }, function(error) {
    //         console.log(error);
    //     });
    // });
    //优惠券使用跳转
    $("#use_submit").bind("itemClick", function() { //立即使用购物优惠券
        console.log(go_use+"立即使用"+awardType);
        if(go_use == "coupon"){
            if(document.getElementById("prize").style.display == "block") {
            //    pkgButtonLog("我的奖品页奖品详情弹窗", "立即使用", "优惠券（引导使用）");
            }else if(document.getElementById("indexhtml").style.display == "block"){
                var _dateObj = {
                    "page_name":"转盘抽奖结果页",
                    "button_name":"立即使用",
                    "activity_id":activeId,
                    "open_id": _openId,
                    "activity_name": activity_name,
                    "page_state":page_state,
                    "commodity_name":commodity_name,
                }   
                pageShowLog("web_button_clicked",_dateObj);
            }
            byvalue = $.trim(byvalue);
            console.log("跳转参数：" + couponDetail + "========" + byvalue + "=====" + bywhat + "=====" + sources);
            coocaaosapi.startParamAction2(bywhat, byvalue, sources, function(message) {}, function(error) {
                console.log("判断失败" + error);
            });
        }else if(go_use == "shop"){
            coocaaosapi.startAppShopDetail(price_id, function(message) {}, function(error) {
                console.log("判断失败" + error);
            });
        }else if(go_use == "buy"){
            console.log(price_id+"-------------"+activeId+"--------------"+price_img+"---------------"+commodity_name);
            var _dateObj = {
                "page_name":"转盘抽奖活动产品包二维码",
                "product_id":price_id,
                "activity_id":activeId,
                "open_id": _openId,
                "activity_name": activity_name,
                "product_name":commodity_name,
            }   
            pageShowLog("web_page_show_new",_dateObj);
    
            exemurl = priceUrl+'/v3/web/actCenter/index.html?data={"product_id":'+price_id+',"activity_id":"'+activeId+'","activity_name":"'+activity_name+'","bg_url":"'+price_img+'"}';
            coocaaosapi.startNewBrowser(exemurl,function(){},function(){});
        }

    });

    //登录跳转
    $("#use_login").bind("itemClick", function() {
        var _dateObj = {
            "page_name":"转盘抽奖活动主页面登录弹窗",
            "activity_id":activeId,
            "activity_name": activity_name,
        }   
        pageShowLog("web_page_show_new",_dateObj);  
        startLogin(needQQ);
    });

    $("#prize_btn").bind('itemClick', function(event) {
        if(_loginstatus == "false") {
            startLogin(needQQ);
            needSentUserLog = true;
        } else {
            document.getElementById('indexhtml').style.display = "none";
            document.getElementById('prize').style.display = "block";
            getPrizeList();
        }
        var dateObj = {
            "page_name":"转盘抽奖活动主页面",
            "button_name":"我的奖品",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
            "page_state":activity_type,
        } 
        pageShowLog("web_button_clicked",dateObj);
        var _dateObj = {
            "page_name":"转盘抽奖活动主页面登录弹窗",
            "activity_id":activeId,
            "activity_name": activity_name,
        }   
        pageShowLog("web_page_show_new",_dateObj);  
    });
    //我的奖品查看信息弹窗
    $(".prize_sure").bind('itemClick', function(event) {
        document.getElementById('prize_window_box').style.display = "none";
        getPrizeList();
        closeWindow();
        var _dateObj = {
            "page_name":"转盘抽奖活动我的奖品详情页",
            "activity_id":activeId,
            "open_id": _openId,
            "page_state": "平台优惠券",
            "activity_name": activity_name,
            "button_name":"知道了"
        } 
        if(document.getElementById("prize_window_qrcode").style.display == "block"){
            _dateObj.page_state="实物奖品（未填地址）";
        }else if(document.getElementById("prize_wechat_qrcode").style.display == "block"){
            _dateObj.page_state="微信红包（未领取）";
        }else if(document.getElementById("prize_phone_qrcode").style.display == "block"){
            _dateObj.page_state="话费流量类奖品（未填手机号）";
        }else if(document.getElementById("prize_window_address").style.display == "block"){
            _dateObj.page_state="实物奖品（已填地址）";
        }else if(document.getElementById("prize_window_phone").style.display == "block"){
            _dateObj.page_state="话费流量类奖品（已填手机号）";
        }else if(document.getElementById("prize_wechat_window").style.display == "block"){
            _dateObj.page_state="微信红包（已领取）";
        }else if(document.getElementById("prize_window_ticket").style.display == "block"){
            _dateObj.page_state="卡密类奖品";
        }else if(document.getElementById("prize_window_virtual").style.display == "block"){
            _dateObj.page_state="平台会员体验权益";
        }else if(document.getElementById("prize_window_coin").style.display == "block"){
            _dateObj.page_state="酷币奖品";
        }else if(document.getElementById("thirdCoupon_window").style.display == "block"){
            _dateObj.page_state="第三方优惠券";
        }else if(document.getElementById("prize_window_apply").style.display == "block"){
            _dateObj.page_state="报名奖品(未填地址)";
        }else if(document.getElementById("prize_apply_address").style.display == "block"){
            _dateObj.page_state="报名奖品（已填地址）";
        } 
        
        // else if(document.getElementById("prize_window_dummy").style.display == "block"){
        //     _dateObj.page_state="谢谢参与";
        // }
        pageShowLog("web_button_clicked",_dateObj);
    });
    $("#submit").bind('itemClick', function(event) { //继续抽奖
        var _dateObj = {
            "page_name":"转盘抽奖结果页",
            "button_name":"知道了",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
            "page_state":page_state,
            "commodity_name":commodity_name,
        }   
        pageShowLog("web_button_clicked",_dateObj);

        document.getElementById('confirmInfo').style.display = "none";
        document.getElementById('indexhtml').style.display = "block";
        document.getElementById('prize').style.display = "none";
        closeWindow();
        initActive(0);
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("startdDraw"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    });
    $("#error_submit").bind('itemClick', function(event) {
        var _dateObj = {
            "page_name":"",
            "button_name":"一会再说",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
            "page_state":page_state,
            "commodity_name":commodity_name,
        }   
        if(document.getElementById("indexhtml").style.display == "block"){
            _dateObj.page_name = "转盘抽奖结果页";
            initActive(0); 
        }else{
            _dateObj.page_name = "转盘抽奖活动我的奖品详情页";
            closeWindow();
            $("#prize_box").stop(true, true).animate({scrollTop: "0px"});
        }
        pageShowLog("web_button_clicked",_dateObj);
        
        document.getElementById('popUp').style.display = "none";
        closeWindow();

        map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    });
    $("#ok_btn").bind('itemClick', function(event) {
        var _dateObj = {
            "page_name":"转盘抽奖结果页",
            "button_name":"知道了",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
            "page_state":page_state,
            "commodity_name":commodity_name,
        }   
        pageShowLog("web_button_clicked",_dateObj);
        document.getElementById('popUp').style.display = "none";
        closeWindow();
        if(document.getElementById("indexhtml") == "block"){
            initActive(0);            
        }else{
            closeWindow();
            $("#prize_box").stop(true, true).animate({scrollTop: "0px"});
        }
        map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    });
    $("#error_submit_again").bind('itemClick', function(event) {
        var _dateObj = {
            "page_name":"",
            "button_name":"重新领取",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
            "page_state":page_state,
            "commodity_name":commodity_name,
        }  
        if(document.getElementById("indexhtml").style.display == "block"){
            _dateObj.page_name = "转盘抽奖活动主页面"
        }else{
            _dateObj.page_name = "转盘抽奖活动我的奖品详情页";
        }
        closeWindow();
        pageShowLog("web_button_clicked",_dateObj);
        document.getElementById('popUp').style.display = "none";
        lastWindow(awardName, awardType, rememberId, userKeyId, awardId, awardUrl, awardExtend);
    });

    $("#i_konw").bind("itemClick", function() {
        document.getElementById('prize').style.display = "none";
        document.getElementById('indexhtml').style.display = "block";
        map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        var _dateObj = {
            "page_name":"转盘抽奖活动我的奖品页",
            "activity_id":activeId,
            "commodity_name": "无",
            "page_state": "",
            "activity_name": activity_name,
            "button_name":"立即抽奖",
            "open_id": _openId,
        }
        if(activity_type == "进行中"){
            _dateObj.page_state = "无礼品（未结束）"
        }else if(activity_type == "已结束"){
            _dateObj.page_state = "无礼品（已结束）"
        }
        pageShowLog("web_button_clicked",_dateObj);
    });

    $("#addchance_btn,#bevip_btn").bind("itemClick", function() {

        var dateObj = {
            "page_name":"",
            "button_name":"获取机会",
            "activity_id":activeId,
            "open_id": _openId,
            "activity_name": activity_name,
            "page_state":activity_type,
        } 
        if(document.getElementById('prize').style.display == "block"){
            dateObj.page_name = "转盘抽奖活动主页面（弹窗）"
        }else{
            dateObj.page_name = "转盘抽奖活动主页面"
        }
        pageShowLog("web_button_clicked",dateObj);

        Ticket = "index_ticket";
        console.log("增加机会" + _byvalue + "--" + _bywhat + "--" + _sources);
        _byvalue = $.trim(_byvalue);
        _bywhat = $.trim(_bywhat);
        coocaaosapi.startParamAction2(_bywhat, _byvalue, _sources, function(message) {}, function(error) {
            console.log("判断失败" + error);
        });
    });

    

}



//获取活动信息接口
function getActivityInfo() {
    $.ajax({
        async:true,
        url: adressIp+"/turntable/active-info",
        type: "get",
        data:params,
        success: function(data) {
          console.log("活动信息："+JSON.stringify(data));
            if(data.code == 10100){
                for(var i=0;i<data.data.imgList.length;i++){
                    imgKey = data.data.imgList[i].imgKey;
                    if(imgKey == "mainImg"){
                        $("#index_bg").attr("src",data.data.imgList[i].imgUrl);//主背景
                    }else if(imgKey == "turntableImg"){
                        $(".rotate_img").attr("src",data.data.imgList[i].imgUrl);//转盘图
                    }else if(imgKey == "alertImg"){
                        dialogbg = data.data.imgList[i].imgUrl;
                        $("#dialogbg,#dialogbg1,#dialogbg2").attr("src",data.data.imgList[i].imgUrl);//弹窗背景图
                    }else if(imgKey == "buttonLotteryImg"){
                        $("#begin_img").attr("src",data.data.imgList[i].imgUrl);//开始抽奖
                    }else if(imgKey == "buttonOutImg"){
                        $("#end_img").attr("src",data.data.imgList[i].imgUrl);//抽完了
                    }else if(imgKey == "buttonChancedImg"){
                        $("#addchance_btn img").attr("src",data.data.imgList[i].imgUrl);// 获取机会
                    }else if(imgKey == "buttonMyAwardImg"){
                        $("#prize_btn img").attr("src",data.data.imgList[i].imgUrl);//我的奖品按钮图片
                    }else if(imgKey == "buttonKnowImg"){
                        $("#submit img,.sure_img").attr("src",data.data.imgList[i].imgUrl);//知道啦按钮图片
                    }else if(imgKey == "buttonUseImg"){
                        $("#use_submit img,.price_img").attr("src",data.data.imgList[i].imgUrl);//立即使用按钮图片
                    }else if(imgKey == "roleImg"){
                        $("#rule img").attr("src",data.data.imgList[i].imgUrl);//详细规则图片
                    }else if(imgKey == "unStartImg"){
                        $("#notbegin_bg").attr("src",data.data.imgList[i].imgUrl);//活动未开始
                    }else if(imgKey == "buttonHomeChancedImg"){
                        $("#buttonAddVipImg").attr("src",data.data.imgList[i].imgUrl);//首页获取机会
                    }
                    // else if(imgKey == "buttonAddVipImg"){
                    //     $("#buttonAddVipImg").attr("src",data.data.imgList[i].imgUrl);//加入会员
                    // }
                }
                // _vipSourceKey = JSON.parse(data.data.params);
                // vipSourceKey = _vipSourceKey.vipSourceKey;
                // console.log("vipSourceKey==========="+vipSourceKey);
                conditionWarn = data.data.unConditionMsg;//不符合条件的提示语 
                unChanceMsg = data.data.unChanceMsg;//无机会提示语
                unAwardMsg = data.data.unAwardMsg;//无奖品提示语
                activity_name = data.data.activeTitle;//活动名称
                turntableNumber = data.data.turntableNumber;//奖品数量
                fontColor = JSON.parse(data.data.fontColor);
                ruleButton = fontColor.ruleButton;//详细规则按钮颜色
                chanceInfo = fontColor.chanceInfo;//剩余机会文案颜色
                chanceLeft = fontColor.chanceLeft;//抽奖次数颜色
                message = fontColor.message;//弹窗字体颜色
                data_a = data.data.onclickData;//无机会时的跳转参数
                packageName = data_a.packageName;
                _byvalue = data_a.byvalue;
                _bywhat = data_a.bywhat;
                var obj = data_a.params;
                sources = new Array();
                for(var key in obj) {
                    var px = {};
                    px[key] = obj[key];
                    sources.push(px);
                }
                _sources = JSON.stringify(sources);
                console.log(packageName+"--" + _byvalue + "--" + _bywhat + "--" + _sources);
                displayKey = data.data.displayKey;//需要展示的模块
                _displayKey = displayKey.split(",");
                console.log(_displayKey+"==========_displayKey=========="+_displayKey.length);
                if(_displayKey.length == 2){
                    document.getElementById("awardList").style.display="block";
                    document.getElementById("displayCoin").style.display="block";
                    document.getElementById("displayChance").style.display="none";
                }else if(_displayKey.length == 0){
                    document.getElementById("awardList").style.display="none";
                    document.getElementById("displayCoin").style.display="none";
                    document.getElementById("displayChance").style.display="block";
                }else{
                    if(_displayKey == "rememberList"){
                        document.getElementById("awardList").style.display="block";
                        document.getElementById("displayCoin").style.display="none";  
                        document.getElementById("displayChance").style.display="block";     
                    }else{
                        document.getElementById("awardList").style.display="none";
                        document.getElementById("displayCoin").style.display="block";
                        document.getElementById("displayChance").style.display="none";
                    }
                }

                $(".mould_color > p,.mould_color").css({color: message});
                $(".notbegin_rule,.rule").css({color: ruleButton});
                $(".chanceInfo").css({color: chanceInfo});
                $(".chanceLeft").css({color: chanceLeft});
                initActive(1);
            }
        },
        error: function(error) {
            console.log("--------访问失败"+JSON.stringify(error));
        }

    });
}


//初始化接口
function initActive(type) {
    document.getElementById('popUp').style.display = "none";
    // console.log("初始化接口地址"+adressIp+"/turntable/init?cUDID="+_udid+"&cEmmcCID="+_emmcCID+"&cOpenId="+_openId+"&cModel="+_model+"&cChip="+_chip+"&MAC="+_mac+"&loginType="+_login_type+"&vuserid="+_vuserid+"&cNickName="+_nickName);
    $.ajax({
        async: true,
        url: adressIp + "/turntable/init",
        type: "POST",
        data:{
            "activeId":activeId,
            "cUDID": _udid,
            "cOpenId": _openId,
            "cModel": _model,
            "cChip": _chip,
            "MAC": _mac,
            "cEmmcCID":_emmcCID,
            "cNickName":_nickName,
            "cAvatar":face,
            "loginType":_login_type,
            "vuserid":_vuserid
        },
        success: function(data) {
            closeWindow();            
            console.log("初始化" + JSON.stringify(data));
            codeType = data.code;
            var _dateObj = {
                "page_name":"转盘抽奖活动主页面",
                "activity_id":activeId,
                "open_id": _openId,
                "page_state": "",
                "activity_name": activity_name,
            } 
            userKeyId = data.data.userKeyId; 
            if(data.code == 30202) { //活动未开始
                _dateObj.page_state = "未开始";
                activity_type = "未开始"
                document.getElementById('notBegin').style.display = "block";
                sysTime = data.data.sysTime;
                activeBeginTime = data.data.activeBeginTime;
                var str = JSON.stringify(data.data.activeBeginTime);
                console.log(str);
                year = str.substring(1, 5);
                month = str.substring(6, 8);
                day = str.substring(9, 11);
                hour = str.substring(12, 14);
                minute = str.substring(15, 17);
                second = str.substring(18, 20);
                //  console.log("年:"+year+"月："+month+"日："+day+"时:"+hour+"分:"+minute+"秒:"+second);
                clearInterval(timeInter);
                i = (new Date(sysTime)).getTime() - 1000;
                ShowCountDown(year, month, day, hour, minute);
                timeInter = window.setInterval(function() {
                    i = i + 1000;
                    ShowCountDown(year, month, day, hour, minute);
                }, 1000);
                if (sessionStorage.getItem("userTrack") == "1") {
                    sessionStorage.setItem("userTrack", "2");
                //    pkgPageShow("8月应用抽奖活动主页面", "活动未开始");
                }
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('_rule_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            }else if (data.code == 30203) { //已结束
                _dateObj.page_state = "已结束";
                activity_type="已结束";
                document.getElementById('indexhtml').style.display = "block";
                document.getElementById("startdDraw").style.display = "none";
                document.getElementById("drawend").style.display = "block";
                $("#prize_btn").attr('rightTarget', "#rule_btn");
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('prize_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                if (sessionStorage.getItem("userTrack") == "1") {
                    sessionStorage.setItem("userTrack", "2");
                //    pkgPageShow("8月应用抽奖活动主页面", "活动已结束");
                }
                getNameList();  
                if(type == 1){
                    startmarquee(400, 30, 0, 1); //滚动获奖名单
                }
                $(".remainingTimes,#bevip_btn").hide();         
            }else if(data.code == 30401){//用户未登录（说明在活动期间，但用户未登录）;
                _dateObj.page_state = "进行中";
                activity_type="进行中";
                document.getElementById('indexhtml').style.display = "block";
                $("#chanceNum,#_chanceNum").html("0");
                $("#coinNum").html("0");
                map = new coocaakeymap($(".coocaabtn"), document.getElementById("startdDraw"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                getNameList();
                setInterval(getNameList, 60000);  
                if(type == 1){
                    startmarquee(400, 30, 0, 1); //滚动获奖名单
                }  
                $("#prize_btn").attr('rightTarget', "#startdDraw");          
            }else if (data.code == 10100) {
                _dateObj.page_state = "进行中";
                activity_type="进行中";
                document.getElementById('indexhtml').style.display = "block";
                map = new coocaakeymap($(".coocaabtn"), document.getElementById("startdDraw"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                page_state = "进行中";
                $("#startdDraw").show();
                $("#prize_btn").show();
                $("#prize_btn").attr('rightTarget', "#startdDraw");  
                if (sessionStorage.getItem("userTrack") == "1") {
                    sessionStorage.setItem("userTrack", "2");
                }
                remainingTimes = data.data.remainingTimes;
                encrypt = data.data.encrypt;
                // operateTime = data.data.usedTimes;
                // lotteryCode = data.data.lotteryCode;
                $("#chanceNum,#_chanceNum").html(remainingTimes);
                $("#coinNum").html(data.data.coins);
                
                getNameList();
                setInterval(getNameList, 60000);
                if(type == 1){
                    startmarquee(400, 30, 0, 1); //滚动获奖名单
                }
                


            }else{
                _dateObj.page_state = "异常";
                console.log("活动不存在");
            }
            pageShowLog("web_page_show_new",_dateObj);
        },
        error: function(error) {
            console.log("--------访问失败"+JSON.stringify(error));
        }
    });

}


//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2], 'utf-8');
    return null; //返回参数值
}

//开始抽奖
function startDraw(item,awardName) {
    //转盘转动的代码
    console.log(item+"--------click start draw-----------"+awardType+"======="+turntableNumber);

    var bRotate = false;
    var rotateFn = function(awards, angles, txt) { //awards:奖项，angle:奖项对应的角度
        console.log("对应角度"+angles);
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 3000,
            callback: function() {
                lastWindow(awardName, awardType, rememberId, userKeyId, awardId, awardUrl, awardExtend);
                bRotate = !bRotate;
            }
        })
    };
    if (bRotate) return;
    var degree = 360/turntableNumber;
    for (var i = 0; i <= turntableNumber; i++) {
        if(i == item){
            degree = degree*(i-1);
            rotateFn(i, degree, awardName);
        }
    }
}


//关闭弹窗阴影
function closeWindow() {
    document.getElementById('bgMask').style.display = "none";
    $('body').css({ "overflow": "visible" });
    // $("#text1").html("");
    // $("#text2").html("");
    // $("#text3").html("");
}
//打开弹窗阴影
function openBg() {
    document.getElementById('bgMask').style.display = "block";
    $('body').css({ 'overflow': 'hidden' });
    map = new coocaakeymap($(".coocaabtn"), document.getElementById('bgMask'), "btnFocus", function() {}, function(val) {}, function(obj) {});
}

function lastWindow(awardName, awardType, rememberId, userKeyId, awardId, awardUrl, awardExtend){
    clickIndex = false;
    var _dateObj = {
        "page_name":"转盘抽奖结果页",
        "activity_id":activeId,
        "open_id": _openId,
        "page_state": "",
        "activity_name": activity_name,
        "commodity_name":awardName,
    }  
    
    console.log("奖品类型"+awardType);
    $(".matter").html(awardName);
    commodity_name = awardName;    
    $("#window_point").html("温馨提示：可在[我的奖品]中查看您已获得的奖品");
    openBg();
    awardExtend = JSON.parse(awardExtend);
    document.getElementById('confirmInfo').style.display = "block";
    console.log("奖品护展参数："+ awardExtend);
    document.getElementById('submit').style.display = "inline-block";
    document.getElementById('use_submit').style.display = "none";
    $("#submit").attr('rightTarget', "#submit");
    $("#prosit").show();
    map = new coocaakeymap($(".coocaabtn"), document.getElementById("submit"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    if(awardType == "kind"){ //实物
        _dateObj.page_state = "获得实物奖品";
        page_state = "获得实物奖品";        
        document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
        $("#window_point").html(awardExtend.msg);
        $("#type2").show();
        $("#type2").siblings().hide();
        $('#qrcode2').html("");
        $("#type2_img").attr("src", awardUrl);
        generateQRCode(addressUrl+"index.html?rememberId=" + rememberId + "&activeId=" + activeId + "&awardType="+awardType+"&userKeyId="+userKeyId, 2);
    }if(awardType == "thirdCoupon"){//第三方优惠券
        _dateObj.page_state = "获得第三方优惠券";
        page_state = "获得第三方优惠券";
        document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
        $("#type4").show();
        $("#type4").siblings().hide();
        $("#type4_img").attr("src", awardUrl);
        $("#sponsor4_2").html(awardExtend.msg);
    }else if (awardType == "coupon" || awardType == "virtual" || awardType == "card" || awardType == "coin") { //购物优惠券 || 平台会员权益 || 卡密 || 酷币
        if(awardType == "coupon"){
            _dateObj.page_state = "获得优惠券";
            page_state = "获得优惠券";
        }else if(awardType == "virtual"){
            _dateObj.page_state = "获得会员体验权益";
            page_state = "获得会员体验权益";
        }else if(awardType == "card"){
            _dateObj.page_state = "获得卡密类奖品";
            page_state = "获得卡密类奖品";
        }else if(awardType == "coin"){
            _dateObj.page_state = "获得酷币";
            page_state = "获得酷币";
        }
        $("#awardParams").html(awardExtend.msg);
        if(document.getElementById("prize").style.display == "block"){
            getGold(awardType, rememberId, userKeyId, awardId,awardUrl, "prize_type");
        }else if(document.getElementById("indexhtml").style.display == "block"){
            getGold(awardType, rememberId, userKeyId, awardId,awardUrl,"index_type");
        }        
    }else if(awardType == "directPrice"){//特价购买资格
        _dateObj.page_state = "获得特价购买资格";
        page_state = "获得特价购买资格";
        document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
        $("#type6").show();
        $("#type6").siblings().hide();
        $("#type6_img").attr("src", awardUrl);
        document.getElementById('submit').style.display = "none";
        document.getElementById('use_submit').style.display = "inline-block";
        $("#submit").attr('rightTarget', "#use_submit");
        if(awardExtend.business == 7703){
            go_use = "shop";//商品详情
        }else{
            go_use = "buy";//产品包
            price_img = awardExtend.cashierImg;
        }
        price_id = awardExtend.code;
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("use_submit"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if(awardType == "weChat"){//红包奖–去微信端领取
        _dateObj.page_state = "获得微信红包";
        page_state = "获得微信红包";
        document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
        $(".matter").html(awardExtend.newBonus+"元，累积待领取"+awardExtend.bonus+"元");        
        $("#window_point").html("");
        $("#type7").show();
        $("#type7").siblings().hide();
        $('#qrcode7').html("");
        getWxUrl(activeId,rememberId,userKeyId,7);
    }else if(awardType == "telPhone"){//赞助话费流量
        _dateObj.page_state = "获得话费类奖品";
        page_state = "获得话费类奖品";
        document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
        $("#type8").show();
        $("#type8").siblings().hide();
        $('#qrcode8').html("");
        $("#window_point").html("");
        $("#telphone").html(awardExtend.msg);
        generateQRCode(addressUrl+"index.html?rememberId=" + rememberId + "&activeId=" + activeId + "&awardType="+awardType+"&userKeyId="+userKeyId,8);
    }else if(awardType == "dummy") {//虚拟奖
        $("#prosit").hide();
        _dateObj.page_state = "获得谢谢参与";
        page_state = "获得谢谢参与";
        document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
        $("#type10").show();
        $("#type10").siblings().hide();
        $("#type10_img").attr("src", awardUrl);
        $("#thanks").html(awardExtend.msg);
        $("#window_point").html("");
    }else if(awardType == "apply") {//报名奖
        _dateObj.page_state = "获得报名奖";
        page_state = "获得报名奖";
        document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
        $("#window_point").html("");
        $("#type11").show();
        $("#type11").siblings().hide();
        $("#type11_img").attr("src", awardUrl);
        $('#qrcode11').html("");
        $("#baoming").html(awardExtend.msg);
        generateQRCode(addressUrl+"index_1.html?rememberId=" + rememberId + "&activeId=" + activeId + "&awardType="+awardType+"&userKeyId="+userKeyId, 11);
    }
    pageShowLog("web_page_show_new",_dateObj);
}

function prizeWindow(activeId,awardType, rememberId, awardUrl, awardName, lotteryTime, awardId, awardExtend, userKeyId) {
    document.getElementById('prize_window_box').style.display = "block";
     $("#dialogbg2").attr("src",dialogbg);//弹窗背景图
    $(".prize_name").html(awardName);
    openBg();
    console.log("来自我的奖品页弹窗实物奖品" + awardType);
    if (awardType == "kind") { //实物
        document.getElementById('prize_window_qrcode').style.display = "block";
        $("#prize_window_qrcode").siblings().hide();
        $('#qrcode22').html("");
        generateQRCode(addressUrl+"index.html?rememberId=" + rememberId + "&activeId=" + activeId + "&awardType="+awardType+"&userKeyId="+userKeyId, 22);
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if(awardType == "weChat"){//红包
        document.getElementById('prize_wechat_qrcode').style.display = "block";
        $(".prize_name").html(awardName+JSON.parse(awardExtend).bonus+"元");        
        $("#prize_wechat_qrcode").siblings().hide();
        $('#qrcode25').html("");
        getWxUrl(activeId,rememberId,userKeyId,25);
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn6"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if(awardType == "telPhone"){//话费流量
        document.getElementById('prize_phone_qrcode').style.display = "block";
        $("#prize_phone_qrcode").siblings().hide();
        $('#qrcode23').html("");
        generateQRCode(addressUrl+"index.html?rememberId=" + rememberId + "&activeId=" + activeId + "&awardType="+awardType+"&userKeyId="+userKeyId, 23);
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn5"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if (awardType == "apply") { //报名
        document.getElementById('prize_window_apply').style.display = "block";
        $("#prize_window_apply").siblings().hide();
        $('#qrcode24').html("");
        generateQRCode(addressUrl+"index_1.html?rememberId=" + rememberId + "&activeId=" + activeId + "&awardType="+awardType+"&userKeyId="+userKeyId, 24);
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn11"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }

}


//获取微信红包二维码
function getWxUrl(activeId, rrememberId, userKeyId,id) {

    var ajaxTimeoutFive = $.ajax({
        type: "POST",
        async: true,
        timeout: 5000,
        url: adressIp + "/wechat/qr-url",
        data: {
            "activeId":activeId,
            "MAC": _mac,
            "cChip": _chip,
            "cModel": _model,
            "cEmmcCID": _emmcCID,
            "cUDID": _udid,
            "accessToken": _accessToken,
            "cOpenId": _openId,
            "cNickName": _nickName,
            "rememberId": rrememberId,
            "userKeyId": userKeyId,
            "luckyDrawCode": "turntable",
            "type": "25",
            "cChannel": "coocaa"
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == "10100") {
                if(data.data.code == "200"){
                    var str = data.data.data;
                    generateQRCode(str,id);
                }else{
                    console.log("微信端获取失败"); 
                }
            }
        },
        error: function() {
            console.log("获取失败");
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("lxw -------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTimeoutFive.abort();　　　　
            }　　
        }
    });
}




function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

//二维码生成
function generateQRCode(url, id) {
    console.log(id+"create img--------------" + url);
    $("#qrcode" + id).qrcode({
        render: "canvas", // 渲染方式有table方式（IE兼容）和canvas方式
        width: 180, //宽度 
        height: 180, //高度 
        text: utf16to8(url), //内容 
        typeNumber: -1, //计算模式
        correctLevel: 2, //二维码纠错级别
        background: "#ffffff", //背景颜色
        foreground: "#000000" //二维码颜色
    });
    console.log("end img--------------");
//    map = new coocaakeymap($(".coocaabtn"), document.getElementById("qrcode" + id), "btnFocus", function() {}, function(val) {}, function(obj) {});
}
//领奖品
function getGold(awardType, rememberId, userKeyId, awardId,awardUrl, source_type) {
    console.log(thirdUserId+"====第三方ID===="+_vuserid);
 //   console.log(adressIp + "/receive-award/receive/?cUDID=" + _emmcCID + "&cOpenId=" + _openId + "&cModel=" + _model + "&cChip=" + _chip + "&MAC=" + _mac + "&activeId=" + getUrlParam("id") + "&rememberId=" + rememberId + "&awardType=" + awardType + "&userKeyId=" + userKeyId + "&awardId=" + awardId);
    if (awardType == "coupon" || awardType == "card" || awardType == "virtual" || awardType == "coin") { //领取优惠券
        var ajaxTimeoutOne = $.ajax({
            async: false,
            timeout: 5000,
            url: adressIp + "/receive-award/receive",
            type: "post",
            data: {
                "activeId":activeId,
                "cUDID": _udid,
                "cOpenId": _openId,
                "cModel": _model,
                "cChip": _chip,
                "MAC": _mac,
                "cEmmcCID":_emmcCID,
                "cNickName":_nickName,
                "cAvatar":face, 
                "awardType": awardType,
                "awardId": awardId,
                "rememberId": rememberId,
                "userKeyId": userKeyId,
                "vuserid":_vuserid,
                "thirdUserId":thirdUserId
            },
            success: function(data) {
                console.log("--------领取信息：" + JSON.stringify(data));
                if (data.code == 10100) {
                    var cardInfo = new Array();
                    if(awardType == "card") {
                        cardinfo = data.data.result.cards;
                        console.log(cardinfo.length);
                    //    pkgPageShow("8月应用抽奖抽奖结果弹窗", "第三方优惠");
                        if (source_type == "prize_type") {
                        //    pkgPageShow("我的奖品页奖品详情弹窗", "兑换码商品");
                            document.getElementById("prize_window_box").style.display = "block";
                            document.getElementById("prize_window_ticket").style.display = "block";
                            $("#prize_window_ticket").siblings().hide();
                            if (cardinfo.length > 1) {
                                $("#car_password_prize").html(cardinfo[0].password);
                                $("#car_password1_prize").html(cardinfo[1].password);
                            } else {
                                $("#car_password_prize").html(cardinfo[0].password);
                            }
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById('sure_btn_ticket'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        }else if (source_type == "index_type") {
                            document.getElementById("confirmInfo").style.display = "block";
                            $("#type3").show();
                            $("#type3").siblings().hide();
                            $("#type3_img").attr("src", awardUrl);                           
                            document.getElementById('submit').style.display = "inline-block";
                            document.getElementById('use_submit').style.display = "none";
                            $("#submit").attr('rightTarget', "#submit");
                            $("#window_point").html("");
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            if (cardinfo.length > 1) {
                                $("#password1").show();
                                $("#car_password").html(cardinfo[0].password);
                                $("#car_password1").html(cardinfo[1].password);
                            } else {
                                $("#car_password").html(cardinfo[0].password);
                            }
                        }
                    } else if (awardType == "coupon") {
                        couponDetail = data.data.params.couponDetail;
                    //    pkgPageShow("8月应用抽奖抽奖结果弹窗", "优惠券（引导使用）");
                        document.getElementById('confirmInfo').style.display = "block";
                        $("#type5").show();
                        $("#type5").siblings().hide();
                        $("#type5_img").attr("src", awardUrl);
                       
                        if (couponDetail == 1) { //已配置
                            var data_a = data.data.params.onclickData;
                            byvalue = JSON.parse(data_a).byvalue;
                            bywhat = JSON.parse(data_a).bywhat;
                            obj = JSON.parse(data_a).param;
                            sources = new Array();
                            for (var key in obj) {
                                var px = {};
                                px[key] = obj[key];
                                sources.push(px);
                            }
                            sources = JSON.stringify(sources);
                            document.getElementById('submit').style.display = "inline-block";
                            document.getElementById('use_submit').style.display = "inline-block";
                            go_use = "coupon";
                            console.log("跳转参数：" + couponDetail + "========" + byvalue + "=====" + bywhat + "=====" + sources);
                            $("#submit").attr('rightTarget', "#use_submit");
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById('use_submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        } else if (couponDetail == 0) { //没有配置
                            //popUp("defalut_success");
                            console.log("无配置跳转参数");
                        }
                        
                    }else if(awardType == "virtual"){
                        document.getElementById('confirmInfo').style.display = "block";
                        $("#type1").show();
                        $("#type1").siblings().hide();
                        $("#type1_img").attr("src", awardUrl);
                        document.getElementById('submit').style.display = "inline-block";
                        map = new coocaakeymap($(".coocaabtn"), document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    }else if(awardType == "coin"){
                        document.getElementById('confirmInfo').style.display = "block";
                        $("#type9").show();
                        $("#type9").siblings().hide();
                        $("#type9_img").attr("src", awardUrl);
                        document.getElementById('submit').style.display = "inline-block";
                        map = new coocaakeymap($(".coocaabtn"), document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    }
                } else {
                    console.log(data.msg);
                    closeWindow();
                    popUp("getFail");
                    document.getElementById('confirmInfo').style.display = "none";
                    //  $("#text2").html(data.msg);
                }
            },
            error: function() {
                console.log("--------访问失败");
                popUp("getFail");
            },
            complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
                　　　
                console.log("-------------complete------------------" + status);
                if (status == 'timeout') {　　　　　 ajaxTimeoutOne.abort();　　　　 }　　
            }
        });
        //  map = new coocaakeymap($(".coocaabtn"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    }

}
//我的奖品
function getPrizeList() {
    $.ajax({
        type: "GET",
        async: true,
        url: adressIp + "/turntable/u-award",
        data:{
            "activeId":activeId,
            "cUDID": _udid,
            "cOpenId": _openId,
            "cModel": _model,
            "cChip": _chip,
            "MAC": _mac,
            "cEmmcCID":_emmcCID,
            "cNickName":_nickName,
            "cAvatar":face, 
            "userKeyId":userKeyId
        },
        success: function(data) {
            console.log("--我的奖品"+ JSON.stringify(data));
            var _dateObj = {
                "page_name":"转盘抽奖活动我的奖品页",
                "activity_id":activeId,
                "open_id": _openId,
                "activity_name": activity_name,
                "page_state":""
            }  
            
            if(data.code == "10100"){
                if (data.data.length == 0) {
                        if(activity_type == "进行中"){
                            _dateObj.page_state = "无礼品（未结束）"
                        }else if(activity_type == "已结束"){
                            _dateObj.page_state = "无礼品（已结束）"
                        }
                        pageShowLog("web_page_show_new",_dateObj);
                        document.getElementById('prize_null').style.display = "block";
                        document.getElementById('prize_list').style.display = "none";
                        map = new coocaakeymap($(".coocaabtn"), document.getElementById('i_konw'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    } else {
                        _dateObj.page_state = "有礼品";
                        pageShowLog("web_page_show_new",_dateObj);
                        document.getElementById('prize_list').style.display = "block";
                        document.getElementById('prize_null').style.display = "none";
                        document.getElementById("prize_box").innerHTML = "";
                        for (var i = 0; i < data.data.length; i++) {                         
                            if (!data.data[i].awardComments) {
                                awardComments = "";
                            } else {
                                awardComments = data.data[i].awardComments
                            }
                            Flag = data.data[i].receiveState;
                            var exemDiv_need = document.createElement("div");
                            exemDiv_need.setAttribute('rememberId', data.data[i].rememberId);
                            exemDiv_need.setAttribute('userKeyId',data.data[i].userKeyId);
                            exemDiv_need.setAttribute('awardId', data.data[i].awardId);
                            exemDiv_need.setAttribute('awardName',data.data[i].awardName);
                            exemDiv_need.setAttribute('awardType', data.data[i].awardType);
                            exemDiv_need.setAttribute('awardUrl',data.data[i].awardUrl);
                            exemDiv_need.setAttribute('awardExtend', data.data[i].awardExtend);
                            exemDiv_need.setAttribute('lotteryTime', data.data[i].lotteryTime);
                            exemDiv_need.setAttribute('version',data.data[i].version);     
                            exemDiv_need.setAttribute('activeId',data.data[i].activeId); 
                                                   
                            if (Flag == 0) { //  console.log("未兑换奖品");
                                exemDiv_need.setAttribute('class', 'coocaabtn prize_box overdue prize_state');
                                if(data.data[i].awardType == "weChat"){                                    
                                    _awardname=data.data[i].awardName + JSON.parse(data.data[i].awardExtend).bonus + "元";
                                    exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + _awardname + '</li><li class="li2">未领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                }else{
                                    exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li2">未领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                }                                
                            } else if (Flag == 1) {                                
                                if (data.data[i].awardType == "card") { //3卡密
                                    exemDiv_need.setAttribute('class', 'coocaabtn prize_box overdue prize_info'); 
                                    var cardslist = new Array();
                                    cardslist = JSON.parse(data.data[i].awardInfo).cards;
                                    if(cardslist.length >= 2){
                                        for(var n = 0; n< cardslist.length; n++){
                                            exemDiv_need.setAttribute('password'+n,cardslist[n].password); 
                                        }
                                    }else{
                                        exemDiv_need.setAttribute('password0',cardslist[0].password); 
                                        exemDiv_need.setAttribute('password1',""); 
                                    }
                                    exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li2">已领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                } else if (data.data[i].awardType == "kind" || data.data[i].awardType == "telPhone" || data.data[i].awardType == "apply") { //2实物 || 话费
                                    var userAddress = "";
                                    if (data.data[i].userAddressEntity.province == data.data[i].userAddressEntity.city) {
                                        userAddress = data.data[i].userAddressEntity.city + data.data[i].userAddressEntity.district + data.data[i].userAddressEntity.address
                                    } else {
                                        userAddress = data.data[i].userAddressEntity.province + data.data[i].userAddressEntity.city + data.data[i].userAddressEntity.district + data.data[i].userAddressEntity.address;
                                    }
                                    exemDiv_need.setAttribute('class', 'coocaabtn prize_box overdue prize_info'); 
                                    exemDiv_need.setAttribute('username', data.data[i].userAddressEntity.receiveName);
                                    exemDiv_need.setAttribute('useraddress', userAddress);
                                    exemDiv_need.setAttribute('userphone', data.data[i].userAddressEntity.userPhone); 
                                    exemDiv_need.setAttribute('receiveTime', data.data[i].userAddressEntity.receiveTime); 
                                    exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li2">已领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                } else if (data.data[i].awardType == "coupon") { //优惠券
                                    exemDiv_need.setAttribute('class', 'coocaabtn prize_box overdue prize_info'); 
                                    couponDetail = JSON.parse(data.data[i].awardInfo).couponDetail;
                                    if (couponDetail == 1) { //已配置
                                        var data_a = JSON.parse(data.data[i].awardInfo).onclickData;
                                        byvalue = JSON.parse(data_a).byvalue;
                                        bywhat = JSON.parse(data_a).bywhat;
                                        obj = JSON.parse(data_a).param;
                                        var sources = new Array();
                                        for (var key in obj) {
                                            var px = {};
                                            px[key] = obj[key];
                                            sources.push(px);
                                        }
                                        sources = JSON.stringify(sources);

                                        exemDiv_need.setAttribute('byvalue', byvalue);
                                        exemDiv_need.setAttribute('bywhat', bywhat);
                                        exemDiv_need.setAttribute('sources', sources);

                                        exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li2">已领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                    } else { //无配置
                                        exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li2">已领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                    }
                                }else if(data.data[i].awardType == "weChat"){//微信红包
                                    exemDiv_need.setAttribute('class', 'coocaabtn prize_box overdue prize_info'); 
                                    _awardname=data.data[i].awardName + JSON.parse(data.data[i].awardExtend).bonus + "元";
                                    exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + _awardname + '</li><li class="li2">已领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                }else if(data.data[i].awardType == "virtual" || data.data[i].awardType == "coin" || data.data[i].awardType == "thirdCoupon"){//平台会员权益 || 酷币 || 第三方优惠券 || 虚拟奖
                                    exemDiv_need.setAttribute('class', 'coocaabtn prize_box overdue prize_info');
                                    exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li2">已领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';
                                }else if(data.data[i].awardType == "directPrice"){//特价购买资格      
                                    exemDiv_need.setAttribute('class', 'coocaabtn prize_box overdue prize_info');                            
                                    exemDiv_need.innerHTML = '<img src="images/22.png"/><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li2">已领取</li><li class="li3">' + data.data[i].updateTime + '</li></li>';

                                }
                            }                           
                            $("#prize_box").append(exemDiv_need);
                            map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
                        }
        
        
                        $(".prize_box").bind("itemFocus", function() {
                            var _index = $(".prize_box").index($(this));
                            var _eachheight = $(".prize_box")[0].offsetHeight+20;
                            var myScrollTopValue = 0;
                            myScrollTopValue = _index * _eachheight;
                        	console.log("滑动========"+myScrollTopValue);
                            $("#prize_box").stop(true, true).animate({
                                scrollTop: myScrollTopValue
                            }, {
                                duration: 0,
                                easing: "swing",
                                complete: function() {}
                            });		
                        });
        
                        $(".prize_state").bind("itemClick", function() {
                            userKeyId = $(this).attr("userKeyId");
                            rememberId = $(this).attr("rememberId");
                            awardName = $(this).attr("awardName");
                            awardId = $(this).attr("awardId");
                            awardType = $(this).attr("awardType");
                            awardUrl = $(this).attr("awardUrl");
                            awardExtend = $(this).attr("awardExtend");
                            lotteryTime = $(this).attr("lotteryTime");
                            activeId =  $(this).attr("activeId");


                            $(".matter").html(awardName);
                            $(".prize_name").html(awardName);
                            $(".prize_time").html(lotteryTime);
                            openBg();
                            var _dateObj = {
                                "activity_id":activeId,
                                "commodity_name": awardName,
                                "page_state": "有礼品",
                                "activity_name": activity_name,
                                "button_name":""
                            } 
                            var dateObj = {
                                "page_name":"转盘抽奖活动我的奖品详情页",
                                "activity_id":activeId,
                                "open_id": _openId,
                                "activity_name": activity_name,
                                "page_state":""
                            }    
                            if(awardType == "coupon"){
                                _dateObj.button_name = "优惠券";  
                                dateObj. page_state = "优惠券";                            
                            }else if(awardType == "card"){
                                _dateObj.button_name = "卡密类奖品";  
                                dateObj. page_state = "卡密类奖品";
                            }else if(awardType == "virtual"){
                                _dateObj.button_name = "会员体验权益";
                                dateObj. page_state = "会员体验权益";  
                            }else if(awardType == "coin"){
                                _dateObj.button_name = "酷币";  
                                dateObj. page_state = "酷币";
                            }else if(awardType == "kind"){
                                _dateObj.button_name = "实物奖品"; 
                                dateObj. page_state = "实物奖品"; 
                            }else if(awardType == "telPhone"){
                                _dateObj.button_name = "话费流量类奖品"; 
                                dateObj. page_state = "话费流量类奖品"; 
                            }else if(awardType == "weChat"){
                                _dateObj.button_name = "微信红包";  
                                dateObj. page_state = "微信红包";
                            }else if(awardType == "apply"){
                                _dateObj.button_name = "报名奖品";  
                                dateObj. page_state = "报名奖品";
                            }
                            pageShowLog("web_button_clicked",_dateObj);
                            pageShowLog("web_page_show_new",dateObj);
                            if (awardType == "coupon" || awardType == "card" || awardType == "virtual" || awardType == "coin") {
                                getGold(awardType, rememberId, userKeyId, awardId,awardUrl, "prize_type");
                            }else if(awardType == "kind" || awardType == "telPhone" || awardType == "weChat" || awardType == "apply"){ //    pkgPageShow("我的奖品页奖品详情弹窗", "实物奖品（未填写地址）");
                                prizeWindow(activeId,awardType, rememberId, awardUrl, awardName, lotteryTime, awardId, awardExtend, userKeyId);
                            }
                        });
                        $(".prize_info").bind("itemClick", function() {
                            awardType = $(this).attr("awardType");
                            awardName = $(this).attr("awardName");
                            lotteryTime = $(this).attr("lotteryTime");
                            awardUrl = $(this).attr("awardUrl");
                            awardExtend = $(this).attr("awardExtend");

                            $(".prize_name").html(awardName);
                            $(".prize_time").html(lotteryTime);
                            console.log("awardExtend:" + awardExtend);
                            document.getElementById("prize_window_box").style.display = "block";
                            openBg();
                            var _dateObj = {
                                "page_name":"转盘抽奖活动我的奖品详情页",
                                "activity_id":activeId,
                                "commodity_name": awardName,
                                "page_state": "有礼品",
                                "activity_name": activity_name,
                                "button_name":"",
                                "open_id": _openId,
                            }   
                            var dateObj = {
                                "page_name":"转盘抽奖活动我的奖品详情页",
                                "activity_id":activeId,
                                "open_id": _openId,
                                "activity_name": activity_name,
                                "page_state":""
                            }                         
                            if(awardType == "kind") {   
                                                          
                                userName = $(this).attr("username");
                                userAddress = $(this).attr("useraddress");
                                userPhone = $(this).attr("userphone");
                                receiveTime = $(this).attr("receiveTime");
                                _dateObj.button_name = "实物奖品";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "实物奖品";
                                pageShowLog("web_page_show_new",dateObj);
                                document.getElementById("prize_window_address").style.display = "block";
                                $("#prize_window_address").siblings().hide();
                                $(".user_name").html(userName);
                                $(".user_phone").html(userPhone);
                                $(".user_address").html(userAddress);
                                console.log(userAddress); 
                                map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn1"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }else if (awardType == "card") {
                                _dateObj.button_name = "卡密类奖品";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "卡密类奖品";
                                pageShowLog("web_page_show_new",dateObj);
                                awardComments = JSON.parse(awardExtend).msg;
                                document.getElementById("prize_window_ticket").style.display = "block";
                                $("#prize_window_ticket").siblings().hide();
                                $("#awardParams_1").html(awardComments);
                                password0 = $(this).attr("password0");
                                password1 = $(this).attr("password1");
                                console.log(password0+"---22222222222222222222---"+password1);
                                $("#car_password_prize").html(password0);
                                $("#car_password1_prize").html(password1);
                                map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn_ticket"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }else if(awardType == "virtual"){//会员权益
                                _dateObj.button_name = "会员体验权益";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "会员体验权益";
                                pageShowLog("web_page_show_new",dateObj);
                                document.getElementById("prize_window_virtual").style.display = "block";
                                $("#prize_window_virtual").siblings().hide();
                                $("#virtual_img").attr("src",awardUrl);
                                map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn2"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }else if(awardType == "coin"){//酷币
                                _dateObj.button_name = "酷币";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "酷币";
                                pageShowLog("web_page_show_new",dateObj);
                                document.getElementById("prize_window_coin").style.display = "block";
                                $("#prize_window_coin").siblings().hide();
                                $("#coin_img").attr("src",awardUrl);
                                map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn3"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }else if(awardType == "telPhone"){
                                _dateObj.button_name = "话费流量类奖品";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "话费流量类奖品";
                                pageShowLog("web_page_show_new",dateObj);
                                document.getElementById("prize_window_phone").style.display = "block";
                                userPhone = $(this).attr("userphone");
                                $(".user_phone1").html(userPhone);
                                $("#prize_window_phone").siblings().hide();
                                 map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn4"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }else if(awardType == "weChat"){
                                _dateObj.button_name = "微信红包";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "微信红包";
                                pageShowLog("web_page_show_new",dateObj);
                                document.getElementById("prize_wechat_window").style.display = "block";
                                $("#prize_wechat_window").siblings().hide();
                                 map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn8"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }else if(awardType == "directPrice"){//特价购买
                                _dateObj.button_name = "特价购买资格";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "特价购买资格";
                                pageShowLog("web_page_show_new",dateObj);
                                business = JSON.parse(awardExtend).msg;
                                productId = JSON.parse(awardExtend).code; 
                                document.getElementById("prize_window").style.display = "block";
                                $("#price_img").attr("src",awardUrl);
                                $("#prize_window").siblings().hide();
                                map = new coocaakeymap($(".coocaabtn"), document.getElementById("priceBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                                $("#priceBtn").bind("itemClick", function() {
                                    var _dateObj = {
                                        "page_name":"转盘抽奖活动我的奖品详情页",
                                        "activity_id":activeId,
                                        "open_id": _openId,
                                        "page_state": "特价购买资格",
                                        "activity_name": activity_name,
                                        "button_name":"立即使用"
                                    }  
                                    pageShowLog("web_button_clicked",_dateObj);
                                    if(business == 7703){                                     
                                        coocaaosapi.startAppShopDetail(productId, function(message) {}, function(error) {
                                            console.log("判断失败" + error);
                                        });
                                    }else{
                                        cashierImg = JSON.parse(awardExtend).cashierImg;
                                        exemurl = priceUrl+'/v3/web/actCenter/index.html?data={"product_id":'+productId +',"activity_id":"'+activeId+'","activity_name":"'+activity_name+'","bg_url":"'+cashierImg+'"}'
                                        coocaaosapi.startNewBrowser(exemurl,function(){},function(){});
                                    }
                                });
                            }else if(awardType == "coupon"){//优惠券
                                _dateObj.button_name = "优惠券";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "优惠券";
                                pageShowLog("web_page_show_new",dateObj);
                                bywhat = $(this).attr("bywhat");
                                byvalue = $(this).attr("byvalue");
                                sources = $(this).attr("sources");
                                document.getElementById("coupon_window").style.display = "block";
                                $("#coupon_img").attr("src",awardUrl);
                                $("#coupon_window").siblings().hide();
                                map = new coocaakeymap($(".coocaabtn"), document.getElementById("couponBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                                $("#couponBtn").bind("itemClick", function() {                                     
                                    var _dateObj = {
                                        "page_name":"转盘抽奖活动我的奖品详情页",
                                        "activity_id":activeId,
                                        "open_id": _openId,
                                        "page_state": "平台优惠券",
                                        "activity_name": activity_name,
                                        "button_name":"立即使用"
                                    }  
                                    pageShowLog("web_button_clicked",_dateObj);
                                    coocaaosapi.startParamAction2(bywhat,byvalue,sources,function(message) {}, function(error) {console.log("判断失败"+error);});
                                });
                            }else if(awardType == "thirdCoupon"){//第三方优惠券
                                _dateObj.button_name = "第三方优惠券";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "第三方优惠券";
                                pageShowLog("web_page_show_new",dateObj);
                                document.getElementById("thirdCoupon_window").style.display = "block";
                                thirdCoupon_txt = JSON.parse(awardExtend).msg;
                                $("#third_img").attr("src",awardUrl);
                                $("#thirdCoupon_txt").html(thirdCoupon_txt)
                                $("#thirdCoupon_window").siblings().hide();
                                 map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn9"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }else if(awardType == "apply") {  //报名奖                              
                                userName = $(this).attr("username");
                                userAddress = $(this).attr("useraddress");
                                userPhone = $(this).attr("userphone");
                                receiveTime = $(this).attr("receiveTime");
                                _dateObj.button_name = "报名奖品";
                                pageShowLog("web_button_clicked",_dateObj);
                                dateObj.page_state = "报名奖品";
                                pageShowLog("web_page_show_new",dateObj);
                                document.getElementById("prize_apply_address").style.display = "block";
                                $("#prize_apply_address").siblings().hide();
                                $(".user_name").html(userName);
                                $(".user_phone").html(userPhone);
                                $(".user_address").html(userAddress);
                                map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn12"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            }
                            // else if(awardType == "dummy"){//虚拟奖
                            //     _dateObj.button_name = "谢谢参与";
                            //     pageShowLog("web_button_clicked",_dateObj);
                            //     dateObj.page_state = "谢谢参与";
                            //     pageShowLog("web_page_show_new",dateObj);
                            //     document.getElementById("prize_window_dummy").style.display = "block";
                            //     $("#dummy_img").attr("src",awardUrl);
                            //     $("#prize_window_dummy").siblings().hide();
                            //      map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn7"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            // }
                        });



                        //滑动
                        $(".prize_box").bind("focus", function() {
                            var _index = parseInt($(".prize_box").index($(this))/2);
                            var _eachheight = $(".prize_box")[0].offsetHeight+20;
                            var myScrollTopValue = 0;
                            myScrollTopValue = _index * _eachheight;
                            $("#prize_box").stop(true, true).animate({
                                scrollTop: myScrollTopValue
                            }, {
                                duration: 0,
                                easing: "swing",
                                complete: function() {}
                            });		
                        });

                    }
            }

        },
        error: function() {
            console.log("-------------error");
        }
    });

}



//提示弹窗
function popUp(type){
  var str = '';
  openBg();
  console.log(type+"==========");
  $(".head").css({"margin-bottom": '120px'});
  $("#error_img").hide();
  document.getElementById('popUp').style.display = "block";
  if(type == "notBegin"){//未开始
    var ohtml = '秒杀将于<span style="color:#ffff33">'+activeBeginTime+'</span>开始';
    $("#text1").append(ohtml);
    $("#text2").html("活动还未开始");
    $("#text3").html("");
    $("#addchance_btn").show();
    $("#ok_btn").show();
    $("#ok_btn").attr('leftTarget', "#addchance_btn");
    $("#error_submit_again,#error_submit").hide();
    map = new coocaakeymap($(".coocaabtn"),document.getElementById('addchance_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
  }else if(type == "useUp"){//不符合条件
    $("#text1").html(conditionWarn);
    $("#text2").html("");
    $("#text3").html("");
    $("#addchance_btn").show();
    $("#ok_btn").show();
    $("#ok_btn").attr('leftTarget', "#addchance_btn");
    $("#error_submit_again,#error_submit").hide();
    map = new coocaakeymap($(".coocaabtn"),document.getElementById('addchance_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
  }else if(type == "noChance"){//没机会
    $("#text1").html(unChanceMsg);
    $("#text2").html("");
    $("#text3").html("");
    $("#addchance_btn").show();
    $("#ok_btn").show();
    $("#ok_btn").attr('leftTarget', "#addchance_btn");
    $("#error_submit_again,#error_submit").hide();
    map = new coocaakeymap($(".coocaabtn"),document.getElementById('addchance_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
  }else if(type == "over"){//奖品已领完或已结束
    $("#text1").html(unAwardMsg);
    $("#text2").html("");
    $("#text3").html("");
    $("#ok_btn").siblings('div').hide();
    $("#ok_btn").show();
    $("#ok_btn").attr('leftTarget', "#ok_btn");
    map = new coocaakeymap($(".coocaabtn"),document.getElementById('ok_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
  }else if(type == "getFail"){//领取失败
    $("#text1").html("");
    $("#text2").html("");
    $("#text3").html("");
    $("#addchance_btn,#ok_btn").hide();
    $(".head").css({"margin-bottom": '20px'});
    $("#error_submit,#error_submit_again,.error_point,#error_img").show();
    map = new coocaakeymap($(".coocaabtn"),document.getElementById('error_submit_again'), "btnFocus", function() {}, function(val) {}, function(obj) {});
  }


//map = new coocaakeymap($(".coocaabtn"),document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});


}


//获奖名单
function getNameList() {
    document.getElementById("awardul").innerHTML = "";
    $.ajax({
        type: "GET",
        async: true,
        url: adressIp + "/turntable/news-fake",
        data: params,
        success: function(data) {
        //    console.log("获奖名单"+JSON.stringify(data));
            var _UserNickName = new Array();
            var _phone = new Array();
            var _awardName = new Array();
            for (var i = 0; i < data.data.length; i++) {
                if (!data.data[i].userNickName) {
                    _UserNickName[i] = "匿名用户";
                } else {
                    _UserNickName[i] = data.data[i].userNickName;
                }
                _awardName[i] = data.data[i].awardName;
                //  mobile[i] = data.data[i].userPhone;
                //  _phone[i] = mobile.substr(0, 3) + '****' + mobile.substr(7, 11);
            }
            for (var i = 0; i < data.data.length; i++) {

                var list = '<li>' + '<span class="testspan1">' + _UserNickName[i] + '</span><span class="testspan3" style="text-align:left">获得' + _awardName[i] + '</span></li>';
                $("#awardul").append(list);

            }
        },
        error: function() {
            console.log("error");
        }
    });
}

//获奖名单滚动效果
function startmarquee(lh, speed, delay, index) {
    console.log("开始滚动！！！！！！！！！！！！！");
    var t;
    var p = false;
    var o = document.getElementById("awardListTwo");
    o.innerHTML += o.innerHTML;
    o.onmouseover = function() { p = true }
    o.onmouseout = function() { p = false }
    o.scrollTop = 0;

    function start() {
        t = setInterval(scrolling, speed);
        if (!p) { o.scrollTop += 1; }
    }

    function scrolling() {
        if (o.scrollTop % lh != 0) {
            o.scrollTop += 1;
            if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);

}
//倒计时
function ShowCountDown(year, month, day, hour, minute) {
    var endDate = new Date(year, month - 1, day, hour, minute);
    var leftTime = endDate.getTime() - i; // ==============要修改
    var leftsecond = parseInt(leftTime / 1000);
    //var day1=parseInt(leftsecond/(24*60*60*6));
    //console.log(leftTime);
    var day1 = Math.floor(leftsecond / (60 * 60 * 24));
    var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
    var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
    var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
    if (day1 == 0 && hour == 0 && minute == 0 && second == 0) {
        console.log("倒计时结束");
        initActive();
        clearInterval(timeInter);
    }
}




function getDeviceInfo() {
    coocaaosapi.getDeviceInfo(function(message) {
        console.log("设备信息"+JSON.stringify(message));
        _mac = message.mac;
        _chip = message.chip;
        _model = message.model;
        if (message.emmcid ==""||message.emmcid==null) {
            _emmcCID = "123456";
        } else{
            _emmcCID = message.emmcid;
        }
        _udid = message.activeid;
        _version = message.version;
        _cVersion = message.version.replace(/\./g, "");
        _cSize = message.panel;
        _cSdk = message.androidsdk;
        _cBrand = message.brand;
        getTvSource(_mac, _chip, _model, _emmcCID, _udid, _cFMode, _cVersion, _cSize, _appversion, _cSdk, _cBrand);
    }, function(error) {
        console.log("获取设备信息出现异常。");
    });
}

//获取视频源
function getTvSource(smac, schip, smodel, semmcid, sudid, sFMode, sTcVersion, sSize, sAppVersion, sSdk, sBrand) {
    console.log(smac+"--"+schip+"--"+smodel+"--"+semmcid+"--"+sudid);
    console.log(sFMode+"--"+sTcVersion+"--"+sSize+"--"+sAppVersion+"--"+sSdk+"--"+sBrand);
    var ajaxTimeoutOne = $.ajax({
        type: "POST",
        async: true,
        timeout : 5000,
        dataType: 'json',
        url: _testurl + "/light/active/tv/source",
        data: {
            "MAC" : smac,
            "cChip" : schip,
            "cModel" : smodel,
            "cEmmcCID" : semmcid,
            "cUDID" : sudid,
            "cFMode" : sFMode,
            "cTcVersion" : sTcVersion,
            "cSize" : sSize,
            "cAppVersion" : sAppVersion,
            "cBrand":sBrand
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == 0){
            //    _qsource = data.data.source;
                console.log("========视频源========"+_qsource);
                if(_qsource == "tencent"){
                    needQQ = true;
                }
            }
        },
        error: function(error) {
            console.log('获取视频源失败'+JSON.stringify(error));
            needQQ = true
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
    　　　　    console.log("-------------complete------------------"+status);
            if(status=='timeout'){
     　　　　　  ajaxTimeoutOne.abort();
    　　　　    }
            console.log(needQQ);
            hasLogin(needQQ,0);
    　　  }
    });
}

//判断是否登录
function hasLogin(needQQ,area) {
    //area = 1不走初始化
    coocaaosapi.hasCoocaaUserLogin(function(message) {
        console.log(area+"======haslogin======== " + message.haslogin);
        _loginstatus = message.haslogin;
        if(_loginstatus == "false") {
            params = {
                "cUDID": _udid,
                "userKeyId": userKeyId,
                "thirdUserId": "",
                "cOpenId": _openId,
                "cModel": _model,
                "cChip": _chip,
                "MAC": _mac,
                "activeId":activeId
            };
            if(cAppVersion >= 3190030) {
                _tencentWay = "both";
            }else {
                _tencentWay = "qq";
            }
            _openId = "";
            _login_type = "";
            _vuserid = "";
            _user_flag = 0;
            _accessToken = "";
            face = "";
            if(area == 0){
                getActivityInfo();
            }
            $("#userName").html("未登录用户");
        } else {
            coocaaosapi.getUserInfo(function(message) {
                exterInfo = message.external_info;
                _openId = message.open_id;
                _nickName = message.nick_name;
                if(message.avatar == undefined){
                    face = qqinfo[0].face;
                }else{
                    face = message.avatar;

                }
                coocaaosapi.getUserAccessToken(function(message) {
                    _accessToken = message.accesstoken;
                    console.log("_accessToken==============="+_accessToken);
                    if(exterInfo == "[]") {
                        exterInfo = '[{}]';
                    } else {}
                    _user_flag = 1;
                    if(needQQ) {
                        qqinfo = JSON.parse(exterInfo);
                        if(qqinfo.length == 1) {
                            if(cAppVersion >= 3190030) {
                                if(JSON.stringify(qqinfo[0]) == "{}") {
                                    _tencentWay = "both";
                                } else {
                                    _tencentWay = qqinfo[0].external_flag;
                                }
                            } else {
                                _tencentWay = "qq";
                            }
                            if(qqinfo != "" && qqinfo != null && qqinfo[0].login) {
                                thirdUserId = qqinfo[0].external_id;
                                if(qqinfo[0].external_flag == "qq") {
                                    _login_type = 1;//QQ登录
                                } else {
                                    _login_type = 2;//微信登陆
                                    _vuserid = qqinfo[0].vuserid;
                                    if(_vuserid == undefined) {
                                        _vuserid = JSON.parse(qqinfo[0].refreshToken).vuserid
                                    }
                                    if(cAppVersion < 3190030) {
                                        _openId = "";
                                        _loginstatus = "false";
                                    }
                                }
                            } else {
                                _tencentWay = "both";
                                _openId = "";
                                _vuserid = "";
                                _login_type = "";
                                _loginstatus = "false";
                            }
                        } else {
                            var needSelectNum = 0;
                            for(var b = 0; b < qqinfo.length; b++) {
                                needSelectNum = needSelectNum + 1;
                                if(qqinfo[b].login && qqinfo[b].external_flag != "jscn") {
                                    thirdUserId = qqinfo[b].external_id;
                                    if(qqinfo[b].external_flag == "qq") {
                                        _login_type = 1;
                                    } else {
                                        _login_type = 2;
                                        _vuserid = qqinfo[b].vuserid;
                                        if(_vuserid == undefined) {
                                            _vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                        }
                                        if(cAppVersion < 3190030) {
                                            _openId = "";
                                            _loginstatus = "false";
                                            _vuserid = "";
                                            _login_type = "";
                                            _tencentWay = "qq";
                                        }
                                    }
                                    break;
                                }
                                if(needSelectNum == qqinfo.length) {
                                    _tencentWay = "both";
                                    _openId = "";
                                    _vuserid = "";
                                    _login_type = "";
                                    _loginstatus = "false";
                                }
                            }
                        }
                    } else {
                        qqinfo = JSON.parse(exterInfo);
                        for(var b = 0; b < qqinfo.length; b++) {
                            if(qqinfo[b].login) {
                                thirdUserId = qqinfo[b].external_id;
                                if(qqinfo[b].external_flag == "qq") {
                                    _login_type = 1;
                                } else if(qqinfo[b].external_flag == "weixin") {
                                    _login_type = 2;
                                    _vuserid = qqinfo[b].vuserid;
                                    if(_vuserid == undefined) {
                                        _vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                    }
                                }
                                break;
                            } else {
                                thirdUserId = "";
                                _vuserid = "";
                                _login_type = 0;
                            }
                        }
                    }
                    console.log("openId============"+_openId);
                    params = {
                        "activeId":activeId,
                        "cUDID": _udid,
                        "cOpenId": _openId,
                        "cModel": _model,
                        "cChip": _chip,
                        "MAC": _mac,
                        "cEmmcCID":_emmcCID,
                        "cNickName":_nickName,
                        "cAvatar":face 
                    };
                    console.log("_login_type-----------"+_login_type);
                    if(_openId != ""){
                        $("#userFace").show();
                        $("#userFace img").attr('src', face);
                        $("#userName").html(_nickName);
                    }
                    if(area == 0){
                        getActivityInfo();
                    }
                }, function(error) {
                    console.log(error);
                });
            }, function(error) {
                console.log(error);
            });

        }

    }, function(error) {
        console.log(error);
    });
}

//监听账户变化
function listenUserChange() {
    console.log("账户状态变化");
    coocaaosapi.addUserChanggedListener(function(message) {
        needSentUserLog2 = true;
    });
}

//启登录
function startLogin(needQQ) {
    if(needQQ) {
        if(accountVersion > 4030000) {
            if(_tencentWay == "qq") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_QQ", function(message) {
                    console.log(message);
                }, function(error) {
                    console.log(error);
                });
            } else if(_tencentWay == "weixin") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) {
                    console.log(message);
                }, function(error) {
                    console.log(error);
                });
            } else if(_tencentWay == "both") {
                coocaaosapi.startWeixinOrQQ2("TENCENT", function(message) {
                    console.log(message);
                }, function(error) {
                    console.log(error);
                });
            }
        } else {
            coocaaosapi.startThirdQQAccount(function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
        }
    } else {
        if(_version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
            coocaaosapi.startUserSettingAndFinish2(function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
        } else {
            coocaaosapi.startUserSettingAndFinish(function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
        }
    }
}

//绘制二维码
function drawQrcode(id, url, wh) {
	var qrcode = new QRCode(document.getElementById(id), {
		width: wh,
		height: wh,
		correctLevel: 3
	});
	qrcode.makeCode(url);
}


//数据埋点

function pageShowLog(logName,dateObj) {
    var _dataString = JSON.stringify(dateObj);
    coocaaosapi.notifyJSLogInfo(logName, _dataString, function(message) {
        console.log(message);
    }, function(error) {
        console.log(error);
    });
}
