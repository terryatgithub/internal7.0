var _accountVersion = "";
var _macAddress = null; 
var _TVmodel = null;
var _TVchip = null; 
var _activityId = null;
var _version = null;
var _access_token = null;
var _nickName = null;
var _mobile = null;

var _openId = null; 
var _loginstatus = null;
var _tencentWay = null; 
var _user_flag = null; 
var _login_type = null;
var _vuserid = null; 
var _qqtoken = null;
var timer = null;

var _testurl = "https://restful.skysrt.com";
var _qrurl = "https://webapp.skysrt.com/zy/address/index.html?"
var _actionid = 2;
var _lotteryCode = 0;
var _remainingTimes = 0;
var _operateTime = 0;

var _curOrderId = null;

var _firstlinten = 0;
var _curFocusButton = "productsButton1";

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
		console.log("lxw in initialize");
	},
	bindEvents: function() {
		console.log("in bindEvents");
		$("#other").css("display", "block");
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener('resume', this.onResume, false);
	},
	handleBackButton: function() {
		console.log("lxw Back Button Pressed!");
	},
	onResume: function() {
		console.log("lxw Page onResume!");
		_firstlinten = 0;
	},
	onDeviceReady: function() {
		console.log("lxw in onDeviceReady");
		app.receivedEvent("deviceready");
		app.triggleButton();
	},
	receivedEvent: function(id) {
		console.log("lxw Received Event: " + id);
	},
	handleBackButtonDown: function() {
		console.log("lxw Back Button Down Pressed!");
		backButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		buttonInitBefore();
		startmarquee(400, 30, 0, 1);
		actionInit()

		payListener(); 
		getDeviceInfo(); 
		listenUserChange(); 
		hasLogin(true);

		doingSomething();
		webPageShowLog("720转盘抽奖页面（腾讯）", "720腾讯");
	}
};

app.initialize();

function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log(JSON.stringify(message));
		_TVmodel = message.model;
		_TVchip = message.chip;
		_macAddress = message.mac;
		_activityId = message.activeid;
		_version = message.version;
		console.log("lxw " + _TVmodel + "---" + _TVchip + "----" + _macAddress + "---" + _activityId + "--" + _version);
	}, function(error) {
		console.log("lxw 获取设备信息出现异常。");
	});
}

function hasLogin(needQQ) {
	console.log("lxw in hasLogin");
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		console.log("lxw haslogin " + message.haslogin);
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
			_curFocusButton = "productsButton1";
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			coocaaosapi.getUserInfo(function(message) {
				console.log("lxw " + JSON.stringify(message));
				exterInfo = message.external_info;
				_openId = message.open_id;
				_mobile = message.mobile;
				console.log(_openId);
				_nickName = message.nick_name;
				coocaaosapi.getUserAccessToken(function(message) {
					_access_token = message.accesstoken;
					console.log("lxw " + _access_token);
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
					interfaceInit(0);
				}, function(error) {
					console.log(error);
				})
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
	coocaaosapi.addUserChanggedListener(function(message) {
		hasLogin(true);
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
		if(deviceInfo.version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
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
			console.log("lxw " + _curFocusButton);
			map = new coocaakeymap($(".coocaa_btn2"), document.getElementsByClassName("coocaa_btn2")[_curFocusButton], "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			console.log("lxw " + _curFocusButton);
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		document.getElementById("errorToast2").style.display = "block";
		setTimeout("document.getElementById('errorToast2').style.display = 'none'", 3000);
	}
}
//监听支付
function payListener() {
	coocaaosapi.addPurchaseOrderListener(function(message) {
		console.log("lxw 支付结果= " + JSON.stringify(message));
		if(_firstlinten == 0) {
			_firstlinten = 1;
			if(message.presultstatus == 0) {
				console.log("lxw 支付成功--重新获取抽奖次数");
				if(document.getElementById("category3").style.display == "block") {
					document.getElementById("category3").style.display = "none";
					document.getElementById("fourPage").style.display = "none"
				}
				_curFocusButton = "drawButton";
				setTimeout("interfaceInit(0)", 1000);
				webPayResultLog(_curOrderId, "20180720暑期活动成功");
			} else {
				console.log("lxw 支付失败");
				webPayResultLog(_curOrderId, "20180720暑期活动失败");
			}
		}
	});
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

function buttonInitBefore() {
	$("#activeruleButton").bind("itemClick", function() {
		_curFocusButton = "activeruleButton";
		$("#secondPage").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		webBtnClickLog("720转盘抽奖页面（腾讯）", "活动规则", _actionid, "720暑假（腾讯）", "720腾讯", "-1");
	});
	$("#myprizeButton").bind("itemClick", function() {
		_curFocusButton = "myprizeButton";
		if(_loginstatus == "false") {
			startLogin(true);
		} else {
			$("#noprize").css("display", "none");
			myAwardList(0);
		}
		webBtnClickLog("720转盘抽奖页面（腾讯）", "我的奖品", _actionid, "720暑假（腾讯）", "720腾讯", "-1");
	});
	$(".coocaa_btn3").bind("itemClick", function() {
		var _index = $(".coocaa_btn3").index($(this));
		$("#fourPage").css("display", "none");
		var _curId = $(this).attr("id");
		if(_curId == "gotoedu") {
			gotoEducation();
		} else {
			if(document.getElementById("thirdPage").style.display == "block") {
				console.log("lxw " + _curFocusButton);
				map = new coocaakeymap($(".coocaa_btn2"), document.getElementsByClassName("coocaa_btn2")[_curFocusButton], "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				console.log("lxw " + _curFocusButton);
				map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		}
	});

	$(".products").bind("itemClick", function() {
		var _clickIndex = $(".products").index($(this));
		buyProducts(_clickIndex, 0);
	});
	$(".coocaa_btn4").bind("itemClick", function() {
		var _clickIndex = $(".coocaa_btn4").index($(this));
		buyProducts(_clickIndex, 1);
	});
	bindAgain();
}

//重新绑定
function bindAgain() {
	$("#drawButton").unbind("itemClick").bind("itemClick", function() {
		drawButtonClick();
		$("#drawButton").unbind("itemClick");
		setTimeout("bindAgain()", 3000);
		webBtnClickLog("720转盘抽奖页面（腾讯）", "开始抽奖", _actionid, "720暑假（腾讯）", "720腾讯", "-1");
	});
}

//开始抽奖
function drawButtonClick() {
	_curFocusButton = "drawButton";
	if(_loginstatus == "false") {
		startLogin(true);
	} else {
		activeBeginstatus();
	}
}

function activeBeginstatus() {
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
			console.log("lxw " + JSON.stringify(data));
			if(data.code == "50100") {
				var _beginTime = data.data.activeBeginTime;
				var _endTime = data.data.activeEndTime;
				var _sysTime = data.data.sysTime;
				console.log(_beginTime+"--"+_endTime+"--"+_sysTime);
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
				if(menmber_activity_begin>menmber_activity_sys){
					console.log("活动未开始");
					$("#fourPage").css("display","block");
					$("#category5").css("display","block");
					map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				}else if(menmber_activity_end<menmber_activity_sys){
					console.log("活动已结束");
					$("#fourPage").css("display","block");
					$("#category6").css("display","block");
					map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				}else{
					console.log("活动已开始");
					if(_remainingTimes == 0) {
						console.log("lxw 没有抽奖机会");
						$(".prizetoast:eq(3)").css("display", "block");
						$("#fourPage").css("display", "block");
						map = new coocaakeymap($(".coocaa_btn4"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
						webPageShowLog("720产品包弹窗页面（腾讯）", "720腾讯");
					}else{
						startLottery();
					}
				}
			}
		},
		error: function() {
			console.log('lxw 获取中奖名单失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("lxw -------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}　　
		}
	});
}
//购买产品包
function buyProducts(index, area) {
	console.log("lxw " + index);
	console.log("lxw " + _loginstatus);
	if(_loginstatus == "false") {
		startLogin(true);
	} else {
		if(index == 0) {
			order("952", "年卡", "19200", "1920046800", 0, area);
		} else if(index == 1) {
			order("953", "季卡", "6800", "680012000", 1, area);
		}
	}
}
//点击产品包
function order(id, title, price, discount, category, area) {
	if(_vuserid == undefined) {
		_vuserid = "";
	}
	_firstlinten = 0;
	console.log("lxw " + _access_token + "---" + _macAddress + "---" + _TVchip + "---" + _TVmodel);
	console.log("lxw " + _login_type + "---" + _qqtoken + "---" + _vuserid);
	var data = JSON.stringify({
		user_id: _access_token,
		user_flag: 1,
		third_user_id: _qqtoken,
		product_id: id,
		movie_id: "",
		node_type: "res",
		client_type: 4,
		title: title, //产品包名称
		price: price, //原产品价格
		count: 1, //数量
		discount_price: discount, //支付价格
		coupon_codes: "",
		auth_type: 0,
		mac: _macAddress, //mac
		chip: _TVchip, //chip
		model: _TVmodel, //model
		extend_info: {
			"login_type": _login_type,
			"wx_vu_id": _vuserid
		},
	})
	var data1 = encodeURIComponent(data);
	console.log("lxw " + data);
	$.ajax({
		type: "get",
		async: true,
		url: "https://api-business.skysrt.com/v3/order/genOrderByJsonp.html?data=" + data1, //需改
		dataType: "jsonp",
		jsonp: "callback",
		timeout: 20000,
		success: function(data) {
			console.log("lxw 返回状态：" + JSON.stringify(data));
			if(data.code == 0) {
				orderId = data.data.orderId;
				_curOrderId = data.data.orderId;
				console.log("lxw 订单编号1：" + orderId);
				coocaaosapi.purchaseOrder2(data.data.appcode, data.data.orderId, data.data.orderTitle, data.data.back_url, data.data.total_pay_fee, "虚拟", "com.webviewsdk.action.pay", "pay", _access_token, _mobile,  function(success)  {
					console.log("lxw " + success);
				}, function(error) {
					console.log(error);
				});
				if(category == 0) {
					if(area == 0) {
						webBtnClickLog("720转盘抽奖页面（腾讯）", "包年", _actionid, "720暑假（腾讯）", "720腾讯", _curOrderId);
					} else {
						webBtnClickLog("720产品包弹窗页面（腾讯）", "包年(弹窗)", _actionid, "720暑假（腾讯）", "720腾讯", _curOrderId);
					}
				} else {
					if(area == 0) {
						webBtnClickLog("720转盘抽奖页面（腾讯）", "包季", _actionid, "720暑假（腾讯）", "720腾讯", _curOrderId);
					} else {
						webBtnClickLog("720产品包弹窗页面（腾讯）", "包季(弹窗)", _actionid, "720暑假（腾讯）", "720腾讯", _curOrderId);
					}
				}
			} else {
				console.log("lxw -----------异常---------" + data.msg);
				errorToast();
			}
		},
		error: function() {
			console.log("lxw -----------访问失败---------");
			errorToast();
		}
	});
}

//点击返回
function backButtonFunc() {
	var _topPage = "firstlevel";
	var page2 = document.getElementById("secondPage").style.display;
	var page3 = document.getElementById("thirdPage").style.display;
	var page4 = document.getElementById("fourPage").style.display;
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
			$("#secondPage").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("activeruleButton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			clearTimeout(timer);
			actionInit();
		} else if(page3 == "block") {
			$("#thirdPage").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("myprizeButton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			clearTimeout(timer);
			actionInit();
		} else {
			navigator.app.exitApp();
		}
	}
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
					getMyPrize0(name, activeId, awardId, rememberId, type, userKeyId, imgurl);
				}
			}
		})
	};
	console.log("lxw " + _openId + "--" + _TVmodel + "--" + _TVchip + "--" + _macAddress + "--" + _activityId);
	console.log("lxw " + _nickName + "--" + _lotteryCode + "--" + _remainingTimes + "--" + _access_token + "--" + _operateTime);
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
			console.log("lxw " + JSON.stringify(data));
			console.log(data.code);
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
			console.log("lxw -------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}　　
		}
	});
}

function actionInit() {
	console.log("lxw  in  actionInit");
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/info",
		data: {
			"id": _actionid,
			"operateNumber": 1
		},
		success: function(data) {
			console.log("lxw " + JSON.stringify(data));
			if(data.code == "50100") {
				for(var i = 0; i < data.data.winNews.length; i++) {
					var _div = '<li><span class="testspan1">' + data.data.winNews[i].userNickName + '</span><span class="testspan2">' + data.data.winNews[i].awardName + '</span><span class="testspan3">' + data.data.winNews[i].awardTime.split(' ')[0] + '</span></li>';
					$("#awardul").append(_div);
				}
			}
		},
		error: function() {
			console.log('lxw 获取中奖名单失败');
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("lxw -------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}　　
		}
	});
	timer = setTimeout(actionInit, 1800000); //设置为半小时
}
//初始化接口
function interfaceInit(num) {
	console.log("lxw " + _actionid + "--" + _openId + "--" + _TVmodel + "--" + _TVchip + "--" + _macAddress + "--" + _activityId + "--" + _nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/init",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cModel": _TVmodel,
			"cChip": _TVchip,
			"MAC": _macAddress,
			"cUDID": _activityId,
			"cNickName": _nickName
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				_remainingTimes = data.data.remainingTimes;
				_operateTime = data.data.usedTimes;
				if(_remainingTimes > 0) {
					_lotteryCode = data.data.lotteryCode;
					console.log("lxw " + _lotteryCode);
					_curFocusButton = "drawButton";
				} else {
					_lotteryCode = 0;
					_remainingTimes = 0;
					_operateTime = 0;
					_curFocusButton = "productsButton1";
				}
			} else {
				_lotteryCode = 0;
				_remainingTimes = 0;
				_operateTime = 0;
				_curFocusButton = "productsButton1";
			}
			console.log("lxw " + _remainingTimes);
			document.getElementById("lotterynumber").innerHTML = _remainingTimes;
			console.log("num= " + num);
			if(num == 0) {
				map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curFocusButton), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		},
		error: function() {
			console.log('lxw 初始化失败失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("lxw -------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}　　
		}
	});
}
//展示我的奖品
function myAwardList(num) {
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
			"cOpenId": _openId,
			"cModel": _TVmodel,
			"cChip": _TVchip,
			"MAC": _macAddress,
			"cUDID": _activityId,
			"cNickName": _nickName
		},
		success: function(data) {
			console.log("lxw " + JSON.stringify(data));
			if(data.code == "50100") {
				$("#myprizebox").innerHTML = "";
				var _length = data.data.length;
				console.log("lxw " + _length);
				var _prizeitem = "";
				if(_length > 0) {
					for(var i = 0; i < _length; i++) {
						if(data.data[i].awardExchangeFlag == 0) {
							var _bgimg = '<div awardUrl="' + data.data[i].awardUrl + '" lname="' + data.data[i].awardName + '" activeId="' + data.data[i].activeId + '" awardId="' + data.data[i].awardId + '" awardRememberId="' + data.data[i].lotteryAwardRememberId + '" awardTypeId="' + data.data[i].awardTypeId + '" userKeyId="' + data.data[i].userKeyId + '" class="myprizebtn coocaa_btn2" status="1"><img class="myprizbgimg" src="images/awarding.webp"/><img class="myprizea" src="images/border2.webp"/></div>';
						} else {
							var _bgimg = '<div awardUrl="' + data.data[i].awardUrl + '" lname="' + data.data[i].awardName + '" activeId="' + data.data[i].activeId + '" awardId="' + data.data[i].awardId + '" awardRememberId="' + data.data[i].lotteryAwardRememberId + '" awardTypeId="' + data.data[i].awardTypeId + '" userKeyId="' + data.data[i].userKeyId + '" class="myprizebtn coocaa_btn22" status="0"><img class="myprizbgimg" src="images/awardinged.webp"/></div>';
						}
						var _bgimg0 = '<img class="myprizbgimg0" src="' + data.data[i].awardUrl + '"/>';
						_prizeitem += '<div class="myprizeitem"><div class="myprizimg">' + _bgimg0 + '</div><div class="myprizeinfo"><span>' + data.data[i].awardName + '</span></div>' + _bgimg + '</div><div class="line"></div>';
					}
					$("#myprizebox").append(_prizeitem);
					$("#thirdPage").css("display", "block");
					map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
					creatButtonInit();
				} else {
					$("#noprize").css("display", "block");
					$("#thirdPage").css("display", "block");
				}
			} else {
				if(num == 0) {
					errorToast();
				}
			}
		},
		error: function() {
			console.log('lxw 获取我的奖品失败');
			if(num == 0) {
				errorToast();
			}
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("lxw -------------complete------------------" + status);
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
			duration: 300,
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
		console.log("lxw " + _activeId + "--" + _awardId + "--" + _awardRememberId);
		console.log("lxw " + _awardTypeId + "--" + _userKeyId + "--" + _imgurl);
		if(_awardTypeId != 2) {
			getMyPrize1(_name, _activeId, _awardId, _awardRememberId, _awardTypeId, _userKeyId, _imgurl);
		} else {
			showResult(_awardTypeId, _name, _imgurl, _activeId, _awardRememberId, _userKeyId);
		}
	});
}

//点击抽奖时的虚拟奖的激活
function getMyPrize0(name, activeId, awardId, awardRememberId, awardTypeId, userKeyId, imgurl) {
	var _mac = _macAddress;
	console.log("lxw " + activeId + "--" + awardId + "--" + awardRememberId + "--" + awardTypeId + "--" + userKeyId + "--" + _macAddress + "--" + imgurl);
	var ajaxTimeoutThree = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v2/lottery/verify/receive",
		data: {
			"activeId": activeId,
			"awardId": awardId,
			"awardRememberId": awardRememberId,
			"awardTypeId": awardTypeId,
			"userKeyId": userKeyId,
			"MAC": _macAddress
		},
		success: function(data) {
			console.log("lxw " + JSON.stringify(data));
		},
		error: function() {
			console.log('lxw 立即领取失败');
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("lxw -------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutThree.abort();
			}
		}
	});
	showResult(awardTypeId, name, imgurl, activeId, awardRememberId, userKeyId);
}
//我的奖品页点击立即领取
function getMyPrize1(name, activeId, awardId, awardRememberId, awardTypeId, userKeyId, imgurl) {
	var _mac = _macAddress;
	console.log("lxw " + activeId + "--" + awardId + "--" + awardRememberId + "--" + awardTypeId + "--" + userKeyId + "--" + _macAddress + "--" + imgurl);
	var ajaxTimeoutThree = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v2/lottery/verify/receive",
		data: {
			"activeId": activeId,
			"awardId": awardId,
			"awardRememberId": awardRememberId,
			"awardTypeId": awardTypeId,
			"userKeyId": userKeyId,
			"MAC": _macAddress
		},
		success: function(data) {
			console.log("lxw " + JSON.stringify(data));
			if(data.code == "50100") {
				showResult(awardTypeId, name, imgurl, activeId, awardRememberId, userKeyId);
			} else {
				errorToast();
			}
		},
		error: function() {
			console.log('lxw 立即领取失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("lxw -------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutThree.abort();
			}
		}
	});
}

//抽奖结果
function showResult(type, name, imgurl, activeId, rememberId, userKeyId) {
	//1-体验卡  2-实体   5-优惠券
	console.log("lxw " + type + "--" + name + "--" + imgurl);
	console.log("lxw " + activeId + "--" + rememberId + "--" + userKeyId);
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

function webBtnClickLog(page_name, button_name, activity_id, activity_name, c_source, order_no) {
	var _dateObj = {
		"page_name": page_name,
		"button_name": button_name,
		"activity_id": activity_id,
		"activity_name": activity_name,
		"c_source": c_source,
		"order_no": ""
	}
	if(order_no == "-1") {
		_dateObj.order_no = "";
	} else {
		_dateObj.order_no = order_no;
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo("web_button_clicked", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

function webPageShowLog(page_name, c_source) {
	var _dateObj = {
		"page_name": page_name,
		"c_source": c_source
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo("web_page_show_new", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

function webPayResultLog(order_no, rusult) {
	var _dateObj = {
		"order_no": order_no,
		"rusult": rusult
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo("pay_result", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}