var _bFromKids = false;//
var _TVSource = "";
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
    	//yuanbotest ---begin
//  		//初始落焦
//      var initPhoneMap = function(obj) {
//			map = new coocaakeymap($(".coocaa_btn"), obj, "btn-focus", function() {}, function(val) {}, function(obj) {});
//			console.log("----------initPhoneMap End---------");
//		}
//		var firstFocus = $("#virtualKey1"); 
//		initPhoneMap(firstFocus);
//		//注册按键监听
//		app.registerKeyHandler();
		//yuanbotest  --end
		
		
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButton, false);
        document.addEventListener('backbuttondown', this.onBackButtonDown, false);
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener('pause', this.onPause, false);
    },
    onBackButton: function() {
        console.log("in onBackButton");
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
		var firstFocus = $("#virtualKey1"); 
		initPhoneMap(firstFocus);
		
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
	
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("-focus-----"+_Lindex);
			scrollPage($(this));
		});
	},
	
    pageInit: function() {
    	console.log("in pageInit.");
    	if(/kids/i.test(getQueryString("from"))) { //是否从少儿版面进入
			console.log("少儿板块---");
			_bFromKids = true;
			
    		$("#deviceready").addClass("kidsPage");
    		$("#bgImage1").attr("src", "img/bgkids_1.png");
    		$("#bgImage2").attr("src", "img/bgkids_2.png");
    		$("#bgImage3").attr("src", "img/bgkids_3.png");
    	}
//		setTimeout("delayLoad()", 100);
    	console.log("out pageInit.");
    },
    
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
        getLocalDeviceInfo();
	}
};

app.initialize();

//延迟加载图片
function delayLoad() {
}
 
//处理用户按键
function processKey(el) {
	console.log("processKey in");
	var id = el.attr("id");
	var sourceid, businesstype;
	var clickType = 0; //默认0， 1为版面入口，2为产品包入口
	switch(id) {
		case "block1": 
			if(_TVSource == "tencent") {
				sourceid = 103177; //腾讯源少儿版面入口
				webBtnClickLog("腾讯源少儿版面入口");
			} else {
				sourceid = 103178;//爱奇艺源少儿版面入口
				webBtnClickLog("爱奇艺源少儿版面入口");
			}
			clickType = 1;
		break;
		case "block2": //教育版面入口
			sourceid = 10738;
			clickType = 1;
			webBtnClickLog("教育版面入口");
		break;
		case "block3":
			if(_TVSource == "tencent"){
				sourceid = 102831; //腾讯源TV课堂版面入口
				webBtnClickLog("腾讯源TV课堂版面入口");
			} else {
				sourceid = 102987;//爱奇艺源TV课堂版面入口
				webBtnClickLog("爱奇艺源TV课堂版面入口");
			}
			clickType = 1;
		break;
		case "button1"://少儿产品包
			sourceid = 57;
			businesstype = 1;
			clickType = 2;
			webBtnClickLog("少儿产品包");
		break;
		case "button2": //教育产品包
			sourceid = 58;
			businesstype = 1;
			clickType = 2;
			webBtnClickLog("教育产品包");
		break;
	}
	console.log("scrollPage in..._TVSource:"+_TVSource+" id:"+id+"  sourceid:"+sourceid + ",businesstype:"+businesstype+" _bFromKids:"+_bFromKids);

	if(clickType == 1) {
		coocaaosapi.startMovieHomeCommonList(""+sourceid, function(success){
			console.log("success: "+JSON.stringify(success));
		}, function(err){console.log("err: "+JSON.stringify(err));});	
	}else if(clickType == 2) {
		coocaaosapi.startMovieMemberCenter(""+sourceid,""+businesstype, function(success){
			console.log("success: "+JSON.stringify(success));
		}, function(err){console.log("err: "+JSON.stringify(err));});
	}

	console.log("processKey out..");	
}

//用户操作上下键时移动页面,包括焦点的切换:(先用虚拟焦点的方式实现上下翻页效果再说)
function scrollPage(el) {
	var id = el.attr("id");
	var y = 0;
	y = parseInt(el.css("top"));
	switch(id) {
		case "block1":
			y = 1080;
		break;
		case "block2":
			y = 1480;
		break;
		case "block3":
			(_bFromKids == true) ? (y=1480) : (y = 1880);
		break;
		case "button1":
		case "button2":
			(_bFromKids == true) ? (y=2080) : (y = 2480);
		break;
	}
	console.log("scrollPage in... id:"+id+"  top:"+y + " _bFromKids:"+_bFromKids);
	 
    $("body").css("transform", "translate3D(0, -" + y + "px, 0)");
        
//  $(".block").unbind("itemBlur").bind("itemBlur",function () {
//      $("#mainbox").css("transform", "translate3D(0, -" + 0 + "px, 0)");
//  })
}

function getLocalDeviceInfo() {
	console.log("getLocalDeviceInfo in...");
		var _mac, _model, _chip, _size, _resolution, _version, _fmodel, _pattern, _appID, _appversion, _appid, _source, _serviceid, _type, _devicebarcode, _time,_accessToken;
		_devicebarcode = "";
		//time
//		var timestamp = Date.parse(new Date());
//		var tmpstring = timestamp.toString();
//		var tmpnum = tmpstring.substr(0, 10);
//		_time = tmpnum;

		//type
		_type = "20";//20 新会员体系--关注绑定酷开账号

		_source = "";
		
		_resolution = "1920*1080"; //同谢金融
		_appversion = cAppVersion;//0;
		_fmodel = "Default";
		_pattern = "normal";
		_appID = 0;
		
		console.log("_appversion="+_appversion);
		
		coocaaosapi.getDeviceInfo(function(message) {
			console.log("getDeviceInfo success:	"+ JSON.stringify(message));
			
			deviceInfo = message;
			_cUDID = message.activeid;
			_model = message.model;
			_chip = message.chip;
			_mac = message.mac;
			_size = message.panel;
			_serviceid = message.activeid;
			cEmmcCID = message.emmcid;
			_version = message.version.replace(/\./g, "");
			_brand = message.brand;
			_sdkVer = message.androidsdk;
			
			if(_serviceid!=null && _serviceid!=undefined && _serviceid!=""){
				webPageShowLog(_serviceid);
			}else {
				webPageShowLog(_mac);
			}
			
			console.log("_version.."+_version);
        	console.log("_cUDID.."+_cUDID);
        	
    		getTvSource(_mac, _model, _chip, _size, _resolution, _version, _fmodel, _pattern, _appID, _appversion, _appid, _source, _serviceid, _type, _devicebarcode, _time,_accessToken);

		}, function(error) {
			console.log(error);
		});
		
		console.log("getLocalDeviceInfo out...");
}

function getTvSource(smac, smodel, schip, ssize, sresolution, sversion, sfmodel, spattern, sappID, sappversion, qappid, qsource, qserviceid, qtype, qdevicebarcode, qtime,qaccessToken) {
	console.log("getTvSource in 获取视频源传的参数---" + "MAC="+smac+"&cModel="+smodel+"&cChip="+schip+"&cSize="+ssize+"&cResolution="+sresolution+"&cTcVersion="+sversion+"&cFMode="+sfmodel+"&cPattern="+spattern+"&vAppID="+sappID+"&vAppVersion="+sappversion);
	var myUrl = "http://movie.tc.skysrt.com/v2/getPolicyByDeviceInfoTypeJsonp";
	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 10000, 
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
			console.log("getTvSource success..."+JSON.stringify(data));
			_TVSource = data.source;
			if(_TVSource == "tencent") {
				console.log("腾讯视频源：" + _TVSource);
			}else{  
				console.log("默认视频源：爱奇艺" + _TVSource);
			}
		},
		error: function(error) {
			console.log("getTvSource error..."+error);
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("getTVSource complete--"+status);
			if(status=='timeout'){
	 　　　　　 		ajaxTimeoutOne.abort();
	　　　　	}
			//注册按键点击监听
			$(".coocaa_btn").bind("itemClick", function() {
				_Lindex = $(".coocaa_btn").index($(this));
				console.log("-click---" + _Lindex);
				processKey($(this));
			});			
	　　	}
	});
	console.log("getTvSource out...");
}

function webBtnClickLog(button_name) {
	var _dateObj = {
		"member_equity_id": button_name 	//按钮ID
		,"member_equity_click_number": "1"     //按钮点击量
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo("member_equity_block_click_number", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

function webPageShowLog(visit_id) {
	var _dateObj = {
		"page_name": "致用户信-web网页" //页面名称
		,"visit_id": visit_id+""		//访问ID
		,"page_view_number": "1"		//页面访问量
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	coocaaosapi.notifyJSLogInfo("activity_web_page_show_number", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

//获取url中的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}