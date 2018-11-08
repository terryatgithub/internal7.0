var _actionid = 2;//活动id
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
		this.bindEvents();
		console.log("lxw in initialize");
		$("#dialog").css("display", "block");
	},
	bindEvents: function() {
		console.log("in bindEvents");
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener('resume', this.onResume, false);
	},
	handleBackButton: function() {
		console.log("lxw Back Button Pressed!");
	},
	onResume: function() {
		console.log("lxw Page onResume!");
	},
	onDeviceReady: function() {
		console.log("lxw in onDeviceReady");
		//app.receivedEvent("deviceready");
		app.triggleButton();
	},
	handleBackButtonDown: function() {
		console.log("lxw Back Button Down Pressed!");
		navigator.app.exitApp();
		backButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		console.log("hello");
		webPageShowLog("720全局弹窗（腾讯）","720腾讯");
		
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("dialogButton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		$("#dialogbutton").bind("itemClick", function() {
			console.log("hello");
			coocaaosapi.startMovieWebview("http://beta.webapp.skysrt.com/lxw/ceshi/nfc/index.html",function(message) {
				console.log("lxw 调起活动页成功。");
				navigator.app.exitApp();
			}, function(error) {console.log("lxw 调起活动页失败。");});
			webBtnClickLog("720全局弹窗（腾讯）","720立即参与（腾讯）",_actionid,"720暑假（腾讯）","720腾讯","-1");
		});
	}
};

app.initialize();

function webBtnClickLog(page_name,button_name,activity_id,activity_name,c_source,order_no) {
	var _dateObj = {
		"page_name" : page_name,
		"button_name" : button_name,
		"activity_id" : activity_id,
		"activity_name" : activity_name,
		"c_source" : c_source,
		"order_no" : ""
	}
	if (order_no == "-1") {
		_dateObj.order_no = "";
	}else{
		_dateObj.order_no = order_no;
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
   	coocaaosapi.notifyJSLogInfo("web_button_clicked", _dataString, function(message) { console.log(message); }, function(error) { console.log(error); });
}
function webPageShowLog(page_name,c_source) {
	var _dateObj = {
		"page_name" : page_name,
		"c_source" : c_source
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
   	coocaaosapi.notifyJSLogInfo("web_page_show_new", _dataString, function(message) { console.log(message); }, function(error) { console.log(error); });
}