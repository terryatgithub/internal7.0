//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
var _xMasNewYearActivityId = 95;   //活动id 由运营提供
var _springActivityDivideId = 101; //瓜分活动id 由运营提供
var _urlActivityServer = "http://beta.restful.lottery.coocaatv.com/";//主活动接口
var _urlWechatHelp = "http://www.mobileui.cn/aa/?key=";//微信助力二维码生成地址
var _fukaMarketUrl = "http://beta.webapp.skysrt.com/zy/spring/index.html?part=market";//福卡集市url

//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
//var _xMasNewYearActivityId = 97;
//var _urlActivityServer = "https://restful.skysrt.com/light";//主活动接口
//var _urlWechatHelp = "";//微信助力二维码生成地址
//var _fukaMarketUrl = "";//福卡集市url

//本机客户端各apk版本号
var _activityCenterVersionLocal; //活动中心 本地版本号
var _browserVersionLocal;	//浏览器 本地版本号
//支持本次活动的客户端各apk版本号（客户端正式发布上线的版本号）
var _activityCenterVersionLatest=0; //活动中心 最新版本号
var _browserVersionLatest=0;	//浏览器 最新版本号
var _mallVersionLatest = -1;//31000020;	//商城最新版本号 //商城不用判断最低版本 yuanbotest
var _appVersionLatest = 99999999;//3410022;  //影视教育最新版本号
//-----------------------------正式上线需配置参数 end---------------------------------//
//yuanbotest： 广告测试数据，等广告后台调好，再删掉，并完善正式流程即可 
var _adsTestMsg = {
    "total": 1,
    "sys_tracker": "http://tv.cctracker.com/hoisin/",
    "schedules": [
        {
            "order_id": "O20181210000006",
            "schedule_id": "S20190104000331",
            "adspace_id": "CCADTV10001",
            "position_x": 0,
            "position_y": 0,
            "width": 1920,
            "height": 1080,
            "media_type": "video",
            "media_size": 11613888,
            "content": "http://beta-res.hoisin.coocaatv.com/video/20181220/20181220144028600862.ts",
            "media_md5": "92c3c2009d1f406eb348c13f25a19235",
            "caption": "",
            "show_time": 15,
            "operate_model": 1,
            "begin_time": 1546531200,
            "end_time": 1580831999,
            "click_event": "",
            "subscript": {},
            "skip_ad": false,
            "extend_param": {},
            "relation_info": {
                "content": [],
                "type": ""
            },
            "track_url": [
                "https://data-hoisin.coocaa.com/track?mac=bcec23461b11&model=model&ip=127.0.0.1&province=51&city=518000&sid=2019010405&time=1540202820374&did=10001"
            ],
            "sdk_track": [],
            "click_tracks": [],
            "click_sdk_tracks": [],
            "player_start_tracks": [
                "https://data-hoisin.coocaa.com/track?mac=bcec23461b11&model=model&ip=127.0.0.1&province=51&city=518000&sid=2019010406&time=1540202820374&did=10001"
            ],
            "player_start_sdk_tracks": [],
            "player_end_tracks": [
                "https://data-hoisin.coocaa.com/track?mac=bcec23461b11&model=model&ip=127.0.0.1&province=51&city=518000&sid=2019010406&time=1540202820374&did=10001"
            ],
            "player_end_sdk_tracks": [],
            "schedule_md5": "fb37025098df6adaf27cc0d6e0b9e4e0"
        }
    ],
    "data_type": "json",
    "db_path": "",
    "pkg_md5": "90551afba0494ef94480fd1a1fd8767c",
    "client_ip": "172.20.139.206",
    "interval": 14820,
    "next_time": 1546598781,
    "ad_setting": {
        "op_per_push_min_sys_ver": "-1",
        "op_per_repair_on_boot": "true",
        "op_per_roll_back_user_ver": "-1",
        "op_per_de_min_sys_ver": "-1",
        "tv_router_info_switch": "1",
        "download_type": "1800018",
        "client_req_timeout": "1500",
        "tv_router_info_interval": "120",
        "op_per_user_min_sys_ver": "500000000",
        "op_per_ad_min_sys_ver": "-1",
        "track_url": "http://172.20.155.60:3100/index",
        "system_time": "1546583959"
    }
}

//全局参数
var _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId="" ;
var _access_token="", _openId="", _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;
var _appversion, accountVersion, _deviceInfo;
var _qsource, needQQ=false; //视频源

//福卡集市是否开放
var _blessingMarketOpen = false; 
//广告视频数据,广告任务id：
var ADMsg = null, _adsTaskId=undefined;

//
var _Lindex = 0;//主页当前焦点
var _bUserLoginSuccess = false; //跳出登录页面时，用户是否登录成功；

//互动问答题目区，由前端根据系统当前时间固定获取一个）
var _interlucationsArray = [
	 //题目， 答案A，答案B，正确答案，出现日期， 用户是否做过此题
	 {question: "创维电视的全球代言人是谁？", answerA:"A、李易峰", answerB:"B、赵又廷", right: "A", date: 29, done: "no" }
	,{question: "中国彩电哪家强1？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 30,done: "no"}
	,{question: "中国彩电哪家强2？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 31,done: "no"}
	,{question: "中国彩电哪家强3？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 1,done: "no"}
	,{question: "中国彩电哪家强4？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 2,done: "no"}
	,{question: "中国彩电哪家强5？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 3,done: "no"}
	,{question: "中国彩电哪家强6？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 4,done: "no"}
	,{question: "中国彩电哪家强7？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 5,done: "no"}
	,{question: "中国彩电哪家强8？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 6,done: "no"}
	,{question: "中国彩电哪家强9？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 7,done: "no"}
	,{question: "中国彩电哪家强10？",answerA:"A、创维",answerB:"B、其它",right: "A",date: 8,done: "no"}
]
//回答正确或错误时的提示和跳转
var _interlucationsTipsArray = [
	{
		title: "恭喜回答正确! <span>+1</span>次抽奖机会",
		leftKey: "更多答案详情",
		lefturl: "moreAnswerJumpUrl",
		rightKey: "去抽卡",
		righturl: "goMainHomePage"
	}
	,{
		title: "阿欧，回答错误！",
		leftKey: "更多答案详情",
		lefturl: "moreAnswerJumpUrl",
		rightKey: "试试其它任务",
		righturl: "goTaskCenterHome"
	}
]
//任务完成时的提示：
var _tipsWhenClickTaskHasDone = [
	{
		title: "今日该任务已完成啦~ <br/> 试试其它任务吧！",
		btnName: "好 的"
	}
	,{
		title: "今日任务已经全部完成啦~ <br/> 任务每日更新，明天记得再来哦!",
		btnName: "去逛庙会"
	}
	,{
		title: "今日任务已经全部完成啦~ <br/> 还可去福卡集市找您想要的福卡哦!",
		btnName: "去福卡集市"
	}
]
//随机浏览指定版面任务，分视频源：todo：public String subTask;//任务类型：0其他浏览任务    1观看视频任务
var missionlistTencent = [
    {business:"mall",type:"specialtopic",param:{"id":"102930"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17186"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17933"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"movie",type:"vip",param:{"source_id":"5"},action:"coocaa.intent.vip.center",countDownTime:10,"subTask":0},
    {business:"ad",type:"video",action:"app_browser.intent.action.PLAYER",param:{ "extra.id": "","extra.uri":"http://v-play.coocaatv.com/0915/wushuang.mp4","extra.tips":"看视频得铃铛","extra.height": "","extra.width": "","extra.http_call_url": "","extra.type": "","extra.name": "" },countDownTime:10,"subTask":1},
    {business:"movie",type:"videospecial",param:{"topicCode":"98"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"movie",type:"specialtopic",param:{"id":"103065"},action:"coocaa.intent.action.HOME_SPECIAL_TOPIC",countDownTime:10,"subTask":0},
    {business:"movie",type:"videospecial",param:{"pTopicCode":"1183"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"10738"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"102831"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"103177"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0}
]

var missionlistYinhe = [
    {business:"mall",type:"specialtopic",param:{"id":"102930"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17186"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17933"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"movie",type:"vip",param:{"source_id":"1"},action:"coocaa.intent.vip.center",countDownTime:10,"subTask":0},
    {business:"ad",type:"video",action:"app_browser.intent.action.PLAYER",param:{ "extra.id": "","extra.uri":"http://v-play.coocaatv.com/0915/wushuang.mp4","extra.tips":"看视频得铃铛","extra.height": "","extra.width": "","extra.http_call_url": "","extra.type": "","extra.name": "" },countDownTime:10,"subTask":1},
    {business:"movie",type:"videospecial",param:{"topicCode":"98"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"movie",type:"specialtopic",param:{"id":"103099"},action:"coocaa.intent.action.HOME_SPECIAL_TOPIC",countDownTime:10,"subTask":0},
    {business:"movie",type:"videospecial",param:{"pTopicCode":"1183"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"10738"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"102987"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"103178"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0}
]
//购买任务里的商品参数：
var moreGoodsTencent = [
	 {name:"影视产品包", business:"mall", packageName:"com.tianci.movieplatform", byvalue:"coocaa.intent.vip.center", params:{"business_type": "0", "source_id": "5"}, versionCode: "1"}
	,{name:"教育产品包", business:"mall", packageName:"com.tianci.movieplatform", byvalue:"coocaa.intent.vip.center", params:{"business_type": "1", "source_id": "58"}, versionCode: "1"}
	,{name:"视频商品6475", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "6475"}, versionCode: "30800028"}
	,{name:"视频商品17076", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "17076"}, versionCode: "30800028"}
	,{name:"视频商品17074", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "17074"}, versionCode: "30800028"}
	,{name:"视频商品17740", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "17740"}, versionCode: "30800028"}
	,{name:"视频商品18430", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "18430"}, versionCode: "30800028"}
	,{name:"视频商品18429", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "18429"}, versionCode: "30800028"}
	,{name:"视频商品18428", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "18428"}, versionCode: "30800028"}
	,{name:"更多", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_LIST_ZONE", params:{"pageId": "193"}, versionCode: "30700012"}
]
var moreGoodsYinhe = [
	 {name:"影视产品包", business:"mall", packageName:"com.tianci.movieplatform", byvalue:"coocaa.intent.vip.center", params:{"business_type": "0", "source_id": "1"}, versionCode: "1"}
	,{name:"教育产品包", business:"mall", packageName:"com.tianci.movieplatform", byvalue:"coocaa.intent.vip.center", params:{"business_type": "1", "source_id": "57"}, versionCode: "1"}
	,{name:"视频商品6475", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "6475"}, versionCode: "30800028"}
	,{name:"视频商品17076", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "17076"}, versionCode: "30800028"}
	,{name:"视频商品17074", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "17074"}, versionCode: "30800028"}
	,{name:"视频商品17740", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "17740"}, versionCode: "30800028"}
	,{name:"视频商品18430", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "18430"}, versionCode: "30800028"}
	,{name:"视频商品18429", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "18429"}, versionCode: "30800028"}
	,{name:"视频商品18428", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_DETAIL", params:{"id": "18428"}, versionCode: "30800028"}
	,{name:"更多", business:"mall", packageName:"com.coocaa.mall", byvalue:"coocaa.intent.action.MALL_LIST_ZONE", params:{"pageId": "193"}, versionCode: "30700012"}
]
//---------------------------------------------2019春节活动需要函数 start -----------------------------------------------
//函数正式开始：
var app = {
	initialize: function() {
		//yuanbotest PC debug start
//		testtest_initActivityInfo();
		//PC debug end
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
		console.log("onresume");
		//确保有且只有一次会更新到：
		if($(".coocaa_btn_taskcenter").eq(_Lindex).attr("id") == "loginTaskId") {
			if(_bUserLoginSuccess == true) {
				console.log("onresume-用户登录成功");
				webTaskCenterClickedResultLog("登录任务页面", "登录成功");
				getMyTasksList();
			}else {
				console.log("onresume-用户没有登录");
				webTaskCenterClickedResultLog("登录任务页面", "登录失败");
			}
		}else if($("#interlucationPageId").css("display") == "block") { //互动问答页面存在
			console.log("onresume-互动问答页面存在");
			webTaskCenterPageShowLog("任务中心页面");
		}else if($(".moreGoodsPageClass").css("display") == "block") {
			console.log("onresume-更多商品页面存在");
			webTaskCenterPageShowLog("支付任务商品采购页面");
		} else {
			console.log("要获取其它任务的完成状态，以刷新页面");
			webTaskCenterPageShowLog("任务中心页面");
			getMyTasksList();
		}
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
		if($(".wechatHelpPageClass").css("display") == "block") { //从微信帮助二维码页面返回
			$(".wechatHelpPageClass").css("display", "none");
			document.getElementById("wechatQrCodeId").innerHTML = "";
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if($("#interlucationPageId").css("display") == "block") { //从互动问答页面返回
			$("#interlucationPageId").css("display", "none");
			$("#interlucationQuestionToastId").css("display", "none");
			$("#interlucationAnswerToastId").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if($(".moreGoodsPageClass").css("display") == "block") { //从更多商品页面返回
			$(".moreGoodsPageClass").css("display", "none");
			//需要刷新任务状态
			webTaskCenterPageShowLog("任务中心页面");
			getMyTasksList();
		}  else if($("#toastWhenClickTaskHasDoneId").css("display") == "block") { //从弹窗返回
			$("#toastWhenClickTaskHasDoneId").css("display", "none");
			$("#taskcenterTaskHasDoneToastId").css("display", "none");
			$("#taskcenterDiscardToastId").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			navigator.app.exitApp();
		}
	},
	registerEventHandler: function() {
		console.log("registerEventHandler---");
		coocaaosapi.addCommonListener(function(message) {
			console.log("--------------->commonListen==" + message.web_player_event);
			if(message.web_player_event == "on_complete") {
				console.log("广告播放完成----_adsTaskId:"+_adsTaskId);
				//sentInnerAdshow(ADMsg,"","","","",_xMasNewYearActivityId.toString(),_adsTaskId.toString());
				sentThirdAdshow("videoEnd",ADMsg);
				webTaskCenterClickedResultLog("浏览视频广告任务页面", "观看完成");
				//加机会
				addChanceWhenFinishTask("",_adsTaskId);
				//数据复位
				ADMsg = null;
				_adsTaskId = undefined;
			}
		});		
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		_appversion = accountVersion;
		app.registerEventHandler();
		getDeviceInfo();
		listenUserChange();
	}
};

app.initialize();

function pageInit() {
	console.log("pageInit in...");
}

function getQuestionIndex() {
	var d = (new Date()).getDate();
	var index = 0;
	var len = _interlucationsArray.length;
	for(var i = 0; i < len; i++) {
		if(_interlucationsArray[i].date == d) {
			index = i;
		}
	}
	console.log("current date: "+ d + ", index:"+index);
	return index;
}
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
//获取第一个未完成任务，如都完成，跳toast： bToast: true:弹窗  false：只获取第一个未完成任务，不弹窗；
function getFirstUndoneTaskOrToast(bToast) {
	var len = $(".coocaa_btn_taskcenter").length;
	var i = 0;
	// 0:当前任务完成，有其它未完成任务；
	// 1：所有任务都完成，福卡集市未开启
	// 2：所有任务都完成，福卡集市已开启
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
//	bToast: true:弹窗  false：只获取第一个未完成任务，不弹窗；
	if(bToast == false) {
		return;
	}
	
	//还要分福卡集市是否开放的状态：
	if(i == len) { 
		(_blessingMarketOpen == true) ? (taskStatus = 2) : (taskStatus = 1); 
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
		}else if(taskStatus == 2){
			console.log("跳到福卡集市，任务中心页面kill自己");
			var url = _fukaMarketUrl;
			coocaaosapi.startNewBrowser4(url, function(success){
				console.log("startNewBrowser success");
				navigator.app.exitApp();
			}, function(err){console.log("startNewBrowser error")});
		}
	});
}
function processKey(el) {
	var curId = el.attr("id");
	var taskId = el.attr("taskId");
	console.log("processKey curId: "+ curId + ",taskId:"+taskId);
	//根据后台获取数据，对任务赋予不同id：
//	1.微信好友助力
//	2.登录任务
//	3.互动问答
//	4.浏览指定页面
//	5.完成付费
//	6.观看广告
	//step 1: 先判断当前任务是否已完成：
	//yuanbotest
//	if(checkCurTaskStatus(el)) {
//		//落焦到未完成任务 或 跳toast
//		getFirstUndoneTaskOrToast(true);
//		return;
//	}
	switch(curId) {
		case "weixinHelpTaskId":
			webTaskCenterBtnClickLog("任务中心页面", "做任务", "好友助力");
			webTaskCenterPageShowLog("微信好友助力任务页面");
			$(".wechatHelpPageClass").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn_taskcenter_wechat"), $(".coocaa_btn_taskcenter_wechat").eq(0), 'btn-focus', function() {}, function(val) {}, function(obj) {});
			getEncryptKeyForWechat(taskId);
			break;
		case "loginTaskId":
			webTaskCenterBtnClickLog("任务中心页面", "做任务", "登录");
			webTaskCenterPageShowLog("登录任务页面");
			startLogin(needQQ);
			break;
		case "interlucationTaskId":
			webTaskCenterBtnClickLog("任务中心页面", "做任务", "回答指定问题");
			webTaskCenterPageShowLog("问答任务页面");
			//显示问题和答案
			var index = getQuestionIndex();
			$("#interlucationQuestionToastId .interlucationTitleClass").text(_interlucationsArray[index].question);
			$("#interlucationQuestionToastId .interlucationBtnClass").eq(0).text(_interlucationsArray[index].answerA);
			$("#interlucationQuestionToastId .interlucationBtnClass").eq(1).text(_interlucationsArray[index].answerB);
			if(_interlucationsArray[index].right == "A") { //根据答案设置元素属性
				$("#interlucationQuestionToastId .interlucationBtnClass").eq(0).attr("correct", true);
				$("#interlucationQuestionToastId .interlucationBtnClass").eq(1).attr("correct", false);	
			}else {
				$("#interlucationQuestionToastId .interlucationBtnClass").eq(0).attr("correct", false);
				$("#interlucationQuestionToastId .interlucationBtnClass").eq(1).attr("correct", true);
			}

			$("#interlucationQuestionToastId .interlucationBtnClass").attr("round", "firstRound");//第一轮回答
			
			$("#interlucationQuestionToastId").css("display", "block");
			$("#interlucationPageId").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn_taskcenter_question"), $(".coocaa_btn_taskcenter_question").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$(".coocaa_btn_taskcenter_question").unbind().bind("itemClick", function() {
				interlucationProcess($(this), taskId);
			});
			break;
		case "browserTaskId":
			webTaskCenterBtnClickLog("任务中心页面", "做任务", "页面浏览");
			//浏览指定版面任务
			var param = el.attr("param");
			console.log("param:"+param);
			param = JSON.parse(param);
			doSpecificBrowseTask(param, taskId);
			break;	
		case "payTaskId":
			webTaskCenterBtnClickLog("任务中心页面", "做任务", "购买商品");
			webTaskCenterPageShowLog("支付任务商品采购页面");
			$(".moreGoodsPageClass").css("display", "block");
			testAddmoreGoods();
			map = new coocaakeymap($(".coocaa_btn_taskcenter_moregoods"), $(".coocaa_btn_taskcenter_moregoods").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$(".coocaa_btn_taskcenter_moregoods").unbind("itemClick").bind("itemClick", function() {
				var index = $(".coocaa_btn_taskcenter_moregoods").index($(this));
				var moreGoodsList = null;
				if(needQQ) {
					moreGoodsList = moreGoodsTencent;
				}else {
					moreGoodsList = moreGoodsYinhe;
				}
				if(index >= moreGoodsList.length) {
					index = moreGoodsList.length - 1;
				}
				var moreGood = moreGoodsList[index];
				//提交点击商品是第几排第几位
				var row = 1, colume = 1;//第一排-第一位
				row = index / 5 + 1;
				colume = index % 5 + 1;
				webTaskCenterBtnClickLog("支付任务商品采购页面", moreGood.name, row+"-"+colume);
				doSpecificBrowseTask(moreGood, taskId);
			});
			$(".coocaa_btn_taskcenter_moregoods").unbind("itemFocus").bind("itemFocus", function() {
				moreGoodsFocusShift($(this));
			});
			break;		
		case "adsTaskId":
			webTaskCenterBtnClickLog("任务中心页面", "做任务", "观看视频");
			webTaskCenterPageShowLog("浏览视频广告任务页面");
			doPlayAdsTask(taskId);
			break;		
	}
}
//播放广告任务
function doPlayAdsTask(taskId) {
	selectAd("CCADTV10015","","","","",_xMasNewYearActivityId.toString(),taskId.toString());
}
//获取广告信息
function selectAd(appid,game_id,game_scene,game_panel,game_position,activity_id,task_id){
    console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    coocaaosapi.getAdData(appid,game_id,game_scene,game_panel,game_position,activity_id,task_id,function (msg) {
        console.log("getAdData===="+msg);
        ADMsg = JSON.parse(msg);
        //ADMsg = _adsTestMsg;//yuanbotest
        if(ADMsg == null || ADMsg == undefined || ADMsg == "{}") {
        	console.log("广告请求超时----显示超时弹窗");
        	$("#taskcenterTaskHasDoneToastId .interlucationTitleClass").html('视频暂时失踪了,<br>试试退出重新打开~');
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
	        if(ADMsg.total > 0){
	            //广告曝光
	            _adsTaskId = task_id;
				sentInnerAdshow(ADMsg,"","","","",activity_id,task_id);
				sentThirdAdshow("video",ADMsg);
				sentThirdAdshow("videoStart",ADMsg);
	            var url = ADMsg.schedules[0].content;
	            console.log("广告数据正常 url:"+url);
	            //播放视频广告
				coocaaosapi.startCommonWebview("", url, "广告视频", "1080", "1920", "", "广告1", "广告2", function(message) {
					console.log(message);
				}, function(error) {
					console.log("startCommonWebview-"+error);
				});
	        }else{
	            console.log("广告total为0，没有投广告，播放备用视频^^^^^^^^^^^^^^^");
	            //todo
	        }
        }
    },function (error) {console.log("getAdData===="+error);});
}
//广告内部提交
function sentInnerAdshow(msg,game_id,game_scene,game_panel,game_position,activity_id,task_id) {
    coocaaosapi.submitAdData(JSON.stringify(msg.schedules[0]),game_id,game_scene,game_panel,game_position,activity_id,task_id,function (msg) {
        console.log("sentInnerAdshow success==="+msg);
    },function (err) {
        console.log("sentInnerAdshow err==="+err);
    })
}
//广告第三方监测
function sentThirdAdshow(type,msg) {
    var thirdUrl = "";
    if(type == "video"){
        thirdUrl = JSON.stringify(msg.schedules[0].track_url);
    }
    else if(type == "videoStart"){
        thirdUrl = JSON.stringify(msg.schedules[0].player_start_tracks);
    }
    else if(type == "videoEnd"){
        thirdUrl = JSON.stringify(msg.schedules[0].player_end_tracks);
    }
    coocaaosapi.submitThirdAdData(thirdUrl,msg.schedules[0].schedule_id,msg.schedules[0].order_id,msg.schedules[0].adspace_id,function (msg) {
        console.log("submitThirdAdData success==="+msg);
    },function (err) {
        console.log("submitThirdAdData err==="+err);
    });
}
//焦点移动 ---------------testZone start------------------：
function testAddmoreGoods() {
	//step 1: 要先删掉之前添加的商品,避免重复
	var count = $(".goodsItemClass").length;
	console.log("count:"+count);
	if(count >= 2) {
		for(var i = count-1; i >= 1 ; i--) {
			$(".goodsItemClass").eq(i).remove();	
		}
	}
	
//	step 2:添加新商品:
	count = 9;
	for(var i = 0; i < count; i++) {
		$("#moregoodsList").append($(".goodsItemClass:last-of-type").clone());	
	}
	var len = $(".goodsItemClass").length;
	
	var imgbase="http://beta.webapp.skysrt.com/yuanbo/test/materials/goods/goods ("
	for(i = 0; i < len; i++) {
		//todo 需要更新页面图片,需要更新每个商品价格等信息，运营确认最终产品后，让设计把价格都做到图上
		$(".moreGoodsItemPic").eq(i).css("background-image", "url('"+imgbase+(i+1)+").jpg')");
//		$(".moreGoodsItemTitleClass").eq(i).text();
//		$(".moreGoodsItemPriceClass").eq(i).text();
//		$(".moreGoodsItemFooterClass").eq(i).text();
	}
}
//div:容器id； el：当前焦点元素$(this)
function letEleInView(div, el) {
	var scrollHeight = $("#"+div)[0].scrollHeight;
	var clientHeight = $("#"+div)[0].clientHeight;
	if(scrollHeight <= clientHeight) {
		return ;//如果内容没有超出可视区域，不用翻页
	}
	//滚动后的可视区域
	var scrollTop = $("#"+div)[0].scrollTop;
	var scrollBottom = scrollTop + clientHeight;
	//落焦元素的top、bottom
	var offsetTopIn = el[0].offsetTop;
	var offsetBottomIn = offsetTopIn + el[0].offsetHeight;
	
	console.log("isEleInView offsetTopIn:"+offsetTopIn + ",offsetBottomIn:"+offsetBottomIn);
	console.log("isEleInView scrollTop:"+scrollTop + ",total top:"+(scrollTop+clientHeight));
	//元素top和bottom都必须在可视区域内，否则就滚动：
	if(!((offsetTopIn >= scrollTop && offsetTopIn <= scrollBottom) &&
		(offsetBottomIn >= scrollTop && offsetBottomIn <= scrollBottom))) {
			$("#"+div)[0].scrollTop = offsetTopIn - (clientHeight-el[0].offsetHeight)/2;
			console.log("set offset: "+ $("#"+div)[0].scrollTop);
	}
}
function moreGoodsFocusShift(el) {
	letEleInView("moregoodsList", el);
}
//焦点移动 ---------------testZone end------------------：
//互动问答处理函数 
function interlucationProcess(el, taskId) {
	var round = el.attr("round");
	console.log("interlucationProcess round:" + round);
	if(round == "firstRound") {//第一轮回答
		var b = el.attr("correct");
		console.log("answer right or wrong: "+b);
		if(b == "true") {//回答正确
			//提示
			$("#interlucationQuestionToastId").css("display", "none");
			$("#interlucationAnswerToastId").css("display", "block");
			
			$("#interlucationAnswerToastId").css("background-image", "url(images/taskcenter/interlucationBgRight.png)");
			
			$("#interlucationAnswerToastId .interlucationTitleClass").html(_interlucationsTipsArray[0].title);
			//左键
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(0).text(_interlucationsTipsArray[0].leftKey);
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(0).attr("url", _interlucationsTipsArray[0].lefturl);
			//右键
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(1).text(_interlucationsTipsArray[0].rightKey);
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(1).attr("url", _interlucationsTipsArray[0].righturl);
		} else {//回答错误
			//提示
			$("#interlucationQuestionToastId").css("display", "none");
			$("#interlucationAnswerToastId").css("display", "block");
			//错误背景图
			$("#interlucationAnswerToastId").css("background-image", "url(images/taskcenter/interlucationBgWrong.png)");
			
			$("#interlucationAnswerToastId .interlucationTitleClass").text(_interlucationsTipsArray[1].title);
			//左键
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(0).text(_interlucationsTipsArray[1].leftKey);
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(0).attr("url", _interlucationsTipsArray[1].lefturl);
			//右键
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(1).text(_interlucationsTipsArray[1].rightKey);
			$("#interlucationAnswerToastId .interlucationBtnClass").eq(1).attr("url", _interlucationsTipsArray[1].righturl);
		}
		webTaskCenterClickedResultLog("问答任务页面", "回答成功");
		
		var askResult = (b == "true") ? 1 : 0; //回答是否正确
		addChanceWhenFinishTask(0, taskId, askResult);		
		
		//设为第二轮
		$("#interlucationAnswerToastId .interlucationBtnClass").attr("round", "secondRound");
		map = new coocaakeymap($(".coocaa_btn_taskcenter_answer"), $(".coocaa_btn_taskcenter_answer").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
		$(".coocaa_btn_taskcenter_answer").unbind().bind("itemClick", function() {
			interlucationProcess($(this));
		});
	}else if(round == "secondRound") {
		var url = el.attr("url");
//		回答正确 左键:了解创维  右键:去抽卡
//		回答错误 左键:了解创维  右键:试试其他任务
		console.log("answer url:" + url);
		switch(url) {
			case _interlucationsTipsArray[0].righturl: //回答正确右键
				console.log("去抽卡,任务中心页面kill自己");
				navigator.app.exitApp();
				break;
			case _interlucationsTipsArray[0].lefturl: //回答正确左键
			case _interlucationsTipsArray[1].lefturl: //回答错误左键
				console.log("更多答案详情");
				doRandomBrowserTask(taskId);
				break;
			case _interlucationsTipsArray[1].righturl: //回答错误右键，试试其他任务：
				$("#interlucationAnswerToastId").css("display", "none");
				$("#interlucationPageId").css("display", "none");
				getFirstUndoneTaskOrToast(false);
				map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
				break;
		}
	}	
}
//做浏览指定版面任务
function doSpecificBrowseTask(param, taskId){
	var pkgname = param.packageName;
	var action = param.byvalue;
	var params = param.params;
	var minVersionCode = param.versionCode;//运营配置的最低版本要求
	var business = param.business;//视频或教育  商城
	
	var hasversioncode = "";//当前版本号
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
				var latestVersion;
				if(business == "movie") {//影视教育
					latestVersion = _appVersionLatest;
				}else if(business == "mall"){//商城
					latestVersion = _mallVersionLatest;
					minVersionCode = -1;//商城总能进入，不用最低版本判断
				}
				
				if(hasversioncode < latestVersion) {
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
					startNewVersionAction(taskId,param1,param2,param3,param4,param5,str);
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
    function startNewVersionAction(taskId,param1,param2,param3,param4,param5,str) {
        console.log("startNewVersionAction 客户端加机会");
        str = JSON.parse(str);
        var external = {"taskId":taskId,"id":_xMasNewYearActivityId,"userKeyId":_activityId, "countDownTime":10, "verify_key":new Date().getTime(), "subTask":"0"};
        var doubleEggs_Active = {"doubleEggs_Active":external};
        str.push(doubleEggs_Active);
        str = JSON.stringify(str);
        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
    }   
}
//todo 做随机任务，暂时用作互动问答按键跳转，后续运营正式确定后再修改：（from谢金融）
function doRandomBrowserTask(taskId) {
    var apkVersion = [];
    var apkArry = ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"];
    var a = '{ "pkgList": ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"] }';
    var randomMax = 11;//任务数
    var randomNum = Math.floor(Math.random()*(randomMax));
    console.log("做任务：======="+randomNum);
    // return;
    coocaaosapi.getAppInfo(a, function(message) {
        console.log("getAppInfo====" + message);
        for(var i=0;i<4;i++){
            apkVersion.push(JSON.parse(message)[apkArry[i]].versionCode);
        }
        _activityCenterVersionLocal = apkVersion[0];
        _browserVersionLocal = apkVersion[1];
        var _mallVersionLocal = apkVersion[2];
        cAppVersion = apkVersion[3];
        console.log("===_activityCenterVersionLocal=="+_activityCenterVersionLocal+"===_browserVersionLocal=="+_browserVersionLocal+"==_mallVersionLocal=="+_mallVersionLocal+"==cAppVersion=="+cAppVersion);
        if(needQQ){
            missionlist = missionlistTencent;
        }else{
            missionlist = missionlistYinhe;
        }
        if(_activityCenterVersionLocal<103000){
            console.log("活动中心版本过低！！！！");
            return;
        }else if(missionlist[randomNum].business == "ad"){
            if(_browserVersionLocal < 104022){
                console.log("浏览器版本过低！！！！");
                return;
            }else {
                startNewVersionAction(randomNum);
            }
        }else if(missionlist[randomNum].business == "movie" || missionlist[randomNum].business == "edu"){
            if(cAppVersion < 3410022){
                if(missionlist[randomNum].type == "videospecial"){
                    if(cAppVersion<3300000){
                        startLowVersionAction(4);
                    }else{
                        startLowVersionAction(randomNum);
                    }
                }else if(missionlist[randomNum].type == "specialtopic"){
                    if(cAppVersion<3170001){
                        startLowVersionAction(4);
                    }else{
                        startLowVersionAction(randomNum);
                    }
                }else{
                    startLowVersionAction(randomNum);
                }

            }else{
                startNewVersionAction(randomNum);
            }
        }else if(missionlist[randomNum].business == "mall"){
            if(_mallVersionLocal < 31000020){
                console.log("商城版本不支持apk添加=======调用加机会接口");
                startLowVersionAction(randomNum);
            }else{
                startNewVersionAction(randomNum);
            }
        }
    }, function(error) {
        console.log("getAppInfo----error" + JSON.stringify(error));
    });
    function startLowVersionAction(randomNum){
        console.log("加机会");
        addChanceWhenFinishTask(missionlist[randomNum].subTask, taskId);
        
        var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
        var str = "[]";
        if(JSON.stringify(missionlist[randomNum].param) != "{}"){
            str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
        }
        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
    }
    function startNewVersionAction(randomNum) {
        var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
        var str = "[]";
        if(JSON.stringify(missionlist[randomNum].param) != "{}"){
            str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
        }
        str = JSON.parse(str);
        var external = {"taskId":taskId,"id":_xMasNewYearActivityId,"userKeyId":_activityId, "subTask":missionlist[randomNum].subTask, "countDownTime":missionlist[randomNum].countDownTime, "verify_key":new Date().getTime()}
        var doubleEggs_Active = {"doubleEggs_Active":external};
        str.push(doubleEggs_Active);
        str = JSON.stringify(str);
        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
    }
}
//完成任务时，增加机会接口：
 function addChanceWhenFinishTask(taskType, taskId, askResult, shareId) {
 	console.log("taskType:"+taskType+",taskId:"+taskId);
    var taskName = "跳转任务";
    if(taskType == "1"){
        taskName == "视频任务";
    }
    console.log("id==="+_xMasNewYearActivityId+"======userKeyId===="+_activityId+"===taskId="+taskId+"====_openId===="+_openId);
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
        },//,chanceSource:2,subTask:0,cOpenId:_openId},
        dataType: "json",
        success: function(data) {
            console.log("------------addChanceWhenFinishTask----result-------------"+JSON.stringify(data));
            if(data.code == 50100){
            	
            }else{
            	
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}
//获取本机应用版本号： 活动中心 浏览器 影视教育 商城
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
        //如果活动中心或浏览器版本不能满足需求：
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
        } else {//版本满足需求，才真正执行按键判断：
        	processKey(el);
        }
        
    }, function(error) {
        console.log("getAppInfo----error" + JSON.stringify(error));
    });
}
 
//获取设备信息并初始化
function getDeviceInfo() {
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
		getTvSource(_macAddress, _TVchip, _TVmodel, _emmcCID, _activityId, "Default", message.version.replace(/\./g, ""), message.panel, _appversion, message.androidsdk, message.brand);		
		
	}, function(error) {
		console.log("获取设备信息出现异常。");
	});
}

function getTvSource(smac, schip, smodel, semmcid, sudid, sFMode, sTcVersion, sSize, sAppVersion, sSdk, sBrand) {
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
			hasLogin(needQQ, 0);　　
		}
	});
}
//stage: 0 :初始化阶段,需要初始化活动信息  1:登录状态右边,用户登录成功时,获取用户信息
function hasLogin(needQQ, stage) {
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
				initActivityInfo();
			}else if(stage == 1) {
				var taskId = $(".coocaa_btn_taskcenter").eq(_Lindex).attr("taskId");
			 	addChanceWhenFinishTask(0, taskId);
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
					//没有登录:
					if(stage == 0) {
						initActivityInfo();
					}else if(stage == 1) {
						var taskId = $(".coocaa_btn_taskcenter").eq(_Lindex).attr("taskId");
					 	addChanceWhenFinishTask(0, taskId);
					}
				}, function(error) {})
			}, function(error) {});
		}
		
	}, function(error) {});
}

function startLogin(needQQ) {
    console.log("startLogin in: _tencentWay:" + _tencentWay);
    if (needQQ) {
        if (accountVersion > 4030000) {
            if (_tencentWay == "qq") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_QQ", function(message) { console.log(message); }, function(error) { console.log(error); });
            } else if (_tencentWay == "weixin") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) { console.log(message); }, function(error) { console.log(error); });
            } else if (_tencentWay == "both") {
                coocaaosapi.startWeixinOrQQ2("TENCENT", function(message) { console.log(message); }, function(error) { console.log(error); });
            }
        } else {
            coocaaosapi.startThirdQQAccount(function(message) { console.log(message); }, function(error) { console.log(error); });
        }
    } else {
        if (_deviceInfo.version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
            coocaaosapi.startUserSettingAndFinish2(function(message) { console.log(message); }, function(error) { console.log(error); });
        } else {
            coocaaosapi.startUserSettingAndFinish(function(message) { console.log(message); }, function(error) { console.log(error); });
        }
    }
    console.log("startLogin out...");
}
 
//监听账户变化
function listenUserChange() {
	coocaaosapi.addUserChanggedListener(function(message) {
		console.log("用户登录成功.");
		_bUserLoginSuccess = true;
		 //后台加机会，并根据后台数据处理：
		 hasLogin(needQQ, 1);
	});
}
//活动初始化
function initActivityInfo() {
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
				getMyTasksList();
				_blessingMarketOpen = data.isTrade;
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
//获取我的任务信息
function getMyTasksList() {
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
			"divideId":_springActivityDivideId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") { //服务器返回正常
				if(data.data!=null) { //如果有礼物
					updateTaskInfoToPage(data.data);
				}
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
//更新后台数据到页面显示
function updateTaskInfoToPage(data) {
	console.log("updateTaskInfoToPage in...");
	var task = null, bFinished = false;
	var taskArray = [
		 {type: 'ask', index: 0 }
		,{type: 'jump', index: 1 }
		,{type: 'video', index: 2 }
		,{type: 'login', index: 2 }
		,{type: 'buy', index:3 }
		,{type: 'weChat', index: 4 }];
	var len = taskArray.length;
	
	//step1.先清除旧的信息
	$(".coocaa_btn_taskcenter").removeAttr("id");
	$(".coocaa_btn_taskcenter").removeAttr("status");
	
	//step2:更新新数据:
	for(var i = 0; i < len; i++) {
		if(data[taskArray[i].type] != undefined) {
			task = data[taskArray[i].type][0];
			index = taskArray[i].index;
			if(task.remainingNumber > 0) {//做任务
				$(".taskBtnClass").eq(index).css("background-image", "url(images/taskcenter/btndotask.png)");
				bFinished = false;
			}else {//已完成
				$(".taskBtnClass").eq(index).css("background-image", "url(images/taskcenter/btndone.png)");
				bFinished = true;
			}
			$(".coocaa_btn_taskcenter").eq(index).attr("status", bFinished);
			$(".coocaa_btn_taskcenter").eq(index).attr("taskId", task.taskId);
		}
	}
	$(".coocaa_btn_taskcenter").eq(0).attr("id", "interlucationTaskId");
	$(".taskIconClass").eq(0).css("background-image", "url(images/taskcenter/icontaskinterlucation.png)");			
	$(".coocaa_btn_taskcenter").eq(1).attr("id", "browserTaskId");
	$(".taskIconClass").eq(1).css("background-image", "url(images/taskcenter/icontaskbrowser.png)");
	if(data.jump != undefined) {//跳转任务
		var param = data.jump[0].param;
		$(".coocaa_btn_taskcenter").eq(1).attr("param", param);	
	}
	if(data.video != undefined) {//观看视频
		$(".coocaa_btn_taskcenter").eq(2).attr("id", "adsTaskId");		
		$(".taskIconClass").eq(2).css("background-image", "url(images/taskcenter/icontaskwatch.png)");
		$(".taskTipsClass").eq(2).html("观看视频<br/><span>+1</span>次抽卡机会");
	}
	if(data.login != undefined) {//登录任务
		$(".coocaa_btn_taskcenter").eq(2).attr("id", "loginTaskId");	
		$(".taskIconClass").eq(2).css("background-image", "url(images/taskcenter/icontasklogin.png)");
		$(".taskTipsClass").eq(2).html("完成登录<br/><span>+1</span>次抽卡机会");
	}
	$(".coocaa_btn_taskcenter").eq(3).attr("id", "payTaskId");		
	$(".taskIconClass").eq(3).css("background-image", "url(images/taskcenter/icontaskbuy.png)");		
	$(".coocaa_btn_taskcenter").eq(4).attr("id", "weixinHelpTaskId");		
	$(".taskIconClass").eq(4).css("background-image", "url(images/taskcenter/icontaskwechat.png)");

	//触发按键
	map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
	$(".coocaa_btn_taskcenter").unbind("itemClick").bind("itemClick", function() {
		_Lindex = $(".coocaa_btn_taskcenter").index($(this));
		console.log("itemClick _Lindex = " + _Lindex);
			getLocalApkVersions($(this));
	});

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
//微信分享-获取电视的加密key
function getEncryptKeyForWechat(taskId) {
	console.log("getEncryptKeyForWechat in: " + _xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "post",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/building/share/encrypt",
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
			"taskId":taskId,
			"id": _xMasNewYearActivityId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") { //服务器返回正常
				if(data.data!=null) { //
					console.log("key:"+data.data.key);
					getWechatHelpQr(data.data.key);
				}
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
//生成微信助力二维码
function getWechatHelpQr(key) {
	document.getElementById("wechatQrCodeId").innerHTML = "";
//	var testkey = "7e05e697ba2384df17ac35b7f35c3cc9f60dace357b6392ff12d4af6710108b2932044bfa440d1e524eab416d4048aca";
	var str = _urlWechatHelp + key;
	var qrcode = new QRCode(document.getElementById("wechatQrCodeId"), {
		width: 320,
		height: 320
	});
	qrcode.makeCode(str);
}
//获取url中的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

//数据采集-任务中心-子任务页面曝光
function webTaskCenterPageShowLog(task_page_name) {
	var _dateObj = {
		"page_name": task_page_name,
		"parent_page_name": "任务中心",
		"activity_name": "春节集卡活动"
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
//数据采集-任务中心-子任务点击结果
function webTaskCenterClickedResultLog(task_page_name, task_result) {
	var _dateObj = {
		"page_name":task_page_name,
		"parent_page_name": "任务中心",
		"activity_name": "春节集卡活动"
	}
	switch(task_page_name) {
		case "登录任务页面":
			_dateObj.login_result = task_result;
			break;
		case "问答任务页面":
			_dateObj.question_result = task_result;
			break;
		case "跳转浏览任务页面":
			_dateObj.browse_result = task_result;
			break;
		case "浏览视频广告任务页面":
			_dateObj.ad_result = task_result;
			break;		
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	_czc.push(["_trackEvent","春节集卡活动","任务中心",task_page_name,task_result,""]);
	coocaaosapi.notifyJSLogInfo("okr_web_clicked_result", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}
//数据采集-任务中心-按钮点击
function webTaskCenterBtnClickLog(task_page_name, button_name, position_id) {
	var _dateObj = {
		"page_name":task_page_name,
		"activity_name": "春节集卡活动",
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

//PC端测试函数
//获取我的礼物信息
function testtest_initActivityInfo(){
	_macAddress = "001a9a000000";
	_TVchip = "9S52";
	_TVmodel = "Q4A";
	_emmcCID = "1101003030384737300017c1438f6400";
	_activityId = "16706858";
	_access_token = "2.378b41b74eb048f795637b0d7d0d9aa6";
	_openId = "1266ec9cd2b811e8a09700505687790a";
	_nickName = "原博";
	
	initActivityInfo();
}

//加载立即检测版本
function checkVersion() {
    if(_activityCenterVersionLocal<103004){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181209/20181209111030764234.apk",
            "5501D27CF6D0B187C49C6FBD217D59AA",
            "活动中心",
            "com.coocaa.activecenter",
            "26417",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {},function () {});
    }
    if(_browserVersionLocal<104031){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181213/20181213190209511926.apk",
            "270A47719CDBAB47EDBC5B1BD8808266",
            "活动浏览器",
            "com.coocaa.app_browser",
            "26423",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {},function () {})
    }
}