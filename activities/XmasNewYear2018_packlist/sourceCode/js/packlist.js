//-----------------------------正式上线需配置参数 start---------------------------------//
//##########						        测试区域						#############//
var _urlGetPacklists = "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList";
//@@@@@@@@@@                           正式区域                                                                @@@@@@@@@@@@@//
//var _urlGetPacklists;
var _moreGoodsIdArrTencent=[5, 57, 13230, 17231, 16992];
var _moreGoodsIdArrIqiyi=[1, 57, 13230, 17231, 16992];
var _moreGoodsNameArr= ["影视VIP年卡", "少儿VIP12个月", "欧慕迷你电烤箱", "山水触摸全钢电陶炉", "先锋电暖器"];
//-----------------------------正式上线需配置参数 end---------------------------------//
//全局参数
var _macAddress, _TVchip, _TVmodel, _emmcCID, _activityId="" ;
var _access_token="", _openId="", _nickName="";
var _qqtoken, _loginstatus=false, _tencentWay, cAppVersion, exterInfo, _vuserid,_login_type;
//url传进来的参数：
var _bActivityEnd = false; //活动是否结束，默认进行中。
var _TVSource = "tencent";//yuanbotest

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

	rel_html_imgpath: function(iconurl) {//修改为只支持二级目录，比如  ../images/packlist/toast-end.png
		return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+\/[^\/]+)$/, '$1'));
	},

	initialize: function() {
		this.bindEvents();
		//PC debug start
//		testtesttesttest();
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
		$(".coocaa_btn_pack").bind("itemClick", function() {
			var _Index1 = $(".coocaa_btn_pack").index($(this));
			console.log("itemClick _Index1 = " + _Index1);
			processKey($(this));
		});
		$(".coocaa_btn_pack").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn_pack").index($(this));
			console.log("itemFocus _Lindex: "+_Lindex);
			focusShift($(this));
		});	
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		pageInit();
	}
};

app.initialize();

function pageInit() {
	otherPageInit();
	if(_bActivityEnd == true) { //活动已结束
		setToastEndDisplay("block");
	}else {//活动进行中
		getDeviceInfo();
	}
}
function otherPageInit(){
	$("body").css("background-image","url(images/packlist/bg.jpg)");
	
	$("#packGoodsTitle").css("background-image","url(images/packlist/title-pack.png)");
	
	$("#moreGoodsTitle").css("background-image","url(images/packlist/title-more.png)");
	
	if(_TVSource == "tencent") {
		$("#moregoodsList .goodsItemPlaceHolderClass:eq(0)").css("background-image","url(images/packlist/goods-more.png)");
	}else {
		$("#moregoodsList .goodsItemPlaceHolderClass:eq(0)").css("background-image","url(images/packlist/goods-moreA.png)");
	}
	$("#moregoodsList .goodsItemPlaceHolderClass:eq(1)").css("background-image","url(images/packlist/goods-more2.png)");
	$("#moregoodsList .goodsItemPlaceHolderClass:eq(2)").css("background-image","url(images/packlist/goods-more3.png)");
	$("#moregoodsList .goodsItemPlaceHolderClass:eq(3)").css("background-image","url(images/packlist/goods-more4.png)");
	$("#moregoodsList .goodsItemPlaceHolderClass:eq(4)").css("background-image","url(images/packlist/goods-more5.png)");
	
	$("#toastEmpty").css("background-image","url(images/packlist/toast-empty.png)");
	
	$("#toastEnd").css("background-image","url(images/packlist/toast-end.png)");
}
//页面翻页
function focusShift(el) {
	var index = $(".coocaa_btn_pack").index(el);
	if(index < 5) { //第一行不往下翻页,有bug： 退出再进来，无法定焦，需要改！
		return;
	}
	//超过一行，往下翻(index/5-1)的高度
	//获取焦点元素所属section的top值：
	var parentId = el.parent().attr("id");
	var itemHeight = 398;//398px 单个item高度是398
	var myScrollTopValue = el.position().top - 398;
	console.log("focusShift myScrollTopValue: " + myScrollTopValue +"parentId:"+parentId);
	if(parentId == "packGoodsList") {
		$("#packGoodsListOuterContainerId").stop(true, true).animate({
			scrollTop: myScrollTopValue
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
		});
	}
}
//处理按键
function processKey(el) {
	var curId = el.attr("id");
	console.log("processKey curId:"+curId);
	
	switch(curId) {
		case "toastEmpty":
			//马上去打包
			console.log("go packing now....");
			break;
		case "toastEnd":
			//跳去我的礼物页面
			console.log("go myGifts now....");
			break;
		default:
			var goodsId = el.attr("goodsid");
			console.log("processKey goodsId:"+goodsId);

			var goodsName = el.attr("goodsName");
			webBtnClickLog(goodsName, "黄金小屋未开启");
			if(curId == "moreGoodsItemMovie" || curId == "moreGoodsItemEdu"){
				var businesstype = el.attr("businesstype");
				coocaaosapi.startMovieMemberCenter(businesstype.toString(), goodsId.toString(), function(msg){
					console.log("startAppShopDetail success.");
				}, function(err){console.log("startAppShopDetail error.");})
			}else {
				//进入商品购买详情页
				coocaaosapi.startAppShopDetail(goodsId.toString(), function(msg){
					console.log("startAppShopDetail success.");
				}, function(err){console.log("startAppShopDetail error.");});
			}
		break;
	}
}
//数据采集 - 打包页面曝光
function webPageShowLog(_bFromStreet, page_type) {
	var _dateObj = {
		"page_name":"打包清单页面",
		"activity_name": "双旦活动-打包任务页面",
		"last_page_name": (_bFromStreet ? "福利街" : "圣诞小屋页面"),
		"page_type": page_type //黄金小屋未开启、黄金小屋已开启、黄金小屋已关闭
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
//	_czc.push(["_trackEvent","双旦活动-打包任务页面",product_name,page_type,"",""]);
	coocaaosapi.notifyJSLogInfo("pack_list_page_show", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}
//数据采集 - 各按钮点击
function webBtnClickLog(product_name, page_type) {
	var _dateObj = {
		"page_name":"打包清单页面",
		"activity_name": "双旦活动-打包任务页面",
		"button_name": "商品推荐位",
		"product_name": product_name, 
		"page_type": page_type //黄金小屋未开启、黄金小屋已开启、黄金小屋已关闭
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
//	_czc.push(["_trackEvent","双旦活动-打包任务页面",product_name,page_type,"",""]);
	coocaaosapi.notifyJSLogInfo("pack_list_wares_click", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
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
	if(data.data == null) { //没有打包商品,显示toast_empty
		setToastEmptyDisplay("block");
		return;
	}
	//每次进来前清除之前加的元素,防止重复显示:
	$("#packGoodsList .goodsItemClass").remove();
	
	var len = 0;	
	len = data.data.length;
	console.log("processPackListsData len:"+len);
//	len = 3;//yuanbotest
	for(var i=0; i<len; i++) {
		var goodsInfo = (data.data[i].goodsInfo);
		console.log("i:"+i+", "+goodsInfo.goodsName+" "+ goodsInfo.promotePrice + " "+goodsInfo.shopPrice+" "+goodsInfo.goodsThumb);
		
		var goodsItem = '<div  class="goodsItemClass coocaa_btn_pack" goodsid=" ' + data.data[i].goodsId + ' " + goodsName=" ' + goodsInfo.goodsName + ' " > \
							<div class="goodsItemPlaceHolderClass"></div>										\
							<div class="packGoodsItemPic"></div>										\
							<div class="packGoodsItemName">' + goodsInfo.goodsName + '</div>\
							<div class="packGoodsItemLabel">\
								<div class="packGoodsItemLabelPriceNow">￥' + goodsInfo.shopPrice + '</div>\
								<div class="packGoodsItemLabelTip">原价：</div>\
								<div class="packGoodsItemLabelPriceOld">￥' + goodsInfo.promotePrice + '</div>\
							</div>\
						</div>';
		$("#packGoodsList").append(goodsItem);
		var thumb = "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/img/p"+data.data[i].goodsId+".png)";
		console.log("thumb url..."+thumb);
		$("#packGoodsList .goodsItemClass:last-of-type .packGoodsItemPic").css("background-image", thumb);
	}
	$("#packGoodsContainer").css("display", "block");
	
	if(len <= 5) { //显示更多商品
		setMoreGoodsContainerDisplay("block");	
	}
	
	map = new coocaakeymap($(".coocaa_btn_pack"), $(".coocaa_btn_pack").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
	app.registerKeyHandler();
	$(".coocaa_btn_pack").eq(0).trigger("itemFocus");	
}

//设置更多商品 moreGoodsContainer display状态
function setMoreGoodsContainerDisplay(display) {
	var list = $("#moreGoodsContainer .goodsItemClass");
	var len = list.length;
	var _moreGoodsIdArr;
	if(_TVSource == "tencent") {
		_moreGoodsIdArr = _moreGoodsIdArrTencent;
	}else {
		_moreGoodsIdArr = _moreGoodsIdArrIqiyi;
	}
	for(var i=0; i<len; i++) {
		list.eq(i).attr("goodsid", _moreGoodsIdArr[i]);
		list.eq(i).attr("goodsName", _moreGoodsNameArr[i]);
		if(i==0) {//影视
			list.eq(i).attr("businesstype", 0);
		}else if(i==1) {//教育
			list.eq(i).attr("businesstype", 1);
		}
	}
	$("#moreGoodsContainer").css("display", display);
}

//设置打包清单为空 toastEmpty display状态
function setToastEmptyDisplay(display) {
	$("#toastEmpty").css("display", display);
	app.registerKeyHandler();
	map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEmpty"), "btn-focus", function() {}, function(val) {}, function(obj) {});
}
//设置活动结束 toastEnd display状态
function setToastEndDisplay(display) {
	$("#toastEnd").css("display", display);
	app.registerKeyHandler();
	map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
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
			
//			test_packGifts("14770");
			//未登录时获取打包信息:
			getPackLists();
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
//					test_packGifts("14770");
					//登录后获取打包信息
					getPackLists();
				}, function(error) {})
			}, function(error) {});
		}
	}, function(error) {});
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}


//测试函数，最后需要关闭或删除
function testtesttesttest() {
		_access_token = "3.570091b5bc284914854a219a22fb4aed";
		_activityId = "35474904";
		_macAddress = "70427f7f186b";
//		test_packGifts("14770");
//		test_packGifts("14801");
//		test_packGifts("14802");
//		test_packGifts("14803");
//		test_packGifts("14804");
//		test_packGifts("14805");
//		test_packGifts("14806");
//		test_packGifts("14807");
//		test_packGifts("14808");
//		test_packGifts("14809");
//		test_packGifts("14810");
//		test_packGifts("14811");
//		test_packGifts("14812");
//		test_packGifts("14813");
//		test_packGifts("14814");
//		test_packGifts("14815");
//		test_packGifts("14816");
//		test_packGifts("14817");
//		test_packGifts("14818");
//		test_packGifts("14819");
//		test_packGifts("14820");
//		setTimeout("getPackLists()", 3000);	
		getPackLists();
}

//test
function test_packGifts(goodsid) {
	 // 打包接口
       var data = JSON.stringify({"goodsId":goodsid,"token":_access_token,"cudid":_activityId+"_"+_macAddress});
       console.log("============="+data);
       $.ajax({
           type: "get",
           async: true,
           url: "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/addCartFromAct",
           data: {param:data},
           dataType: "json",
           success: function(data) {
               console.log("------------addPack----result-------------"+JSON.stringify(data));
               getPackLists();
           },
           error: function(error) {
               console.log("--------访问失败" + JSON.stringify(error));
           }
       });
}
