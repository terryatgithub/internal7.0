//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
var _xMasNewYearActivityId = 95;
var _goldHouseActivityId = 90;//88;//90;
var _buyActiveId = 91;//返利红包活动id
var _urlActivityServer = "http://beta.restful.lottery.coocaatv.com/";//主活动接口

var _goldHouseUrl = "http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=gold";//黄金小屋（活动主页面url)
var _mainHomeUrl = "http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=pack";//打包清单url

//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
//var _xMasNewYearActivityId = 97;
//var _goldHouseActivityId = 99;
//var _buyActiveId = 98;
//var _urlActivityServer = "https://restful.skysrt.com/light";//主活动接口

//var _goldHouseUrl = "https://webapp.skysrt.com/christmas18/main/index.html?pagename=gold";//黄金小屋（活动主页面url)
//var _mainHomeUrl = "https://webapp.skysrt.com/christmas18/main/index.html?pagename=pack";//打包清单url
//-----------------------------正式上线需配置参数 end---------------------------------//

//全局参数
var _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId="" ;
var _access_token="", _openId="", _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;
var _appversion, accountVersion, _deviceInfo;
var _qsource, needQQ=false; //视频源

//福卡集市是否开放
var _blessingMarketOpen = false;

//
var _Lindex = 0;//主页当前焦点
var _bUserLoginSuccess = false; //跳出登录页面时，用户是否登录成功；

//互动问答题目区，由前端根据系统当前时间固定获取一个）
var _interlucationsArray = [
	 //题目， 答案A，答案B，正确答案，出现日期， 用户是否做过此题
	 {question: "创维电视的全球代言人是谁？", answerA:"A、李易峰", answerB:"B、赵又廷", right: "A", date: 29, done: "no" }
	,{question: "中国彩电哪家强1？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 30,done: "no"}
	,{question: "中国彩电哪家强2？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 31,done: "no"}
	,{question: "中国彩电哪家强3？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 1,done: "no"}
	,{question: "中国彩电哪家强4？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 2,done: "no"}
	,{question: "中国彩电哪家强5？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 3,done: "no"}
	,{question: "中国彩电哪家强6？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 4,done: "no"}
	,{question: "中国彩电哪家强7？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 5,done: "no"}
	,{question: "中国彩电哪家强8？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 6,done: "no"}
	,{question: "中国彩电哪家强9？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 7,done: "no"}
	,{question: "中国彩电哪家强10？",answerA:"A、创维",answerB:"B、其它",right: "B",date: 8,done: "no"}
]
//回答正确或错误时的提示和跳转
var _interlucationsTipsArray = [
	{
		title: "恭喜回答正确! 获得1次抽奖机会",
		leftKey: "了解创维",
		lefturl: _goldHouseUrl,
		rightKey: "去抽卡",
		righturl: _mainHomeUrl
	}
	,{
		title: "阿欧，回答错误！",
		leftKey: "了解创维",
		lefturl: _goldHouseUrl,
		rightKey: "试试其它任务",
		righturl: _mainHomeUrl
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
//随机浏览任务，分视频源：
//todo：public String subTask;//任务类型：0其他浏览任务    1观看视频任务
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

//---------------------------------------------2019春节活动需要函数 start -----------------------------------------------
//函数正式开始：
var app = {
	initialize: function() {
		//yuanbotest PC debug start
		testtest_initActivityInfo();
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
		if($(".coocaa_btn").eq(_Lindex).attr("id") == "loginTaskId" &&  _bUserLoginSuccess == true) {
			console.log("onresume-用户登录成功");
			 $(".coocaa_btn:eq("+_Lindex+") .taskBtnClass").css("background-image", 'url(images/taskcenter/btndone.png)');
		}else {
			//todo
			console.log("要获取其它任务的完成状态，以刷新页面");
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
			//todo 获取微信任务状态，刷新页面：
			
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if($("#interlucationPageId").css("display") == "block") { //从互动问答页面返回
			$("#interlucationPageId").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if($(".moreGoodsPageClass").css("display") == "block") { //从更多商品页面返回
			$(".moreGoodsPageClass").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}  else if($("#toastWhenClickTaskHasDoneId").css("display") == "block") { //从弹窗返回
			$("#toastWhenClickTaskHasDoneId").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			navigator.app.exitApp();
		}
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		_appversion = accountVersion;
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
	//todo 需要初始化时先设置该属性
	var status = el.attr("status");
	console.log("checkCurTaskStatus status:"+status);
	if(status == "true"){
		return true;
	}else {
		return false;
	}
}
//获取第一个未完成任务，如都完成，跳toast：
function getFirstUndoneTaskOrToast() {
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
	console.log("getFirstUndoneTaskOrToast _Lindex:"+_Lindex);
	//todo 还要分福卡集市是否开放的状态：
	if(i == len) { 
		(_blessingMarketOpen == true) ? (taskStatus = 2) : (taskStatus = 1); 
	}
	$("#toastWhenClickTaskHasDoneId .interlucationTitleClass").html(_tipsWhenClickTaskHasDone[taskStatus].title);
	$("#toastWhenClickTaskHasDoneId .interlucationBtnClass").text(_tipsWhenClickTaskHasDone[taskStatus].btnName);
	$("#toastWhenClickTaskHasDoneId").css("display", "block");
	
	map = new coocaakeymap($(".coocaa_btn_taskcenter_toast"), $(".coocaa_btn_taskcenter_toast").eq(0), 'btn-focus', function() {}, function(val) {}, function(obj) {});
	$(".coocaa_btn_taskcenter_toast").unbind().bind("itemClick", function() {
		//todo
		if(taskStatus == 0) {
			$("#toastWhenClickTaskHasDoneId").css("display", "none");		
			map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(_Lindex), 'btn-focus', function() {}, function(val) {}, function(obj) {});
		}else if(taskStatus == 1){
			//todo 跳到庙会
			//当前页面要关闭吗？
			console.log("跳到庙会");
			var url = _mainHomeUrl;
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
			
			navigator.app.exitApp();
		}else if(taskStatus == 2){
			//todo 跳到福卡集市
			//当前页面要关闭吗？
			console.log("跳到福卡集市");
			var url = _mainHomeUrl;
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
			
			navigator.app.exitApp();
		}
	});
}
function processKey(el) {
	var curId = el.attr("id");
	console.log("processKey curId: "+ curId);
	//根据后台获取数据，对任务赋予不同id：
//	1.微信好友助力
//	2.登录任务
//	3.互动问答
//	4.浏览指定页面
//	5.完成付费
//	6.观看广告
	//step 1: 先判断当前任务是否已完成：
	if(checkCurTaskStatus(el)) {
		//落焦到未完成任务 或 跳toast
		getFirstUndoneTaskOrToast();
		return;
	}
	switch(curId) {
		case "weixinHelpTaskId":
			$(".wechatHelpPageClass").css("display", "block");
			//todo 新btn获取焦点后，移动按键时，coocaa_btn是否也会移动？ 试下
			map = new coocaakeymap($(".coocaa_btn_wechat"), $(".coocaa_btn_wechat").eq(0), 'btn-focus', function() {}, function(val) {}, function(obj) {});
//			$(".coocaa_btn").unbind();
			//todo 生成微信助力二维码
			break;
		case "loginTaskId":
			startLogin(needQQ);
			break;
		case "interlucationTaskId":
			//显示问题和答案
			var index = getQuestionIndex();
			$(".interlucationTitleClass").text(_interlucationsArray[index].question);
			$(".interlucationBtnClass").eq(0).text(_interlucationsArray[index].answerA);
			$(".interlucationBtnClass").eq(1).text(_interlucationsArray[index].answerB);
			if(_interlucationsArray[index].right == "A") { //根据答案设置元素属性
				$(".interlucationBtnClass").eq(0).attr("correct", true);
				$(".interlucationBtnClass").eq(1).attr("correct", false);	
			}else {
				$(".interlucationBtnClass").eq(0).attr("correct", false);
				$(".interlucationBtnClass").eq(1).attr("correct", true);
			}

			$(".interlucationBtnClass").attr("round", "firstRound");//第一轮回答
			$("#interlucationPageId").css("display", "block");
//			$(".coocaa_btn").unbind();	
			map = new coocaakeymap($(".coocaa_btn_question"), $(".coocaa_btn_question").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$(".coocaa_btn_question").unbind().bind("itemClick", function() {
				interlucationProcess($(this));
			});
			break;
		case "browserTaskId":
			//todo 
			doRandomBrowserTask();
			break;	
		case "payTaskId":
			$(".moreGoodsPageClass").css("display", "block");
			//todo 显示所有商品
			//yuanbotest -start
			testAddmoreGoods();
			//yuanbotest -end
			map = new coocaakeymap($(".coocaa_btn_moregoods"), $(".coocaa_btn_moregoods").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$(".coocaa_btn_moregoods").unbind("itemClick").bind("itemClick", function() {
				showGoodDetailsPage();
			});
			$(".coocaa_btn_moregoods").unbind("itemFocus").bind("itemFocus", function() {
				moreGoodsFocusShift($(this));
			});
			break;		
		case "adsTaskId":
			//todo 观看广告 
			var url = _mainHomeUrl;
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
			break;		
	}
}
function showGoodDetailsPage() {
	//todo 跳转产品包 
	var url = _mainHomeUrl;
	coocaaosapi.startNewBrowser(url, function(success){
		console.log("startNewBrowser success");
	}, function(err){console.log("startNewBrowser error")});
}
//焦点移动 ---------------testZone start------------------：
function testAddmoreGoods() {
	var count = 15;
	for(var i = 0; i < count; i++) {
		$("#moregoodsList").append($(".goodsItemClass:last-of-type").clone());	
	}
	var len = $(".goodsItemClass").length;
	var imgbase="http://beta.webapp.skysrt.com/yuanbo/test/materials/goods/goods ("
	for(i = 0; i < len; i++) {
		$(".moreGoodsItemPic").eq(i).css("background-image", "url('"+imgbase+(i+1)+").jpg')");
		$(".goodsItemPlaceHolderClass").eq(i).text(i);
		//如果有放大效果的话，需要给每个元素单独设置 上下左右的target,否则按上下键时焦点会乱（因为coocaakeymap算法的原因）
	}
	$(".goodsItemPlaceHolderClass").css("font-size", "32px");
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
//todo:最终定下后优化流程
function interlucationProcess(el) {
	var round = el.attr("round");
	console.log("interlucationProcess round:" + round);
	if(round == "firstRound") {//第一轮回答
		var b = el.attr("correct");
		console.log("answer right or wrong: "+b);
		if(b == "true") {//回答正确
			//提示
			$(".interlucationTitleClass").text(_interlucationsTipsArray[0].title);
			//左键
			$(".interlucationBtnClass").eq(0).text(_interlucationsTipsArray[0].leftKey);
			$(".interlucationBtnClass").eq(0).attr("url", _interlucationsTipsArray[0].lefturl);
			//右键
			$(".interlucationBtnClass").eq(1).text(_interlucationsTipsArray[0].rightKey);
			$(".interlucationBtnClass").eq(1).attr("url", _interlucationsTipsArray[0].righturl);
		} else {//回答错误
			//提示
			$(".interlucationTitleClass").text(_interlucationsTipsArray[1].title);
			//左键
			$(".interlucationBtnClass").eq(0).text(_interlucationsTipsArray[1].leftKey);
			$(".interlucationBtnClass").eq(0).attr("url", _interlucationsTipsArray[1].lefturl);
			//右键
			$(".interlucationBtnClass").eq(1).text(_interlucationsTipsArray[1].rightKey);
			$(".interlucationBtnClass").eq(1).attr("url", _interlucationsTipsArray[1].righturl);
		}
		//设为第二轮
		$(".interlucationBtnClass").attr("round", "secondRound");
		map = new coocaakeymap($(".coocaa_btn_question"), $(".coocaa_btn_question").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
	}else if(round == "secondRound") {
		var url = el.attr("url");
		console.log("answer url:" + url);
		if(b == true) {//左键处理
			//todo (注意修改正确的api)：
			//了解创维
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
		}else {//右键处理
			//todo (注意修改正确的api)：
			//去抽卡，或试试其它任务
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
		}
	}	
}

function doRandomBrowserTask() {
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
        activityCenterVersion = apkVersion[0];
        browserVersion = apkVersion[1];
        mallVersion = apkVersion[2];
        cAppVersion = apkVersion[3];
        console.log("===activityCenterVersion=="+activityCenterVersion+"===browserVersion=="+browserVersion+"==mallVersion=="+mallVersion+"==cAppVersion=="+cAppVersion);
        if(needQQ){
            missionlist = missionlistTencent;
        }else{
            missionlist = missionlistYinhe;
        }
        if(activityCenterVersion<203000){
            console.log("活动中心版本过低！！！！");
            return;
        }else if(missionlist[randomNum].business == "ad"){
            if(browserVersion < 104022){
                console.log("浏览器版本过低！！！！");
                return;
            }else {
                if(_elkOver){
                    startLowVersionAction(randomNum);
                }else{
                    startNewVersionAction(randomNum);
                }
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
                if(_elkOver){
                    startLowVersionAction(randomNum);
                }else{
                    startNewVersionAction(randomNum);
                }
            }
        }else if(missionlist[randomNum].business == "mall"){
            if(mallVersion < 31000020){
                console.log("商城版本不支持apk添加=======调用加机会接口");
                startLowVersionAction(randomNum);
            }else{
                if(_elkOver){
                    startLowVersionAction(randomNum);
                }else{
                    startNewVersionAction(randomNum);
                }
            }
        }
    }, function(error) {
        console.log("getAppInfo----error" + JSON.stringify(error));
    });
    function startLowVersionAction(randomNum){
        if(!_elkOver){
            console.log("加机会");
            addChanceWhenFinishTask(missionlist[randomNum].subTask);
        }else{console.log("不加机会");}
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
        var external = {"taskId":taskId,"id":_xMasNewYearActivityId,"userKeyId":_activityId, "countDownTime":missionlist[randomNum].countDownTime, "verify_key":new Date().getTime()}
        var doubleEggs_Active = {"doubleEggs_Active":external};
        str.push(doubleEggs_Active);
        str = JSON.stringify(str);
        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
    }
}
//完成任务时，增加机会接口：
//todo taskId:
 function addChanceWhenFinishTask(taskType, taskId) {
    var taskName = "跳转任务";
    if(taskType == "1"){
        taskName == "视频任务";
    }
    console.log("id==="+_xMasNewYearActivityId+"======userKeyId===="+_activityId+"===taskId="+taskId+"=subTask===0====openid===="+cOpenId);
    $.ajax({
        type: "post",
        async: true,
        timeout: 10000,
        url: _urlActivityServer+"/building/task/finish-task",
        data: {taskId:taskId,activeId:_xMasNewYearActivityId,userKeyId:_activityId},//,chanceSource:2,subTask:0,cOpenId:cOpenId},
        dataType: "json",
        success: function(data) {
            console.log("------------addChanceWhenFinishTask----result-------------"+JSON.stringify(data));
            if(data.code == 50100){
                if(goldHouseIsOpen == "1"){goldHouseStation = "黄金小屋未开启";}else if(goldHouseIsOpen == "2"){goldHouseStation = "黄金小屋已开启";}else{goldHouseStation = "黄金小屋已关闭";}
                sentLog("task_finished",'{"task_type":"'+taskName+'","task_result":"麋鹿任务完成","page_name":"圣诞小屋页面","activity_name":"双旦活动-麋鹿任务页面","page_type":"'+goldHouseStation+'"}');
                _czc.push(['_trackEvent', '双旦活动-麋鹿任务页面', '圣诞小屋页面'+goldHouseStation, taskName+"完成", '', '']);
            }else{
                if(goldHouseIsOpen == "1"){goldHouseStation = "黄金小屋未开启";}else if(goldHouseIsOpen == "2"){goldHouseStation = "黄金小屋已开启";}else{goldHouseStation = "黄金小屋已关闭";}
                sentLog("task_finished",'{"task_type":"'+taskName+'","task_result":"麋鹿任务失败","page_name":"圣诞小屋页面","activity_name":"双旦活动-麋鹿任务页面","page_type":"'+goldHouseStation+'"}');
                _czc.push(['_trackEvent', '双旦活动-麋鹿任务页面', '圣诞小屋页面'+goldHouseStation, taskName+"失败", '', '']);
            }

        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
            if(goldHouseIsOpen == "1"){goldHouseStation = "黄金小屋未开启";}else if(goldHouseIsOpen == "2"){goldHouseStation = "黄金小屋已开启";}else{goldHouseStation = "黄金小屋已关闭";}
            sentLog("task_finished",'{"task_type":"'+taskName+'","task_result":"麋鹿任务失败","page_name":"圣诞小屋页面","activity_name":"双旦活动-麋鹿任务页面","page_type":"'+goldHouseStation+'"}');
            _czc.push(['_trackEvent', '双旦活动-麋鹿任务页面', '圣诞小屋页面'+goldHouseStation, taskName+"失败", '', '']);
        }
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
//		yuanbotest 测试用激活id: "16706858"
//		_activityId = "16706858";
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
			hasLogin(needQQ);　　
		}
	});
}

function hasLogin(needQQ) {
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
			initActivityInfo();
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
					initActivityInfo();
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
			"userKeyId":_activityId,//todo tmp yuanbotest
			"id": _xMasNewYearActivityId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") { //服务器返回正常
				getMyTasksList();
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
			"userKeyId":_activityId,//todo tmp yuanbotest
			"id": _xMasNewYearActivityId
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
	if(data.video != undefined) {//观看视频
		$(".coocaa_btn_taskcenter").eq(2).attr("id", "adsTaskId");		
		$(".taskIconClass").eq(2).css("background-image", "url(images/taskcenter/icontaskwatch.png)");		
	}
	if(data.login != undefined) {//登录任务
		$(".coocaa_btn_taskcenter").eq(2).attr("id", "loginTaskId");	
		$(".taskIconClass").eq(2).css("background-image", "url(images/taskcenter/icontasklogin.png)");		
	}
	$(".coocaa_btn_taskcenter").eq(3).attr("id", "payTaskId");		
	$(".taskIconClass").eq(3).css("background-image", "url(images/taskcenter/icontaskbuy.png)");		
	$(".coocaa_btn_taskcenter").eq(4).attr("id", "weixinHelpTaskId");		
	$(".taskIconClass").eq(4).css("background-image", "url(images/taskcenter/icontaskwechat.png)");

	//触发按键
	map = new coocaakeymap($(".coocaa_btn_taskcenter"), $(".coocaa_btn_taskcenter").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
	$(".coocaa_btn_taskcenter").unbind("itemClick").bind("itemClick", function() {
		_Lindex = $(".coocaa_btn_taskcenter").index($(this));
		console.log("itemClick _Lindex = " + _Lindex);
		processKey($(this));
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
			//todo 需要修改为正确跳转方式
			console.log("跳转到活动主页面");
			var url = _mainHomeUrl;
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
		});
	}
}

//获取url中的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

//数据采集 - 各按钮点击
function webBtnClickLog(button_name, button_type) {
	var _dateObj = {
		"page_name":"我的礼物",
		"activity_name": "双旦活动-我的礼物",
		"button_name": button_name,
		"button_type": button_type
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	_czc.push(["_trackEvent","双旦活动-我的礼物",button_name,button_type,"",""]);
	coocaaosapi.notifyJSLogInfo("main_reward_page_button_click", _dataString, function(message) {
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


