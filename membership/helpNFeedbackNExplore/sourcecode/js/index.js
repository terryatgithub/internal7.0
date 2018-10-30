var _btnLine = 0;
var _curQuesNum = 0;//当前第几个问题
var _curLength = 0;//当前问题有几条子项
var arrLength = ["2","3","2","2","2","2","2"];
var arrName = ["#ansBox0","#ansBox1","#ansBox2","#ansBox3","#ansBox4","#ansBox5","#ansBox6"];
var myScrollTopValue = 0;
var _parentIndex = 0;

$(function() {
	console.log("--------------------loading");
//	map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	buttonInit();
});

function buttonInit(){
	$(".optionenum").unbind("itemClick").bind("itemClick", function() {
		$(".listItem:visible:eq(0)").css("opacity","1");
		var _cIndex = $(".optionenum").index($(this));
		_curLength = arrLength[_cIndex];
		_curQuesNum = _cIndex;
		console.log(_cIndex);
		$("#mainPage").css("display","none");
		$("#secondPage").css("display","block");
		$(".partPages").siblings().css("display","none");
		$(".partPages:eq("+_cIndex+")").css("display","block");
		map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
		$(".coocaa_btn2:visible:eq(0)").trigger("focus");
	});
	$(".eachYONBtns").bind("focus", function(event){
		var _FocusIndex = $(".eachYONBtns:visible").index($(this));
		var _thisParentClassname = $(".eachYONBtns:visible")[_FocusIndex].parentNode.className;
       	var _grandFather = $(".eachYONBtns:visible")[_FocusIndex].parentNode.parentNode.id;
       	console.log(_FocusIndex+"---"+_grandFather+"---"+_thisParentClassname);
       	var _obj = "#"+_grandFather+" .divPart";
        var _thisParentIndex = $("."+_thisParentClassname).index($(".eachYONBtns")[_FocusIndex].parentNode);
        console.log(_obj+"---"+_thisParentIndex+"---"+$(_obj)[0].offsetHeight);
       	$(".listItem").siblings().css("opacity","0.4");
       	$(".listItem:visible:eq("+_thisParentIndex+")").css("opacity","1");
       	for (var i=0; i<_thisParentIndex; i++) {
        	myScrollTopValue += $(_obj)[i].offsetHeight;
        }
        if (_thisParentIndex != _parentIndex) {
        	$("#"+_grandFather).css("transform", "translate3D(0, -" + (_FocusIndex/2)*1080 + "px, 0)");
        }
        _parentIndex = _thisParentIndex;
        myScrollTopValue = 0;
	});
	$(".eachYONBtns").unbind("itemClick").bind("itemClick", function() {
		var _fIndex2 = $(".eachYONBtns:visible").index($(this));
		var _fLine = Math.floor(_fIndex2/2);
		yesOrNoClick(_curQuesNum,_fLine,_fIndex2);
	});
}
function yesOrNoClick(ques,seq,opt){
	console.log("第"+(ques+1)+"个问题的第"+(seq+1)+"列的第"+(opt%2+1)+"选项");
	if(opt%2 == 0){
		console.log("点击的是是");
	}else{
		console.log("点击的是否");
	}
	
}