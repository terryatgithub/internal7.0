var _Lindex= 0;

//保存图标对应的详细信息
var _levelInfos = new Array();
var _userLevel = 1;
_levelInfos = [
	 {
	 	level:1, 
	 	levelName:"等级礼包", 
	 	picNormal: "../img/lv1.png", 
	 	picBig: "../img/lv1big.png",
	 	picDisabled: "../img/lv1disabled.png",
	 	levelCondition:"Lv.1 (含) 以上可解锁", 
	 	levelDes:"不同等级会员尊享不同的福利特权，当您的等级提升时，还会赠送您不同级别的升级礼包，等级越高能尊享的权益越多、价值越高，赶快提升等级享受更多福利吧~"
	 }
	,{
		level:1, 
	 	picNormal: "../img/lv12.png", 
	 	picBig: "../img/lv12big.png",
	 	picDisabled: "../img/lv12disabled.png",
		levelName:"线上活动", 
		levelCondition:"Lv.1 (含) 以上可解锁", 
		levelDes:"参与专属等级线上活动，精彩好礼等您来拿，还有好玩有趣的游戏等您参与。"
	}
	,{
		level:3,
	 	picNormal: "../img/lv3.png", 
	 	picBig: "../img/lv3big.png",
	 	picDisabled: "../img/lv3disabled.png",
		levelName:"线下活动", 
		levelCondition:"Lv.3 (含)以上可解锁", 
		levelDes:"用户根据等级可参与不同的线下福利活动，如粉丝见面会、大咖线下活动等，让您与明星零距离接触。"
	}
	,{
		level:5,
	 	picNormal: "../img/lv5.png", 
	 	picBig: "../img/lv5big.png",
	 	picDisabled: "../img/lv5disabled.png",
		levelName:"专属客服", 
		levelCondition:"Lv.5 (含) 以上可解锁", 
		levelDes:"有问题随时随地找客服，等待时间短，尊享贵宾服务，客服小伙伴优先解决您的困扰服务热线：拨打专线400-168-8880."
	}
	,{
		level:6,
	 	picNormal: "../img/lv6.png", 
	 	picBig: "../img/lv6big.png",
	 	picDisabled: "../img/lv6disabled.png",
		levelName:"专属主题", 
		levelCondition:"Lv.6 (含) 以上可解锁", 
		levelDes:"会员出品，必属精品。丰富多样的系统主题，专享主题服务，让您与众不同。"
	}
	,{
		level:7, 
	 	picNormal: "../img/lv7.png", 
	 	picBig: "../img/lv7big.png",
	 	picDisabled: "../img/lv7disabled.png",
		levelName:"定制屏保", 
		levelCondition:"Lv.7 (含) 以上可解锁", 
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
    	showLevelDetails();
    	//test zone -start
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

		//初始落焦
        var initPhoneMap = function(obj) {
			map = new coocaakeymap($(".coocaa_btn"), obj, "btn-focus", function() {}, function(val) {}, function(obj) {});
			console.log("----------initPhoneMap End---------");
		}
		var firstFocus = document.getElementsByClassName("coocaa_btn")[0];
		initPhoneMap(firstFocus);
		_Lindex = 0;	
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
        
        //注册按键
		$(".coocaa_btn").bind("itemClick", function() {
				_Lindex = $(".coocaa_btn").index($(this));
				console.log("itemClick _Lindex = " + _Lindex);
		});
		
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("----------focus-----"+_Lindex);
			showLevelDetails();
		});
	},
	
    pageInit: function() {
    	console.log("in pageInit.");
    	parseLevelFromUrl();
    	drawContainerZone();
    	console.log("out pageInit.");
    },
    
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
	}
    
};

app.initialize();

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
			console.log("_xxxxxxxxx:  "+_levelInfos[i].picDisabled);
//			pic = app.rel_html_imgpath(__uri(_levelInfos[i].picDisabled));
			// pic = _levelInfos[i].picDisabled;
			$(".levelIcon").eq(i).css("background-image", "url("+pic+")");
			continue;
		}
		test = "../img/lv5_898762a.png";
		console.log("_xxxxxxxxx:  "+(test)+"type:"+typeof test);
		var test = '../img/lv5.png';
		console.log("_xxxxxxxxx:  "+__uri(test));
		
		pic = app.rel_html_imgpath(__uri(test));
		// pic = _levelInfos[i].picNormal;
		$(".levelIcon").eq(i).css("background-image", "url("+pic+")");
	}
}

//焦点移动时，显示焦点对应的等级信息
function showLevelDetails() {
	console.log("showLevelDetails in...");
	$(".sideLevelGiftTitle").text(_levelInfos[_Lindex].levelName);
	$(".sideLevelGiftConditionsDetails").text(_levelInfos[_Lindex].levelCondition);
	$(".sideLevelPrivilegeDetails").text(_levelInfos[_Lindex].levelDes);
//	var pic = app.rel_html_imgpath(__uri("../img/lv5.png"));
	// var pic = _levelInfos[_Lindex].picBig;
//	$(".sideLevelIconShowClass").css("background-image", "url("+pic+")");
	//闪光特效
	$(".flash").stop(true,true).animate({left: "100%"}, "slow", function() {
		$(".flash").css("left", "-200px");
	});
}

//等级参数level的解析,根据level灰掉没开通的权限
function parseLevelFromUrl() {
	console.log("search param: "+location.search);
	var levelLocation = location.search.substr(1).search(/level=/i);
	console.log("levelLocation:   "+levelLocation);
	if(levelLocation != -1) {
		var lv = location.search.substr(1).substr("level=".length,1);
		lv = parseInt(lv);
		console.log("lv:"+lv +" type:"+typeof lv);

		if(isNaN(lv) || lv < 0 || lv > 7) {
			console.log("use default lv1");
			lv = 1;
		}
		_userLevel = lv;
	}else {
		console.log("search param error, levelLocation:	"+ levelLocation+"use default lv1.");
	}
}
