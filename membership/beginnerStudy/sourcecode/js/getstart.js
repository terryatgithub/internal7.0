var _Index1= "";
var　firstFocus="";
var _bPlayDisrupted = false;

//视频资源地址,例如:http://v-play.coocaatv.com/7-demo/10-help.m4v
var _baseUrl = "http://v-play.coocaatv.com/7-demo/";
var _videoInfos = [
	 { des: "如何使用遥控器", name: "1-remote", duration: "01:01", img: "img/1.jpg"}
	,{ des: "如何挑选想看的节目", name: "2-pick", duration: "01:02", img: "img/2.jpg"}
	,{ des: "在播放中会用到", name: "3-play", duration: "01:03", img: "img/3.jpg"}
	,{ des: "看过的节目去哪里找", name: "4-history", duration: "01:04", img: "img/4.jpg"}
	,{ des: "如何购买会员和登录", name: "5-vip", duration: "01:05", img: "img/5.jpg"}
	,{ des: "怎么看电视台", name: "6-cctv", duration: "01:06", img: "img/6.jpg"}
	,{ des: "试试和电视说话", name: "7-AI", duration: "01:07", img: "img/7.jpg"}
	,{ des: "如何在电视上看手机上的视频和照片", duration: "01:08", name: "8-cast", img: "img/8.jpg"}
	,{ des: "还能用电视做什么", name: "9-education", duration: "01:09", img: "img/9.jpg"}
	,{ des: "有问题或想了解更多功能怎么办", name: "10-help", duration: "01:10", img: "img/10.jpg"}
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
    	app.showStudyVideos();
    	
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
        //
        var playbackPageOn = $("#playbackPage").css("display");
        console.log("return btn, playback page status:"+playbackPageOn);
        if(playbackPageOn == "block") {
        	replayOrReturn(false);
        }else {
	        navigator.app.exitApp();
        }
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
		firstFocus = document.getElementsByClassName("coocaa_btn")[0];
		initPhoneMap(firstFocus);

		//注册事件监听
		app.registerEventHandler();
		//注册按键监听
		app.registerKeyHandler();
    },
    onResume: function() {
        console.log("in onResume");
        
        //播放时返回了:
        if(_bPlayDisrupted == true) {
        	console.log("stop playing, and return---");
        	_bPlayDisrupted = false;
        	
        	//恢复主页显示
			$("#homeTitleDivId").css("display", "block");
			$("#homtContentDivId").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn")[_Index1], "btn-focus", function() {}, function(val) {}, function(obj) {});
        }
    },
    
    onPause: function() {
        console.log("in onPause");
    },
	
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	},
	
	registerEventHandler: function() {
		console.log("registerEventHandler---");
		coocaaosapi.addCommonListener(function(message) {
			console.log("--------------->commonListen==" + message.web_player_event);
			if(message.web_player_event == "on_complete") {
				//正常播放结束,设置flag:
				_bPlayDisrupted = false;
				
				//关闭主页,并显示播放完毕的提示页面
				$("#homeTitleDivId").css("display", "none");
				$("#homtContentDivId").css("display", "none");
				$("#playbackPage").css("display","block");
				map = new coocaakeymap($(".coocaa_btn2"), $(".coocaa_btn2")[_Index1], null, function() {}, function(val) {}, function(obj) {});
			}
		});		
	},
	
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
		$(".coocaa_btn").bind("itemClick", function() {
				_Index1 = $(".coocaa_btn").index($(this));
				console.log("itemClick _Index1 = " + _Index1);
				//播放前先检测网络状态
				preparePlayVideo();
		});
		
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("----------focus-----"+_Lindex);
			focusShift(_Lindex);
		});
		
		$(".coocaa_btn2").bind("itemClick", function() {
			//_Index1 = $(".coocaa_btn2").index($(this));
			console.log("------coocaa_btn2 itemClick _Index2 = " + $(".coocaa_btn2").index($(this)));
			
			//响应用户选择（重播或返回)
			replayOrReturn(true);
		});
		
		$(".coocaa_btnF").bind("itemClick", function() {
			//_Index1 = $(".coocaa_btnF").index($(this));
			console.log("------coocaa_btnF itemClick _Index2 = " + $(".coocaa_btnF").index($(this)));
			//去联网
			startConnectNet();
		});
	},
	
//	calFocusTarget: function(pos, max)	{
//		var up,down,left,right;
//		up = pos - 2;    if(up < 0) up = 0;
//		down = pos + 2;  if(down > max) down = max;
//		left = pos -1;   if(left < 0) left = 0;
//		right = pos + 1; if(right > max) right = max;
//		
//		console.log("pos:"+pos+",max:"+max+"; up:"+up+",down:"+down+",left:"+left+",right:"+right);
//		return ["videoDivId"+up, "videoDivId"+down, "videoDivId"+left, "videoDivId"+right];
//	},
	
    showStudyVideos: function() {
    	console.log("in showStudyVideos.");
		var len = _videoInfos.length;
		console.log("server data len:"+len);
		var i = 0;
		var tmpId;
		var tmpImg;
		var targetPos;
		
		//有超过一个页面的内容时（8个),需要动态创建新videoDiv
		for(i=8;i<len;i++) {
			console.log("beyond 7, now i:"+i+", need append baseDivComponent.");
			$(".homeContentDivClass").append($(".homeContentDivClass .baseDivComponent:last-child").clone(true));
			//设置id
			tmpId = "videoDivId"+i;
			$(".baseDivComponent:last").attr("id",tmpId);
		}
		//插入图像
		for(i=0; i<len; i++) {
			tmpId = "videoDivId"+i;
			console.log("now i:"+tmpId);
			
			//为视频块填充内容
			//tmpImg = '<img src="'+answers[0]+'" class="imgPreviewClass"></img>';
			//测试用
			tmpImg = '<img></img>';
			$("#"+tmpId+" .videoPreviewClass").append(tmpImg);					
			$("#"+tmpId+" .pTitleClass").text(_videoInfos[i].des);
			$("#"+tmpId+" .pDurationClass").text(_videoInfos[i].duration);					
		}
		setTimeout("delayLoad()", 100);
		
		map = new coocaakeymap($(".coocaa_btn"), document.getElementsByClassName("coocaa_btn")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});
		console.log("out showStudyVideos.");
	},
    
    triggleButton: function() {
        cordova.require("com.coocaaosapi");

//		coocaaosapi.getDeviceInfo(function(message) {
//			console.log(JSON.stringify(message));
//			console.log("version="+ message.version + "; model=" + message.model + "; activeid=" + message.activeid);//版本号
//		}, function(error) {
//			console.log(error);
//		});
	}
    
};

app.initialize();


//计算焦点移动时,父Div的滚动条滚动距离
function focusShift(pos) {
	console.log("focusShift-111--pos="+pos);
	
	//如果需要翻页,开始滚动父Div滚动条
	if (pos > 5){
		var focusDivHeight = $(".baseDivComponent")[0].offsetHeight;
		focusDivHeight += 30; //margin_top + bottom;
		console.log("--- content page move...focusDivHeight:"+focusDivHeight);
	
		var myScrollTop = 0;
		//计算滚动距离,当前位置除以2(因为1行放2个视频)
		var relativePos = Math.round((pos - 5 )/2);
		myScrollTop = relativePos * focusDivHeight;
		console.log("cur focus12:"+ pos + ", relativePos:"+relativePos+", myScrollTop=" + myScrollTop);
		
		//chrome的animate scrollTop只支持html 不支持其它元素?
//		$("html,body").stop(true,true).animate({
//			scrollTop: myScrollTop
//		}, {
//			duration: 0,
//			easing: "swing",
//			complete: function() {}
//		});
		$(".baseDivComponent").stop(true,true).animate({
			top: -myScrollTop
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
		});

	}else if (pos == 5 || pos == 4) {
		//回到首页
		console.log("---return home page");
//		$("html,body").stop(true,true).animate({
//			scrollTop: 0
//		}, {
//			duration: 0,
//			easing: "swing",
//			complete: function() {}
//		});	
		$(".baseDivComponent").stop(true,true).animate({
			top: 0
		}, {
			duration: 0,
			easing: "swing",
			complete: function() {}
		});
	}
}

//页面翻页时,“新手学习”的headDiv显示成在最顶端的一个Bar条
function headDivShowAsBar() {
	console.log("headDivShift---");
	
	$("#homeTitleDivId").removeClass("homeTitleDivClass");
	$("#homeTitleDivId").addClass("homeTitleDivClassBar");
	
	$("#homeTitleHeadId").removeClass("homeTitleHeadClass");
	$("#homeTitleHeadId").addClass("homeTitleHeadClassBar");
	
	$("#homeTitleParaId").css("display", "none");
}

//“新手学习”的headDiv恢复初始显示
function headDivShowRestore() {
	console.log("headDivShowRestore---");
	
	$("#homeTitleDivId").removeClass("homeTitleDivClassBar");
	$("#homeTitleDivId").addClass("homeTitleDivClass");
	
	$("#homeTitleHeadId").removeClass("homeTitleHeadClassBar");
	$("#homeTitleHeadId").addClass("homeTitleHeadClass");
	
	$("#homeTitleParaId").css("display", "block");
}

//准备启动播放
function preparePlayVideo() {
	//播放前先检查网络是否连接
	coocaaosapi.isNetConnected(function(message){
			console.log("isNetConnected success:"+JSON.stringify(message));
			if(message.isnetworking == "true") {
				//关闭主页,避免从playback页面返回时闪一下主页
				$("#homeTitleDivId").css("display", "none");
				$("#homtContentDivId").css("display", "none");
				//启动播放
				playVideo();			
			}else {
				//网络未连接:
				showFailToast();		
			}
		}, function(error){console.log("isNetConnected error:"+JSON.stringify(error));});
}
//显示网络失败提示:
function showFailToast() {
	console.log("showFailToast in..");
	$("#failToast").css("display", "block");
	//获取按键:
	map = new coocaakeymap($(".coocaa_btnF"), document.getElementsByClassName("coocaa_btnF")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});
}

//进入设置网络页面:
function startConnectNet() {
	console.log("startConnectNet in...");
	//隐藏失败提示页,并恢复主页按键:
	$("#failToast").css("display", "none");
	map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn")[_Index1], "btn-focus", function() {}, function(val) {}, function(obj) {});
	coocaaosapi.startNetSetting(function(message){
		console.log("startNetSetting success:"+JSON.stringify(message));
	}, function(error){console.log("startNetSetting error:"+JSON.stringify(error));});
}

//启动播放,不能控制快进快退 暂停继续;
function playVideo() {
		console.log("playVideo -start--_startPlaying:true-_Index1:"+_Index1);
//		_czc.push(["_trackEvent",category,action,label,value,nodeid]);
		//开始播放时,设置flag; 只有正常播完才会被设为false
		_bPlayDisrupted = true;
		
		var _cName = _videoInfos[_Index1].des;
		var _cUrl = _baseUrl + _videoInfos[_Index1].name + ".m4v";
		console.log("playing:"+_cName+"--"+_cUrl);

		coocaaosapi.startCommonWebview("qxhd", _cUrl, _cName, "1080", "1920", "", "新手学习", "", function(message) {
			console.log(message);
		}, function(error) {
			console.log("commonTask----error");
		});

		console.log("playVideo -end---");
}

//在线播放,可以控制快进快退 暂停继续
//跟樊彦博讨论,不用这种方式;
function startOnlinePlay(url,name){
//	var url = 'http://live.alicdn.com/tmall/f2b362cc-22ce-4916-be77-51d37e7ef555.m3u8';
//	var url = 'http://v-play.coocaatv.com/8c056be2eac926a05c472f45c3893905.mp4';
//  var name = 'test';
    coocaaosapi.playOnlineMovie(url,name,"false",function(message) {
    	console.log(message); 
    	console.log("startOnlinePlay---success..");
//  	navigator.app.exitApp();
    },function(error) {
//  	console.log(error);
    	console.log("startOnlinePlay---fail..");
    });
}

//重播或返回
function replayOrReturn(index)	{
	console.log("replayOrReturn---index-"+index);
	if(index == true) {
		console.log("replay---");
		playVideo();
	}else if(index == false){
		console.log("return---");
		//返回首页
		$("#playbackPage").css("display","none");
		$("#homeTitleDivId").css("display", "block");
		$("#homtContentDivId").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn")[_Index1], "btn-focus", function() {}, function(val) {}, function(obj) {});
	}
}

function delayLoad() {
	var i,pic;
	var len = _videoInfos.length;
	$("img").addClass("imgPreviewClass");
	for(i=0;i<len;i++) {
		pic = _videoInfos[i].img;
		console.log("==i:"+i+", pic: "+pic);
		$("img").eq(i).attr("src", pic);
	}
	//用标注里的thumbnail截图测试页面效果
//	pic = app.rel_html_imgpath(__uri("../img/testThumb.png"));
//	$("img").attr("src", pic);
	
	pic = app.rel_html_imgpath(__uri("../img/bg.png"));
	$("body").css("background-image", "url("+pic+")");
	
	$("#failToast").css("background-image", "url(img/failToast.webp)")
}
