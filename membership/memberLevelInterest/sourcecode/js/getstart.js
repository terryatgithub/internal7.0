var _Lindex= 0;

//预加载数组用：
var _picNormal=0;
var _picDisabled = 1;
var _picFocus = 2;
var _picFocusDisabled=3;
var _picBig=4;
var _preLoadImageArray;

//保存图标对应的详细信息
var _levelInfos = new Array();
var _userLevel = 1;
_levelInfos = [
	 {
	 	level:1, 
	 	levelName:"等级礼包", 
	 	picNormal: __uri("../img/lv1.png"), 
	 	picDisabled: __uri("../img/lv1disabled.png"),
	 	picFocus: __uri("../img/lv1focus.png"),
	 	picFocusDisabled:__uri("../img/lv1focusdisabled.png"),
	 	picBig: __uri("../img/lv1big.png"),
	 	levelCondition:"Lv1 (含) 以上可解锁", 
	 	levelDes:"不同等级会员尊享不同的福利特权，当您的等级提升时，还会赠送您不同级别的升级礼包，等级越高能尊享的权益越多、价值越高，赶快提升等级享受更多福利吧~"
	 }
	,{
		level:1, 
	 	picNormal: __uri("../img/lv12.png"), 
	 	picDisabled: __uri("../img/lv12disabled.png"),
	 	picFocus: __uri("../img/lv12focus.png"),
	 	picFocusDisabled:__uri("../img/lv12focusdisabled.png"),
	 	picBig: __uri("../img/lv12big.png"),
		levelName:"专属活动", 
		levelCondition:"Lv1 (含) 以上可解锁", 
		levelDes:"参与专属等级线上活动，精彩好礼等您来拿，还有好玩有趣的游戏等您参与。"
	}
	,{
		level:3,
	 	picNormal: __uri("../img/lv3.png"), 
	 	picDisabled: __uri("../img/lv3disabled.png"),
	 	picFocus: __uri("../img/lv3focus.png"),
	 	picFocusDisabled:__uri("../img/lv3focusdisabled.png"),
	 	picBig: __uri("../img/lv3big.png"),
		levelName:"线下活动", 
		levelCondition:"Lv3 (含)以上可解锁", 
		levelDes:"用户根据等级可参与不同的线下福利活动，如粉丝见面会、大咖线下活动等，让您与明星零距离接触。"
	}
	,{
		level:5,
	 	picNormal: __uri("../img/lv5.png"), 
	 	picDisabled: __uri("../img/lv5disabled.png"),
	 	picFocus: __uri("../img/lv5focus.png"),
	 	picFocusDisabled:__uri("../img/lv5focusdisabled.png"),
	 	picBig: __uri("../img/lv5big.png"),
		levelName:"专属客服", 
		levelCondition:"Lv5 (含) 以上可解锁", 
		levelDes:"有问题随时随地找客服，等待时间短，尊享贵宾服务，客服小伙伴优先解决您的困扰服务热线：拨打专线400-168-8880."
	}
	,{
		level:6,
	 	picNormal: __uri("../img/lv6.png"), 
	 	picDisabled: __uri("../img/lv6disabled.png"),
	 	picFocus: __uri("../img/lv6focus.png"),
	 	picFocusDisabled:__uri("../img/lv6focusdisabled.png"),
	 	picBig: __uri("../img/lv6big.png"),
		levelName:"专属主题", 
		levelCondition:"Lv6 (含) 以上可解锁", 
		levelDes:"会员出品，必属精品。丰富多样的系统主题，专享主题服务，让您与众不同。"
	}
	,{
		level:7, 
	 	picNormal: __uri("../img/lv7.png"), 
	 	picDisabled: __uri("../img/lv7disabled.png"),
	 	picFocus: __uri("../img/lv7focus.png"),
	 	picFocusDisabled:__uri("../img/lv7focusdisabled.png"),
	 	picBig: __uri("../img/lv7big.png"),
		levelName:"定制屏保", 
		levelCondition:"Lv7 (含) 以上可解锁", 
		levelDes:"免费定制您喜爱的屏保，装扮不再单调，让电视屏保也赏心悦目。"
	}
];

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
    	//test zone for PC-start
//     	map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
// 		app.registerKeyHandler();
    	//test zone -end
    	
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

		//注册事件监听
		app.registerEventHandler();
		//注册按键监听
		app.registerKeyHandler();
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
	},
	
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
		
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("-focus-----"+_Lindex);
			showLevelDetails();
		});
		$(".coocaa_btn").bind("itemBlur", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("-Blur-----"+_Lindex);
			restoreUnfocusState();
		});		
	},
	
    pageInit: function() {
    	console.log("in pageInit.");
//		setTimeout("preLoadImg(_levelInfos)", 100);
		preLoadImg(_levelInfos);
		parseLevelFromUrl();
    	drawContainerZone();
    	showLevelDetails();

		//初始落焦
        var initPhoneMap = function(obj) {
			map = new coocaakeymap($(".coocaa_btn"), obj, "btn-focus", function() {}, function(val) {}, function(obj) {});
			console.log("----------initPhoneMap End---------");
		}
		var firstFocus = document.getElementsByClassName("coocaa_btn")[0];
		initPhoneMap(firstFocus);

		console.log("out pageInit.");
    },
    
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
	}
};

app.initialize();

function preLoadImg(arr) {
	console.log("preLoadImg in...");
	_preLoadImageArray = new Array();
	for(var i=0; i< arr.length ; i++) {
		_preLoadImageArray[i] = new Array(5);
		_preLoadImageArray[i][_picNormal] = new Image();
		_preLoadImageArray[i][_picNormal].src = app.rel_html_imgpath(arr[i].picNormal);
		_preLoadImageArray[i][_picDisabled] = new Image();
		_preLoadImageArray[i][_picDisabled].src = app.rel_html_imgpath(arr[i].picDisabled);
		_preLoadImageArray[i][_picFocus] = new Image();
		_preLoadImageArray[i][_picFocus].src = app.rel_html_imgpath(arr[i].picFocus);
		_preLoadImageArray[i][_picFocusDisabled] = new Image();
		_preLoadImageArray[i][_picFocusDisabled].src = app.rel_html_imgpath(arr[i].picFocusDisabled);
		_preLoadImageArray[i][_picBig] = new Image();
		_preLoadImageArray[i][_picBig].src = app.rel_html_imgpath(arr[i].picBig);
	}
	
	$("body").css("background-image", "url(img/bg.webp)");
	$("#maskPic").css("background-image", "url(img/mask.webp)");

	var pic = app.rel_html_imgpath(__uri("../img/light.png"));
	$("#flash").css("background-image", "url("+pic+")");
	
	
	console.log("preLoadImg out...");
}

//绘制右侧内容区图标
function drawContainerZone() {
	console.log("drawContainerZone in...");
	
	//绘制对应个数的图标
	var len = _levelInfos.length;
	var i = 0;
	for(i=0;i<len-1; i++) {
		$(".contentContainer").append($(".levelIntro:last-of-type").clone(true));
	}
	
	//更新对应图标的icon，及标题
	var pic = "";
	for(i=0;i<len;i++) {
		$(".levelTitle").eq(i).text(_levelInfos[i].levelName);
		//灰掉高于目前等级的所有图标：
		if(_levelInfos[i].level > _userLevel) {
//			pic = app.rel_html_imgpath(_levelInfos[i].picDisabled);
//			$(".levelIcon").eq(i).css("background-image", "url("+pic+")");
			$(".levelIcon").eq(i).css("background-image", "url("+_preLoadImageArray[i][_picDisabled].src+")");
			continue;
		}
//		console.log("_levelInfos[i].picNormal:"+_levelInfos[i].picNormal);
//		pic = app.rel_html_imgpath(_levelInfos[i].picNormal);
//		$(".levelIcon").eq(i).css("background-image", "url("+pic+")");
		$(".levelIcon").eq(i).css("background-image", "url("+_preLoadImageArray[i][_picNormal].src+")");

	}
}

//焦点移走时，恢复之前显示状态：
function restoreUnfocusState()
{
	var pic;
	if(_userLevel >= _levelInfos[_Lindex].level) {
//				pic = app.rel_html_imgpath(_levelInfos[_Lindex].picNormal);	
		pic = _preLoadImageArray[_Lindex][_picNormal].src;
	}else {
//				pic = app.rel_html_imgpath(_levelInfos[_Lindex].picDisabled);
		pic = _preLoadImageArray[_Lindex][_picDisabled].src;
	}
	$(".levelIcon").eq(_Lindex).css("background-image", "url("+pic+")");
	$(".levelTitle").eq(_Lindex).css("font-weight", "normal");
}

//焦点移动时，显示焦点对应的等级信息
function showLevelDetails() {
	console.log("showLevelDetails in...");
	$(".sideLevelGiftTitle").text(_levelInfos[_Lindex].levelName);
	$(".sideLevelGiftConditionsDetails").text(_levelInfos[_Lindex].levelCondition);
	$(".sideLevelPrivilegeDetails").text(_levelInfos[_Lindex].levelDes);
//	var pic = app.rel_html_imgpath(_levelInfos[_Lindex].picBig);
//	// var pic = _levelInfos[_Lindex].picBig;
//	$(".sideLevelIconShowClass").css("background-image", "url("+pic+")");
	$(".sideLevelIconShowClass").css("background-image", "url("+_preLoadImageArray[_Lindex][_picBig].src+")");
	
	var pic;
	//更新获得焦点的图片：
	if(_userLevel >= _levelInfos[_Lindex].level) {
//		pic = app.rel_html_imgpath(_levelInfos[_Lindex].picFocus);
		pic = _preLoadImageArray[_Lindex][_picFocus].src;
	}else {
//		pic = app.rel_html_imgpath(_levelInfos[_Lindex].picFocusDisabled);
		pic = _preLoadImageArray[_Lindex][_picFocusDisabled].src;
	}
	console.log("focus img----: "+pic);
	$(".levelIcon").eq(_Lindex).css("background-image", "url("+pic+")");
	$(".levelTitle").eq(_Lindex).css("font-weight", "bold");
	//闪光特效
//	$("#flash").stop(true,true).animate({left: "100%"}, "slow", function() {
//		$("#flash").css("left", "-200px");
////	});
//	$("#flash").stop(true,true).animate({left: "90%"}, 700, "swing", function() {
//		$("#flash").css("left", "-300px");
//	});
	$("#flash").addClass("showAnimateTwo").on("animationend", function(){
		console.log("addClass() + ani end.");
		$("#flash").removeClass("showAnimateTwo");
	});
	$("#flash").addClass("showAnimateTwo").on("webkitAnimationEnd", function(){
		console.log("flash ani end.");
		$("#flash").removeClass("showAnimateTwo");
	});
}

//等级参数level的解析,根据level灰掉没开通的权限
function parseLevelFromUrl() {
	console.log("search param: "+location.search);
	var levelLocation = location.search.substr(1).search(/level=/i);
	if(levelLocation != -1) {
		var lv = location.search.substr(1).substr("level=".length,1);
		lv = parseInt(lv);
//		console.log("lv:"+lv +" type:"+typeof lv);

		if(isNaN(lv) || lv < 0 || lv > 7) {
			console.log("use default lv1");
			lv = 1;
		}
		_userLevel = lv;
	}else {
		console.log("search param error, levelLocation:	"+ levelLocation+"use default lv1.");
	}
}
