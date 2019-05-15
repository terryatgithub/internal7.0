//测试临时配置,正式发布时需要改为正式配置:
//var _couponCheckUrl = 'http://beta.active.tc.skysrt.com/coupon_receive/couponInfoTo?couponId=';

//正式配置:
var _couponCheckUrl = 'http://active.tc.skysrt.com/coupon_receive/couponInfoTo?couponId=';

//全局变量
var _paramsQuery = ['couponId', 'points', 'gradeLevel'];
var _resultQuery = [];
var _couponNum = 0;//优惠券数量
var _couponNumTmp = 0;//计数用的优惠券数量
var _couponShopNum = 0;//购物优惠券数量
var _couponMovieNum = 0;//影视优惠券数量
var _couponEduNum = 0;//教育优惠券数量
var _couponInfos = [];//优惠券详情

//页面部分的逻辑
var app = {
    // Application Constructor
    initialize: function() {
		//初始落焦
		map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn")[0], "btn-focus", function() {}, function(val) {}, function(obj) {});
        getGiftDetails();
        app.triggleButton();
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
		//注册按键监听
		app.registerKeyHandler();
	}
    
};

app.initialize();

function messageFromLiteNative(msg) {
	console.log("messageFromLiteNative===>msg: " + msg);
	if(msg == 3){
		console.log('home button..')
		window._liteNativeApi.exitAll();	
	}else if(msg == 4){
		console.log('back button..')
		window._liteNativeApi.exit();	
	}
}
function initFirstPage() {
	var img = _resultQuery[2];
	if(img<1) {img = 1};
	if(img>7) {img = 7};
	img = 'img/'+img+'.png';
	$('#title').css('background-image', 'url('+img+')');
	
	var tips = '您可获得: ';
	if(_resultQuery[1] > 0){
		tips += '<span>'+_resultQuery[1] + '</span>金币';
	}
	if(_couponShopNum > 0){
		tips += '/ <span>'+_couponShopNum+'张</span>购物优惠券';
	}
	if(_couponMovieNum > 0){
		tips += ' / <span>'+_couponMovieNum+'张</span>影视优惠券';
	}
	if(_couponEduNum > 0){
		tips += ' / <span>'+_couponEduNum+'张</span>教育优惠券';
	}
	console.log('tips: '+tips);
	$('#prizelist').html(tips);
	
	updateGiftDetailsOnPage();
}

function openGiftBox(){//开奖动画
	console.log('openGiftBox..')
	$('#prizeIconShow').css('display', 'none');
	$('#prizeIconOpen').css('display', 'block');
	setTimeout(showGiftDetails, 2500);
}

function showGiftDetails() {//显示奖品明细页
	$('#title').css('background-image', 'url(img/titleOK.png)');
	$('#prizelist').css('display','none');
	$('#prizeIconOpen').css('display','none');
	$('#button').text('查看更多');
	
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
			console.log('go userinfo page..')
			goUserInfoPage();
			break;
	}
}
function goUserInfoPage() {//进入个人信息页
	console.log('_liteNativeApi, go user page...')
	window._liteNativeApi.exitAll();	//进入个人信息页时，退出所有web页面，避免后续bug：在个人信息页再进入web页面（影视vip页面等）时还会显示升级奖励弹窗的bug）
	var startParams = {
		packageName: "com.tianci.movieplatform",
		actionName: "coocaa.intent.action.HOME_MEMBER_CENTER"
	};
	var startParamsStr = JSON.stringify(startParams);
	console.log(startParamsStr);
	window._liteNativeApi.start(startParamsStr);
}

function getQueryString(name) {//获取url中的参数
	console.log('window.location:'+window.location)
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
	if(_resultQuery[0]) {
		_resultQuery[0]=_resultQuery[0].split(',');	
		_couponNumTmp = _couponNum = _resultQuery[0].length;
		_resultQuery[0].forEach(getCouponDetails)
	}else {//如果没有优惠券
		initFirstPage();
	}
	console.log('coupon num:'+_couponNum+', coupon id: '+_resultQuery[0]);
}
function parseCouponInfos(info) {//解析优惠券需要显示的内容
	var name;
	if(info.businessLine == 'education') {
		_couponEduNum++;
		name = '教育优惠券';
	}else if(info.businessLine == 'movie') {
		_couponMovieNum++;
		name = '影视优惠券';
	}else{ // if(info.businessLine == 'tvmall') 
		_couponShopNum++;
		name = '购物优惠券';
	}
	var value;
	//如果是折扣优惠券，显示x折； 如果是现金优惠券，显示xx元
	if(info.preferentialType == 'discount') {
		value = info.preferentialDiscount;
		if(value < 10) {
			value = '0.'+value+'<span>折</span>';
		}else if(value <= 100) {
			value = value/10+'<span>折</span>';
		}
	}else if(info.preferentialType == 'price') {
		value = info.preferentialPrice/100 + '<span>元</span>';
	}
	//有效期
	if(info.effectiveEndTime) {
		var d = new Date(info.effectiveEndTime);
		var expire = '有效期: '+d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
	}else if(info.effectiveDays) {
		var expire = '有效期: 领取后'+info.effectiveDays+'天内有效'
	}
	var o = {
		'name': name,
		'value': value,
		'expire': expire
	}
	_couponInfos.push(o);	
	
	//全部优惠券信息获取完毕后：
	if(--_couponNumTmp == 0) {
		console.log('all has been done. finally')
		console.log(_couponInfos)
		initFirstPage();
	}
	console.log('_couponNumTmp: '+_couponNumTmp)
}
function getCouponDetails(id){ //获取优惠券详细
	console.log('getCouponDetails id:'+id);
    $.ajax({
        type: "get",
        async: true,
        timeout: 5000,
        url: _couponCheckUrl+id,
        dataType: "jsonp",
        success: function(data) {
            console.log("-getCouponDetails success--"+JSON.stringify(data));
            if(data && data.code == 0 && data.data) {
            	parseCouponInfos(data.data)
            }
        },
        error: function(error) {
            console.log("-getCouponDetails fail--" + JSON.stringify(error));
        }
    });	
}
 
function updateGiftDetailsOnPage() {//更新页面奖品信息
	console.log('updateGiftDetailsOnPage..');
	//todo: 暂时策略：	//最多展示6个,多余不展示，不方便实现
	var MAXNUM = 6;
	
	var itemNum = _couponNum;//总展示奖品个数
	if(_resultQuery[1] > 0) {//金币数大于0
		itemNum++;
	}
	if(itemNum > MAXNUM) {
		itemNum = MAXNUM;
	}
	console.log('itemNum: '+itemNum);
	if(itemNum == 1) {
		$('#prizeZone').css('width', '400px');
	}
	
	for(var i = 0; i<itemNum-1; i++) {
		console.log('append: '+i)
		var e = $('.prizeItem:first').clone();
		$('#prizeZone').append(e);
	}
	//金币
	if(_resultQuery[1] > 0) {
		$('.prizeItem:first').addClass('coinitem')
		$('.prizeitem_num:first').text(_resultQuery[1]);
		$('.prizeitem_title:first').text('金币');
	}
	//优惠券
	for(var i = 0; i<itemNum-1; i++) {
		console.log('update: '+i)
		$('.prizeItem').eq(i+1).addClass('couponitem')
		$('.prizeitem_num').eq(i+1).html(_couponInfos[i].value);
		$('.prizeitem_title').eq(i+1).text(_couponInfos[i].name);
		$('.prizeitem_expire').eq(i+1).text(_couponInfos[i].expire);	
	}
}
