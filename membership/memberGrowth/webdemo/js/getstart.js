var _Lindex= "";
var _userPoints = 0;
var _userLv = 1;
var _coinsLv = [1, 300, 1500, 3500, 6000, 10800, 25600];

var _testurl = "http://172.20.132.206:7070/"; //"https://member.cooca.com/";//正式地址
var _timeStamp = "";
var _clientId = "9F072A0ABF6E2B3D";//test ; "c7ea82d00b5a4aa3";//正式的
//var _clientKey = "85bdfb9ef29b4776";//test
var _userInfoUrl = "http://beta.passport.coocaa.com//api/user/info";

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
var _TVSource = "";//视频源

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
    	
		//绘制当前页面:
		svgShowGrowCurve(true);
    	console.log("out pageInit.");
    },
    
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
	}
    
};

app.initialize();

//处理用户按键
function processKey() {
	console.log("processKey in");
	var el = $(".coocaa_btn").eq(_Lindex);
	var elId = el.attr("id");
	console.log("cur focus id: ===="+elId);
	switch(elId) {
		case "notLoginId":
			console.log("user start login, TVSource:"+_TVSource);
			startLogin(_TVSource);
		break;
		case "btnEnterTask":
			coocaaosapi.startTaskPage(function(message) {
				console.log(JSON.stringify(message));
			}, function(error) {
				console.log(error);
			});
			console.log("enter page do task......");
		break;
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
	var containerHeight = $(".innerContainer").height();
	var $window = $(window);
	var windowHeight = $window.height();
	var headerHeight = $(".header").height();
	var mytopMax = containerHeight - $window.height() + headerHeight;

	console.log("scrollPage..cur id:"+ curEl.attr("id")+
		" containerHeight"+containerHeight + " headerHeight"+headerHeight+" mytopMax"+mytopMax);
	
	if(curEl.hasClass("VirtualFocus1") == true) {
		mytop = 0;
	} else if(curEl.hasClass("VirtualFocus2")== true) {
		mytop = $(".curveDivClass").height() + parseInt($(".rankPrivilege").css("top"))/2; 
	} else if(curEl.hasClass("VirtualFocus3")== true) {
		mytop = $(".curveDivClass").height() + $(".rankPrivilege").height() + 
				parseInt($(".rankPrivilege").css("top")) + parseInt($(".coinsIntro").css("top"))/2;
	} else {
		return;
	}
	console.log("scrollPage ....mytop:"+mytop + " "+containerHeight);

	var container = $(".innerContainer");
	container.css("transform", "translateY(-" + mytop + "px)");
	container.css({
		"transition": "all 0.5s",
		"-moz-transition": "all 0.5s",
		"-webkit-transition": "all 0.5s"
	});
}

//填充等级特权表格的内容
function fillRankTable(isInit) {
	var i = 0;
	//去除默认Lv1的高亮:
	$("th").eq(1).removeClass("selectedTableEffect");
	for(i=0;i<5;i++) {
		$("td").eq(i*7).removeClass("selectedTableEffect");
	}

	//高亮当前等级权益:
	var index = (_userLv <= 0) ? 1 : ((_userLv>=7) ? 7 : _userLv); 
	console.log("lv index:"+index);
	$("th").eq(index).addClass("selectedTableEffect");
	for(i=0;i<5;i++) {
		$("td").eq((index-1)+i*7).addClass("selectedTableEffect");
	}
}

//根据用户状态变化,更新对应的变化内容: 
//参数为true时表示首次绘制页面, 为false时表示更新页面变化的信息
function svgShowGrowCurve(isInit) {
	userLoginOrNot(isInit);
	calCurPointsLocation(isInit);
	fillRankTable(isInit);
}

//画出等级曲线,并画当前金币在曲线上所处的位置(top,left)
function calCurPointsLocation(isInit) {
	console.log("calCurPointsLocation cur coins:" + _userPoints);
	var i = 0;
	
	if(_userPoints > _coinsLv[_coinsLv.length-1] || _userPoints < 0) {
		console.log("something error.");
		_userPoints = 0;
	}
	
	var len = _coinsLv.length;
	for (i; i<len; i++) {
		if(_userPoints <= _coinsLv[i]) {
			console.log("lt " + _coinsLv[i] + "i:"+i);
			break;
		}
	}
	//确保当拥有金币数为0或1时(初始值),当前点可以正常显示:
	if(i==0) {i=1};
	
	//1. 获取SVG区域宽高
	var svgDiv = document.getElementById("svgZone");
	var svgWidth = svgDiv.getAttribute("width");
	var svgHeight = svgDiv.getAttribute("height");
	svgEllipseHeight = Math.round(svgHeight*5/6);
	console.log("------svgWidth:"+svgWidth+"-svgEllipseHeight:"+svgEllipseHeight);	
	
	//2.计算每个等级占用的空间宽度
	var lvWidth = svgWidth / (len-1);
	
	//3.计算当前金币数占用的空间宽度和高度,当为0时为计算方便,改为1;
	var curLeft = (i-1)*lvWidth;
	var deltaWidth = Math.round(lvWidth * ((_userPoints <= 1 ? 1 : _userPoints) - _coinsLv[i-1]) / (_coinsLv[i] - _coinsLv[i-1]));
	curLeft += deltaWidth;
	console.log("------deltaWidth:"+deltaWidth+"-curLeft:"+curLeft);
	
	var curTop = calEllipseCoordinateY(curLeft, svgWidth, svgEllipseHeight);
	console.log("------curTop:"+curTop);

	//画当前点的位置圆圈,对最大最小值的边界值有做处理(x/y方向都最小保留5px):
	var markPoint = document.getElementById("markPoint");
	markPoint.setAttribute("cy", (curTop < 5 ? 5 : (curTop)) +"px");
	markPoint.setAttribute("cx", (curLeft < (svgWidth - 5) ? (curLeft > 5 ? curLeft : 5) : (svgWidth - 5))+"px");
	
	//画当前点的值,对最大最小值的边界值有做处理:
	var markPointTip = $("#markPointTip");
	markPointTip.css({
		"top": (curTop>80 ? (curTop-74) : curTop) +"px",
		"left":(curLeft < (svgWidth - 120) ? (curLeft) : (svgWidth - 120))+"px", 
	});
	markPointTip.text(_userPoints);

	if(isInit == false) {
		console.log("not init phase, only update current location....");
		return;
	}

	//计算左边区域的A B C D坐标
	var pathGotCoordinates = {
		A: {x:0, y:svgHeight},
		B: {x:curLeft, y:svgHeight},
		C: {x:curLeft, y:curTop},
		D: {x:0, y:svgEllipseHeight},
		R: {x:svgWidth, y:svgEllipseHeight}
	};
	
	var gotPath = document.getElementById("gotCoinsPath");
	drawSVGPath(pathGotCoordinates, gotPath);
	
	//计算右边区域的A B C D坐标
	var pathRemainCoordinates = {
		A: {x:curLeft, y:svgHeight},
		B: {x:svgWidth, y:svgHeight},
		C: {x:svgWidth, y:0},
		D: {x:curLeft, y:curTop},
		R: {x:svgWidth, y:svgEllipseHeight}
	};
	
	var remainPath = document.getElementById("remainCoinsPath");
	drawSVGPath(pathRemainCoordinates, remainPath);
	
	//画最上面的markline:
	var pathMarkCoordinates = {
		A: {x:svgWidth, y:0},
		B: {x:svgWidth, y:0},
		C: {x:svgWidth, y:0},
		D: {x:0, y:svgEllipseHeight},
		R: {x:svgWidth, y:svgEllipseHeight}
	};
	var markLine = document.getElementById("markLine");
	drawSVGPath(pathMarkCoordinates, markLine);	
	
	//画背景的X轴等级标记和对应的point数,1个div保存1组X轴上的所有标记
	//创建跟等级数一致的xAxisMark div(已经存在一个了)
	for(i=0; i<len-1; i++) {
		$(".xAxisMark:last").after($(".xAxisMark:last").clone(true));
	}
	
	//给所有XAxisMark div定位: 第一列不动,最后一列靠最右边,其它列依次排开:
	for(i=1;i<len-1;i++){
		document.getElementsByClassName("xAxisMark") [i].style.left = lvWidth*i+"px";
	}
	document.getElementsByClassName("xAxisMark") [len-1].style.left = svgWidth-75+"px";
	
	//让所有div内的元素居中,除了第一列居左,最后一列居右
	$(".xAxisMark:first div").css("transform", "none");
	$(".xAxisMark:last div").css("right", "0px");
	$(".xAxisMark:last div").css("transform", "none");
	
	//设置x坐标和椭圆曲线上的标记值
	for(i=0;i<len;i++){
		document.getElementsByClassName("xAxisEllipseMark") [i].style.top = calEllipseCoordinateY(lvWidth*i, svgWidth, svgEllipseHeight) + (i+1)*5 +"px";//有个间隔
		document.getElementsByClassName("xAxisEllipseMark") [i].innerHTML = _coinsLv[i];
//		document.getElementsByClassName("xAxisCoordinate") [i].style.top = svgHeight-35+"px";
		document.getElementsByClassName("xAxisCoordinate") [i].innerHTML = "Lv"+(i+1);
	}
	//最后一项高度需要再往下移:
	document.getElementsByClassName("xAxisEllipseMark") [len-1].style.top = (calEllipseCoordinateY(lvWidth*(len-1), svgWidth, svgEllipseHeight) + 115) +"px";//有个间隔
	
}

//画出等级曲线:
function drawSVGPath(el, pathId) {
//	d="M0,500 L1738,500 L1738,0 a1738,378 0 0,1 -1738,378 Z"
	var pathD = "M"+el.A.x+","+el.A.y+ 
				" L"+el.B.x+","+el.B.y+ 
				" L"+el.C.x+","+el.C.y+ 
				" A"+el.R.x+","+el.R.y+" 0 0,1 "+el.D.x+","+el.D.y+"";
	console.log("total path is...:"+pathD);
	console.log("total path is...:"+pathId.getAttribute("d"));
	pathId.setAttribute("d", pathD);	
	console.log("total path is...:"+pathId.getAttribute("d"));
}

//知道椭圆某点坐标x,计算坐标y
function calEllipseCoordinateY(x, rx, ry){
	var ySquare = (1-(x*x/(rx*rx))) * ry * ry;
	var y = Math.round(Math.sqrt(ySquare));
	return y;
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
				_userLv = data.data.level.gradeLevel + 1;//后台gradeLevel是从0开始的
				_userPoints = data.data.points;
				$("#userLv").text("Lv."+_userLv);
				$("#coinNum").text(data.data.coins);
				//更新用户当前点位:
				svgShowGrowCurve(false);
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
function userLoginOrNot(isInit) {
	console.log("userlogin isInit:"+isInit);
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
                console.log("getUserInfo==" + JSON.stringify(message))
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
                                qqtoken = qqinfo[0].external_id;
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
                                    qqtoken = qqinfo[b].external_id;
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
                                qqtoken = qqinfo[b].external_id;
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
                                qqtoken = "";
                            }
                        }
                    }
                    
                    console.log("~~~~~~loginstatus:"+loginstatus+" tencentWay:"+tencentWay);
                    
                    //在这里用户真正登录成功后,重绘一次页面内容:
                    if(loginstatus == "true") {
                    	getUserCoinsInfo();
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

function getLocalDeviceInfo() {
		var _brand = "";
		var _appid="", _source, _model, _chip, _mac, _serviceid, _version, _type, _devicebarcode, _time, _accessToken = "";
		var _size, _resolution, _appVersion, _fmodel, _pattern, _appID, _appversion = "";

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
		
		_resolution = "";
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
		        		console.log("usertoken " + message.accesstoken);
		        		_accessToken = message.accesstoken;
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
			if(_TVSource == "yinhe") {
				console.log("视频源：" + _TVSource);
				//检测用户是否登录,爱奇艺源不需要验证qq/wechat
				hasLogin(false);
			} else if(_TVSource == "tencent") {
				console.log("视频源：" + _TVSource);
				//检测用户是否登录,腾讯源需要验证qq/wechat
				hasLogin(true);
				
			} else {//todo: 还需要处理视频源是优朋的情况:
				console.log("Error: 视频源既不是爱奇艺又不是腾讯--" + _TVSource);
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
