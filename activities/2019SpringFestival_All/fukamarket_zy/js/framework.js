var activity_name = "春节集卡活动";
var _tencentWay = null;
var _user_flag = null;
var _login_type = null;
var _vuserid = null;
var _qqtoken = null;
var needQQ = false;
var cancelType = "";

// var _testurl = "https://restful.skysrt.com";
// var enurl = "https://webapp.skysrt.com/games/double11/address/index.html?";
// var exemurl = "https://webapp.skysrt.com/games/double11/main/index.html?goto=shop&exit=exit";

//var _testurl = "http://172.20.139.237:3001"
var _testurl = "http://beta.restful.lottery.coocaatv.com";
var enurl = "http://beta.webapp.skysrt.com/games/webapp/double11/address/index.html?";
var exemurl = "http://beta.webapp.skysrt.com/yuanbo/test/2019SpringFestival/taskcenter.html";//任务页面


var _version = null;
var _cVersion = null;
_actionid = 95;
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

var _curFocusIndex = 0;
var _part = "";
var _curAwardId = "";//存储当前奖品点击时的id
var _flag = 0;
var _notGotAwardId = "";//存储当前奖品点击时的id

var needSentUserLog = false;//判断是否点了登录
var needSentUserLog2 = false;//判断是否登录成功
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
		if (_part == "mycard") {
			$("#myCard").css("display","block");
		} else if(_part == "market"){
			$("#market").css("display","block");
		}
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener('resume', this.onResume, false);
		document.addEventListener("pause", this.onPause, false);
	},
	handleBackButton: function() {
		if(document.getElementById('myCard').style.display=="block"){
			if(document.getElementById('window').style.display=="block"){
				closeWindow();
				document.getElementById('window').style.display="none";
				getMycard("mycard");
			}else{
				navigator.app.exitApp();
			}
		}else if(document.getElementById('market').style.display=="block"){
			if(document.getElementById('window').style.display=="block"){
				closeWindow();
				document.getElementById('window').style.display="none";
				getMarket("allBtn");
			}else{
				navigator.app.exitApp();
			}
		}else if(document.getElementById('myRelease').style.display=="block"){
			if(getUrlParam("part")== "mytrade"){
				navigator.app.exitApp();
			}else{
				if(cancelType == "mycard"){
					getMycard("mycard");
				}else{
					getMarket("allbtn");
				}
				
			}
		}else{
			navigator.app.exitApp();
		}

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
		//backButtonFunc();
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
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return decodeURI(r[2], 'utf-8');
	return null; //返回参数值
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
		type: "POST",
		async: true,
		timeout : 5000,
		dataType: 'json',
		url:"https://restful.skysrt.com/light/active/tv/source",
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
                console.log("========视频源========"+_qsource);
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
	//area = 1我的福卡页面
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		console.log("haslogin " + message.haslogin);
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			} else {
				_tencentWay = "qq";
			}
			_openId = "";
			_user_flag = 0;
			_accessToken = "";
			firstPageInit();
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
										_openId = "";
										_loginstatus = "false";
									}
								}
							} else {
								_tencentWay = "both";
								_openId = "";
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
											_openId = "";
											_loginstatus = "false";
											_tencentWay = "qq";
										}
									}
									break;
								}
								if(needSelectNum == qqinfo.length) {
									_tencentWay = "both";
									_openId = "";
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
				});
				console.log("openId============"+_openId);
				if(area == 0){
					firstPageInit();
				}else if(area == 1){
					//增加机会
					addLoginnum(_openId);
				}
			}, function(error) {
				console.log(error);
			});

		}

	}, function(error) {
		console.log(error);
	});
}
//初始化
function firstPageInit(){
	var _part = getQueryString("part");
	console.log(_part);
	if(_part == "mycard") {
		getMycard("mycard");
		var _dateObj = {
			"page_name": "我的福卡页面",
			"activity_name":activity_name,
		};
		pageShowLog("okr_web_page_show",_dateObj);
	}else if(_part == "market") {
		getMarket("allbtn");
	//	map = new coocaakeymap($(".coocaabtn"),document.getElementById("allbtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});		
	}else if(_part == "mytrade") {
		myListTrade();
	}
}
//福卡名字头像
function swithCardinfo(score){
	switch (score){
		case "f1":
			cardName = "招财福";
			break;
		case "f2":
			cardName = "健康福";
			break;
		case "f3":
			cardName = "智慧福";
			break;
		case "f4":
			cardName = "平安福";
			break;
		case "f5":
			cardName = "幸运福";
			break;
		case "f6":
			cardName = "福气福";
			break;
		case "f7":
			cardName = "团圆福";
			break;
		case "f8":
			cardName = "友爱福";
			break;
		case "f9":
			cardName = "如意福";
			break;
		case "allbtn":
			cardName = "全部";
			break;
	}
	return cardName;	
}
//福卡集市

function getMarket(focaKey){
	document.getElementById("market").style.display="block";
	document.getElementById("myCard").style.display="none";
	document.getElementById("myRelease").style.display="none";

	if(focaKey == "allbtn"){
		_focaKey = "";
	}else{
		_focaKey = focaKey;
	}
	console.log("查询筛选"+focaKey);
	var _dateObj = {
		"page_name": "福卡集市页面",
		"activity_name":activity_name,
		"page_type":swithCardinfo(focaKey),
	};
	pageShowLog("okr_web_page_show",_dateObj);
	// var url =  _testurl + "market?id=" + _actionid + "&cOpenId =" + _openId + "&cUDID=" + _udid + "&MAC=" + _mac + "&cChip=" + _chip + "&cModel=" + _model + "&cEmmcCID="+_emmcCID+"&size=6&needFocaKey=''";
	// console.log("福卡集市接口"+url);
	var ajaxTimeoutFive = $.ajax({
		type: "get",
		async: true,
		timeout: 5000,
		url: _testurl + "/building/cny-foca/market",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip":_chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"size":48,
			"needFocaKey":_focaKey
		},
		success: function(data) {
			console.log("福卡集市----"+JSON.stringify(data));

			document.getElementById("changeBox").innerHTML = "";
			if(data.code == "50100") {
				overTradeNumber = data.data.overTradeNumber;//剩余交易次数
				tradeNumber = data.data.tradeNumber;//当前正在交易的次数
				ifLogin = data.data.ifLogin;//当前用户是否登陆

				console.log(focaKey+"福卡集市个数----"+data.data.list.length);
				if(ifLogin == false){
					document.getElementById("hint2").style.display = "block";
					document.getElementById("hint1").style.display = "none";
				}else{
					document.getElementById("hint1").style.display = "block";
					document.getElementById("hint2").style.display = "none";
				}
				if(data.data.list.length != 0){
					if(data.data.list.length > 9){
						document.getElementById("more").style.display="block"
					}else{
						document.getElementById("more").style.display="none"
					}
					for(i=0;i<data.data.list.length;i++){
						var exemDiv = document.createElement("div");
						exemDiv.setAttribute('id', 'exem' + i);
						exemDiv.setAttribute('tradeId',data.data.list[i].tradeId);
						exemDiv.setAttribute('sellerKeyId', data.data.list[i].sellerKeyId);
						exemDiv.setAttribute('canTradeFocaIds', data.data.list[i].canTradeFocaIds);
						exemDiv.setAttribute('sellFocaKey', data.data.list[i].sellFocaKey);
						exemDiv.setAttribute('needFocaKey', data.data.list[i].needFocaKey);	

						sellFocaKey = data.data.list[i].sellFocaKey;//发起人发出的福卡 （是当前用户需要的福卡）
						needFocaKey = data.data.list[i].needFocaKey;//发起人需要的福卡(我出的卡)
						sellerNickName = data.data.list[i].sellerNickName;//呢称
						userImg = data.data.list[i].sellerAvatar;//用户头像
						if(needFocaKey == "fx"){
							exemDiv.setAttribute('class', 'lq_btn cardTab coocaabtn');//领取
							exemDiv.innerHTML = '<ul class="userInfo"><p class="advert">广告位</p><img id="userFace" src='+userImg+'/><p id="userName" class="inaline">'+sellerNickName+'</p></ul><ul class="exchangecard_box"><div><span><img class="js_icon" src="images/s_chu.png"/></span><img class="js_card" src="images/window/'+sellFocaKey+'.png"/></div><div class="receive_hint"><p>发布者免费赠送</p><p>速速领取哦！</p></div><p><span class="exchange_btn"><img class="_drawbtnbgblur" src="images/receive_btn.png"/><img class="_drawbtnbgfocus" src="images/receive_focus.png"/></span></p></ul>';
						}else{
							exemDiv.setAttribute('class', 'jh_btn cardTab coocaabtn');//交换
							exemDiv.innerHTML = '<ul class="userInfo"><p class="advert">广告位</p><img id="userFace" src='+userImg+'/><p id="userName" class="inaline">'+sellerNickName+'</p></ul><ul class="exchangecard_box"><div><span><img class="js_icon" src="images/s_chu.png"/></span><img class="js_card" src="images/window/'+sellFocaKey+'.png"/></div><div><span><img class="js_icon" src="images/s_qiu.png"/></span><img class="js_card" src="images/window/'+needFocaKey+'.png"/></div><em class="arrow"><img src="images/arrow.png"/></em><p><span class="exchange_btn"><img class="_drawbtnbgblur" src="images/exchange_btn.png"/><img class="_drawbtnbgfocus" src="images/exchange_focus.png"/></span></p></ul>';
						}						
						$("#changeBox").append(exemDiv);
						
						map = new coocaakeymap($(".coocaabtn"),document.getElementById(focaKey), "btnFocus", function() {}, function(val) {}, function(obj) {});
					}
					$("#exem0").attr({"upTarget":"#release_btn"});
					var lastid1 = "#exem" + (data.data.list.length - 1);
					var lastid2 = "#exem" + (data.data.list.length - 2);
					var lastid3 = "#exem" + (data.data.list.length - 3);
					if(data.data.list.length < 48){
						$(lastid1).attr({"rightTarget":lastid1,"downTarget":lastid1});
						$(lastid2).attr({"downTarget":lastid2});
						$(lastid3).attr({"downTarget":lastid3});
					}else if(data.data.list.length == 48){
						$(lastid1).attr({"rightTarget":"#more","downTarget":"#more"});
						$(lastid2).attr({"downTarget":"#more"});
						$(lastid3).attr({"downTarget":"#more"});
					}

					$("#more").bind("focus", function() {
						getMarket(focaKey)
					});

					$(".cardTab").bind("focus", function() {
						var _index = parseInt($(".cardTab").index($(this))/3);
						var _eachheight = $(".cardTab")[0].offsetHeight+20;
						var myScrollTopValue = 0;
						myScrollTopValue = _index * _eachheight;
					//	console.log("滑动========"+myScrollTopValue);
						$("#changeBox").stop(true, true).animate({
							scrollTop: myScrollTopValue
						}, {
							duration: 0,
							easing: "swing",
							complete: function() {}
						});		
					});

					$(".jh_btn").unbind("itemClick").bind("itemClick", function() {
						tradeId = $(this).attr("tradeId");
						sellerKeyId = $(this).attr("sellerKeyId");
						canTradeFocaIds = $(this).attr("canTradeFocaIds");
						sellFocaKey = $(this).attr("sellFocaKey");
						needFocaKey = $(this).attr("needFocaKey");
						ss = canTradeFocaIds.split(",");// 剩余张数
						console.log(ss.length+"====交易===="+canTradeFocaIds);
						var _dateObj = {
							"page_name": "福卡集市",
							"activity_name":activity_name,
							"page_type":swithCardinfo(sellFocaKey),
							"button_name":"订单交换"
						};
						pageShowLog("okr_web_button_click",_dateObj);
						openBg();
						if(overTradeNumber > 0){
							if(ss.length == 1){//只剩一张
								document.getElementById("onlyone").style.display = "block";
								$("#only_cardName").html(swithCardinfo(needFocaKey));
								map = new coocaakeymap($(".coocaabtn"),document.getElementById("yesBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
							}else if(ss.length == 0){//没有符合条件的卡片
								document.getElementById("inconformity").style.display = "block";
								map = new coocaakeymap($(".coocaabtn"),document.getElementById("gotaskBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
							}else{
								document.getElementById("changeCard").style.display = "block";
								$("#card_chu .jh_card").attr("src","images/window/"+needFocaKey+".png");
								$("#card_de .jh_card").attr("src","images/window/"+sellFocaKey+".png");
								map = new coocaakeymap($(".coocaabtn"),document.getElementById("getBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
							}
						}else{
							if(ifLogin == false){//没有登录过
								document.getElementById("noChance_2").style.display = "block";
								map = new coocaakeymap($(".coocaabtn"),document.getElementById("loginBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
							}else{
								if(tradeNumber == 0){//表示他现在无法取消交易 来获取次数
									document.getElementById("noChance").style.display="block";
									map = new coocaakeymap($(".coocaabtn"),document.getElementById("gotaskBtn_1"), "btnFocus", function() {}, function(val) {}, function(obj) {});
								}else{//去取消一个交易
									cancelType = "market";
									document.getElementById("noChance_1").style.display="block";
									map = new coocaakeymap($(".coocaabtn"),document.getElementById("cancelTrans"), "btnFocus", function() {}, function(val) {}, function(obj) {});
								}
							}
						}
											
						
					});
					
					$(".lq_btn").unbind("itemClick").bind("itemClick", function() {
						tradeId = $(this).attr("tradeId");
						sellerKeyId = $(this).attr("sellerKeyId");
						canTradeFocaIds = "";
						sellFocaKey = $(this).attr("sellFocaKey");
						needFocaKey = $(this).attr("needFocaKey");
						var _dateObj = {
							"page_name": "福卡集市",
							"activity_name":activity_name,
							"page_type":swithCardinfo(sellFocaKey),
							"button_name":"订单领取"
						};
						pageShowLog("okr_web_button_click",_dateObj);
						getTrade(tradeId,sellerKeyId,canTradeFocaIds,sellFocaKey,needFocaKey,"lq");			
						
					});

					$("#getBtn,#yesBtn").unbind("itemClick").bind("itemClick", function() {
						console.log("====确定交换福卡===="+canTradeFocaIds);
						closeWindow();
						document.getElementById("changeCard").style.display = "none";
						document.getElementById("onlyone").style.display = "none";
						getTrade(tradeId,sellerKeyId,canTradeFocaIds,sellFocaKey,needFocaKey,"jh");
					});

					$("#release_btn").unbind("itemClick").bind("itemClick", function() {
						console.log("我要求卡:"+overTradeNumber);
						openBg();
						var _dateObj = {
							"page_name": "福卡集市页面",
							"activity_name":activity_name,
							"page_type":"",
							"button_name":"我要求卡"
						};
						pageShowLog("okr_web_button_click",_dateObj);
						if(overTradeNumber > 0){
							getMycard("maket");
						}else{
							if(ifLogin == false){//没有登录过
								var _dateObj = {
									"page_name": "福卡集市页面",
									"activity_name":activity_name,
									"page_type":"登录弹窗曝光",
								};
								pageShowLog("okr_web_page_show",_dateObj);
								document.getElementById("noChance_2").style.display = "block";
								map = new coocaakeymap($(".coocaabtn"),document.getElementById("loginBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
							}else{
								var _dateObj = {
									"page_name": "福卡集市页面",
									"activity_name":activity_name,
									"page_type":"交易机会已用完弹窗曝光",
								};
								pageShowLog("okr_web_page_show",_dateObj);
								if(tradeNumber == 0){//表示他现在无法取消交易 来获取次数
									document.getElementById("noChance").style.display="block";
									map = new coocaakeymap($(".coocaabtn"),document.getElementById("gotaskBtn_1"), "btnFocus", function() {}, function(val) {}, function(obj) {});
								}else{//去取消一个交易
									cancelType = "market";
									document.getElementById("noChance_1").style.display="block";
									map = new coocaakeymap($(".coocaabtn"),document.getElementById("cancelTrans"), "btnFocus", function() {}, function(val) {}, function(obj) {});
								}
							}
						}
						
					});
				}else{
					console.log("无数据")
				}

			}else {
				console.log("接口调取失败,请重试"+data.msg);
			}
		},
		error: function(err) {
			console.log("接口调取失败"+JSON.stringify(err));
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}
//集市交易
function getTrade(tradeId,sellerKeyId,canTradeFocaIds,sellFocaKey,needFocaKey,type){
	var _dateObj = {
		"page_name": "福卡集市页面",				
		"activity_name":activity_name,
		"card_name":swithCardinfo(sellFocaKey),
		"trade_result":"",
	};	
	var ajaxTimeoutFive = $.ajax({
		type: "post",
		async: true,
		timeout: 5000,
		url: _testurl + "/building/cny-foca/trade",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip":_chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"tradeId":tradeId,
			"sellerKeyId":sellerKeyId,
			"canTradeFocaIds":canTradeFocaIds,
			"sellFocaKey":sellFocaKey,
			"needFocaKey":needFocaKey
		},
		success: function(data) {
			console.log(canTradeFocaIds+"集市交易----"+JSON.stringify(data));
			openBg();
			if(data.code == "50100") {	
				_dateObj.trade_result = "订单交易成功";
				pageShowLog("okr_web_clicked_result",_dateObj);				
				document.getElementById("getCard").style.display = "block";
				if(type == "jh"){
					$(".success_tit").html("完成交换");
				}else if(type == "lq"){
					$(".success_tit").html("领取成功");
				}
				$(".getCard_name span").html(swithCardinfo(sellFocaKey));
				$("#get_card img").attr("src","images/window/"+sellFocaKey+".png");	
				map = new coocaakeymap($(".coocaabtn"), document.getElementById("mycardBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});	
			}else if(data.code == "92004"){
				_dateObj.trade_result = "交易不存在";
				pageShowLog("okr_web_clicked_result",_dateObj);	
				$("#invalid").show();
				setTimeout(function(){closeWindow(); }, 3000);
				map = new coocaakeymap($(".coocaabtn"), document.getElementById("allBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});	
			}else if(data.code == "92005"){
				_dateObj.trade_result = "交易已经被锁定";
				pageShowLog("okr_web_clicked_result",_dateObj);	
				$("#invalid").show();
				setTimeout(function(){closeWindow(); }, 3000);
				map = new coocaakeymap($(".coocaabtn"), document.getElementById("allBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});	
			}else {
				_dateObj.trade_result = "交易失败";
				pageShowLog("okr_web_clicked_result",_dateObj);	
				$("#invalid").show();
				setTimeout(function(){closeWindow(); }, 3000);
				map = new coocaakeymap($(".coocaabtn"), document.getElementById("allBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});	
			}


		},
		error: function(err) {
			console.log("接口调取失败"+JSON.stringify(err));
			_dateObj.trade_result = "交易失败";
			pageShowLog("okr_web_clicked_result",_dateObj);	
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}


//发布交易
function releasePublish(sellFocaKey,needFocaKey){
	var dateObj = {
		"page_name": "",
		"activity_name":activity_name,
		"trade_result":"",
		"card_name":swithCardinfo(needFocaKey),
	};
	if(document.getElementById("market").style.display == "block"){
		dateObj.page_name = "福卡集市页面";
	}else if(document.getElementById("myCard").style.display == "block"){
		dateObj.page_name = "我的福卡页面";
	}
	var ajaxTimeoutFive = $.ajax({
		type: "post",
		async: true,
		timeout: 5000,
		url: _testurl + "/building/cny-foca/publish",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip":_chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"sellFocaKey":sellFocaKey,
			"needFocaKey":needFocaKey,
		},
		success: function(data) {
			console.log("发布交易----"+JSON.stringify(data));
			openBg();			
			if(data.code == "50100") {	
				dateObj.release_trade_result = "订单发布成功";
				var _dateObj = {
					"page_name": "活动弹窗",
					"activity_name":activity_name,
					"page_type":"",
				};
				if(document.getElementById("market").style.display == "block"){
					_dateObj.page_type = "福卡集市页面[发布成功]";
					pageShowLog("okr_web_clicked_result",dateObj);		
				}else if(document.getElementById("myCard").style.display == "block"){
					_dateObj.page_type = "我的福卡页面[发布成功]";
					pageShowLog("okr_web_clicked_result",dateObj);
				}				
				pageShowLog("okr_web_page_show",_dateObj);		
				document.getElementById("publish").style.display = "block";
				$(".chu_card").attr("src","images/window/"+sellFocaKey+".png");
				if(needFocaKey != "fx"){					
					$("#qiu_publish").show();
					$(".qiu_card").attr("src","images/window/"+needFocaKey+".png");
				}else{
					$("#qiu_publish").hide();
				}
				
				map = new coocaakeymap($(".coocaabtn"), document.getElementById("gomarketBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});					
			}else if(data.code == "92001"){
				dateObj.release_trade_result = "用户没有该类型的福卡";
				pageShowLog("okr_web_clicked_result",dateObj);	
				$("#invalid").show();
				setTimeout(function(){closeWindow(); }, 3000);
			}else if(data.code == "92002"){
				dateObj.release_trade_result = "福卡类型错误";
				pageShowLog("okr_web_clicked_result",dateObj);
			}else {
				dateObj.release_trade_result = "订单交易失败";
				pageShowLog("okr_web_clicked_result",dateObj);
			}


		},
		error: function(err) {
			console.log("接口调取失败"+JSON.stringify(err));
			dateObj.trade_result = "订单交易失败";
			pageShowLog("okr_web_clicked_result",dateObj);
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}

//我的福卡
function getMycard(type){
	$(".mid_cardBox,._mid_cardBox ").animate({marginLeft:"0px"});
	if(type == "maket"){
		document.getElementById("market").style.display="block";
		document.getElementById("myCard").style.display="none";
		document.getElementById("myRelease").style.display="none";
	}else{
		document.getElementById("market").style.display="none";
		document.getElementById("myCard").style.display="block";
		document.getElementById("myRelease").style.display="none";
	}	
	// var url =  _testurl + "/building/cny/u-foca?id=" + _actionid + "&cOpenId = " + _openId + "&cUDID=" + _udid + "&MAC=" + _mac + "&cChip=" + _chip + "&cModel=" + _model + "&cEmmcCID="+_emmcCID;
	// console.log("我的福卡接口"+url);
	var ajaxTimeoutFive = $.ajax({
		type: "post",
		async: true,
		timeout: 5000,
		url: _testurl + "/building/cny-foca/number",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip":_chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID
		},
		success: function(data) {
			console.log("我的福卡----"+JSON.stringify(data));
			if(data.code == "50100") {
				overTradeNumber = data.data.overTradeNumber;//剩余交换机会
			//overTradeNumber = 0;
				margeNumber = data.data.margeNumber;//合并福卡数量
				tradeNumber = data.data.tradeNumber;//当前正在交易的数量
				ifLogin = data.data.ifLogin;//当前用户是否登陆
				console.log("剩余交换机会:"+overTradeNumber+";当前正在交易的数量:"+tradeNumber+"；拥有的卡数量："+data.data.userOwned.length+";需要的卡数量："+data.data.userNeeds.length);
				if(margeNumber == 0){
					$(".gather .num").html("");
					$(".gather img").attr("src","images/mycard/k.png");
				}else{
					$(".gather .num").html(margeNumber);
					$(".gather img").attr("src","images/mycard/1.png");
				}
				
				$("#cardMiddle,#lack_cardBox,#has_cardBox").html("");
				if(data.data.userOwned.length != 0){
					for(var i=0;i<data.data.userOwned.length;i++){
						if(type == "maket"){
							var exemDiv_sell = document.createElement("div");
							exemDiv_sell.setAttribute('id','sell' + i);
							exemDiv_sell.setAttribute('sell_focaEnums',data.data.userOwned[i].focaEnums);
							exemDiv_sell.setAttribute('class', 'sellCard coocaa_btn');
							exemDiv_sell.innerHTML = '<img src="images/window/'+data.data.userOwned[i].focaEnums+'.png"/><span class="focus _drawbtnbgfocus none"><img src="images/window/focus.png"/></span>';
							$("#has_cardBox").append(exemDiv_sell);
							$(".sellCard").attr("upTarget", "#sell"+i);
							$(".sellCard").attr("downTarget", "#cancelChangeBtn_1");
							$("#sell0").attr("leftTarget", "#sell0");
						}else{
							var exemDiv = document.createElement("div");
							exemDiv.setAttribute('focaEnums',data.data.userOwned[i].focaEnums);
							exemDiv.setAttribute('number',data.data.userOwned[i].number);
							exemDiv.setAttribute('id',"mycard_"+data.data.userOwned[i].focaEnums);
							exemDiv.setAttribute('class', data.data.userOwned[i].focaEnums + ' owned card coocaabtn');//领取
							number = data.data.userOwned[i].number;//卡片数量					
							exemDiv.innerHTML = '<span class="num">'+ number +'</span><img class="img" src="images/mycard/'+data.data.userOwned[i].focaEnums+'.png"/><span class="changeBtn _drawbtnbgfocus none"><img src="images/mycard/go_change.png"/></span><span class="focus _drawbtnbgfocus none"><img src="images/mycard/focus.png"/></span>';
							$("#cardMiddle").append(exemDiv);
							map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
						}
					}
	
				}

				if(data.data.userNeeds.length != 0){
					for(var i=0;i<data.data.userNeeds.length;i++){//用户没有的
						if(type == "mycard"){
							var exemDiv = document.createElement("div");
							exemDiv.setAttribute('id',"mycard_"+data.data.userNeeds[i].focaEnums);
							exemDiv.setAttribute('class', data.data.userNeeds[i].focaEnums + ' card coocaabtn');				
							exemDiv.innerHTML = '<span class="num"></span><img class="img" src="images/mycard/k_'+data.data.userNeeds[i].focaEnums+'.png"/><span class="focus _drawbtnbgfocus none"><img src="images/mycard/focus.png"/></span>';
							$("#cardMiddle").append(exemDiv);	
							map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
						}
	
	
						n = i+1;
						var exemDiv_need = document.createElement("div");
						exemDiv_need.setAttribute('id', 'needs' + n);
						exemDiv_need.setAttribute('needs_focaEnums',data.data.userNeeds[i].focaEnums);
						exemDiv_need.setAttribute('class', 'winCard coocaa_btn');
						exemDiv_need.innerHTML = '<img src="images/window/'+data.data.userNeeds[i].focaEnums+'.png"/><span class="focus _drawbtnbgfocus none"><img src="images/window/focus.png"/></span>';
						$("#lack_cardBox").append(exemDiv_need);
						$("#needs"+n).attr("upTarget", "#needs"+n);
						$(".winCard").attr("downTarget", "#cancelChangeBtn");
						if(type == "maket"){
							var _dateObj = {
								"page_name": "活动弹窗",
								"activity_name":activity_name,
								"page_type":"选择福卡弹窗",
							};
							pageShowLog("okr_web_page_show",_dateObj);
							openBg();
							document.getElementById("wantCard").style.display = "block";
							map = new coocaakeymap($(".coocaa_btn"), document.getElementById("f0"), "btnFocus", function() {}, function(val) {}, function(obj) {});
						}
					}			
				}


				$("#mycard_f1").attr({"leftTarget": "#mycard_f9","rightTarget": "#mycard_f2","upTarget": "#mycard_f1","downTarget": "#mycard_f2"});
				$("#mycard_f2").attr({"leftTarget": "#mycard_f1","rightTarget": "#mycard_f3","upTarget": "#mycard_f1","downTarget": "#mycard_f3"});
				$("#mycard_f3").attr({"leftTarget": "#mycard_f2","rightTarget": "#goTestbtn","upTarget": "#mycard_f2","downTarget": "#mycard_f4"});
				$("#mycard_f4").attr({"leftTarget": "#mycard_f3","rightTarget": "#goTestbtn","upTarget": "#mycard_f3","downTarget": "#mycard_f5"});
				$("#mycard_f5").attr({"leftTarget": "#mycard_f6","rightTarget": "#mycard_f4","upTarget": "#mycard_f4","downTarget": "#mycard_f5"});
				$("#mycard_f6").attr({"leftTarget": "#mycard_f7","rightTarget": "#mycard_f5","upTarget": "#mycard_f7","downTarget": "#mycard_f6"});
				$("#mycard_f7").attr({"leftTarget": "#mycard_f8","rightTarget": "#mycard_f6","upTarget": "#mycard_f8","downTarget": "#mycard_f6"});
				$("#mycard_f8").attr({"leftTarget": "#mycard_f8","rightTarget": "#mycard_f9","upTarget": "#mycard_f9","downTarget": "#mycard_f7"});
				$("#mycard_f9").attr({"leftTarget": "#mycard_f8","rightTarget": "#mycard_f1","upTarget": "#mycard_f1","downTarget": "#mycard_f8"});
				
				var lastid = "#needs" + (data.data.userNeeds.length);
				console.log("lastid========"+lastid);
				$(lastid).attr("rightTarget", lastid);				

				var _lastid = "#sell" + (data.data.userOwned.length - 1);
				$(_lastid).attr("rightTarget", _lastid);


				//调起交换弹窗
				$(".owned").unbind("itemClick").bind("itemClick", function() {
					focaEnums = $(this).attr("focaEnums");
					console.log("========="+focaEnums);
					var _dateObj = {
						"page_name": "我的福卡页面",
						"activity_name":activity_name,
						"button_name":swithCardinfo(focaEnums)
					};
					pageShowLog("okr_web_button_click",_dateObj);
					openBg();
					if(overTradeNumber > 0){
						if(data.data.userOwned.length > 3){
							$(".window .arrow").show();
						}else{
							$(".window .arrow").hide();
						}
						var _dateObj = {
							"page_name": "活动弹窗",
							"activity_name":activity_name,
							"page_type":"选择你想要的卡片",
						};
						pageShowLog("okr_web_page_show",_dateObj);
						document.getElementById("wantCard").style.display = "block";
						map = new coocaakeymap($(".coocaa_btn"), document.getElementById("f0"), "btnFocus", function() {}, function(val) {}, function(obj) {});
					}else{
						if(ifLogin == false){//没有登录过
							document.getElementById("noChance_2").style.display = "block";
							map = new coocaakeymap($(".coocaabtn"),document.getElementById("loginBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
						}else{
							if(tradeNumber == 0){
								document.getElementById("noChance").style.display="block";
								map = new coocaakeymap($(".coocaabtn"), document.getElementById("gotaskBtn_1"), "btnFocus", function() {}, function(val) {}, function(obj) {});
							}else{
								cancelType = "mycard";
								document.getElementById("noChance_1").style.display="block";
								map = new coocaakeymap($(".coocaabtn"), document.getElementById("cancelTrans"), "btnFocus", function() {}, function(val) {}, function(obj) {});
							}
						}
					}					
				});

				//弹窗卡片滑动
				$(".winCard").bind("focus", function() {
					var needsnum = data.data.userNeeds.length+1;
					var _index = $(".winCard").index($(this));
					var myScrollTopValue = 0;
					var myScrollTopValue = -(_index * 221)+"px";
					var _myScrollTopValue = -((needsnum - 3)*221)+"px";
					if(needsnum - _index <= 3){
						$(".mid_cardBox ").animate({marginLeft:_myScrollTopValue});
					}else{
						$(".mid_cardBox ").animate({marginLeft:myScrollTopValue});
					}					
				});

				//弹窗卡片滑动
				$(".sellCard").bind("focus", function() {
					var needsnum = data.data.userOwned.length;
					var _index = $(".sellCard").index($(this));
					var myScrollTopValue = 0;
					var myScrollTopValue = -(_index * 221)+"px";
					var _myScrollTopValue = -((needsnum - 3)*221)+"px";
					if(needsnum - _index <= 3){
						$("._mid_cardBox ").animate({marginLeft:_myScrollTopValue});
					}else{
						$("._mid_cardBox ").animate({marginLeft:myScrollTopValue});
					}					
				});
				//发布交易
				$(".winCard").unbind("itemClick").bind("itemClick", function() {
					needs_focaEnums = $(this).attr("needs_focaEnums");	
					console.log("========="+needs_focaEnums);				
					if(type == "maket"){//选择我想要的————》调起我有的
						var _dateObj = {
							"page_name": "活动弹窗",
							"activity_name":activity_name,
							"page_type":"选择送出的福卡",
						};
						pageShowLog("okr_web_page_show",_dateObj);
						openBg();
						document.getElementById("wantSell").style.display="block";
						if(data.data.userNeeds.length > 3){
							$(".window ._arrow").show();
						}else{
							$(".window ._arrow").hide();
						}
						map = new coocaakeymap($(".coocaa_btn"), document.getElementById("sell0"), "btnFocus", function() {}, function(val) {}, function(obj) {});
					}else{
						console.log(focaEnums+"=========");
						releasePublish(focaEnums,needs_focaEnums)
					}

				});
				//点击我有的
				$(".sellCard").unbind("itemClick").bind("itemClick", function() {
					sell_focaEnums = $(this).attr("sell_focaEnums");
					console.log(sell_focaEnums+"=====点击我有的===="+needs_focaEnums);
					releasePublish(sell_focaEnums,needs_focaEnums);
				});
			}else {
				console.log("接口调取失败,请重试");
			}
		},
		error: function(err) {
			console.log("接口调取失败"+JSON.stringify(err));
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}

//我的交易
function myListTrade(){
	cancelType = "";
	document.getElementById("myRelease").style.display="block";
	document.getElementById("myCard").style.display="none";
	document.getElementById("market").style.display="none";
	var ajaxTimeoutFive = $.ajax({
		type: "post",
		async: true,
		timeout: 5000,
		url: _testurl + "/building/cny-foca/list-trade",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip":_chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
		},
		success: function(data) {
			console.log("我的交易----"+JSON.stringify(data));
			document.getElementById("releaseBox").innerHTML = "";
			if(data.code == "50100") {				
				overTradeNumber = data.data.overTradeNumber;
				$("#myRelease .num").html(overTradeNumber);
				if(data.data.list.length != 0){					
					for(i=0;i<data.data.list.length;i++){
						var exemDiv = document.createElement("div");
						exemDiv.setAttribute('id', 't' + i);
						exemDiv.setAttribute('tradeId',data.data.list[i].tradeId);						

						sellFocaKey = data.data.list[i].sellFocaKey;//发起人发出的福卡 （是当前用户需要的福卡）
						needFocaKey = data.data.list[i].needFocaKey;//发起人需要的福卡
						sellerNickName = data.data.list[i].traderNickName;//呢称
						userImg = data.data.list[i].traderAvatar;//用户头像
						state = data.data.list[i].state;//状态 0表示交换中 1表示已经交换完成 -1表示该交换已经被取消
						if(state == 0){
							exemDiv.setAttribute('class',"cardTab1 coocaabtn clear_jy");
							exemDiv.innerHTML = '<ul class="userInfo"><img id="userFace" src='+userImg+'/><p id="userName" class="inaline">'+sellerNickName+'</p></ul><ul class="exchangecard_box"><div class="jy_chu"><span><img class="jy_icon" src="images/jy_chu.png"/></span><img class="jy_card" src="images/window/'+sellFocaKey+'.png"/></div><div class="jy_qiu"><span><img class="jy_icon" src="images/jy_qiu.png"/></span><img class="jy_card" src="images/window/'+needFocaKey+'.png"/></div><p style="text-align: center;"><img class="_drawbtnbgblur" src="images/cancel_btn.png"/><img class="_drawbtnbgfocus" src="images/cancel_focus.png"/></p></ul>';
						}else{
							exemDiv.setAttribute('class',"cardTab1 coocaabtn");
							exemDiv.innerHTML = '<ul class="userInfo"><img id="userFace" src='+userImg+'/><p id="userName" class="inaline">'+sellerNickName+'</p></ul><ul class="exchangecard_box"><div class="jy_chu"><span><img class="jy_icon" src="images/jy_chu.png"/></span><img class="jy_card" src="images/window/'+sellFocaKey+'.png"/></div><div class="jy_qiu"><span><img class="jy_icon" src="images/jy_qiu.png"/></span><img class="jy_card" src="images/window/'+needFocaKey+'.png"/></div><p style="text-align: center;"><img class="_drawbtnbgblur" src="images/alerdy.png"/><img class="_drawbtnbgfocus" src="images/alerdy_focus.png"/></p></ul>';
						}						
						$("#releaseBox").append(exemDiv);
						map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
					}

					$(".cardTab1").bind("focus", function() {
						var _index = parseInt($(".cardTab1").index($(this))/2);
						var _eachheight = $(".cardTab1")[0].offsetHeight+60;
						var myScrollTopValue = 0;
						myScrollTopValue = _index * _eachheight;
					//	console.log("滑动========"+myScrollTopValue);
						$("#releaseBox").stop(true, true).animate({
							scrollTop: myScrollTopValue
						}, {
							duration: 0,
							easing: "swing",
							complete: function() {}
						});		
					});

					$(".clear_jy").unbind("itemClick").bind("itemClick", function() {
						tradeId = $(this).attr("tradeId");
						console.log("取消"+tradeId);
						cancelTrade(tradeId)
					});
				}else{
					html = '<div class="nothing"><img src="images/jy_nothing.png"/></div>'
					$("#releaseBox").append(html);
					console.log("无数据")
				}

			}else {
				console.log("领取失败,请重试");
			}
		},
		error: function(err) {
			console.log("接口调取失败"+JSON.stringify(err));
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}

//取消交易
function cancelTrade(tradeId){
	var ajaxTimeoutFive = $.ajax({
		type: "post",
		async: true,
		timeout: 5000,
		url: _testurl + "/building/cny-foca/cancel-trade",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip":_chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"tradeId":tradeId
		},
		success: function(data) {
			console.log("取消交易----"+JSON.stringify(data));
			if(data.code == "50100") {
				console.log("取消成功");
				myListTrade();
			}else if(data.code == "92004"){
				console.log("交易不存在")
			}else if(data.code == "92005"){
				console.log("交易已经被锁定")
			}else {
				console.log("交易已经失效");
			}
		},
		error: function(err) {
			console.log("接口调取失败"+JSON.stringify(err));
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}

//登录增加机会
function addLoginnum(_openId){
	var ajaxTimeoutFive = $.ajax({
		type: "post",
		async: true,
		timeout: 5000,
		url: _testurl + "/building/cny-foca/add-login-num",
		data: {
			"id": _actionid,
			"cOpenId": _openId,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip":_chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
		},
		success: function(data) {
			console.log(_openId+"登录增加机会----"+JSON.stringify(data));
			if(data.code == "50100") {
				if(document.getElementById("market").style.display == "block"){
					getMarket("allBtn");
				}else if(document.getElementById("myCard").style.display == "block"){
					getMycard("mycard");
				}				
			}else {
				console.log("非法请求");
				map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
			}
		},
		error: function(err) {
			console.log("接口调取失败"+JSON.stringify(err));
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}

//监听账户变化
function listenUserChange() {
	coocaaosapi.addUserChanggedListener(function(message) {
		needSentUserLog2 = true;
	});
}
//启登录
function startLogin(needQQ) {
	console.log("-----startLogin------ " + _tencentWay);
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
	console.log("=================button===============");
	$("#goMarkebtn").unbind("itemClick").bind("itemClick", function() {
		document.getElementById("myCard").style.display = "none";
		document.getElementById("myRelease").style.display = "none";
		document.getElementById("market").style.display = "block";
		var _dateObj = {
			"page_name": "我的福卡页面",
			"activity_name":activity_name,
			"button_name":"去福卡集市找福卡"
		};
		pageShowLog("okr_web_button_click",_dateObj);
		getMarket("allbtn");
	});


	$("#trade_btn").unbind("itemClick").bind("itemClick", function() {
		var _dateObj = {
			"page_name": "我的福卡页面",
			"activity_name":activity_name,
			"page_type":"",
			"button_name":"我的交易"
		};
		pageShowLog("okr_web_button_click",_dateObj);
		myListTrade();
	});
	

	

	$("#cancelBtn,#noBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("取消交换福卡");
		closeWindow();
		document.getElementById("changeCard").style.display = "none";
		document.getElementById("onlyone").style.display = "none";
		var _dateObj = {
			"page_name": "活动弹窗",
			"activity_name":activity_name,
			"button_name":"取消"
		};
		pageShowLog("okr_web_page_show",_dateObj);
		getMarket("allbtn");
	});


	$("#get_login,#loginBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("登录");
		needSentUserLog = true;
		if (_qsource == "yinhe") {
			startLogin(false);
		} else{
			startLogin(true);
		}
	});
	

	$(".cardBtn").bind("focus", function() {
		var _index = $(".cardBtn").index($(this));
		console.log("筛选");
		var id = $(this).attr("id");
		var _eachheight = $(".cardBtn")[0].offsetHeight+23;
		var myScrollTopValue = 0;
		var myScrollTopValue = _index * _eachheight;
	//	console.log(_index+"=====移动========"+myScrollTopValue);
		$("#screen_box").stop(true, true).animate({
			scrollTop: myScrollTopValue
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
		});	
		getMarket(id);	
		var _dateObj = {
			"page_name": "福卡集市页面",
			"activity_name":activity_name,
			"page_type":swithCardinfo(id),
			"button_name":swithCardinfo(id)
		};
		pageShowLog("okr_web_button_click",_dateObj);
	});

	$("#backBtn,#goonBtn,#cancelChangeBtn,#cancelChangeBtn_1,#backBtn_1,#goonBtn_1,#goonBtn_2,#goonBtn_3").unbind("itemClick").bind("itemClick", function() {
		console.log("再看看,逛逛,再想想");
		closeWindow();
		if(document.getElementById("myCard").style.display == "block"){
			getMycard("mycard");
		}else if(document.getElementById("market").style.display == "block"){
			getMarket("allBtn");
		}
	//	map = new coocaakeymap($(".coocaabtn"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
	});
	$("#goTestbtn").unbind("itemClick").bind("itemClick", function() {
		var _dateObj = {
			"page_name": "我的福卡页面",
			"activity_name":activity_name,
			"button_name":"做任务得抽卡机会"
		};
		pageShowLog("okr_web_button_click",_dateObj);
		coocaaosapi.startNewBrowser2(exemurl,function(){navigator.app.exitApp();},function(){});
	});
	$("#gotaskBtn,#gotaskBtn_1").unbind("itemClick").bind("itemClick", function() {
		console.log("做任务"+exemurl);
		coocaaosapi.startNewBrowser2(exemurl,function(){navigator.app.exitApp();},function(){});
	});	
	$("#mycardBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("去福卡页面");
		closeWindow();
		document.getElementById("window").style.display = "none";
		getMycard("mycard");
	});	
	$("#gomarketBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("去集市页面");
		closeWindow();
		document.getElementById("window").style.display = "none";
		getMarket("allbtn");
	});	
	$("#cancelTrans").unbind("itemClick").bind("itemClick", function() {
		console.log("去我的交易页面");
		closeWindow();
		document.getElementById("window").style.display = "none";
		myListTrade();
	});	

	


	

}


//onResume事件
function onResumeFunc() {
	console.log("in onResumeFunc");

	
	var _dateObj = {
		"page_name": "春节活动登录弹窗",
		"activity_name": activity_name,
		"login_result": "",
	}
	console.log(needSentUserLog+"登录监听====="+needSentUserLog2);
	closeWindow();
	if(needSentUserLog == true){
		needSentUserLog = false;
		if (needSentUserLog2 == true) {
			needSentUserLog2 = false;
			_dateObj.login_result = "登录成功";
			pageShowLog("okr_web_clicked_result",_dateObj);
			document.getElementById("hint1").style.display = "block";
			document.getElementById("hint2").style.display = "none";
			if(document.getElementById("myCard").style.display == "block"){
				_dateObj.last_page_name = "我的福卡页面";
			}else{
				_dateObj.last_page_name = "福卡集市页面";		
			}
			hasLogin(needQQ,1);//1-增加机会	
		}else{
			needSentUserLog2 = false;
			_dateObj.login_result = "登录失败";
			pageShowLog("okr_web_clicked_result",_dateObj);
		}
	}
}



function openBg(){
	document.getElementById('bgMask').style.display = "block";
	document.getElementById('window').style.display = "block";
}
function closeWindow(){
	document.getElementById('bgMask').style.display = "none";
	document.getElementById('window').style.display = "none";
	$(".window").hide();
	$(".cardname_style").html("");
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

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


function pageShowLog(logName,dateObj) {
	var _dataString = JSON.stringify(dateObj);
	coocaaosapi.notifyJSLogInfo(logName, _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}


//获取广告信息
function selectAd(boxId,appid,game_id,game_scene,game_panel,game_position,activity_id,task_id){
    console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    coocaaosapi.getAdData(appid,game_id,game_scene,game_panel,game_position,activity_id,task_id,function (msg) {
        console.log("admsg===="+msg);
        ADMsg = JSON.parse(msg);
        if(JSON.parse(msg).total > 0){
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            $("#"+boxId).css("backgroundImage","url("+JSON.parse(msg).schedules[0].content+")");
            sentInnerAdshow("img",JSON.parse(msg),game_id,game_scene,game_panel,game_position,activity_id,task_id);
            sentThirdAdshow("img",JSON.parse(msg));
        }else{
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        }
    },function (error) {})
}
//广告内部提交
function sentInnerAdshow(type,msg,game_id,game_scene,game_panel,game_position,activity_id,task_id) {
    coocaaosapi.submitAdData(JSON.stringify(msg.schedules[0]),game_id,game_scene,game_panel,game_position,activity_id,task_id,function (msg) {
        console.log("sent  inner  log  success==="+msg);
    },function (err) {
        console.log("sent  inner  log  err==="+err);
    })
}
//广告第三方监测
function sentThirdAdshow(type,msg) {
    var thirdUrl = "";
    if(type == "img"){
        thirdUrl = JSON.stringify(msg.schedules[0].track_url);
    }
    else if(type == "videoStart"){
        thirdUrl = JSON.stringify(msg.schedules[0].player_start_tracks);
    }
    else if(type == "videoEnd"){
        thirdUrl = JSON.stringify(msg.schedules[0].player_end_tracks);
    }
    coocaaosapi.submitThirdAdData(thirdUrl,msg.schedules[0].schedule_id,msg.schedules[0].order_id,msg.schedules[0].adspace_id,function (msg) {
        console.log("sent  third  log  success==="+msg);
    },function (err) {
        console.log("sent  third  log  err==="+err);
    })
}




selectAd("adStation","CCADTV10017","G0003","1","1","1","","");