var _Index1= "";
var　firstFocus="";
var _bPlayDisrupted = false;
var _cUrl = "http://all.vod.17ugo.com/vod/kukai/U-酷开/20181009/厨具20180928/553273-方太跨界三合一水槽洗碗机尊享组U/u.m3u8";//"http://v-play.coocaatv.com/0915/chenghongniandai2.mp4";


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
        
        //有问题:
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
//				$("#salvage").trigger("focus");
			}
		});		
	},
	
	//注册按键
	registerKeyHandler: function()	{
		console.log("---in registerKeyHandler-----");
        
        //注册按键
		$(".coocaa_btn").bind("itemClick", function() {
				_Index1 = $(".coocaa_btn").index($(this));
				console.log("itemClick _Index1 = " + _Index1);
				
				//关闭主页,避免从playback页面返回时闪一下主页
				$("#homeTitleDivId").css("display", "none");
				$("#homtContentDivId").css("display", "none");
				//启动播放
				playVideo(_Index1);
		});
		
		$(".coocaa_btn").bind("itemFocus", function() {
			_Lindex = $(".coocaa_btn").index($(this));
			console.log("----------focus-----"+_Lindex);
//			$(".coocaa_btn")[_Lindex].style.color = "#cccccc";
			focusShift(_Lindex);
		});
		
//		$(".coocaa_btn").bind("itemBlur", function() {
//			_Lindex = $(".coocaa_btn").index($(this));
//			console.log("----------blur----"+_Lindex);
//			$(".coocaa_btn")[_Lindex].style.color = "#000000";
//		});
		
//		$(".coocaa_btn2").bind("itemFocus", function(){
//			_Lindex = $(".coocaa_btn2").index($(this));
//			console.log("----------coocaa_btn2 focus-----"+_Lindex);
////			$(".coocaa_btn2")[_Lindex].style.color = "#cccccc";			
//		});
				
//		$(".coocaa_btn2").bind("itemBlur", function() {
//			_Lindex = $(".coocaa_btn2").index($(this));
//			console.log("----------coocaa_btn2 blur----"+_Lindex);
//			$(".coocaa_btn2")[_Lindex].style.color = "#000000";
//		});
		
		$(".coocaa_btn2").bind("itemClick", function() {
			_Index1 = $(".coocaa_btn2").index($(this));
			console.log("------coocaa_btn2 itemClick _Index1 = " + _Index1);
			
			//响应用户选择（重播或返回)
			replayOrReturn(true);
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
    	//从服务器获取所有视频信息
    	var myUrl = "http://tc.skysrt.com/appstore/appstorev3/onlineHelp.html";
	
		$.ajax({
			type: "get",
			async: true,			
			url: myUrl,
			dataType: "jsonp",
			jsonp: "callback",
			success: function(data) {
				var questions = new Array(); 
				var answers = new Array();

				//调试用:
				questions = [
					"从使用遥控器开始"
					,"挑选想看的内容"
					,"播放中会用到"
					,"看过的去哪里找"
					,"购买会员和登录"
					,"怎么看电视台"
					,"试试和电视说话"
					,"用电视看手机上的视频和照片"
					,"还能用电视做什么"
					,"有问题或想了解更多用法怎么办"
					,"数组可以用一个变量名存储所"
					,"且可以用变量名访问任"
					,"数组中的每个元素都有自己"
					,"以便它可以很容易地被访问"
					,"创建一个数组，有三种"
					,"面的代码定义了一个名为 m"
				];

				var len = data.data.length;
				console.log("server data len:"+len);
				
				var i = 0;
				var tmpId;
				var tmpImg;
				var targetPos;
				
				//测试用
				
				//有超过一个页面的内容时（8个),需要动态创建新videoDiv
				for(i=8;i<len;i++) {
					console.log("beyond 7, now i:"+i+", need append baseDivComponent.");
					$(".homeContentDivClass").append($(".homeContentDivClass .baseDivComponent:last-child").clone(true));
					//设置id
					$(".baseDivComponent:last").attr("id",tmpId);
					//设置焦点转移属性:
				}
				
				//测试用,多放一倍的数据
				for(i=len;i<10;i++) {
					console.log("beyond 7, now i:"+i+", need append baseDivComponent.");
					tmpId = "videoDivId"+i;
					$(".homeContentDivClass").append($(".homeContentDivClass .baseDivComponent:last-child").clone(true));
					//设置id
					$(".baseDivComponent:last").attr("id",tmpId);
					//设置焦点转移属性:
				}
				
//				for(i=0; i<len; i++) {
				//测试用
				for(i=0; i<10; i++) {					
//					questions.push(data.data[i].question);
//					answers.push(data.data[i].answerList);
					
					tmpId = "videoDivId"+i;
					console.log("now i:"+tmpId);
					
					//为视频块填充内容
//					tmpImg = '<img src="'+answers[0]+'" class="imgPreviewClass"></img>';
					//测试用
					tmpImg = '<img></img>';
					$("#"+tmpId+" .videoPreviewClass").append(tmpImg);					
					$("#"+tmpId+" .pTitleClass").text(questions[i]);
					$("#"+tmpId+" .pDurationClass").text('3\'20"');					
				}
				
				//测试用
				loadTestImg();
				
				console.log("--------------------loading coocaamap");	
				map = new coocaakeymap($(".coocaa_btn"), document.getElementsByClassName("coocaa_btn")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});

				//debug only.
				console.log("questions array: \n" + questions);
				console.log("answers array: \n" + answers);
			},
			error: function() {
				console.log("fail showStudyVideos.");
			}
		});
    	
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

//启动播放,不能控制快进快退 暂停继续;
function playVideo(index) {
		console.log("playVideo -start--_startPlaying:true-");
//		_czc.push(["_trackEvent",category,action,label,value,nodeid]);
		//开始播放时,设置flag; 只有正常播完才会被设为false
		_bPlayDisrupted = true;
		
//		var _cName = $(".videoPreviewClass")[index].attr("videoName");
//		var _cUrl = $(".videoPreviewClass")[index].attr("videoUrl");
//		console.log(_cName+"--"+_cUrl);
		
		var _cName = "chenghongniandai2";
		coocaaosapi.startCommonWebview("qxhd", _cUrl, _cName, "1080", "1920", "", "视频广告", "赢机会任务弹窗", function(message) {
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


function loadTestImg() {
	var pic2 = app.rel_html_imgpath(__uri("../img/thumbnail.png"));
	console.log("==="+pic2+' '+typeof pic2);
	$("img").attr("src", pic2);
	$("img").addClass("imgPreviewClass");
}
