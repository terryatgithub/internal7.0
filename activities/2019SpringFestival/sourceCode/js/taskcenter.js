//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
var _xMasNewYearActivityId = 89;//87;//89;
var _goldHouseActivityId = 90;//88;//90;
var _buyActiveId = 91;//返利红包活动id
var _urlActivityServer = "http://beta.restful.lottery.coocaatv.com/light";//主活动接口
var _entityAwardurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//实物二维码领取接口
var _lotteryUrl = "http://beta.restful.lottery.coocaatv.com";//抽奖接口(生成微信红包、优惠券二维码用)：
var _goldHouseUrl = "http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=gold";//黄金小屋（活动主页面url)
var _packlistUrl = "http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=pack";//打包清单url

//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
//var _xMasNewYearActivityId = 97;
//var _goldHouseActivityId = 99;
//var _buyActiveId = 98;
//var _urlActivityServer = "https://restful.skysrt.com/light";//主活动接口
//var _entityAwardurl = "https://webapp.skysrt.com/christmas18/address/index.html?";//实物二维码领取接口
//var _lotteryUrl = "https://restful.skysrt.com";//抽奖接口(生成微信红包、优惠券二维码用)：
//var _goldHouseUrl = "https://webapp.skysrt.com/christmas18/main/index.html?pagename=gold";//黄金小屋（活动主页面url)
//var _packlistUrl = "https://webapp.skysrt.com/christmas18/main/index.html?pagename=pack";//打包清单url
//-----------------------------正式上线需配置参数 end---------------------------------//

//全局参数
var _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId="" ;
var _access_token="", _openId="", _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;
var _appversion, accountVersion, _deviceInfo;
var _qsource, needQQ=false; //视频源

var _blessingMarketOpen = false;

//url传进来的参数：
var _bActivityEnd = false; //活动是否结束，默认进行中。
var _bAwardToast = false; //是否显示”奖励弹窗“，默认不需要；
var _bCallHome = false; //默认不启动主页； 如果是从主页进我的礼物页面，再去主页时，不需要启动主页，直接把“我的礼物”页面退掉就行； 从福利节进我的礼物页面，再去主页时，需要启动主页；

//
var _Lindex = 0;//主页当前焦点
var _toastTimeoutId=null;//弹窗自动清除计时器id
var _bAfterLoginAutoTriggerCollectGift = false;//奖励弹窗：用户未登录时，点击使用红包按钮，当用户登录回来后，自动触发“使用红包”的按钮，进入弹窗的下一个页面；
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
		righturl: _packlistUrl
	}
	,{
		title: "阿欧，回答错误！",
		leftKey: "了解创维",
		lefturl: _goldHouseUrl,
		rightKey: "试试其它任务",
		righturl: _packlistUrl
	}
]
//任务完成时的提示：
var _tipsWhenClickTaskHasDone = [
	{
		title: "今日任务已完成啦~ <br/> 实施其它任务吧",
		btnName: "好的"
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
//todo：去掉subtask
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
		//yuanbotest PC debug start
		pageInit();
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
		if($(".coocaa_btn").eq(_Lindex).attr("id") == "loginTaskId" &&  _bUserLoginSuccess == true) {
			console.log("onresume-用户登录成功");
			 $(".coocaa_btn:eq("+_Lindex+") .taskBtnClass").css("background-image", 'url(http://beta.webapp.skysrt.com/yuanbo/test/materials/btnC.png)');
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
			
			map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if($("#interlucationPageId").css("display") == "block") { //从互动问答页面返回
			$("#interlucationPageId").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if($(".moreGoodsPageClass").css("display") == "block") { //从更多商品页面返回
			$(".moreGoodsPageClass").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			navigator.app.exitApp();
		}
	},
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
		$(".coocaa_btn").unbind("itemClick").bind("itemClick", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("itemClick _Lindex = " + _Lindex);
			processKey($(this));
		});
		$(".coocaa_btn").unbind("itemFocus").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("itemFocus _Lindex: "+_Lindex);
		});
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		_appversion = accountVersion;
		getDeviceInfo();
		pageInit();
		listenUserChange();
	}
};

app.initialize();

function pageInit() {
	console.log("pageInit in...");
	//todo 根据后台获取数据，给任务赋予不同id：
	$(".taskItemClass").eq(0).attr("id", "interlucationTaskId");
	$(".taskItemClass").eq(1).attr("id", "browserTaskId");
	//登录、视频任务根据后台确认：
	$(".taskItemClass").eq(2).attr("id", "loginTaskId");
//	$(".taskItemClass").eq(2).attr("id", "adsTaskId");
	$(".taskItemClass").eq(3).attr("id", "payTaskId");
	$(".taskItemClass").eq(4).attr("id", "weixinHelpTaskId");
	
	$(".taskIconClass").eq(0).css("background-image", "url(images/taskcenter/icontaskinterlucation.png)");
	$(".taskIconClass").eq(1).css("background-image", "url(images/taskcenter/icontaskbrowser.png)");
	//登录、视频任务根据后台确认：
	$(".taskIconClass").eq(2).css("background-image", "url(images/taskcenter/icontasklogin.png)");
//	$(".taskIconClass").eq(2).css("background-image", "url(images/taskcenter/icontaskwatch.png)");
	$(".taskIconClass").eq(3).css("background-image", "url(images/taskcenter/icontaskbuy.png)");
	$(".taskIconClass").eq(4).css("background-image", "url(images/taskcenter/icontaskwechat.png)");
	
	$(".taskBtnClass").eq(0).css("background-image", "url(images/taskcenter/btndoing.png)");
	$(".taskBtnClass").eq(1).css("background-image", "url(images/taskcenter/btndone.png)");
	//登录、视频任务根据后台确认：
	$(".taskBtnClass").eq(2).css("background-image", "url(images/taskcenter/btndotask.png)");
//	$(".taskBtnClass").eq(2).css("background-image", "url(images/taskcenter/btndotask.png)");
	$(".taskBtnClass").eq(3).css("background-image", "url(images/taskcenter/btnoncemore.png)");
	$(".taskBtnClass").eq(4).css("background-image", "url(images/taskcenter/btndoing.png)");


	$(".taskItemClass").attr("status", false);
	//触发按键
	map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
	app.registerKeyHandler();	
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
	var len = $(".taskItemClass").length;
	var i = 0;
	// 0:当前任务完成，有其它未完成任务；
	// 1：所有任务都完成，福卡集市未开启
	// 2：所有任务都完成，福卡集市已开启
	// 顺序与_tipsWhenClickTaskHasDone[]一致
	var taskStatus = 0; 
	for(;i<len;i++) {
		if($(".taskItemClass").eq(i).attr("status") == "false") {
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
			var url = _packlistUrl;
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
			
			navigator.app.exitApp();
		}else if(taskStatus == 2){
			//todo 跳到福卡集市
			//当前页面要关闭吗？
			console.log("跳到福卡集市");
			var url = _packlistUrl;
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
			var url = _packlistUrl;
			coocaaosapi.startNewBrowser(url, function(success){
				console.log("startNewBrowser success");
			}, function(err){console.log("startNewBrowser error")});
			break;		
	}
}
function showGoodDetailsPage() {
	//todo 跳转产品包 
	var url = _packlistUrl;
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
		$(".packGoodsItemPic").eq(i).css("background-image", "url('"+imgbase+(i+1)+").jpg')");
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
//todo:最终定下里后优化流程
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
            addChance(missionlist[randomNum].subTask);
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
        var external = {"taskId":taskId,"id":actionId,"userKeyId":userKeyId, "countDownTime":missionlist[randomNum].countDownTime, "verify_key":new Date().getTime()}
        var doubleEggs_Active = {"doubleEggs_Active":external};
        str.push(doubleEggs_Active);
        str = JSON.stringify(str);
        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
    }
    function addChance(taskType) {
        var taskName = "跳转任务";
        if(taskType == "1"){
            taskName == "视频任务";
        }
        console.log("id==="+actionId+"======userKeyId===="+userKeyId+"===chanceSource===2====subTask===0====openid===="+cOpenId);
        $.ajax({
            type: "post",
            async: true,
            url: adressIp+"/light/xmas/add-chance",
            data: {id:actionId,userKeyId:userKeyId,chanceSource:2,subTask:0,cOpenId:cOpenId},
            dataType: "json",
            success: function(data) {
                console.log("------------addChance----result-------------"+JSON.stringify(data));
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
}
//---------------------------------------------2019春节活动需要函数 end -----------------------------------------------
 
 
 
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

//获取活动开始时间等信息
function initActivityInfos() {
	console.log(_xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/xmas/init",
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
			"goldActiveId": _goldHouseActivityId,
			"initSource": "3",
			"buyActiveId": _buyActiveId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == 50100) {
				console.log("该活动进行中+获取数据成功");
				showInitDialog(data.data); 
			}else {
				if(data.code == 50001) {
					console.log("该活动不存在");
				} else if(data.code == 50002) {
					console.log("该活动未开始");
				} else if(data.code == 50003) {
					console.log("该活动已结束");
				} else if(data.code == 50042) {
					console.log("该活动已下架");
				}  
				getMyGifts();//不显示弹窗时获取我的礼物 
			}
		},
		error: function() {
			console.log("获取失败");
			getMyGifts();//不显示弹窗时获取我的礼物 
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
		}
	});	
}

//获取我的礼物信息
function getMyGifts() {
	console.log("getMyGifts in: " + _xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/xmas/u-award",
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
			"id": _xMasNewYearActivityId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") { //服务器返回正常
				if(data.data!=null) { //如果有礼物
					updateGiftsInfoToPage(data.data);
				}else { //如果没有礼物
					console.log("没有礼物: 活动是否结束 _bActivityEnd:"+_bActivityEnd);
					if(_bActivityEnd == true) { //如果活动已结束
						$("#toastPageId").css("display","block");
						$(".noGiftsAfterActivityEndClass").css("display","block");
					}else { //如果在活动期间,有跳转按钮
						$("#toastPageId").css("display","block");
						$(".noGiftsDuringActivityClass").css("display","block");
						map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
						app.registerKeyHandler();
					}
				}
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
										
//更新我的礼物信息到页面上,每次更新前需要先复位所有元素,否则会叠加在一起							
function updateGiftsInfoToPage(data) {
	//再次添加元素前,先移除所有被添加元素,清理现场
	$(".sectionItemClass").remove();
	
	var len = data.length;
	console.log("updateGiftsInfoOnPage len:"+len);
	var itemName, listId, containerName; //页面元素变量
	var awardTypeId;	//服务器返回数据变量
	var totalBonus = 0;//红包总额
	var totalBonusCollected = 0; //红包已领取总额
	var bRedbagCollectedItemAdded = false;//默认对应后台一条数据,需要添加一个与之对应的页面元素块; 例外是已领取红包,因为后台无法合并,所以页面需要只显示一处.
	//存储不同优惠券的数组,相同优惠券在对应位+1;
	var couponAwardIdArr = [], couponAwardNumArr = [];
	var index=0;
	for(var i = 0; i < len; i++) {
		//给页面元素增加的属性(公共部分):
		var giftsAttributes = {	
				"lotteryActiveId": data[i].lotteryActiveId
				,"rememberId":data[i].lotteryRememberId
			   	,"awardId": data[i].awardId
			   	,"userKeyId": data[i].userKeyId
			   	,"userOpenId":data[i].userOpenId
			   	,"awardTypeId":data[i].awardTypeId
			   	,"awardExchangeFlag":data[i].awardExchangeFlag
			   	,"awardName":data[i].awardName
			   	,"awardTime":data[i].awardTime
		};		
		awardTypeId = data[i].awardTypeId;
		console.log("awardTypeId: "+awardTypeId);
		switch(awardTypeId) {
			case "16": //锦鲤
				itemName = koiItem;
				listId = "koiList";
				containerName = "koiContainer";
				//专属属性:
				if(data[i].addressEntity != null) {
					var addressEntity = (data[i].addressEntity);
					giftsAttributes.userName = addressEntity.userName;
					giftsAttributes.userPhone = addressEntity.userPhone;
					giftsAttributes.address = addressEntity.province+addressEntity.city+addressEntity.area+addressEntity.address;
				}
				break;
			case "5": //优惠券
				itemName = couponItem;
				listId = "couponList";
				containerName = "couponContainer";
				//yuanbotest:不自动领取,避免后台服务器状态异常和压力
//				if(_loginstatus != "false") {//如果用户已经登录,自动领取所有优惠券
//					console.log("auto collect coupon.............");
//					getCouponAward(giftsAttributes, false);//页面初始化时只领取,不使用
//				}
				//专属属性:
				if(data[i].awardInfo != null && data[i].awardInfo!=undefined) {
					var awardInfo = (data[i].awardInfo);
					giftsAttributes.business = awardInfo.business;
					//已领取了就保存已领取的优惠券使用信息:(未领取的当点击时领取使用)
					if(awardInfo.onclickData != null && awardInfo.onclickData != undefined) {
						giftsAttributes.onclickData = awardInfo.onclickData; 
					}
				}
				//同一种优惠券需要叠加显示: id有几张,需要根据awardTypeId和优惠券id积累计算.
				for(index=0; index < couponAwardIdArr.length; index++){
					if(couponAwardIdArr[index] == data[i].awardId) {
						couponAwardNumArr[index]++;
						break;
					}
				}
				if(index == couponAwardIdArr.length) {
					couponAwardIdArr[index] = data[i].awardId;
					couponAwardNumArr[index] = 1;
				}else {
					continue;//已经有同类型优惠券了,不再新增页面元素;
				}
				break;
			case "7": //微信红包
				//专属属性:
				if(data[i].awardInfo != null) {
					listId = "redbagCashList";
					containerName = "redbagCashContainer";
					
					var awardInfo = (data[i].awardInfo);
					giftsAttributes.bonus = awardInfo.bonus;
					totalBonus = totalBonus + (giftsAttributes.bonus*100);
					
					if(data[i].awardExchangeFlag == 1) { 
						itemName = redbagCollectedItem;
						totalBonusCollected = totalBonusCollected + (giftsAttributes.bonus*100);
					}else {
						itemName = redbagUncollectedItem;
					}
				}
			break;
			case "15": //大额现金
				if(data[i].awardExchangeFlag == 1) { 
					itemName = cashCollectedItem;
				}else {
					itemName = cashUncollectedItem;
				}
				listId = "redbagCashList";
				containerName = "redbagCashContainer";
				//专属属性:
				if(data[i].awardInfo != null) {
					var awardInfo = (data[i].awardInfo);
					giftsAttributes.bonus = awardInfo.bonus;
					totalBonus = totalBonus + (giftsAttributes.bonus*100);
				}
				break;
			case "2": //实体奖
				itemName = entityItem;
				listId = "entityListId";
				containerName = "entityContainerId";
				//专属属性:
				if(data[i].addressEntity != null) {
					var addressEntity = (data[i].addressEntity);
					giftsAttributes.userName = addressEntity.userName;
					giftsAttributes.userPhone = addressEntity.userPhone;
					giftsAttributes.address = addressEntity.province+addressEntity.city+addressEntity.area+addressEntity.address;
				}
				break;
			case "4": //第三方优惠券
				itemName = thirdPartyItem;
				listId = "thirdPartyListId";
				containerName = "thirdPartyContainerId";
				break;
		}
		console.log("listId: "+listId + " containerName" + containerName);
		
		//yuanbotest -start - 
		//"红包已领取"第一次添加,后续不再添加;只累计对应已领取金额
		if(awardTypeId != "7" || data[i].awardExchangeFlag != 1 || bRedbagCollectedItemAdded==false) {
			//页面增加新元素:
			$("#"+listId).append(itemName);
			$("#" + listId +" .sectionItemClass:last-of-type").attr(giftsAttributes);	
		
			//红包已领取添加后set flag,后续不再添加;
			if(awardTypeId == "7" && data[i].awardExchangeFlag == 1 && bRedbagCollectedItemAdded==false) {
				bRedbagCollectedItemAdded = true;
			}
		} 
		//yuanbotest - end -
		
		//每种礼物需要单独处理的地方:
		//微信红包上的金额显示:
		if(awardTypeId == "7" && data[i].awardExchangeFlag == 0) {//未领取红包
			var redbagClass = "红包";
			switch(data[i].lotteryActiveId) {
				case _xMasNewYearActivityId: 
					redbagClass = "任务红包";
					break;
				case _goldHouseActivityId: 
					redbagClass = "抽奖红包";
					break;
				case _buyActiveId: 
					redbagClass = "返利红包";
					break;	
			}
			$("#"+listId+" .sectionItemClass:last-of-type .sectionItemTitleClass").text(redbagClass);
			$("#"+listId+" .sectionItemClass:last-of-type .sectionItemDetailsClass span").text(giftsAttributes.bonus);
		}	
		//锦鲤更新按钮(已领取)
		if(awardTypeId == "16") {
			if(data[i].awardExchangeFlag == 1) { 
				$("#"+listId+" .sectionItemClass:last-of-type .sectionItemButtonClass").css("background-image", "url(images/myaward/KoiBtnCollected.png)");
			}
		}
		//同一种优惠券id有几张,需要根据awardTypeId和优惠券id积累计算.
		if(awardTypeId == "5") {
			$("#couponList .sectionItemClass:last-of-type .sectionItemNormalClass").css("background-image", "url("+ data[i].awardUrl +")");
		}
	
		//大额现金的金额显示:
		if(awardTypeId == "15") {
			$("#"+listId+" .sectionItemClass:last-of-type .sectionItemDetailsClass .sectionItemDetailsValueClass").text(giftsAttributes.bonus);
		}
		//实物奖显示图片
		if(awardTypeId == "2") {
			$("#"+listId+" .sectionItemClass:last-of-type .entityImgClass").css("background-image", "url("+ data[i].awardUrl +")");
			if(data[i].awardExchangeFlag == 1) { 
				$("#"+listId+" .sectionItemClass:last-of-type .sectionItemButtonClass").css("background-image", "url(images/myaward/entityBtnCollected.png)");
			}
		}
		//显示对应容器 (不用每次都设置,可优化)
		$("#"+containerName).css("display", "block");
	}
	//显示主页面
	//红包总金额更新:
	if($("#redbagCashContainer").css("display") == "block") {
		console.log("final totalBonus:" + totalBonus + " totalBonusCollected:"+totalBonusCollected + "...");
		$("#redbagCashTotalId span").text(totalBonus/100);
		if(bRedbagCollectedItemAdded == true) {//如果有已领取元素,更新金额
			$("#redbagCollectedId .sectionItemDetailsClass span").text(totalBonusCollected/100);
			$("#redbagCollectedId").attr("bonus", totalBonusCollected/100);
		}
	}
	//优惠券叠加数更新:
	if($("#couponList").css("display") == "block") {
		for(index=0; index < couponAwardNumArr.length; index++){
			$("#couponList .sectionItemClass:eq("+index+") #sectionItemSupMultiplierId").text(couponAwardNumArr[index]);
		}
	}
	
	$(".myGiftsPageClass").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
	app.registerKeyHandler();
	$(".coocaa_btn").eq(_Lindex).trigger("itemFocus");
}

//优惠券 领取接口
//bUse:领取后是否使用; 默认不适用; true:使用
function getCouponAward(giftsInfo, bUse) {
	console.log("getCouponAward awardExchangeFlag:"+ giftsInfo.awardExchangeFlag + "\
				--" + giftsInfo.lotteryActiveId + "--" + giftsInfo.awardId + "\
				--" + giftsInfo.rememberId + "--" + giftsInfo.awardTypeId + "--" + giftsInfo.userKeyId  + "--");
	console.log(_macAddress+"--"+_openId);
	var ajaxTimeoutThree = $.ajax({
		type: "GET",
		async: true,
		timeout: 10000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _lotteryUrl + "/v3/lottery/verify/receive",
		data: {
			"activeId": giftsInfo.lotteryActiveId,
			"awardId": giftsInfo.awardId,
			"rememberId": giftsInfo.rememberId,
			"awardTypeId": giftsInfo.awardTypeId,
			"userKeyId": giftsInfo.userKeyId,
			"MAC": _macAddress,
			"cOpenId": _openId,
			"source" : _qsource
//			"thirdUserId":_qqtoken //卡密用
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				console.log("coupon success, go to use page...");
				//领取成功,直接跳转至使用页面:
				if(bUse) {//领取后使用
					var data_a = data.data.couponInfo.onclickData;
					data_a = JSON.parse(data_a);
					goToCouponUsePage(data_a);
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
}
//打开优惠券使用页面
function goToCouponUsePage(data_a) {
	var packageName = data_a.packageName;
	var byvalue = data_a.byvalue;
	var bywhat = data_a.bywhat;
	var obj = data_a.param;
	var sources = new Array();
	for(var key in obj) {
		var px = {};
		px[key] = obj[key];
		sources.push(px);
	}
	sources = JSON.stringify(sources);
	coocaaosapi.startParamAction2(bywhat, byvalue, sources, function(message) {}, function(error) {console.log(error);});	
}
//实体奖、锦鲤奖和大额红包: 显示领取二维码
function getEntityAward(giftsInfo) {
	//数据采集:
	var button_name="", button_type="";
	if(giftsInfo.awardExchangeFlag == 1) {
		button_name = "已领取";
	}else {
		button_name = "待领取";
	}
	switch(giftsInfo.awardTypeId) {
		case "16": //锦鲤
		button_type = "锦鲤礼包";
		break;
		case "15": //大额现金
		button_type = "大额现金红包";
		break;
		case "2": //实体奖
		button_type = "实物奖励";
		break;
	}
	webBtnClickLog(button_name, button_type);
	
	if(giftsInfo.awardExchangeFlag == 1) { //已领取
		//奖品信息及领取人信息:
		$("#toastDialogEntityCollectedId .giftTitleClass span").text(giftsInfo.awardName);	
		$("#toastDialogEntityCollectedId .giftTimeClass span").text(giftsInfo.awardTime);
		$("#toastDialogEntityCollectedId .giftReceiverNameClass span").text(giftsInfo.userName);
		$("#toastDialogEntityCollectedId .giftReceiverTelClass span").text(giftsInfo.userPhone);
		$("#toastDialogEntityCollectedId .giftReceiverAddrClass span").text(giftsInfo.address);
		
		$("#toastDialogEntityCollectedId").css("display", "block");
		$("#toastDialogId").css("display", "block");
		//4s后弹窗自动消失:
		 _toastTimeoutId = setTimeout("toastAutoClear()", 4000);
	}else { //未领取
		if(giftsInfo.awardTypeId == "16") { //锦鲤未领取
			document.getElementById("imgIdkoiCollectQr").innerHTML = "";
			var str = _entityAwardurl + "activeId=" + giftsInfo.lotteryActiveId + "&rememberId=" + giftsInfo.rememberId + "&userKeyId=" + giftsInfo.userKeyId;
			var qrcode = new QRCode(document.getElementById("imgIdkoiCollectQr"), {
				width: 395,
				height: 395
			});
			qrcode.makeCode(str);
			
			$("#koiCollectId").css("display", "block");
			$("#toastPageId").css("display", "block");
		}else {
			document.getElementById("imgIdEntityReceiverQr").innerHTML = "";
			var str = _entityAwardurl + "activeId=" + giftsInfo.lotteryActiveId + "&rememberId=" + giftsInfo.rememberId + "&userKeyId=" + giftsInfo.userKeyId;
			var qrcode = new QRCode(document.getElementById("imgIdEntityReceiverQr"), {
				width: 195,
				height: 195
			});
			qrcode.makeCode(str);
			//奖品信息及领取人信息:
			$("#toastDialogEntityUncollectedId .giftTitleClass span").text(giftsInfo.awardName);	
			$("#toastDialogEntityUncollectedId .giftTimeClass span").text(giftsInfo.awardTime);
			
			$("#toastDialogEntityUncollectedId").css("display", "block");
			$("#toastDialogId").css("display", "block");
		}
	}
}
function showRedbagItem(giftsInfo) {
	if(giftsInfo.awardExchangeFlag == 1) { //已领取
		webBtnClickLog("已领取", "现金红包");
		//todo 具体信息再显示
		//奖品信息及领取人信息:
		$("#toastDialogRedbagCollectedId .giftTitleClass span").text(giftsInfo.bonus);	
		$("#toastDialogRedbagCollectedId .giftTimeClass span").text(giftsInfo.awardTime);
		
		$("#toastDialogRedbagCollectedId").css("display", "block");
		$("#toastDialogId").css("display", "block");
		
		//焦点在"继续参与"上:
		map = new coocaakeymap($(".coocaa_btn_Continue"), $(".coocaa_btn_Continue").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
		//绑定按钮事件:
		$(".coocaa_btn_Continue").bind("itemClick", function() {
			var _Index1 = $(".coocaa_btn_Continue").index($(this));
			console.log("itemClick coocaa_btn_Continue _Index1 = " + _Index1);
			processKey($(this));
		});
	}else { //未领取
		webBtnClickLog("待领取", "现金红包");
		giftsInfo.qrDivId = "imgIdRedbagReceiveQr"
		giftsInfo.width = 195;
		giftsInfo.height = 195;
		getRedbagAward(giftsInfo);
		//奖品信息及领取人信息:
		$("#toastDialogRedbagUncollectedId .giftTitleClass span").text(giftsInfo.bonus);	
		$("#toastDialogRedbagUncollectedId").css("display", "block");
		$("#toastDialogId").css("display", "block");
	}	
}

//获取微信红包 显示微信二维码
function getRedbagAward(giftsInfo) {
	var ajaxTimeoutOne = $.ajax({
		type: "GET",
		async: true,
		timeout: 10000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _lotteryUrl + "/v3/lottery/verify/wechat/qrCode",
		data: {
			"MAC": _macAddress,
			"cChip": _TVchip,
			"cModel": _TVmodel,
			"cEmmcCID": _emmcCID,
			"cUDID": _activityId,
			"accessToken": _access_token,
			"cOpenId": _openId,
			"cNickName": _nickName,
			
			"activeId": giftsInfo.lotteryActiveId,
			"rememberId": giftsInfo.rememberId,
			"userKeyId": giftsInfo.userKeyId,
			
			"luckyDrawCode": "newYear",
			"type": 23,
		},
		success: function(data) {
			console.log("getRedbagAward success:" + JSON.stringify(data));
			if(data.code == "200") {
				document.getElementById(giftsInfo.qrDivId).innerHTML = "";
				var url = data.data;
				var qrcode = new QRCode(document.getElementById(giftsInfo.qrDivId), {
					width: giftsInfo.width,
					height: giftsInfo.height
				});
				qrcode.makeCode(url);
			} else {
				console.log('getRedbagAward fail..');
			}
		},
		error: function() {
			console.log('获取我的奖品失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("----------getRedbagAward---complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}　　
		}
	});	
}

//获取url中的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
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
 
function getTvSource(smac, schip, smodel, semmcid, sudid, sFMode, sTcVersion, sSize, sAppVersion, sSdk, sBrand) {
	console.log(smac + "--" + sudid+ "--" + sAppVersion + "--" + sSdk);
	var ajaxTimeout = $.ajax({
		type: "POST",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/active/tv/source",
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
			console.log(JSON.stringify(data));
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

//监听账户变化
function listenUserChange() {
	coocaaosapi.addUserChanggedListener(function(message) {
		console.log("用户登录成功.");
		_bUserLoginSuccess = true;
	});
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
 