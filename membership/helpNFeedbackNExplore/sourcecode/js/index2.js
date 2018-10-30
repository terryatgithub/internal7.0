var _partNum = 0;//第几个Tab
var _curQuesNum = 0;//当前第几个问题
var _feedBackArr = new Array();
var _fbItemClick = 0;//问题反馈勾选的个数
var _phone = "";

$(function() {
	console.log("--------------------loading");
	getJsonData();
	map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	buttonInit();
	$("#commonQuesTab").trigger("focus");
});

function buttonInit(){
	$(".tabItem").unbind("focus").bind("focus", function() {
		var _fIndex = $(".tabItem").index($(this));
		$(".conItems").siblings().css("display","none");
		$(".conItems:eq("+_fIndex+")").css("display","block");
		$(".tabItem").siblings().css("background-color","transparent");
		$(".tabItem:eq("+_fIndex+")").css("background-color","#007FF0");
	});
	$(".comQuesItem").unbind("focus").bind("focus", function() {
		var _fIndex = $(".comQuesItem").index($(this));
		var _eachheight = $(".comQuesItem")[_fIndex].offsetHeight + 5;
		var myScrollTopValue = _fIndex * _eachheight;
		console.log(_fIndex+"---"+_eachheight+"--"+myScrollTopValue);
		$("#conItem1").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing"});
	});
	$(".comQuesItem").unbind("itemClick").bind("itemClick", function() {
		var _fIndex = $(".comQuesItem").index($(this));
		console.log(_fIndex);
		$("#submitItem2").trigger("focus");
		_partNum = 0;
		_curQuesNum = _fIndex;
		secondPageShow("#conAnsPage");
	});
	$(".allQues").unbind("focus").bind("focus", function() {
		var _fIndex = $(".allQues").index($(this));
		console.log(_fIndex);
		var myScrollTopValue = _fIndex * 440*(-1);
		console.log(_fIndex+";"+myScrollTopValue);
		if (_fIndex<2) {
			$("#conItem2Box").stop(true, true).animate({left: myScrollTopValue}, {duration: 100,easing: "swing"});
		}
	});
	$(".allQues").unbind("itemClick").bind("itemClick", function() {
		var _fIndex = $(".allQues").index($(this));
		console.log(_fIndex);
		_partNum = 1;
		_curQuesNum = _fIndex;
		secondPageShow("#allQuesPage");
	});
	$(".feedBacks").unbind("itemClick").bind("itemClick", function() {
		var _fIndex = $(".feedBacks").index($(this));
		console.log(_fIndex);
		_partNum = 2;
		_curQuesNum = _fIndex;
		if (_fIndex == 7) {
			secondPageShow("#otherFeedBackPage");
		} else{
			secondPageShow("#feedBackPage");
		}
	});
	$(".conAnsItem").unbind("focus").bind("focus", function() {
		var _fIndex = $(".conAnsItem").index($(this));
		if (_fIndex >1) {
			$("#conAnsBox").css("top","-440px");
			$("#conAnsPoint").css("display","none");
		} else{
			$("#conAnsBox").css("top","75px");
			$("#conAnsPoint").css("display","block");
		}
	});
	$("#submitItem2").unbind("itemClick").bind("itemClick", function() {
		console.log("问题已解决。"+_partNum+"--"+_curQuesNum);
		
	});
	$("#submitItem3").unbind("itemClick").bind("itemClick", function() {
		console.log("问题未解决。"+_partNum+"--"+_curQuesNum);
		$("#mainPage").css("display","block");
		$("#secondPage").css("display","none");
		$("#conAnsPage").css("display","none");
		$("#feedBackTab").trigger("focus");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementsByClassName("feedBacks")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$(".allQueItem").unbind("focus").bind("focus", function() {
		var _fIndex = $(".allQueItem").index($(this));
		var _eachheight = $(".allQueItem")[_fIndex].offsetHeight + 5;
		var myScrollTopValue = _fIndex * _eachheight;
		console.log(_fIndex+"---"+_eachheight+"--"+myScrollTopValue);
		$("#quesListBox").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing"});
	});
	$(".allQueItem").unbind("itemClick").bind("itemClick", function() {
		var _fIndex = $(".allQueItem").index($(this));
		console.log("_fIndex");
		$("#conAnsPage").css("display","block");
		$("#allQuesPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#otherQuesFeed").unbind("itemClick").bind("itemClick", function() {
		$("#mainPage").css("display","block");
		$("#secondPage").css("display","none");
		$("#allQuesPage").css("display","none");
		$("#feedBackTab").trigger("focus");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementsByClassName("feedBacks")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	
	$(".fbQueItem").unbind("focus").bind("focus", function() {
		var _fIndex = $(".fbQueItem").index($(this));
		var _eachheight = $(".fbQueItem")[_fIndex].offsetHeight;
		var myScrollTopValue = _fIndex * _eachheight;
		console.log(_fIndex+"---"+_eachheight+"--"+myScrollTopValue);
		$("#feedBackListBox").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing"});
	});
	$(".fbQueItem").unbind("itemClick").bind("itemClick", function() {
		var _fIndex = $(".fbQueItem").index($(this));
		console.log($(".labelText")[_fIndex].style.display);
		if ($(".labelText")[_fIndex].style.display == "block") {
			$(".labelText")[_fIndex].style.display = "none";
			_fbItemClick--;
		} else{
			$(".labelText")[_fIndex].style.display = "block";
			_fbItemClick++;
		}
	});
	$("#phoneOrQQ").unbind("itemClick").bind("itemClick", function() {
		$("#keyBox").css("display","block");
		$("#feedBackBox").stop(true, true).animate({scrollTop: 520}, {duration: 0,easing: "swing"});
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("phoneOrQQ"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#fbSubmit").unbind("itemClick").bind("itemClick", function() {
		console.log(_fbItemClick);
		if (_fbItemClick <1) {
			console.log("未选择具体问题时的提交");
			document.getElementById("errorInfo").style.display = "block";
			setTimeout("document.getElementById('errorInfo').style.display = 'none';",3000);
		}else{
			console.log("选择了具体问题时的提交");
			//提交数据
			$("#thirdPage").css("display","block");
			$('.fbdialog').siblings().css('display', 'none');
			var sendResult = false;
			if (sendResult) {
				console.log("提交成功");
				$("#fbResultSuccess").css("display","block");
				setTimeout(dialogHide,5000);
			} else{
				console.log("提交失败");
				$("#fbResultFail").css("display","block");
				setTimeout(dialogHide,20000);
			}
		}
	});
	
	$("#keyBox .coocaa_btn2:not(#sub_mobile)").bind("itemClick", function() {
        var txt = $(this).html();
        console.log(txt);
        _phone = $("#phoneOrQQ").val();
        var tphone = _phone;
        if (txt == "删除" && tphone.length >= 0) {
            tphone = tphone.substring(0, tphone.length - 1);
        } else {
            tphone = tphone + txt;
        }
        $("#phoneOrQQ").val(tphone);
    });

    $("#sub_mobile").bind('itemClick', function(event) {
       	$("#keyBox").hide();
       	map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("phoneOrQQ"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    });
}

//获取json数据
function getJsonData(){
	$.getJSON('js/data.json',function(data){
		console.log(data);
//		for (var i=0; i<imgObj.length; i++) {
//			if (imgObj[i].platform == oplatform) {
//				console.log(imgObj[i].platform+"---"+imgObj[i].ingurl);
//				document.getElementById("myImg").src = imgObj[i].ingurl;
//			}
//		}
	});
}

function dialogHide(){
	$("#thirdPage").css("display","none");
	map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("fbSubmit"), "btn-focus", function() {}, function(val) {}, function(obj) {});
}
function secondPageShow(obj){
	$("#secondPage").css("display","block");
	$("#mainPage").css("display","none");
	$(obj).css("display","block");
	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
}
