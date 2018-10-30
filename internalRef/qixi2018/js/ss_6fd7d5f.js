var _tencentWay = null;
var _user_flag = null;
var _login_type = null;
var _vuserid = null;
var _qqtoken = null;
var _mobile = null;

var _testurl = "https://restful.skysrt.com";
var enurl = "https://webapp.skysrt.com/qx/qixi/address.html?";
var wishurl = "https://webapp.skysrt.com/qx/qixi/wish.html?";

var _version = null;
var _actionid = null;
var _source = null;
var _mac = null;
var _chip = null;
var _model = null;
var _emmcCID = null;
var _udid = null;
var _accessToken = null;
var _openId = null;
var _nickName = null;

var _lotteryCode = 0;
var _remainingTimes = 0;
var _operateTime = 0;
var _rememberId = "";
var _userKeyId = "";
var _actionStatus = "";
var _loginstatus = null;

var t,tt,ttt,tttt = 0;
var _firstlisten = 0;
var _curOrderId = null;
var _curFocusButton = "salvage";
var showTextArray = [];
var showAuthorArray = [];
var showTimeArray = [];
var showAwardName = [];
var showAwardwinner = [];

var _curBtnId = "";
var _curBtnIndex = 0;

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
		_actionid = getQueryString("action");
		_source = getQueryString("source");
		console.log(_actionid+"--"+_source);
	},
	bindEvents: function() {
		console.log("in bindEvents");
		$("#other").css("display", "block");
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener('resume', this.onResume, false);
		document.addEventListener("pause", this.pause, false);
	},
	handleBackButton: function() {
		console.log("lxw Back Button Pressed!");
	},
	onResume: function() {
		console.log("--------------------->Page onResume!");
		_firstlisten = 0;
		onResumeFunc();
	},
	pause: function() {

	},
	onDeviceReady: function() {
		console.log("onDeviceReady");
		app.receivedEvent("deviceready");
		app.triggleButton();
		coocaaosapi.addCommonListener(function(message) {
			console.log("--------------->commonListen==" + message.web_player_event);
			if(message.web_player_event == "on_complete") {
				var _cAwardid = $("#choiceitem3").attr("awardId");
				var _cRememberId = $("#choiceitem3").attr("rememberId");
				var _cType = $("#choiceitem3").attr("typeId");
				var _cUserkeyid = $("#choiceitem3").attr("userkeyId");
				sendPrizes(_cAwardid, _cRememberId, _cType, _cUserkeyid, _openId);
				$("#category2").css("display", "none");
				$("#dialogPage").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		});
	},
	receivedEvent: function(id) {
	},
	handleBackButtonDown: function() {
		backButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		buttonInitBefore();
		payListener();
		getDeviceInfo();
		listenUserChange();
		if (_source == "aiqiyi") {
			hasLogin(false);
		} else{
			hasLogin(true);
		}
	}
};

app.initialize();

function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log(JSON.stringify(message));
		_model = message.model;
		_chip = message.chip;
		_mac = message.mac;
		
		if (message.emmcid ==""||message.emmcid==null) {
			_emmcCID = "123456";
		} else{
			_emmcCID = message.emmcid;
		}
		_udid = message.activeid;
		_version = message.version;
		_userKeyId = _udid;
		actionInit(100);
	}, function(error) {
		console.log("获取设备信息出现异常。");
	});
}
//判断是否登录
function hasLogin(needQQ) {
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
			_lotteryCode = 0;
			_remainingTimes = 0;
			_operateTime = 0;
		} else {
			coocaaosapi.getUserInfo(function(message) {
				exterInfo = message.external_info;
				_openId = message.open_id;
				_mobile = message.mobile;
				console.log(_openId);
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
					actionInit(3);
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

		if (_source == "aiqiyi") {
			hasLogin(false);
		} else{
			hasLogin(true);
		}
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
//跳转指定优惠券页面
function gotoUseCoupon(_id, _business) {
	console.log("------------------->" + _id + "--" + _business);
	if(_business == "tvmall") {
		console.log("跳转到商城");
		if(_id == "325") {
			coocaaosapi.startAppShopZone("15904", function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		} else if(_id == "326") {
			coocaaosapi.startAppShopZone("14868", function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		} else if(_id == "336") {
			coocaaosapi.startAppShopZone("13720", function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		} else if(_id == "337") {
			coocaaosapi.startAppShopZone3("104", function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		}
	} else if(_business == "movie") {
		console.log("跳转到影视");
		if (_source == "aiqiyi") {
			coocaaosapi.startMovieMemberCenter2("0", "1", function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		} else{
			coocaaosapi.startEduMemberCenter("0","5",function(message) {console.log(message);}, function(error) {console.log(error);});
		}
	} else if(_business == "edu") {
		console.log("跳转到教育");
		coocaaosapi.startMovieMemberCenter2("1", "17", function(message) {
			console.log(message);
		}, function(error) {
			console.log(error);
		});
	}
}
//监听支付
function payListener() {
	coocaaosapi.addPurchaseOrderListener(function(message) {
		console.log("lxw 支付结果= " + JSON.stringify(message));
		if(_firstlisten == 0) {
			_firstlisten = 1;
			if(message.presultstatus == 0) {
				console.log("lxw 支付成功--重新获取抽奖次数");
				$("#dialog61").css("display", "none");
				$("#dialog62").css("display", "none");
				$("#category6").css("display", "none");
				$("#dialogPage").css("display", "none");
				if(document.getElementById("awardPage").style.display == "block") {
					map = new coocaakeymap($(".coocaa_btn4"), document.getElementById("flyBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				} else {
					map = new coocaakeymap($(".coocaa_btn"), document.getElementById("flyBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				}
				afterDoneFunc();
			} else {
				console.log("支付失败");
			}
		}
	});
}
function buttonInitBefore() {
	$(".coocaa_btn").bind("itemClick", function() {
		var _index = $(".coocaa_btn").index($(this));
		$("#showBox").css("display", "none");
		if(_index == 1) {
			console.log("点击了我要告白。");
			_curBtnId = "dreamFly";
			professClicked();
			var pagename = "dsf_main_page_want_express_button_onclcik";
			var _dateObj = {}
			webBtnClickLog(pagename, _dateObj);
			
			var _dateObj2 = {
				"page_name": "dsf_express_card_page"
			}
			pngageShowLog(_dateObj2);
		} else if(_index == 2) {
			console.log("点击了我的愿想。");
			_curBtnId = "mydream";
			getMyDream();
			var logname = "dsf_main_page_my_express_button_onclick";
			var _dateObj = {}
			webBtnClickLog(logname, _dateObj);
		} else if(_index == 3) {
			console.log("点击了我的奖品。");
			_curBtnId = "myaward";
			actionInit(1);
			var logname = "dsf_my_award_button_onclick";
			var _dateObj = {}
			webBtnClickLog(logname, _dateObj);
		} else if(_index == 4) {
			console.log("点击了更多规则。");
			_curBtnId = "rules";
			$("#rulesPage").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn5"), document.getElementById("rules1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			var pagename = "dsf_rules_button_onclick";
			var _dateObj = {}
			webBtnClickLog(pagename, _dateObj);
		}
	});
	$("#flyBox").bind("itemClick", function() {
		_curBtnId = "flyBox";
		gotoFly(1);
	});
	$("#fresh").bind("itemClick", function() {
		_curBtnId = "fresh";
		var _textArray1 = ["七夕佳节，愿阖家安康。", "天涯明月新，朝暮最相思。", "让风悄悄告诉你，我喜欢你。", "谢谢你，陪我走过半世浮华。", "纵有万般野心，却只为你一人。", "七夕今宵看碧霄，牵牛织女渡河桥。", "有你相伴的日子，即使平凡也浪漫。", "祝天下有情人在七夕佳节终成眷属。", "我要与你结发为夫妻，恩爱两不疑。"];
		var _textArray2 = ["我能想到最浪漫的事，就是和你一起变老。", "我不要短暂的温存，只要你一世的陪伴。", "曾经迷惘的心中，是你牵引我走出寂寞。", "我喜欢春晨、夏日、秋夜、冬雪和你。", "愿我的爱人家人岁岁平安，万事如意！", "感谢遇到你，因为你我想要成为更好的人。", "想要牵着你的手，从现在走到时间的尽头。", "你是我人生最美的风景，亲爱的，七夕快乐！", "死生契阔，与子成悦。执子之手，与子偕老。"];
		var _hashArray1 = getRandomArrayElements(_textArray1, 3);
		var _hashArray2 = getRandomArrayElements(_textArray2, 3);
		changeTheDate(_hashArray1, _hashArray2);
	});
	$(".moulds").bind("itemClick", function() {
		_curBtnId = "flyBox";
		var _index = $(".moulds").index($(this));
		$("#curtext")[0].innerHTML = $(".mouldsText1")[_index].innerHTML;
		$("#errorToast").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("flyBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#nullDream").bind("itemClick", function() {
		_curBtnId = "nullDream";
		$("#homePage").css("display", "block");
		$("#showBox").css("display", "block");
		$("#dreamPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("dreamFly"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#nullAward").bind("itemClick", function() {
		_curBtnId = "nullAward";
		$("#homePage").css("display", "block");
		$("#showBox").css("display", "block");
		$("#awardPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("salvage"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$(".coocaa_btn5").unbind("focus").bind("focus", function() {
		var _index = $(".coocaa_btn5").index($(this));
		var _eachheight = "1080";
		var myScrollTopValue = 0;
		myScrollTopValue = _index * _eachheight;
		$("#rulesBox").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing"});
	});
	choiceClickFunc();
	professClickFunc();
	couponClickFunc();
	packageClickFunc();
	redClickFunc();
	entityClickFunc();

	bindAgain();
}

function couponClickFunc() {
	$("#getrightnow").bind("itemClick", function() {
		_curBtnId = "getrightnow";
		console.log("弹窗+优惠券+已登录 ==== 去使用");
		$("#dialog31").css("display", "none");
		$("#category3").css("display", "none");
		$("#dialogPage").css("display", "none");
		$("#showBox").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		var _type = $("#getAgain").attr("couponType");
		var _business = $("#getAgain").attr("couponBusiness");
		gotoUseCoupon(_type, _business);
	});
	$("#gotoLogin").bind("itemClick", function() {
		console.log("弹窗+优惠券+未登录 ==== 去登录");
		_curBtnId = "gotoLogin";
		if (_source == "aiqiyi") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	$("#getAgain").bind("itemClick", function() {
		console.log("奖品页+优惠券+未领取+已登录 === 重新领取");
		_curBtnId = "getAgain";
		$("#dialog32").css("display", "none");
		$("#category3").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn4"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		var _cAwardid = $("#getAgain").attr("awardId");
		var _cRememberId = $("#getAgain").attr("rememberId");
		var _cType = $("#getAgain").attr("typeId");
		var _cUserkeyid = $("#getAgain").attr("userkeyId");
		console.log(_cAwardid + "--" + _cRememberId + "--" + _cType + "--" + _cUserkeyid + "--" + _openId);
		sendPrizes(_cAwardid, _cRememberId, _cType, _cUserkeyid, _openId);
	});
	$("#gotoUse").bind("itemClick", function() {
		console.log("奖品页+优惠券+已领取+已登录 === 去使用");
		_curBtnId = "gotoUse";
		$("#dialog32").css("display", "none");
		$("#category3").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("coocaa_btn4")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
		var _type = $("#getAgain").attr("couponType");
		var _business = $("#getAgain").attr("couponBusiness");
		gotoUseCoupon(_type, _business);
	});
	$("#gotoLogin2").bind("itemClick", function() {
		console.log("奖品页+优惠券+未领取+未登录 === 去登录");
		_curBtnId = "gotoLogin2";
		if (_source == "aiqiyi") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	$("#coupon_qrcode1").bind("itemClick", function() {
		console.log("优惠券+第三方");
		_curBtnId = "coupon_qrcode1";
		$("#dialog91").css("display", "none");
		$("#category9").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#coupon_qrcode2").bind("itemClick", function() {
		console.log("优惠券+第三方");
		_curBtnId = "coupon_qrcode2";
		$("#dialog92").css("display", "none");
		$("#category9").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("coocaa_btn4")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
}

function choiceClickFunc() {
	$("#choiceitem3").bind("itemClick", function() {
		console.log("点击了去做任务");
		_curBtnId = "choiceitem3";
		var _cName = $("#choiceitem3").attr("videoName");
		var _cUrl = $("#choiceitem3").attr("videoUrl");
		console.log(_cName+"--"+_cUrl);
		coocaaosapi.startCommonWebview("qxhd", _cUrl, _cName, "1080", "1920", "", "视频广告", "赢机会任务弹窗", function(message) {
			console.log(message);
		}, function(error) {
			console.log("commonTask----error");
		});
	});
}

function professClickFunc() {
	$("#category1").bind("itemClick", function() {
		_curBtnId = "category1";
		$("#category1").css("display", "none");
		$("#dialogPage").css("display", "none");
		if(document.getElementById("dreamPage").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn3"), document.getElementsByClassName("coocaa_btn3")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			$("#showBox").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	});
	$("#success_home").bind("itemClick", function() {
		console.log("告白成功+去主页");
		_curBtnId = "success_home";
		$("#category7").css("display", "none");
		$("#dialogPage").css("display", "none");
		$("#flyPage").css("display", "none");
		$("#showBox").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#success_profess").bind("itemClick", function() {
		console.log("告白成功+返回告白页");
		_curBtnId = "success_profess";
		$("#category7").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#failure_again").bind("itemClick", function() {
		console.log("告白失败+再次提交");
		_curBtnId = "failure_again";
		$("#category8").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		gotoFly(2);
	});
	$("#failure_latter").bind("itemClick", function() {
		console.log("告白失败+返回主页");
		_curBtnId = "failure_latter";
		$("#category8").css("display", "none");
		$("#dialogPage").css("display", "none");
		$("#flyPage").css("display", "none");
		$("#showBox").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
}

function packageClickFunc() {
	$("#package_no").bind("itemClick", function() {
		console.log("弹窗+产品包+未登录");
		_curBtnId = "package_no";
		if (_source == "aiqiyi") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	$("#package_yes").bind("itemClick", function() {
		console.log("弹窗+产品包+已登录");
		if (_source == "aiqiyi") {
			order("1037", "七夕优惠券-爱奇艺-12个月", "24000", "49800");
		} else{
			order("1036", "七夕优惠券-12个月-腾讯", "19000", "46800");
		}
	});
	$("#package_buy").bind("itemClick", function() {
		console.log("奖品页+产品包");
		_curBtnId = "package_buy";
		if (_loginstatus == "false") {
			if (_source == "aiqiyi") {
				startLogin(false);
			} else{
				startLogin(true);
			}
		} else{
			if (_source == "aiqiyi") {//奇艺
				order("1037", "七夕优惠券-爱奇艺-12个月", "24000", "49800");
			} else{
				order("1036", "七夕优惠券-12个月-腾讯", "19000", "46800");
			}
		}
	});
}

function redClickFunc() {
	$("#redQrcode").bind("itemClick", function() {
		_curBtnId = "redQrcode";
		console.log("弹窗+红包+已登录");
		$("#category4").css("display", "none");
		$("#dialogPage").css("display", "none");
		$("#showBox").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#redNologin").bind("itemClick", function() {
		console.log("弹窗+红包+未登录");
		_curBtnId = "redNologin";
		if (_source == "aiqiyi") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	$("#redHasGot").bind("itemClick", function() {
		console.log("奖品页+红包+已领取");
		_curBtnId = "redHasGot";
		$("#dialog42").css("display", "none");
		$("#category4").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("coocaa_btn4")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#redNologin2").bind("itemClick", function() {
		console.log("奖品页+红包+未领取+未登录");
		_curBtnId = "redNologin2";
		if (_source == "aiqiyi") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	$("#redNotGet").bind("itemClick", function() {
		console.log("奖品页+红包+未领取+已登录");
		_curBtnId = "redNotGet";
		$("#dialog42").css("display", "none");
		$("#category4").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("coocaa_btn4")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
}

function entityClickFunc() {
	$("#entityAward_no").bind("itemClick", function() {
		console.log("弹窗+实体奖+未登录");
		_curBtnId = "entityAward_no";
		if (_source == "aiqiyi") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	$("#entityQrcode").bind("itemClick", function() {
		console.log("弹窗+实体奖+已登录");
		_curBtnId = "entityQrcode";
		$("#dialog50").css("display", "none");
		$("#category5").css("display", "none");
		$("#dialogPage").css("display", "none");
		$("#showBox").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#myAwardYes").bind("itemClick", function() {
		console.log("奖品页+实体奖+已领取");
		_curBtnId = "myAwardYes";
		$("#dialog51").css("display", "none");
		$("#category5").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("coocaa_btn4")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#myAwardNoLogin").bind("itemClick", function() {
		console.log("奖品页+实体奖+未登录+未领取");
		_curBtnId = "myAwardNoLogin";
		if (_source == "aiqiyi") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	$("#myAwardLogined").bind("itemClick", function() {
		console.log("奖品页+实体奖+已登录+未领取");
		_curBtnId = "myAwardLogined";
		$("#dialog51").css("display", "none");
		$("#category5").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("coocaa_btn4")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
}
//重新绑定
function bindAgain() {
	$("#salvage").unbind("itemClick").bind("itemClick", function() {
		_curBtnId = "salvage";
		lotteryClicked();
		$("#salvage").unbind("itemClick");
		setTimeout("bindAgain()", 3000);
	});
}

function buttonInitAfter() {
	$(".coocaa_btn4").unbind("focus").bind("focus", function() {
		var _index = $(".coocaa_btn4").index($(this));
		var _eachheight = $(".awardItembox")[0].offsetHeight;
		var myScrollTopValue = 0;
		myScrollTopValue = _index * _eachheight;
		$("#myAwardBox").stop(true, true).animate({
			scrollTop: myScrollTopValue
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
		});
	});
	$(".coocaa_btn3").unbind("focus").bind("focus", function() {
		var _index = $(".coocaa_btn3").index($(this));
		var _eachheight = $(".dreamItembox")[0].offsetHeight;
		var myScrollTopValue = 0;
		myScrollTopValue = _index * _eachheight;
		$("#myDreamBox").stop(true, true).animate({
			scrollTop: myScrollTopValue
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
		});
	});
	$(".coocaa_btn3").unbind("itemClick").bind("itemClick", function() {
		var _index = $(".coocaa_btn3").index($(this));
		_curBtnIndex = _index;
		var _curText = $(".dreamText1")[_index].innerHTML;
		var _curTime = $(".dreamText2")[_index].innerHTML;
		var _curName = $(".dreamText1:eq(" + _index + ")").attr("wishName");
		var _curCardId = $(".dreamText1:eq(" + _index + ")").attr("wishId");
		$("#dialogPage").css("display", "block");
		$("#category1").css("display", "block");
		showProfessCard(_curTime, _curText, _curName, _curCardId);
		map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("category1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});

	$(".coocaa_btn4").unbind("itemClick").bind("itemClick", function() {
		var _index = $(".coocaa_btn4").index($(this));
		_curBtnIndex = _index;
		var _status = $(".awardText2:eq(" + _index + ")").attr("status");
		var _lawardId = $(".awardText2:eq(" + _index + ")").attr("awardId");
		var _lrememberId = $(".awardText2:eq(" + _index + ")").attr("rememberId");
		var _lawardTypeId = $(".awardText2:eq(" + _index + ")").attr("typeId");
		var _lawardUrl = $(".awardText2:eq(" + _index + ")").attr("awardUrl");
		var _luserAwardKey = $(".awardText2:eq(" + _index + ")").attr("userAwardKey");
		var _lawardInfo = $(".awardText2:eq(" + _index + ")").attr("awardInfo");
		var _luserKeyId = $(".awardText2:eq(" + _index + ")").attr("userKeyId");

		var _lawardName = $(".awardText1")[_index].innerHTML;
		var _lawardTime = $(".awardText3")[_index].innerHTML;
		if(_status == 0) {
			console.log("待领取");
			showTheAward(1, _lawardTypeId, _lawardUrl, _lawardId, _lrememberId, _lawardName, _lawardTime, _luserAwardKey, _lawardInfo, _luserKeyId,null,null,null);
		} else if(_status == 1) {
			console.log("已领取");
			if (_lawardTypeId == 2) {
				var _name = $(".awardText2:eq(" + _index + ")").attr("userName");
				var _phone = $(".awardText2:eq(" + _index + ")").attr("userPhone");
				var _address = $(".awardText2:eq(" + _index + ")").attr("userAddress");
				showTheAward(2, _lawardTypeId, _lawardUrl, _lawardId, _lrememberId, _lawardName, _lawardTime, _luserAwardKey, _lawardInfo, _luserKeyId,_name,_phone,_address);
			} else{
				showTheAward(2, _lawardTypeId, _lawardUrl, _lawardId, _lrememberId, _lawardName, _lawardTime, _luserAwardKey, _lawardInfo, _luserKeyId,null,null,null);
			}
		} else if(_status == 2) {
			toastText(0, "infoToast", "抱歉,此奖品已过期");
		}

		var _dateObj = {
			"page_name": "dsf_my_award_detail_page",
			"award_type": _lawardTypeId,
			"award_id": _lawardId,
			"award_name": _lawardName
		}
		pngageShowLog(_dateObj);
	});
}

//活动初始化 
function actionInit(num) {
	console.log(_mac + "--" + _chip + "--" + _model + "--" + _emmcCID + "--" + _udid);
	console.log(_accessToken + "--" + _openId + "--" + _nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/init",
		data: {
			"id": _actionid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cUDID": _udid,
			"accessToken": _accessToken,
			"cOpenId": _openId,
			"cNickName": _nickName
		},
		success: function(data) {
			var _beginTime = "";
			var _endTime = "";
			var _sysTime = "";
			if(data.code == "50100") {
				_lotteryCode = data.data.lotteryCode;
				_remainingTimes = data.data.remainingTimes;
				_operateTime = data.data.usedTimes;
				_userKeyId = data.data.userKeyId;
				document.getElementById("remainNumber").innerHTML = _remainingTimes;
				showButton(0, num);
				console.log(num);
				if(num == "100") {
					getAllDreams();
					var _dateObj = {
						"activity_status": 1,
						"page_name": "dsf_main_page"
					}
					pngageShowLog(_dateObj);
				}
			} else if(data.code == "50002") {
				console.log("活动未开始");
				document.getElementById("moneyBox2").innerHTML = "1,000,520元";
				showButton(1, num);
				if(num == "100") {
					console.log("-------------------->初次加载");
					var _dateObj = {
						"activity_status": 0,
						"page_name": "dsf_main_page"
					}
					pngageShowLog(_dateObj);
				}
			} else if(data.code == "50003" || data.code == "50042") {
				console.log("活动已结束");
				_beginTime = data.data.activeBeginTime;
				_endTime = data.data.activeEndTime;
				_sysTime = data.data.systemTime;
				document.getElementById("moneyBox2").innerHTML = "4,142元";
				showButton(2, num);
				if(num == "100") {
					var _dateObj = {
						"activity_status": 2,
						"page_name": "dsf_main_page"
					}
					pngageShowLog(_dateObj);
				}
			} else if(data.code == "50004") {
				console.log("没有抽奖机会了");
				_remainingTimes = 0;
				_beginTime = data.data.activeBeginTime;
				_endTime = data.data.activeEndTime;
				_sysTime = data.data.sysTime;
				document.getElementById("remainNumber").innerHTML = _remainingTimes;
				showButton(0, num);
				if(num == "100") {
					getAllDreams();
					var _dateObj = {
						"activity_status": 1,
						"page_name": "dsf_main_page"
					}
					pngageShowLog(_dateObj);
				}
			}
			if(num == 1) {
				var menmber_activity_begin = _beginTime.substr(17, 2) * 1 + _beginTime.substr(14, 2) * 100 + _beginTime.substr(11, 2) * 10000 + _beginTime.substr(8, 2) * 1000000 + _beginTime.substr(5, 2) * 100000000 + _beginTime.substr(0, 4) * 10000000000;
				var menmber_activity_end = _endTime.substr(17, 2) * 1 + _endTime.substr(14, 2) * 100 + _endTime.substr(11, 2) * 10000 + _endTime.substr(8, 2) * 1000000 + _endTime.substr(5, 2) * 100000000 + _endTime.substr(0, 4) * 10000000000;
				var menmber_activity_sys = _sysTime.substr(17, 2) * 1 + _sysTime.substr(14, 2) * 100 + _sysTime.substr(11, 2) * 10000 + _sysTime.substr(8, 2) * 1000000 + _sysTime.substr(5, 2) * 100000000 + _sysTime.substr(0, 4) * 10000000000;
				console.log(menmber_activity_begin + "---" + menmber_activity_sys + "---" + menmber_activity_end);
				if(menmber_activity_end < menmber_activity_sys) {
					_actionStatus = "end";
				}
				getMyAward(_actionStatus);
			}
		},
		error: function() {
			console.log("接口异常");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
			console.log(num);
			if(num != 1) {
				getWinNews();
				clearInterval(ttt);
				ttt = setInterval(getWinNews,3600000);
			}
		}
	});
}
//活动开始与否的状态
function showButton(status, num) {
	for (var i=0;i<$(".firstDiv").length;i++) {
		$(".firstDiv")[i].style.display = "none";
	}
	if(status == 0) {
		console.log("活动已开始");
		$("#moneyBox").css("display","block");
		$("#awardListBox").css("display","block");
		$("#nowButton").css("display","block");
		$("#salvage").css("display","block");
		$("#dreamFly").css("display","block");
		$("#mydream").css("display","block");
		$("#myaward").css("display","block");
		$("#rules").css("display","block");
		
		var _flyPage = document.getElementById("flyPage").style.display;
		var _dreamPage = document.getElementById("dreamPage").style.display;
		var _awardPage = document.getElementById("awardPage").style.display;
		var _rulesPage = document.getElementById("rulesPage").style.display;
		var _dialogPage = document.getElementById("dialogPage").style.display;
		
		console.log(_flyPage+"--"+_dreamPage+"--"+_awardPage+"--"+_rulesPage+"--"+_dialogPage);
		if (_flyPage != "block"&&_dreamPage != "block"&&_awardPage != "block"&&_rulesPage != "block"&&_dialogPage != "block") {
			$("#showBox").css("display","block");
		} else{
			$("#showBox").css("display","none");
		}
		if(num == "100") {
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("salvage"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	} else if(status == 1) {
		console.log("活动未开始");
		$("#notstart").css("display", "block");
		$("#moneyBox2").css("display", "block");
	} else if(status == 2) {
		console.log("活动已结束");
		$("#hasend").css("display", "block");
		$("#mydream").css("display", "block");
		$("#myaward").css("display", "block");
		$("#rules").css("display", "block");
		$("#moneyBox2").css("display","block");
		$("#myaward").css("display","block");
		if(num == 100) {
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("mydream"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	}
}
//点击抽奖
function lotteryClicked() {
	console.log(_actionid + "--" + _mac + "--" + _chip + "--" + _model + "--" + _emmcCID + "--" + _udid + "--" + _accessToken + "--" + _openId);
	console.log(_nickName + "--" + _lotteryCode + "--" + _remainingTimes + "--" + _operateTime);
	
	if(_remainingTimes == 0) {
		console.log("剩余抽奖次数为0");
		toastText(2, "errorToast2", "今日抽奖机会已用完,参加告白活动可以解锁更多机会哦~");
		var logname = "dsf_main_page_drag_button_onclcik";
		var _dateObj = {
			"chance_status": 0
		}
		webBtnClickLog(logname, _dateObj);
	} else {
		$("#confession").css("display","block");
		$("#showBox").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("confession"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		setTimeout("document.getElementById('confession').style.display = 'none'", 3000);
		setTimeout("startLottery()",2000);
		var logname = "dsf_main_page_drag_button_onclcik";
		var _dateObj = {
			"chance_status": 1
		}
		webBtnClickLog(logname, _dateObj);
	}
}
//开始抽奖
function startLottery() {
	var ajaxTimeoutTwo = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/start",
		data: {
			"id": _actionid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cUDID": _udid,
			"accessToken": _accessToken,
			"cOpenId": _openId,
			"cNickName": _nickName,
			"lotteryCode": _lotteryCode,
			"operateNumber": _remainingTimes,
			"operateTime": _operateTime
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "50100") {
				document.getElementById("confession").style.display = "none";
				_rememberId = data.data.lotteryAwardRememberId;
				_userKeyId = data.data.userKeyId;
				console.log(data.data.awardInfo);
				showTheAward(0, data.data.awardTypeId, data.data.awardUrl, data.data.awardId, data.data.lotteryAwardRememberId, data.data.awardName, data.data.awardTime, data.data.userAwardKey, data.data.awardInfo, data.data.userKeyId, null, null, null);

				var _dateObj = {
					"page_name": "dsf_win_prize_window_page",
					"award_type": data.data.awardTypeId,
					"award_id": data.data.awardId,
					"award_name": data.data.awardName
				}
				pngageShowLog(_dateObj);
			} else if(data.code == "50023") {
				console.log("初始化的时候 还有奖品！但是抽奖的时候 已经没有奖品了");
				toastText(1, "errorToast1", "奖品已经发放完毕");
			} else if(data.code == "50042") {
				toastText(1, "errorToast1", "活动处于下架状态");
			} else if(data.code == "50002") {
				toastText(1, "errorToast1", "活动未开始");
			} else if(data.code == "50003") {
				toastText(1, "errorToast1", "活动已结束");
			} else {
				toastText(1, "errorToast1", "发生未知错误,请重试");
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}　　
		}
	});
}
//点击产品包
function order(id, title, price, discount) {
	if(_vuserid == undefined) {
		_vuserid = "";
	}
	_firstlisten = 0;
	console.log(_accessToken + "---" + _mac + "---" + _chip + "---" + _model);
	console.log(_login_type + "---" + _qqtoken + "---" + _vuserid);
	var data = JSON.stringify({
		user_id: _accessToken,
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
		mac: _mac, //mac
		chip: _chip, //chip
		model: _model, //model
		extend_info: {
			"login_type": _login_type,
			"wx_vu_id": _vuserid
		},
	})
	var data1 = encodeURIComponent(data);
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
				console.log("订单编号1：" + orderId);
				coocaaosapi.purchaseOrder2(data.data.appcode, data.data.orderId, data.data.orderTitle, data.data.back_url, data.data.total_pay_fee, "虚拟", "com.webviewsdk.action.pay", "pay", _accessToken, _mobile,  function(success)  {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			} else {
				console.log("-----------异常---------" + data.msg);
				errorToast();
			}
		},
		error: function() {
			console.log("-----------访问失败---------");
			errorToast();
		}
	});
}
//支付完成后的回调
function afterDoneFunc() {
	var _cActionid = _actionid;
	var _cRememberId = $("#package_yes").attr("rememberId");
	var _cUserKeyId = $("#package_yes").attr("userkeyId");
	console.log(_cActionid + "--" + _cRememberId + "--" + _cUserKeyId);
	var ajaxTimeoutTwo = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/verify/callBack",
		data: {
			"activeId": _cActionid,
			"rememberId": _cRememberId,
			"userKeyId": _cUserKeyId
		},
		success: function(data) {
			console.log(data.code);
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}
			actionInit(0);
		}
	});
}
//点击返回
function backButtonFunc() {
	console.log("in backButtonFunc");
	var page2 = document.getElementById("flyPage").style.display;
	var page3 = document.getElementById("dreamPage").style.display;
	var page4 = document.getElementById("awardPage").style.display;
	var page5 = document.getElementById("rulesPage").style.display;
	var page6 = document.getElementById("dialogPage").style.display;

	if(page6 == "block") {
		for(var i = 0; i < $(".prizetoast").length; i++) {
			$(".prizetoast")[i].style.display = "none";
		}
		for(var i = 0; i < $(".loginbtn").length; i++) {
			$(".loginbtn")[i].style.display = "none";
		}
		$("#entityQrcodeBox").css("display", "none");
		$("#packageQrcode").css("display", "none");
		$("#dialogPage").css("display", "none");
		if(page2 == "block" || page3 == "block" || page4 == "block") {
			if(page2 == "block") {
				map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("flyBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			if(page3 == "block") {
				map = new coocaakeymap($(".coocaa_btn3"), document.getElementsByClassName("coocaa_btn3")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			if(page4 == "block") {
				map = new coocaakeymap($(".coocaa_btn4"), document.getElementsByClassName("coocaa_btn4")[_curBtnIndex], "btn-focus", function() {}, function(val) {}, function(obj) {});
				actionInit(1);
			}
		} else {
			actionInit(0);
			$("#showBox").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		}

	} else {
		if(page2 == "block" || page3 == "block" || page4 == "block" || page5 == "block") {
			if(page2 == "block") {
				$("#flyPage").css("display", "none");
				actionInit(0);
			}
			if(page3 == "block") {
				$("#dreamPage").css("display", "none");
			}
			if(page4 == "block") {
				$("#awardPage").css("display", "none");
			}
			if(page5 == "block") {
				$("#rulesPage").css("display", "none");
			}
			$("#showBox").css("display", "block");
			$("#dialogPage").css("display", "none");
			for(var i = 0; i < $(".prizetoast").length; i++) {
				$(".prizetoast")[i].style.display = "none";
			}
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curBtnId), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			navigator.app.exitApp();
		}
	}
}
//onResume事件
function onResumeFunc() {
	console.log("in onResumeFunc" + _loginstatus);
	var _dialogStatus = document.getElementById("dialogPage");
	if(_dialogStatus.style.display == "block") {
		if(_loginstatus == "true") {
			if(document.getElementById("gotoLogin").style.display == "block") {
				$("#gotoLogin").css("display", "none");
				$("#getrightnow").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("getrightnow"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				var _cAwardid = $("#getrightnow").attr("awardId");
				var _cRememberId = $("#getrightnow").attr("rememberId");
				var _cType = $("#getrightnow").attr("typeId");
				var _cUserkeyid = $("#getrightnow").attr("userkeyId");
				console.log(_cAwardid+"--"+_cRememberId+"--"+_cType+"--"+_cUserkeyid);
				sendPrizes(_cAwardid, _cRememberId, _cType, _cUserkeyid, _openId);
			}
			if(document.getElementById("gotoLogin2").style.display == "block") {
				$("#gotoLogin2").css("display", "none");
				$("#gotoUse").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("gotoUse"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				var _cAwardid = $("#getAgain").attr("awardId");
				var _cRememberId = $("#getAgain").attr("rememberId");
				var _cType = $("#getAgain").attr("typeId");
				var _cUserkeyid = $("#getAgain").attr("userkeyId");
				console.log(_cAwardid+"--"+_cRememberId+"--"+_cType+"--"+_cUserkeyid);
				sendPrizes(_cAwardid, _cRememberId, _cType, _cUserkeyid, _openId);
			}
			if(document.getElementById("redNologin").style.display == "block") {
				$("#redNologin").css("display", "none");
				$("#redQrcode").css("display", "block");
				$("#dialog41").attr("class","dialogbox redbg1");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("redQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			if(document.getElementById("redNologin2").style.display == "block") {
				$("#redNologin2").css("display", "none");
				$("#redInfo").css("display", "block");
				$("#redQrcodebox2").css("display", "block");
				$("#redNotGet").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("redNotGet"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			if(document.getElementById("entityAward_no").style.display == "block") {
				$("#entityAward_no").css("display", "none");
				$("#entityQrcodeBox").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("entityQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			if(document.getElementById("myAwardNoLogin").style.display == "block") {
				$("#dialog52").css("display", "none");
				$("#dialog53").css("display", "block");
				$("#entityQrcode2").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("myAwardLogined"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			if(document.getElementById("package_no").style.display == "block") {
				$("#package_no").css("display", "none");
				$("#package_yes").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("package_yes"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		}
	}
}
//点击我要告白
function professClicked() {
	console.log(_nickName);
	if(_nickName == "" || _nickName == null) {
		_nickName = "匿名用户";
	}
	$("#curName2")[0].innerHTML = _nickName;
	var now = new Date();
	var time = now.getFullYear() + "." + ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1) + "." + (now.getDate() < 10 ? "0" : "") + now.getDate();
	document.getElementById("curTime").innerHTML = time;
	$("#curtext")[0].innerHTML = $(".mouldsText1")[0].innerHTML;
	$("#flyPage").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("flyBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	getFlyDreamQrcode();
	
}

function gotoFly(num) {
	var _curText = document.getElementById("curtext").innerHTML;
	if(_curText.length < 1) {
		toastText(3, "errorToast", "告白不能为空");
	} else {
		sendFlyInfo(num);
	}
}
//放飞梦想
function sendFlyInfo(num) {
	var _curSendText = document.getElementById("curtext").innerHTML;
	var _curSendText2 = _curSendText.substr(0,3);
	var TextArray = ["让风悄", "有你相", "我能想", "七夕佳", "七夕今", "天涯明", "祝天下", "我不要", "曾经迷", "纵有万", "我喜欢", "谢谢你", "愿我的", "感谢遇", "想要牵", "你是我", "死生契", "我要与"];
	var _num = TextArray.indexOf(_curSendText2);
	_num = _num + 1;
	console.log(_num);
	var ajaxTimeoutSeven = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/wish/saveWish",
		data: {
			"activeId": _actionid,
			"userKeyId": _userKeyId,
			"wishMsg": _curSendText,
			"wishName": _nickName,
			"source": 0,
			"mac": _mac
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "50100") {
				$("#category7").css("display", "block");
				$("#category8").css("display", "none");
				$("#dialogPage").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("success_home"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				if(num == 1){
					var logname = "dsf_express_card_submit_button_onclcik";
					var _dateObj = {
						"submit_result": 1,
						"template_id": _num
					}
					webBtnClickLog(logname, _dateObj);
				}
			} else {
				console.log("提交失败");
				$("#category7").css("display", "none");
				$("#category8").css("display", "block");
				$("#dialogPage").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("failure_again"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				if(num == 1){
					var logname = "dsf_express_card_submit_button_onclcik";
					var _dateObj = {
						"submit_result": 0,
						"template_id": _num
					}
					webBtnClickLog(logname, _dateObj);
				}
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutSeven.abort();　　　　
			}
			actionInit(3);
		}
	});
}
//我的奖品
function getMyAward(flag) {
	console.log("getMyAward");
	$("#myAwardBox").stop(true, true).animate({scrollTop: 0}, {duration: 0,easing: "swing",complete: function() {}});
	$("#awardPage").css("display", "block");
	document.getElementById("myAwardBox").innerHTML = "";
	var ajaxTimeoutThree = $.ajax({
		type: "GET", 
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/" + _actionid + "/winList",
		data: {
			"id": _actionid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cUDID": _udid,
			"accessToken": _accessToken,
			"cOpenId": _openId,
			"cNickName": _nickName
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "50100") {
				if(data.data.length == 0) {
					console.log("无奖品");
					$("#myAwardBox").css("display", "none");
					$("#nullAward").css("display", "block");
					map = new coocaakeymap($(".coocaa_btn42"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
					var _dateObj = {
						"page_name": "dsf_my_award_page",
						"content_status": "0"
					}
					pngageShowLog(_dateObj);
				} else {
					console.log("有奖品");
					$("#myAwardBox").css("display", "block");
					$("#nullAward").css("display", "none");
					console.log(flag);
					var _awarditem = "";
					var _beforeInner = '<div class="awardItembox coocaa_btn4"><img class="myAwardItem" src="images/award/item32.png"/><img class="myAwardBorder" src="images/award/border3.png"/>';
					var _beforeInner2 = '<div class="awardItembox coocaa_btn4"><img class="myAwardItem" src="images/award/item3.png"/><img class="myAwardBorder" src="images/award/border3.png"/>';
					var _afterInner = '</div>';
					if(flag == "end") {
						for(var i = 0; i < data.data.length; i++) {
							if(data.data[i].awardTypeId == 4 || data.data[i].awardTypeId == 13) {
								var _awardInner = _beforeInner2 + '<span class="awardText1">' + data.data[i].awardName + '</span><span class="awardText2" status="1" awardId="' + data.data[i].awardId + '" rememberId="' + data.data[i].lotteryAwardRememberId + '" typeId="' + data.data[i].awardTypeId + '" awardUrl="' + data.data[i].awardUrl + '" userAwardKey="' + data.data[i].userAwardKey + '" awardInfo=' + data.data[i].awardInfo + ' userKeyId="' + data.data[i].userKeyId + '">已发放</span><span class="awardText3">' + data.data[i].awardTime + '</span>' + _afterInner;
								_awarditem += _awardInner;
							} else {
								if(data.data[i].awardExchangeFlag == 0) { //未兑换
									var _awardInner = _beforeInner + '<span class="awardText1">' + data.data[i].awardName + '</span><span class="awardText2" status="2">已过期</span><span class="awardText3">' + data.data[i].awardTime + '</span>' + _afterInner;
									_awarditem += _awardInner;
								} else {
									var _awardInner = _beforeInner2 + '<span class="awardText1">' + data.data[i].awardName + '</span><span class="awardText2" status="1" awardId="' + data.data[i].awardId + '" rememberId="' + data.data[i].lotteryAwardRememberId + '" typeId="' + data.data[i].awardTypeId + '" awardUrl="' + data.data[i].awardUrl + '" userAwardKey="' + data.data[i].userAwardKey + '" awardInfo=' + data.data[i].awardInfo + ' userKeyId="' + data.data[i].userKeyId + '">已发放</span><span class="awardText3">' + data.data[i].awardTime + '</span>' + _afterInner;
									_awarditem += _awardInner;
								}
							}
						}
					} else {
						var _exchange = 0;
						for(var i = 0; i < data.data.length; i++) {
							if(data.data[i].awardTypeId == 4 || data.data[i].awardTypeId == 13) {
								var _awardInner = _beforeInner2 + '<span class="awardText1">' + data.data[i].awardName + '</span><span class="awardText2" status="1" awardId="' + data.data[i].awardId + '" rememberId="' + data.data[i].lotteryAwardRememberId + '" typeId="' + data.data[i].awardTypeId + '" awardUrl="' + data.data[i].awardUrl + '" userAwardKey="' + data.data[i].userAwardKey + '" awardInfo=' + data.data[i].awardInfo + ' userKeyId="' + data.data[i].userKeyId + '">已发放</span><span class="awardText3">' + data.data[i].awardTime + '</span>' + _afterInner;
								_awarditem += _awardInner;
							} else {
								if(data.data[i].awardExchangeFlag == 0) {
									_exchange++;
									var _awardInner = _beforeInner2 + '<span class="awardText1">' + data.data[i].awardName + '</span><span class="awardText2 awardText22" status="0" awardId="' + data.data[i].awardId + '" rememberId="' + data.data[i].lotteryAwardRememberId + '" typeId="' + data.data[i].awardTypeId + '" awardUrl="' + data.data[i].awardUrl + '" userAwardKey="' + data.data[i].userAwardKey + '" awardInfo=' + data.data[i].awardInfo + ' userKeyId="' + data.data[i].userKeyId + '">待领取</span><span class="awardText3">' + data.data[i].awardTime + '</span>' + _afterInner;
									_awarditem += _awardInner;
								} else {
									if (data.data[i].awardTypeId == 2) {
										var _username = data.data[i].awardAddressEntity.receiveName;
										var _useraddress = data.data[i].awardAddressEntity.userAddress;
										var _userphone = data.data[i].awardAddressEntity.userPhone;
										var _awardInner = _beforeInner2 + '<span class="awardText1">' + data.data[i].awardName + '</span><span class="awardText2" status="1" userName="'+_username+'" userAddress="'+_useraddress+'" userPhone="'+_userphone+'"  awardId="' + data.data[i].awardId + '" rememberId="' + data.data[i].lotteryAwardRememberId + '" typeId="' + data.data[i].awardTypeId + '" awardUrl="' + data.data[i].awardUrl + '" userAwardKey="' + data.data[i].userAwardKey + '" awardInfo=' + data.data[i].awardInfo + ' userKeyId="' + data.data[i].userKeyId + '">已发放</span><span class="awardText3">' + data.data[i].awardTime + '</span>' + _afterInner;
									} else{
										var _awardInner = _beforeInner2 + '<span class="awardText1">' + data.data[i].awardName + '</span><span class="awardText2" status="1"  awardId="' + data.data[i].awardId + '" rememberId="' + data.data[i].lotteryAwardRememberId + '" typeId="' + data.data[i].awardTypeId + '" awardUrl="' + data.data[i].awardUrl + '" userAwardKey="' + data.data[i].userAwardKey + '" awardInfo=' + data.data[i].awardInfo + ' userKeyId="' + data.data[i].userKeyId + '">已发放</span><span class="awardText3">' + data.data[i].awardTime + '</span>' + _afterInner;
									}
									_awarditem += _awardInner;
								}
							}
						}
					}
					$("#myAwardBox").append(_awarditem);
					map = new coocaakeymap($(".coocaa_btn4"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
					buttonInitAfter();

					var _dateObj = {
						"page_name": "dsf_my_award_page",
						"content_status": "1"
					}
					pngageShowLog(_dateObj);
				}
			} else {
				console.log("其他错误情况");
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutThree.abort();　　　　
			}　　
		}
	});
}
//我的告白
function getMyDream() {
	document.getElementById("myDreamBox").innerHTML = "";
	$("#dreamPage").css("display", "block");
	var ajaxTimeoutSix = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/wish/myWishList",
		data: {
			"activeId": _actionid,
			"userKeyId": _userKeyId
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "50100") {
				$("#myDreamBox").css("display", "block");
				$("#nullDream").css("display", "none");
				var _dreamitem = "";
				var _beforeInner = '<div class="dreamItembox coocaa_btn3"><img class="myDreamItem" src="images/award/item3.png"/><img class="myDreamBorder" src="images/award/border3.png"/>';
				var _afterInner = '</div>';
				for(var i = 0; i < data.data.length; i++) {
					var _dreamInner = _beforeInner + '<span class="dreamText1" wishName="' + data.data[i].wishName + '" wishId="' + data.data[i].wishId + '">' + data.data[i].wishMsg + '</span><span class="dreamText2">' + data.data[i].createTime + '</span>' + _afterInner;
					_dreamitem += _dreamInner;
				}
				$("#myDreamBox").append(_dreamitem);
				map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				buttonInitAfter();
				var _dateObj = {
					"page_name": "dsf_my_express",
					"content_status": "1"
				}
				pngageShowLog(_dateObj);
			} else if(data.code == "90001") {
				console.log("无告白");
				$("#myDreamBox").css("display", "none");
				$("#nullDream").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn32"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				var _dateObj = {
					"page_name": "dsf_my_express",
					"content_status": "0"
				}
				pngageShowLog(_dateObj);
			} else {
				console.log("出错");
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutSix.abort();　　　　
			}　　
		}
	});
}
//获取审核后的告白
function getAllDreams() {
	console.log("--------------------->获取审核后的告白");
	var ajaxTimeoutSix = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/wish/wishList",
		data: {
			"activeId": _actionid,
			"size": 60
		},
		success: function(data) {
			if(data.code == "50100") {
				for(var i=0; i<data.data.length; i++){
					showTextArray[i] = data.data[i].wishMsg;
					showAuthorArray[i] = data.data[i].wishName;
					var _time = data.data[i].createTime;
					_time = _time.substr(0, 10);
					showTimeArray[i] = _time;
				}
				changeHomeInfo();
				clearInterval(tt);
				tt = setInterval(changeTexrInfo, 8000);
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutSix.abort();　　　　
			}　　
		}
	});
}
function changeTexrInfo() {
	$("#cardInfoShow").fadeIn(1500);
	setTimeout(aaaaa,6500);
}
function aaaaa(){
	$("#cardInfoShow").fadeOut(1500, changeHomeInfo);
}

function changeHomeInfo() {
	var index = Math.floor((Math.random() * showTextArray.length));
	var _curText = showTextArray[index];
	var _curAuthor = showAuthorArray[index];
	var _curTime = showTimeArray[index];
	var _curTextLength = _curText.length;
	if(_curTextLength < 19) {
		$("#cardInfoShow").attr("class", "homeShow1");
	} else if(_curTextLength < 37) {
		$("#cardInfoShow").attr("class", "homeShow2");
	} else if(_curTextLength < 55) {
		$("#cardInfoShow").attr("class", "homeShow3");
	} else if(_curTextLength < 93) {
		$("#cardInfoShow").attr("class", "homeShow4");
	} else {
		$("#cardInfoShow").attr("class", "homeShow5");
	}
	document.getElementById("homeText").innerHTML = _curText;
	document.getElementById("homeauthor").innerHTML = _curAuthor;
	document.getElementById("hometime").innerHTML = _curTime;
	var palce = ["1", "2", "3"];
	var index2 = Math.floor((Math.random() * palce.length));
	var _curNum2 = palce[index2];
	if(_curNum2 == "1") {
		$("#cardInfoShow").css("top", "385px");
		$("#cardInfoShow").css("left", "20px");
	} else if(_curNum2 == "2") {
		$("#cardInfoShow").css("top", "545px");
		$("#cardInfoShow").css("left", "745px");
	} else if(_curNum2 == "3") {
		$("#cardInfoShow").css("top", "510px");
		$("#cardInfoShow").css("left", "1300px");
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
			//state 状态值 -2表示真假数据都获取 -1表示只获取假数据 0表示只获取真数据 不传默认为 -1
			if(data.code == "50100") {
				if(data.data.length != 0) {
					for (var i=0;i<data.data.length;i++) {
						showAwardName[i] = data.data[i].awardName;
						showAwardwinner[i] = data.data[i].userNickName;
					}
					changeAwardInfo();
					clearInterval(tttt);
					tttt = setInterval(changeWinnerInfo, 8000);
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
			getRemainMoney();
			clearInterval(t);
			t = setInterval(getRemainMoney, 180000);
		}
	});
}
//获奖名单展示
function changeWinnerInfo(){
	$("#awardList").fadeIn(1500);
	setTimeout(bbbbb,5000);
}
function bbbbb(){
	$("#awardList").fadeOut(1500, changeAwardInfo);
}
function changeAwardInfo() {
	var index = Math.floor((Math.random() * showAwardwinner.length));
	var _curWinner = showAwardwinner[index];
	var _curAwardName = showAwardName[index];
	if (_curWinner == ""||_curWinner==null) {
		_curWinner = "匿名用户";
	}
	if (_curWinner.length>5) {
		_curWinner = _curWinner.substr(0,2)+"*"+_curWinner.substr(_curWinner.length-2,2);
	}
	document.getElementById("list1").innerHTML = "恭喜";
	document.getElementById("list2").innerHTML = _curWinner;
	document.getElementById("list3").innerHTML = "获得";
	document.getElementById("list4").innerHTML = _curAwardName
}
//奖池余额
function getRemainMoney() {
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/wish/getReport?activeId=" + _actionid,
		data: {
			"activeId": _actionid
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "50100") {
				toMoney(data.data.overMoney);
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}　　
		}
	});
}

function toMoney(num) {
	num = num.toFixed(0);
	num = parseFloat(num);
	num = num.toLocaleString();
	document.getElementById("moneyBox").innerHTML = num + "元";
}
//展示弹窗
function showTheAward(area, type, imgurl, awardid, rememberId, name, time, key, info, userkeyid, lname, lphone ,laddress) {
	//type  2-实体奖 5-优惠券 7-微信红包  12-机会奖 13-直减金额类奖品 14-愿望卡
	console.log(type + "--" + imgurl + "--" + name + "--" + time + "--" + info);
	for(var i = 0; i < $(".dialogbox").length; i++) {
		$(".dialogbox")[i].style.display = "none";
	}
	$("#dialogPage").css("display", "block");
	if(type == 2) {
		console.log("实体奖");
		$("#category5").css("display", "block");
		var str = enurl + "activeId=" + _actionid + "&rememberId=" + rememberId + "&userKeyId=" + userkeyid + "&access_token=" + _accessToken;
		if(area == 0) {
			console.log("弹窗+实体奖");
			document.getElementById("entityQrcode").innerHTML = "";
			drawQrcode("entityQrcode", str, 192);
			$("#dialog50").css("display", "block");
			$("#curImg").attr("src", imgurl);
			$("#curImg").css("display", "block");
			document.getElementById("entityName").innerHTML = name;
			copyDatatoId(awardid, rememberId, type, userkeyid, "entityAward_yes");
			if(_loginstatus == "false") {
				$("#entityAward_no").css("display", "block");
				$("#entityQrcodeBox").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("entityAward_no"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				$("#entityAward_no").css("display", "none");
				$("#entityQrcodeBox").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("entityQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			actionInit(3);
		} else if(area == 1) {
			$("#entityQrcode2").css("display", "none");
			document.getElementById("entityQrcode2").innerHTML = "";
			drawQrcode("entityQrcode2", str, 190);
			if(_loginstatus == "false") {
				console.log("实体奖+待领取+未登录");
				document.getElementById("entity_info21").innerHTML = name;
				document.getElementById("entity_info22").innerHTML = time;
				$("#dialog52").css("display", "block");
				$("#myAwardNoLogin").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("myAwardNoLogin"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				console.log("实体奖+待领取+已登录");
				document.getElementById("entity_info31").innerHTML = name;
				document.getElementById("entity_info32").innerHTML = time;
				$("#dialog53").css("display", "block");
				$("#entityQrcode2").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("myAwardLogined"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		} else if(area == 2) {
			console.log("实体奖+已领取");
			document.getElementById("entity_info11").innerHTML = name;
			document.getElementById("entity_info12").innerHTML = time;
			document.getElementById("entity_info13").innerHTML = lname;
			document.getElementById("entity_info14").innerHTML = lphone;
			document.getElementById("entity_info15").innerHTML = laddress;
			$("#dialog51").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("myAwardYes"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	}
	if(type == 4) {
		console.log("第三方优惠券");
		var _jdOrTm = JSON.parse(info).type;
		console.log(_jdOrTm);
		if(area == 0) {
			$("#dialog91").css("display", "block");
			$("#dialog92").css("display", "none");
			$("#coupon_qrcode1").attr("src", imgurl);
			if(_jdOrTm == "jd"){
				$("#dialog91").css("background-image", "url(images/dialog/coupon/zdfjd.png)");
			}else{
				$("#dialog91").css("background-image", "url(images/dialog/coupon/zdftm.png)");
			}
			$("#category9").css("display", "block");
			$("#dialogPage").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn9"), document.getElementById("coupon_qrcode1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			actionInit(3);
		} else {
			$("#dialog91").css("display", "none");
			$("#dialog92").css("display", "block");
			$("#coupon_qrcode2").attr("src", imgurl);
			document.getElementById("coupon_info91").innerHTML = name;
			document.getElementById("coupon_info92").innerHTML = time;
			if(_jdOrTm == "jd"){
				$("#dialog92").css("background-image", "url(images/dialog/coupon/zdfjd2.png)");
			}else{
				$("#dialog92").css("background-image", "url(images/dialog/coupon/zdftm2.png)");
			}
			$("#category9").css("display", "block");
			$("#dialogPage").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn9"), document.getElementById("coupon_qrcode2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	}
	if(type == 5) {
		copyDatatoId(awardid, rememberId, type, userkeyid, "getAgain");
		copyDatatoId(awardid, rememberId, type, userkeyid, "getrightnow");
		console.log(JSON.parse(info));
		var _business = JSON.parse(info).business;
		var _couponId = JSON.parse(info).type;
		if(_business != "tvmall" && _business != "movie" && _business != "edu") {
			_business = "tvmall";
			_couponId = "710";
		}
		console.log(_business + "--" + _couponId);
		$("#getAgain").attr("couponType", _couponId);
		$("#getAgain").attr("couponBusiness", _business);

		if(area == 0) {
			console.log("弹窗+优惠券");
			$("#dialog31_img1").attr("src", imgurl);
			$("#dialog31_img1").css("display", "block");
			$("#dialog31").css("display", "block");
			$("#dialog32").css("display", "none");
			if(_loginstatus == "false") {
				$("#gotoLogin").css("display", "block");
				$("#getrightnow").css("display", "none");
				$("#dialog31_info1").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("gotoLogin"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				actionInit(3);
			} else {
				$("#gotoLogin").css("display", "none");
				$("#getrightnow").css("display", "block");
				$("#dialog31_info1").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("getrightnow"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				sendPrizes(awardid, rememberId, type, userkeyid, _openId);
			}
		} else if(area == 1) {
			console.log("我的奖品+优惠券+待领取");
			$("#dialog31").css("display", "none");
			$("#dialog32").css("display", "block");
			$("#gotoUse").css("display", "none");
			document.getElementById("coupon_info21").innerHTML = name;
			document.getElementById("coupon_info22").innerHTML = time;
			if(_loginstatus == "false") {
				$("#gotoLogin2").css("display", "block");
				$("#getAgain").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("gotoLogin2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				$("#gotoLogin2").css("display", "none");
				$("#getAgain").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("getAgain"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		} else if(area == 2) {
			console.log("我的奖品+优惠券+已领取");
			document.getElementById("coupon_info21").innerHTML = name;
			document.getElementById("coupon_info22").innerHTML = time;
			$("#dialog31").css("display", "none");
			$("#dialog32").css("display", "block");
			$("#gotoLogin2").css("display", "none");
			$("#getAgain").css("display", "none");
			$("#gotoUse").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("gotoUse"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
		$("#category3").css("display", "block");
	}
	if(type == 7) {
		var _number = JSON.parse(info).bonus;
		console.log(_number);
		if(_number == undefined || _number == "" || _number == null) {
			_number = "*";
		}
		document.getElementById("redNumber").innerHTML = _number;
		if(area == 0) {
			console.log("弹窗+微信红包");
			document.getElementById("redQrcode").innerHTML = "";
			getRedPacketsQrcode(rememberId, userkeyid, "redQrcode");
			$("#category4").css("display", "block");
			$("#dialog41").css("display", "block");
			if(_loginstatus == "false") {
				$("#dialog41").attr("class","dialogbox redbg2");
				$("#redQrcode").css("display", "none");
				$("#redNologin").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("redNologin"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				$("#dialog41").attr("class","dialogbox redbg1");
				$("#redQrcode").css("display", "block");
				$("#redNologin").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("redQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			actionInit(3);
		} else if(area == 1) {
			console.log("我的奖品+微信红包+未领取");
			$("#category4").css("display", "block");
			$("#dialog42").css("display", "block");
			$("#redHasGot").css("display", "none");
			document.getElementById("redQrcode2").innerHTML = "";
			getRedPacketsQrcode(rememberId, userkeyid, "redQrcode2");
			document.getElementById("redName").innerHTML = name;
			document.getElementById("redTime").innerHTML = time;
			if(_loginstatus == "false") {
				$("#redNologin2").css("display", "block");
				$("#redInfo").css("display", "none");
				$("#redQrcodebox2").css("display", "none");
				$("#redNotGet").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("redNologin2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				$("#redNologin2").css("display", "none");
				$("#redInfo").css("display", "block");
				$("#redQrcodebox2").css("display", "block");
				$("#redNotGet").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("redNotGet"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		} else if(area == 2) {
			console.log("我的奖品+微信红包+已领取");
			$("#category4").css("display", "block");
			$("#dialog42").css("display", "block");
			document.getElementById("redName").innerHTML = name;
			document.getElementById("redTime").innerHTML = time;
			document.getElementById("redQrcode2").innerHTML = "";
			getRedPacketsQrcode(rememberId, userkeyid, "redQrcode2");
			$("#redHasGot").css("display", "block");
			$("#redInfo").css("display", "none");
			$("#redQrcodebox2").css("display", "none");
			$("#redNotGet").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("redHasGot"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	}
	if(type == 12) {
		console.log("机会奖,不出现在我的奖品里");
		$("#category2").css("display", "block");
		var _url = JSON.parse(info).url;
		console.log(_url);
		$("#choiceitem3").attr("videoName",name);
		$("#choiceitem3").attr("videoUrl",_url);
		copyDatatoId(awardid, rememberId, type, userkeyid, "choiceitem3");
		actionInit(3);
		map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("choiceitem3"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	}
	if(type == 13) {
		console.log("直减金额类奖品");
		copyDatatoId(awardid, rememberId, type, userkeyid, "package_yes");
		if(area == 0) {
			$("#category6").css("display", "block");
			$("#dialog61").css("display", "block");
			if(_source == "aiqiyi"){
				$("#dialog61").attr("class","dialogbox aqiyi");
			}else{
				$("#dialog61").attr("class","dialogbox tencent");
			}
			if(_loginstatus == "false") {
				$("#package_no").css("display", "block");
				$("#package_yes").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("package_no"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else {
				$("#package_no").css("display", "none");
				$("#package_yes").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("package_yes"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
			actionInit(3);
		} else {
			$("#category6").css("display", "block");
			$("#dialog62").css("display", "block");
			document.getElementById("package_info31").innerHTML = name;
			document.getElementById("package_info32").innerHTML = time;
			map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("package_buy"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	}
	if(type == 14) {
		console.log("愿望卡,不出现在我的奖品页里");
		sendPrizes(awardid, rememberId, type, userkeyid, _openId);
	}
}
//抽到奖品时将数据赋给指定button.以便后面用
function copyDatatoId(awardid, rememberId, type, userkeyid, btnid) {
	$("#" + btnid).attr("awardId", awardid);
	$("#" + btnid).attr("rememberId", rememberId);
	$("#" + btnid).attr("typeId", type);
	$("#" + btnid).attr("userkeyId", userkeyid);
}
//绘制二维码
function drawQrcode(id, url, wh) {
	var qrcode = new QRCode(document.getElementById(id), {
		width: wh,
		height: wh
	});
	qrcode.makeCode(url);
}
//抽到告白卡14-优惠券5-任务卡12的激活
function sendPrizes(awardid, rememberId, type, userkeyid, openid) {
	console.log(awardid + "--" + rememberId + "--" + type + "--" + userkeyid + "--" + openid);
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/verify/receive",
		data: {
			"activeId": _actionid,
			"awardId": awardid,
			"rememberId": rememberId,
			"awardTypeId": type,
			"userKeyId": userkeyid,
			"MAC": _mac,
			"cOpenId": openid
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "50100") {
				if(type == 14) {
					showProfessCard(data.data.WishInfo.createTime, data.data.WishInfo.wishMsg, data.data.WishInfo.wishName);
				}
				if(document.getElementById("awardPage").style.display == "block") {
					toastText(0, "infoToast", "领取成功");
					setTimeout(actionInit(0), 3000);
				}
			} else {
				toastText(0, "infoToast", "领取失败,请重试");
				setTimeout(actionInit(0), 3000);
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
			if(type != 5) {
				actionInit(0);
			}
		}
	});
}
//展示愿望卡
function showProfessCard(time, text, name, cardid) {
	time = time.substr(0, 10);
	var _curTextLength = text.length;
	console.log(area == "1");
	if(_curTextLength < 22) {
		$("#category1").css("background-image", "url(images/dialog/profess/profess1.png)");
		$("#confessionAuthor").attr("class", "author1");
		$("#confessionText").attr("class", "text1");
		$("#confessionTime").attr("class", "time1");
	} else if(_curTextLength < 44) {
		$("#category1").css("background-image", "url(images/dialog/profess/profess2.png)");
		$("#confessionAuthor").attr("class", "author2");
		$("#confessionText").attr("class", "text2");
		$("#confessionTime").attr("class", "time2");
	} else if(_curTextLength < 67) {
		$("#category1").css("background-image", "url(images/dialog/profess/profess3.png)");
		$("#confessionAuthor").attr("class", "author3");
		$("#confessionText").attr("class", "text3");
		$("#confessionTime").attr("class", "time3");
	} else {
		$("#category1").css("background-image", "url(images/dialog/profess/profess4.png)");
		$("#confessionAuthor").attr("class", "author4");
		$("#confessionText").attr("class", "text4");
		$("#confessionTime").attr("class", "time4");
	}
	document.getElementById("confessionText").innerHTML = text;
	if(name == "" || name == null) {
		name = "匿名用户";
	}
	if(name.length > 5) {
		name = name.substring(0, 5) + "...";
	}
	document.getElementById("confessionAuthor").innerHTML = name + "&nbsp;&nbsp;说:";
	document.getElementById("confessionTime").innerHTML = time;
	$("#category1").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn6"), document.getElementById("category1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
}
//获取微信红包二维码
function getRedPacketsQrcode(_rememberId, _userKeyId, _id) {
	console.log(_rememberId + "--" + _userKeyId + "--" + _id);
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/verify/wechat/qrCode",
		data: {
			"activeId": _actionid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cUDID": _udid,
			"accessToken": _accessToken,
			"cOpenId": _openId,
			"cNickName": _nickName,
			"rememberId": _rememberId,
			"userKeyId": _userKeyId,
			"luckyDrawCode": "qixiAct",
			"channel": "coocaa"
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "200") {
				var str = data.data;
				var qrcode = new QRCode(document.getElementById(_id), {
					width: 192,
					height: 192
				});
				qrcode.makeCode(str);
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
//获取告白页面二维码
function getFlyDreamQrcode() {
	document.getElementById("flyQrc0de").innerHTML = "";
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/wish/wechat/url",
		data: {
			"activeId": _actionid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cUDID": _udid,
			"accessToken": _accessToken,
			"cOpenId": _openId,
			"cNickName": _nickName,
			"userKeyId": _userKeyId,
			"channel": "coocaa"
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "200") {
				var str = data.data;
				var qrcode = new QRCode(document.getElementById("flyQrc0de"), {
					width: 370,
					height: 370
				});
				qrcode.makeCode(str);
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}　　
		}
	});
}

function toastText(num, id, text) {
	document.getElementById(id).innerHTML = text;
	document.getElementById(id).style.display = "block";
	if(num == 0) {
		setTimeout("document.getElementById('infoToast').style.display = 'none'", 3000);
	} else if(num == 1) {
		setTimeout("document.getElementById('errorToast1').style.display = 'none'", 3000);
	} else if(num == 2) {
		setTimeout("document.getElementById('errorToast2').style.display = 'none'", 3000);
	} else if(num == 3) {
		setTimeout("document.getElementById('errorToast').style.display = 'none'", 3000);
	}
}

function changeTheDate(arr1, arr2) {
	for(var i = 0; i < arr1.length; i++) {
		$(".mouldsText1")[0].innerHTML = arr2[0];
		$(".mouldsText1")[1].innerHTML = arr1[0];
		$(".mouldsText1")[2].innerHTML = arr1[1];
		$(".mouldsText1")[3].innerHTML = arr2[1];
		$(".mouldsText1")[4].innerHTML = arr2[2];
		$(".mouldsText1")[5].innerHTML = arr1[2];
	}
}

function getRandomArrayElements(arr, count) {
	var shuffled = arr.slice(0),
		i = arr.length,
		min = i - count,
		temp, index;
	while(i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//异常
function errorToast() {
	console.log("接口出现异常");
}
function webBtnClickLog(logname, dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo(logname, _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

function pngageShowLog(dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo("web_page_show_new", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

function pngayResultLog(order_no, rusult) {
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