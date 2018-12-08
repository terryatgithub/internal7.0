//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
var _urlActivityServer = "http://beta.restful.lottery.coocaatv.com//light";
var _xMasNewYearActivityId = 87;
//实物二维码领取接口
var _entityAwardurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//测试接口
//抽奖接口(生成微信红包二维码用)：
var _lotteryUrl = "http://beta.restful.lottery.coocaatv.com";//测试接口
//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
//var _urlActivityServer = "https://restful.skysrt.com/light";
//var _xMasNewYearActivityId = 87;
//实物二维码领取接口
//var _entityAwardurl = "https://webapp.skysrt.com/movie/thanksgiving/address/index.html?";//正式接口
////抽奖接口(生成微信红包二维码用)：
//var _lotteryUrl = "https://restful.skysrt.com";//正式接口
//-----------------------------正式上线需配置参数 end---------------------------------//

//全局参数
var _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId="" ;
var _access_token="", _openId="", _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;
//url传进来的参数：
var _bActivityEnd = false; //活动是否结束，默认进行中。


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
	<!--列表项-未领取的红包-->												\
	<div id="redbagUncollectedId" class="sectionItemClass coocaa_btn">	\
		<!--未获得焦点时-->													\
		<div class="sectionItemNormalClass"></div>						\
		<!--获得焦点时-->													\
		<div class="sectionItemFocusClass"></div>						\
		<!--红包详细信息-->													\
		<div class="sectionItemDetailsClass">							\
			<div class="sectionItemDetailsValueClass">4.5</div>			\
			<div>(总计)</div>												\
		</div>															\
		<!--按钮-->														\
		<div class="sectionItemButtonClass"></div>						\
	</div>';
var redbagCollectedItem = '												\
	<!--列表项-已领取的红包-->												\
	<div id="redbagCollectedId" class="sectionItemClass coocaa_btn">	\
		<!--未获得焦点时-->													\
		<div class="sectionItemNormalClass"></div>						\
		<!--获得焦点时-->													\
		<div class="sectionItemFocusClass"></div>						\
		<!--红包详细信息-->													\
		<div class="sectionItemDetailsClass">							\
			<div>￥</div>												\
			<div class="sectionItemDetailsValueClass">100</div>			\
			<div>(总计)</div>												\
		</div>															\
		<!--按钮-->														\
		<div class="sectionItemButtonClass"></div>						\
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
			<div class="sectionItemDetailsValueClass">1000</div>		\
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
			<div class="sectionItemDetailsValueClass">1000</div>		\
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
		//PC debug start
		test_test_test_getMyGifts();
//      var initPhoneMap = function(obj) {
//			map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
//			console.log("----------initPhoneMap End---------");
//		}
//		firstFocus = document.getElementsByClassName("coocaa_btn")[0];
//		initPhoneMap(firstFocus);
//		app.registerKeyHandler();
		
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
		}else if($("#toastDialogId").css("display") == "block") {//如果 待领取或已领取弹窗在,退出到主页
			console.log("handleBackButtonDown in..001.");//debug
			$("#toastDialogEntityCollectedId").css("display", "none");
			$("#toastDialogEntityUncollectedId").css("display", "none");
			$("#toastDialogRedbagUncollectedId").css("display", "none");
			
			//红包已领取的弹窗,因为有按钮,所以特殊处理:
			if($("#toastDialogRedbagCollectedId").css("display") == "block"	) {
				map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});				
				$("#toastDialogRedbagCollectedId").css("display", "none");
			}
			
			$("#toastDialogId").css("display", "none");
		}else {
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
		getDeviceInfo();
	}
};

app.initialize();

function pageInit() {
	if(/true/i.test(getQueryString("activityEnd"))) { //活动是否结束
		_bActivityEnd = true;
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
			console.log("go to Xmas house....");
			//调用进入圣诞小屋的接口
			
			return;
		case "btnGiftReceiverId":
			//微信红包 继续参与 按钮
			//todo 要跳到哪里?
			console.log("continue to where?....");
			return;
	}
	
	//我的礼物,点击礼品后的弹窗:
	var lotteryActiveId = el.attr("lotteryActiveId");
	var rememberId = el.attr("rememberId");
	var awardId = el.attr("awardId");
	var userKeyId = el.attr("userKeyId");
	var userOpenId = el.attr("userOpenId");
	var awardTypeId = el.attr("awardTypeId");
	
	var	awardExchangeFlag = el.attr("awardExchangeFlag");
	
	console.log("processKey awardTypeId: "+awardTypeId + ", awardExchangeFlag:"+ awardExchangeFlag + ",rememberId:"+rememberId+",awardId:"+awardId);

	switch(awardTypeId) {
		case "16": //锦鲤
		case "15": //大额现金
		case "2": //实体奖
			getEntityAward(awardExchangeFlag, awardTypeId, lotteryActiveId, rememberId, userKeyId);
			break;
		case "5": //优惠券
			getCouponAward(awardExchangeFlag, lotteryActiveId, awardId, rememberId, awardTypeId, userKeyId);
			break;
		case "7": //微信红包
			showRedbagItem(awardExchangeFlag, lotteryActiveId, rememberId, userKeyId);
			break;
		case "4": //第三方优惠券
			getThirdPartyAward(awardExchangeFlag, awardTypeId, lotteryActiveId, rememberId, userKeyId);
			break;
	}
	
}
//获取设备信息并初始化
function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log("getDeviceInfo success:"+JSON.stringify(message));
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
			"id": _xMasNewYearActivityId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") { //活动已开始
//				getPackLists();
			}else if(data.code == "50003") {//活动已结束
//				setToastEndDisplay("block");
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
			"cUDID": _activityId, //测试用激活id: "16706858"
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
								
function updateGiftsInfoToPage(data) {
	var len = data.length;
	console.log("updateGiftsInfoOnPage len:"+len);
	var itemName, listId, containerName; //页面元素变量
	var awardTypeId;	//服务器返回数据变量
	var abc;	//提交给服务器的变量
	for(var i = 0; i < len; i++) {
		awardTypeId = data[i].awardTypeId;
		console.log("awardTypeId: "+awardTypeId);
		switch(awardTypeId) {
			case "16": //锦鲤
				itemName = koiItem;
				listId = "koiList";
				containerName = "koiContainer";
				break;
			case "5": //优惠券
				itemName = couponItem;
				listId = "couponList";
				containerName = "couponContainer";
				break;
			case "7": //微信红包
				if(data[i].awardExchangeFlag == 1) { 
					itemName = redbagCollectedItem;
				}else {
					itemName = redbagUncollectedItem;
				}
				listId = "redbagCashList";
				containerName = "redbagCashContainer";
			break;
			case "15": //大额现金
				if(data[i].awardExchangeFlag == 1) { 
					itemName = cashCollectedItem;
				}else {
					itemName = cashUncollectedItem;
				}
				listId = "redbagCashList";
				containerName = "redbagCashContainer";
				break;
			case "2": //实体奖
				itemName = entityItem;
				listId = "entityListId";
				containerName = "entityContainerId";
				break;
			case "4": //第三方优惠券
				itemName = thirdPartyItem;
				listId = "thirdPartyListId";
				containerName = "thirdPartyContainerId";
				break;
		}
		console.log("listId: "+listId + " containerName" + containerName);
		//添加到页面上
		$("#"+listId).append(itemName);
		$("#" + listId +" .sectionItemClass:last-of-type").attr({
			"lotteryActiveId": data[i].lotteryActiveId
			,"rememberId":data[i].lotteryRememberId
		   	,"awardId": data[i].awardId
		   	,"userKeyId": data[i].userKeyId
		   	,"userOpenId":data[i].userOpenId
		   	,"awardTypeId":data[i].awardTypeId
		   	,"awardExchangeFlag":data[i].awardExchangeFlag
//		   	,"thirdUserId":thirdUserId //第三方id 如果是腾讯源 则必须要第三方qq 的 id
//		   	,"source":source // tencent/iqiyi
		});
		
		//每种礼物需要单独处理的地方:
		//锦鲤更新按钮(已领取)
		if(awardTypeId == 16) {
			if(data[i].awardExchangeFlag == 1) { 
				$("#"+listId+" .sectionItemClass:last-of-type .sectionItemButtonClass").css("background-image", "../images/myaward/KoiBtnCollected.png");
			}
		}
		
		//同一种优惠券id有几张,需要根据awardTypeId和优惠券id积累计算.
		if(awardTypeId == 5) {
			$("#couponList .sectionItemClass:last-of-type #sectionItemSupMultiplierId").text("5");
		}

		//显示对应容器 (不用每次都设置,可优化)
		$("#"+containerName).css("display", "block");
	}
	//显示主页面
	$(".myGiftsPageClass").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
	app.registerKeyHandler();
}

//优惠券 领取接口
function getCouponAward(awardExchangeFlag, activeId, awardId, awardRememberId, awardTypeId, userKeyId) {
	var imgurl;
	console.log("getCouponAward awardExchangeFlag:"+ awardExchangeFlag + activeId + "--" + awardId + "--" + awardRememberId + "--" + awardTypeId + "--" + userKeyId  + "--" + imgurl);
	console.log(_macAddress+"--"+_openId);
	var ajaxTimeoutThree = $.ajax({
		type: "GET",
		async: true,
		timeout: 10000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _lotteryUrl + "/v3/lottery/verify/receive",
		data: {
			"activeId": activeId,
			"awardId": awardId,
			"rememberId": awardRememberId,
			"awardTypeId": awardTypeId,
			"userKeyId": userKeyId,
			"MAC": _macAddress,
			"cOpenId": _openId
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				//领取成功,直接跳转至使用页面:
				console.log("coupon success, go to use page...");
				//todo
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
//获取第三方优惠券
//之前做法是:获取的图片就是二维码,本地保存一张第三方优惠券的图片,确认下
function getThirdPartyAward(awardExchangeFlag, awardTypeId, activeId, rememberId, userKeyId) {
	//todo 在实物待领取toast上微调 是后台直接返回二维码图片还是? 
	document.getElementById("imgIdEntityReceiverQr").innerHTML = "";
	var str = _entityAwardurl + "activeId=" + activeId + "&rememberId=" + rememberId + "&userKeyId=" + userKeyId;
	var qrcode = new QRCode(document.getElementById("imgIdEntityReceiverQr"), {
		width: 195,
		height: 195
	});
	qrcode.makeCode(str);
	
	$("#toastDialogEntityUncollectedId").css("display", "block");
	$("#toastDialogId").css("display", "block");
}
//实体奖、锦鲤奖和大额红包: 显示领取二维码
function getEntityAward(awardExchangeFlag, awardTypeId, activeId, rememberId, userKeyId) {
	//todo 能优化不
	switch(awardTypeId) {
		case "16": //锦鲤
		case "15": //大额现金
		case "2": //实体奖
		break;
	}
	
	if(awardExchangeFlag == 1) { //已领取
		//具体信息再显示

		$("#toastDialogEntityCollectedId").css("display", "block");
		$("#toastDialogId").css("display", "block");
	}else { //未领取
		if(awardTypeId == "16") { //锦鲤未领取
			document.getElementById("imgIdkoiCollectQr").innerHTML = "";
			var str = _entityAwardurl + "activeId=" + activeId + "&rememberId=" + rememberId + "&userKeyId=" + userKeyId;
			var qrcode = new QRCode(document.getElementById("imgIdkoiCollectQr"), {
				width: 395,
				height: 395
			});
			qrcode.makeCode(str);
			
			$("#koiCollectId").css("display", "block");
			$("#toastPageId").css("display", "block");
		}else {
			document.getElementById("imgIdEntityReceiverQr").innerHTML = "";
			var str = _entityAwardurl + "activeId=" + activeId + "&rememberId=" + rememberId + "&userKeyId=" + userKeyId;
			var qrcode = new QRCode(document.getElementById("imgIdEntityReceiverQr"), {
				width: 195,
				height: 195
			});
			qrcode.makeCode(str);
			
			$("#toastDialogEntityUncollectedId").css("display", "block");
			$("#toastDialogId").css("display", "block");
		}
	}
}

function showRedbagItem(awardExchangeFlag, activeId, rememberId, userKeyId) {
	if(awardExchangeFlag == 1) { //已领取
		//todo 具体信息再显示
		
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
		getRedbagAward(awardExchangeFlag, activeId, rememberId, userKeyId);
	}	
}

//获取微信红包 显示微信二维码
function getRedbagAward(awardExchangeFlag, activeId, rememberId, userKeyId) {
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
			
			"activeId": activeId,
			"rememberId": rememberId,
			"userKeyId": userKeyId,
			
			"luckyDrawCode": "newYear",
			"type": 23,
		},
		success: function(data) {
			console.log("getWechatLuckyMoney success:" + JSON.stringify(data));
			if(data.code == "200") {
				document.getElementById("imgIdRedbagReceiveQr").innerHTML = "";
				var url = data.data;
				var qrcode = new QRCode(document.getElementById("imgIdRedbagReceiveQr"), {
					width: 195,
					height: 195
				});
				qrcode.makeCode(url);
				$("#toastDialogRedbagUncollectedId").css("display", "block");
				$("#toastDialogId").css("display", "block");
			} else {
				console.log('getWechatLuckyMoney fail..');
			}
		},
		error: function() {
			console.log('获取我的奖品失败');
			errorToast();
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
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
			//未登录时也获取我的礼物信息:
			getMyGifts();
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
					getMyGifts();
				}, function(error) {})
			}, function(error) {});
		}
		
	}, function(error) {});
}

function startLogin(needQQ) {
    console.log("startLogin in: tencentWay:" + tencentWay);
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
    console.log("startLogin out...");
}


//PC端测试函数
//获取我的礼物信息
function test_test_test_getMyGifts() {
	console.log("test_test_test_getMyGifts in: " + _xMasNewYearActivityId+"--"+_macAddress+"--"+_TVchip+"--"+_TVmodel+"--"+_emmcCID+"--"+_activityId+"--"+_access_token+"--"+_openId+"--"+_nickName);

	_macAddress = "001a9a000000";
	_TVchip = "9S52";
	_TVmodel = "Q4A";
	_emmcCID = "1101003030384737300017c1438f6400";
	_activityId = "16706858";
	_access_token = "2.378b41b74eb048f795637b0d7d0d9aa6";
	_openId = "1266ec9cd2b811e8a09700505687790a";
	_nickName = "原博";
			
	var param = {
			//公共参数-start-
			"MAC": "001a9a000000",
			"cChip": "9S52",
			"cModel": "Q4A",
			"cEmmcCID": "1101003030384737300017c1438f6400",
			"cUDID": "16706858",
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