//测试临时配置,正式发布时需要改为正式配置:
//账号信息（等级、金币、成长点数等）服务器地址
var _accountSrvUrl = 'http://172.20.155.202:7171';
var _accountClientId = '9F072A0ABF6E2B3D';
var _accountClientKey = '85bdfb9ef29b4776';
var _accountClientMissionSubmitUrl = '/v4/public/submit-missionEvent';

//获取酷开会员微信公众号二维码的地址
var _relServerUrl = "https://beta-wx.coocaa.com/cors/qrcode/getTmpQrcode";
var _relAppId = "wxee96df3337b09cb5";

//正式配置:
//var _relServerUrl = "https://wx.coocaa.com/cors/qrcode/getTmpQrcode";
//var _relAppId = "wx5a6d3bdcd05fb501";
//账号信息（等级、金币、成长点数等）服务器地址
//var _accountSrvUrl = 'https://member.coocaa.com';
//var _accountClientId = '';
//var _accountClientKey = '';
//var _accountClientMissionSubmitUrl = '/v4/public/submit-missionEvent';

//全局变量
var cAppVersion, accountVersion;
var _accessToken = "";
var _openId = "";
var _activeId = "";
var _mac, _chip, _model, _size, _appversion = "",_tcVersion;

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
//      fake_submitTaskFinished();//yuanbotest only
        this.bindEvents();
    },
    bindEvents: function() {
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
		var firstFocus = $("#virtualKey1"); 
		initPhoneMap(firstFocus);
		
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
		$(".coocaa_btn").bind("itemClick", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("-click-----"+_Lindex);
			processKey();
		});
	},
	
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
        setTimeout("delayLoad()", 100);
        getDeviceInfo();
	}
    
};

app.initialize();

var i = 0;
function processKey() {
	++i;
	console.log('processKey i:'+i);
	switch(i) {
		case 1: 
			$("#pic1").css("display", "none");
			$("#pic2").css("display", "block");
			$("#pic3").css("display", "none");
			$("#pic4").css("display", "none");
			break;
		case 2: 
			$("#pic1").css("display", "none");
			$("#pic2").css("display", "none");
			$("#pic3").css("display", "block");
			$("#pic4").css("display", "none");
			break;
		case 3: 
			$("#pic1").css("display", "none");
			$("#pic2").css("display", "none");
			$("#pic3").css("display", "none");
			$("#pic4").css("display", "block");
			break;
		case 4:
			console.log('return app home')
			navigator.app.exitApp();
			break;
	}
}

function delayLoad(){
	$("#pic2").css("background-image", "url(img/toast.jpg)");
	$("#pic3").css("background-image", "url(img/store.jpg)");
	$("#pic4").css("background-image", "url(img/task.jpg)");
}

function getDeviceInfo() {
		coocaaosapi.getDeviceInfo(function(message) {
			var _message = JSON.stringify(message);
			console.log(_message);

			_model = message.model;
			_chip = message.chip;
			_mac = message.mac;
			_size = message.panel;
			_activeId = message.activeid;
			_tcVersion = message.version.replace(/\./g, "");

			coocaaosapi.hasCoocaaUserLogin(function(message) {
	            if (message.haslogin == "true") {
            		console.log("user login...");
            		coocaaosapi.getUserInfo(function(message) {
						_openId = message.open_id;
					
	            		coocaaosapi.getUserAccessToken(function(message) {
			        		console.log("usertoken " + message.accesstoken);
			        		_accessToken = message.accesstoken;
			        		submitTaskFinished()
//			        		getTvSource();
			        	},function(error) { console.log(error); useDefaultQrcode();});
					}, function(error) {});
	            }else{
	        		console.log("user not login...");
	            	_accessToken = "";
//					getTvSource();
	            }
			},function(error) {
				console.log(error);
				useDefaultQrcode();
			});
		}, function(error) {
			console.log(error);
			useDefaultQrcode();
		});
}
function getTvSource() {
	console.log("获取视频源传的参数---" + "MAC="+smac+"&cModel="+smodel+"&cChip="+schip+"&cSize="+ssize+"&cResolution="+sresolution+"&cTcVersion="+sversion+"&cFMode="+sfmodel+"&cPattern="+spattern+"&vAppID="+sappID+"&vAppVersion="+sappversion);
	var myUrl = "";
	myUrl = "http://movie.tc.skysrt.com/v2/getPolicyByDeviceInfoTypeJsonp";
	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 5000, 
		dataType: 'jsonp',
		jsonp: "callback",
		url: myUrl,
		data: {
			"MAC": _mac,
			"cModel": _model,
			"cChip": _chip,
			"cSize": _size,
			"cResolution": "1920*1080",
			"cTcVersion": _tcVersion,
			"cFMode": "Default",
			"cPattern": "normal",
			"vAppID": _relAppId,
			"vAppVersion": cAppVersion
		},
		success: function(data) {
			console.log("~~~data.source:"+data.source);
			qsource = data.source;
			if(qsource == "yinhe") {
				console.log("视频源：" + qsource);
				console.log("获取二维码传的参数" + "qappid=" + qappid + ";qsource=" + qsource + ";smodel=" + smodel + ";schip=" + schip + ";smac=" + smac + ";qserviceid=" + qserviceid + ";qtype=" + qtype + ";qdevicebarcode=" + qdevicebarcode + ";qtime=" + qtime);
				getQrcodeUrl(qappid, qsource, smodel, schip, smac, qserviceid, qtype, qdevicebarcode, qtime, qaccessToken);
			} else if(qsource == "tencent") {
				console.log("视频源：" + qsource);
				console.log("获取二维码传的参数" + "qappid=" + qappid + ";qsource=" + qsource + ";smodel=" + smodel + ";schip=" + schip + ";smac=" + smac + ";qserviceid=" + qserviceid + ";qtype=" + qtype + ";qdevicebarcode=" + qdevicebarcode + ";qtime=" + qtime);
				getQrcodeUrl(qappid, qsource, smodel, schip, smac, qserviceid, qtype, qdevicebarcode, qtime, qaccessToken);
			} else {//todo: 还需要处理视频源是优朋的情况:
				console.log("视频源既不是爱奇艺又不是腾讯--" + qsource);
				useDefaultQrcode();
//				qsource == "yinhe";
//				document.getElementById("bgImga").style.display = "block";
//				console.log("获取二维码传的参数" + "qappid=" + qappid + ";qsource=" + qsource + ";smodel=" + smodel + ";schip=" + schip + ";smac=" + smac + ";qserviceid=" + qserviceid + ";qtype=" + qtype + ";qdevicebarcode=" + qdevicebarcode + ";qtime=" + qtime);
//				getQrcodeUrl(qappid, qsource, smodel, schip, smac, qserviceid, qtype, qdevicebarcode, qtime, qaccessToken);
			}
		},
		error: function() {
			console.log('获取视频源失败');
			useDefaultQrcode();
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("-------------complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 	ajaxTimeoutOne.abort();
	　　　　	}
	　　	}
	});
}
//调用后台任务事件提交接口
function submitTaskFinished() {
	var data = {
		accessToken: _accessToken,
		openId: _openId,
//		userVipInfo: ,
		currentTimestamp: Date.parse(new Date()),
		taskAttr: 2 ,
		tagName: 'itemTag',
		itemTag: 'GRADE_LEVEL_GIFT',
		memo: '领取会员礼包'	
	}

	data = JSON.stringify(data);
	var encryptedData = AESEncrypt(data);
	var ajaxTmp = $.ajax({
		type: "POST",
		dataType: "json",
		url: _accountSrvUrl+_accountClientMissionSubmitUrl,
		async: true,
		timeout: 10000,
		data: {
			clientId: _accountClientId,
			data: encryptedData
		},
		headers: {
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cUDID":_activeId,
			"cSize": _size,
//			"cPushId": '',//这个是要一些特殊情况才要的，你应该不用,不传就好了
			'cAppVersion': _appversion,
			"cTcVersion": _tcVersion
		},
		success: function(data){
			console.log('success..........:'+JSON.stringify(data))
			if(data.success == true) {
				console.log('领取成功')
			}else {
				console.log('领取失败')
			}
		},
		fail: function(data) {
			console.log('fail..........:'+JSON.stringify(data))
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 		ajaxTmp.abort();
	　　　　	}
	　　	}
	});	
}

function getQrcodeUrl(appid, source, model, chip, mac, serviceid, type, devicebarcode, time, accessToken) {
	console.log("appid=" + appid + ",source=" + source + ",model=" + model + ",chip=" + chip + ",mac=" + mac + ",serviceid=" + serviceid + ",type=" + type + ",devicebarcode=" + devicebarcode + ",time=" + time);
	console.log("accessToken="+accessToken);
	var needDataObj = {
		"appId": appid,
		"source": source,
		"deviceModel": model,
		"deviceChip": chip,
		"deviceMac": mac,
		"serviceId": serviceid,
		"type": type,
		"token": accessToken,
		"deviceBarcode": devicebarcode,
		"time": time
	};
	var needDataString = JSON.stringify(needDataObj);
	console.log(needDataString);
	
	var myUrl2 = _relServerUrl; //"";_testServerUrl; //
	var ajaxTimeoutTwo = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 5000, 
		url: myUrl2,
		data: {
			"param": needDataString
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			console.log(typeof(data));
			console.log(data.result);
			if(data.result){
				console.log("绘制二维码;url="+ data.data);
				
			}else{
				console.log("获取二维码信息出错,使用默认二维码");
				console.log(JSON.stringify(data));
				useDefaultQrcode();
			}
		},
		error: function() {
			console.log('fail');
			useDefaultQrcode();
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("-------------complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 	ajaxTimeoutTwo.abort();
	　　　　	}
	　　	}
	});
}

function useDefaultQrcode() {
////	var qrImageUrl = app.rel_html_imgpath(__uri("../img/qrDefault.png"));
//	console.log("something error, use default QR image:"+qrImageUrl)
//	$("#qrDiv").css("background-image", "url("+qrImageUrl+")");
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
	
	// 需要读取encryptedData上的ciphertext.toString()才能拿到跟Java一样的密文
	var encryptedStr = encrypted.ciphertext.toString()
    console.log('encryptedStr: '+ encryptedStr)
    
    return encryptedStr;
    
//  // 拿到字符串类型的密文需要先将其用Hex方法parse一下
//  var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr)
//  console.log('encryptedHexStr: '+ encryptedHexStr)
//  // 将密文转为Base64的字符串
//	// 只有Base64类型的字符串密文才能对其进行解密
//  var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
//  console.log('encryptedBase64Str: '+ encryptedBase64Str)
}

function AESDecrypt(encryptedData) {
	var key = CryptoJS.enc.Utf8.parse(_accountClientKey);
	var options = {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	}
	
	var decryptedData = CryptoJS.AES.decrypt(encryptedData, key, options)
	// 解密后，需要按照Utf8的方式将明文转位字符串
	var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8)
	console.log('decryptedStr: '+decryptedStr)
	
	return decryptedStr;
}


//fake function
function fake_submitTaskFinished() {
	var data = {
		accessToken: '2.ec0fdcb58a384863b8588c7ea852436b',
		openId: 'B5A7458D62310E8CDB805F35A97D16C6',
//		userVipInfo: ,
		currentTimestamp: Date.parse(new Date()),
		taskAttr: 2 ,
		tagName: 'itemTag',
		itemTag: 'GRADE_LEVEL_GIFT',
		memo: '领取会员礼包'	
	}

	data = JSON.stringify(data);
	var encryptedData = AESEncrypt(data);
	var ajaxTmp = $.ajax({
		type:"POST",
		dataType: "json",
		url:_accountSrvUrl+_accountClientMissionSubmitUrl,
		async:true,
		timeout:10000,
		data: {
			clientId: _accountClientId,
			data: encryptedData
		},
		headers: {
			"MAC": '2835452aa239',
			"cChip": '8S47',
			"cModel": 'E2A',
			"cUDID":'31140974',
			"cSize": '32',
//			"cPushId": '',//这个是要一些特殊情况才要的，你应该不用,不传就好了
			'cAppVersion': '4100012',
			"cTcVersion": '700190222'
		},
		success: function(data){
			console.log('success..........:'+JSON.stringify(data))
			if(data.success == true) {
				console.log('success: true')
			}else {
				console.log('success: false')
			}
		},
		fail: function(data) {
			console.log('fail..........:'+JSON.stringify(data))
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 		ajaxTmp.abort();
	　　　　	}
	　　	}
	});	
}
