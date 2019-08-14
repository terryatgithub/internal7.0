var _Index1= "";
var _Lindex=0;
var　firstFocus="";
var _bPlayDisrupted = false;
var _accountClientKey="yzpmQHSfK2xnRE1o";
var _udid = "",_mac,_model,_version,_tvName="";
var _accessToken = "";
var _showInTaskCenter = true;//因为电视派ios端app bug,需要次变量;
							//true: 此页面默认显示在'任务中心',这种情况下只能扫描下载并加积分,不支持电视派App扫码连接;
							//false:此页面显示在其它地方,此时支持下载+电视派App扫码连接,但下载不会加积分.

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
        setTimeout("otherPageInit()", 100);
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButton, false);
        document.addEventListener('backbuttondown', this.onBackButtonDown, false);
        document.addEventListener("homebutton", this.homeButtonFunction, false);
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
    homeButtonFunction:function () {
        console.log("-----------按了主页键------------");
      	navigator.app.exitAll();
    },
    onDeviceReady: function() {
        console.log("in onDeviceReady");
		app.receivedEvent('deviceready');
		app.triggleButton();

		//初始落焦
        var initPhoneMap = function(obj) {
			map = new coocaakeymap($(".coocaa_btn"), obj, "btn-focus", function() {}, function(val) {}, function(obj) {});
			console.log("----------initPhoneMap End11--------");
		}
		firstFocus = document.getElementsByClassName("coocaa_btn")[0];
		initPhoneMap(firstFocus);

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
	
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
     
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("---focus:"+_Lindex);
			//$(".coocaa_btn")[_Lindex].style.color = "#cccccc";
			
			switchContent();
		});
	},
	 
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
        getDeviceInfo();
	}
    
};

app.initialize();

function getEncodedParams(){ //生成url后拼接的加密参数
	var param = "activeId="+_udid+
				"&mac="+_mac+
				"&model="+_model+
				"&ver="+_version+
				(!!_tvName ? ("&name="+_tvName) : "");
				
	console.log("param before:"+param);
	param = AESEncrypt(param);
	return param;
}
//生成电视派二维码
function getTVPaiQrcode() {
	console.log("accesstoken:"+_accessToken+",cUid="+_udid);
	var str;
	
	if(getQueryString("inmytask") == "false"){
		console.log("not in task center....")
		_showInTaskCenter = false;
	}
	
	if(_showInTaskCenter){//页面被配置在任务中心
		str = "http://tvpi.coocaa.com/?from=tvpitv";//http
		str = str + "&accessToken="+_accessToken+"&cUid="+_udid; //用户完成任务发送奖励需要的参数		
		console.log("~~complete url:"+str);
		var qrcode = new QRCode(document.getElementById("qrImageId"), {
			width: 186,
			height: 186,
		});
	}else{//页面被配置在其它地方
		$(".qrTip").html("微信等扫码下载电视派<br>电视派扫码连接此电视");
		var encodeParam = getEncodedParams();
		str = "https://tvpi.coocaa.com/?from=tvpitv"; //https
		str = str + "&" + encodeParam; //电视派App扫描连接需要的参数
		console.log("~~complete url:"+str);
		var qrcode = new QRCode(document.getElementById("qrImageId"), {
			width: 186,
			height: 186,
			correctLevel : QRCode.CorrectLevel.M //bugfix: qrcode.js report url code length overflow.
		});
	}
	
	qrcode.makeCode(str);
	$("#qrIcon").css("display", "block");
}

//获取设备信息
function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log(JSON.stringify(message));
		_udid = message.activeid;
		_mac = message.mac;
		_model = message.model;
		_version = message.version;
		_tvName = !!message.tvName ? message.tvName : "";
		
		coocaaosapi.getUserAccessToken(function(message) {
			console.log(JSON.stringify(message));
			_accessToken = message.accesstoken;
			getTVPaiQrcode();
		}, function(error) {
			console.log("获取用户accessToken异常.");
			getTVPaiQrcode();
		});
		
	}, function(error) {
		console.log("获取设备信息出现异常。");
		getTVPaiQrcode();
	});
}

//图片切换过渡效果
function switchContent() {
	var container = $("#container");
	var $window = $(window);
	
	container.css("transform", "translate3D(0, -" + (_Lindex) * $window.height() + "px, 0)");
	container.css({
		"transition": "all 0.5s",
		"-moz-transition": "all 0.5s",
		"-webkit-transition": "all 0.5s"
	});
}

function otherPageInit() {
	var pic1 = app.rel_html_imgpath(__uri("../img/content1.png"));
	var pic2 = app.rel_html_imgpath(__uri("../img/content2.png"));
	var pic3 = app.rel_html_imgpath(__uri("../img/content3.png"));
	var pic4 = app.rel_html_imgpath(__uri("../img/content4.png"));
//	console.log("==="+pic1+' '+pic2);
	$("#section0").css("background-image", "url("+pic1+")");
	$("#section1").css("background-image", "url("+pic2+")");
	$("#section2").css("background-image", "url("+pic3+")");
	$("#section3").css("background-image", "url("+pic4+")");
	
	$("body").css("background-image", "url(img/bg.webp)");
}
//AES
function AESEncrypt(clearData) {
	var key = CryptoJS.enc.Utf8.parse(_accountClientKey);
	var options = {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	}
	
	var encrypted = CryptoJS.AES.encrypt(clearData, key, options);
	console.log('enctypedBase64Str: '+encrypted.toString())
	
	return encrypted;
	
	//电视派后台接口不需要以下部分,直接用base64格式.
	//之前陈希光的会员引导页需要下面这段.
	// 需要读取encryptedData上的ciphertext.toString()才能拿到跟Java一样的密文
//	var encryptedStr = encrypted.ciphertext.toString()
//  console.log('encryptedStr: '+ encryptedStr)
    
//  return encryptedStr;
    
//  // 拿到字符串类型的密文需要先将其用Hex方法parse一下
//  var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr)
//  console.log('encryptedHexStr: '+ encryptedHexStr)
//  // 将密文转为Base64的字符串
//	// 只有Base64类型的字符串密文才能对其进行解密
//  var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
//  console.log('encryptedBase64Str: '+ encryptedBase64Str)
}

//获取url中的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
