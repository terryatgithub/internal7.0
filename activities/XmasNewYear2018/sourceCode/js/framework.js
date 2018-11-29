//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
var _urlGetPacklists = "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList";
var _urlActivityServer = "http://beta.restful.lottery.coocaatv.com/light";
var _xMasNewYearActivityId = 164;
//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
//var _urlGetPacklists;
//var _urlActivityServer = "https://restful.skysrt.com/light";
//var _xMasNewYearActivityId;
//-----------------------------正式上线需配置参数 end---------------------------------//

//全局参数
var _macAddress, _activityId="", _TVmodel, _TVchip, _emmcCID;
var _access_token = "", _openId, _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;

//函数正式开始：
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
		//PC debug start
//		PCOnly_getPackLists();
		//PC debug end
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
	},
	onDeviceReady: function() {
		app.receivedEvent("deviceready");
		app.triggleButton();
	},
	receivedEvent: function(id) {
		console.log(id);
	},
	handleBackButtonDown: function() {
		navigator.app.exitApp();
	},
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
		$(".coocaa_btn").bind("itemClick", function() {
			var _Index1 = $(".coocaa_btn").index($(this));
			console.log("itemClick _Index1 = " + _Index1);
			processKey($(this));
		});
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		getDeviceInfo();
	}
};

app.initialize();

//处理按键
function processKey(el) {
	var curId = el.attr("id");
	console.log("curId: "+ curId);
	
}
//获取设备信息并初始化
function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log("getDeviceInfo success:"+message);
		_TVmodel = message.model;
		_TVchip = message.chip;
		_macAddress = message.mac;
		_activityId = message.activeid;
		if (message.emmcid ==""||message.emmcid==null) {
			_emmcCID = "123456";
		} else{
			_emmcCID = message.emmcid;
		}

		console.log(_macAddress+"--"+_activityId);
		
		hasLogin(false);
	}, function(error) {
		console.log("获取设备信息出现异常。");
	});
}
//获取活动开始时间等信息
function getActivityInfos() {
	console.log(_xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 10000,
		dataType: 'json',
		jsonp: "callback",
		url: _urlActivityServer + "/xmas/init",
		data: {
			"id": _xMasNewYearActivityId,
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
			if(data.code == "50100") { //活动已开始
				getPackLists();
			}else if(data.code == "50003") {//活动已结束
				setToastEndDisplay("block");
			}
		},
		error: function() {
			
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
		}
	});	
}
//获取打包清单
function getPackLists() {
	var data = {
		"token": _access_token,
		"cudid": _activityId + "_" + _macAddress
	};
	data = JSON.stringify(data);
	console.log("getPackLists param: "+ data);
	
	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 10000, 
		dataType: 'json',
		jsonp: "callback",
		url: _urlGetPacklists,
		data: {param: data},
		success: function(data) {
			console.log("getPackLists success..." + JSON.stringify(data));
			if(data.code == 0) {
				processPackListsData(data);
			}
		},
		error: function(error) {
			console.log("getPackLists error..." + JSON.stringify(error));
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("getPackLists complete--"+status);
			if(status=='timeout'){
	 　　　　　 		ajaxTimeoutOne.abort();
	　　　　	}
	　　	}
	});	
	
}
//处理从后台返回的打包列表数据
function processPackListsData(data) {
	var len = 0;	
	if(data.data == null || ((len = data.data.length) <= 0)) {//没有打包商品,显示toast_empty
		setToastEmptyDisplay("block");
		return;
	}
	
	for(var i=0; i<len; i++) {
		var goodsInfo = JSON.parse(data.data[i].goodsInfo);
		console.log("i:"+i+", goodsinfo:" + goodsInfo.goodsId + " "+goodsInfo.goodsName+" "+ goodsInfo.promotePrice + " "+goodsInfo.shopPrice);
		
		var goodsItem = '<div  class="goodsItemClass coocaa_btn" goodsid=" ' + goodsInfo.goodsId + ' "> \
							<div class="packGoodsItemPic"></div>										\
							<div class="packGoodsItemName">' + goodsInfo.goodsName + '</div>\
							<div class="packGoodsItemLabel">\
								<div class="packGoodsItemLabelPriceNow">￥' + goodsInfo.shopPrice + '</div>\
								<div class="packGoodsItemLabelTip">原价：</div>\
								<div class="packGoodsItemLabelPriceOld">￥' + goodsInfo.promotePrice + '</div>\
							</div>\
						</div>';
		$("#packGoodsContainer").append(goodsItem);			
	}
	$("#packGoodsContainer").css("display", "block");
	
	if(len <= 5) { //显示更多商品
		setMoreGoodsContainerDisplay("block");	
	}
	
	app.registerKeyHandler();
	map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
}

//设置 moreGoodsContainer display状态
function setMoreGoodsContainerDisplay(display) {
	$("#moreGoodsContainer").css("display", display);
}

//设置toastEmpty display状态
function setToastEmptyDisplay(display) {
	$("#toastEmpty").css("display", display);
	app.registerKeyHandler();
	map = new coocaakeymap($(".coocaa_btn"), document.getElementById("toastEmpty"), "btn-focus", function() {}, function(val) {}, function(obj) {});
}
//设置toastEnd display状态
function setToastEndDisplay(display) {
	$("#toastEnd").css("display", display);
	app.registerKeyHandler();
	map = new coocaakeymap($(".coocaa_btn"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
}


function hasLogin(needQQ) {
	console.log("in hasLogin");
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			} else {
				_tencentWay = "qq";
			}
			_access_token = "";
			//未登录时获取活动信息:
			getActivityInfos();
		} else {
			coocaaosapi.getUserInfo(function(message) {
				exterInfo = message.external_info;
				_openId = message.open_id;
				_nickName = message.nick_name;
				
				coocaaosapi.getUserAccessToken(function(message) {
					_access_token = message.accesstoken;
					console.log(_access_token);
					if(exterInfo == "[]") {
						exterInfo = '[{}]';
					} else {}
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
									_vuserid = qqinfo[b].vuserid;
									if(_vuserid == undefined) {
										_vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
									}
								}
								break;
							} else {
								_qqtoken = "";
							}
						}
					}
					//登录后获取活动信息
					getActivityInfos();
				}, function(error) {})
			}, function(error) {});
		}
		
	}, function(error) {});
}



//for PC debug only:
//获取打包清单
function PCOnly_getPackLists() {
	var myUrl = _urlGetPacklists + "?param=";
	var data = {
		"token": "",
		"cudid": _activityId + "_" + _macAddress
	};
	myUrl += JSON.stringify(data);
	console.log("getPackLists myUrl:"+myUrl);
	
	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 10000, 
		dataType: 'jsonp',
		jsonp: "callback",
		url: myUrl,
		success: function(data) {
			console.log("getPackLists success..."+JSON.stringify(data));
			if(data.code == 0) {
				
			}
		},
		error: function(error) {
			console.log("getPackLists error..."+error);
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("getPackLists complete--"+status);
			if(status=='timeout'){
	 　　　　　 		ajaxTimeoutOne.abort();
	　　　　	}
	　　	}
	});	
	
}