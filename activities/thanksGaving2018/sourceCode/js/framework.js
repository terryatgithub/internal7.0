var _macAddress = null;
var _TVmodel = null;
var _TVchip = null;
var _activityId = null;
var _version = null;
var _access_token = null;
var _emmcCID = null;
var _nickName = null;
var _mobile = null;

var _openId = "";//null;
var _loginstatus = null;
var _tencentWay = null;
var _user_flag = null;
var _login_type = null;
var _vuserid = null;
var _qqtoken = null;

//-----------------------------正式上线需配置参数 start---------------------------------//
//抽奖接口：
//var _testurl = "https://restful.skysrt.com";//正式接口
var _testurl = "http://beta.restful.lottery.coocaatv.com";//测试接口
//实物二维码领取接口
//var _qrurl = "https://webapp.skysrt.com/address/address/index.html?";//正式接口
var _qrurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//测试接口
//产品包支付页面接口：
var _payUrl = "http://172.20.132.182:8090/v3/web/actCenter/index.html?data="; //内部测试环境
//var _payUrl = "http://172.20.139.113:8090/v3/web/actCenter/index.html?data=";//金融本地环境:
//活动ID（由运营确定）：
var _activeIdObj = {
	activeIdTencent: 160,
	activeIdIqiyi:   158
};
//-----------------------------正式上线需配置参数 end---------------------------------//

var _actionid = null;
var _lotteryCode = 0;
var _remainingTimes = 0;
var _operateTime = 0;
var _source = "";
var _curFocusButton = "productsButton1";
var ttt = null;
var tt = null;
var t15 = 0;

//设备视频源
var _TVSource = "";
//产品包信息(测试)
var _VIPInfos = {
	iqiyi: {
		 year:  {mainProductId: 1000406, toastProductId: 1000404, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113yinheyear.png"}
		,season:{mainProductId: 1000407, toastProductId: 1000405, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113yinhes.png"}
	}
	,tencent: {
		 year:  {mainProductId: 1000400, toastProductId: 1000402, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113txyear.png"}
		,season:{mainProductId: 1000401, toastProductId: 1000403, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113txs.png"}
	}
};
//产品包信息(正式)
var _VIPInfosRel = {
	iqiyi: {
		 year:  {mainProductId: 1323, toastProductId: 1334, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113yinheyear.png"}
		,season:{mainProductId: 1324, toastProductId: 1335, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113yinhes.png"}
	}
	,tencent: {
		 year:  {mainProductId: 1325, toastProductId: 1336, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113txyear.png"}
		,season:{mainProductId: 1326, toastProductId: 1337, bgurl: "http://sky.fs.skysrt.com/statics/webvip/webapp/activityPay/d20181113txs.png"}
	}
};
//奖品提示信息,id号或数组排序要跟转盘排序匹配（跟后台确认）
var _awardInfos = {
	iqiyi: [
		 {id:1, title:"影视终身VIP", des:"恭喜您获得影视终身VIP"}
		,{id:2, title:"豪华按摩椅", des:"恭喜您获得智能按摩椅1台"}
		,{id:3, title:"飞利浦剃须刀", des:"愿剃净与舒适伴您每一天，请扫码填写收货信息"}
		,{id:4, title:"伊贝诗护肤套装", des:"愿您容颜不老青春永驻，请扫码填写收货信息"}
		,{id:5, title:"现金红包", des:"小小红包略表心意，请扫码领取"}
		,{id:6, title:"50万保额意外险", des:"给您呵护，愿您平安，请扫码领取您的保障"}
		,{id:7, title:"智能蓝牙音箱",  des:"愿每一个慵懒的午后都有音乐伴您，请扫码填写收货信息"}
		,{id:8, title:"2688元父母体检套餐", des:"恭喜您获得2688元父母体检套餐"}
	]
	,tencent: [
		 {id:1, title:"影视终身VIP", des:"恭喜您获得影视终身VIP"}
		,{id:2, title:"扫地机器人",  des:"愿您每天回家享扑面而来的干净，请扫码填写收货信息"}
		,{id:3, title:"精品茶叶罐", des:"愿茶香伴您宁静致远，请扫码填写收货信息"}
		,{id:4, title:"企鹅抱枕", des:"愿您拥有幸福的依靠，请扫码填写收货信息"}
		,{id:5, title:"现金红包", des:"小小红包略表心意，请扫码领取"}
		,{id:6, title:"50万保额意外险", des:"给您呵护，愿您平安，请扫码领取您的保障"}
		,{id:7, title:"多功能料理机", des:"愿您生活有美食陪伴，请扫码填写收货信息"}
		,{id:8, title:"豪华按摩椅", des:"恭喜您获得智能按摩椅1台"}
	]
};

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
		//yuanbotest -start
//		_source = getQueryString("source");
//		_actionid = getQueryString("action");
//		console.log(_source +"----"+_actionid);
//		if (_source == "dialog") {
//			$("#dialogPage").css("display","block");
//			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("dialogbutton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
//			webPageShowLog("720全局弹窗（教育）");
//			tt = setTimeout(donothing,18000);
//		} else{
//			$("#mainPage").css("display","block");
//			webPageShowLog("720转盘抽奖页面（教育）");
//		}
//		getDeviceInfo();
//		buttonInitBefore();
//		startmarquee(400, 30, 0, 1);
//		listenUserChange();
//		setTimeout(doingSomething,10);
		//yuanbotest-end
		
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener('resume', this.onResume, false);
	},
	handleBackButton: function() {
	},
	onResume: function() {
		//
		interfaceInit(2);
	},
	onDeviceReady: function() {
		app.receivedEvent("deviceready");
		app.triggleButton();
	},
	receivedEvent: function(id) {
		console.log(id);
	},
	handleBackButtonDown: function() {
		//
		backButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		//
		//_source = getQueryString("source");
		//_actionid = getQueryString("action");
		console.log(_source +"----"+_actionid);
		if (_source == "dialog") {
			$("#dialogPage").css("display","block");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("dialogbutton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			webPageShowLog("720全局弹窗（教育）");
			tt = setTimeout(donothing,18000);
		} else{
			$("#mainPage").css("display","block");
			webPageShowLog("720转盘抽奖页面（教育）");
		}
		getDeviceInfo();
		buttonInitBefore();
		startmarquee(400, 30, 0, 1);
		listenUserChange();
		setTimeout(doingSomething,10);
	}
};

app.initialize();

//15秒没做操作
function donothing(){
	console.log(t15);
	webBtnClickLog("720转盘抽奖页面（教育）", "弹窗15秒自动退出", _actionid, "720暑假（教育）");
	navigator.app.exitApp();
}
//获取设备信息并初始化
function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		_TVmodel = message.model;
		_TVchip = message.chip;
		_macAddress = message.mac;
		_activityId = message.activeid;
		_version = message.version;
		if (message.emmcid ==""||message.emmcid==null) {
			_emmcCID = "123456";
		} else{
			_emmcCID = message.emmcid;
		}
		
		var _size = message.panel;
		var _resolution = "";
		var _localversion = message.version.replace(/\./g, "");
		var _fmodel = "Default";
		var _pattern = "normal";
		var _appID = 0;
		var _appversion = cAppVersion;
		var _appid, _source, _serviceid, _type, _devicebarcode, _time, _accessToken;
		console.log(_TVmodel+"--"+_TVchip+"--"+_macAddress+"--"+_activityId+"--"+_emmcCID+"--_appversion:"+_appversion);
		
		getTvSource(_macAddress, _TVmodel, _TVchip, _size, _resolution, _localversion, _fmodel, _pattern, _appID, _appversion, _appid, _source, _serviceid, _type, _devicebarcode, _time,_accessToken);
		
		hasLogin(false,0);
		
	}, function(error) {
		console.log("获取设备信息出现异常。");
	});
}
//初始化接口
//num： 0：初次进入活动页面，source为dialog时进入活动主弹窗页面； 否则进入活动主页面；并开启定时（1h）获取中奖信息的任务；
//num: 1:只获取并更新页面抽奖次数等信息
//num: 2:返回按键状态
function interfaceInit(num) {
	console.log("-------------------->"+ num);
	//_actionid = getQueryString("action");
	console.log(_actionid+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/init",
		data: {
			"id": _actionid,
			"MAC": _macAddress,
			"cChip": _TVchip,
			"cModel": _TVmodel,
			"cEmmcCID": _emmcCID,
			"cUDID": _activityId,
			"accessToken": _access_token,
			"cOpenId": _openId,
			"cNickName": _nickName
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			_curFocusButton = "productsButton1";
			_lotteryCode = 0;
			_remainingTimes = 0;
			_operateTime = 0;
			if(data.code == "50100") {
				_remainingTimes = data.data.remainingTimes;
				_operateTime = data.data.usedTimes;
				if(_remainingTimes > 0) {
					_lotteryCode = data.data.lotteryCode;
					_curFocusButton = "drawButton";
				}
			}
			console.log(_remainingTimes);
			document.getElementById("lotterynumber").innerHTML = _remainingTimes;
			console.log(_curFocusButton);
			if (num==2) {
				resumeButtonStatus();
			} else if(num==0){
				if (_source == "dialog") {
					console.log("--------->1");
					map = new coocaakeymap($(".coocaa_btn"), document.getElementById("dialogbutton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				}else{
					console.log(_curFocusButton);
					map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
				}
			}
		},
		error: function() {
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
			if (num == 0) {
				getWinNews();
				clearInterval(ttt);
				ttt = setInterval(getWinNews,3600000);
			}
		}
	});
}
//resume事件后的焦点变化
function resumeButtonStatus(){
	console.log(document.getElementById("fourPage").style.display);
	if (document.getElementById("fourPage").style.display == "block") {
		if (document.getElementById("category1").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("gotoedu"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		if (document.getElementById("category4").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("iknowButton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		if (document.getElementById("category2").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("realaward"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		if (document.getElementById("category3").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn4"), document.getElementById("productsButton21"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		if (document.getElementById("category5").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("iknowButton2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		if (document.getElementById("category6").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("iknowButton3"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	}
}

//中奖名单 
function getWinNews() {
	console.log("in  getWinNews");
	var ajaxTimeoutFour = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/winNews",
		data: {
			"id": _actionid,
			"state": -1
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				console.log(data.data.length);
				if(data.data.length != 0) {
					document.getElementById("awardul").innerHTML = "";
					for(var i = 0; i < data.data.length; i++) {
						var _div = '<li><span class="testspan1">' + data.data[i].userNickName + '</span><span class="testspan2">' + data.data[i].awardName + '</span><span class="testspan3">' + data.data[i].awardTime.split(' ')[0] + '</span></li>';
						$("#awardul").append(_div);
					}
				}
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFour.abort();　　　　
			}
		}
	});
}
//点击事件
function buttonInitBefore() {
	//活动规则
	$("#activeruleButton").bind("itemClick", function() {
		_curFocusButton = "activeruleButton";
		$("#secondPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn5"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		webBtnClickLog("720转盘抽奖页面（教育）", "活动规则", _actionid, "720暑假（教育）");
	});
	//我的奖品
	$("#myprizeButton").bind("itemClick", function() {
		_curFocusButton = "myprizeButton";
//		if(_loginstatus == "false") {
//			startLogin(false);
//		} else {
			$("#noprize").css("display", "none");
			myAwardList();
//		}
		webBtnClickLog("720转盘抽奖页面（教育）", "我的奖品", _actionid, "720暑假（教育）");
	});
	//提示窗口页面
	$(".coocaa_btn3").bind("itemClick", function() {
		var _index = $(".coocaa_btn3").index($(this));
		$("#fourPage").css("display", "none");
		var _curId = $(this).attr("id");
		if(_curId == "gotoedu") {
			gotoEducation();
		} else {
			if(document.getElementById("thirdPage").style.display == "block") {
				console.log(_curFocusButton);
				map = new coocaakeymap($(".coocaa_btn2"), document.getElementsByClassName("coocaa_btn2")[_curFocusButton], "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				console.log(_curFocusButton);
				map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		}
	});
	//主页产品包购买页面
	$(".products,.products2").bind("itemClick", function() {
		buyProducts($(this));
		webBtnClickLog("720转盘抽奖页面（教育）", "720暑假活动（教育）", _actionid, "720暑假（教育）");
	});
	//抽奖没有机会-弹窗-购买页面
	$(".coocaa_btn4").bind("itemClick", function() {
		buyProducts($(this));
		webBtnClickLog("720转盘抽奖页面（教育）", "教育弹窗跳转", _actionid, "720暑假（教育）");
	});
	//活动主弹窗页面
	$("#dialogbutton").bind("itemClick", function() {
		console.log("dialogPage itemClick");
		$("#dialogPage").css("display","none");
		$("#mainPage").css("display","block");
		console.log(_curFocusButton);
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
		webBtnClickLog("720全局弹窗（教育）", "720立即参与（教育）", _actionid, "720暑假（教育）");
		clearTimeout(tt);
	});
	//抽奖按钮
	bindAgain();
}
//重新绑定
function bindAgain() {
	$("#drawButton").unbind("itemClick").bind("itemClick", function() {
		drawButtonClick();
		$("#drawButton").unbind("itemClick");
		setTimeout("bindAgain()", 3000);
		webBtnClickLog("720转盘抽奖页面（教育）", "开始抽奖", _actionid, "720暑假（教育）");
	});
}
//展示我的奖品
function myAwardList() {
	document.getElementById("myprizebox").innerHTML = "";
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/winList",
		data: {
			"id": _actionid,
			"MAC": _macAddress,
			"cChip": _TVchip,
			"cModel": _TVmodel,
			"cEmmcCID": _emmcCID,
			"cUDID": _activityId,
			"accessToken": _access_token,
			"cOpenId": _openId,
			"cNickName": _nickName
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				document.getElementById("myprizebox").innerHTML = " ";
				var _length = data.data.length;
				console.log(_length);
				var _prizeitem = "";
				var _exchange = 0;
//				if(_length > 0) {
				//yuanbotest
				if(false) {
					for(var i = 0; i < _length; i++) {
						var _seq = JSON.parse(data.data[i].awardInfo).seq;
						console.log("_seq:"+_seq);
						//虚拟奖不做已领取
						if(data.data[i].awardTypeId == 4 || data.data[i].awardExchangeFlag == 0) {
							_exchange ++;
							var _bgimg = '<div awardUrl="' + data.data[i].awardUrl + '" lname="' + data.data[i].awardName + '" activeId="' + data.data[i].activeId + '" awardId="' + data.data[i].awardId + '" awardRememberId="' + data.data[i].lotteryAwardRememberId + '" awardTypeId="' + data.data[i].awardTypeId + '" userKeyId="' + data.data[i].userKeyId + '" seq="' + _seq + '" class="myprizebtn coocaa_btn2" status="1"><img class="myprizbgimg" src="images/awarding.webp"/><img class="myprizea" src="images/border2.webp"/></div>';
						} else {
							var _bgimg = '<div awardUrl="' + data.data[i].awardUrl + '" lname="' + data.data[i].awardName + '" activeId="' + data.data[i].activeId + '" awardId="' + data.data[i].awardId + '" awardRememberId="' + data.data[i].lotteryAwardRememberId + '" awardTypeId="' + data.data[i].awardTypeId + '" userKeyId="' + data.data[i].userKeyId + '" seq="' + _seq + '" class="myprizebtn coocaa_btn22" status="0"><img class="myprizbgimg" src="images/awardinged.webp"/></div>';
						}
						var _bgimg0 = '<img class="myprizbgimg0" src="' + data.data[i].awardUrl + '"/>';
						_prizeitem += '<div class="myprizeitem"><div class="myprizimg">' + _bgimg0 + '</div><div class="myprizeinfo"><span>' + data.data[i].awardName + '</span></div>' + _bgimg + '</div><div class="line"></div>';
					}
					$("#myprizebox").append(_prizeitem);
					$("#myprizebox").prepend('<div class="line"></div>'	);//前面插一个行
					$("#thirdPage").css("display", "block");
					if (_exchange > 0) {
						map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
					}else{
						map = new coocaakeymap($(".coocaa_btn6"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
					}
					creatButtonInit();
				} else {
					$("#noprize").css("display", "block");
					$("#thirdPage").css("display", "block");
					map = new coocaakeymap($(".coocaa_btn6"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
					$(".coocaa_btn6").unbind("itemClick").bind("itemClick", function() {
						$("#noprize").css("display", "none");
						$("#thirdPage").css("display", "none");
						map = new coocaakeymap($(".coocaa_btn"), document.getElementById("productsButton21"), "btn-focus", function() {}, function(val) {}, function(obj) {});
					});
				}
			} else {
				errorToast();
			}
		},
		error: function() {
			console.log('获取我的奖品失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}　　
		}
	});
}
//动态创建我的奖品后的button的初始化
function creatButtonInit() {
	$(".coocaa_btn2").unbind("focus").bind("focus", function() {
		var _index = $(".coocaa_btn2").index($(this));
		var _eachheight = $(".myprizeitem")[0].offsetHeight + $(".line")[0].offsetHeight;
		var myScrollTopValue = 0;
		myScrollTopValue = _index * _eachheight;
		$("#myprizebox").stop(true, true).animate({
			scrollTop: myScrollTopValue
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
		});
	});
	$(".myprizebtn").unbind("itemClick").bind("itemClick", function() {
		var _index = $(".myprizebtn").index($(this));
		_curFocusButton = _index;
		var _activeId = $(".myprizebtn:eq(" + _index + ")").attr("activeId");
		var _awardId = $(".myprizebtn:eq(" + _index + ")").attr("awardId");
		var _awardRememberId = $(".myprizebtn:eq(" + _index + ")").attr("awardRememberId");
		var _awardTypeId = $(".myprizebtn:eq(" + _index + ")").attr("awardTypeId");
		var _userKeyId = $(".myprizebtn:eq(" + _index + ")").attr("userKeyId");
		var _seq = $(".myprizebtn:eq(" + _index + ")").attr("seq");
		var _name = $(".myprizebtn:eq(" + _index + ")").attr("lname");
		var _imgurl = $(".myprizebtn:eq(" + _index + ")").attr("awardUrl");
		
		console.log(_activeId + "--" + _awardRememberId + "--" + _userKeyId+"--yuanbotest seq:"+_seq);
		
		if(_awardTypeId == 1 || _awardTypeId == 5) {//影视会员直通车&优惠券,后台直接激活
			getMyPrize(1, _name, _activeId, _awardId, _awardRememberId, _awardTypeId, _userKeyId, _imgurl, _seq);
		} else {
			showResult(_awardTypeId, _name, _imgurl, _activeId, _awardRememberId, _userKeyId, _seq);
		}
	});
}
//开始抽奖
function drawButtonClick() {
//	_curFocusButton = "drawButton";
//	if(_loginstatus == "false") {
//		startLogin(false);
//	} else {
		activeBeginstatus(1);
//	}
}
//购买产品包
function buyProducts(el) {
//	if(_loginstatus == "false") {
//		startLogin(false);
//	} else {
		activeBeginstatus(2, el);
//	}
}

//用户点击按钮后,响应的活动 status: 
//1:焦点在抽奖按钮上,进行抽奖的逻辑处理 
//2:焦点在购买产品包上,开始产品包逻辑处理
function activeBeginstatus(status, el) {
	//status  1-点击开始抽奖   2-点击购买产品包
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/info",
		data: {
			"id": _actionid,
			"operateNumber": 2
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				var _beginTime = data.data.activeBeginTime;
				var _endTime = data.data.activeEndTime;
				var _sysTime = data.data.sysTime;
				//活动开始时间
				var year_activity_begin = _beginTime.substr(0, 4);
				var month_activity_begin = _beginTime.substr(5, 2);
				var day_activity_begin = _beginTime.substr(8, 2);
				var hour_activity_begin = _beginTime.substr(11, 2);
				var minute_activity_begin = _beginTime.substr(14, 2);
				var second_activity_begin = _beginTime.substr(17, 2);
				var menmber_activity_begin = second_activity_begin * 1 + minute_activity_begin * 100 + hour_activity_begin * 10000 + day_activity_begin * 1000000 + month_activity_begin * 100000000 + year_activity_begin * 10000000000;
				//活动结束时间
				var year_activity_end = _endTime.substr(0, 4);
				var month_activity_end = _endTime.substr(5, 2);
				var day_activity_end = _endTime.substr(8, 2);
				var hour_activity_end = _endTime.substr(11, 2);
				var minute_activity_end = _endTime.substr(14, 2);
				var second_activity_end = _endTime.substr(17, 2);
				var menmber_activity_end = second_activity_end * 1 + minute_activity_end * 100 + hour_activity_end * 10000 + day_activity_end * 1000000 + month_activity_end * 100000000 + year_activity_end * 10000000000;

				//系统时间时间
				var year_activity_sys = _sysTime.substr(0, 4);
				var month_activity_sys = _sysTime.substr(5, 2);
				var day_activity_sys = _sysTime.substr(8, 2);
				var hour_activity_sys = _sysTime.substr(11, 2);
				var minute_activity_sys = _sysTime.substr(14, 2);
				var second_activity_sys = _sysTime.substr(17, 2);
				var menmber_activity_sys = second_activity_sys * 1 + minute_activity_sys * 100 + hour_activity_sys * 10000 + day_activity_sys * 1000000 + month_activity_sys * 100000000 + year_activity_sys * 10000000000;
				console.log(menmber_activity_begin + "---" + menmber_activity_sys + "---" + menmber_activity_end);
				if(menmber_activity_begin > menmber_activity_sys) {
					console.log("活动未开始");
					$("#fourPage").css("display", "block");
					$("#category5").css("display", "block");
					map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				} else if(menmber_activity_end < menmber_activity_sys) {
					console.log("活动已结束");
					if(status == 1){
						$("#fourPage").css("display", "block");
						$("#category6").css("display", "block");
						map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
					}else if(status == 2){
						console.log("活动已结束点击了购买产品包");
						document.getElementById("errorToast3").style.display = "block";
						setTimeout("document.getElementById('errorToast3').style.display = 'none'", 3000);
					}
				} else {
					console.log("活动已开始");
					if(status == 1){
						if(_remainingTimes == 0) {
							//没有抽奖机会,弹窗显示产品包购买页面(二维码)
							console.log("没有抽奖机会");
							startProductPackPage();
						} else {
							startLottery();
						}
					}else if(status == 2){
						console.log("活动已开始时点击了购买产品包");
						//todo:
						startPayPage(el);
					}
				}
			}
		},
		error: function() {
			console.log('获取中奖名单失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}　　
		}
	});
}

function startProductPackPage() {
	if(_TVSource == "tencent") {
		$("#category3").css("background-image","url(images/diaglogTencent.webp)");
	}else {
		$("#category3").css("background-image","url(images/diaglogIqiyi.webp)");
	}
	
	$(".prizetoast:eq(3)").css("display", "block");
	$("#fourPage").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn4"), document.getElementById("productsButton21"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	
	webPageShowLog("720产品包弹窗页面（教育）");
}

function startPayPage(el) {
	var productId,bgurl,videoSrc, curId;

	if(_TVSource == "tencent") {
		videoSrc = _VIPInfos.tencent;
	}else {
		videoSrc = _VIPInfos.iqiyi;
	}

	curId = el.attr("id");
	console.log("curId:"+curId);
	
	switch(curId) {
		case "productsButton1"://年卡
			productId = videoSrc.year.mainProductId;
			bgurl = videoSrc.year.bgurl;
			break;
		case "productsButton2"://季卡
			productId = videoSrc.season.mainProductId;
			bgurl = videoSrc.season.bgurl;
			break;
		case "productsButton21"://弹窗年卡
			productId = videoSrc.year.toastProductId;
			bgurl = videoSrc.year.bgurl;
			break;
		case "productsButton22"://弹窗季卡
			productId = videoSrc.season.toastProductId;
			bgurl = videoSrc.season.bgurl;
			break;				
	}
	 
	var data = {
		"coocaa_open_id": _openId,
		"product_id": productId,
		"activity_id": _actionid,
		"activity_name": "感恩节活动2018",
		"bg_url": bgurl
	};
	var url = _payUrl + JSON.stringify(data);
	console.log("total url:"+url+", bgurl:"+bgurl);
	
	coocaaosapi.startNewBrowser(url, function(message) {
		console.log("startNewBrowser success" + message);
	}, function(error) {
		console.log("startNewBrowser error:" + error);
	});	
}

//点击开始抽奖的接口请求
function startLottery() {
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
	var rotateFn = function(angles, type, name, imgurl, activeId, awardId, rememberId, userKeyId, seq) {
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 2160,
			duration: 3000,
			callback: function() {
				showResult(type, name, imgurl, activeId, rememberId, userKeyId, seq);
				bRotate = !bRotate;
				if(type == 1 || type == 5) {
					getMyPrize(0 ,name, activeId, awardId, rememberId, type, userKeyId, imgurl, seq);
				}
			}
		})
	};
	var ajaxTimeoutTwo = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/start",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cModel": _TVmodel,
			"cChip": _TVchip,
			"MAC": _macAddress,
			"cUDID": _activityId,
			"cNickName": _nickName,
			"lotteryCode": _lotteryCode,
			"operateNumber": _remainingTimes,
			"operateTime": _operateTime,
			"token": _access_token
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				var _cType = data.data.awardTypeId; //实体还是虚体     1-影视会员直通车  2-实体奖   4-虚拟奖 5-优惠券 7-微信红包
				var _cName = data.data.awardName; //奖品名称
				var _seq = data.data.seq; //奖品排序
				var _cImgurl = data.data.awardUrl;
				var _angles = 45 * parseInt(_seq - 1); //45 * parseInt(_seq) + 10;

				var _activeId = data.data.activeId;
				var _rememberId = data.data.lotteryAwardRememberId;
				var _userKeyId = data.data.userKeyId;
				var _awardId = data.data.awardId;
				var _imgurl = data.data.awardUrl;
				if(bRotate) return;
				rotateFn(_angles, _cType, _cName, _cImgurl, _activeId, _awardId, _rememberId, _userKeyId, _seq);
				interfaceInit(1);
			} else {
				errorToast();
			}
		},
		error: function() {
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}　　
		}
	});
}

//点击返回
function backButtonFunc() {
	console.log("in backButtonFunc");
	var _topPage = "firstlevel";
	var page2 = document.getElementById("secondPage").style.display;
	var page3 = document.getElementById("thirdPage").style.display;
	var page4 = document.getElementById("fourPage").style.display;
	console.log(page2+"--"+page3+"--"+page4);
	if(page4 == "block") {
		$("#fourPage").css("display", "none");
		for(var i = 0; i < $(".prizetoast").length; i++) {
			$(".prizetoast")[i].style.display = "none";
		}
		if(page3 == "block") {
			map = new coocaakeymap($(".coocaa_btn2"), document.getElementsByClassName("coocaa_btn2")[_curFocusButton], "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	} else {
		if(page2 == "block") {
			console.log("1");
			$("#secondPage").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("activeruleButton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if(page3 == "block") {
			$("#thirdPage").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("myprizeButton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			navigator.app.exitApp();
		}
	}
}

function hasLogin(needQQ,num) {
	console.log("in hasLogin");
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			} else {
				_tencentWay = "qq";
			}
			_user_flag = 0;
			_access_token = "";
			_lotteryCode = 0;
			_remainingTimes = 0;
			_operateTime = 0;
			if (num==0) {
				interfaceInit(0);
			} else{
				interfaceInit(1);
			}
		} else {
			coocaaosapi.getUserInfo(function(message) {
				exterInfo = message.external_info;
				_openId = message.open_id;
				_mobile = message.mobile;
				_nickName = message.nick_name;
				coocaaosapi.getUserAccessToken(function(message) {
					_access_token = message.accesstoken;
					console.log(_access_token);
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
					if (num==0) {
						interfaceInit(0);
					} else{
						interfaceInit(1);
					}
				}, function(error) {})
			}, function(error) {});
		}
	}, function(error) {});
}
//监听账户变化
function listenUserChange() {
	coocaaosapi.addUserChanggedListener(function(message) {
		hasLogin(false,1);
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
//跳转教育页面
function gotoEducation() {
	var _versionInt = parseInt(_version.substr(0, 1));
	if(cAppVersion > 3300000 || cAppVersion == 3300000) {
		if(_versionInt == 6) {
			coocaaosapi.startHomeTap("coocaa.intent.action.HOME", "10738", function(message) {
				console.log(message);
				navigator.app.exitApp();
			}, function(error) {
				console.log(error);
			});
		} else {
			coocaaosapi.startHomeTap("coocaa.intent.action.HOME.Translucent", "10738", function(message) {
				console.log(message);
				navigator.app.exitApp();
			}, function(error) {
				console.log(error);
				coocaaosapi.startHomeTap("coocaa.intent.movie.home", "10738", function(message) {
					console.log(message);
					navigator.app.exitApp();
				}, function(error) {
					console.log(error);
				});
			});
		}
	} else {
		if(document.getElementById("thirdPage").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn2"), document.getElementsByClassName("coocaa_btn2")[_curFocusButton], "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		document.getElementById("errorToast2").style.display = "block";
		setTimeout("document.getElementById('errorToast2').style.display = 'none'", 3000);
	}
}
//点击抽奖时的虚拟奖的激活\我的奖品页点击激活
//area: 0: 抽奖后直接显示奖品(非实物奖)
//area: 1: 我的奖品页面,点击某个奖品后,去服务器确认一下此奖品的状态(非实物奖)
function getMyPrize(area, name, activeId, awardId, awardRememberId, awardTypeId, userKeyId, imgurl, seq) {
	console.log(activeId + "--" + awardId + "--" + awardRememberId + "--" + awardTypeId + "--" + userKeyId  + "--" + imgurl);
	console.log(_macAddress+"--"+_openId);
	var _mac = _macAddress;
	var ajaxTimeoutThree = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/verify/receive",
		data: {
			"activeId": activeId,
			"awardId": awardId,
			"rememberId": awardRememberId,
			"awardTypeId": awardTypeId,
			"userKeyId": userKeyId,
			"MAC": _macAddress,
			"cOpenId": _openId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				if (area == 1) {
					showResult(awardTypeId, name, imgurl, activeId, awardRememberId, userKeyId, seq);
				}
			} else {
				if (area == 1) {
					errorToast();
				}
			}
		},
		error: function() {
			console.log('立即领取失败');
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutThree.abort();
			}
		}
	});
//	if (area == 0) {
//		showResult(awardTypeId, name, imgurl, activeId, awardRememberId, userKeyId, seq);
//	}
}
//抽奖结果
function showResult(type, name, imgurl, activeId, rememberId, userKeyId, seq) {
	//1-体验卡  2-实体   5-优惠券
	console.log(type + "--" + name + "--" + imgurl);
	console.log(activeId + "--" + rememberId + "--" + userKeyId+"--seq:"+seq);
	for(var i = 0; i < $(".prizetoast").length; i++) {
		$(".prizetoast")[i].style.display = "none";
	}
	
	//获取奖品描述:
	var des;
	if(_TVSource == "tencent") {
		des = _awardInfos.tencent[seq-1].des;
	}else {
		des = _awardInfos.iqiyi[seq-1].des;
	}
	console.log("des:"+des);
		
	//影视会员卡
	if(type == 1) {
		$("#yellowtext").html(name);
		$(".prizetoast:eq(0)").css("display", "block");
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else if(type == 2) {//实体奖
		$("#yellowtext2").html(name);
		$(".category2_4").html(des);
		
		$(".prizetoast:eq(2)").css("display", "block");
		console.log(imgurl);
		$("#prizeImg").attr("src", imgurl);
		document.getElementById("qrcode").innerHTML = "";
		var str = _qrurl + "activeId=" + activeId + "&rememberId=" + rememberId + "&userKeyId=" + userKeyId;
		var qrcode = new QRCode(document.getElementById("qrcode"), {
			width: 190,
			height: 190
		});
		qrcode.makeCode(str);
		//需要复位图片和二维码的位置(因为虚拟奖和红包奖复用了这里):
		$(".category2_2").css("left", "140px");
		$(".category2_3").css("left", "395px");
		$(".category2_2").css("display", "block");
		$(".category2_3").css("display", "block");
		$("#prizeImg").css("display", "block");
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else if(type == 4) { //虚拟奖,只显示图片
		$(".category2_3").css("display", "none");
		$(".category2_2").css("display", "block");
		$(".category2_2").css("left", "270px");
		
		$("#yellowtext2").html(name);
		$(".category2_4").html(des);
		
		$(".prizetoast:eq(2)").css("display", "block");
		console.log(imgurl);
		$("#prizeImg").attr("src", imgurl);
		$("#prizeImg").css("display", "block");
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else if(type == 7) { //微信红包,只显示二维码
		$(".category2_2").css("display", "none");
		$(".category2_3").css("display", "block");
		$(".category2_3").css("left", "270px");
		
		$("#yellowtext2").html(name);
		$(".category2_4").html(des);
		
		$(".prizetoast:eq(2)").css("display", "block");
		document.getElementById("qrcode").innerHTML = "";
		getWechatLucyMoney(activeId, rememberId, userKeyId);
		
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});		
	} else if(type == 5) {//优惠券
		$("#yellowtext4").html(name);
		$(".prizetoast:eq(1)").css("display", "block");
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else {
		errorToast();
	}
}

function getWechatLucyMoney(activeId, rememberId, userKeyId) {
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/verify/wechat/qrCode",
		data: {
			"MAC": _macAddress,
			"cChip": _TVchip,
			"cModel": _TVmodel,
			"cEmmcCID": _emmcCID,
			"cUDID": _activityId,
			"accessToken": _access_token,
			"cOpenId": _openId,
			"cNickName": _nickName,
			
			"activeId": activeId,
			"rememberId": rememberId,
			"userKeyId": userKeyId,
			
			"luckyDrawCode": "roulette",
			"type": 22,
		},
		success: function(data) {
			console.log("getWechatLucyMoney success:" + JSON.stringify(data));
			if(data.code == "200") {
				var url = data.data;
				var qrcode = new QRCode(document.getElementById("qrcode"), {
					width: 190,
					height: 190
				});
				qrcode.makeCode(url);
			} else {
				console.log('getWechatLucyMoney fail..');
				errorToast();	
			}
		},
		error: function() {
			console.log('获取我的奖品失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}　　
		}
	});	
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//获奖名单滚动效果
function startmarquee(lh, speed, delay, index) {
	var t;
	var p = false;
	var o = document.getElementById("awardListTwo");
	o.innerHTML += o.innerHTML;
	o.onmouseover = function() {
		p = true
	}
	o.onmouseout = function() {
		p = false
	}
	o.scrollTop = 0;
	function start() {
		t = setInterval(scrolling, speed);
		if(!p) {
			o.scrollTop += 1;
		}
	}
	function scrolling() {
		if(o.scrollTop % lh != 0) {
			o.scrollTop += 1;
			if(o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
		} else {
			clearInterval(t);
			setTimeout(start, delay);
		}
	}
	setTimeout(start, delay);
}
//获取视频源
function getTvSource(smac, smodel, schip, ssize, sresolution, sversion, sfmodel, spattern, sappID, sappversion, qappid, qsource, qserviceid, qtype, qdevicebarcode, qtime,qaccessToken) {
	console.log("getTvSource in 获取视频源传的参数---" + "MAC="+smac+"&cModel="+smodel+"&cChip="+schip+"&cSize="+ssize+"&cResolution="+sresolution+"&cTcVersion="+sversion+"&cFMode="+sfmodel+"&cPattern="+spattern+"&vAppID="+sappID+"&vAppVersion="+sappversion);
	var myUrl = "";
	myUrl = "http://movie.tc.skysrt.com/v2/getPolicyByDeviceInfoTypeJsonp";
	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 10000, 
		dataType: 'jsonp',
		jsonp: "callback",
		url: myUrl,
		data: {
			"MAC": smac,
			"cModel": smodel,
			"cChip": schip,
			"cSize": ssize,
			"cResolution": sresolution,
			"cTcVersion": sversion,
			"cFMode": sfmodel,
			"cPattern": spattern,
			"vAppID": sappID,
			"vAppVersion": sappversion
		},
		success: function(data) {
			console.log("getTvSource success..."+JSON.stringify(data));
			_TVSource = data.source;
			updateProductInfosBySource();
		},
		error: function(error) {
			console.log("getTvSource error..."+error);
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("getTVSource complete--"+status);
			if(status=='timeout'){
	 　　　　　 		ajaxTimeoutOne.abort();
	　　　　	}
	　　	}
	});
}
//根据视频源配置页面元素属性:
function updateProductInfosBySource() {
	if(_TVSource == "tencent") {
		_actionid = _activeIdObj.activeIdTencent;
		//更新价格标签,以及转盘(奖品不同)
		var pic = app.rel_html_imgpath(__uri("../images/priceTencent.png"));
		$("#priceLabel").css("background-image", "url("+pic+")");
		pic = app.rel_html_imgpath(__uri("../images/rollTencent.png"));
		$("#rotate").attr("src", pic);
	}else{  
		console.log("默认视频源：yinhe");
		_actionid = _activeIdObj.activeIdIqiyi;
		//更新价格标签,以及转盘(奖品不同)
		var pic = app.rel_html_imgpath(__uri("../images/priceIqiyi.png"));
		$("#priceLabel").css("background-image", "url("+pic+")");
		pic = app.rel_html_imgpath(__uri("../images/rollIqiyi.png"));
		$("#rotate").attr("src", pic);
	}	
	console.log("视频源：" + _TVSource +"_actionid:"+_actionid);

}

function errorToast() {
	document.getElementById("errorToast").style.display = "block";
	setTimeout("document.getElementById('errorToast').style.display = 'none'", 3000);
}
function doingSomething() {
	$("#fourPage").css("z-index", "10");
	$("#fourPage").css("display", "block");
	$("#category1").css("display", "block");
	$("#category2").css("display", "block");
	$("#category3").css("display", "block");
	setTimeout("doingSomething2()", 10);
}
function doingSomething2() {
	$("#fourPage").css("display", "none");
	$("#category1").css("display", "none");
	$("#category2").css("display", "none");
	$("#category3").css("display", "none");
	$("#fourPage").css("z-index", "300");
}

function webBtnClickLog(page_name, button_name, activity_id, activity_name) {
	var _dateObj = {
		"page_name": page_name,
		"button_name": button_name,
		"activity_id": activity_id,
		"activity_name": activity_name
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
//	coocaaosapi.notifyJSLogInfo("web_button_clicked", _dataString, function(message) {
//		console.log(message);
//	}, function(error) {
//		console.log(error);
//	});
}
function webPageShowLog(page_name) {
	var _dateObj = {
		"page_name": page_name
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
//	coocaaosapi.notifyJSLogInfo("web_page_show_new", _dataString, function(message) {
//		console.log(message);
//	}, function(error) {
//		console.log(error);
//	});
}

