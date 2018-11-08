var _macAddress = null;
var _TVmodel = null;
var _TVchip = null;
var _activityId = null;
var _version = null;
var _access_token = null;
var _emmcCID = null;
var _nickName = null;
var _mobile = null;

var _openId = null;
var _loginstatus = null;
var _tencentWay = null;
var _user_flag = null;
var _login_type = null;
var _vuserid = null;
var _qqtoken = null;


var _testurl = "https://restful.skysrt.com";
var _qrurl = "https://webapp.skysrt.com/address/address/index.html?";
var _actionid = null;
var _lotteryCode = 0;
var _remainingTimes = 0;
var _operateTime = 0;
var _source = "";
var _curFocusButton = "productsButton1";
var ttt = null;
var tt = null;
var t15 = 0;

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
		backButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		_source = getQueryString("source");
		_actionid = getQueryString("action");
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
		console.log(_TVmodel+"--"+_TVchip+"--"+_macAddress+"--"+_activityId+"--"+_emmcCID);
		hasLogin(false,0);
	}, function(error) {
		console.log("获取设备信息出现异常。");
	});
}
//初始化接口
function interfaceInit(num) {
	console.log("-------------------->"+ num);
	_actionid = getQueryString("action");
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
	$("#activeruleButton").bind("itemClick", function() {
		_curFocusButton = "activeruleButton";
		$("#secondPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn5"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		webBtnClickLog("720转盘抽奖页面（教育）", "活动规则", _actionid, "720暑假（教育）");
	});
	$("#myprizeButton").bind("itemClick", function() {
		_curFocusButton = "myprizeButton";
		if(_loginstatus == "false") {
			startLogin(false);
		} else {
			$("#noprize").css("display", "none");
			myAwardList();
		}
		webBtnClickLog("720转盘抽奖页面（教育）", "我的奖品", _actionid, "720暑假（教育）");
	});
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
	$("#productsButton1").bind("itemClick", function() {
		buyProducts();
		webBtnClickLog("720转盘抽奖页面（教育）", "720暑假活动（教育）", _actionid, "720暑假（教育）");
	});
	$("#productsButton21").bind("itemClick", function() {
		buyProducts();
		webBtnClickLog("720转盘抽奖页面（教育）", "教育弹窗跳转", _actionid, "720暑假（教育）");
	});
	$("#dialogbutton").bind("itemClick", function() {
		console.log("dialogPage itemClick");
		$("#dialogPage").css("display","none");
		$("#mainPage").css("display","block");
		console.log(_curFocusButton);
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
		webBtnClickLog("720全局弹窗（教育）", "720立即参与（教育）", _actionid, "720暑假（教育）");
		clearTimeout(tt);
	});
	
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
				if(_length > 0) {
					for(var i = 0; i < _length; i++) {
						if(data.data[i].awardExchangeFlag == 0) {
							_exchange ++;
							var _bgimg = '<div awardUrl="' + data.data[i].awardUrl + '" lname="' + data.data[i].awardName + '" activeId="' + data.data[i].activeId + '" awardId="' + data.data[i].awardId + '" awardRememberId="' + data.data[i].lotteryAwardRememberId + '" awardTypeId="' + data.data[i].awardTypeId + '" userKeyId="' + data.data[i].userKeyId + '" class="myprizebtn coocaa_btn2" status="1"><img class="myprizbgimg" src="images/awarding.webp"/><img class="myprizea" src="images/border2.webp"/></div>';
						} else {
							var _bgimg = '<div awardUrl="' + data.data[i].awardUrl + '" lname="' + data.data[i].awardName + '" activeId="' + data.data[i].activeId + '" awardId="' + data.data[i].awardId + '" awardRememberId="' + data.data[i].lotteryAwardRememberId + '" awardTypeId="' + data.data[i].awardTypeId + '" userKeyId="' + data.data[i].userKeyId + '" class="myprizebtn coocaa_btn22" status="0"><img class="myprizbgimg" src="images/awardinged.webp"/></div>';
						}
						var _bgimg0 = '<img class="myprizbgimg0" src="' + data.data[i].awardUrl + '"/>';
						_prizeitem += '<div class="myprizeitem"><div class="myprizimg">' + _bgimg0 + '</div><div class="myprizeinfo"><span>' + data.data[i].awardName + '</span></div>' + _bgimg + '</div><div class="line"></div>';
					}
					$("#myprizebox").append(_prizeitem);
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

		var _name = $(".myprizebtn:eq(" + _index + ")").attr("lname");
		var _imgurl = $(".myprizebtn:eq(" + _index + ")").attr("awardUrl");
		if(_awardTypeId != 2) {
			getMyPrize(1, _name, _activeId, _awardId, _awardRememberId, _awardTypeId, _userKeyId, _imgurl);
		} else {
			showResult(_awardTypeId, _name, _imgurl, _activeId, _awardRememberId, _userKeyId);
		}
	});
}
//开始抽奖
function drawButtonClick() {
	_curFocusButton = "drawButton";
	if(_loginstatus == "false") {
		startLogin(false);
	} else {
		activeBeginstatus(1);
	}
}
//购买产品包
function buyProducts() {
	if(_loginstatus == "false") {
		startLogin(false);
	} else {
		activeBeginstatus(2);
	}
}
function activeBeginstatus(status) {
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
							console.log("没有抽奖机会");
							$(".prizetoast:eq(3)").css("display", "block");
							$("#fourPage").css("display", "block");
							map = new coocaakeymap($(".coocaa_btn4"), document.getElementById("productsButton21"), "btn-focus", function() {}, function(val) {}, function(obj) {});
							webPageShowLog("720产品包弹窗页面（教育）");
						} else {
							startLottery();
						}
					}else if(status == 2){
						console.log("活动已开始时点击了购买产品包");
						coocaaosapi.startMovieMemberCenter3("1", "", function(message) {
							console.log(message);
						}, function(error) {
							console.log(error);
						});
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
	var rotateFn = function(angles, type, name, imgurl, activeId, awardId, rememberId, userKeyId) {
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 2160,
			duration: 3000,
			callback: function() {
				showResult(type, name, imgurl, activeId, rememberId, userKeyId);
				bRotate = !bRotate;
				if(type != 2) {
					getMyPrize(0 ,name, activeId, awardId, rememberId, type, userKeyId, imgurl);
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
				var _cType = data.data.awardTypeId; //实体还是虚体     1-体验卡  2-实体   5-优惠券
				var _cName = data.data.awardName; //奖品名称
				var _seq = data.data.seq; //奖品排序
				var _cImgurl = data.data.awardUrl;
				var _angles = 45 * parseInt(_seq) + 10;

				var _activeId = data.data.activeId;
				var _rememberId = data.data.lotteryAwardRememberId;
				var _userKeyId = data.data.userKeyId;
				var _awardId = data.data.awardId;
				var _imgurl = data.data.awardUrl;
				if(bRotate) return;
				rotateFn(_angles, _cType, _cName, _cImgurl, _activeId, _awardId, _rememberId, _userKeyId);
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
function getMyPrize(area, name, activeId, awardId, awardRememberId, awardTypeId, userKeyId, imgurl) {
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
					showResult(awardTypeId, name, imgurl, activeId, awardRememberId, userKeyId);
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
	if (area == 0) {
		showResult(awardTypeId, name, imgurl, activeId, awardRememberId, userKeyId);
	}
}
//抽奖结果
function showResult(type, name, imgurl, activeId, rememberId, userKeyId) {
	//1-体验卡  2-实体   5-优惠券
	console.log(type + "--" + name + "--" + imgurl);
	console.log(activeId + "--" + rememberId + "--" + userKeyId);
	for(var i = 0; i < $(".prizetoast").length; i++) {
		$(".prizetoast")[i].style.display = "none";
	}
	if(type == 1) {
		$("#yellowtext").html(name);
		$(".prizetoast:eq(0)").css("display", "block");
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else if(type == 2) {
		$("#yellowtext2").html(name);
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
		$("#prizeImg").css("display", "block");
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else if(type == 5) {
		$("#yellowtext4").html(name);
		$(".prizetoast:eq(1)").css("display", "block");
		$("#fourPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else {
		errorToast();
	}
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
	coocaaosapi.notifyJSLogInfo("web_button_clicked", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}
function webPageShowLog(page_name) {
	var _dateObj = {
		"page_name": page_name
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo("web_page_show_new", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}