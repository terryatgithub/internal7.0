var _partNum = 0;//第几个Tab
var _curQuesNum = 0;//当前第几个问题
var _feedBackArr = new Array();
var _fbItemClick = 0;//问题反馈勾选的个数
var _phone = "";
var _allDataObj=null;
$(function() {
	console.log("--------------------loading");
	getJsonData();
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
		$("#quesListTitle").html($(".allText1")[_fIndex].innerHTML);
		allQuesPageShow(_fIndex,_allDataObj[1].category2[_fIndex]);
	});
	$(".feedBacks").unbind("itemClick").bind("itemClick", function() {
		var _fIndex = $(".feedBacks").index($(this));
		console.log(_fIndex);
		if (_fIndex == 5) {
			secondPageShow("#otherFeedBackPage");
		} else{
			feedBackPageShow(_allDataObj[2].data[_fIndex]);
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
	$("#otherQuesFeed").unbind("itemClick").bind("itemClick", function() {
		$("#mainPage").css("display","block");
		$("#secondPage").css("display","none");
		$("#allQuesPage").css("display","none");
		$("#feedBackTab").trigger("focus");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementsByClassName("feedBacks")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});
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
				map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("fbResultFail"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				setTimeout(dialogHide,5000);
			} else{
				console.log("提交失败");
				$("#fbResultFail").css("display","block");
				map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("fbResultFail"), "btn-focus", function() {}, function(val) {}, function(obj) {});
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
    $("#submitItem5").bind('itemClick', function(event) {
    	var arr1 = $("#submitItem5").attr("arr1");
    	var arr2 = $("#submitItem5").attr("arr2");
    	conAnsPageShow(_allDataObj[1].category2[arr1][arr2]);
    });
    $("#submitItem6").bind('itemClick', function(event) {
    	var arr1 = $("#submitItem6").attr("arr1");
    	var arr2 = $("#submitItem6").attr("arr2");
    	conAnsPageShow(_allDataObj[1].category2[arr1][arr2]);
    });
    $("#fbResultSuccess").bind('itemClick', function(event) {
    	$("#fbResultSuccess").css("display","none");
    	$("#thirdPage").css("display","none");
    	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
    });
    $("#fbResultFail").bind('itemClick', function(event) {
    	$("#fbResultFail").css("display","none");
    	$("#thirdPage").css("display","none");
    	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
    });
    $("#otherQrcodeBox").bind('itemClick', function(event) {
    	$("#otherFeedBackPage").css("display","none");
    	$("#secondPage").css("display","none");
		$("#mainPage").css("display","block");
    	map = new coocaakeymap($(".coocaa_btn"), document.getElementById("feedBack6"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    });
}

function buttonInitAfter(){
	$(".comQuesItem").unbind("focus").bind("focus", function() {
		var _fIndex = $(".comQuesItem").index($(this));
		var _eachheight = $(".comQuesItem")[_fIndex].offsetHeight + 5;
		var myScrollTopValue = _fIndex * _eachheight;
		console.log(_fIndex+"---"+_eachheight+"--"+myScrollTopValue);
		$("#conItem1").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing"});
	});
	$(".comQuesItem").unbind("itemClick").bind("itemClick", function() {
		var _fIndex = $(".comQuesItem").index($(this));
		$("#secondPage").css("display","block");
		$("#mainPage").css("display","none");
		$("#conAnsPage").css("display","block");
		conAnsPageShow(_allDataObj[0].data[_fIndex]);
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
		var _arr1 = $(this).attr("arr1");
		console.log(_arr1+"--"+_fIndex);
		$("#conAnsPage").css("display","block");
		$("#allQuesPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		console.log(_allDataObj[1].category2[_arr1][_fIndex]);
		conAnsPageShow(_allDataObj[1].category2[_arr1][_fIndex]);
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
}
//获取json数据
function getJsonData(){
	$.getJSON('js/data2.json',function(data){
		console.log(data);
		_allDataObj = data;
		commonQuesList(_allDataObj[0].data);
	});
}
function commonQuesList(arr){
	console.log(arr);
	for (var i=0;i<arr.length;i++) {
		var _div = null;
		if (i==0) {
			_div = '<div id="comQues'+i+'" class="coocaa_btn comQuesItem ellipsis" upTarget="#commonQuesTab">'+arr[0].name+'</div>';
		} else{
			_div = '<div id="comQues'+i+'" class="coocaa_btn comQuesItem ellipsis" upTarget="#comQues'+(i-1)+'">'+arr[i].name+'</div>';
		}
		$("#conItem1").append(_div);
	}
	map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	buttonInitAfter();
}
function conAnsPageShow(obj){
	$("#conAnsTitle").html(obj.name);
	$("#conAnsTitle1").html(obj.answer[0].text);
	$("#conAnsTitle2").html(obj.answer[1].text);
	$("#conAnsInfo1").html(obj.answer[0].detail);
	$("#conAnsInfo2").html(obj.answer[1].detail);
	$("#firstAnsImg1").attr("src",obj.answer[0].img);
	$("#firstAnsImg2").attr("src",obj.answer[1].img);
	var arr1 = obj.related[0][0];
	var arr2 = obj.related[0][1];
	var arr3 = obj.related[1][0];
	var arr4 = obj.related[1][1];
	$("#submitItem5").html(_allDataObj[1].category2[arr1][arr2].name);
	$("#submitItem6").html(_allDataObj[1].category2[arr3][arr4].name);
	$("#submitItem5").attr("arr1",arr1);
	$("#submitItem5").attr("arr2",arr2);
	$("#submitItem6").attr("arr1",arr3);
	$("#submitItem6").attr("arr2",arr4);
	
	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	$("#submitItem2").trigger("focus");
}

function allQuesPageShow(index,arr){
	console.log(arr);
	$("#secondPage").css("display","block");
	$("#mainPage").css("display","none");
	$("#allQuesPage").css("display","block");
	
	for (var i=0; i<arr.length; i++) {
		var _div = null;
		if (i==0) {
			_div = '<div id="allQues'+i+'" arr1="'+index+'" class="coocaa_btn2 allQueItem ellipsis" upTarget="#allQues0">'+arr[0].name+'</div>';
		} else{
			_div = '<div id="allQues'+i+'" arr1="'+index+'" class="coocaa_btn2 allQueItem ellipsis" upTarget="#allQues'+(i-1)+'">'+arr[i].name+'</div>';
		}
		$("#quesListBox").append(_div);
	}
	buttonInitAfter();
	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	$("#allQues0").trigger("focus");
}

function feedBackPageShow(obj){
	$("#secondPage").css("display","block");
	$("#mainPage").css("display","none");
	$("#feedBackPage").css("display","block");
	console.log(obj.situation);
	$("#feedBackTitle").html(obj.name);
	$("#feedBackTitle2").html(obj.title);
	
	for (var i=0; i<obj.situation.length; i++) {
		var _div = null;
		if (i==0) {
			_div = '<div id="fbQues'+i+'" class="coocaa_btn2 fbQueItem"><div class="fbQuetext ellipsis">'+obj.situation[i]+'</div><div class="labelBox"><div class="labelText"></div></div></div>';
		} else{
			_div = '<div id="fbQues'+i+'" class="coocaa_btn2 fbQueItem"><div class="fbQuetext ellipsis">'+obj.situation[i]+'</div><div class="labelBox"><div class="labelText"></div></div></div>';
		}
		$("#feedBackListBox").append(_div);
	}
	buttonInitAfter();
	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	$("#fbQues0").trigger("focus");
	
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
