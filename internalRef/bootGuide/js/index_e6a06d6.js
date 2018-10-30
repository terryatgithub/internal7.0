// document.write("<script language=javascript src='js/md5.js' charset=\"utf-8\"></script>");

var _webVersion = "";
var _systemColor = "#272525";
var app = {
	canonical_uri: function(src, base_path) {
		var root_page = /^[^?#]*\//.exec(location.href)[0],
			root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
			absolute_regex = /^\w+\:\/\//;
		// is `src` is protocol-relative (begins with // or ///), prepend protocol  
		if(/^\/\/\/?/.test(src)) {
			src = location.protocol + src;
		}
		// is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)  
		else if(!absolute_regex.test(src) && src.charAt(0) != "/") {
			// prepend `base_path`, if any  
			src = (base_path || "") + src;
		}
		// make sure to return `src` as absolute  
		return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
	},

	rel_html_imgpath: function(iconurl) {
		console.log(app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1')));
		return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
	},

	// Application Constructor
	initialize: function() {
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
		console.log("Back Button Pressed!");
		//navigator.app.exitApp();
	},
	onBackButtonDown: function() {
		console.log("Back ButtonDown Pressed!");
		//navigator.app.exitApp();
	},
	onResume: function() {
		console.log("Page onResume!");
	},
	onDeviceReady: function() {
		app.triggleButton();
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		var initPhoneMap = function(obj) {
			map = new coocaakeymap($(".coocaa_btn"), obj, "btn-focus", function() {}, function(val) {}, function(obj) {});
			console.log("initPhoneMap end ......");
		}
		var firstFocus = "";
		firstFocus = document.getElementById("buttonDiv1");
		initPhoneMap(firstFocus);
		
		_webVersion = getUrlParam("version");
		
		var _brand = "";
		var _address = "";
		var _appid, _source, _model, _chip, _mac, _serviceid, _version, _type, _devicebarcode, _time, _accessToken = "";
		var _size, _resolution, _appVersion, _fmodel, _pattern, _appID, _appversion = "";
		var timestamp = Date.parse(new Date());
		var tmpstring = timestamp.toString();
		var tmpnum = tmpstring.substr(0, 10);
		_appid = "wx5a6d3bdcd05fb501";//正式环境下
		_source = "";
		_type = "3";
		_time = tmpnum;
		_devicebarcode = "";
		
		_appversion = accountVersion;
		
		_resolution = "";
		_appVersion = 0;
		_fmodel = "Default";
		_pattern = "normal";
		_appID = 0;
		console.log("_appversion="+_appversion);
		coocaaosapi.getDeviceInfo(function(message) {
			var _message = JSON.stringify(message);
			console.log(_message);
			_model = message.model;
			_chip = message.chip;
			_mac = message.mac;
			_size = message.panel;
			_serviceid = message.activeid;
			_version = message.version.replace(/\./g, "");
			_brand = message.brand;
			console.log(_brand);
			if(_brand == "Philips")  {
				$("#errorDiv").css("display","block");
				$("#philips").css("display","block");
				$("#buttonDiv1").css("display","block");
            }else if(_brand == "Panda")   {
            	$("#errorDiv").css("display","block");
            	$("#panda").css("display","block");
            	$("#buttonDiv1").css("display","block");
            }else{
            	console.log(_appid);
            	coocaaosapi.hasCoocaaUserLogin(function(message) {
		            if (message.haslogin == "true") {
		            	coocaaosapi.getUserAccessToken(function(message) {
			        		console.log("usertoken " + message.accesstoken);
			        		_accessToken = message.accesstoken;
			        		getTvSource(_mac, _model, _chip, _size, _resolution, _version, _fmodel, _pattern, _appID, _appversion, _appid, _source, _serviceid, _type, _devicebarcode, _time,_accessToken);
			        	},function(error) { console.log(error);});
		            }else{
		            	_accessToken = "";
						getTvSource(_mac, _model, _chip, _size, _resolution, _version, _fmodel, _pattern, _appID, _appversion, _appid, _source, _serviceid, _type, _devicebarcode, _time,_accessToken);
		            }
				},function(error) {
					console.log(error);
					notsuccess(0);
				});
            }
		}, function(error) {
			console.log(error);
			notsuccess(0);
		})

		$("#buttonDiv1").bind("itemClick", function() {
			console.log("点击了开始体验按钮");
			navigator.app.exitApp();
			coocaaosapi.notifyJSMessage("FINISH", function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		});
	}
};

app.initialize();

function getTvSource(smac, smodel, schip, ssize, sresolution, sversion, sfmodel, spattern, sappID, sappversion, qappid, qsource, qserviceid, qtype, qdevicebarcode, qtime,qaccessToken) {
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
			console.log(data.source);
			qsource = data.source;
			if(qsource == "yinhe") {
				console.log("视频源：" + qsource);
				$("#bgImga").css("display","block");
				console.log("获取二维码传的参数" + "qappid=" + qappid + ";qsource=" + qsource + ";smodel=" + smodel + ";schip=" + schip + ";smac=" + smac + ";qserviceid=" + qserviceid + ";qtype=" + qtype + ";qdevicebarcode=" + qdevicebarcode + ";qtime=" + qtime);
				getQrcodeUrl(qappid, qsource, smodel, schip, smac, qserviceid, qtype, qdevicebarcode, qtime, qaccessToken);
			} else if(qsource == "tencent") {
				console.log("视频源：" + qsource);
				$("#bgImgt").css("display","block");
				console.log("获取二维码传的参数" + "qappid=" + qappid + ";qsource=" + qsource + ";smodel=" + smodel + ";schip=" + schip + ";smac=" + smac + ";qserviceid=" + qserviceid + ";qtype=" + qtype + ";qdevicebarcode=" + qdevicebarcode + ";qtime=" + qtime);
				getQrcodeUrl(qappid, qsource, smodel, schip, smac, qserviceid, qtype, qdevicebarcode, qtime, qaccessToken);
			} else {
				console.log("视频源既不是爱奇艺又不是腾讯--" + qsource);
				notsuccess(1);
//				qsource == "yinhe";
//				document.getElementById("bgImga").style.display = "block";
//				console.log("获取二维码传的参数" + "qappid=" + qappid + ";qsource=" + qsource + ";smodel=" + smodel + ";schip=" + schip + ";smac=" + smac + ";qserviceid=" + qserviceid + ";qtype=" + qtype + ";qdevicebarcode=" + qdevicebarcode + ";qtime=" + qtime);
//				getQrcodeUrl(qappid, qsource, smodel, schip, smac, qserviceid, qtype, qdevicebarcode, qtime, qaccessToken);
			}
		},
		error: function() {
			console.log('获取视频源失败');
			notsuccess(2);
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("-------------complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 	ajaxTimeoutOne.abort();
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
	var myUrl2 = "";
	myUrl2 = "http://wx.coocaa.com/cors/qrcode/getTmpQrcode";
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
				if(_webVersion == "new"){
					console.log("新版开机引导+背景色：#272525");
					document.getElementById("bgImg").style.backgroundColor = _systemColor;
				}
				$("#bgImg").css("display","block");
				console.log("绘制二维码;url="+ data.data);
				var str = data.data;
				var qrcode = new QRCode(document.getElementById("qcode"), {
					width : 400,
					height : 400
				});
				makeCode(str);
				function makeCode (str) {		
					qrcode.makeCode(str);
					setTimeout("document.getElementById('bgImgDiv').style.display = 'block';",80);
					setTimeout("document.getElementById('coocaalogo').style.display = 'block';",80);
					setTimeout("document.getElementById('qcode').style.display = 'block';",80);
					setTimeout("document.getElementById('buttonDiv1').style.display = 'block';",80);
				}
			}else{
				console.log("获取二维码信息出错");
				console.log(JSON.stringify(data));
				notsuccess(3);
			}
		},
		error: function() {
			console.log('fail');
			notsuccess(4);
		},
		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　	console.log("-------------complete------------------"+status);
			if(status=='timeout'){
	 　　　　　 	ajaxTimeoutTwo.abort();
	　　　　	}
	　　	}
	});
}

function notsuccess(num){
	console.log("----------------->notsuccess" + _webVersion);
	$("#errorDiv").css("display","block");
	if(_webVersion == "new"){
		document.getElementById("skysrt_new").style.backgroundColor = _systemColor;
		$("#skysrt_new").css("display","block");
	}else{
		$("#skysrt").css("display","block");
	}
	$("#buttonDiv1").css("display","block");
}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if(r != null) return decodeURI(r[2], 'utf-8');
	return null;
}