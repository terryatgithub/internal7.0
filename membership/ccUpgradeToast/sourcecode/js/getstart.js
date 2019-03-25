//正式配置:
//var _relServerUrl = "https://wx.coocaa.com/cors/qrcode/getTmpQrcode";
//var _relAppId = "wx5a6d3bdcd05fb501";

//测试临时配置,正式发布时需要改为正式配置:
var _relServerUrl = "https://beta-wx.coocaa.com/cors/qrcode/getTmpQrcode";
var _relAppId = "wxee96df3337b09cb5";
var _couponCheckUrl = 'http://beta.active.tc.skysrt.com/coupon_receive/couponInfo?couponId=';

//全局变量
var _paramsQuery = ['couponId', 'points', 'gradeLevel'];
var _resultQuery = [];
var _couponNum = 0;//优惠券数量

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
	}
    
};

app.initialize();

function openGiftBox(){//开奖动画
	console.log('openGiftBox..')
	$('#prizeIcon').removeClass('giftshow');
	$('#prizeIcon').addClass('giftOpen');
	setTimeout(showGiftDetails, 2500);
}

function showGiftDetails() {//显示奖品明细页
	var img = app.rel_html_imgpath(__uri("../img/titleOK.png"));
	$('#title').css('background-image', 'url('+img+')');
	$('#prizelist').css('display','none');
	$('#prizeIcon').css('display','none');
	$('#button').text('立即查看');
	
	$('#prizeZone').css('display', 'block');
	_clickIndex = 2;
}

var _clickIndex = 1;
function processKey() {
	console.log('processKey _clickIndex:'+_clickIndex);
	switch(_clickIndex) {
		case 1: 
			openGiftBox();
			break;
		case 2: 
			console.log('go check page..')
			navigator.app.exitApp();
			break;
	}
}

function getQueryString(name) {//获取url中的参数
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function getGiftDetails(){//获取礼物详细信息
	console.log('getGiftDetails..')
	_paramsQuery.forEach(function(item, index){
		_resultQuery[index] = getQueryString(item);
		console.log(item + ', result: '+_resultQuery[index]);
	})
	_resultQuery[0]=_resultQuery[0].split(',');
	_couponNum = _resultQuery[0].length;
	console.log('coupon num:'+_couponNum+', coupon id: '+_resultQuery[0]);
}

function getCouponDetails(id){ //获取优惠券详细
	console.log('getCouponDetails id:'+id);
    $.ajax({
        type: "post",
        async: true,
        timeout: 5000,
        url: _couponCheckUrl+id,
        dataType: "json",
        success: function(data) {
            console.log("-getCouponDetails success--"+JSON.stringify(data));
            if(data.code == 50100){
            }
        },
        error: function(error) {
            console.log("-getCouponDetails fail--" + JSON.stringify(error));
        }
    });	
}
 