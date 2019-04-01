//测试临时配置,正式发布时需要改为正式配置:
//账号信息（等级、金币、成长点数等）服务器地址
//var _accountSrvUrl = 'http://172.20.155.202:7171';
//var _accountClientId = '9F072A0ABF6E2B3D';
//var _accountClientKey = '85bdfb9ef29b4776';
//var _accountClientMissionSubmitUrl = '/v4/public/submit-missionEvent';

//账号信息（等级、金币、成长点数等）服务器地址
var _accountSrvUrl = 'https://member.coocaa.com';
var _accountClientId = 'c7ea82d00b5a4aa3';
var _accountClientKey = 'fa1c9df1106c46fb';
var _accountClientMissionSubmitUrl = '/v4/public/submit-missionEvent';

//全局变量
var cAppVersion;
var _accessToken = "";
var _openId = "";
var _activeId = "";
var _mac, _chip, _model, _size, _tcVersion;

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
		map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});
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
		bindClick();
	},
	
    triggleButton: function() {
        setTimeout("delayLoad()", 100);
        cordova.require("com.coocaaosapi");
	}
};

app.initialize();

function bindClick(){
	console.log('bind.')
	$(".coocaa_btn").bind("itemClick", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("-click-----"+_Lindex);
			processKey();
		});
}
function unbindClick(){
	console.log('unbind.')
	$(".coocaa_btn").unbind("itemClick");
}
function showFailToast(){
	console.log('showFailToast.')
	$('.fail').css("display", 'block');
	setTimeout(function(){
		$('.fail').css("display", 'none');
	}, 1500);
}

var i = 0;//页面显示index
function processKey() {
	console.log('processKey i:'+i);
	switch(i) {
		case 0:
			unbindClick();	
			getDeviceInfo();
			break;
		case 1: 
			//点击领取
			$("#pic1").css("display", "none");
			$("#pic2").css("display", "block");
			$("#pic3").css("display", "none");
			$("#pic4").css("display", "none");
			i=2;
			break;
		case 2: 
			$("#pic1").css("display", "none");
			$("#pic2").css("display", "none");
			$("#pic3").css("display", "block");
			$("#pic4").css("display", "none");
			i=3;
			break;
		case 3: 
			$("#pic1").css("display", "none");
			$("#pic2").css("display", "none");
			$("#pic3").css("display", "none");
			$("#pic4").css("display", "block");
			i=4;
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
				console.log(JSON.stringify(message));
	            if (message.haslogin == "true") {
            		console.log("user login...");
            		coocaaosapi.getUserInfo(function(message) {
						_openId = message.open_id;
	            		coocaaosapi.getUserAccessToken(function(message) {
			        		console.log("usertoken " + message.accesstoken);
			        		_accessToken = message.accesstoken;
			        		submitTaskFinished();//提交任务完成信息
			        	},function(error) { console.log(error); bindClick(); showFailToast();});
					}, function(error) { console.log(error); bindClick(); showFailToast();});
	            }else{
	        		console.log("user not login...");
	        		showFailToast();
	        		bindClick();
	            }
			},function(error) {
				console.log(error);
				showFailToast();
				bindClick();
			});
		}, function(error) {
			console.log(error);
			showFailToast();
			bindClick();
		});
}
 
//调用任务提交事件接口
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
			'cAppVersion': cAppVersion,
			"cTcVersion": _tcVersion
		},
		success: function(data){
			console.log('submitTaskFinished success..:'+JSON.stringify(data))
			if(data.success == true) {
				console.log('领取成功')
				//todo:
				i = 1;
				processKey();
			}else {
				console.log('领取失败');
				showFailToast();
			}
		},
		fail: function(data) {
			console.log('fail..........:'+JSON.stringify(data));
			showFailToast();
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 		ajaxTmp.abort();
	　　　　	}
			bindClick();
	　　	}
	});	
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
