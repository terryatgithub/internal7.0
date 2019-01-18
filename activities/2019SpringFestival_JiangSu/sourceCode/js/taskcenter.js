//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
var _xMasNewYearActivityId = 107;   //活动id 由运营提供
var _springActivityDivideId = 108; //瓜分活动id 由运营提供
var _urlActivityServer = "http://beta.restful.lottery.coocaatv.com";//主活动接口

//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
//var _xMasNewYearActivityId = 107;   //活动id 由运营提供
//var _springActivityDivideId = 108; //瓜分活动id 由运营提供
//var _urlActivityServer = "https://restful.skysrt.com";//主活动接口

//本机客户端各apk版本号
var _activityCenterVersionLocal; //活动中心 本地版本号
var _browserVersionLocal;	//浏览器 本地版本号
//支持本次活动的客户端各apk版本号（客户端正式发布上线的版本号）
var _activityCenterVersionLatest=103010; //活动中心 最新版本号
var _browserVersionLatest=104039;	//浏览器 最新版本号
var _mallVersionLatest = 31000028;//31000020;	//商城最新版本号 //商城不用判断最低版本 yuanbotest
var _appVersionLatest = 3420016;//3410022;  //影视教育最新版本号
var _appVersionCoocaa70 = 7000000;//酷开7.x系统软件版本号
//-----------------------------正式上线需配置参数 end---------------------------------//

//全局参数
var _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId="" ;
var _access_token="", _openId="", _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;
var _appversion, accountVersion, _deviceInfo;
var _qsource="", needQQ=false; //视频源

var _Lindex = 0;//主页当前焦点
var _bFrozenTimeHasCome = false; //活动是否已经到冻结期；

//任务完成时的提示:
var _tipsWhenClickTaskHasDone = [
	{
		title: "今日该任务已完成啦~ <br/> 试试其它任务吧！",
		btnName: "好 的"
	}
	,{
		title: "今日任务已经全部完成啦~ <br/> 任务每日更新，明天记得再来哦!",
		btnName: "去逛庙会"
	}
]
//---------------------------------------------2019春节活动需要函数 start -----------------------------------------------
//函数正式开始:
var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener("homebutton", this.homeButtonFunction, false);
		document.addEventListener('resume', this.onResume, false);
	},
	handleBackButton: function() {
	},
	onResume: function() {
		console.log("onresume)");
		console.log("要获取其它任务的完成状态，以刷新页面");
		webTaskCenterPageShowLog("任务中心页面");
		getMyTasksList();
	},
	onDeviceReady: function() {
		app.receivedEvent("deviceready");
		app.triggleButton();
	},
	receivedEvent: function(id) {
		console.log(id);
	},
	handleBackButtonDown: function() {
		console.log("handleBackButtonDown in...");
		if($("#toastWhenClickTaskHasDoneId").css("display") == "block") { //从弹窗返回
			console.log("弹窗，是否冻结期? _bFrozenTimeHasCome: "+_bFrozenTimeHasCome);
			if(_bFrozenTimeHasCome) {//如果是冻结期弹窗，直接返回主页面
				navigator.app.exitApp();	
			}else {
				$("#toastWhenClickTaskHasDoneId").css("display", "none");
				$("#taskcenterTaskHasDoneToastId").css("display", "none");
				$("#taskcenterDiscardToastId").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		} else {
			navigator.app.exitApp();
		}
	},
	homeButtonFunction:function () {
        console.log("-----------按了主页键------------");
      	navigator.app.exitAll();
    },
	registerEventHandler: function() {
		console.log("registerEventHandler---");
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		webTaskCenterPageShowLog("任务中心页面");
		_appversion = accountVersion;
		getDeviceInfo(false);
	}
};

app.initialize();

//检查当前落焦任务是否完成
function checkCurTaskStatus(el) {
	var status = el.attr("status");
	console.log("checkCurTaskStatus status:"+status);
	if(status == "true"){
		return true;
	}else {
		return false;
	}
}
//获取第一个未完成任务，如都完成，跳toast: bToast: true:弹窗  false:只获取第一个未完成任务，不弹窗；
function getFirstUndoneTaskOrToast(bToast) {
	var len = $(".coocaa_btn_taskcenter").length;
	var i = 0;
	// 0:当前任务完成，有其它未完成任务；
	// 1:所有任务都完成,去庙会
	// 顺序与_tipsWhenClickTaskHasDone[]一致
	var taskStatus = 0; 
	for(;i<len;i++) {
		if($(".coocaa_btn_taskcenter").eq(i).attr("status") == "false") {
			_Lindex = i;
			taskStatus = 0;
			break;
		}
	}
	console.log("getFirstUndoneTaskOrToast _Lindex:"+_Lindex+",i:"+i);
//	bToast: true:弹窗  false:只获取第一个未完成任务，不弹窗；
	if(bToast == false) {
		return;
	}
	
	//还要分福卡集市是否开放的状态:
	if(i == len) { 
		taskStatus = 1; 
	}
	$("#taskcenterTaskHasDoneToastId .interlucationTitleClass").html(_tipsWhenClickTaskHasDone[taskStatus].title);
	$("#taskcenterTaskHasDoneToastId .taskcenterTaskHasDoneToastBtnClass").text(_tipsWhenClickTaskHasDone[taskStatus].btnName);
	$("#taskcenterTaskHasDoneToastId").css("display", "block");
	$("#toastWhenClickTaskHasDoneId").css("display", "block");
	
	map = new coocaakeymap($(".coocaa_btn_taskcenter_toast"), $(".coocaa_btn_taskcenter_toast").eq(0), 'btn-focus', function() {}, function(val) {}, function(obj) {});
	$(".coocaa_btn_taskcenter_toast").unbind("itemClick").bind("itemClick", function() {
		if(taskStatus == 0) {
			$("#taskcenterTaskHasDoneToastId").css("display", "none");
			$("#toastWhenClickTaskHasDoneId").css("display", "none");		
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), 'btn-focus', function() {}, function(val) {}, function(obj) {});
		}else if(taskStatus == 1){
			console.log("跳到庙会,任务中心页面kill自己");
			navigator.app.exitApp();
		}
	});
}
function processKey(el) {
	var taskId = el.attr("taskId");
	console.log("processKey taskId:"+taskId);
	//根据后台获取数据，对任务赋予不同id:
//	1.浏览指定页面
	//step 1: 先判断当前任务是否已完成:
	//yuanbotest
	if(checkCurTaskStatus(el)) {
		//落焦到未完成任务 或 跳toast
		getFirstUndoneTaskOrToast(true);
		return;
	}
	webTaskCenterBtnClickLog("任务中心页面", "做任务", "页面浏览");
	
	//浏览指定版面任务
	var param = el.attr("param");
	console.log("param:"+param);
	param = JSON.parse(param);
	doSpecificBrowseTask(param, taskId, true);
	
}
//做浏览指定版面任务 
function doSpecificBrowseTask(param, taskId, bBrowserTask){
	var pkgname = param.packageName;
	var action = param.byvalue;
	var params = param.params;
	var minVersionCode = param.versionCode;//运营配置的最低版本要求
	var business = param.business;//视频或教育  商城
	
	var hasversioncode = "";//当前包名版本号
	var param1="",param2="",param3="",param4="",param5="";
	var str = "[]";
	var a = '{"pkgList":["' + pkgname + '"]}';
	
	coocaaosapi.getAppInfo(a, function(message){
			console.log("getAppInfo====" + message);
			var msg = JSON.parse(message);
			if(msg[pkgname].status == -1) {//此apk不存在
				coocaaosapi.startAppStoreDetail(pkgname, function(){},function(){});
			}else {
				hasversioncode = msg[pkgname].versionCode;
				param1 = "action";
				param2 = action;
				if(JSON.stringify(params) != "{}"){
					str = '['+ JSON.stringify(params).replace(/,/g, "},{") +']';
				}
				console.log("str:"+str);
				
				var latestVersion, maxVersion = 99999999;
				if(business == "movie" || business == "edu") {//影视教育
					latestVersion = _appVersionLatest;
					maxVersion = _appVersionCoocaa70;
				}else if(business == "mall"){//商城
					latestVersion = _mallVersionLatest;
					minVersionCode = -1;//商城总能进入，不用最低版本判断
				}
				
				if(bBrowserTask && (hasversioncode < latestVersion || hasversioncode >= maxVersion)) {
					if(hasversioncode < minVersionCode) {
						console.log("当前影视教育版本过低，请前往应用圈搜索进行升级（影视教育），显示弹窗");
			        	$("#taskcenterTaskHasDoneToastId .interlucationTitleClass").html('抱歉,你当前影视版本过低~<br>请先升级<p style="font-size:27px">方法:在<span>应用圈</span>搜索<span>"YSJY"(影视教育)</span>升级即可</p>');
						$("#taskcenterTaskHasDoneToastId .taskcenterTaskHasDoneToastBtnClass").text("好 的");
						$("#taskcenterTaskHasDoneToastId").css("display", "block");
						$("#toastWhenClickTaskHasDoneId").css("display", "block");
						map = new coocaakeymap($(".coocaa_btn_taskcenter_toast"), $(".coocaa_btn_taskcenter_toast").eq(0), 'btn-focus', function() {}, function(val) {}, function(obj) {});
						$(".coocaa_btn_taskcenter_toast").unbind("itemClick").bind("itemClick", function() {
							$("#taskcenterTaskHasDoneToastId").css("display", "none");
							$("#toastWhenClickTaskHasDoneId").css("display", "none");
							map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
						});
					}else {
						startLowVersionAction(taskId,param1,param2,param3,param4,param5,str);
					}
				}else {
					startNewVersionAction(taskId,param1,param2,param3,param4,param5,str, bBrowserTask);
				}
			}
		},function(error) {
            console.log("getAppInfo----error" + JSON.stringify(error));
            coocaaosapi.startAppStoreDetail(pkgname,function(){},function(){});
   });
	function startLowVersionAction(taskId,param1,param2,param3,param4,param5,str){
	    console.log("startLowVersionAction 前端加机会");
	    webTaskCenterPageShowLog("跳转浏览任务页面");
	    addChanceWhenFinishTask("", taskId);
		coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
	}
    function startNewVersionAction(taskId,param1,param2,param3,param4,param5,str,bBrowserTask) {
        console.log("startNewVersionAction 客户端加机会");
        //只有浏览指定版面任务需要客户端加机会，支付任务不需要客户端加机会，而是由支付模块根据支付结果加机会。
        if(bBrowserTask) {
	        str = JSON.parse(str);
	        var external = {"taskId":taskId,"id":_xMasNewYearActivityId,"userKeyId":_activityId, "countDownTime":10, "verify_key":new Date().getTime(), "subTask":"0"};
	        var doubleEggs_Active = {"doubleEggs_Active":external};
	        str.push(doubleEggs_Active);
	        str = JSON.stringify(str);
        }
        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
    }   
}
//完成任务时，增加机会接口:
 function addChanceWhenFinishTask(taskType, taskId, askResult, shareId) {
 	console.log("taskType:"+taskType+",taskId:"+taskId);
    console.log("id==="+_xMasNewYearActivityId+"======userKeyId===="+_activityId+"===taskId="+taskId+"====_openId===="+_openId+"askResult:"+askResult+"... ");
    $.ajax({
        type: "post",
        async: true,
        timeout: 10000,
        url: _urlActivityServer+"/building/task/finish-task",
        data: {
        		taskId:taskId
        		,activeId:_xMasNewYearActivityId
        		,userKeyId:_activityId
        		,askResult: askResult
        		,"cOpenId": _openId
				,"cNickName": _nickName
        },
        dataType: "json",
        success: function(data) {
            console.log("------------addChanceWhenFinishTask----result-------------"+JSON.stringify(data));
            if(data.code == 50100){
            	//
            }else if(data.code == 91009){
            	console.log("任务已过期");
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}
//获取本机应用版本号: 活动中心 浏览器 影视教育 商城
function getLocalApkVersions(el) {
    var apkVersion = [];
    var apkArry = ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"];
    var a = '{ "pkgList": ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"] }';
    coocaaosapi.getAppInfo(a, function(message) {
        console.log("getAppInfo====" + message);
        for(var i=0;i<4;i++){
            apkVersion.push(JSON.parse(message)[apkArry[i]].versionCode);
        }
        _activityCenterVersionLocal = apkVersion[0];
        _browserVersionLocal = apkVersion[1];
        
        console.log("===_activityCenterVersionLocal=="+_activityCenterVersionLocal+"===_browserVersionLocal=="+_browserVersionLocal+"==cAppVersion=="+cAppVersion);
        //如果活动中心或浏览器版本不能满足需求:
        if((_activityCenterVersionLocal < _activityCenterVersionLatest) || (_browserVersionLocal < _browserVersionLatest)) {
        	console.log("活动中心或浏览器版本太低，需要后台升级，显示弹窗");
        	$("#taskcenterTaskHasDoneToastId .interlucationTitleClass").html("正在加载中,请稍候~");
			$("#taskcenterTaskHasDoneToastId .taskcenterTaskHasDoneToastBtnClass").text("好 的");
			$("#taskcenterTaskHasDoneToastId").css("display", "block");
			$("#toastWhenClickTaskHasDoneId").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn_taskcenter_toast"), $(".coocaa_btn_taskcenter_toast").eq(0), 'btn-focus', function() {}, function(val) {}, function(obj) {});
			$(".coocaa_btn_taskcenter_toast").unbind("itemClick").bind("itemClick", function() {
				$("#taskcenterTaskHasDoneToastId").css("display", "none");
				$("#toastWhenClickTaskHasDoneId").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
			});
        } else {//版本满足需求，才真正执行按键判断:
        	processKey(el);
        }
        
    }, function(error) {
        console.log("getAppInfo----error" + JSON.stringify(error));
    });
}
//获取我的任务信息
function getMyTasksList(initData) {
	console.log("getMyTasksList in: " + _xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "get",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/building/task/u-task",
		data: {
			//公共参数-start-
			"MAC": _macAddress,
			"cChip": _TVchip,
			"cModel": _TVmodel,
			"cEmmcCID": _emmcCID,
			"cUDID": _activityId, 
			"accessToken": _access_token,
			"cOpenId": _openId,
			"cNickName": _nickName,
			//公共参数-end-
			"id": _xMasNewYearActivityId,
			"divideId":_springActivityDivideId,
			"source": (_qsource == "tencent") ? "tencent" : "iqiyi"
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") { //服务器返回正常
				if(data.data!=null) { //如果有任务
					updateTaskInfoToPage(data.data);
				}
			}else if(data.code == "50003") {
				toastWhenAcitivityEnterFrozenTime();
			}else {
				console.log('获取任务接口异常');
			}
		},
		error: function(err) {
			console.log(err);
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
		}
	});	
}
function toastWhenAcitivityEnterFrozenTime(){
	//如果返回异常,就认为已经到冻结期:
	console.log("初始化或获取任务接口返回异常----显示冻结期弹窗");
	$("#taskcenterTaskHasDoneToastId .interlucationTitleClass").html('抱歉~抽卡通道已关闭,<br>20点准时瓜分百万现金');
	$("#taskcenterTaskHasDoneToastId .taskcenterTaskHasDoneToastBtnClass").text("好 的");
	$("#taskcenterTaskHasDoneToastId").css("display", "block");
	$("#toastWhenClickTaskHasDoneId").css("display", "block");
	_bFrozenTimeHasCome = true;
	map = new coocaakeymap($(".coocaa_btn_taskcenter_toast"), $(".coocaa_btn_taskcenter_toast").eq(0), 'btn-focus', function() {}, function(val) {}, function(obj) {});
	$(".coocaa_btn_taskcenter_toast").unbind("itemClick").bind("itemClick", function() {
		console.log("冻结期弹窗,直接回主页面,任务中心页面kill自己");
		navigator.app.exitApp();
	});
}

//更新后台数据到页面显示
function updateTaskInfoToPage(data) {
	console.log("updateTaskInfoToPage in...");
	var task = null, bFinished = false;
	
	var jump = data.jump;
	console.log("jump: "+ jump);
	if(jump == null || jump == undefined) {
		console.log("jump error:"+ jump);
		return;
	}
	
	var len = jump.length;
	console.log("jump len: "+ len);
	(len > 3) ? (len = 3) : (len); //最多取3个
	
	//step1.先清除旧的信息
	$(".coocaa_btn_taskcenter").removeAttr("taskId");
	$(".coocaa_btn_taskcenter").removeAttr("status");
	$(".coocaa_btn_taskcenter").removeAttr("param");
	
	//step2:更新新数据:
	for(var index = 0; index < len; index++) {
		task = jump[index];
		if(task.remainingNumber > 0) {//做任务
			$(".taskBtnClass").eq(index).css("background-image", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/taskcenter/btngodotask.png)");
			bFinished = false;
		}else {//已完成
			$(".taskBtnClass").eq(index).css("background-image", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/taskcenter/btndone.png)");
			bFinished = true;
		}
		var param = task.param;
		$(".coocaa_btn_taskcenter").eq(index).attr("status", bFinished);
		$(".coocaa_btn_taskcenter").eq(index).attr("taskId", task.taskId);
		$(".coocaa_btn_taskcenter").eq(index).attr("param", param);	
		
		$(".taskTipsClass:eq("+index+") span:first-child").text(task.taskName);
	}
	//更新图标
	$(".taskIconClass").eq(0).css("background-image", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/taskcenter/icontaskinterlucation.png)");			
	$(".taskIconClass").eq(1).css("background-image", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/taskcenter/icontaskbrowser.png)");
	$(".taskIconClass").eq(2).css("background-image", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/taskcenter/icontasklogin.png)");

	//获取第一个未完成焦点
	if($(".coocaa_btn_taskcenter").eq(_Lindex).attr("status") == "true") {
		getFirstUndoneTaskOrToast(false);
	}
	
	//触发按键
	map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
	$(".coocaa_btn_taskcenter").unbind("itemClick").bind("itemClick", function() {
		_Lindex = $(".coocaa_btn_taskcenter").index($(this));
		console.log("itemClick _Lindex = " + _Lindex);
			getLocalApkVersions($(this));
	});
	
	//是否显示"加机会"弹窗:
	toastAddChanceShow(data);
}
function toastAddChanceShow(data) {
	//如果需要显示"+机会"弹窗:
	var alter = parseInt(data.alter);
	console.log("alter:"+alter);
	if(alter != 0) {
		$("#toastWhenClickTaskHasDoneId").css("display", "block");
		$("#taskcenterDiscardToastId").css("display", "block");
		$("#taskcenterDiscardToastId .interlucationTitleClass>span").text(alter+'次');
		
		map = new coocaakeymap($(".coocaa_btn_taskcenter_toast"), $(".coocaa_btn_taskcenter_toast").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
		$(".coocaa_btn_taskcenter_toast").unbind("itemClick").bind("itemClick", function(){
			console.log("跳转到活动主页面,任务中心页面kill自己");
			navigator.app.exitApp();
		});
	}
}

//数据采集-任务中心-子任务页面曝光
function webTaskCenterPageShowLog(task_page_name) {
	var _dateObj = {
		"page_name": task_page_name,
		"parent_page_name": "任务中心",
		"activity_name": "江苏春节集卡活动"
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	_czc.push(["_trackEvent","春节集卡活动","任务中心",task_page_name,"页面曝光",""]);
	coocaaosapi.notifyJSLogInfo("okr_web_page_show", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}
//数据采集-任务中心-按钮点击
function webTaskCenterBtnClickLog(task_page_name, button_name, position_id) {
	var _dateObj = {
		"page_name":task_page_name,
		"activity_name": "江苏春节集卡活动",
		"button_name":button_name 
	}
	switch(task_page_name) {
		case "任务中心页面":
			//任务类型:对任务中心页面点击, 值是: 回答指定问题、页面浏览、观看视频、购买商品、好友助力、登录
			_dateObj.task_type = position_id;
			break;
		case "支付任务商品采购页面":
			//对支付任务商品采购页面,值是: 1-1、1-2……（第N排-第N位）
			_dateObj.position_id = position_id;
			_dateObj.parent_page_name = "任务中心";
			break;
		case "问答任务页面":
			_dateObj.parent_page_name = "任务中心";
			break;
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	_czc.push(["_trackEvent","春节集卡活动","任务中心",task_page_name,button_name,position_id]);
	coocaaosapi.notifyJSLogInfo("okr_web_button_click", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

//----------------------------------------------不需要的函数----------------------------------------------
//获取设备信息并初始化
function getDeviceInfo(bFromOnResume) {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log("getDeviceInfo success:"+JSON.stringify(message));
		_deviceInfo = message;
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
		getTvSource(bFromOnResume, _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId, "Default", message.version.replace(/\./g, ""), message.panel, _appversion, message.androidsdk, message.brand);		
		
	}, function(error) {
		console.log("获取设备信息出现异常。");
	});
}

function getTvSource(bFromOnResume, smac, schip, smodel, semmcid, sudid, sFMode, sTcVersion, sSize, sAppVersion, sSdk, sBrand) {
	console.log(smac + "--" + sudid+ "--" + sAppVersion + "--" + sSdk);
	var ajaxTimeout = $.ajax({
		type: "POST",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/light/active/tv/source",
		data: {
			"MAC": smac,
			"cChip": schip,
			"cModel": smodel,
			"cEmmcCID": semmcid,
			"cUDID": sudid,
			"cFMode": sFMode,
			"cTcVersion": sTcVersion,
			"cSize": sSize,
			"cAppVersion": sAppVersion,
			"cBrand": sBrand
		},
		success: function(data) {
			console.log('视频源:' + JSON.stringify(data));
			if(data.code == 0) {
				_qsource = data.data.source;
				if(_qsource == "tencent") {
					needQQ = true;
					_interlucationsArray = _interlucationsArrayTencent;
					_payTaskMoreGoodsList = moreGoodsTencent;
				}
				console.log(_qsource + "--" + needQQ);
			}
		},
		error: function(err) {
			console.log('获取视频源失败'+JSON.stringify(err));
		},
		complete: function(XMLHttpRequest, status) {
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　
				ajaxTimeout.abort();　　　　
			}
			hasLogin(needQQ, 0, bFromOnResume);　　
		}
	});
}
//stage: 0 :初始化阶段,需要初始化活动信息  1:登录状态有变,用户登录成功时,获取用户信息
function hasLogin(needQQ, stage,bFromOnResume) {
	console.log("in hasLogin needQQ:"+needQQ);
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			} else {
				_tencentWay = "qq";
			}
			_access_token = "";
			
			//没有登录:
			if(stage == 0) {
				initActivityInfo(bFromOnResume);
			}
			else if(stage == 1) {//没登录时这里不应该加机会?
				console.log("haslogin: 用户没有登录");
				_bUserLoginSuccess = false;
			}
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
					
					//已经登录:
					if(stage == 0) {
						initActivityInfo(bFromOnResume);
					}else if(stage == 1) {
						console.log("haslogin: 用户登录成功");
						_bUserLoginSuccess = true;
					}
				}, function(error) {})
			}, function(error) {});
		}
		
	}, function(error) {});
}
//活动初始化
function initActivityInfo(bFromOnResume) {
	console.log("initActivityInfo in: " + _xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "post",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/building/cny/init",
		data: {
			//公共参数-start-
			"MAC": _macAddress,
			"cChip": _TVchip,
			"cModel": _TVmodel,
			"cEmmcCID": _emmcCID,
			"cUDID": _activityId, 
			"accessToken": _access_token,
			"cOpenId": _openId,
			"cNickName": _nickName,
			//公共参数-end-
			"id": _xMasNewYearActivityId,
			"divideId":_springActivityDivideId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") { //服务器返回正常
				console.log("initActivityInfo bFromOnResume:"+bFromOnResume);
				if(bFromOnResume == true) {
					console.log("initActivityInfo from onResume(), 只获取本机信息和活动初始状态,不往下走");
				}else {
					getMyTasksList(data.data);
					//todo 是否显示"加机会"弹窗:
					//toastAddChanceShow(data.data);
				}
			}else if(data.code == "50046" || data.code == "50003" || data.code == "50042") {
				toastWhenAcitivityEnterFrozenTime();
			}else {
				console.log('获取任务接口异常');
			}
		},
		error: function(err) {
			console.log(err);
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
		}
	});	
}



