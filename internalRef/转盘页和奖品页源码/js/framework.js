var _tencentWay = null;
var _user_flag = null;
var _login_type = null;
var _vuserid = null;
var _qqtoken = null;
var needQQ = false;
var clickFlag = true;

var _testurl = "https://restful.skysrt.com";
var enurl = "https://webapp.skysrt.com/national/address/index.html?";
var bigurl = "https://webapp.skysrt.com/national/address/index.html?";
var homeUrl = "https://webapp.skysrt.com/national/main/index.html";

var _version = null;
var _cVersion = null;
var _actionid = 55;
var _lotteryActiveId = 60;
var _lotteryActiveId2 = 57;
var _lotteryActiveId3 = 56;
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

var _userKeyId = "";
var _loginstatus = null;
var _remainCard = 0;

var _curFocus = null;
var _curCouponFocus = null;
var _curFocusIndex = 0;
var _curRotateId = 0;
var _cardArray = null;
var _curNumber = "";
var option1CardNum = ["15","7","3"];
var option1TopArr = ["410px","570px","730px"];
var option1TextArr = ["需点亮15张才可以开启哦~","需点亮7张才可以开启哦~","需点亮3张才可以开启哦~"];
var option1TextArr2 = ["点击按钮<br/>开始抽奖","点击按钮<br/>开始抽奖","点击按钮<br/>开始抽奖"];

var needSentUserLog = false;
var app = {
	canonical_uri: function(src, base_path) {
		var root_page = /^[^?#]*\//.exec(location.href)[0],
			root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
			absolute_regex = /^\w+\:\/\//;
		if(/^\/\/\/?/.test(src)) {
			src = location.protocol + src;
		} else if(!absolute_regex.test(src) && src.charAt(0) != "/") {
			src = (base_path || "") + src;
		}
		return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
	},
	rel_html_imgpath: function(iconurl) {
		return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
	},
	initialize: function() {
		this.bindEvents();
		var _part = getQueryString("part");
		var _source = getQueryString("source");
		if (_part == "draw") {
			$("#mainPage").css("display","block");
		} else if(_part == "award"){
			$("#myAwardPage").css("display","block");
		}
		if (_source == "main") {
			$("#gotohome").css("display","none");
		} else{
			$("#gotohome").css("display","block");
		}
		document.getElementsByClassName("boxInfo")[0].style.display = "block";
		document.getElementsByClassName("boxInfo")[1].style.display = "none";
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener('resume', this.onResume, false);
		document.addEventListener("pause", this.onPause, false);
	},
	handleBackButton: function() {
		console.log("lxw Back Button Pressed!");
	},
	onResume: function() {
		console.log("--------------------->Page onResume!");
		onResumeFunc();
	},
	onPause: function() {
		console.log("--------------------->Page onPause!");
	},
	onDeviceReady: function() {
		console.log("onDeviceReady");
		app.receivedEvent("deviceready");
		app.triggleButton();
	},
	receivedEvent: function(id) {
	},
	handleBackButtonDown: function() {
		backButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		_appversion = accountVersion;
		buttonInit();
		getDeviceInfo();
		listenUserChange();
	}
};

app.initialize();

function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log(JSON.stringify(message));
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
		_userKeyId = _udid;
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
		type: "GET",
		async: true,
		timeout : 15000,
		dataType: 'jsonp',
		jsonp: "callback",
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
                _qsource = data.data.source;
                console.log(_qsource);
                if(_qsource == "tencent"){
                    needQQ = true;
                }
            }
		},
		error: function() {
			console.log('获取视频源失败');
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
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		console.log("haslogin " + message.haslogin);
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			} else {
				_tencentWay = "qq";
			}
			_user_flag = 0;
			_accessToken = "";
		} else {
			coocaaosapi.getUserInfo(function(message) {
				exterInfo = message.external_info;
				_openId = message.open_id;
				_nickName = message.nick_name;
				coocaaosapi.getUserAccessToken(function(message) {
					_accessToken = message.accesstoken;
					console.log(_accessToken);
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
								_qqtoken = qqinfo[0].external_id;
								if(qqinfo[0].external_flag == "qq") {
									_login_type = 1;
								} else {
									_login_type = 2;
									_vuserid = qqinfo[0].vuserid;
									if(_vuserid == undefined) {
										_vuserid = JSON.parse(qqinfo[0].refreshToken).vuserid
									}
									if(cAppVersion < 3190030) {
										_loginstatus = "false";
									}
								}
							} else {
								_tencentWay = "both";
								_loginstatus = "false";
							}
						} else {
							var needSelectNum = 0;
							for(var b = 0; b < qqinfo.length; b++) {
								needSelectNum = needSelectNum + 1;
								if(qqinfo[b].login && qqinfo[b].external_flag != "jscn") {
									_qqtoken = qqinfo[b].external_id;
									if(qqinfo[b].external_flag == "qq") {
										_login_type = 1;
									} else {
										_login_type = 2;
										_vuserid = qqinfo[b].vuserid;
										if(_vuserid == undefined) {
											_vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
										}
										if(cAppVersion < 3190030) {
											_loginstatus = "false";
											_tencentWay = "qq";
										}
									}
									break;
								}
								if(needSelectNum == qqinfo.length) {
									_tencentWay = "both";
									_loginstatus = "false";
								}
							}
						}
					} else {
						qqinfo = JSON.parse(exterInfo);
						for(var b = 0; b < qqinfo.length; b++) {
							if(qqinfo[b].login) {
								_qqtoken = qqinfo[b].external_id;
								if(qqinfo[b].external_flag == "qq") {
									_login_type = 1;
								} else if(qqinfo[b].external_flag == "weixin") {
									_login_type = 2;
									vuserid = qqinfo[b].vuserid;
									if(vuserid == undefined) {
										vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
									}
								}
								break;
							} else {
								_qqtoken = "";
							}
						}
					}
				}, function(error) {
					console.log(error);
				})
				if (area == 1) {
					console.log(document.getElementById("couponAward").style.display);
					if (document.getElementById("couponAward").style.display == "block") {
						$("#couponAward").css("display","none");
						sendPrizesAgain();
					}
				}
			}, function(error) {
				console.log(error);
			});
		}
		if(area == 0){
			firstPageInit();
		}
	}, function(error) {
		console.log(error);
	});
}
//首页初始化
function firstPageInit(){
	var _part = getQueryString("part");
	console.log(_part);
	if (_part == "draw") {
		actionInit();
	} else if(_part == "award"){
		getMyAwards(0,1);//num1:0-不需要指定焦点  1-需要指定焦点;num2:0-不提交曝光数据  1-提交曝光数据
	}
}
//监听账户变化
function listenUserChange() {
	coocaaosapi.addUserChanggedListener(function(message) {
		needSentUserLog = true;
	});
}
//启登录
function startLogin(needQQ) {
	console.log("lxw " + _tencentWay);
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
function buttonInit() {
	$(".boxChoices").unbind("focus").bind("focus", function() {
		var _index = $(".boxChoices").index($(this));
		for (var i=0; i<$(".boxChoices").length;i++) {
			$(".boxInfo")[i].style.display = "none";
		}
		$(".boxInfo")[_index].style.display = "block";
		map = new coocaakeymap($(".coocaa_btn"), document.getElementsByClassName("boxChoices")[_index], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$(".drawbtn").unbind("focus").bind("focus", function() {
		var _index = $(".drawbtn").index($(this));
		console.log(_index);
		$('.rotates').siblings().css('display', 'none');
		$(".rotates:eq("+_index+")").css("display","block");
		$('.turnborder').siblings().css('display', 'none');
		$(".turnborder:eq("+_index+")").css("display","block");
		$('.drawbutton').siblings().css('display', 'none');
		$(".drawbutton:eq("+_index+")").css("display","block");
		$("#drawbutton").css("display","block");
		console.log(option1CardNum[_index]+"-------"+ _remainCard);
		if (option1CardNum[_index]<=_remainCard) {
			document.getElementById("option1").innerHTML = option1TextArr2[_index];
		} else{
			document.getElementById("option1").innerHTML = option1TextArr[_index];
		}
		$("#option1").css("top",option1TopArr[_index]);
	});
	$(".drawbtn").unbind("itemClick").bind("itemClick", function() {
		var _index = $(".drawbtn").index($(this));
		_curRotateId = _index;
		var nowTime = new Date().getTime();
	    var clickTime = $(this).attr("ctime");
	    if( clickTime != 'undefined' && (nowTime - clickTime < 3000)){
	        console.log('操作过于频繁，稍后再试');
	        return false;
	    }else{
	        $(this).attr("ctime",nowTime);
	        console.log(_index+"--"+_remainCard);
	        showDrawDialog(_index,_remainCard);
			$("#dialogPage").css("display","block");
			map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	    	sendDrawButtonsLog(_index,_remainCard);
	    }
	});
	$("#iknow").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了确定，开始抽奖"+clickFlag);
		if(clickFlag){
			clickFlag = false;
			$("#ensure").css("display","none");
			$("#dialogPage").css("display","none");
			setTimeout(startLottery,500);
			setTimeout(resetClickFlag,3000);
		}else{
			console.log("别着急啊...");
		}
	});
	$("#wait").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了一会看看，结束抽奖");
		$("#ensure").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocus), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#wait2").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了一会看看，结束抽奖");
		$("#noChance").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocus), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#getCard").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了去拿景点卡");
		pageExit();
	});
	$("#getBigQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了二维码，结束抽奖");
		$("#getBigRed").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocus), "btn-focus", function() {}, function(val) {}, function(obj) {});
		dialogBtnClick(0,1);
	});
	$("#gotoMyAwards").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了我的礼包，跳转礼包");
		$("#enOrRedAward").css("display","none");
		$("#dialogPage").css("display","none");
		$("#mainPage").css("display","none");
		$("#myAwardPage").css("display","block");
		getMyAwards(0,1);//num1:0-不需要指定焦点  1-需要指定焦点;num2:0-不提交曝光数据  1-提交曝光数据
		
		var _type = $("#gotoMyAwards").attr("otype");
		if (_type == 2) {
			dialogBtnClick(0,4);
		}else{
			dialogBtnClick(0,0);
		}
	});
	$("#wait3").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了一会看看，结束抽奖");
		$("#enOrRedAward").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocus), "btn-focus", function() {}, function(val) {}, function(obj) {});
		
		var _type = $("#gotoMyAwards").attr("otype");
		if (_type == 2) {
			dialogBtnClick(1,4);
		}else{
			dialogBtnClick(1,0);
		}
	});
	$("#noCardsBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了参与活动，页面退出。");
		pageExit();
	});
	$("#noAwardBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了我要礼包，页面退出。");
		navigator.app.exitApp();
	});
	$("#wxQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了微信红包二维码，退掉当前页面");
		$("#myWxRed").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("myAwards")[_curFocusIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#wxAgain").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了继续参与，退掉当前页面");
		var _lsource = getQueryString("source");
		console.log(_lsource);
		if (_lsource=="main") {
			navigator.app.exitApp();
		} else{
			coocaaosapi.startNewBrowser2(homeUrl,function(message) {navigator.app.exitApp();},function(error) { console.log(error);});
		}
	});
	$("#bigWinner").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了高额现金奖的确定键，退掉当前页面");
		$("#myBigRed").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("myAwards")[_curFocusIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#bigQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了高额现金奖二维码，退掉当前页面");
		$("#myBigRed").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("myAwards")[_curFocusIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#enWinner").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了实体奖的确定键，退掉当前页面");
		$("#myEntity").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("myAwards")[_curFocusIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#enQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了实体奖二维码，退掉当前页面");
		$("#myEntity").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("myAwards")[_curFocusIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#gotohome").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了点亮城市，去活动主页面");
		coocaaosapi.startNewBrowser2(homeUrl,function(message) {navigator.app.exitApp();},function(error) { console.log(error);});
		sendDrawButtonsLog(3,_remainCard);
	});
	$("#toastbtn1").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了去抽奖，去活动主页面");
		$("#toast4").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("drawBtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#toastbtn2").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了一会看看，回抽奖页面");
		$("#toast4").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("drawBtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#notbegin").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了去活动主页面，去活动主页面");
		coocaaosapi.startNewBrowser2(homeUrl,function(message) {navigator.app.exitApp();},function(error) { console.log(error);});
	});
	$("#hasend").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了活动已结束，退出");
		navigator.app.exitApp();
	});
	$("#couponLogin").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了登录领取，退出"+needQQ);
		dialogBtnClick(3,3);
		var _dateObj = {
			"page_name": "nalm_lottery_activity_page"
		}
		pageShowLog("nalm_account_landing_page_exposure",_dateObj);
		startLogin(needQQ);
	});
	$("#couponUse").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了立即使用");
		dialogBtnClick(2,3);
		var cpackageName = $("#couponUse").attr("packageName");
        var cbyvalue = $("#couponUse").attr("byvalue");
        var cbywhat = $("#couponUse").attr("bywhat");
        var csources = $("#couponUse").attr("sources");
        console.log(cbywhat+"--"+cbyvalue+"--"+csources+"--"+cpackageName);
		coocaaosapi.startParamAction2(cbywhat,cbyvalue,csources,function(message) {}, function(error) {console.log("判断失败"+error);});
	});
	$("#couponFailBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了重新领取");
		$("#dialogPage").css("display","none");
		$("#couponFail").css("display","none");
		dialogBtnClick(4,3);
		sendPrizesAgain();
	});
	$("#checkCards").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了查看景点卡");
		$("#cardsAward").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("myCardBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		$("#myCardBox").trigger("focus");
		dialogBtnClick(0,6);
	});
	$("#wait4").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了景点卡弹窗的再看看");
		$("#cardsAward").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("drawBtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		dialogBtnClick(1,6);
	});
	$("#gotoMyAwards2").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了查看我的奖品");
		$("#thirdAward").css("display","none");
		$("#dialogPage").css("display","none");
		$("#mainPage").css("display","none");
		$("#myAwardPage").css("display","block");
		getMyAwards(0,1);//num1:0-不需要指定焦点  1-需要指定焦点;num2:0-不提交曝光数据  1-提交曝光数据
		dialogBtnClick(0,5);
	});
	$("#wait5").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了第三方优惠券的再看看");
		$("#thirdAward").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("drawBtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		dialogBtnClick(1,5);
	});
}
function resetClickFlag(){
	clickFlag = true;
}
function buttonInitAfter(){
	console.log("--------------------------0");
	$(".mycards").unbind("focus").bind("focus", function() {
		var _FocusIndex = $(".mycards").index($(this));
		var _times = Math.floor(parseInt(_FocusIndex)/5);
		var _eachheight = $(".mycards")[0].offsetHeight+20;
		console.log(_times+"---"+_eachheight);
		var myScrollTopValue = 0;
		myScrollTopValue = _times * _eachheight;
		$("#myawardsBox").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing"});
	});
	$(".myAwards").unbind("focus").bind("focus", function() {
		console.log("in myAwards");
		var _index1 = $(".myAwards").index($(this));//btn是第几个
		var _index2 = $(".awardTabs").index($(this).parent());//btn所在的盒子是第几个
		console.log(_index1+"--"+_index2);
		var nameHeight = $(".awardTabName")[0].offsetHeight;
		var boxHeight = 0;
		var top1 = $(this).position().top;
		var myScrollTopValue = 0;
		if (_index2 == 0) {
			boxHeight = 0;
		}else if(_index2 == 1){
			boxHeight = $(".awardTabs")[0].offsetHeight;
		}else if(_index2 == 2){
			boxHeight = $(".awardTabs")[0].offsetHeight+$(".awardTabs")[1].offsetHeight;
		}
		console.log(top1+"----"+nameHeight);
		if (top1 == nameHeight) {
			myScrollTopValue = boxHeight;
		} else{
			myScrollTopValue = boxHeight+top1;
		}
		$("#myAwardBox").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing"});
	});
	$(".myAwards").unbind("itemClick").bind("itemClick", function() {
		var _index = $(".myAwards").index($(this));
		_curFocusIndex = _index;
		
		var _otype = $(this).attr("awardType");
		var _ostate = $(this).attr("state");
		var _oawardName = $(this).attr("awardName");
		var _oawardUrl = $(this).attr("imgurl");
		var _oawardTime = $(this).attr("awardTime");
		var _oawardId = $(this).attr("awardId");
		var _oactiveId = $(this).attr("lotteryActiveId");
		var _orememberId = $(this).attr("rememberId");
		var _ouserkeyid = $(this).attr("userkeyId");
		var _oawardAddress = $(this).attr("awardAddress");
		var _ouserPhone = $(this).attr("userPhone");
		var _ouserName = $(this).attr("userName");
		var _ocurId = $(this).attr("id");
		var _oredUser = $(this).attr("redUser");
		var _oredPhone = $(this).attr("redPhone");
		
		var _oawardAddress = $(this).attr("awardAddress");
		var _ouserPhone = $(this).attr("userPhone");
		var _ouserName = $(this).attr("userName");
		var _ocurId = $(this).attr("id");
		var _opackageName = $(this).attr("packageName");
		var _obyvalue = $(this).attr("byvalue");
		var _obywhat = $(this).attr("bywhat");
		var _osources = $(this).attr("sources");
		showAwardDialog(_otype,_ostate,_oawardName,_oawardUrl,_oawardTime,_orememberId,_ouserkeyid,_oawardAddress,_ouserPhone,_ouserName,_oawardId,_oactiveId,_ocurId,_opackageName,_obyvalue,_obywhat,_osources,_oredUser,_oredPhone);
	});
}
function actionInit(){
    var _dateObj = {
		"page_name": "",
		"activity_status": "",
		"login_status": 0
	}
    console.log(_loginstatus);
    if (_loginstatus == "true") {
    	_dateObj.login_status = "1";
    }
    console.log(_dateObj.login_status);
	$.ajax({
        type: "GET",
        async: true,
        url: _testurl + "/light/active/"+_actionid+"/init",
        data: {
        	id:_actionid, 
        	MAC:_mac,
        	cChip:_chip,
        	cModel:_model,
        	cEmmcCID:_emmcCID,
        	cUDID:_userKeyId,
        	initType:"all"
        },
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data) {
            console.log(JSON.stringify(data));
            if (data.code == 50100) {
            	$("#myDrawBox").css("display","block");
            	$("#myCardBox").css("display","block");
            	$("#actionstart").css("display","block");
            	_remainCard = data.data.userLightCity.lightNumber;
				document.getElementById("cardnumber").innerHTML = "("+_remainCard+"张)";
				document.getElementById("option2").innerHTML = "目前已点亮"+_remainCard+"张景点卡，";
				if (_remainCard == 0) {
					console.log("没有景点卡");
					$("#noCardsBox").css("display","block");
					$("#myawardsBox").css("display","none");
				} else{
					console.log("有景点卡");
					$("#myawardsBox").css("display","block");
					$("#noCardsBox").css("display","none");
					document.getElementById("myawardsBox").innerHTML = "";
					_cardArray = data.data.userLightCity.cityInfo;
					_curNumber = 0;
					setTimeout(makeMyCard,1000);
				}
				showHomeBtn(_remainCard);
				giveCard = data.data.lightByDay;
                if(giveCard.lightNumber > 0){
                    needShowWindow = true;
                    console.log("第五天，发放景点卡，弹窗提示");
                    $("#dialogPage").css("display","block");
                    $("#toast4").css("display","block");
                    document.getElementById("nowhave").innerHTML = giveCard.lightNumber;
                	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
                }else{
					map = new coocaakeymap($(".coocaa_btn"), document.getElementById("drawBtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
					$("#drawBtn1").trigger("focus");
                }
                
                _dateObj.activity_status = "1";
                var _source = getQueryString("source");
				if (_source == "operation") {
					console.log("抽奖独立web页面曝光");
					_dateObj.page_name = "nalm_lottery2_activity_page";
				} else{
					console.log("抽奖web页面曝光");
					_dateObj.page_name = "nalm_lottery_activity_page";
				}
				pageShowLog("web_page_show_new",_dateObj);
            } else if(data.code == 50002){
            	console.log("活动未开始");
                $("#myDrawBox").css("display","block");
            	$("#myCardBox").css("display","block");
            	$("#notbegin").css("display","block");
            	$("#noCardsBox").css("display","block");
				$("#myawardsBox").css("display","none");
				map = new coocaakeymap($(".coocaa_btn"), document.getElementById("gotomain"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            	
            	_dateObj.activity_status = "0";
                var _source = getQueryString("source");
				if (_source == "operation") {
					console.log("抽奖独立web页面曝光");
					_dateObj.page_name = "nalm_lottery2_activity_page";
				} else{
					console.log("抽奖web页面曝光");
					_dateObj.page_name = "nalm_lottery_activity_page";
				}
				pageShowLog("web_page_show_new",_dateObj);
            }else{
            	console.log("活动已结束");
            	$("#hasend").css("display","block");
            	map = new coocaakeymap($(".coocaa_btn"), document.getElementById("hasend"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            	
            	_dateObj.activity_status = "2";
                var _source = getQueryString("source");
				if (_source == "operation") {
					console.log("抽奖独立web页面曝光");
					_dateObj.page_name = "nalm_lottery2_activity_page";
				} else{
					console.log("抽奖web页面曝光");
					_dateObj.page_name = "nalm_lottery_activity_page";
				}
				pageShowLog("web_page_show_new",_dateObj);
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
            $("#hasend").css("display","block");
            map = new coocaakeymap($(".coocaa_btn"), document.getElementById("hasend"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        },
		complete: function(XMLHttpRequest, status) {
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}
		}
    });
}
function makeMyCard(){
	var _arr = new Array();
	var _obj = _cardArray;
	Object.keys(_obj).forEach(function(key){
		var objItem = {
			"name": key,
			"number": _obj[key]
		}
		_arr.push(objItem);
	});
	showMyCard(_arr);
}
//根据景点卡个数显示解锁的按钮
function showHomeBtn(num){
	if (num>=15) {
		$("#drawBtn1bg1").attr("src","images/draw/buttons/button110.png");
		$("#drawBtn2bg1").attr("src","images/draw/buttons/button210.png");
		$("#drawBtn3bg1").attr("src","images/draw/buttons/button310.png");
		$("#drawBtn1bg2").attr("src","images/draw/buttons/button111.png");
		$("#drawBtn2bg2").attr("src","images/draw/buttons/button211.png");
		$("#drawBtn3bg2").attr("src","images/draw/buttons/button311.png");
		document.getElementById("option3").innerHTML = "可抽10000元现金！";
	} else if(num>=7){
		$("#drawBtn1bg1").attr("src","images/draw/buttons/button100.png");
		$("#drawBtn2bg1").attr("src","images/draw/buttons/button210.png");
		$("#drawBtn3bg1").attr("src","images/draw/buttons/button310.png");
		$("#drawBtn1bg2").attr("src","images/draw/buttons/button101.png");
		$("#drawBtn2bg2").attr("src","images/draw/buttons/button211.png");
		$("#drawBtn3bg2").attr("src","images/draw/buttons/button311.png");
		document.getElementById("option3").innerHTML = "可抽5000元现金！";
	} else if(num>=3){
		$("#drawBtn1bg1").attr("src","images/draw/buttons/button100.png");
		$("#drawBtn2bg1").attr("src","images/draw/buttons/button200.png");
		$("#drawBtn3bg1").attr("src","images/draw/buttons/button310.png");
		$("#drawBtn1bg2").attr("src","images/draw/buttons/button101.png");
		$("#drawBtn2bg2").attr("src","images/draw/buttons/button201.png");
		$("#drawBtn3bg2").attr("src","images/draw/buttons/button311.png");
		document.getElementById("option3").innerHTML = "可抽1000元现金！";
	} else{
		$("#drawBtn1bg1").attr("src","images/draw/buttons/button100.png");
		$("#drawBtn2bg1").attr("src","images/draw/buttons/button200.png");
		$("#drawBtn3bg1").attr("src","images/draw/buttons/button300.png");
		$("#drawBtn1bg2").attr("src","images/draw/buttons/button101.png");
		$("#drawBtn2bg2").attr("src","images/draw/buttons/button201.png");
		$("#drawBtn3bg2").attr("src","images/draw/buttons/button301.png");
		document.getElementById("option3").innerHTML = "还未能解锁抽奖哦~";
	}
}
//我的景点卡
function getMyCards(){
	console.log("获取我的景点卡");
	var ajaxTimeoutTwo = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/light/u/"+_actionid+"/city",
		data: {
			"id":_actionid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID":_emmcCID,
			"cUDID":_userKeyId,
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				_remainCard = data.data.lightNumber;
				document.getElementById("cardnumber").innerHTML = "("+_remainCard+"张)";
				document.getElementById("option2").innerHTML = "目前已点亮"+_remainCard+"张景点卡，";
				console.log(_remainCard);
				if (_remainCard == 0) {
					console.log("没有景点卡");
					$("#noCardsBox").css("display","block");
					$("#myawardsBox").css("display","none");
				} else{
					console.log("有景点卡");
					$("#myawardsBox").css("display","block");
					$("#noCardsBox").css("display","none");
					document.getElementById("myawardsBox").innerHTML = "";
					_cardArray = data.data.cityInfo;
					//_curNumber = num;
					setTimeout(makeMyCard,1000);
				}
				showHomeBtn(_remainCard);
			} else {
				console.log("接口出现异常");
			}
		},
		error: function() {
			console.log("接口出现异常");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}
		}
	});
}
function showMyCard(arr){
	console.log(arr);
	for (var i = 0; i < arr.length; i++) {
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute('id', 'card'+i);
        cardDiv.setAttribute('class', 'mycards coocaa_btn');
        var _curCardId = cardDiv.getAttribute("id");
        $("#myawardsBox").append(cardDiv);
        var _curimg = "http://sky.fs.skysrt.com/statics/webvip/webapp/national/mycardnew/"+arr[i].name+".jpg";
        if (arr[i].number == 1) {
        	document.getElementById(_curCardId).innerHTML = '<img class="cardimg" src="'+_curimg+'"/>';
        } else{
        	document.getElementById(_curCardId).innerHTML = '<img class="cardimg" src="'+_curimg+'"/><div class="numbox"></div><div class="numtitle">'+arr[i].number+'</div>';
        }
        if (i<5) {
        	var curBtnId = "#card"+ i;
        	var toBtnId = "#myCardBox";
        	$(curBtnId).attr("upTarget",toBtnId);
        }else{
        	var curBtnId = "#card"+ i;
        	var toBtnId = "#card"+(i-5);
        	$(curBtnId).attr("upTarget",toBtnId);
        }
    }
	var lastid = "#card"+ (arr.length-1);
	$(lastid).attr("rightTarget",lastid);
	buttonInitAfter();
}
//我的奖品   num1:0-不需要指定焦点  1-需要指定焦点;num2:0-不提交曝光数据  1-提交曝光数据
function getMyAwards(num1,num2){
	console.log(_actionid+"---"+_mac+"----"+_chip+"---"+_model+"----"+_userKeyId+"--"+_emmcCID);
	var ajaxTimeoutTwo = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/light/u/"+_actionid+"/award",
		data: {
			"MAC": _mac,
			"cEmmcCID":_emmcCID,
			"cUDID":_userKeyId
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			if(data.code == "50100") {
				if(data.data.length == 0){
					console.log("没有奖品");
					$("#noAwardBox").css("display","block");
					map = new coocaakeymap($(".coocaa_btn4"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				}else{
					console.log("有奖品");
					document.getElementById("redTabs").innerHTML = '';
					document.getElementById("entityTabs").innerHTML = '';
					document.getElementById("couponTabs").innerHTML = '';
					$("#myAwardBox").css("display","block");
					
					var _arr1 = new Array();
					var _arr2 = new Array();
					var _arr3 = new Array();
					for (var i=0;i<data.data.length;i++) {
						var _time = data.data[i].awardTime;
						_time = _time.substr(0, 10);
						var objItem={
							"awardName" :  data.data[i].awardName,
							"awardTime" :  _time,
							"awardType" : data.data[i].awardTypeId,
							"imgurl" : data.data[i].awardUrl,
							"state" : data.data[i].awardExchangeFlag,
							"userkeyId" : data.data[i].userKeyId,
							"awardId" : data.data[i].awardId,
							"rememberId" : data.data[i].lotteryRememberId,
							"lotteryActiveId" : data.data[i].lotteryActiveId,
						}
						if (data.data[i].awardTypeId == "7") {
							objItem.redNumber = JSON.parse(data.data[i].awardInfo).bonus;
							_arr1.push(objItem);
						}else if(data.data[i].awardTypeId == "15"){
							console.log(JSON.stringify(data.data[i]));
							objItem.redNumber = JSON.parse(data.data[i].awardInfo).bonus;
							if (data.data[i].awardExchangeFlag == 1) {
								objItem.redUser = data.data[i].addressEntity.userName;
								objItem.redPhone = data.data[i].addressEntity.userPhone;
							}
							_arr1.push(objItem);
						}else if (data.data[i].awardTypeId == "2") {
							if (data.data[i].awardExchangeFlag == 1) {
								if (data.data[i].addressEntity.province == data.data[i].addressEntity.city) {
									objItem.awardAddress = data.data[i].addressEntity.city+data.data[i].addressEntity.area+data.data[i].addressEntity.address;
								} else{
									objItem.awardAddress = data.data[i].addressEntity.province+data.data[i].addressEntity.city+data.data[i].addressEntity.area+data.data[i].addressEntity.address;
								}
								objItem.userPhone = data.data[i].addressEntity.userPhone;
								objItem.userName = data.data[i].addressEntity.userName;
							}
							_arr2.push(objItem);
						} else if (data.data[i].awardTypeId == "5") {
							console.log(JSON.stringify(data.data[i]));
							console.log(JSON.parse(data.data[i].awardInfo).couponDetail);
							var _awardInfo = JSON.parse(data.data[i].awardInfo);
							var couponDetail = _awardInfo.couponDetail;
							console.log(couponDetail);
	                        if(couponDetail == 1){//已配置
		                        var data_a = _awardInfo.onclickData;
		                        var packageName = JSON.parse(data_a).packageName;
		                        var byvalue = JSON.parse(data_a).byvalue;
		                        var bywhat = JSON.parse(data_a).bywhat;
		                        var obj = JSON.parse(data_a).param;
		                        var sources = new Array();
		                        for(var key in obj){
		                            var px = {};
		                            px[key] = obj[key];
		                            sources.push(px);
		                        }
		                        sources = JSON.stringify(sources);
		                        console.log(packageName+"--"+byvalue+"--"+bywhat+"--"+sources);
		                        objItem.packageName = packageName;
		                        objItem.byvalue = byvalue;
		                        objItem.bywhat = bywhat;
		                        objItem.sources = sources;
	                        }else{
	                        	console.log("未配置");
	                        }
							_arr3.push(objItem);
						}else if (data.data[i].awardTypeId == "4") {
							console.log(JSON.stringify(data.data[i]));
							_arr3.push(objItem);
						} 
					}
					showMyAward(_arr1,_arr2,_arr3,num1);
				}
			} else {
				console.log("没有奖品");
				$("#noAwardBox").css("display","block");
				map = new coocaakeymap($(".coocaa_btn4"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		},
		error: function() {
			console.log("接口出现异常");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}
			if (num2 == 1) {
				var _dateObj = {
					"page_name": "nalm_my_award_page",
					"activity_status": "1",
					"login_status": 0
				}
			    if (_loginstatus == "true") {
			    	_dateObj.login_status = "1";
			    }
			    var _source = getQueryString("source");
				if (_source == "main") {
					console.log(getQueryString("status"));
					_dateObj.activity_status = getQueryString("status");
				}
				pageShowLog("web_page_show_new",_dateObj);
			}
		}
	});
}
//生成我的奖品
function showMyAward(arr1,arr2,arr3,num){
	console.log("----------------->" + num);
	$("#myAwardBox").css("display","block");
	if (arr1.length != 0) {
		$("#redBox").css("display","inline-block");
		for (var i = 0; i < arr1.length; i++) {
			var redDiv = document.createElement("div");
	        redDiv.setAttribute('id', 'red'+i);
	        redDiv.setAttribute('state', arr1[i].state);
	        redDiv.setAttribute('awardName', arr1[i].awardName);
	        redDiv.setAttribute('awardTime', arr1[i].awardTime);
	        redDiv.setAttribute('awardType', arr1[i].awardType);
	        redDiv.setAttribute('rememberId', arr1[i].rememberId);
	        redDiv.setAttribute('userkeyId', arr1[i].userkeyId);
	        redDiv.setAttribute('awardId', arr1[i].awardId);
	        redDiv.setAttribute('lotteryActiveId', arr1[i].lotteryActiveId);
	        redDiv.setAttribute('redNumber', arr1[i].redNumber);
	        redDiv.setAttribute('class', 'myAwards coocaa_btn4');
	        if (arr1[i].state == 0) {
	        	if (arr1[i].redNumber == 1000) {
	        		redDiv.innerHTML = '<img class="myAwardImg" src="images/award/red11.png"/>';
	        	} else if(arr1[i].redNumber == 5000){
	        		redDiv.innerHTML = '<img class="myAwardImg" src="images/award/red12.png"/>';
	        	} else if(arr1[i].redNumber == 10000){
	        		redDiv.innerHTML = '<img class="myAwardImg" src="images/award/red13.png"/>';
	        	} else{
	        		redDiv.innerHTML = '<img class="myAwardImg" src="images/award/red10.png"/>';
	        	}
	        } else{
	        	redDiv.setAttribute('redUser', arr1[i].redUser);
	        	redDiv.setAttribute('redPhone', arr1[i].redPhone);
	        	redDiv.innerHTML = '<img class="myAwardImg" src="images/award/red2.png"/><div class="rednumber">'+arr1[i].redNumber+'</div>';
	        }
	        $("#redTabs").append(redDiv);
	        var curBtnId = "#red"+ i;
	       	var toBtnId = "";
	        if (Math.floor(i/6)*6+6<arr1.length&&(i+6)>=arr1.length) {
	        	toBtnId = "#red"+ (arr1.length-1);
	        } else if(Math.floor(i/6)*6+6>=arr1.length){
	        	if (arr2.length != 0) {
	        		toBtnId = "#entity0";
	        	} else{
	        		if (arr3.length != 0) {
		        		toBtnId = "#coupon0";
		        	} else{
		        		toBtnId = curBtnId;
		        	}
	        	}
	        }
	        $(curBtnId).attr("downTarget",toBtnId);
        }
		var lastid = "#red"+ (arr1.length-1);
		$(lastid).attr("rightTarget",lastid);
	}
	if (arr2.length != 0) {
		$("#entityBox").css("display","inline-block");
		for (var i = 0; i < arr2.length; i++) {
			var entityDiv = document.createElement("div");
	        entityDiv.setAttribute('id', 'entity'+i);
	        entityDiv.setAttribute('state', arr2[i].state);
	        entityDiv.setAttribute('awardName', arr2[i].awardName);
	        entityDiv.setAttribute('awardTime', arr2[i].awardTime);
	        entityDiv.setAttribute('awardType', arr2[i].awardType);
	        entityDiv.setAttribute('rememberId', arr2[i].rememberId);
	        entityDiv.setAttribute('userkeyId', arr2[i].userkeyId);
	        entityDiv.setAttribute('awardId', arr2[i].awardId);
	        entityDiv.setAttribute('lotteryActiveId', arr2[i].lotteryActiveId);
	        entityDiv.setAttribute('awardAddress', arr2[i].awardAddress);
	        entityDiv.setAttribute('userPhone', arr2[i].userPhone);
	        entityDiv.setAttribute('userName', arr2[i].userName);
	        entityDiv.setAttribute('imgurl', arr2[i].imgurl);
	        entityDiv.setAttribute('class', 'myAwards coocaa_btn4');
	       	if (arr2[i].state == 0) {
	        	entityDiv.innerHTML = '<img class="myAwardImg" src="images/award/entity.png"/><div class="myAwardbtn"><img class="btnbgblur" src="images/award/entity0blur.png"/><img class="btnbgfocus" src="images/award/entity0focus.png"/></div><img class="myAwardImg2" src="'+arr2[i].imgurl+'"/>';
	       	} else{
	        	entityDiv.innerHTML = '<img class="myAwardImg" src="images/award/entity.png"/><div class="myAwardbtn"><img class="btnbgblur" src="images/award/entity1blur.png"/><img class="btnbgfocus" src="images/award/entity1focus.png"/></div><img class="myAwardImg2" src="'+arr2[i].imgurl+'"/>';
	       	}
	       	
	        $("#entityTabs").append(entityDiv);
	        if (i<6) {
	        	var curBtnId = "#entity"+ i;
	        	var toBtnId = "";
	        	if (arr1.length != 0) {
	        		toBtnId = "#red" + Math.floor(arr1.length/6)*6;
	        	}else{
	        		toBtnId = curBtnId;
	        	}
	        	$(curBtnId).attr("upTarget",toBtnId);
	        }
	        
	        var curBtnId2 = "#entity"+ i;
	       	var toBtnId2 = "";
	        if (Math.floor(i/6)*6+6<arr2.length&&(i+6)>=arr2.length) {
	        	toBtnId2 = "#entity"+ (arr2.length-1);
	        } else if(Math.floor(i/6)*6+6>=arr2.length){
        		if (arr3.length != 0) {
	        		toBtnId2 = "#coupon0";
	        	} else{
	        		toBtnId2 = curBtnId2;
	        	}
	        }
	        $(curBtnId2).attr("downTarget",toBtnId2);
        }
		var lastid = "#entity"+ (arr2.length-1);
		$(lastid).attr("rightTarget",lastid);
	}
	if (arr3.length != 0) {
		$("#couponBox").css("display","inline-block");
		for (var i = 0; i < arr3.length; i++) {
			var couponDiv = document.createElement("div");
			if (arr3[i].awardType == 5) {
		        couponDiv.setAttribute('packageName', arr3[i].packageName);
		        couponDiv.setAttribute('byvalue', arr3[i].byvalue);
		        couponDiv.setAttribute('bywhat', arr3[i].bywhat);
		        couponDiv.setAttribute('sources', arr3[i].sources);
			}
			couponDiv.setAttribute('awardName', arr3[i].awardName);
	        couponDiv.setAttribute('awardTime', arr3[i].awardTime);
	        couponDiv.setAttribute('userkeyId', arr3[i].userkeyId);
	        couponDiv.setAttribute('awardId', arr3[i].awardId);
	        couponDiv.setAttribute('rememberId', arr3[i].rememberId);
			couponDiv.setAttribute('id', 'coupon'+i);
		    couponDiv.setAttribute('state', arr3[i].state);
			couponDiv.setAttribute('awardType', arr3[i].awardType);
	        couponDiv.setAttribute('imgurl', arr3[i].imgurl);
	        couponDiv.setAttribute('lotteryActiveId', arr3[i].lotteryActiveId);
	        couponDiv.setAttribute('class', 'myAwards myAwards2 coocaa_btn4');
	        if (arr3[i].state == 0) {
	        	couponDiv.innerHTML = '<img class="myAwardImg" src="images/award/coupon.png"/><div class="myAwardbtn2"><img class="btnbgblur" src="images/award/coupon0blur.png"/><img class="btnbgfocus" src="images/award/coupon0focus.png"/></div><img class="myAwardImg3" src="'+arr3[i].imgurl+'"/>';
	        } else{
	        	if(arr3[i].awardType == 4){
	        		couponDiv.innerHTML = '<img class="myAwardImg" src="images/award/coupon.png"/><div class="myAwardbtn2"><img class="btnbgblur" src="images/award/coupon1blur.png"/><img class="btnbgfocus" src="images/award/coupon1focus.png"/></div><img class="myAwardImg3" src="images/award/third0.png"/>';
	        	}else{
	        		couponDiv.innerHTML = '<img class="myAwardImg" src="images/award/coupon.png"/><div class="myAwardbtn2"><img class="btnbgblur" src="images/award/coupon1blur.png"/><img class="btnbgfocus" src="images/award/coupon1focus.png"/></div><img class="myAwardImg3" src="'+arr3[i].imgurl+'"/>';
	        	}
	        }
	        
	        $("#couponTabs").append(couponDiv);
	        if (i<6) {
	        	var curBtnId = "#coupon"+ i;
	        	var toBtnId = "";
	        	if (arr2.length != 0) {
	        		toBtnId = "#entity" + Math.floor(arr2.length/6)*6;
	        	}else{
	        		if (arr1.length != 0) {
	        			toBtnId = "#red" + Math.floor(arr1.length/6)*6;
		        	}else{
		        		toBtnId = curBtnId;
		        	}
	        	}
	        	$(curBtnId).attr("upTarget",toBtnId);
	        }
	        var curBtnId2 = "#coupon"+ i;
	       	var toBtnId2 = "";
	        if (Math.floor(i/6)*6+6<arr3.length&&(i+6)>=arr3.length) {
	        	toBtnId2 = "#coupon"+ (arr3.length-1);
	        } else if(Math.floor(i/6)*6+6>=arr3.length){
	        	toBtnId2 = curBtnId2;
	        }
	        $(curBtnId2).attr("downTarget",toBtnId2);
        }
		var lastid = "#coupon"+ (arr3.length-1);
		$(lastid).attr("rightTarget",lastid);
	}
	console.log(num);
	if (num == 0) {
		map = new coocaakeymap($(".coocaa_btn4"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else if(num== 1){
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("myAwards")[_curFocusIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	}
	buttonInitAfter();
}

//抽奖资格判断
function showDrawDialog(index,num){
	if (index == 0) {
		_curFocus = "drawBtn1";
		_lotteryType = "lottery15";
		if (num<15) {
			$("#noChance").css("display","block");
		} else{
			document.getElementById("ensureInfo").innerHTML = "15";
			$("#ensure").css("display","block");
		}
	}else if(index == 1){
		_curFocus = "drawBtn2";
		_lotteryType = "lottery7";
		if (num<7) {
			$("#noChance").css("display","block");
		} else{
			document.getElementById("ensureInfo").innerHTML = "7";
			$("#ensure").css("display","block");
		}
	}else if(index ==2){
		_curFocus = "drawBtn3";
		_lotteryType = "lottery3";
		if (num<3) {
			$("#noChance").css("display","block");
		} else{
			document.getElementById("ensureInfo").innerHTML = "3";
			$("#ensure").css("display","block");
		}
	}
}
//开始抽奖
function startLottery() {
	console.log("开始抽奖");
	var rotateBtn = ["#rotate","#rotate2","#rotate3"];
	var rotateId = [_lotteryActiveId,_lotteryActiveId2,_lotteryActiveId3];
	var rotateTimeOut = function() {
		$('#rotate').rotate({
			angle: 0,
			animateTo: 2160,
			duration: 8000,
			callback: function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	var bRotate = false;
	var rotateFn = function(obj, angles, type, name, imgurl, activeId, awardId, rememberId, userKeyId) {
		bRotate = !bRotate;
		$(obj).stopRotate();
		$(obj).rotate({
			angle: 0,
			animateTo: angles + 4320,
			duration: 4000,
			callback: function() {
				showResult(type, name, imgurl, activeId, rememberId, userKeyId, awardId);
				bRotate = !bRotate;
			}
		})
	};
	console.log(_actionid+"--"+_mac+"--"+_chip+"--"+_model+"--"+_emmcCID);
	console.log(_userKeyId+"--"+_accessToken+"--"+_openId+"--"+_lotteryActiveId+"--"+_lotteryType);
	console.log(rotateId[_curRotateId]);
	var _tokenString = _mac+"&"+_chip+"&"+_model+"&"+rotateId[_curRotateId]+"&"+_lotteryType+"&lightLottery";
	var _tokenMd5 = md5(_tokenString);
	var ajaxTimeoutTwo = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/light/active/" + _actionid + "/lottery",
		data: {
			"id": _actionid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID":_emmcCID,
			"cUDID":_userKeyId,
			"accessToken":_accessToken,
			"cOpenId":_openId,
			"lotteryActiveId":rotateId[_curRotateId],
			"lotteryType":_lotteryType,
			"token":_tokenMd5
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				var _cType = data.data.awardTypeId; //实体还是虚体     7-小红包  15-大红包  2-实体   5-优惠券
				var _cName = data.data.awardName; //奖品名称
				var _seq = data.data.seq; //奖品排序
				var _cImgurl = data.data.awardUrl;
				var _angles = 45 * parseInt(_seq);
				var _activeId = data.data.lotteryActiveId;
				var _rememberId = data.data.lotteryRememberId;
				var _userKeyId = data.data.userKeyId;
				var _awardId = data.data.awardId;
				if(bRotate) return;
				rotateFn(rotateBtn[_curRotateId],_angles, _cType, _cName, _cImgurl, _activeId, _awardId, _rememberId, _userKeyId);
			} else {
				console.log("接口出现异常");
				$("#dialogPage").css("display","none");
				map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocus), "btn-focus", function() {}, function(val) {}, function(obj) {});
				$("#errorText").css("display","block");
				setTimeout("document.getElementById('errorText').style.display = 'none'", 3000);
			}
		},
		error: function() {
			console.log("系统出现异常,请重试");
			$("#dialogPage").css("display","none");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocus), "btn-focus", function() {}, function(val) {}, function(obj) {});
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}
		}
	});
}
//抽奖结果
function showResult(type, name, imgurl, activeId, rememberId, userKeyId, awardId) {
	//7-小红包  15-大红包  2-实体   5-优惠券
	console.log(type + "--" + name + "--" + imgurl);
	console.log(activeId + "--" + rememberId + "--" + userKeyId);
	$('.toast1').siblings().css('display', 'none');
	$('.toast2').siblings().css('display', 'none');
	$('.toast3').siblings().css('display', 'none');
	$("#dialogPage").css("display", "block");
	if(type == 2||type == 7){
		console.log("实体奖|小红包");
		name = "恭喜获得"+name;
		$("#enOrRedAwardInfo").html(name);
		$("#enOrRedAward").css("display", "block");
		$("#enOrRedAwardImg").attr("src",imgurl);
		$("#gotoMyAwards").attr("otype",type);
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("gotoMyAwards"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		getMyCards();
	}else if(type == 4){
		console.log("第三方优惠券");
		$("#thirdAward").css("display", "block");
		name = "恭喜获得:&nbsp;"+name;
		$("#thirdAwardInfo").html(name);
		$("#thirdAwardImg").attr("src",imgurl);
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("gotoMyAwards2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		getMyCards();
	}else if(type == 5){
		console.log("优惠券");
		if (_loginstatus == "true") {
			console.log("用户已登录");
			sendPrizes(name, imgurl, activeId, awardId, rememberId, type, userKeyId, _qsource, 0);
		}else{
			saveData1(name,imgurl,activeId,awardId,rememberId,_qsource,userKeyId);
			name = "恭喜获得"+name;
			$("#couponAwardInfo").html(name);
			$("#couponAward").css("display", "block");
			$("#couponAwardImg").attr("src",imgurl);
			$("#couponLogin").css("display", "block");
			$("#couponUse").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("couponLogin"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			getMyCards();
		}
	}else if(type == 12){
		console.log("景点卡");
		$("#cardsAward").css("display", "block");
		name = "恭喜获得:&nbsp;"+name;
		$("#cardsAwardInfo").html(name);
		$("#cardsAwardImg").attr("src",imgurl);
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("checkCards"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		getMyCards();
	}else if(type == 15) {
		console.log("大红包");
		name = "撒花！恭喜获得"+name;
		$("#getBigInfo").html(name);
		document.getElementById("getBigQrcode").innerHTML = "";
		var str = bigurl + "activeId=" + activeId + "&rememberId=" + rememberId + "&userKeyId=" + userKeyId;
		var qrcode = new QRCode(document.getElementById("getBigQrcode"), {
			width: 190,
			height: 190
		});
		qrcode.makeCode(str);
		$("#getBigQrcode").css("display", "block");
		$("#getBigRed").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("getBigQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		getMyCards();
	}
}
//优惠券的领取
function sendPrizes(name, imgurl, lotteryActiveId, awardid, rememberId, type, userkeyid, qsource, area) {
	console.log(lotteryActiveId+"--"+awardid+"--"+rememberId+"--"+type+"--"+userkeyid+"--"+_openId+"--"+_mac+"--->"+qsource);
	if (qsource != "tencent") {
		qsource = "iqiyi";
	}
	console.log(qsource);
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 25000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/verify/receive",
		data: {
			"activeId": lotteryActiveId,
			"awardId": awardid,
			"rememberId": rememberId,
			"awardTypeId": type,
			"userKeyId": userkeyid,
			"MAC": _mac,
			"cOpenId": _openId,
			"source": qsource
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				if(area == 1){
					getMyAwards(1,0);//num1:0-不需要指定焦点  1-需要指定焦点;num2:0-不提交曝光数据  1-提交曝光数据
				}else{
					$("#dialogPage").css("display","block");
					$("#couponAward").css("display", "block");
					name = "恭喜获得"+name;
					$("#couponAwardInfo").html(name);
					$("#couponAwardImg").attr("src",imgurl);
					$("#couponLogin").css("display", "none");
					$("#couponUse").css("display", "block");
					
					var couponDetail = data.data.couponInfo.couponDetail;
					console.log(couponDetail);
                    if(couponDetail == 1){//已配置
                        var data_a = data.data.couponInfo.onclickData;
                        var packageName = JSON.parse(data_a).packageName;
                        var byvalue = JSON.parse(data_a).byvalue;
                        var bywhat = JSON.parse(data_a).bywhat;
                        var obj = JSON.parse(data_a).param;
                        var sources = new Array();
                        for(var key in obj){
                            var px = {};
                            px[key] = obj[key];
                            sources.push(px);
                        }
                        sources = JSON.stringify(sources);
                        console.log(packageName+"--"+byvalue+"--"+bywhat+"--"+sources);
                        $("#couponUse").attr("packageName",packageName);
                        $("#couponUse").attr("byvalue",byvalue);
                        $("#couponUse").attr("bywhat",bywhat);
                        $("#couponUse").attr("sources",sources);
                    }else{
                    	console.log("未配置");
                    }
					map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("couponUse"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				}
			}else {
				if (area == 1) {
					console.log("优惠券激活失败,需要给出激活失败的提示.");
				}else{
					saveData1(name,imgurl,lotteryActiveId,awardid,rememberId,qsource,userkeyid);
					$("#dialogPage").css("display","block");
					$("#couponFail").css("display","block");
					map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("couponFailBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				}
			}
		},
		error: function() {
			console.log("获取失败");
			if (area == 1) {
				console.log("优惠券激活失败,需要给出激活失败的提示.");
			}
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
			if (area == 0) {
				getMyCards();
			}
		}
	});
}
//我的奖品的点击
function showAwardDialog(type,state,awardName,awardUrl,awardTime,rememberId,userkeyid,awardAddress,userPhone,userName,awardId,activeId,id,packageName,byvalue,bywhat,sources,redUser,redPhone){
	console.log(type +"--"+state+"--"+id);
	console.log(awardName +"--"+awardTime+"--"+rememberId+"--"+userkeyid);
	_curCouponFocus = id;
	console.log(_curCouponFocus);
	if (type == 7) {
		$("#dialogPage").css("display","block");
		$("#myWxRed").css("display","block");
		document.getElementById("myWxRedName").innerHTML = "奖品名称："+awardName;
		document.getElementById("myWxRedTime").innerHTML = "发放时间："+awardTime;
		document.getElementById("wxQrcode").innerHTML = "";
		getRedPacketsQrcode(activeId, rememberId, userkeyid, "wxQrcode");
		if (state == 0) {
			console.log("小红包+未领取");
			$("#myWxRedName").css("top","160px");
			$("#myWxRedName").css("left","290px");
			$("#myWxRedTime").css("top","200px");
			$("#myWxRedTime").css("left","290px");
			$("#myWxRed").css("background-image","url(images/award/dialog2.png)");
			$("#wxRednotget").css("display","block");
			$("#wxRedhasgot").css("display","none");
		} else{
			console.log("小红包+已领取");
			$("#myWxRedName").css("top","188px");
			$("#myWxRedName").css("left","175px");
			$("#myWxRedTime").css("top","235px");
			$("#myWxRedTime").css("left","175px");
			$("#myWxRed").css("background-image","url(images/award/dialog.png)");
			$("#wxRedhasgot").css("display","block");
			$("#wxRednotget").css("display","none");
		}
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		sendMyAwardsLog(type,state);
	}else if(type == 15){
		$("#dialogPage").css("display","block");
		$("#myBigRed").css("display","block");
		document.getElementById("myBigRedName").innerHTML = "奖品名称："+awardName;
		document.getElementById("myBigRedTime").innerHTML = "发放时间："+awardTime;
		document.getElementById("bigQrcode").innerHTML = "";
		if (state == 0) {
			console.log("大奖+未领取");
			$("#myBigRedName").css("top","160px");
			$("#myBigRedName").css("left","290px");
			$("#myBigRedTime").css("top","200px");
			$("#myBigRedTime").css("left","290px");
			$("#myBigRed").css('background-image', 'url(images/award/dialog2.png)');
			$("#bigRedhasgot").css("display","none");
			$("#bigRednotget").css("display","block");
			var bigstr = bigurl + "activeId=" + activeId + "&rememberId=" + rememberId + "&userKeyId=" + userkeyid;
			console.log(bigstr);
			drawQrcode("bigQrcode", bigstr, 180);
		} else{
			console.log("大奖+已领取");
			$("#myBigRedName").css("top","200px");
			$("#myBigRedName").css("left","175px");
			$("#myBigRedTime").css("top","245px");
			$("#myBigRedTime").css("left","175px");
			$("#myBigRed").css("background-image","url(images/award/dialog.png)");
			$("#bigRednotget").css("display","none");
			$("#bigRedhasgot").css("display","block");
			console.log(redUser+"--"+redPhone);
			document.getElementById("bigWinner").innerHTML = "收货人：&nbsp;&nbsp;&nbsp;&nbsp;"+redUser;
			document.getElementById("bigPhone").innerHTML = "收货电话："+ redPhone;
		}
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		sendMyAwardsLog(type,state);
	}else if(type == 2){
		if (state == 0) {
			console.log("实物奖+未领取");
			if(_loginstatus == "false"){
				var _dateObj = {
					"page_name": "nalm_my_award_page"
				}
				pageShowLog("nalm_account_landing_page_exposure",_dateObj);
				console.log(needQQ);
				startLogin(needQQ);
			}else{
				$("#dialogPage").css("display","block");
				$("#myEntity").css("display","block");
				document.getElementById("myEnRedName").innerHTML = "奖品名称："+awardName;
				document.getElementById("myEnRedTime").innerHTML = "发放时间："+awardTime;
				document.getElementById("enQrcode").innerHTML = "";
				$("#myEnRedName").css("top","160px");
				$("#myEnRedName").css("left","300px");
				$("#myEnRedTime").css("top","200px");
				$("#myEnRedTime").css("left","300px");
				$("#myEntity").css("background-image","url(images/award/dialog2.png)");
				$("#enHasgot").css("display","none");
				$("#enNotget").css("display","block");
				var enstr = enurl + "activeId=" + activeId + "&rememberId=" + rememberId + "&userKeyId=" + userkeyid + "&access_token=" + _accessToken;
				console.log(enstr);
				drawQrcode("enQrcode", enstr, 180);
				map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				sendMyAwardsLog(type,state);
			}
		} else{
			console.log("实物奖+已领取");
			console.log(awardAddress +"--"+userPhone+"--"+userName);
			$("#dialogPage").css("display","block");
			$("#myEntity").css("display","block");
			document.getElementById("myEnRedName").innerHTML = "奖品名称："+awardName;
			document.getElementById("myEnRedTime").innerHTML = "发放时间："+awardTime;
			document.getElementById("enQrcode").innerHTML = "";
			$("#myEnRedName").css("top","190px");
			$("#myEnRedName").css("left","175px");
			$("#myEnRedTime").css("top","235px");
			$("#myEnRedTime").css("left","175px");
			$("#myEntity").css("background-image","url(images/award/dialog.png)");
			$("#enNotget").css("display","none");
			$("#enHasgot").css("display","block");
			document.getElementById("enWinner").innerHTML = "收货人：&nbsp;&nbsp;"+userName;
			document.getElementById("enPhone").innerHTML = "收货电话："+ userPhone;
			document.getElementById("enAddress").innerHTML = "收货地址："+ awardAddress;
			map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
			sendMyAwardsLog(type,state);
		}
	}else if(type == 5){
		if (state == 0) {
			console.log("优惠券+未领取");
			if(_loginstatus == "false"){
				var _dateObj = {
					"page_name": "nalm_my_award_page"
				}
				pageShowLog("nalm_account_landing_page_exposure",_dateObj);
				startLogin(needQQ);
			}else{
				console.log("用户已登录+领取优惠券");
				console.log(activeId+"--"+awardId+"--"+rememberId+"--"+type+"--"+userkeyid+"--"+_qsource);
				sendPrizes(awardName, awardUrl, activeId, awardId, rememberId, type, userkeyid, _qsource, 1);
				sendMyAwardsLog(type,state);
			}
		} else{
			console.log("优惠券+已领取+跳转至使用页面");
			console.log(bywhat+"--"+byvalue+"--"+sources+"--"+packageName);
			coocaaosapi.startParamAction2(bywhat,byvalue,sources,function(message) {}, function(error) {console.log("判断失败"+error);});
			sendMyAwardsLog(type,state);
		}
	}else if(type == 4){
		console.log("-------------------第三方");
		$("#dialogPage").css("display","block");
		$("#myThird").css("display","block");
		console.log(awardUrl);
		$("#myThirdImg").attr("src",awardUrl);
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	}
}
//点击退出
function pageExit(){
	var _source = getQueryString("source");
	if (_source == "operation") {
		coocaaosapi.startNewBrowser2(homeUrl,function(message) {navigator.app.exitApp();},function(error) { console.log(error);});
	} else{
		navigator.app.exitApp();
	}
}
//点击返回
function backButtonFunc() {
	console.log("in backButtonFunc");
	var dialogPageStyle = document.getElementById("dialogPage").style.display;
	var awardPageStyle = document.getElementById("myAwardPage").style.display;
	if (dialogPageStyle == "block") {
		$('.toast1').siblings().css('display', 'none');
		$('.toast2').siblings().css('display', 'none');
		$('.toast3').siblings().css('display', 'none');
		$("#dialogPage").css('display', 'none');
		if (document.getElementById("myAwardPage").style.display == "block") {
			console.log(_curFocusIndex);
			getMyAwards(1,0);//num1:0-不需要指定焦点  1-需要指定焦点;num2:0-不提交曝光数据  1-提交曝光数据
		} else{
			console.log(_curFocus);
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocus), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	}else{
		console.log(awardPageStyle);
		if(awardPageStyle == "block"){
			var _source = getQueryString("source");
			console.log(_source);
			if (_source == "operation") {
				$("#myAwardPage").css("display","none");
				$("#mainPage").css("display","block");
				map = new coocaakeymap($(".coocaa_btn"), document.getElementById("drawBtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else{
				console.log("------------2");
				navigator.app.exitApp();
			}
		}else{
			console.log("------------3");
			navigator.app.exitApp();
		}
	}
	
}
//onResume事件
function onResumeFunc() {
	if (needSentUserLog) {
		needSentUserLog = false;
		var _dateObj = {
			"landing_result": 0
		}
		pageShowLog("nalm_account_landing_result",_dateObj);
		hasLogin(needQQ,1);//1-不走初始化
	}
}
//获取微信红包二维码
function getRedPacketsQrcode(ractiveId, rrememberId, ruserKeyId, _id) {
	console.log(ractiveId+"--"+rrememberId + "--" + ruserKeyId + "--" + _id);
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/verify/wechat/qrCode",
		data: {
			"activeId": ractiveId,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cUDID": _udid,
			"accessToken": _accessToken,
			"cOpenId": _openId,
			"cNickName": _nickName,
			"rememberId": rrememberId,
			"userKeyId": ruserKeyId,
			"luckyDrawCode": "lightCity",
			"type": "19",
			"channel": "coocaa"
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "200") {
				var str = data.data;
				drawQrcode(_id, str, 180);
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
//
function saveData1(data1,data2,data3,data4,data5,data6,data7){
	console.log(data1+"--"+data2+"--"+data3+"--"+data4);
	console.log(data5+"--"+data6+"--"+data7);
	$("#couponFailBtn").attr("awardName",data1);
	$("#couponFailBtn").attr("awardUrl",data2);
	$("#couponFailBtn").attr("activeId",data3);
	$("#couponFailBtn").attr("awardId",data4);
	$("#couponFailBtn").attr("rememberId",data5);
	$("#couponFailBtn").attr("qsource",data6);
	$("#couponFailBtn").attr("userKeyId",data7);
}
//优惠券的再次领取
function sendPrizesAgain(){
	var lawardName = $("#couponFailBtn").attr("awardName");
	var lawardUrl = $("#couponFailBtn").attr("awardUrl");
	var lactiveId = $("#couponFailBtn").attr("activeId");
	var lawardId = $("#couponFailBtn").attr("awardId");
	var lrememberId = $("#couponFailBtn").attr("rememberId");
	var lqsource = $("#couponFailBtn").attr("qsource");
	var luserKeyId = $("#couponFailBtn").attr("userKeyId");
			
	console.log(lawardName+"--"+lawardUrl+"--"+lactiveId+"--"+lawardId);
	console.log(lrememberId+"--"+lqsource+"--"+luserKeyId);
	sendPrizes(lawardName, lawardUrl, lactiveId, lawardId, lrememberId, 5, luserKeyId, lqsource, 0);
}
function sendDrawButtonsLog(index,oremainCard){
	var buttonId = ["2","1","0","3"];
	var _dateObj = {
		"button_name": buttonId[index],
		"entrance_type": "",
		"account_status": "",
		"login_status": 0
	}
	if (_loginstatus == "true") {
		_dateObj.login_status = 1;
	}
	var _source = getQueryString("source");
	if (_source == "main") {
		_dateObj.entrance_type = 0;
	} else{
		_dateObj.entrance_type = 1;
	}
	if (index == 0) {
		if (oremainCard>=15) {
			_dateObj.account_status = 1;
		}else{
			_dateObj.account_status = 0;
		}
	} else if(index == 1){
		if (oremainCard>=7) {
			_dateObj.account_status = 1;
		}else{
			_dateObj.account_status = 0;
		}
	} else if(index == 2){
		if (oremainCard>=3) {
			_dateObj.account_status = 1;
		}else{
			_dateObj.account_status = 0;
		}
	}
	webBtnClickLog("nalm_lottery_activity_page_button_onclick",_dateObj);
}
function sendMyAwardsLog(_otype,_ostate){
	var _dateObj = {
		"award_type": "",
		"award_status": _ostate
	}
	if (_otype == 2) {
		_dateObj.award_type = 4;
	} else if(_otype == 7){
		_dateObj.award_type = 0;
	} else if(_otype == 5){
		_dateObj.award_type = 3;
	} else if(_otype == 15){
		_dateObj.award_type = 1;
	} else if(_otype == 4){
		_dateObj.award_type = 5;
	}
	webBtnClickLog("nalm_my_award_page_content_onclick",_dateObj);
}
//绘制二维码
function drawQrcode(id, url, wh) {
	var qrcode = new QRCode(document.getElementById(id), {
		width: wh,
		height: wh
	});
	qrcode.makeCode(url);
}
function dialogBtnClick(num1,num2){
	console.log(num1+"---"+num2);
	var _dateObj = {
		"button_name": num1,
		"award_type": num2
	}
	webBtnClickLog("nalm_lottery_activity_page_award_toast_button_onclick",_dateObj);
}
function toastText(num, id, text) {}

function md5(string){
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
    function md5_AddUnsigned(lX,lY){
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }         
    function md5_F(x,y,z){
        return (x & y) | ((~x) & z);
    }
    function md5_G(x,y,z){
        return (x & z) | (y & (~z));
    }
    function md5_H(x,y,z){
        return (x ^ y ^ z);
    }
    function md5_I(x,y,z){
        return (y ^ (x | (~z)));
    }
    function md5_FF(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }; 
    function md5_GG(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }; 
    function md5_II(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    }; 
    function md5_WordToHex(lValue){
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for(lCount = 0;lCount<=3;lCount++){
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
    function md5_Utf8Encode(string){
        string = string.replace(/\r\n/g,"\n");
        var utftext = ""; 
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n); 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            } 
        } 
        return utftext;
    }; 
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string); 
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476; 
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=md5_AddUnsigned(a,AA);
        b=md5_AddUnsigned(b,BB);
        c=md5_AddUnsigned(c,CC);
        d=md5_AddUnsigned(d,DD);
    }
    return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
function webBtnClickLog(logName, dateObj) {
	var _dataString = JSON.stringify(dateObj);
	coocaaosapi.notifyJSLogInfo(logName, _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

function pageShowLog(logName,dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log("lxw----------------" + logName);
	console.log("lxw----------------" + _dataString);
	coocaaosapi.notifyJSLogInfo(logName, _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}
