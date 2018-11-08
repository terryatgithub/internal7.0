var _testurl = "http://beta.restful.lottery.coocaatv.com";//测试路径
var _actionid = 37;//活动id

$(function() {
	readUrl();
	rotateInit();
	buttonInitBefore();
	actionInit();
	startmarquee(400, 30, 0, 1); //滚动获奖名单
});

function readUrl(){
	var _part = getQueryString("part");
	console.log("loading..." + _part);
	if(_part == "dialog"){
		$("#dialog").css("display","block");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("dialogButton"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	}else{
		$("#other").css("display","block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	}
	
	var str = "http://beta.webapp.skysrt.com/zy/address/index.html?activeId=29&rememberId=8&userKeyId=4ff81be29c5711e7987500505687790ab1";
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		width : 200,
		height : 200
	});
	qrcode.makeCode(str);
}
function rotateInit(){
	var rotateTimeOut = function() {
		$('#rotate').rotate({
			angle: 0,
			animateTo: 2160,
			duration: 8000,
			callback: function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	var bRotate = false;

	var rotateFn = function(awards, angles, txt) {
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 1800,
			duration: 3000,
			callback: function() {
				showResule(awards, angles, txt);
				bRotate = !bRotate;
			}
		})
	};
	
	$(".pointer").bind("itemClick",function(){
		console.log("in pointer");
		if (bRotate) return;
		var item = rnd(0, 2);
		switch (item) {
			case 0:
				rotateFn(0, 337, '一等奖');
				break;
			case 1:
				rotateFn(1, 26, '二等奖');
				break;
			case 2:
				rotateFn(2, 88, '三等奖');
				break;
		}
		console.log(item);
	});
}
function rnd(n, m) {
	return Math.floor(Math.random() * (m - n + 1) + n)
}
function showResule(awards, angles, txt){
	console.log(awards+"--"+angles+"--"+txt);
	if(awards == 0){
		$(".prizetoast:eq(0)").css("display","block");
		$("#fourPage").css("display","block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	}else if(awards == 1){
		$(".prizetoast:eq(0)").css("display","block");
		$("#fourPage").css("display","block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	}else if(awards > 1){
		$(".prizetoast:eq(1)").css("display","block");
		$("#fourPage").css("display","block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	}else{
		console.log("接口异常");
	}
}
//获奖名单滚动效果
function startmarquee(lh, speed, delay, index) {
	var t;
	var p = false;
	var o = document.getElementById("awardListTwo");
	o.innerHTML += o.innerHTML;
	o.onmouseover = function() {
		p = true
	}
	o.onmouseout = function() {
		p = false
	}
	o.scrollTop = 0;
	function start() {
		t = setInterval(scrolling, speed);
		if(!p) {
			o.scrollTop += 1;
		}
	}
	function scrolling() {
		if(o.scrollTop % lh != 0) {
			o.scrollTop += 1;
			if(o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
		} else {
			clearInterval(t);
			setTimeout(start, delay);
		}
	}
	setTimeout(start, delay);

}
function buttonInitBefore(){
	$("#dialogButton").bind("itemClick",function(){
		$("#other").css("display","block");
		$("#dialog").css("display","none");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#activeruleButton").bind("itemClick",function(){
		$("#secondPage").css("display","block");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#myprizeButton").bind("itemClick",function(){
		$("#thirdPage").css("display","block");
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$(".myprizebtn").bind("itemClick",function(){
		$("#fourPage").css("display","block");
		$(".prizetoast:eq(1)").css("display","block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$(".coocaa_btn3").bind("itemClick",function(){
		$("#fourPage").css("display","none");
		if (document.getElementById("thirdPage").style.display == "block") {
			map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else{
			map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	});
	$(".myprizebtn").bind("focus",function(){
		var _index = $(".myprizebtn").index($(this));
		console.log(_index);
		var _eachheight = $(".myprizebtn")[0].offsetHeight;
		var myScrollTopValue = 0;
		myScrollTopValue = _index * _eachheight;
		console.log(myScrollTopValue);
		$("#myprizebox").stop(true,true).animate({scrollTop: myScrollTopValue }, {duration: 300,easing: "swing",complete: function(){
			//var t = setTimeout(scanle(_thisId),1500);
		}});
	});
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function actionInit(){
	var ajaxTimeoutOne = $.ajax({
		type: "GET", // get post 方法都是一样的
		async: true,
		timeout : 5000, 
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl + "/v3/lottery/"+_actionid+"/info",
		data: {
			"id": _actionid,
			"operateNumber" : 1
		},
		success: function(data) {
			console.log(data);
			console.log("开始时间:" + data.data.activeBeginTime);
			console.log("结束时间:" + data.data.activeEndTime);
			
			for (var i = 0; i < data.data.winNews.length; i++) {
				var _div = '<li><span class="testspan1">'+data.data.winNews[i].userNickName+'</span><span class="testspan2">'+data.data.winNews[i].awardName+'</span><span class="testspan3">'+data.data.winNews[i].awardTime.split(' ')[0]+'</span></li>';
				$("#awardul").append(_div);
			}
		},
		error: function() {
			console.log('获取我的奖品失败');
		},
		complete : function(XMLHttpRequest,status){
	　　　　	console.log("-------------complete------------------"+status);
			if(status=='timeout'){
 　　　　　 		ajaxTimeoutOne.abort();
　　　　		}
	　　	}
	});
}