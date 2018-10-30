//通用全局变量：
var _Lindex= "";
var _userPoints = 0;
var _userLv = 1;

//从底层获取设备信息，需要的参数
var _timeStamp = "";
var accountVersion = "";
var cAppVersion = "";
var deviceInfo = null; // tobefix
var macAddress = null;
var TVmodel = null;
var TVchip = null;
var activityId = null;
var loginstatus = null;
var tencentWay = null;
var user_flag = null;
var access_token = null;
var login_type = null;
var vuserid = null;
var cOpenId = "";

//从后台获取电视的视频源：
var _TVSource = "";//视频源

var _brand = "";
var _appid="", _source, _model, _chip, _mac, _serviceid, _version, _type, _devicebarcode, _time, _accessToken = "";
var _size, _resolution, _appVersion, _fmodel, _pattern, _appID, _appversion = "";

//后台接口： 获取用户会员信息（金币数、点数、等级信息），需要的参数：
var _testurl = "http://172.20.132.206:7070/"; //"https://member.cooca.com/";//正式地址
var _clientId = "9F072A0ABF6E2B3D";//test ; "c7ea82d00b5a4aa3";//正式的
//var _clientKey = "85bdfb9ef29b4776";//test

//从后台获取产品源，需要的参数：
var _userFlag = 0; //0/1/2 未登录 /usertoken/openid(coocaa)
var _userId = "";  //如上；
var _qqtoken = "";//qq信息

//当前页面全局变量：
var _sourceDetailsArray = new Array();


//页面部分的逻辑
var app = {
    canonical_uri: function(src, base_path) {
        var root_page = /^[^?#]*\//.exec(location.href)[0],
            root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
            absolute_regex = /^\w+\:\/\//;
        // is `src` is protocol-relative (begins with // or ///), prepend protocol  
        if (/^\/\/\/?/.test(src)) {
            src = location.protocol + src;
        }
        // is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)  
        else if (!absolute_regex.test(src) && src.charAt(0) != "/") {
            // prepend `base_path`, if any  
            src = (base_path || "") + src;
        }
        // make sure to return `src` as absolute  
        return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
    },

    rel_html_imgpath: function(iconurl) {
        // console.log(app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1')));
        return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
    },

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
    	//进入时,先画一次默认页面内容:
    	app.pageInit();

//		//以下是为在PC上调试方便所加，后续要删除 -start-
//  	getProductPackListsFake();
//		map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
//		app.registerKeyHandler();
//
//	    //以下是为在PC上调试方便所加，后续要删除 -end-
    
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButton, false);
        document.addEventListener('backbuttondown', this.onBackButtonDown, false);
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener('pause', this.onPause, false);
    },
    onBackButton: function() {
        console.log("in onBackButton");
        //navigator.app.exitApp();
    },
    onBackButtonDown: function() {
        console.log("in handleBackButtonDown");
        navigator.app.exitApp();
    },
    onDeviceReady: function() {
        console.log("in onDeviceReady");
		app.receivedEvent('deviceready');
		app.triggleButton();

		//初始落焦
        var initPhoneMap = function(obj) {
			map = new coocaakeymap($(".coocaa_btn"), obj, "btn-focus", function() {}, function(val) {}, function(obj) {});
			console.log("----------initPhoneMap End---------");
		}
		var firstFocus = document.getElementsByClassName("coocaa_btn")[0];
		initPhoneMap(firstFocus);

		//注册事件监听
		app.registerEventHandler();
		//注册按键监听
		app.registerKeyHandler();
		getLocalDeviceInfo();
    },
    onResume: function() {
        console.log("in onResume");
    },
    
    onPause: function() {
        console.log("in onPause");
    },
	
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	},
	
	registerEventHandler: function() {
		console.log("registerEventHandler---");
		coocaaosapi.addUserChanggedListener(function(message) {
			console.log("用户登录状态改变..."+JSON.stringify(message));
			//当用户登录状态发生变化时,重绘页面,重新落焦,并重新获取用户金币等数据:
			resetUserStatus();
			app.pageInit();
			map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
			getLocalDeviceInfo();
		});
	},
	
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
        
        //注册按键
		$(".coocaa_btn").bind("itemClick", function() {
				_Lindex = $(".coocaa_btn").index($(this));
				console.log("itemClick _Lindex = " + _Lindex);
				processKey();
		});
		
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("----------focus-----"+_Lindex);
			scrollPage();
		});
	},
	
    pageInit: function() {
    	console.log("in pageInit.");
    	updateUserLoginState(true);
    	console.log("out pageInit.");
    },
    
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
	}
};

app.initialize();

//打开图标对应的产品包购买页面
function enterPurchasePage(){//需要处理
	console.log("enterPurchasePage in...");
	var curEl = $(".coocaa_btn").eq(_Lindex);
	var index = $(".vipEntry").index(curEl);
	
	if(index < ($(".vipEntry").length -1)) { //后台产品源列表信息
		var _sourceId = _sourceDetailsArray[index].id;//1; //产品源ID
		var _businessType = 0; //业务线，非必填项，-1获取全部,0获取影视，1获取教育,2iptv，默认0
		console.log("enterPurchasePage in..._sourceId:"+_sourceId + "_businessType:"+_businessType);
		coocaaosapi.startMovieMemberCenter(_sourceId.toString(), _businessType.toString(),
				function(message){
					console.log(JSON.stringify(message));
				}, function(error){console.log(error);});
	}else if(index == ($(".vipEntry").length -1)) {//最后1个是聚体育
		coocaaosapi.startPPSportsPage( function(message){
					console.log(JSON.stringify(message));
				}, function(error){console.log(error);});
	}
	
	console.log("enterPurchasePage out...");
}

//更新页面会员VIP内容及状态信息
function updateMemberVIPStates(data) {
	console.log("updateMemberVIPStates in...");
	
	//step1: 获取后台返回的产品源列表：
	var videoArray = data.data.sources;
	var sourceLen = videoArray.length;
	console.log("source length: "+sourceLen);
	
	function getSourceDetails(item,index,arr) {
		var id = item.source_id;
		var name = item.source_name;
		var des = item.description;
		console.log("source i:"+index+", id:"+id+", name:"+name+",des:"+des);
		var sourceItem = {
			"id":id,
			"name":name,
			"des":des
		}
		_sourceDetailsArray[index] = sourceItem;
	}
	videoArray.forEach(getSourceDetails);
	
	//debug：
	function printInfo(item,index,arr) {
		console.log("new array:"+index+" "+item.id+" "+item.name+" "+item.des);
	}
	console.log("new array len:"+_sourceDetailsArray.length);
	_sourceDetailsArray.forEach(printInfo);
	
	//step2:在页面的VIP类型区创建对应个数的div:
	drawVipEntryZone();

	console.log("updateMemberVIPStates out...");
}

function drawVipEntryZone() {
	var vipZoneWidth=1746;//vip整个区域的宽度
	var barMargin = 30;//每个vip图标的margin-right固定为30
	var maxNumInOnePage = 4;//页面最多显示4个
	var barNum = _sourceDetailsArray.length + 1;//vip图标个数,要加上聚体育（聚体育是第三方，不是从后台获取的）
	var barWidth = Math.round((vipZoneWidth - barMargin*(maxNumInOnePage-1))/maxNumInOnePage);

	//计算bar宽度
	if(barNum == 1) {
		console.log("total num 1, take all ...");
		barWidth = vipZoneWidth;
	}else if(barNum < maxNumInOnePage) {
		console.log("total num <4, one page is enough...");
		barWidth = Math.round((vipZoneWidth - barMargin*(barNum-1))/barNum);
	}
	
	//根据bar的个数复制插入更多bar：
	var i = 0
	for(i = 0; i<barNum-1; i++) {
		$(".vipEntryZone").append($(".vipEntry:last-of-type").clone(true));
		$(".vipEntry:last-of-type").attr("id", "vipEntry"+(i+2));
	}
	$(".vipEntry").css("width", barWidth+"px");
	//重绘后需要更新焦点：
	map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
	
	//给每个bar填充显示内容（默认内容就是聚体育，放在最后一个）:
	for(i = 0; i<barNum-1; i++) {
		var cur = $(".vipEntry").eq(i);
		$(".vipEntry:nth-child("+(i+1)+")>.vipEntryTitle").text(_sourceDetailsArray[i].name);
		$(".vipEntry:nth-child("+(i+1)+")>.vipEntryDescription").text(_sourceDetailsArray[i].des);
	}
}

//ajax跨域，需要设置header，这种情况需要后台服务器配置Access-Control-Allow-Origin 
function getProductPackLists() {
	console.log("getProductPackLists in..._userFlag:"+_userFlag + "_accessToken:"+_accessToken + "openid:"+ cOpenId);
	
	switch(_userFlag) {
		case 1:
			_userId = _accessToken;
			break;
		case 2:	
			_userId = cOpenId;
			break;
	}

	//从后台获取产品源列表的测试接口
	var myUrl = "http://172.20.132.182:8090/v3/source/getSourceList.html";
	var data = {
			"user_flag": _userFlag,
			"user_id": _userId,
			"client_type": 4,//固定4
			"business_type": 0,//-1:all 0:movie 1:education
			"third_user_id": _qqtoken //腾讯的openid
	}
	data = encodeURIComponent(JSON.stringify(data));
	myUrl = myUrl + "?data=" + data;
	console.log("total url: "+ myUrl);

	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout : 10000, 
		dataType: 'json',
		url: myUrl,
		headers: {
//			"Accept-Encoding":"",
			"cUDID":"",
			"MAC": _mac,
			"cModel": _model,
			"cChip": _chip,
			"cSize": _size,
			"cResolution": _resolution, //哪里获取?
			"cTcVersion": _version,
			"cFMode": _fmodel,
			"cPattern": _pattern,
			"cUserInfo": cOpenId,
//			"cBrand": _brand,
//			"cCreen": "",
//			"vAcceptSources":"tencent,iqiyi,voole,sky", //?how
			"vAppID": _appID,
			"vAppVersion": _appversion			
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			//todo:
			console.log("data.code:"+data.code + "data.message:"+data.message);
			if(data.code == 0) {
				console.log("vip info get ok, let's go...");
				updateMemberVIPStates(data);
			}
		},
		error: function(error) {
			console.log('Error'+JSON.stringify(error));
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			console.log("xmlhttp return : "+XMLHttpRequest.readyState +" status:"+XMLHttpRequest.status);
　　　	　	console.log("-------------getProductPackLists complete-status:"+status+"XMLHttpRequest.resheader:"+XMLHttpRequest.getAllResponseHeaders());
			if(status=='timeout'){
		 　　　　　 	ajaxTimeoutOne.abort();
	　　　　	}
	　　	}
	});	
	console.log("getProductPackLists out...");
}

//处理用户按键
function processKey() {
	console.log("processKey in");
	var el = $(".coocaa_btn").eq(_Lindex);
	var elId = el.attr("id");
	console.log("cur focus id: ===="+elId);
	if (elId =="notLoginId") {
		console.log("user start login, TVSource:"+_TVSource);
		startLogin(_TVSource);
	}else if(el.hasClass("vipEntry")) {
		console.log("user start purchase");
		//测试进入购买页面：
		enterPurchasePage();
	}
}

//用户退出登录时复位用户信息
function resetUserStatus() {
	_userPoints = 0;
	_userLv = 1;	
}

//用户操作上下键时移动页面,包括焦点的切换:(先用虚拟焦点的方式实现再说)
function scrollPage() {
	var curEl = $(".coocaa_btn").eq(_Lindex);

	var mytop = 0;	
//	var containerHeight = $(".innerContainer").height();
//	var $window = $(window);
//	var windowHeight = $window.height();
//	var headerHeight = $(".header").height();
//	var mytopMax = containerHeight - $window.height() + headerHeight;
//
//	console.log("scrollPage..cur id:"+ curEl.attr("id")+
//		" containerHeight"+containerHeight + " headerHeight"+headerHeight+" mytopMax"+mytopMax);
	
	//上下移动时:
	switch(curEl.attr("id")) {
		case "vipPrivilegeId":
			mytop = parseInt(curEl.css("top"));
			break;
		case "vf1":
			mytop = parseInt(curEl.css("top"))
			break;
		default:
			mytop = 0;
			break;
	}
	console.log("scrollPage ....mytop:"+mytop);
	var container = $(".innerContainer");
	container.css("transform", "translateY(-" + mytop + "px)");
	container.css({
		"transition": "all 0.5s",
		"-moz-transition": "all 0.5s",
		"-webkit-transition": "all 0.5s"
	});

	//vipbar区超过4个图标,需要左右移动时:
	if(curEl.hasClass("vipEntry") && ($(".vipEntry").length > 4)) {
		var curIndex = $(".vipEntry").index(curEl);
		var offsetH = 0;
		if(curIndex > 3) {
			var offsetDelta = curEl.outerWidth(true);
			offsetH = (curIndex - 3) * offsetDelta;
		}
		console.log("H index: "+curIndex);
		var vipBarZone = $(".vipEntryZone");
		vipBarZone.css("transform", "translateX(-"+offsetH+"px)");
		vipBarZone.css({
			"transition": "all 0.5s",
			"-moz-transition": "all 0.5s",
			"-webkit-transition": "all 0.5s"
		});
	}
}

//从后台获取用户金币/点数等信息
function getUserCoinsInfo() {
	console.log("getUserCoinsInfo in...");

	//time
	var timestamp = Date.parse(new Date());
	var tmpstring = timestamp.toString();
	var tmpnum = tmpstring.substr(0, 10);
	_timeStamp = tmpnum;

	var ajaxTimeoutTwo = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v4/public/query-pointsCoinsLevelInfo-byToken",
		data: {
			"clientId": _clientId,
			"accessToken": access_token,
			"currentTimestamp": _timeStamp,
			"callback": "myCallbackFunc"
		},
		
		success: function(data) {
			console.log("获取成功");
			console.log(JSON.stringify(data));
			if(data.success == true) {
				_userLv = data.data.level.gradeLevel;
				_userPoints = data.data.points;
				$("#userLv").text("Lv."+_userLv);
				$("#coinNum").text(data.data.coins);
			}
		},
		error: function(data) {
			console.log("获取失败");
			console.log(JSON.stringify(data));
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}
		}
	});	
}

//显示用户登录或没有登录的信息:
function updateUserLoginState(isInit) {
	console.log("updateUserLoginState isInit:"+isInit);
	if(isInit == true) {
		//进入页面的初始状态为未登录
		$("#userinfo").css("display", "none");
		$(".notLogin").css("display", "block");
		$(".notLogin").addClass("coocaa_btn");
	}else {
		//已获取用户登录信息
		$(".notLogin").css("display", "none");
		$("#userinfo").css("display", "block");
		$(".notLogin").removeClass("coocaa_btn");
	}
}


function getLocalDeviceInfo() {
		//deviceBarcode
		_devicebarcode = "";

		//time
		var timestamp = Date.parse(new Date());
		var tmpstring = timestamp.toString();
		var tmpnum = tmpstring.substr(0, 10);
		_time = tmpnum;

		//type
		_type = "20";//20 新会员体系--关注绑定酷开账号

		_source = "";
		
		_resolution = "720p,1080p,4K"; //test,具体要看怎么获取?
		_appVersion = 0;
		_fmodel = "Default";
		_pattern = "normal";
		_appID = 0;
		
		console.log("_appversion="+_appversion);
		
		coocaaosapi.getDeviceInfo(function(message) {
			var _message = JSON.stringify(message);
			console.log(_message);
			
			deviceInfo = message;
			_model = message.model;
			_chip = message.chip;
			_mac = message.mac;
			_size = message.panel;
			_serviceid = message.activeid;
			_version = message.version.replace(/\./g, "");
			_brand = message.brand;
			
			console.log("brand.."+_brand);
        	console.log("_appid.."+_appid);

			coocaaosapi.hasCoocaaUserLogin(function(message) {
	            if (message.haslogin == "true") {
	            	coocaaosapi.getUserAccessToken(function(message) {
		        		console.log(JSON.stringify(message));
		        		_accessToken = message.accesstoken;
		        		_userFlag = 1;
		        		getTvSource(_mac, _model, _chip, _size, _resolution, _version, _fmodel, _pattern, _appID, _appversion, _appid, _source, _serviceid, _type, _devicebarcode, _time,_accessToken);
		        	},function(error) { console.log(error); useDefaultQrcode();});
	            }else{
	        		console.log("user not login...");
	            	_accessToken = "";
					getTvSource(_mac, _model, _chip, _size, _resolution, _version, _fmodel, _pattern, _appID, _appversion, _appid, _source, _serviceid, _type, _devicebarcode, _time,_accessToken);
	            }
			},function(error) {
				console.log(error);
			});
		}, function(error) {
			console.log(error);
		});
}

function getTvSource(smac, smodel, schip, ssize, sresolution, sversion, sfmodel, spattern, sappID, sappversion, qappid, qsource, qserviceid, qtype, qdevicebarcode, qtime,qaccessToken) {
	console.log("获取视频源传的参数---" + "MAC="+smac+"&cModel="+smodel+"&cChip="+schip+"&cSize="+ssize+"&cResolution="+sresolution+"&cTcVersion="+sversion+"&cFMode="+sfmodel+"&cPattern="+spattern+"&vAppID="+sappID+"&vAppVersion="+sappversion);
	var myUrl = "";
	myUrl = "http://movie.tc.skysrt.com/v2/getPolicyByDeviceInfoTypeJsonp";
	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 5000, 
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
			console.log(JSON.stringify(data));
			_TVSource = data.source;
			if(_TVSource == "tencent") {
				console.log("视频源：" + _TVSource);
				//检测用户是否登录,腾讯源需要验证qq/wechat
				hasLogin(true);
			}else { // if(_TVSource == "yinhe")  //默认yinhe
				console.log("视频源：" + _TVSource);
				//检测用户是否登录,爱奇艺源不需要验证qq/wechat
				hasLogin(false);
			} 
		},
		error: function(error) {
			console.log('Error: 获取视频源失败'+error);
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("-------------getTVSource complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 	ajaxTimeoutOne.abort();
	　　　　	}
	　　	}
	});
}

function hasLogin(needQQ) {
    coocaaosapi.hasCoocaaUserLogin(function(message) {
        console.log("haslogin " + message.haslogin);
        loginstatus = message.haslogin;
        if (loginstatus == "false") {
            if (cAppVersion >= 3190030) {
                tencentWay = "both";
            } else {
                tencentWay = "qq";
            }
            user_flag = 0;
            access_token = "";
        } else {
            coocaaosapi.getUserInfo(function(message) {
                console.log("getUserInfo==" + JSON.stringify(message) + "typeof message: "+typeof message);
                userInfo = message;
                cOpenId = message.open_id;
                exterInfo = message.external_info;
                mobile = message.mobile;
                if (mobile == undefined) {
                    mobile = "";
                }
                nick_name = message.nick_name;
                
                //更新用户头像:
                var avatars = JSON.parse(message.avatars);
				$("#userIcon").css("background-image", "url("+avatars.f_50+")");

                coocaaosapi.getUserAccessToken(function(message) {
                	console.log("getUserAccessToken==" + JSON.stringify(message))
                    access_token = message.accesstoken;
                    if (exterInfo == "[]") {
                        exterInfo = '[{}]';
                    } else {}
                    user_flag = 1;
                    if (needQQ) {
                        qqinfo = JSON.parse(exterInfo);
                        if (qqinfo.length == 1) {
                            if (cAppVersion >= 3190030) {
                                if (JSON.stringify(qqinfo[0]) == "{}" || qqinfo[0].external_flag == "jscn") {
                                    tencentWay = "both";
                                } else {
                                    tencentWay = qqinfo[0].external_flag;
                                }
                            } else {
                                tencentWay = "qq";
                            }

                            if (qqinfo != "" && qqinfo != null && qqinfo[0].login && qqinfo[0].external_flag != "jscn") {
                                _qqtoken = qqinfo[0].external_id;
                                if (qqinfo[0].external_flag == "qq") {
                                    login_type = 1;
                                } else {
                                    login_type = 2;
                                    vuserid = qqinfo[0].vuserid;
                                    if (vuserid == undefined) {
                                        vuserid = JSON.parse(qqinfo[0].refreshToken).vuserid
                                    }
                                    if (cAppVersion < 3190030) {
                                        loginstatus = "false";
                                    }
                                }
                            } else {
                                tencentWay = "both";
                                loginstatus = "false";
                            }
                        } else {
                            var needSelectNum = 0;
                            for (var b = 0; b < qqinfo.length; b++) {
                                needSelectNum = needSelectNum + 1;
                                if (qqinfo[b].login && qqinfo[b].external_flag != "jscn") {
                                    _qqtoken = qqinfo[b].external_id;
                                    if (qqinfo[b].external_flag == "qq") {
                                        login_type = 1;
                                    } else {
                                        login_type = 2;
                                        vuserid = qqinfo[b].vuserid;
                                        if (vuserid == undefined) {
                                            vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                        }
                                        if (cAppVersion < 3190030) {
                                            loginstatus = "false";
                                            tencentWay = "qq";
                                        }
                                    }
                                    break
                                }
                                if (needSelectNum == qqinfo.length) {
                                    tencentWay = "both";
                                    loginstatus = "false";
                                }
                            }
                        }
                    } else {
                        qqinfo = JSON.parse(exterInfo);
                        for (var b = 0; b < qqinfo.length; b++) {
                            if (qqinfo[b].login) {
                                _qqtoken = qqinfo[b].external_id;
                                if (qqinfo[b].external_flag == "qq") {
                                    login_type = 1;
                                } else if (qqinfo[b].external_flag == "weixin") {
                                    login_type = 2;
                                    vuserid = qqinfo[b].vuserid;
                                    if (vuserid == undefined) {
                                        vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                    }
                                }
                                break;
                            } else {
                                _qqtoken = "";
                            }
                        }
                    }
                    
                    console.log("~~~~~~loginstatus:"+loginstatus+" tencentWay:"+tencentWay);
                    
                    //在这里用户真正登录成功后,重绘一次页面内容:
                    if(loginstatus == "true") {
                    	updateUserLoginState(false);
                    	getUserCoinsInfo();
                    	//更新VIP状态信息:
                    	getProductPackLists();
                    }
                }, function(error) { console.log(error); })
            }, function(error) { console.log(error); });
        }

    }, function(error) { console.log(error); });
}

function startLogin(needQQ) {
    console.log("startLogin+++" + tencentWay);
    if (needQQ) {
        if (accountVersion > 4030000) {
            if (tencentWay == "qq") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_QQ", function(message) { console.log(message); }, function(error) { console.log(error); });
            } else if (tencentWay == "weixin") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) { console.log(message); }, function(error) { console.log(error); });
            } else if (tencentWay == "both") {
                coocaaosapi.startWeixinOrQQ2("TENCENT", function(message) { console.log(message); }, function(error) { console.log(error); });
            }
        } else {
            coocaaosapi.startThirdQQAccount(function(message) { console.log(message); }, function(error) { console.log(error); });
        }
    } else {
        if (deviceInfo.version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
            coocaaosapi.startUserSettingAndFinish2(function(message) { console.log(message); }, function(error) { console.log(error); });
        } else {
            coocaaosapi.startUserSettingAndFinish(function(message) { console.log(message); }, function(error) { console.log(error); });
        }
    }
}


//test only, fake date:可以在PC chrome上得到结果
function getProductPackListsFake() {
	console.log("getProductPackLists in..._userFlag:"+_userFlag + "_accessToken:"+_accessToken + "openid:"+ cOpenId);
	
	switch(_userFlag) {
		case 1:
			_userId = _accessToken;
			break;
		case 2:	
			_userId = cOpenId;
			break;
	}
	//测试接口
	var myUrl = "http://172.20.132.182:8090/v3/source/getSourceList.html";
	var data = {
			"user_flag": 0,//1,//_userFlag,
			"user_id": "",//"2.4020ff964d0d4708a5eaa40fe59fd33c",//_userId,
			"client_type": 4,
			"business_type": 1, //-1:all 0:movie 1:education
			"third_user_id": cOpenId //腾讯的openid
	}
	data = encodeURIComponent(JSON.stringify(data));
	myUrl = myUrl + "?data=" + data;
	console.log("total url: "+ myUrl);

	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 10000, 
		dataType: 'json',
		url: myUrl,
		headers: {//是否必须用beforeSend函数来传参数？ 试下3
//			"Accept-Encoding":"",
			"cUDID":"",
			"MAC": "001a9a000000",
			"cModel": "Q4A",
			"cChip": "9S52",
			"cSize": "65",
			"cResolution": "4K",	
			"cTcVersion": "620180417",
			"cFMode": "Default",
			"cPattern": "normal",
			"cUserInfo": "1266ec9cd2b811e8a09700505687790a", //openid
//			"cBrand": _brand,
//			"cCreen": "",
//			"vAcceptSources":"tencent,iqiyi,voole,sky", //?how
			"vAppID": "0",
			"vAppVersion": "3190001" //要大于3180001			
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			//todo:
			console.log("data.code:"+data.code + "data.msg:"+data.msg);
			if(data.code == 0) {
				console.log("vip info get ok, let's go...");
				updateMemberVIPStates(data);
			}
			
		},
		error: function(error) {
			console.log('Error'+JSON.stringify(error));
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			console.log("xmlhttp return : "+XMLHttpRequest.readyState +" status:"+XMLHttpRequest.status);
　　　	　	console.log("-------------getProductPackLists complete-status:"+status+"XMLHttpRequest.resheader:"+XMLHttpRequest.getAllResponseHeaders());
			if(status=='timeout'){
	 　　　　　 		ajaxTimeoutOne.abort();
	　　　　	}
	　　	}
	});	
	console.log("getProductPackLists out...");
}
