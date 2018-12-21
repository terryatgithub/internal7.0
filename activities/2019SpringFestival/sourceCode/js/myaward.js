//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
//var _xMasNewYearActivityId = 89;//87;//89;
//var _goldHouseActivityId = 90;//88;//90;
//var _buyActiveId = 91;//返利红包活动id
//var _urlActivityServer = "http://beta.restful.lottery.coocaatv.com/light";//主活动接口
//var _entityAwardurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//实物二维码领取接口
//var _lotteryUrl = "http://beta.restful.lottery.coocaatv.com";//抽奖接口(生成微信红包、优惠券二维码用)：
//var _goldHouseUrl = "http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=gold";//黄金小屋（活动主页面url)
//var _packlistUrl = "http://beta.webapp.skysrt.com/lxw/sd/index.html?pagename=pack";//打包清单url
//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
var _xMasNewYearActivityId = 97;
var _goldHouseActivityId = 99;
var _buyActiveId = 98;
var _urlActivityServer = "https://restful.skysrt.com/light";//主活动接口
var _entityAwardurl = "https://webapp.skysrt.com/christmas18/address/index.html?";//实物二维码领取接口
var _lotteryUrl = "https://restful.skysrt.com";//抽奖接口(生成微信红包、优惠券二维码用)：
var _goldHouseUrl = "https://webapp.skysrt.com/christmas18/main/index.html?pagename=gold";//黄金小屋（活动主页面url)
var _packlistUrl = "https://webapp.skysrt.com/christmas18/main/index.html?pagename=pack";//打包清单url
//-----------------------------正式上线需配置参数 end---------------------------------//

//全局参数
var _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId="" ;
var _access_token="", _openId="", _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;
var _appversion, accountVersion, _deviceInfo;
var _qsource, needQQ=false; //视频源

//url传进来的参数：
var _bActivityEnd = false; //活动是否结束，默认进行中。
var _bAwardToast = false; //是否显示”奖励弹窗“，默认不需要；
var _bCallHome = false; //默认不启动主页； 如果是从主页进我的礼物页面，再去主页时，不需要启动主页，直接把“我的礼物”页面退掉就行； 从福利节进我的礼物页面，再去主页时，需要启动主页；

//
var _Lindex = 0;//主页当前焦点
var _toastTimeoutId=null;//弹窗自动清除计时器id
var _bAfterLoginAutoTriggerCollectGift = false;//奖励弹窗：用户未登录时，点击使用红包按钮，当用户登录回来后，自动触发“使用红包”的按钮，进入弹窗的下一个页面；
var _bUserLoginSuccess = false; //跳出登录页面时，用户是否登录成功；

//-----------------------------------动态插入的页面元素 start--------------------------//
//更新我的礼品信息到页面:
var koiItem = ' <!--列表项-->  						\
	<div class="sectionItemClass coocaa_btn" >   	\
		<!--未获得焦点时-->								\
		<div class="sectionItemNormalClass"></div>	\
		<!--获得焦点时-->								\
		<div class="sectionItemFocusClass"></div>	\
		<!--按钮-->									\
		<div class="sectionItemButtonClass"></div>	\
	</div> ';
	
var couponItem = '									\
	<!--列表项-->										\
	<div class="sectionItemClass coocaa_btn">		\
		<!--只有一张图片，焦点靠css实现-->					\
		<div class="sectionItemNormalClass"></div>	\
		<!--角标-->									\
		<div class="sectionItemSupClass">			\
			<div id="sectionItemSupMultiplierId"></div>	\
			<div id="sectionItemSupMultiplyId">x</div>	\
		</div>											\
		<!--按钮-->										\
		<div class="sectionItemButtonClass"></div>		\
		<!--获得焦点时-帽子-->								\
		<div class="sectionItemFocusHatClass"></div>	\
	</div>';
var redbagUncollectedItem = '												\
		<!--列表项-未领取的红包-->												 \
		<div   class="redbagUncollectedClass sectionItemClass coocaa_btn">	 \
			<!--红包图片-->													\
			<div class="sectionItemNormalClass"></div>						 \
			<!--红包类型-->													 \
			<div class="sectionItemTitleClass"></div>						 \
			<!--红包金额-->													 \
			<div class="sectionItemDetailsClass">共计 <span ></span> 元 </div>		\
			<!--按钮-->															\
			<div class="sectionItemButtonClass"></div>						\
		</div>';
var redbagCollectedItem = '												\
	<!--列表项-已领取的红包-->												\
	<div id="redbagCollectedId" class="sectionItemClass coocaa_btn">	\
		<!--红包图片-->													\
		<div class="sectionItemNormalClass"></div>						\
		<!--提示文字-->													 \
		<div class="sectionItemSumClass">总计</div>						\
		<!--红包金额-->													\
		<div class="sectionItemDetailsClass"><span></span></div>						\
		<!--提示文字-->													\
		<div class="sectionItemTitleClass">当前已领取</div>					\
	</div>';
var cashUncollectedItem = '												\
	<!--列表项-未领取的大额现金-->												\
	<div class="cashUncollectedClass sectionItemClass coocaa_btn">		\
		<!--未获得焦点时-->													\
		<div class="sectionItemNormalClass"></div>						\
		<!--获得焦点时-->													\
		<div class="sectionItemFocusClass"></div>						\
		<!--现金详细信息-->													\
		<div class="sectionItemDetailsClass">							\
			<div class="sectionItemDetailsValueClass"></div>		\
		</div>															\
		<!--按钮-->														\
		<div class="sectionItemButtonClass"></div>						\
	</div>';
var cashCollectedItem = '												\
	<!--列表项-已领取的大额现金-->												\
	<div class="cashCollectedClass sectionItemClass coocaa_btn">		\
		<!--未获得焦点时-->													\
		<div class="sectionItemNormalClass"></div>						\
		<!--获得焦点时-->													\
		<div class="sectionItemFocusClass"></div>						\
		<!--现金详细信息-->													\
		<div class="sectionItemDetailsClass">							\
			<div>￥</div>												\
			<div class="sectionItemDetailsValueClass"></div>		\
		</div>															\
		<!--按钮-->														\
		<div class="sectionItemButtonClass"></div>						\
	</div>';
var entityItem = '														\
	<!--列表项-->															\
	<div class="sectionItemClass coocaa_btn">							\
		<!--未获得焦点时-->													\
		<div class="sectionItemNormalClass"></div>						\
		<!--获得焦点时-->													\
		<div class="sectionItemFocusClass"></div>						\
		<!--按钮-->														\
		<div class="sectionItemButtonClass"></div>						\
		<!--按钮-->														\
		<div class="entityImgClass"></div>								\
	</div>';
var thirdPartyItem = '												\
	<!--列表项-->														\
	<div class="sectionItemClass coocaa_btn">						\
		<!--未获得焦点时-->												\
		<div class="sectionItemNormalClass"></div>					\
		<!--获得焦点时-帽子-->											\
		<div class="sectionItemFocusHatClass"></div>				\
	</div>';

//--------------------------------- 动态插入的页面元素 end -------------------------


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
//		test_test_test_function();
//		test_test_test_getMyGifts();
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
		console.log("我的礼物-onresume");
		if($("#toastDialogId").css("display") == "block" && $("#thanks_Bg").css("display") == "block") {
			console.log("我的礼物-onresume 111 _bAfterLoginAutoTriggerCollectGift:	"+_bAfterLoginAutoTriggerCollectGift + "_bUserLoginSuccess:"+_bUserLoginSuccess);
			//如果从奖励弹窗返回:
			if(_bAfterLoginAutoTriggerCollectGift == true && _bUserLoginSuccess == true) {
				console.log("我的礼物-onresume 111 222");
				//自动触发按键,进入奖品领取二维码页面(实物/红包)
				$("#thanks_btn1").trigger("itemClick");
			}
		}else {
			console.log("我的礼物-onresume 222");
			getMyGifts();//获取我的礼物	
		}
	},
	onDeviceReady: function() {
		app.receivedEvent("deviceready");
		pageInit();
		app.triggleButton();
	},
	receivedEvent: function(id) {
		console.log(id);
	},
	handleBackButtonDown: function() {
		console.log("handleBackButtonDown in...");
		if($("#koiCollectId").css("display") == "block") {//如果锦鲤领取弹窗在显示,退回到主页
			console.log("handleBackButtonDown in..000.");//debug
			$("#koiCollectId").css("display", "none");
			$("#toastPageId").css("display", "none");
			getMyGifts();//获取我的礼物
		}else if($("#toastDialogId").css("display") == "block" && $("#thanks_Bg").css("display") == "block") {
			//如果从奖励弹窗返回:
			console.log("handleBackButtonDown in..001.");//debug
			$("#toastDialogId").css("display", "none");
			$("#thanks_Bg").css("display", "none");
			getMyGifts();//获取我的礼物
		}else if($("#toastDialogId").css("display") == "block") {//如果 待领取或已领取弹窗在,退出到主页
			console.log("handleBackButtonDown in..002.");//debug
			if(_toastTimeoutId!=null) {
				clearTimeout(_toastTimeoutId);
			}
			console.log("yuanbotest- 4s计时器-手动清楚");
			$("#toastDialogEntityCollectedId").css("display", "none");
			$("#toastDialogEntityUncollectedId").css("display", "none");
			$("#toastDialogRedbagUncollectedId").css("display", "none");
			
			//红包已领取的弹窗,因为有按钮,所以特殊处理:
			if($("#toastDialogRedbagCollectedId").css("display") == "block"	) {
				//map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});				
				$("#toastDialogRedbagCollectedId").css("display", "none");
			}
			
			$("#toastDialogId").css("display", "none");
			getMyGifts();//获取我的礼物
		} else {
			console.log("handleBackButtonDown in..002.");//debug
			navigator.app.exitApp();
		}
	},
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
		$(".coocaa_btn").bind("itemClick", function() {
			var _Index1 = $(".coocaa_btn").index($(this));
			console.log("itemClick _Index1 = " + _Index1);
			processKey($(this));
		});
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("itemFocus _Lindex: "+_Lindex);
			focusShift($(this));
		});
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
	console.log("pageInit total url+param: "+ window.location.search);
	console.log("pageInit params: actEnd:"+getQueryString("actEnd")+",awardToast:"+ getQueryString("awardToast")+",from:"+getQueryString("from"));
	if(/true/i.test(getQueryString("actEnd"))) { //活动是否结束
		_bActivityEnd = true;
	}
	if(/true/i.test(getQueryString("awardToast"))) { //是否显示"奖励弹窗"
		_bAwardToast = true;
	}
	if(/street/i.test(getQueryString("from"))) { //是否需要启动主页
		_bCallHome = true;
	}
}
//页面翻页
function focusShift(el) {
	//获取焦点元素所属section的top值：
	var myScrollTopValue = el.offsetParent().offsetParent().position().top;
	console.log("focusShift myScrollTopValue: "+ myScrollTopValue);
	$("#myGiftsOuterContainer").stop(true, true).animate({
			scrollTop: myScrollTopValue
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
	});
}
//处理按键
function processKey(el) {
	var curId = el.attr("id");
	console.log("processKey curId: "+ curId);
	switch(curId) {
		case "btnGoXmasHouseNoGiftsDuringActivityId":
		case "btnGiftReceiverId":			//微信红包 继续参与 按钮
		if(_bCallHome) {//需要启动主页
			console.log("go to Xmas house....");
			//调用进入圣诞小屋的接口
			coocaaosapi.startNewBrowser4(_goldHouseUrl, function(success){
				console.log("startNewBrowser4 success");
			}, function(err){console.log("startNewBrowser4 error")});
		}
		navigator.app.exitApp();
		return;
	}
	
	console.log("_loginstatus = "+_loginstatus);
	//如果未登录,先弹登录框
	if(_loginstatus == "false") {
		startLogin(needQQ);
		return;
	}
	
	//我的礼物,点击礼品后的弹窗:
	var giftsInfo = {
		lotteryActiveId: el.attr("lotteryActiveId"),
	 	rememberId : el.attr("rememberId"),
		awardId : el.attr("awardId"),
		userKeyId : el.attr("userKeyId"),
		userOpenId : el.attr("userOpenId"),
		awardTypeId : el.attr("awardTypeId"),
		awardName : el.attr("awardName"),
		awardTime : el.attr("awardTime"),
		awardExchangeFlag : el.attr("awardExchangeFlag")	
	}
	console.log("processKey awardTypeId: "+giftsInfo.awardTypeId + " \
				, awardExchangeFlag:"+ giftsInfo.awardExchangeFlag + " \
				,rememberId:"+giftsInfo.rememberId+ "\
				,awardId:"+giftsInfo.awardId);
	//进入弹窗前先unbind所有按键事件:
	initMap();
	switch(giftsInfo.awardTypeId) {
		case "16": //锦鲤
		case "15": //大额现金
		case "2": //实体奖
			giftsInfo.userName = el.attr("userName");
			giftsInfo.userPhone = el.attr("userPhone");
			giftsInfo.address = el.attr("address");
			getEntityAward(giftsInfo);
			break;
		case "5": //优惠券
			console.log("coupon success, go to use page...");
			giftsInfo.business = el.attr("business");
			switch(giftsInfo.business) {
				case "movie":
					webBtnClickLog("使用红包", "影视优惠券");
					console.log("movie business........");
					break;
				case "edu":
					webBtnClickLog("使用红包", "教育优惠券");
					console.log("edu business........");
					break;
				case "tvmall":
					webBtnClickLog("使用红包", "购物优惠券");
					console.log("tvmall business........");
					break;	
			}
			giftsInfo.onclickData = el.attr("onclickData");
			if(giftsInfo.onclickData != null && giftsInfo.onclickData != undefined){
				goToCouponUsePage(JSON.parse(giftsInfo.onclickData));
			}else {
				getCouponAward(giftsInfo, true);//如果未领取,先领取后使用
			}
			break;
		case "7": //微信红包
			giftsInfo.bonus = el.attr("bonus");
			showRedbagItem(giftsInfo);
			break;
		case "4": //第三方优惠券
			getThirdPartyAward(giftsInfo);
			break;
	}
}
//进入弹窗前先unbind所有按键事件:
function initMap() {
	console.log("delete all bind ......");
	//需要删除焦点移动:
	map = new coocaakeymap($(".coocaa_btn"), null, null, function() {}, function(val) {}, function(obj) {});
	//只是删除绑定的事件处理
	$(".coocaa_btn").unbind();
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
			"cOpenId": _openId
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

//获取第三方优惠券
//之前做法是:获取的图片就是二维码,本地保存一张第三方优惠券的图片,确认下
function getThirdPartyAward(giftsInfo) {
	//todo 在实物待领取toast上微调 是后台直接返回二维码图片还是? 
	document.getElementById("imgIdEntityReceiverQr").innerHTML = "";
	var str = _entityAwardurl + "activeId=" + giftsInfo.lotteryActiveId + "&rememberId=" + giftsInfo.rememberId + "&userKeyId=" + giftsInfo.userKeyId;
	var qrcode = new QRCode(document.getElementById("imgIdEntityReceiverQr"), {
		width: 195,
		height: 195
	});
	qrcode.makeCode(str);
	
	$("#toastDialogEntityUncollectedId").css("display", "block");
	$("#toastDialogId").css("display", "block");
}
//弹窗自动消失函数:
function toastAutoClear(){
		console.log("yuanbotest- 4s计时器到");
		$("#toastDialogEntityCollectedId").css("display", "none");
		$("#toastDialogId").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(_Lindex), "btn-focus", function() {}, function(val) {}, function(obj) {});
		app.registerKeyHandler();
		$(".coocaa_btn").eq(_Lindex).trigger("itemFocus");
		getMyGifts();//获取我的礼物
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

function hasLogin(needQQ,num) {
	console.log("in hasLogin needQQ:"+needQQ+"num:"+num);
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			} else {
				_tencentWay = "qq";
			}
			_access_token = "";
			var _awardToast = getQueryString("awardToast");
			console.log("初次加载页面,判断是否需要初始化 _awardToast:"+_awardToast);
			if(num==0 && _awardToast){
				initActivityInfos();
			}else {
				//未登录时也获取我的礼物信息:
				if(num != 2) {
				getMyGifts();
				}
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
					//登录后获取我的礼物信息:
					var _awardToast = getQueryString("awardToast");
					console.log("初次加载页面,判断是否需要初始化 _awardToast:"+_awardToast);
					if(num==0 && _awardToast){
						initActivityInfos();
					}else {
						//已登录时也获取我的礼物信息:
						if(num != 2) {
						getMyGifts();
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
			hasLogin(needQQ,0);　　
		}
	});
}

//页面首次加载的弹窗逻辑
function showInitDialog(dataObj) {
	console.log("showInitDialog in.. " + JSON.stringify(dataObj));
//	yuanbotest
//	dataObj.chanceResult.chanceSource = [1,2,3,1];
	var len = dataObj.chanceResult.chanceSource.length;
 	if(len>0){
		$("#toastDialogId").css("display", "block");
		$("#thanks_Bg").css("display", "block");
		
		var lastChanceSource = dataObj.chanceResult.chanceSource[len-1];
		console.log(lastChanceSource);
		dataObj = dataObj.chanceResult;//为代码简练
		if(lastChanceSource>0&&lastChanceSource<4){
			if(lastChanceSource == 1||lastChanceSource == 2){ //1. 采购 2. 麋鹿
				$("#thanks_btn2 .btnName").html("返回");
				$("#thanks_btn2").css("left", "990px");
				$("#thanks_btn2").css("width", "147px");
				$("#thanks_btn2 .imgBlur").attr("src", "images/myaward/red_blur.png");
				$("#thanks_btn2 .imgFocus").attr("src", "images/myaward/red_focus.png");
				if(lastChanceSource == 1){
					$("#thanks_info1").html("感谢你帮圣诞爷爷采购礼物");
					$("#thanks_giftsBox").css("background-image", "url(images/myaward/couponbell5.png)" )
				}else{
					$("#thanks_info1").html("感谢你带麋鹿玩耍");
				}
				$("#thanks_btn2").attr("clicktype",0);
			}else if(lastChanceSource == 3){ //3. 打包
				$("#thanks_info1").html("感谢你帮圣诞爷爷打包礼物");
				$("#thanks_btn2 .btnName").html("查看打包清单");
				$("#thanks_btn2").css("left", "945px");
				$("#thanks_btn2").css("width", "210px");
				$("#thanks_btn2 .imgBlur").attr("src", "images/myaward/checkpacklist_blur.png");
				$("#thanks_btn2 .imgFocus").attr("src", "images/myaward/checkpacklist_focus.png");
				$("#thanks_btn2").attr("clicktype",1);
			}
			var _awardtype = dataObj.rememberModel.awardTypeId;
			$("#thanks_btn1").attr("activeId",dataObj.rememberModel.lotteryActiveId);
			$("#thanks_btn1").attr("userKeyId",dataObj.rememberModel.userKeyId);
			$("#thanks_btn1").attr("awardId",dataObj.rememberModel.awardId);
			$("#thanks_btn1").attr("rememberId",dataObj.rememberModel.lotteryRememberId);
			$("#thanks_btn1").attr("awardTypeId",_awardtype);	
			if(_awardtype == 2) {//实物
				$("#thanks_btn1").attr("awardName",dataObj.rememberModel.awardName);
				$("#thanks_btn1 .btnName").html("收下红包");
				$("#thanks_info3").css("display","none");
				//更新弹窗图片
				$("#thanks_entity").css("display","block");
				$("#thanks_entityImg").attr("src", dataObj.rememberModel.awardUrl);
				$("#enAwardBox").html(dataObj.rememberModel.awardName);
			} else if(_awardtype == 5) {//优惠券
				$("#thanks_btn1 .btnName").html("使用红包");
				$("#thanks_info3").css("display","block");
				$("#thanks_info3").html("*特价购买打包商品特权已生效，限时福利快去看看");
				//更新弹窗图片
				$("#thanks_coupon").css("display","block");
				$("#thanks_couponImg").attr("src", dataObj.rememberModel.awardUrl);
			} else if(_awardtype == 7) {//微信红包
				$("#thanks_btn1 .btnName").html("收下红包");
				$("#thanks_btn1").attr("bonus",dataObj.rememberModel.awardInfo.bonus);
				$("#thanks_info3").css("display","block");
				$("#thanks_info3").html('*目前累计获得红包<span style="color:#fff642">'+dataObj.rememberModel.awardInfo.bonus+'</span>元');
				//更新弹窗图片
				$("#thanks_red").css("display","block");
				//$("#thanks_redImg").attr("src", dataObj.rememberModel.awardUrl);
				
				if(dataObj.rememberModel.mergeAwardInfo == "" || dataObj.rememberModel.mergeAwardInfo == null) {
					$("#redAwardInfo").html(dataObj.rememberModel.awardInfo.bonus + "元");
				} else {
					$("#redAwardInfo").html(dataObj.rememberModel.mergeAwardInfo.bonus+"元");
				}
			}
		}
	 
	 	if(len > 1) {
			console.log("弹多个奖励领取的奖励页");
			$("#thanks_info1").html("感谢你带麋鹿玩耍");
			$("#thanks_btn2 .btnName").html("返回");
			$("#thanks_btn2").css("left", "990px");
			$("#thanks_btn2").css("width", "147px");
			$("#thanks_btn2 .imgBlur").attr("src", "images/myaward/red_blur.png");
			$("#thanks_btn2 .imgFocus").attr("src", "images/myaward/red_focus.png");
			$("#thanks_info3").html('*还有更多任务奖励都已放入<span style="color:#fff642">[我的礼物]</span>，请前往查看');
		}
	 	
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("thanks_btn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		//按键响应处理
		regitserKeyEventsForThanksToast();
	} else {
		console.log("不弹窗");
		getMyGifts();//不弹窗时获取我的礼物 
	}
}
function regitserKeyEventsForThanksToast() {
	console.log("---in regitserKeyEventsForThanksToast-----");
	$(".coocaa_btn2").bind("itemClick", function() {
		var el = $(this);
		var id = el.attr("id");
		console.log("cur el id: "+ el.attr("id"));
		if(id == "thanks_btn1") {
			//如果未登录,先弹登录框
			if(_loginstatus == "false") {
				_bAfterLoginAutoTriggerCollectGift = true;
				startLogin(needQQ);
				return;
			}
			var awardTypeId = el.attr("awardTypeId");
			switch(awardTypeId) {
				case "2": //实物
					$("#thanks_giftsBox").css("display", "none");
					map = new coocaakeymap($(".coocaa_btn2"), null, null, function() {}, function(val) {}, function(obj) {});
					$(".coocaa_btn2").unbind();
					$("#thanks_btn1").css("display", "none");
					$("#thanks_btn2").css("display", "none");
					$("#thanks_giftCollectId").css("display", "block");
					
					//二维码
					document.getElementById("thanks_giftCollectId").innerHTML = "";
					var lotteryActiveId = $("#thanks_btn1").attr("activeId");
					var lotteryRememberId = $("#thanks_btn1").attr("rememberId");
					var userKeyId = $("#thanks_btn1").attr("userKeyId");
					var str = _entityAwardurl + "activeId=" + lotteryActiveId + "&rememberId=" + lotteryRememberId + "&userKeyId=" + userKeyId;
					var qrcode = new QRCode(document.getElementById("thanks_giftCollectId"), {
						width: 190,
						height: 190
					});
					qrcode.makeCode(str);
					//提示信息:
					var name = $("#thanks_btn1").attr("awardName");
					$("#thanks_info1").html('获得<span style="color:#fff642">'+name+'</span>');
					$("#thanks_info2").html("微信扫码 领取奖励");
					$("#thanks_info3").css("display","block");
					$("#thanks_info3").css("color", "#FFFFFF");
					$("#thanks_info3").css("top", "740px");
					$("#thanks_info3").html('*红包已放入<span style="color:#fff642">[我的礼物]</span>,可前往查看');
					break;
				case "5": //优惠券
				//直接跳去使用页面,并消灭当前弹窗
					$("#toastDialogId").css("display", "none");
					$("#thanks_Bg").css("display", "none");
					if(_loginstatus != "false") {//如果用户已经登录,自动领取所有优惠券
						console.log("auto collect coupon.............");
						var giftsAttributes = {
							"lotteryActiveId":$("#thanks_btn1").attr("activeId")
						   ,"awardId":$("#thanks_btn1").attr("awardId")
						   ,"rememberId":$("#thanks_btn1").attr("rememberId")
						   ,"awardTypeId":$("#thanks_btn1").attr("awardTypeId")
						   ,"userKeyId":$("#thanks_btn1").attr("userKeyId")
						}
						getCouponAward(giftsAttributes, true);
					}
					break;
				case "7": //红包
					$("#thanks_giftsBox").css("display", "none");
					map = new coocaakeymap($(".coocaa_btn2"), null, null, function() {}, function(val) {}, function(obj) {});
					$(".coocaa_btn2").unbind();
					$("#thanks_btn1").css("display", "none");
					$("#thanks_btn2").css("display", "none");
					$("#thanks_giftCollectId").css("display", "block");
					//二维码
					document.getElementById("thanks_giftCollectId").innerHTML = "";
					var lotteryActiveId = $("#thanks_btn1").attr("activeId");
					var lotteryRememberId = $("#thanks_btn1").attr("rememberId");
					var userKeyId = $("#thanks_btn1").attr("userKeyId");
					var giftsInfo = {
						"lotteryActiveId":lotteryActiveId,
						"rememberId": lotteryRememberId,
						"userKeyId":userKeyId,
						"qrDivId": "thanks_giftCollectId",
						"width":190,
						"height":190
					}
					getRedbagAward(giftsInfo);
					//提示信息:
					var bonus = el.attr("bonus");
					$("#thanks_info1").html("目前累计获得红包"+bonus+"元");
					$("#thanks_info2").html("微信扫码累计提现~");
					$("#thanks_info3").css("display","block");
					$("#thanks_info3").css("color", "#FFFFFF");
					$("#thanks_info3").css("top", "740px");
					$("#thanks_info3").html('*红包已放入<span style="color:#fff642">[我的礼物]</span>,可前往查看');
				break;
			}
		}else if(id == "thanks_btn2") {
			var clickType = $("#thanks_btn2").attr("clicktype");
			if(clickType == 0) {//返回到我的礼物页面,焦点和按键(消灭当前弹窗即可)
				$("#toastDialogId").css("display", "none");
				$("#thanks_Bg").css("display", "none");
				getMyGifts();//退出弹窗时再获取我的礼物 
			}else if(clickType == 1){//跳转到打包清单页面,当前页面不消灭
				console.log("go to pack list....");
				coocaaosapi.startNewBrowser4(_packlistUrl, function(success){
					console.log("startNewBrowser4 success");
				}, function(err){console.log("startNewBrowser4 error")});
			}
		}
	});
}

//监听账户变化
function listenUserChange() {
	coocaaosapi.addUserChanggedListener(function(message) {
		//如果检测到用户登录后,奖励弹窗还在,就只获取登录信息,不更新我的礼物页面(保障焦点等保持不变)
		//否则,自动更新:
		if($("#toastDialogId").css("display") == "block" && $("#thanks_Bg").css("display") == "block") {
			//如果从奖励弹窗返回:
			_bUserLoginSuccess = true;
			hasLogin(needQQ,2);
		}else {
			hasLogin(needQQ,1);
		}
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
function test_test_test_function() {
	_macAddress = "001a9a000000";
	_TVchip = "9S52";
	_TVmodel = "Q4A";
	_emmcCID = "1101003030384737300017c1438f6400";
	_activityId = "16706858";
	_access_token = "2.378b41b74eb048f795637b0d7d0d9aa6";
	_openId = "1266ec9cd2b811e8a09700505687790a";
	_nickName = "原博";
			
	initActivityInfos();
}
function test_test_test_getMyGifts() {
	console.log("test_test_test_getMyGifts in: " + _xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);
	var param = {
			//公共参数-start-
			"MAC": "001a9a000000",
			"cChip": "9S52",
			"cModel": "Q4A",
			"cEmmcCID": "1101003030384737300017c1438f6400",
			"cUDID": "3978822",//"16706858",
			"accessToken": "2.378b41b74eb048f795637b0d7d0d9aa6",
			"cOpenId": "1266ec9cd2b811e8a09700505687790a",
			"cNickName": "原博",
			//公共参数-end-
			"id": _xMasNewYearActivityId
	};
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: _urlActivityServer + "/xmas/u-award",
		data: param,
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
		error: function(err) {
			console.log(JSON.stringify(err));
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
		}
	});	
}