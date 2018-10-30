var cOpenId = "";
var thirdUserId = "";
var userKeyId_1 = "";
var click_user = "false";//是否点击过登录
var face = "";
var adressIp = 'http://beta.restful.lottery.coocaatv.com';
//var adressIp = 'https://restful.skysrt.com';
var userKeyId = '';
var type_Ticket = "ticket";//登录领取后调起优惠券页面来源
var Ticket = "";//普通调起优惠券
var id = getUrlParam("id");
var timeInter;
var cAppVersion = "";
var _source = null;
var codeType = ""
var t;
var myvar;

var app = {
    initialize: function() {
        this.bindEvents();
        _source = getUrlParam("source");
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbuttondown', this.onBackButtonDown, false);
        document.addEventListener("backbutton", this.handleBackButton, false);
        document.addEventListener("resume", this.onresumeButton, false);
    },
    onBackButtonDown: function() {
        closeWindow();
        // console.log("中奖弹窗状态" + document.getElementById('building').style.display); 


        if (document.getElementById('indexhtml').style.display == "block") { //首页
            if (document.getElementById('confirmInfo').style.display == "block") { //中奖弹窗
                document.getElementById('confirmInfo').style.display = "none";
                document.getElementById('popUp').style.display = "none";
                initActive("about");
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('building_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else if (document.getElementById('popUp').style.display == "block") {
                document.getElementById('popUp').style.display = "none";
                document.getElementById('confirmInfo').style.display = "none";
                initActive("about");
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('building_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else if (document.getElementById('buildPage').style.display == "block") {
                document.getElementById('buildPage').style.display = "none";
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('building_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else if (document.getElementById('no_chance').style.display == "block") {
                document.getElementById('no_chance').style.display = "none";
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('building_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            } else if (document.getElementById('popUp').style.display == "block") {
                document.getElementById('popUp').style.display = "none";
                document.getElementById('confirmInfo').style.display = "none";
                initActive("about");
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('building_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
            }else if(document.getElementById('building').style.display == "block"){
                openBg();
                console.log("盖楼中，不可返回！");

            } else {
                navigator.app.exitApp();
            }
        } else if (document.getElementById('prize').style.display == "block") { //我的奖品
            if (document.getElementById('confirmInfo').style.display == "block") {
                document.getElementById('confirmInfo').style.display = "none";
                document.getElementById('popUp').style.display = "none";
                getPrizeList();
            } else if (document.getElementById('popUp').style.display == "block") {
                document.getElementById('confirmInfo').style.display = "none";
                document.getElementById('popUp').style.display = "none";
                getPrizeList();
            }else if (document.getElementById('confirmInfo').style.display == "block") {
                document.getElementById('confirmInfo').style.display = "none";
                document.getElementById('popUp').style.display = "none";
                getPrizeList();
            } else if (document.getElementById('prize_window_box').style.display == "block") {
                document.getElementById('prize_window_box').style.display = "none";
                getPrizeList();
            } else {
                document.getElementById('prize').style.display = "none";
                document.getElementById('indexhtml').style.display = "block";
                map = new coocaakeymap($(".coocaabtn"), document.getElementById("prize_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                initActive("about");
            }
        } else if (document.getElementById('rule').style.display == "block") { //活动规则
            document.getElementById('rule').style.display = "none";
            document.getElementById('indexhtml').style.display = "block";
            map = new coocaakeymap($(".coocaabtn"), document.getElementById("rule_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        } else if (document.getElementById('myfloor').style.display == "block") { //我的楼层
            document.getElementById('myfloor').style.display = "none";
            document.getElementById('indexhtml').style.display = "block";
            map = new coocaakeymap($(".coocaabtn"), document.getElementById("building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        } else if (document.getElementById('myfloor_null').style.display == "block") { //我的楼层
            document.getElementById('myfloor_null').style.display = "none";
            document.getElementById('indexhtml').style.display = "block";
            map = new coocaakeymap($(".coocaabtn"), document.getElementById("building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        } else {
            navigator.app.exitApp();
        }

    },
    onresumeButton: function() {
    //    listenUserChange();
        console.log(Ticket+"======"+type_Ticket + "其他页面返回============" + click_user);
        closeWindow();
        document.getElementById('confirmInfo').style.display = "none";
        document.getElementById('popUp').style.display = "none";
        document.getElementById('prize_window_box').style.display = "none";
        document.getElementById('no_chance').style.display = "none";

        activeId = sessionStorage.getItem("activeId");
        awardTypeId = sessionStorage.getItem("awardTypeId");
        lotteryAwardMemberId = sessionStorage.getItem("lotteryAwardMemberId");
        awardPictureUrl = sessionStorage.getItem("awardPictureUrl");
        awardName = sessionStorage.getItem("awardName");
        awardTime = sessionStorage.getItem("awardTime");
        userEmmcId = sessionStorage.getItem("userEmmcId");
        awardId = sessionStorage.getItem("awardId");
        awardInfo = sessionStorage.getItem("awardInfo");
        userKeyId_1 = sessionStorage.getItem("userKeyId_1");

        if (Ticket == "index_ticket") { //使用优惠券后回调
            initActive("about");
        } else if (Ticket == "prize_ticket") {
            getPrizeList("about");
        }else if(Ticket == "add_chance"){
            hasLogin(false);
        }

        if (click_user == "true" && _source == "yinhe") {
          hasLogin(false);
        }else if(click_user == "true" && _source == "tencent"){
          hasLogin(true);
        }
        // if (click_user == "true" && loginstatus == "true") { //登录回调获取优惠券
        //     openBg();
        //     if (type_Ticket == "prize_ticket") {
        //         pkgEventLog("我的奖品页奖品详情弹窗优惠券登录弹窗", "登录成功");
        //         getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "prize_type");
        //     } else {
        //         pkgEventLog("国庆教育盖楼弹窗奖励优惠券登录弹窗", "登录成功");
        //         getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "index_type");
        //     }
        // } else if (click_user == "true" && loginstatus == "false") {
        //     openBg();
        //     if (type_Ticket == "prize_ticket") {
        //         pkgEventLog("我的奖品页奖品详情弹窗优惠券登录弹窗", "登录失败");
        //         getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "prize_type");
        //     } else {
        //         pkgEventLog("国庆教育盖楼弹窗奖励优惠券登录弹窗", "登录失败");
        //         getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "index_type");
        //     }
        // }

    },
    handleBackButton: function() {},
    onDeviceReady: function() {
        sessionStorage.setItem("userTrack", "1");//第一次页面暴光数据采集
        buttonEvent(); //按钮事件
        startmarquee(400, 30, 0, 1); //滚动获奖名单
        cordova.require("coocaaosapi");
        coocaaosapi.getDeviceInfo(function(message) {
            console.log(JSON.stringify(message));
            deviceInfo = message;
            userMac = message.mac;
            if(message.activeid == "" || message.activeid == undefined || message.activeid== null){
              if(message.mac == "" || message.mac == undefined || message.mac== null){
                cUDID = "undefined";
              }else{
                cUDID = message.mac;
              }
            }else{
              cUDID = message.activeid;
            }
            userModel = message.model;
            userChip = message.chip;
            cEmmcCID = message.emmcid;
            console.log("----------------获取激活ID:" + cUDID+";activeid:"+message.activeid+";mac:"+message.mac+";userModel:"+userModel);
            getSource();
      },function(error) { console.log(error);})

    },
    triggleButton:function(){
      cordova.require("coocaaosapi");
      listenUserChange();
  }
};
app.initialize();
function getSource(){
  console.log("===路径来源"+getUrlParam("type"));
  if(getUrlParam("type") == "window"){//来自弹窗
    pkgPageShow("国庆教育活动主页弹窗页面","");
    testtimeout();
    document.getElementById('mybutton').style.display = "block";
    map = new coocaakeymap($(".coocaabtn"), document.getElementById('mybutton'), "btnFocus", function() {}, function(val) {}, function(obj) {});
  }else{
    if (getUrlParam("source") == "yinhe") {
      hasLogin(false);
    } else{
      hasLogin(true);
    }
  }
}

function testtimeout(){
    timer = setTimeout(exit,15000);
}
function exit() {
    navigator.app.exitApp();
}
function buttonEvent() {
    $("#mybutton").bind('itemClick',function(event){
        console.log("点击弹窗入口"+_source);
        pkgButtonLog("国庆教育活动主页弹窗主面", "活动主页我要盖楼", "","");
        document.getElementById('mybutton').style.display="none";
        document.getElementById('indexhtml').style.display="block";
        if (_source == "yinhe") {
          hasLogin(false);
        } else{
          hasLogin(true);
        }
        clearTimeout(timer);
    });

    $("#building").bind('itemClick',function(event){
        console.log("正在盖楼，点击无效");
    });

    //优惠券使用跳转
    $("#use_submit").bind("itemClick", function() { //立即使用购物优惠券
        click_user = "false";
        if (type_Ticket = "prize_ticket") {
            Ticket = "prize_ticket";
            pkgButtonLog("我的奖品页领取奖品详情弹窗", "立即使用", "优惠券（引导使用）","");
        } else {
            Ticket = "index_ticket";
            pkgButtonLog("国庆教育盖楼弹窗奖励页", "立即使用", "优惠券（引导使用）","");
        }
        byvalue = $.trim(byvalue);
        coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
            console.log("判断失败" + error);
        });
    });


    $("#defalut_submit").bind("itemClick", function() { //立即使用购物优惠券
        console.log("启动默认跳转");
        coocaaosapi.startDefaultZone(cOpenId,function(message) {
        }, function(error) {
            console.log("判断失败"+error);
        });
    });
    //领取优惠券弹窗登录跳转
    $("#use_login").bind("itemClick", function() {
        console.log("领取优惠券弹窗登录跳转"+type_Ticket);
        if (type_Ticket == "prize_ticket") {
            pkgButtonLog("我的奖品页面", "登录领取", "无中奖纪录—未领取—未登录","");
        }else{
            pkgButtonLog("国庆教育盖楼弹窗奖励页", "登录领取", "优惠券--未登录","");
        }
        if (_source == "yinhe") {
          startLogin(false);
        } else{
          startLogin(true);
        }
    });


    //活动结束我的奖品页
    $("#login_recive_btn").bind("itemClick", function() {
        console.log("用户userkeyid========"+sessionStorage.getItem("userKeyId_1"));
        pkgButtonLog("我的奖品页", "登录领取", "无中奖记录时—活动已结束—未领取—未登录","");
        if (_source == "yinhe") {
          startLogin(false);
        } else{
          startLogin(true);
        }
    });
    //我的奖品查看信息弹窗
    $("#sure_btn,#sure_btn_ticket,#sure_btn_overlord").bind('itemClick', function(event) {
        document.getElementById('prize_window_box').style.display = "none";
        getPrizeList();
        closeWindow();
    });
    $("#submit").bind('itemClick', function(event) { //我要盖楼
        if(loginstatus == "true"){
            pkgButtonLog("国庆教育盖楼弹窗奖励页", "我要盖楼", "优惠券--已登录","");
            if(remainingTimes > 0){
                web_chance_result("盖楼奖励—优惠券奖品已登陆页面","有机会");
            }else{
                web_chance_result("盖楼奖励—优惠券奖品已登陆页面","无机会");
            }
        }else{
            pkgButtonLog("国庆教育盖楼弹窗奖励页", "我要盖楼", "优惠券--未登录","");
            if(remainingTimes > 0){
                web_chance_result("盖楼奖励—优惠券奖品未登陆页面","有机会");
            }else{
                web_chance_result("盖楼奖励—优惠券奖品未登陆页面","无机会");
            }
        }
        document.getElementById('confirmInfo').style.display = "none";
        document.getElementById('indexhtml').style.display = "block";
        document.getElementById('prize').style.display = "none";
        closeWindow();
        initActive("about");
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    });
    $("#error_submit").bind('itemClick', function(event) {
        console.log("一会再说来源"+type_Ticket);
        if(type_Ticket == "prize_type"){
            pkgButtonLog("我的奖品页——领取失败", "一会再说", "优惠券--领取失败","我的奖品——未领取——未登陆")
        }else{
            pkgButtonLog("国庆教育盖楼弹窗奖励页", "一会再说", "优惠券--领取失败","盖楼奖励——奖品领取流程——优惠券奖品——未登录")
        }
        document.getElementById('popUp').style.display = "none";
        closeWindow();
        initActive("about");
        map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    });
    $("#error_submit_again").bind('itemClick', function(event) {
        console.log("重新领取来源"+type_Ticket);
        if(type_Ticket == "prize_type"){
            pkgButtonLog("我的奖品页——领取失败", "重新领取", "优惠券--领取失败","我的奖品——未领取——未登陆");
        }else{
            pkgButtonLog("国庆教育盖楼弹窗奖励页", "重新领取", "优惠券--领取失败","盖楼奖励——奖品领取流程——优惠券奖品——未登录")
        }
        document.getElementById('popUp').style.display = "none";
        userKeyId_1 = sessionStorage.getItem("userKeyId_1");
        lastWindow(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1);
    });

    $("#prize_building_btn,#prize_building_btn1").bind("itemClick", function() {
        var id = $(this).attr("id");
        if(id == "prize_building_btn"){
            if(remainingTimes > 0){
                web_chance_result("我的奖品—无中奖记录—活动未结束时页面","有机会");
            }else{
                web_chance_result("我的奖品—无中奖记录—活动未结束时页面","无机会");
            }
        }else{
            if(remainingTimes > 0){
                web_chance_result("我的奖品页—有中奖记录页面","有机会");
            }else{
                web_chance_result("我的奖品页—有中奖记录页面","无机会");
            }
        }

        document.getElementById('prize').style.display = "none";
        document.getElementById('indexhtml').style.display = "block";
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    });

    $("#floor_building_btn,#floornull_building_btn").bind("itemClick", function() {
        var id = $(this).attr("id");
        if(id == "floor_building_btn"){
            if(remainingTimes > 0){
                web_chance_result("我的楼层—有盖楼楼层页面","有机会");
            }else{
                web_chance_result("我的楼层—有盖楼楼层页面","无机会");
            }
        }else{
            if(remainingTimes > 0){
                web_chance_result("我的楼层—无盖楼楼层页面","有机会");
            }else{
                web_chance_result("我的楼层—无盖楼楼层页面","无机会");
            }
        }

        document.getElementById('myfloor').style.display = "none";
        document.getElementById('myfloor_null').style.display = "none";
        document.getElementById('indexhtml').style.display = "block";
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    });

    $("#fresh").bind("itemClick", function() {
        pkgButtonLog("我要盖楼页面", "换一批", "有机会-未选择时","");
        changeTheDate();
    });

    $(".moulds").bind("itemClick", function() {
        var _index = $(".moulds").index($(this));
        innerHTML = $(".mouldsText1")[_index].innerHTML;
        gotoFly(innerHTML);
    });

    $("#building_btn").bind("itemClick", function() {
        console.log("我要建楼剩余机会："+remainingTimes);
        pkgButtonLog("国庆教育盖楼活动主页面", "我要盖楼", "","");
        openBg();
        if(remainingTimes > 0){
            pkgPageShow("我要盖楼页面","有机会时");
            web_chance_result("活动主页面页面","有机会");
            $("#buildPage").css("display", "block");
            $("#no_chance").css("display", "none");
            changeTheDate();
            map = new coocaakeymap($(".coocaabtn"), document.getElementById("mould1"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        }else{
            pkgPageShow("我要盖楼页面","无机会时");
            web_chance_result("活动主页面页面","无机会");
            $("#no_chance").css("display", "block");
            $("#buildPage").css("display", "none");
            map = new coocaakeymap($(".coocaabtn"), document.getElementById("add_8"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        }

    });

    $("#chance_btn,#prize_chance_btn").bind("itemClick", function() {
        if(type_Ticket == "prize_ticket"){
            pkgButtonLog("我的奖品页无奖品纪录", "更多机会", "","");
        }else{
            pkgButtonLog("国庆教育盖楼活动主页面", "更多机会", "","");
        }
        click_user = "false";
        Ticket = "add_chance";
        coocaaosapi.openEduPage("1","","", function(message) {}, function(error) {
            console.log("打开失败" + error);
        });
    });


    $("#add_3,#add_8,#add_12").bind("itemClick", function() {
        var id = $(this).attr("id");
        click_user = "false";
        Ticket = "add_chance";
        if(id == "add_3"){
            pkgButtonLog("我要盖楼——盖楼机会用完页面", "机会值+3", "","");
        }else if(id == "add_8"){
            pkgButtonLog("我要盖楼——盖楼机会用完页面", "机会值+8", "","");
        }else if(id == "add_12"){
            pkgButtonLog("我要盖楼——盖楼机会用完页面", "机会值+12", "","");
        }
        coocaaosapi.openEduPage("1","","", function(message) {}, function(error) {
            console.log("打开失败" + error);
        });
    })

    $("#floor_btn").bind("itemClick", function() {
       console.log("我的楼层");
       pkgButtonLog("国庆教育盖楼活动主页面", "我的楼层", "","");
       getMyFloors();
    });

    $("#prize_btn").bind('itemClick', function(event) {
        pkgButtonLog("国庆教育盖楼活动主页面", "我的奖品", "","");
        document.getElementById('indexhtml').style.display = "none";
        document.getElementById('prize').style.display = "block";
        getPrizeList();
    });

    $("#rule_btn").bind('itemClick', function(event) {
        document.getElementById("indexhtml").style.display = "none";
        document.getElementById("rule").style.display = "block";
        pkgPageShow("国庆教育盖楼活动规则页","");
        pkgButtonLog("国庆教育盖楼活动主页面", "活动规则", "","");
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("rule"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    });

    $("#rule").bind('itemClick', function(event) {
        document.getElementById("indexhtml").style.display = "block";
        document.getElementById("rule").style.display = "none";
        map = new coocaakeymap($(".coocaabtn"), document.getElementById("rule_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    });

    $("#toedu_btn,#prize_toedu_btn").bind('itemClick', function(event) {
        pkgButtonLog("我的奖品页活动已结束", "随便看看", "","");
        coocaaosapi.openEduPage("1","startHomePage","10738", function(message) {}, function(error) {
            console.log("打开失败" + error);
        });
    });

    $("#recive_btn").bind('itemClick', function(event) {
        pkgButtonLog("我的奖品页", "领取", "无中奖记录时—活动已结束—未领取—已登录","");
        activeId = sessionStorage.getItem("activeId");
        awardTypeId = sessionStorage.getItem("awardTypeId");
        lotteryAwardMemberId = sessionStorage.getItem("lotteryAwardMemberId");
        awardPictureUrl = sessionStorage.getItem("awardPictureUrl");
        awardName = sessionStorage.getItem("awardName");
        awardInfo = sessionStorage.getItem("awardInfo");
        awardTime = sessionStorage.getItem("awardTime");
        awardId = sessionStorage.getItem("awardId");
        userKeyId_1 = sessionStorage.getItem("userKeyId_1");
        openBg();
        getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardInfo, awardTime, userEmmcId, awardId, userKeyId_1, "prize_type");
    })
}
//监听账户变化
function listenUserChange() {
  coocaaosapi.addUserChanggedListener(function(message) {
    console.log("监听帐户变化");
    if (_source == "yinhe") {
      hasLogin(false);
    } else{
      hasLogin(true);
    }
  });
}


function hasLogin(needQQ) {
    console.log("获取用户信息");
    coocaaosapi.hasCoocaaUserLogin(function(message) {
        console.log("haslogin " + message.haslogin);
        loginstatus = message.haslogin;
        if (loginstatus == "false") {
            if (cAppVersion >= 3190030) {
                tencentWay = "both";
            } else {
                tencentWay = "qq";
            }
            user_flag = 0;
            access_token = "";
            cOpenId = "";
            thirdUserId = "";
        //    face = "http://beta.webapp.skysrt.com/zy/building/images/face.png";
            face = "https://webapp.skysrt.com/national/building/images/face.png";
            nick_name = "";
            if(click_user == "false"){//调过登录后不初始化
                initActive("index");
            }else if (click_user == "true" && loginstatus == "false") {
                openBg();
                if (type_Ticket == "prize_ticket") {
                    pkgEventLog("我的奖品页奖品详情弹窗优惠券登录弹窗", "登录失败");
                    getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "prize_type");
                } else {
                    pkgEventLog("国庆教育盖楼弹窗奖励优惠券登录弹窗", "登录失败");
                    getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "index_type");
                }
            }
        } else {
            coocaaosapi.getUserInfo(function(message) {
                console.log("funnyxxxxxx==" + JSON.stringify(message))
                userInfo = message;
                cOpenId = message.open_id;
                exterInfo = message.external_info;
                userphone = message.mobile;
                nick_name = message.nick_name;
                if(message.avatar == undefined){
                    face = qqinfo[0].face;
                }else{
                    face = message.avatar;
                }
                if (userphone == undefined) {
                    userphone = "";
                }
                coocaaosapi.getUserAccessToken(function(message) {
                    access_token = message.accesstoken;
                    if (exterInfo == "[]") {
                        exterInfo = '[{}]';
                    } else {}
                    user_flag = 1;
                    if (needQQ) {
                        qqinfo = JSON.parse(exterInfo);
                        if (qqinfo.length == 1) {
                            if (cAppVersion >= 3190030) {
                                if (JSON.stringify(qqinfo[0]) == "{}" || qqinfo[0].external_flag == "jscn") {
                                    tencentWay = "both";
                                } else {
                                    tencentWay = qqinfo[0].external_flag;
                                }
                            } else {
                                tencentWay = "qq";
                            }


                            if (qqinfo != "" && qqinfo != null && qqinfo[0].login && qqinfo[0].external_flag != "jscn") {
                                thirdUserId = qqinfo[0].external_id;
                                if (qqinfo[0].external_flag == "qq") {
                                    login_type = 1;
                                } else {
                                    login_type = 2;
                                    vuserid = qqinfo[0].vuserid;
                                    if (vuserid == undefined) {
                                        vuserid = JSON.parse(qqinfo[0].refreshToken).vuserid
                                    }
                                    if (cAppVersion < 3190030) {
                                        loginstatus = "false";
                                    }
                                }
                            } else {
                                tencentWay = "both";
                                loginstatus = "false";
                            }
                        } else {
                            var needSelectNum = 0;
                            for (var b = 0; b < qqinfo.length; b++) {
                                needSelectNum = needSelectNum + 1;
                                if (qqinfo[b].login && qqinfo[b].external_flag != "jscn") {
                                    thirdUserId = qqinfo[b].external_id;
                                    if (qqinfo[b].external_flag == "qq") {
                                        login_type = 1;
                                    } else {
                                        login_type = 2;
                                        vuserid = qqinfo[b].vuserid;
                                        if (vuserid == undefined) {
                                            vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                        }
                                        if (cAppVersion < 3190030) {
                                            loginstatus = "false";
                                            tencentWay = "qq";
                                        }
                                    }
                                    break
                                }
                                if (needSelectNum == qqinfo.length) {
                                    tencentWay = "both";
                                    loginstatus = "false";
                                }
                            }
                        }
                    } else {
                        qqinfo = JSON.parse(exterInfo);
                        for (var b = 0; b < qqinfo.length; b++) {
                            if (qqinfo[b].login) {
                                thirdUserId = qqinfo[b].external_id;
                                if (qqinfo[b].external_flag == "qq") {
                                    login_type = 1;
                                } else if (qqinfo[b].external_flag == "weixin") {
                                    login_type = 2;
                                    vuserid = qqinfo[b].vuserid;
                                    if (vuserid == undefined) {
                                        vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                    }
                                }
                                break;
                            } else {
                                thirdUserId = "";
                            }
                        }
                    }
                    if(click_user == "false"){//调过登录后不初始化
                        initActive("index");
                    }else if (click_user == "true" && loginstatus == "true") { //登录回调获取优惠券
                        openBg();
                        if (type_Ticket == "prize_ticket") {
                            pkgEventLog("我的奖品页奖品详情弹窗优惠券登录弹窗", "登录成功");
                            getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "prize_type");
                        } else {
                            pkgEventLog("国庆教育盖楼弹窗奖励优惠券登录弹窗", "登录成功");
                            getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "index_type");
                        }
                    } else if (click_user == "true" && loginstatus == "false") {
                        openBg();
                        if (type_Ticket == "prize_ticket") {
                            pkgEventLog("我的奖品页奖品详情弹窗优惠券登录弹窗", "登录失败");
                            getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "prize_type");
                        } else {
                            pkgEventLog("国庆教育盖楼弹窗奖励优惠券登录弹窗", "登录失败");
                            getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "index_type");
                        }
                    }
                }, function(error) { console.log(error); })
            }, function(error) { console.log(error); });
        }
    }, function(error) { console.log(error); });
}

function startLogin(needQQ) {
    console.log("funny+++" + tencentWay);
    closeWindow();
    click_user = "true";
    if (needQQ) {
        if (accountVersion > 4030000) {
            if (tencentWay == "qq") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_QQ", function(message) { console.log(message); }, function(error) { console.log(error); });
            } else if (tencentWay == "weixin") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) { console.log(message); }, function(error) { console.log(error); });
            } else if (tencentWay == "both") {
                coocaaosapi.startWeixinOrQQ2("TENCENT", function(message) { console.log(message); }, function(error) { console.log(error); });
            }
        } else {
            coocaaosapi.startThirdQQAccount(function(message) { console.log(message); }, function(error) { console.log(error); });
        }
    } else {
        if (deviceInfo.version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
            coocaaosapi.startUserSettingAndFinish2(function(message) { console.log(message); }, function(error) { console.log(error); });
        } else {
            coocaaosapi.startUserSettingAndFinish(function(message) { console.log(message); }, function(error) { console.log(error); });
        }
    }
}

//首页楼层
var scrtime;
function getAllFloors(type){
//    clearInterval(scrtime);
//    console.log("首页楼层"+adressIp + "/building/getAllFloors");
//    $("#con").stop(true,true);
    $.ajax({
        async: false,
        url: adressIp + "/building/getAllFloors",
        type: "get",
        data: {
        "size": 6,
        "id":id,
        },
        dataType: 'json',
        success: function(data) {
            if(data.code == 50100){
                console.log("==首页楼层"+ data.data.length);
                document.getElementById("con").innerHTML = "";
                // var max_buildId = data.data[0].buildingId;
                // console.log("用户上次访问最大楼层"+localStorage.getItem("user_max"));
                // if(type == "index"){
                //     if(localStorage.getItem("user_max")){
                //         if(max_buildId - localStorage.getItem("user_max") <= 6){
                //             var length = 6
                //         }else{
                //             var length = max_buildId - localStorage.getItem("user_max");
                //         }
                //     }else{
                //         var length = data.data.length;
                //     }
                // }else{
                //     console.log("其他页面返回");
                //     var length = 6;
                // }
                //localStorage.setItem("user_max",max_buildId);
                //console.log("当前最大楼层："+max_buildId+"=====总楼层："+data.data.length+"====本次展示："+length);
                for(var i=0;i<data.data.length;i++){
                    buildingId = data.data[i].buildingId+"#";//楼层号
                    buildingMsg = data.data[i].buildingMsg;//盖楼信息
                    userImg = data.data[i].userImg;//用户头像
                    var list = '<div class="floor_box clearfix"><ul class="clearfix"><li><span class="user_face"><img src="'+userImg+'"/></span></li><li class="user_words"><p>'+buildingMsg+'</p><span class="floor_num">'+buildingId+'</span></li></ul></div>';
                    $("#con").append(list);
                }
                // if(length > 6){
                //     liFirstHeight = (length * 128) - 768;
                //     $("#con").css({ top: "-" + liFirstHeight + "px" });
                //     scroll_news("scroll");
                // }else{
                //     $("#con").css({ top: "0px" });
                //     scroll_news("stop_6");
                // }

                if(data.data.length < 6){
                    liFirstHeight = 768 - (data.data.length * 128) ;
                    $("#con").css({ top: liFirstHeight + "px" });
                }else{
                    $("#con").css({ top: "0px" });
                }


            }else{
                  console.log("暂无楼层");
            }
        },
        error: function(err){
          console.log("error-------------"+JSON.stringify(err));
          _czc.push(['_trackEvent', cOpenId, JSON.stringify(err), '首页楼层', '']);
        }
    })
}

// function scroll_news(type){
//     var $ul = $("#con");
//     var liFirstHeight = $("#con").css("top");
//     scrtime = setInterval(function scrolllist() {
//         if(type == "stop_6"){
//             console.log("stop_6暂停"+liFirstHeight);
//             $ul.pause();//暂停动画
//             clearInterval(scrtime);
//         }else{
//             liFirstHeight = parseInt(liFirstHeight) + 128;
//             $ul.animate({ top: + liFirstHeight+ "px"  }, 1500, function () {
//                 if(liFirstHeight == 0){
//                     console.log("暂停"+liFirstHeight);
//                     $ul.pause();//暂停动画
//                     clearInterval(scrtime);
//                 }
//             });
//         }
//     }, 3300);
// }


//初始化接口
function initActive(type) {
    clickFlag = "true";
    type_Ticket = "index_ticket";
    click_user = "false";
    getAllFloors();
    // if(type == "index"){
    //     getAllFloors("index");
    // }else{
    //     getAllFloors("about");//其他页面返回时初始化调取最新6条数据
    // }
    document.getElementById('indexhtml').style.display = "block";
    document.getElementById('popUp').style.display = "none";
//    console.log("初始化接口地址"+adressIp+"/building/init?cUDID="+cUDID+"&userKeyId="+cOpenId+"&thirdUserId="+thirdUserId+"&cOpenId="+cOpenId+"&cModel="+userModel+"&cChip="+userChip+"&MAC="+userMac+"&cEmmcCID="+cEmmcCID);
    $.ajax({
        async: false,
        url: adressIp + "/building/init",
        type: "post",
        data: {
        "cUDID": cUDID,
        "thirdUserId": thirdUserId,
        "cOpenId": cOpenId,
        "cModel": userModel,
        "cChip": userChip,
        "MAC": userMac,
        "id":id,
        "cEmmcCID":cEmmcCID
        },
        dataType: 'json',
        success: function(data) {
            closeWindow();
            console.log(loginstatus+"初始化" + JSON.stringify(data));
            codeType = data.code;
            userKeyId_1 = data.data.userKeyId;
            document.getElementById("building").style.display="none";
            params = {
                "cUDID": cUDID,
                "userKeyId": data.data.userKeyId,
                "thirdUserId": thirdUserId,
                "cOpenId": cOpenId,
                "cModel": userModel,
                "cChip": userChip,
                "MAC": userMac,
                "userEmmcId":cEmmcCID,
                "id":id
            };
            if (data.code == 50002) { //活动未开始
                activeBeginTime = data.data.activeBeginTime;
                systemTime = data.data.systemTime;
                var str = JSON.stringify(data.data.activeBeginTime);
                console.log(str);
                year = str.substring(1, 5);
                month = str.substring(6, 8);
                day = str.substring(9, 11);
                hour = str.substring(12, 14);
                minute = str.substring(15, 17);
                second = str.substring(18, 20);
                //  console.log("年:"+year+"月："+month+"日："+day+"时:"+hour+"分:"+minute+"秒:"+second);
                clearInterval(timeInter);
                i = (new Date(systemTime)).getTime() - 1000;
                ShowCountDown(year, month, day, hour, minute);
                timeInter = window.setInterval(function() {
                    i = i + 1000;
                    ShowCountDown(year, month, day, hour, minute);
                }, 1000);
                $("#startdDraw").show();
                $("#demo").hide();
                $("#rule_btn").addClass('not_beginRule').attr({ upTarget: "#rule_btn", leftTarget: "#rule_btn" }).show();
                map = new coocaakeymap($(".coocaabtn"), document.getElementById("rule_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                $("#g_00").html("没动未开始");
                if (sessionStorage.getItem("userTrack") == "1") {
                    sessionStorage.setItem("userTrack", "2");
                    pkgPageShow("国庆教育盖楼活动主页面", "活动未开始");
                }

            } else if (data.code == 50003) { //已结束
                console.log('活动结束');
                $("#drawend").show();
                $("#awardList").show();
                $("#rule_btn").addClass('end_ruleBtn').show();
                $("#prize_btn").addClass('end_prizeBtn').show();
                $(".floor,#startdDraw,.floor_btn,.chance_btn,.building_btn,#demo,.foot").hide();
                getNameList();
                setInterval(getNameList, 60000);
                map = new coocaakeymap($(".coocaabtn"), document.getElementById('prize_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                if (sessionStorage.getItem("userTrack") == "1") {
                    sessionStorage.setItem("userTrack", "2");
                    pkgPageShow("国庆教育盖楼活动主页面", "活动已结束");
                }
            } else {
                console.log('活动进行中');
                $("#g_00").html("");
                $(".floor,#startdDraw,.prize_btn,.floor_btn,.chance_btn,.building_btn,#demo,#rule_btn,.foot").show();
                $("#rule_btn").removeClass('not_beginRule').attr({ upTarget: "", leftTarget: "" });
                clearInterval(myvar);
                getWinning();//滚动中奖名单
                if (sessionStorage.getItem("userTrack") == "1") {
                    sessionStorage.setItem("userTrack", "2");
                    pkgPageShow("国庆教育盖楼活动主页面", "活动进行中");
                }
                if (data.code == 50100) { //有领取资格，且在当前推荐位时间段内
                    remainingTimes = data.data.remainingTimes;//剩余次数
                    chanceSource = data.data.chanceSource;
                    console.log("=====剩余次数====" + remainingTimes);
                    $(".foot span").html(remainingTimes);
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById("building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                } else if (data.code == 50004) {
                    remainingTimes = data.data.remainingTimes;
                    $(".foot span").html(remainingTimes);
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById("chance_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }
            }

        },
        error: function(err){
          console.log("error-------------"+JSON.stringify(err));
          _czc.push(['_trackEvent', cOpenId, JSON.stringify(err), '初始化', '']);
        }
    });

}
//盖楼动画
function gotoFly(innerHTML) {
    pkgPageShow("我要盖楼页面","提交盖楼时");
    document.getElementById("building").style.display = "block";
    map = new coocaakeymap($(".coocaabtn"), document.getElementById("building"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    $("#buildPage").hide();
    setTimeout(function(){sendFlyInfo(innerHTML);},7000);
//    sendFlyInfo(innerHTML);
}
//盖楼
function sendFlyInfo(innerHTML) {
    // var url = adressIp + "/building/start?cUDID"+cUDID+"&cOpenId="+cOpenId+"&MAC="+userMac+"&id="+id+"&cEmmcCID="+cEmmcCID+"&buildingMsg="+innerHTML+"&userName="+nick_name+"&userImg="+face;
    // console.log("开始盖楼"+url);
    var ajaxTimeoutSeven = $.ajax({
        type: "post",
        async: true,
        timeout: 5000,
        dataType: 'json',
        url: adressIp + "/building/start",
        data: {
            "cUDID": cUDID,
            "cOpenId": cOpenId,
            "MAC": userMac,
            "id":id,
            "cEmmcCID":cEmmcCID,
            "buildingMsg":innerHTML,
            "userName":nick_name,
            "userImg":face
        },
        success: function(data) {
            console.log("盖楼："+JSON.stringify(data));
            if(data.code == "50100") {
                awardName = data.data.awardName;
                awardTypeId = data.data.awardTypeId;
                lotteryAwardMemberId = data.data.lotteryAwardRememberId;
                awardExchangeFlag = data.data.awardExchangeFlag;
                awardId = data.data.awardId;
                awardPictureUrl = data.data.awardUrl;
                awardInfo = data.data.awardInfo;
                awardInfo = JSON.stringify(data.data.awardInfo);
                awardTime = data.data.awardTime;
                activeId = data.data.activeId;
                userEmmcId = data.data.userEmmcId;
                userKeyId_1 = data.data.userKeyId;
                if (!data.data.awardComments) {
                    awardComments = "";
                } else {
                    awardComments = data.data.awardComments;
                }
                sessionStorage.setItem("awardName", data.data.awardName);
                sessionStorage.setItem("awardTypeId", data.data.awardTypeId);
                sessionStorage.setItem("lotteryAwardMemberId", data.data.lotteryAwardRememberId);
                sessionStorage.setItem("awardExchangeFlag", data.data.awardExchangeFlag);
                sessionStorage.setItem("awardId", data.data.awardId);
                sessionStorage.setItem("awardPictureUrl", data.data.awardUrl);
                sessionStorage.setItem("awardInfo", JSON.stringify(data.data.awardInfo));
                sessionStorage.setItem("awardTime", data.data.awardTime);
                sessionStorage.setItem("activeId", data.data.activeId);
                sessionStorage.setItem("userEmmcId", data.data.userEmmcId);
                sessionStorage.setItem("userKeyId_1", data.data.userKeyId);
                sessionStorage.setItem("awardComments", data.data.awardComments);
                $(".news").show();
                $("#builduser_face img").attr('src', face);
                $("#builduser_words p").html(innerHTML);
                floorNum = data.data.awardInfo+"#";
                $("#builduser_words .floor_num").html(floorNum);
                setTimeout(function(){lastWindow(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1);},1500);
            } else if(data.code == "90101") {
                $(".news").show();
                $("#builduser_face img").attr('src', face);
                $("#builduser_words p").html(innerHTML);
                floorNum = data.data+"#";
                $("#builduser_words .floor_num").html(floorNum);
                $(".build_type").html("欧耶！盖楼成功啦！");
                console.log("没中奖"+data.data);
                setTimeout(function(){closeBuildPage();},3000);
            }else{
                initActive("index");
            }
            $(".foot span").html(remainingTimes-1);
        },
        error: function(err) {
            console.log("获取失败");
            _czc.push(['_trackEvent', cOpenId, JSON.stringify(err), '盖楼', '']);
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTimeoutSeven.abort();　　　　
            }
        }
    });
}

function closeBuildPage(){
    $("#buildPage,#building").hide();
    $(".build_type").html("正在盖楼中...");
    $(".news").hide();
    closeWindow();
    initActive("about");
//    map = new coocaakeymap($(".coocaabtn"), document.getElementById("building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
}


//找出数组重复出现的元素
function duplicates(arr) {
    var newArr = [];
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i + 1] && (newArr.indexOf(arr[i]) == -1)) {
            newArr.push(arr[i]);
            i++;

        }
    }
    return newArr;
}
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2], 'utf-8');
    return null; //返回参数值
}



function toastText(num, id, text) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).style.display = "block";
    if(num == 0) {
        setTimeout("document.getElementById('infoToast').style.display = 'none'", 3000);
    } else if(num == 1) {
        setTimeout("document.getElementById('errorToast1').style.display = 'none'", 3000);
    } else if(num == 2) {
        setTimeout("document.getElementById('errorToast2').style.display = 'none'", 3000);
    } else if(num == 3) {
        setTimeout("document.getElementById('errorToast').style.display = 'none'", 3000);
    }
}

function changeTheDate() {
    var _textArray1 = ["云起云落，静待花开", "面朝大海，春暖花开", "免单爱我，霸王单是我的", "国庆回家才最爽","你面向远方，我堵在路上","我看过了许多美景", "一家人在一起","只有回家的路不堵","太skr了","十一一线牵，珍惜这段缘","带娃出游，哪里都是家", "十一有梦就该出发","心有地图，梦有时间","能拼多远，就走多远","教育VIP，孩子会学更放心","我爱爸爸妈妈~~~","我是最可爱的小公主"];
    var _textArray2 = ["压不住，我这一颗躁动的心", "楼上的让一让，我要出去装X了", "10.1出门，人人人人我人人人人人", "我在召唤师峡谷，你在哪？", "打开朋友圈，看遍世间的繁华","出游=策马奔腾+生无可恋","去哪里不重要，重要的是身边人","人可以休息，灵魂该耍还是要耍","工作再累，也要记得回家吃饭","宅家看电视，让眼睛去旅行","给自己放个长假，但激情永不休息","相约绝地海岛，我们一起吃鸡","发出这条锦鲤，即可收到一个好消息","去我向往的无边无际，海阔天空","看人山人海，不如回家吃饭","文明出行，高逼格不如好品格","我要霸王单！！！我要免单！","我想要张君雅小妹妹零食礼包！","爸爸妈妈别担心我的作业啦！","电视做教育，在家也能学","国庆愉快！别忘了写作业~"];
    var arr1 = getRandomArrayElements(_textArray1, 3);
    var arr2 = getRandomArrayElements(_textArray2, 3);
    for(var i = 0; i < arr1.length; i++) {
        $(".mouldsText1")[0].innerHTML = arr2[0];
        $(".mouldsText1")[1].innerHTML = arr1[0];
        $(".mouldsText1")[2].innerHTML = arr1[1];
        $(".mouldsText1")[3].innerHTML = arr2[1];
        $(".mouldsText1")[4].innerHTML = arr2[2];
        $(".mouldsText1")[5].innerHTML = arr1[2];
    }
}

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while(i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}




//获得中奖名单
function getWinning(){
    $.ajax({
        async: false,
        url: adressIp+"/building/getAllRemember?id="+id+"&size=30",
        // data: {
        //     "id":id,
        //     "size":30
        // },
        type: "GET",
        dataType: 'json',
        success: function(data) {
          var demo = document.getElementById("demo");
          var demo1 = document.getElementById("demo1");
          var demo2 = document.getElementById("demo2");
          if(data.code == 50100){
            document.getElementById("goods_list").innerHTML = "";
            for(var i=0;i<data.data.length;i++){
                if (!data.data[i].userNickName) {
                    userNickName = "匿名用户";
                } else {
                    userNickName = data.data[i].userNickName;
                }
                awardName = data.data[i].awardName;
            //    $("#g_00").html("");
                var list = '<li>恭喜'+userNickName+'获得了'+awardName+'</li>';
                $("#goods_list").append(list);
                demo2.innerHTML=document.getElementById("demo1").innerHTML;

            }
          }else if(data.code == 90106){
              $("#g_00").html("【暂无中奖名单】");
          }

        },
        error: function(err){
          $("#g_00").html("");
          console.log("err-------------"+JSON.stringify(err));
          _czc.push(['_trackEvent', cOpenId, JSON.stringify(err), '活动进行中获奖名单', '']);
        }
    })


    function Marquee(){
    if(demo.scrollLeft-demo2.offsetWidth>=0){
     demo.scrollLeft-=demo1.offsetWidth;
    }
    else{
     demo.scrollLeft++;
    }
    }
    clearInterval(myvar);
    myvar=setInterval(Marquee,30);

}




//关闭弹窗阴影
function closeWindow() {
    document.getElementById('bgMask').style.display = "none";
    $('body').css({ "overflow": "visible" });
    $("#text1").html("");
    $("#text2").html("");
    $("#text3").html("");
}
//打开弹窗阴影
function openBg() {
    document.getElementById('bgMask').style.display = "block";
    $('body').css({ 'overflow': 'hidden' });
    map = new coocaakeymap($(".coocaabtn"), document.getElementById('bgMask'), "btnFocus", function() {}, function(val) {}, function(obj) {});
}

function lastWindow(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1) {
    document.getElementById('building').style.display = "none";
    $(".matter").html(awardName);
    $(".news").hide();
    console.log(userKeyId_1+"lastwindow区分来源"+type_Ticket);
    openBg();
    if (awardTypeId == 5) { //购物优惠券 || 影视VIP
        if (loginstatus == "true") {
            pkgPageShow("国庆教育盖楼弹窗奖励页", "优惠券-已登录");
            if(type_Ticket == "prize_type"){
                getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "prize_type");
            }else{
                getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "index_type");
            }
        } else {
            document.getElementById('confirmInfo').style.display = "block"; //优惠券卡密先loading
            pkgPageShow("国庆教育盖楼弹窗奖励页", "优惠券-未登录");
            pkgPageShow("国庆教育盖楼奖励优惠券登录弹窗", "");
            $("#type5").show();
            $("#type5").siblings().hide();
            $("#type5_img").attr("src", awardPictureUrl);
            if(codeType == 50003){
                document.getElementById('submit').style.display = "none";
            }else{
                document.getElementById('submit').style.display = "inline-block";
            }
            document.getElementById('use_submit').style.display = "none";
            document.getElementById('defalut_submit').style.display = "none";
            document.getElementById('use_login').style.display = "inline-block";
            map = new coocaakeymap($(".coocaabtn"), document.getElementById("use_login"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        }
    } else if (awardTypeId == 3) {
        getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, "index_type");
    }else if(awardTypeId == 8){//赞助话费流量
      pkgPageShow("国庆教育盖楼弹窗奖励页", "霸王单");
      document.getElementById('confirmInfo').style.display = "block";
      $("#type8").show();
      $("#type8").siblings().hide();
      $('#qrcode8').html("");
      generateQRCode("https://webapp.skysrt.com/national/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,8);
    //    generateQRCode("http://beta.webapp.skysrt.com/zy/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,8);
    } else if (awardTypeId == 2) { //实物
        document.getElementById('confirmInfo').style.display = "block";
        pkgPageShow("国庆教育盖楼弹窗奖励页", "实物奖品");
        $("#type2").show();
        $("#type2").siblings().hide();
        $('#qrcode2').html("");
        $("#type2_img").attr("src", awardPictureUrl);
        document.getElementById('submit').style.display = "none";
        document.getElementById('use_submit').style.display = "none";
        document.getElementById('defalut_submit').style.display = "none";
        document.getElementById('use_login').style.display = "none";
        console.log("奖品图片：" + awardPictureUrl);
        generateQRCode("https://webapp.skysrt.com/national/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,2);
    //    generateQRCode("http://beta.webapp.skysrt.com/zy/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,2);
    } else {
        console.log("其他类型奖品")
    }

}

function prizeWindow(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1) {
    $(".prize_name").html(awardName);
    openBg();
    console.log("来自我的奖品页弹窗实物奖品" + awardTypeId);
    if (awardTypeId == 2) { //实物
        pkgPageShow("我的奖品页奖品详情弹窗", "实物奖品（未填写地址）");
        document.getElementById('prize_window_box').style.display = "block";
        document.getElementById('prize_window_qrcode').style.display = "block";
        $("#prize_window_qrcode").siblings().hide();
        $('#qrcode22').html("");
        generateQRCode("https://webapp.skysrt.com/national/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,22);
    //    generateQRCode("http://beta.webapp.skysrt.com/zy/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,22);
    }else if(awardTypeId == 8) { //霸王单
        pkgPageShow("我的奖品页奖品详情弹窗", "霸王单奖品（未填写号码）");
        document.getElementById('prize_window_box').style.display = "block";
        document.getElementById('prize_overlord_qrcode').style.display = "block";
        $("#prize_overlord_qrcode").siblings().hide();
        $('#qrcode88').html("");
    
        generateQRCode("https://webapp.skysrt.com/national/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,88);
    //    generateQRCode("http://beta.webapp.skysrt.com/zy/building/address/index.html?rememberId="+lotteryAwardMemberId+"&activeId="+activeId+"&userKeyId="+userKeyId_1,88);
    } else {
        console.log("其他类型奖品")
    }

}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

//二维码生成
function generateQRCode(url, id) {
    console.log("create img--------------" + url);
    if(id == "2" || id == "8"){
        qrcode_width = "150";
        qrcode_height = "150";
    }else{
        qrcode_width = "180";
        qrcode_height = "180";
    }
    $("#qrcode" + id).qrcode({
        render: "canvas", // 渲染方式有table方式（IE兼容）和canvas方式
        width: qrcode_width, //宽度 
        height: qrcode_height, //高度 
        text: utf16to8(url), //内容 
        typeNumber: -1, //计算模式
        correctLevel: 2, //二维码纠错级别
        background: "#ffffff", //背景颜色
        foreground: "#000000" //二维码颜色
    });
    console.log("end img--------------");
    map = new coocaakeymap($(".coocaabtn"), document.getElementById("qrcode" + id), "btnFocus", function() {}, function(val) {}, function(obj) {});
}
//领奖品
function getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1, source_type) {
    console.log("第三方ID："+thirdUserId+";领奖来自页面"+source_type);
    if(source_type == "index_type"){
        type_Ticket = "index_ticket";
    }else if(source_type == "prize_type"){
        type_Ticket = "prize_type";
    }
    console.log(adressIp + "/v3/lottery/verify/receive/?cUDID=" + cUDID + "&cOpenId=" + cOpenId + "&cModel=" + userModel + "&cChip=" + userChip + "&MAC=" + userMac + "&activeId=" + activeId + "&rememberId=" + lotteryAwardMemberId + "&awardTypeId=" + awardTypeId + "&userKeyId=" + userKeyId_1 + "&thirdUserId=" + thirdUserId);
    // var obj = JSON.parse(awardInfo);
    // sponsor = obj.sponsor;
    // var exchangeType = obj.exchangeType;
    if (awardTypeId == 5 || awardTypeId == 3 || awardTypeId == 1) { //领取优惠券
        var ajaxTimeoutOne = $.ajax({
            async: false,
            timeout: 5000,
            url: adressIp + "/v3/lottery/verify/receive",
            type: "GET",
            data: {
                "cUDID": cUDID,
                "cOpenId": cOpenId,
                "cModel": userModel,
                "cChip": userChip,
                "MAC": userMac,
                "activeId": activeId,
                "rememberId": lotteryAwardMemberId,
                "awardTypeId": awardTypeId,
                "userKeyId": userKeyId_1,
                "thirdUserId": thirdUserId
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(data) {
                console.log(codeType+"--------领取信息：" + JSON.stringify(data));
                if (data.code == 50100) {
                    var cardInfo = new Array();
                    if (data.data.awardTypeId == 3) {
                        cardinfo = data.data.cardInfo;
                        pkgPageShow("8月应用抽奖抽奖结果弹窗", "第三方优惠");
                        if (source_type == "prize_type") {
                            pkgPageShow("我的奖品页奖品详情弹窗", "兑换码商品");
                            document.getElementById("prize_window_box").style.display = "block";
                            document.getElementById("prize_window_ticket").style.display = "block";
                            $("#prize_window_ticket").siblings().hide();
                            if (cardinfo.length > 1) {
                                $("#car_password_prize").html(cardinfo[0].password);
                                $("#car_password1_prize").html(cardinfo[1].password);
                            } else {
                                $("#car_password_prize").html(cardinfo[0].password);
                            }
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById('sure_btn_ticket'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        } else if (source_type == "index_type") {
                            document.getElementById("confirmInfo").style.display = "block";
                            $("#type3").show();
                            $("#type3").siblings().hide();
                            $("#type3_img").attr("src", awardPictureUrl);
                            document.getElementById('submit').style.display = "none";
                            document.getElementById('use_submit').style.display = "none";
                            document.getElementById('use_login').style.display = "none";
                            document.getElementById('defalut_submit').style.display = "none";
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById('type3'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            if (cardinfo.length > 1) {
                                $("#car_password").html(cardinfo[0].password);
                                $("#car_password1").html(cardinfo[1].password);
                            } else {
                                $("#car_password").html(cardinfo[0].password);
                            }
                        }

                    } else if (data.data.awardTypeId == 5) {
                        couponDetail = data.data.couponInfo.couponDetail;
                        if (couponDetail == 1) { //已配置
                            var data_a = data.data.couponInfo.onclickData;
                            byvalue = JSON.parse(data_a).byvalue;
                            bywhat = JSON.parse(data_a).bywhat;
                            obj = JSON.parse(data_a).param;
                            sources = new Array();
                            for (var key in obj) {
                                var px = {};
                                px[key] = obj[key];
                                sources.push(px);
                            }
                            sources = JSON.stringify(sources);
                            pkgPageShow("国庆教育盖楼弹窗奖励页", "优惠券（引导使用）");
                            document.getElementById('confirmInfo').style.display = "block";
                            $(".matter").html(awardName);
                            $("#type5").show();
                            $("#type5").siblings().hide();
                            $("#type5_img").attr("src", awardPictureUrl);
                            console.log("跳转参数：" + couponDetail + "========" + byvalue + "=====" + bywhat + "=====" + sources);
                            if(codeType == 50003){
                                document.getElementById('submit').style.display = "none";
                            }else{
                                document.getElementById('submit').style.display = "inline-block";
                            }
                            document.getElementById('use_submit').style.display = "inline-block";
                            document.getElementById('use_login').style.display = "none";
                            document.getElementById('defalut_submit').style.display = "none";
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById('use_submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        } else if (couponDetail == 0) { //没有配置
                            console.log("无配置跳转参数");
                            document.getElementById('confirmInfo').style.display = "block";
                            $("#type5").show();
                            $("#type5").siblings().hide();
                            $("#type5_img").attr("src", awardPictureUrl);
                            document.getElementById('submit').style.display = "inline-block";
                            document.getElementById('use_submit').style.display = "none";
                            document.getElementById('use_login').style.display = "none";
                            document.getElementById('defalut_submit').style.display = "inline-block";
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById('defalut_submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        }
                    }
                } else {
                    console.log(data.msg);
                    popUp("getfocus");
                    document.getElementById('confirmInfo').style.display = "none";
                    _czc.push(['_trackEvent', cOpenId, data.msg, '领取优惠券', '']);
                }
            },
            error: function(error) {
                console.log("--------访问失败");
                 _czc.push(['_trackEvent', cOpenId, JSON.stringify(error), '领取优惠券', '']);
                popUp("getfocus");
                document.getElementById('confirmInfo').style.display = "none";
            },
            complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数                　　　
                console.log("-------------complete------------------" + status);
                if (status == 'timeout') {　　　　　 ajaxTimeoutOne.abort();　　　　 }　　
            }
        });
        //  map = new coocaakeymap($(".coocaabtn"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    }

}
//我的楼层
function getMyFloors() {
    clickFlag = "true";
    click_user = "false";
    $.ajax({
        type: "post",
        async: true,
        url: adressIp + "/building/getMyFloors",
        data: params,
        dataType: "json",
        success: function(data) {
        //   console.log("我的楼层"+JSON.stringify(data));
            document.getElementById('indexhtml').style.display = "none";
            if(data.code == 90102){//没有楼层
                pkgPageShow("我的楼层页面","无盖楼楼层时");
                document.getElementById('myfloor').style.display = "none";
                document.getElementById('myfloor_null').style.display = "block";
                map = new coocaakeymap($(".coocaabtn"), document.getElementById("floornull_building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
            }else if(data.code == 50100){
                pkgPageShow("我的楼层页面","有盖楼楼层时");
                document.getElementById('myfloor').style.display = "block";
                document.getElementById('myfloor_null').style.display = "none";
                map = new coocaakeymap($(".coocaabtn"), document.getElementById("floor_building_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                document.getElementById("myfloor_box").innerHTML = "";
                for (var i = 0; i < data.data.length; i++) {
                    my_face = data.data[i].userImg;
                    my_buildingMsg = data.data[i].buildingMsg;
                    my_buildingId = data.data[i].buildingId+"#";
                    str = data.data[i].createTime;
                    my_createTime = str.substring(0,10);
                    if(data.data[i].awardStatus == 0){//非中奖楼层
                        var list = '<div class="coocaabtn flr_box"><img class="prizebg_before" src="images/myfloor_bg.png" /><img class="prizebg_focus" src="images/myfloor_bgfocus.png" /><ul><li class="fl1"><span class="user_face"><img src="'+my_face+'"/></span></li><li class="fl2">'+my_buildingMsg+'</li><li class="fl3"><span>'+my_buildingId+'</span><span>'+my_createTime+'</span></li></ul></div>';
                    }else{
                        var list = '<div class="coocaabtn flr_box"><img class="prizebg_before" src="images/myfloor_bg.png" /><img class="prizebg_focus" src="images/myfloor_bgfocus.png" /><ul><li class="fl1"><span class="my_prize"><img src="images/my_prize.png"/></span></li><li class="fl2">'+my_buildingMsg+'</li><li class="fl3"><span>'+my_buildingId+'</span><span>'+my_createTime+'</span></li></ul></div>';
                    }
                    $("#myfloor_box").append(list);
                    map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
                }
                $(".flr_box").bind("itemFocus", function() {
                    var _index = $(".flr_box").index($(this));
                    var _eachheight = $(".flr_box")[0].offsetHeight+10;
                    var myScrollTopValue = 0;
                    myScrollTopValue = _index * _eachheight;
                    $("#myfloor_box").stop(true, true).animate({
                        scrollTop: myScrollTopValue
                    }, {
                        duration: 0,
                        easing: "swing",
                        complete: function() {}
                    });
                });
            }

        },
        error: function(error) {
            console.log("--------访问失败");
             _czc.push(['_trackEvent', cOpenId, JSON.stringify(error), '我的楼层', '']);
        }
    })
}
//活动已结束领取优惠券
function receiveEndCoupon(){
    $.ajax({
        type: "post",
        async: true,
        url: adressIp + "/building/receiveEndCoupon",
        data: params,
        dataType: "json",
        success: function(data) {
            console.log(loginstatus+"活动已结束领取优惠券"+JSON.stringify(data));
            if(data.code == 50100){
                awardName = data.data.awardName;
                awardTypeId = data.data.awardTypeId;
                lotteryAwardMemberId = data.data.lotteryAwardRememberId;
                awardExchangeFlag = data.data.awardExchangeFlag;
                awardId = data.data.awardId;
                awardPictureUrl = data.data.awardUrl;
                awardInfo = data.data.awardInfo;
                awardInfo = JSON.stringify(data.data.awardInfo);
                awardTime = data.data.awardTime;
                activeId = data.data.activeId;
                userEmmcId = data.data.userEmmcId;
                userKeyId_1 = data.data.userKeyId;
                if (!data.data.awardComments) {
                    awardComments = "";
                } else {
                    awardComments = data.data.awardComments
                }
                sessionStorage.setItem("awardName", data.data.awardName);
                sessionStorage.setItem("awardTypeId", data.data.awardTypeId);
                sessionStorage.setItem("lotteryAwardMemberId", data.data.lotteryAwardRememberId);
                sessionStorage.setItem("awardExchangeFlag", data.data.awardExchangeFlag);
                sessionStorage.setItem("awardId", data.data.awardId);
                sessionStorage.setItem("awardPictureUrl", data.data.awardUrl);
                sessionStorage.setItem("awardInfo", JSON.stringify(data.data.awardInfo));
                sessionStorage.setItem("awardTime", data.data.awardTime);
                sessionStorage.setItem("activeId", data.data.activeId);
                sessionStorage.setItem("userEmmcId", data.data.userEmmcId);
                sessionStorage.setItem("userKeyId_1", data.data.userKeyId);
                sessionStorage.setItem("awardComments", data.data.awardComments);
                if(loginstatus == "true"){
                    pkgPageShow("国庆教育盖楼活动我的奖品页","无中奖记录时—活动已结束-已登录");
                    $("#recive_btn").show();
                    $("#login_recive_btn").hide();
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById('recive_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }else if(loginstatus == "false"){
                    pkgPageShow("国庆教育盖楼活动我的奖品页","无中奖记录时—活动已结束-未登录");
                    $("#login_recive_btn").show();
                    $("#recive_btn").hide();
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById('login_recive_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }
            }
        },
        error: function(error) {
            console.log("-------------error");
            _czc.push(['_trackEvent', cOpenId, JSON.stringify(error), '活动已结束领取优惠券', '']);
        }
    })
}

//我的奖品
function getPrizeList() {
    clickFlag = "true";
    click_user = "false";
    $.ajax({
        type: "post",
        async: true,
        url: adressIp + "/building/getMyRemembers",
        data: params,
        dataType: "json",
        success: function(data) {
            type_Ticket = "prize_ticket";
        //    console.log("我的奖品"+JSON.stringify(data));
            if (data.code == 90103) {
                console.log("活动状态"+codeType);
                if(codeType == 50003){//活动已结束
                    receiveEndCoupon();
                    document.getElementById('prize_over').style.display = "block";
                    document.getElementById('prize_list').style.display = "none";
                }else{
                    pkgPageShow("国庆教育盖楼活动我的奖品页","无中奖记录时—活动未结束");
                    document.getElementById('prize_null').style.display = "block";
                    document.getElementById('prize_list').style.display = "none";
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById('prize_building_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }
            } else {
                pkgPageShow("国庆教育盖楼活动我的奖品页","有中奖记录时");
                document.getElementById('prize_list').style.display = "block";
                document.getElementById('prize_null').style.display = "none";
                document.getElementById('prize_over').style.display = "none";
                document.getElementById("prize_box").innerHTML = "";
                if(codeType == 50003){//活动已结束
                    $("#prize_toedu_btn").show();
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById('prize_toedu_btn'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }else{
                    $("#prize_building_btn1").show();
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById('prize_building_btn1'), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }
                for (var i = 0; i < data.data.length; i++) {
                    Flag = data.data[i].awardExchangeFlag;
                    awardType = data.data[i].awardType;
                    awardName = data.data[i].awardName;
                    awardTypeId = data.data[i].awardTypeId;
                    lotteryAwardMemberId = data.data[i].lotteryAwardRememberId;
                    awardExchangeFlag = data.data[i].awardExchangeFlag;
                    awardId = data.data[i].awardId;
                    awardPictureUrl = data.data[i].awardUrl;
                    activeId = data.data[i].activeId;
                    awardInfo = JSON.stringify(data.data[i].awardInfo);
                    awardTime = data.data[i].awardTime;
                    userEmmcId = data.data[i].userEmmcId;
                    awardName = data.data[i].awardName;
                    ticket = data.data[i].awardTypeId;
                    userKeyId_1 = data.data[i].userKeyId;
                    if (!data.data[i].awardComments) {
                        awardComments = "";
                    } else {
                        awardComments = data.data[i].awardComments
                    }
                    var _userAddress = "";
                    var cardinfo = new Array();
                    if (Flag == 0) { //  console.log("未兑换奖品");
                        var list = '<div class="coocaabtn prize_box overdue prize_state" leftTarget="#' + lotteryAwardMemberId + '" awardComments="' + awardComments + '" awardTime="' + data.data[i].awardTime + '" awardTypeId="' + awardTypeId + '" lotteryAwardMemberId="' + lotteryAwardMemberId + '" awardExchangeFlag="' + awardExchangeFlag + '" activeId="' + activeId + '" awardName="' + awardName + '" awardId="' + awardId + '" awardTime="' + awardTime + '" userEmmcId="' + userEmmcId + '" userKeyId_1="' + userKeyId_1 + '" awardPictureUrl="' + awardPictureUrl + '"><img class="prizebg_before" src="images/33.png"/><img class="prizebg_focus" src="images/prizeorderfocus.png" /><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li3">' + data.data[i].awardTime + '</li><li class="li2">未领取</li><span class="award_Info" style="display:none">' + awardInfo + '</span></li></div>';
                    } else if (Flag == 1) {
                        if (ticket == 8) { //霸王单
                            var _userphone = data.data[i].awardAddressEntity.userPhone;
                            var list = '<div class="coocaabtn prize_box overdue prize_info" leftTarget="#' + lotteryAwardMemberId + '" awardComments="' + awardComments + '" awardTime="' + data.data[i].awardTime + '"userPhone="' + _userphone + '" awardTypeId="' + awardTypeId + '" lotteryAwardMemberId="' + lotteryAwardMemberId + '" awardExchangeFlag="' + awardExchangeFlag + '" activeId="' + activeId + '" awardName="' + awardName + '" awardId="' + awardId + '" awardTime="' + awardTime + '" userEmmcId="' + userEmmcId + '" awardPictureUrl="' + awardPictureUrl + '"><img class="prizebg_before" src="images/22.png"/><img class="prizebg_focus" src="images/prizeorderfocus.png" /><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li3">' + data.data[i].awardTime + '</li><li class="li2">已领取</li><span class="award_Info" style="display:none">' + awardInfo + '</span></li></div>';
                        } else if (ticket == 2) { //2实物
                            var _username = data.data[i].awardAddressEntity.receiveName;
                            var _userphone = data.data[i].awardAddressEntity.userPhone;
                            if (data.data[i].awardAddressEntity.userProvince == data.data[i].awardAddressEntity.userCity) {
                                _userAddress = data.data[i].awardAddressEntity.userCity + data.data[i].awardAddressEntity.userArea + data.data[i].awardAddressEntity.userAddress
                                var list = '<div class="coocaabtn prize_box overdue prize_info" leftTarget="#' + lotteryAwardMemberId + '" awardComments="' + awardComments + '" awardTime="' + data.data[i].awardTime + '" userName="' + _username + '" userAddress="' + _userAddress + '" userPhone="' + _userphone + '" awardTypeId="' + awardTypeId + '" lotteryAwardMemberId="' + lotteryAwardMemberId + '" awardExchangeFlag="' + awardExchangeFlag + '" activeId="' + activeId + '" awardName="' + awardName + '" awardId="' + awardId + '" awardTime="' + awardTime + '" userEmmcId="' + userEmmcId + '" awardPictureUrl="' + awardPictureUrl + '"><img class="prizebg_before" src="images/22.png"/><img class="prizebg_focus" src="images/prizeorderfocus.png" /><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li3">' + data.data[i].awardTime + '</li><li class="li2">已领取</li><span class="award_Info" style="display:none">' + awardInfo + '</span></li></div>';
                            } else {
                                _userAddress = data.data[i].awardAddressEntity.userProvince + data.data[i].awardAddressEntity.userCity + data.data[i].awardAddressEntity.userArea + data.data[i].awardAddressEntity.userAddress;
                                var list = '<div class="coocaabtn prize_box overdue prize_info" leftTarget="#' + lotteryAwardMemberId + '" awardComments="' + awardComments + '" awardTime="' + data.data[i].awardTime + '" userName="' + _username + '" userAddress="' + _userAddress + '" userPhone="' + _userphone + '" awardTypeId="' + awardTypeId + '" lotteryAwardMemberId="' + lotteryAwardMemberId + '" awardExchangeFlag="' + awardExchangeFlag + '" activeId="' + activeId + '" awardName="' + awardName + '" awardId="' + awardId + '" awardTime="' + awardTime + '" userEmmcId="' + userEmmcId + '" awardPictureUrl="' + awardPictureUrl + '"><img class="prizebg_before" src="images/22.png"/><img class="prizebg_focus" src="images/prizeorderfocus.png" /><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li3">' + data.data[i].awardTime + '</li><li class="li2">已领取</li><span class="award_Info" style="display:none">' + awardInfo + '</span></li></div>';
                            }
                        } else if (ticket == 5) { //优惠券
                            couponDetail = JSON.parse(data.data[i].awardInfo).couponDetail;
                            if (couponDetail == 1) { //已配置
                                var data_a = JSON.parse(data.data[i].awardInfo).onclickData;
                                byvalue = JSON.parse(data_a).byvalue;
                                bywhat = JSON.parse(data_a).bywhat;
                                obj = JSON.parse(data_a).param;
                                var sources = new Array();
                                for (var key in obj) {
                                    var px = {};
                                    px[key] = obj[key];
                                    sources.push(px);
                                }
                                sources = JSON.stringify(sources);
                                var list = '<div class="coocaabtn prize_box overdue prize_info" leftTarget="#' + lotteryAwardMemberId + '" awardComments="' + awardComments + '" bywhat="' + bywhat + '" byvalue="' + byvalue + '" awardTypeId="' + awardTypeId + '" lotteryAwardMemberId="' + lotteryAwardMemberId + '" awardExchangeFlag="' + awardExchangeFlag + '" activeId="' + activeId + '" awardName="' + awardName + '" awardId="' + awardId + '" awardTime="' + awardTime + '" userEmmcId="' + userEmmcId + '" awardPictureUrl="' + awardPictureUrl + '"><img class="prizebg_before" src="images/22_8331dfb.png"/><img class="prizebg_focus" src="images/prizeorderfocus.png" /><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li3">' + data.data[i].awardTime + '</li><li class="li2">已领取</li><span class="award_Info" style="display:none">' + awardInfo + '</span><span class="sources" style="display:none">' + sources + '</span></li></div>';
                            } else { //无配置
                                var list = '<div class="coocaabtn prize_box overdue default_ticket_state" leftTarget="#' + lotteryAwardMemberId + '" awardComments="' + awardComments + '" awardTypeId="' + awardTypeId + '" lotteryAwardMemberId="' + lotteryAwardMemberId + '" awardExchangeFlag="' + awardExchangeFlag + '" activeId="' + activeId + '" awardName="' + awardName + '" awardId="' + awardId + '" awardTime="' + awardTime + '" userEmmcId="' + userEmmcId + '" awardPictureUrl="' + awardPictureUrl + '"><img class="prizebg_before" src="images/22_8331dfb.png"/><img class="prizebg_focus" src="images/prizeorderfocus.png" /><ul><li class="li1">' + data.data[i].awardName + '</li><li class="li3">' + data.data[i].awardTime + '</li><li class="li2">已领取</li><span class="award_Info" style="display:none">' + awardInfo + '</span></li></div>';
                            }
                        }
                    }
                    $("#prize_box").append(list);
                    map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
                }


                $(".default_ticket_state").bind("itemClick", function() {
                    pkgPageShow("我的奖品页奖品详情弹窗", "优惠券（引导使用");
                    coocaaosapi.startDefaultZone(cOpenId, function(message) {}, function(error) {
                        console.log("判断失败" + error);
                    });
                });

                $(".prize_box").bind("itemFocus", function() {
                    var _index = $(".prize_box").index($(this));
                    var _eachheight = $(".prize_box")[0].offsetHeight+20;
                    var myScrollTopValue = 0;
                    myScrollTopValue = _index * _eachheight;
                    $("#prize_box").stop(true, true).animate({
                        scrollTop: myScrollTopValue
                    }, {
                        duration: 0,
                        easing: "swing",
                        complete: function() {}
                    });
                });



                $(".prize_state").bind("itemClick", function() {
                    awardTypeId = $(this).attr("awardTypeId");
                    lotteryAwardMemberId = $(this).attr("lotteryAwardMemberId");
                    awardExchangeFlag = $(this).attr("awardExchangeFlag");
                    awardName = $(this).attr("awardName");
                    awardId = $(this).attr("awardId");
                    awardPictureUrl = $(this).attr("awardPictureUrl");
                    activeId = $(this).attr("activeId");
                    awardInfo1 = $(this).find(".award_Info").html();
                    awardInfo = JSON.parse(awardInfo1);
                    awardTime = $(this).attr("awardTime");
                    userEmmcId = $(this).attr("userEmmcId");
                    userKeyId_1 = $(this).attr("userKeyId_1");
                    awardComments = $(this).attr("awardComments");
                    sessionStorage.setItem("awardName", awardName);
                    sessionStorage.setItem("awardTypeId", awardTypeId);
                    sessionStorage.setItem("lotteryAwardMemberId", lotteryAwardMemberId);
                    sessionStorage.setItem("awardExchangeFlag", awardExchangeFlag);
                    sessionStorage.setItem("awardId", awardId);
                    sessionStorage.setItem("awardPictureUrl", awardPictureUrl);
                    sessionStorage.setItem("awardInfo", awardInfo);
                    sessionStorage.setItem("awardTime", awardTime);
                    sessionStorage.setItem("activeId", activeId);
                    sessionStorage.setItem("userEmmcId", userEmmcId);
                    sessionStorage.setItem("userKeyId_1", userKeyId_1);
                    sessionStorage.setItem("awardComments", awardComments);
                    $(".matter").html(awardName);
                    $(".prize_name").html(awardName);
                    $(".prize_time").html(awardTime);
                    console.log("中奖名单ID" + lotteryAwardMemberId + "awardId:" + awardId + "awardInfo:" + awardInfo);
                    //    _czc.push(['_trackEvent', '大富翁活动中', '我的奖品', '立即领取', '']);
                    //    pkgButtonLog("我的奖品","","点击我的奖品","立即领取","",awardId,awardName);
                    openBg();
                    if (awardTypeId == "5") {
                        if (loginstatus == "true") {
                            pkgButtonLog("我的奖品页面", "领取", "有中奖纪录—未领取—已登录","")
                            getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardInfo, awardTime, userEmmcId, awardId, userKeyId_1, "prize_type");
                        } else {
                            document.getElementById('confirmInfo').style.display = "block";
                            $(".matter").html(awardName);
                            $("#type5").show();
                            $("#type5").siblings().hide();
                            $("#type5_img").attr("src", awardPictureUrl);
                            if(codeType == 50003){
                                document.getElementById('submit').style.display = "none";
                            }else{
                                document.getElementById('submit').style.display = "inline-block";
                            }
                            document.getElementById('use_submit').style.display = "none";
                            document.getElementById('defalut_submit').style.display = "none";
                            document.getElementById('use_login').style.display = "inline-block";
                            map = new coocaakeymap($(".coocaabtn"), document.getElementById("use_login"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        }
                    } else if (awardTypeId == "3") {
                        getGold(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardInfo, awardTime, userEmmcId, awardId, userKeyId_1, "prize_type");
                    } else {
                        prizeWindow(activeId, awardTypeId, lotteryAwardMemberId, awardPictureUrl, awardName, awardTime, userEmmcId, awardId, awardInfo, userKeyId_1);
                    }

                });
                $(".prize_info").bind("itemClick", function() {
                    awardTypeId = $(this).attr("awardTypeId");
                    awardName = $(this).attr("awardName");
                    awardInfo1 = $(this).find(".award_Info").html();
                    awardInfo = JSON.parse(awardInfo1);
                    awardTime = $(this).attr("awardTime");
                    awardComments = $(this).attr("awardComments");
                    $(".prize_name").html(awardName);
                    $(".prize_time").html(awardTime);
                    console.log("中奖名单ID" + lotteryAwardMemberId + "awardId:" + awardId + "awardInfo:" + awardInfo);
                    document.getElementById("prize_window_box").style.display = "block";
                    openBg();
                    if (awardTypeId == "2") {
                        pkgPageShow("我的奖品页奖品详情弹窗", "实物奖品（已填写地址）");
                        userName = $(this).attr("userName");
                        userAddress = $(this).attr("userAddress");
                        userPhone = $(this).attr("userPhone");
                        document.getElementById("prize_window_address").style.display = "block";
                        $("#prize_window_address").siblings().hide();
                        $(".user_name").html(userName);
                        $(".user_phone").html(userPhone);
                        $(".user_address").html(userAddress);
                        map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    } else if (awardTypeId == "3") {
                        pkgPageShow("我的奖品页奖品详情弹窗", "兑换码商品");
                        console.log("配置说明：" + awardComments);
                        document.getElementById("prize_window_ticket").style.display = "block";
                        $("#prize_window_ticket").siblings().hide();
                        var cardinfo = $(this).find(".card_Info").html();
                        cardinfo = JSON.parse(cardinfo);
                        if (cardinfo.length > 1) {
                            $("#car_password_prize").html(cardinfo[0].password);
                            $("#car_password1_prize").html(cardinfo[1].password);
                        } else {
                            $("#car_password_prize").html(cardinfo[0].password);
                        }
                        map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn_ticket"), "btnFocus", function() {}, function(val) {}, function(obj) {});

                    } else if (awardTypeId == "8") {
                        pkgPageShow("我的奖品页奖品详情弹窗", "霸王单（已填写地址）");
                        userPhone = $(this).attr("userPhone");
                        document.getElementById("prize_window_overlord").style.display = "block";
                        $("#prize_window_overlord").siblings().hide();
                        $(".user_phone").html(userPhone);
                        map = new coocaakeymap($(".coocaabtn"), document.getElementById("sure_btn_overlord"), "btnFocus", function() {}, function(val) {}, function(obj) {});

                    } else if (awardTypeId == "5") {
                        pkgPageShow("我的奖品页奖品详情弹窗", "优惠券（引导使用");
                        document.getElementById("prize_window_coupon").style.display = "block";
                        $("#prize_window_coupon").siblings().hide();
                        bywhat = $(this).attr("bywhat");
                        byvalue = $(this).attr("byvalue");
                        sources = $(this).find(".sources").html();
                        map = new coocaakeymap($(".coocaabtn"), document.getElementById("prize_user"), "btnFocus", function() {}, function(val) {}, function(obj) {});

                        $("#prize_user").bind("itemClick", function() {
                            type_Ticket = "prize_ticket";
                            Ticket = "prize_ticket";
                            click_user = "false";
                            pkgButtonLog("我的奖品——已领取页面", "立即使用", "优惠券（引导使用）","");
                            byvalue = $.trim(byvalue);
                            console.log(Ticket+"跳转参数：" + couponDetail + "========" + byvalue + "=====" + bywhat + "=====" + sources);
                            coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
                                console.log("判断失败" + error);
                            });
                        });
                    }
                });
            }
        },
        error: function() {
            console.log("-------------error");
            _czc.push(['_trackEvent', cOpenId, JSON.stringify(error), '我的奖品', '']);
        }
    });

}


//提示弹窗

function popUp(type) {
    document.getElementById('popUp').style.display = "block";
    document.getElementById('confirmInfo').style.display = "none";
    if (type == "getfocus") { //优惠券领取失败
        pkgPageShow("国庆教育盖楼弹窗奖励页", "优惠券-领取失败");
        map = new coocaakeymap($(".coocaabtn"), document.getElementById('error_submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }
}




//获奖名单
function getNameList() {
    document.getElementById("awardul").innerHTML = "";
    $.ajax({
        type: "GET",
        async: true,
        url: adressIp+"/building/getAllRemember",
        data: {
            "id":id,
            "size":100
        },
        dataType: "json",
        success: function(data) {
            //console.log("获奖名单"+JSON.stringify(data));
            var _UserNickName = new Array();
            var _phone = new Array();
            var _awardName = new Array();
            if(data.code == 50100){
                for (var i = 0; i < data.data.length; i++) {
                    if (!data.data[i].userNickName) {
                        _UserNickName[i] = "匿名用户";
                    } else {
                        _UserNickName[i] = data.data[i].userNickName;
                    }
                    _awardName[i] = data.data[i].awardName;
                }
                for (var i = 0; i < data.data.length; i++) {

                    var list = '<li>' + '<span class="testspan1">' + _UserNickName[i] + '</span><span class="testspan3" style="text-align:right">获得' + _awardName[i] + '</span></li>';
                    $("#awardul").append(list);

                }
            }else if(data.code == 90106){
                $("#g_00").html("【暂无中奖名单】");
            }
        },
        error: function() {
            console.log("error");
            _czc.push(['_trackEvent', cOpenId, JSON.stringify(error), '活动已结束中奖名单', '']);
        }
    });
}

//获奖名单滚动效果
function startmarquee(lh, speed, delay, index) {
    console.log("开始滚动！！！！！！！！！！！！！");
    var t;
    var p = false;
    var o = document.getElementById("awardListTwo");
    o.innerHTML += o.innerHTML;
    o.onmouseover = function() { p = true }
    o.onmouseout = function() { p = false }
    o.scrollTop = 0;

    function start() {
        t = setInterval(scrolling, speed);
        if (!p) { o.scrollTop += 1; }
    }

    function scrolling() {
        if (o.scrollTop % lh != 0) {
            o.scrollTop += 1;
            if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);

}
//倒计时
function ShowCountDown(year, month, day, hour, minute) {
    var endDate = new Date(year, month - 1, day, hour, minute);
    var leftTime = endDate.getTime() - i; // ==============要修改
    var leftsecond = parseInt(leftTime / 1000);
    //var day1=parseInt(leftsecond/(24*60*60*6));
//    console.log(leftTime);
    var day1 = Math.floor(leftsecond / (60 * 60 * 24));
    var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
    var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
    var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
    if (day1 == 0 && hour == 0 && minute == 0 && second == 0) {
        console.log("倒计时结束");
        initActive("index");
        clearInterval(timeInter);
    }
}



//数据埋点
function pkgPageShow(page_name, page_state) {
    coocaaosapi.notifyJSLogInfo("web_page_show_new", '{"page_name":"' + page_name + '","page_state":"' + page_state + '","activity_name":"国庆教育盖楼活动"}', function(message) { console.log(message); }, function(error) { console.log(error); });
}


function pkgButtonLog(page_name, button_name, page_state,last_page_name) {
    coocaaosapi.notifyJSLogInfo("web_button_clicked", '{"page_name":"' + page_name + '","activity_name":"国庆教育盖楼活动","button_name":"' + button_name + '","page_state":"' + page_state + '","last_page_name":"' + last_page_name + '"}', function(message) { console.log(message); }, function(error) { console.log(error); });
}

function pkgEventLog(page_name, login_result) {
    coocaaosapi.notifyJSLogInfo("web_login_result", '{"page_name":"' + page_name + '","login_result":"' + login_result + '","activity_name":"国庆教育盖楼活动"}', function(message) { console.log(message); }, function(error) { console.log(error); });
}

function web_chance_result(page_name,chance_result){
    coocaaosapi.notifyJSLogInfo("web_chance_result", '{"page_name":"' + page_name + '","chance_result":"' + chance_result + '","activity_name":"国庆教育盖楼活动","button_name":"我要盖楼"}', function(message) { console.log(message); }, function(error) { console.log(error); });
}