
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.handleBackButton, false);
        document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
        document.addEventListener("resume", this.handleresume, false);
        document.addEventListener("pause", this.handlepause, false);
    },
    handleresume: function() {
        console.log("************************");
        if (needFresh) {
            needFresh = false;
            showPage(false, true)
        } else {
            if(needSentADLog){
                needSentADLog = false;
                if (ADMsg != null && ADMsg.schedules != undefined && ADMsg.schedules[0] != undefined) {
                    sentInnerAdshow("img", ADMsg, "G0003", "1", "1", "1", "", "");
                    sentThirdAdshow("img", ADMsg);
                }
            }
            if(document.getElementById("myAllowancePage").style.display == "block"){
                sentLog("okr_web_page_show", '{"page_name":"我的津贴页面","activity_name":"春节集卡活动"}');
                _czc.push(['_trackEvent', '春节集卡活动', '我的津贴页面曝光', '', '', '']);
            }else{
                sentLog("okr_web_page_show", '{"page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","open_id":"' + cOpenId || "空" + '","link_type":"' + link_type + '"}');
                _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '曝光', '', '']);
            }


            if (startLoginFlag && changeLoginFlag) {
                console.log("登录成功");
                startLoginFlag = false;
                changeLoginFlag = false;

                sentLog("okr_web_clicked_result", '{"page_name":"春节活动登录弹窗","activity_name":"春节集卡活动","login_result":"登录成功"}');
                _czc.push(['_trackEvent', '春节活动登录弹窗', '春节集卡活动', '登录成功', '', '']);

                if (document.getElementById("myAwardPage").style.display == "block") {
                    console.log(_curHomeBtn);
                    $("#" + _curHomeBtn).trigger("itemClick");
                }
                if (document.getElementById("getOtherAward1").style.display == "block") {
                    $("#otherBtn2").trigger("itemClick");
                }

            } else if (startLoginFlag) {
                console.log("登录失败");
                startLoginFlag = false;
                changeLoginFlag = false;
                sentLog("okr_web_clicked_result", '{"page_name":"春节活动登录弹窗","activity_name":"春节集卡活动","login_result":"登录失败"}');
                _czc.push(['_trackEvent', '春节活动登录弹窗', '春节集卡活动', '登录失败', '', '']);
            } else {
                console.log("不提交登录日志");
                startLoginFlag = false;
                changeLoginFlag = false;
            }
        }
    },
    handlepause: function() {
        console.log("===========================pause==========");
    },
    handleBackButton: function() {

    },
    handleBackButtonDown: function() {
        if(removeBackButton){
            return;
        }
        else if ($("#rulePage").css("display") == "block") {
            $("#mainbox").show();
            $("#rulePage").hide();
            map = new coocaakeymap($(".coocaabtn"), $("#rule"), "btnFocus", function() {}, function(val) {}, function(obj) {});
            sentLog("okr_web_page_show", '{"page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","open_id":"' + cOpenId || "空" + '","link_type":"' + link_type + '"}');
            _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '曝光', '', '']);
            if (ADMsg != null && ADMsg.schedules != undefined && ADMsg.schedules[0] != undefined) {
                sentInnerAdshow("img", ADMsg, "G0003", "1", "1", "1", "", "");
                sentThirdAdshow("img", ADMsg);
            }
        } else if ($("#needUpdate").css("display") == "block") {
            hideToast();
        } else if ($(".window").css("display") == "block" || $(".finishwindow").css("display") == "block") {
            $("#blackBg").hide();
            $(".window").hide();
            $(".finishwindow").hide();
            showPage(false, false);
        } else if (document.getElementById("dialogPage").style.display == "block") {
            if (document.getElementById("getFoca").style.display == "block") {
                $("#getFoca").css("display", "none");
                $("#detain").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn3"), document.getElementById(_curHomeBtn), "btn-focus", function() {}, function(val) {}, function(obj) {});
            } else {
                $("#dialogPage").css("display", "none");
                $(".secondDialog").css("display", "none");
                if (document.getElementById("myAwardPage").style.display == "block") {
                    getMyAwards(2);
                } else {
                    showPage(false, false);
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById("overChance"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                }
            }
        } else {
            if (document.getElementById("myAllowancePage").style.display == "block") {
                if (document.getElementById("myAwardPage").style.display == "block") {
                    $("#myAwardPage").css("display", "block");
                    $("#myAllowancePage").css("display", "none");
                    sentLog("okr_web_page_show", '{"page_name":"我的奖励页面","activity_name":"春节集卡活动"}');
                    _czc.push(['_trackEvent', '我的奖励页面', '春节集卡活动', '', '', '']);
                    map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("allowanceAward"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                } else {
                    $("#myAllowancePage").css("display", "none");
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById("allowance"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    sentLog("okr_web_page_show", '{"page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","open_id":"' + cOpenId || "空" + '","link_type":"' + link_type + '"}');
                    _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '曝光', '', '']);
                }
            } else {
                if (document.getElementById("myAwardPage").style.display == "block") {
                    $("#myAwardPage").css("display", "none");
                    map = new coocaakeymap($(".coocaabtn"), document.getElementById("mygift"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    sentLog("okr_web_page_show", '{"page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","open_id":"' + cOpenId || "空" + '","link_type":"' + link_type + '"}');
                    _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '曝光', '', '']);
                } else {
                    navigator.app.exitApp();
                }
            }
        }
    },

    onDeviceReady: function() {
        cordova.require("coocaaosapi");
        app.receivedEvent('deviceready');
        app.triggleButton();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelectorAll('.received');
        // listeningElement.setAttribute('style', 'display:none;');
        for (var i = 0, j = receivedElement.length; i < j; i++) {
            // receivedElement[i].setAttribute('style', 'display:block;');
        }
        /*receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
        coocaaosapi.getBaseInfo(function(msg) {
            console.log("-----------baseinfo-------" + JSON.stringify(msg));
            if (msg.totalMem > 1.1 * 1024 * 1024 * 1024) {
                showMove = true;
            }
        }, function(err) {
            console.log("-----------baseinfo-------" + JSON.stringify(err));
        })
        coocaaosapi.getDeviceInfo(function(message) {
            deviceInfo = message;
            if (deviceInfo.version < '6') {
                android.getPropertiesValue("persist.service.homepage.pkg", function(data) {
                    var val = data.propertiesValue;
                    if ("com.tianci.movieplatform" == val) {
                        startActionReplace = "coocaa.intent.action.HOME.Translucent";
                    } else {
                        startActionReplace = "coocaa.intent.movie.home";
                    }
                });
            }
            coocaaosapi.getIpInfo(function(msg) {
                userIp = msg.ip;
            }, function() {})
            console.log("deviceinfo==============" + JSON.stringify(deviceInfo))
            macAddress = message.mac;
            TVmodel = message.model;
            TVchip = message.chip;
            activityId = message.activeid;
            if (message.emmcid == "" || message.emmcid == null) {
                emmcId = "123456";
                  } else {
                emmcId = message.emmcid;
            }
            var a = { MAC: macAddress, cChip: TVchip, cModel: TVmodel, cEmmcCID: emmcId, cUDID: activityId, cSize: message.panel, cChannel: "coocaa" };
            console.log("data=====" + JSON.stringify(a))
            $.ajax({
                type: "post",
                async: true,
                url: adressIp + "/light/active/tv/source",
                data: { cNickName: nick_name, MAC: macAddress, cChip: TVchip, cModel: TVmodel, cEmmcCID: emmcId, cUDID: activityId, cSize: message.panel, cChannel: "coocaa", aSdk: message.androidsdk, cTcVersion: message.version.replace(/\.*/g, ""), cBrand: message.brand },
                dataType: "json",
                // timeout: 20000,
                success: function(data) {
                    console.log("电视源返回状态：" + JSON.stringify(data));
                    if (data.code == 0) {
                        movieSource = data.data.source;
                        if (movieSource == "tencent") {
                            needQQ = true;
                        }
                    }
                    hasLogin(needQQ, true, true);
                },
                error: function(error) {
                    hasLogin(needQQ, true, true);
                    console.log("-----------访问失败---------" + JSON.stringify(error));
                }
            });
        }, function(error) { console.log("get deviceinfo error") })
    },
    triggleButton: function() {
        cordova.require("coocaaosapi");
        listenUserChange();
        getLocationInfo();
    }
};


app.initialize();

//获取省市
function getLocationInfo() {
    coocaaosapi.getDeviceLocation(function(message) {
        console.log("location " + message.location);
        _province = message.location.split(",")[0];
        _city = message.location.split(",")[1];
        console.log(_province + "--" + _city);
    }, function(error) {
        console.log(error);
    });
}

//监听账户变化
function listenUserChange() {
    coocaaosapi.addUserChanggedListener(function(message) {
        console.log("监听到账户发生变化");
        changeLoginFlag = true;
        hasLogin(needQQ, false, false);
    });
}

function startAndSendLog() {
    startLoginFlag = true;
    startLogin(needQQ);
    sentLog("okr_web_page_show", '{"page_name":"春节活动登录弹窗","activity_name":"春节集卡活动"}');
    _czc.push(['_trackEvent', '春节活动登录弹窗', '春节集卡活动', '', '', '']);
}

function startDrawFunc(mode) {
    console.log("开始抽奖" + _province + "--" + _city + "--" + nick_name);
    var ajaxTimeoutOne = $.ajax({
        type: "POST",
        async: true,
        timeout: 5000,
        dataType: 'json',
        url: adressIp + "/building/cny/lottery",
        data: {
            "divideId":divideId,
            "id": actionId,
            "lotterySource": mode,
            "cUDID": activityId,
            "MAC": macAddress,
            "cEmmcCID": emmcId,
            "cOpenId": cOpenId,
            "cModel": TVmodel,
            "cChip": TVchip,
            "province": _province,
            "city": _city,
            "cNickName": nick_name
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if (data.code == 50100) {
                console.log("该活动进行中+抽卡成功");
                showThisAwardDialog(data.data, mode);
            } else {
                console.log("抽卡失败");
                if (mode == "lottery") {
                    sentLog("okr_web_clicked_result", '{"page_name":"点击抽卡","activity_name":"春节集卡活动","award_result":"抽卡失败"}');
                    _czc.push(['_trackEvent', '点击抽卡', '春节集卡活动', '抽卡失败', '', '']);
                } else {
                    sentLog("okr_web_clicked_result", '{"page_name":"点击翻卡","activity_name":"春节集卡活动","award_result":"翻卡失败"}');
                    _czc.push(['_trackEvent', '点击抽卡', '春节集卡活动', '翻卡失败', '', '']);
                }
            }
        },
        error: function() {
            console.log("获取失败");
            if (mode == "lottery") {
                sentLog("okr_web_clicked_result", '{"page_name":"点击抽卡","activity_name":"春节集卡活动","award_result":"抽卡失败"}');
                _czc.push(['_trackEvent', '点击抽卡', '春节集卡活动', '抽卡失败', '', '']);
            } else {
                sentLog("okr_web_clicked_result", '{"page_name":"点击翻卡","activity_name":"春节集卡活动","award_result":"翻卡失败"}');
                _czc.push(['_trackEvent', '点击抽卡', '春节集卡活动', '翻卡失败', '', '']);
            }
        },
        complete: function(XMLHttpRequest, status) {
            console.log("-------------complete------------------" + status);
            if (status == 'timeout') {
                ajaxTimeoutOne.abort();
            }
        }
    });
}

function buttonInitAfter() {
    $(".myAwards").unbind("itemFocus").bind("itemFocus", function() {
        console.log("in myAwards");
        var _index1 = $(".myAwards").index($(this)); //btn是第几个
        var _index2 = $(".awardTabs").index($(this).parent()); //btn所在的盒子是第几个
        console.log(_index1 + "--" + _index2);
        var boxHeight = 0;
        var myScrollTopValue = 0;
        if (_index2 == 0) {
            myScrollTopValue = 0;
        } else if (_index2 == 1) {
            myScrollTopValue = $(".awardTabs")[0].offsetHeight;
        } else if (_index2 == 2) {
            myScrollTopValue = $(".awardTabs")[0].offsetHeight + $(".awardTabs")[1].offsetHeight;
        } else if (_index2 == 3) {
            myScrollTopValue = $(".awardTabs")[0].offsetHeight + $(".awardTabs")[1].offsetHeight + $(".awardTabs")[2].offsetHeight;
        }
        console.log(myScrollTopValue);
        $("#myAwardBox").stop(true, true).animate({ scrollTop: myScrollTopValue }, { duration: 0, easing: "swing" });
    });

    $(".myAwards").unbind("itemClick").bind("itemClick", function() {
        $(".awardbg").css("display", "none");
        var _clickIndex = $(".myAwards").index($(this));
        var _awardName = $(this).attr("awardName");
        var _awardTime = $(this).attr("awardTime");
        var _awardType = $(this).attr("awardType");
        var _awardState = $(this).attr("awardState");
        var _lotteryActiveId = $(this).attr("lotteryActiveId");
        var _rememberId = $(this).attr("rememberId");
        var _userkeyId = $(this).attr("userkeyId");

        _curHomeBtn = $(this).attr("id");
        console.log(_curHomeBtn);
        console.log(_clickIndex + "--" + _awardType + "--" + _awardState + "--" + loginstatus);
        if (_awardType == 17) {
            if (loginstatus == "false") {
                console.log("点击了购物津贴+启登录");
                startAndSendLog();
            } else {
                console.log("点击了购物津贴+跳转页面");
                $("#myAllowancePage").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});

                sentLog("okr_web_button_click", '{"button_name":"津贴","page_name":"我的奖励页面","activity_name":"春节集卡活动"}');
                _czc.push(['_trackEvent', '春节集卡活动', '我的奖励页面', '津贴点击', '', '']);
                sentLog("okr_web_page_show", '{"page_name":"我的津贴页面","activity_name":"春节集卡活动"}');
                _czc.push(['_trackEvent', '春节集卡活动', '我的津贴页面曝光', '', '', '']);
            }
        }
        if (_awardType == 7) {
            var _redNumber = $(this).attr("redNumber");
            console.log("点击了红包");
            if (loginstatus == "false") {
                console.log("点击了红包+启登录");
                startAndSendLog();
            } else {
                $("#dialogPage").css("display", "block");
                sentLog("okr_web_button_click", '{"page_name":"我的奖励页面","activity_name":"春节集卡活动","button_name":"红包"}');
                _czc.push(['_trackEvent', '我的奖励页面', '春节集卡活动', '红包', '', '']);
                if (_awardState == 0) {
                    console.log("点击了红包+显示二维码");
                    $("#redNotGet").css("display", "block");
                    if (_lotteryActiveId == 95) {
                        $("#redStrongPart").html("福卡红包");
                    } else {
                        $("#redStrongPart").html("瓜分红包");
                    }
                    $("#redContent").html('<span style="font-size: 112px;">' + _redNumber + '</span>元');
                    console.log(_lotteryActiveId + "--" + _rememberId + "--" + _userkeyId);
                    getRedPacketsQrcode(_lotteryActiveId, _rememberId, _userkeyId, "redQrcode", 260, 260);
                    map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("redQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                } else {
                    console.log("点击了红包+显示领取信息");
                    $("#redHasGet").css("display", "block");
                    map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("redHasGetBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                }
            }
        }
        if (_awardType == 2) {
            if (loginstatus == "false") {
                console.log("点击了实物奖+启登录");
                startAndSendLog();
            } else {
                $("#dialogPage").css("display", "block");
                sentLog("okr_web_button_click", '{"page_name":"我的奖励页面","activity_name":"春节集卡活动","button_name":"实物"}');
                _czc.push(['_trackEvent', '我的奖励页面', '春节集卡活动', '实物', '', '']);
                if (_awardState == 0) {
                    console.log("点击了实物奖+显示二维码");
                    $("#otherInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
                    $("#otherInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
                    $("#otherInfo3").html('使用<span class="otherAwardVar">微信扫码</span>完善收货信息，确保奖品能够送达哦~');
                    $("#otherNotGet").css("display", "block");
                    $("#otherQrcode").css("display", "block");
                    $("#otherQrcodeImg").css("display", "none");
                    map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherInfo3"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    var enstr = enurl + "activeId=" + _lotteryActiveId + "&rememberId=" + _rememberId + "&userKeyId=" + _userkeyId + "&access_token=" + access_token;
                    drawQrcode("otherQrcode", enstr, 180);
                } else {
                    console.log("点击了实物奖+显示领取信息");
                    var _awardAddress = $(this).attr("awardAddress");
                    var _userPhone = $(this).attr("userPhone");
                    var _userName = $(this).attr("userName");

                    $("#otherHasGet").css("display", "block");
                    $("#hasGotInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
                    $("#hasGotInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
                    $("#hasGotInfo3").html("联系人:&nbsp;&nbsp;" + _userName);
                    $("#hasGotInfo4").html("联系电话:&nbsp;&nbsp;" + _userPhone);
                    $("#hasGotInfo5").css("display", "block");
                    $("#hasGotInfo6").css("display", "none");
                    $("#hasGotInfo5").html("收货地址:&nbsp;&nbsp;" + _awardAddress);
                    map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("hasGotInfo4"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                }
            }
        }
        if (_awardType == 4) {
            if (loginstatus == "false") {
                console.log("点击了第三方优惠券+启登录");
                startAndSendLog();
            } else {
                console.log("点击了第三方优惠券+显示二维码图片");
                sentLog("okr_web_button_click", '{"page_name":"我的奖励页面","activity_name":"春节集卡活动","button_name":"第三方"}');
                _czc.push(['_trackEvent', '我的奖励页面', '春节集卡活动', '第三方', '', '']);
                var _imgurl = $(this).attr("imgurl");
                console.log(this);
                console.log(_imgurl);
                $("#otherInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
                $("#otherInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
                $("#otherInfo3").html('使用<span class="otherAwardVar">京东APP</span>扫码获取优惠券');
                $("#dialogPage").css("display", "block");
                $("#otherNotGet").css("display", "block");
                $("#otherQrcode").css("display", "none");
                $("#otherQrcodeImg").css("display", "block");
                $("#otherQrcodeImg").attr("src", _imgurl);
                map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherInfo3"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        }
    });
}
//领取奖励
function otherBtn2ClickFunc() {
    var _kActiveId = $("#otherBtn2").attr("activeId");
    var _kAwardId = $("#otherBtn2").attr("awardId");
    var _kRememberId = $("#otherBtn2").attr("rememberId");
    var _kUserKeyId = $("#otherBtn2").attr("userKeyId");
    var _kAwardTypeId = $("#otherBtn2").attr("awardTypeId");
    var _kAwardName = $("#otherBtn2").attr("awardName");
    var _kAwardTime = $("#otherBtn2").attr("awardTime");
    var _kAwardUrl = $("#otherBtn2").attr("awardUrl");

    if (_kAwardTypeId == 2) {
        if (loginstatus == "false") {
            console.log("领取实物奖励+启登录");
            startAndSendLog();
        } else {
            console.log("领取实物奖励+展示二维码");
            $("#otherNotGet").css("display", "block");
            $("#getOtherAward1").css("display", "none");
            $("#otherInfo1").html("奖品名称:&nbsp;&nbsp;" + _kAwardName);
            $("#otherInfo2").html("发放时间:&nbsp;&nbsp;" + _kAwardTime);
            $("#otherInfo3").html('使用<span class="otherAwardVar">微信扫码</span>完善收货信息，确保奖品能够送达哦~');
            $("#otherQrcode").css("display", "block");
            $("#otherQrcodeImg").css("display", "none");
            map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherInfo3"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            var enstr = enurl + "activeId=" + _kActiveId + "&rememberId=" + _kRememberId + "&userKeyId=" + _kUserKeyId + "&access_token=" + access_token;
            drawQrcode("otherQrcode", enstr, 180);
        }
    }
    if (_kAwardTypeId == 7) {
        var _redNumber = $("#otherBtn2").attr("redNumber");
        console.log(_redNumber);
        if (loginstatus == "false") {
            console.log("领取红包奖励+启登录");
            startAndSendLog();
        } else {
            console.log("领取红包奖励+展示二维码");
            $("#redNotGet").css("display", "block");
            $("#getOtherAward1").css("display", "none");
            if (_kActiveId == 95) {
                $("#redStrongPart").html("福卡红包");
            } else {
                $("#redStrongPart").html("瓜分红包");
            }
            $("#redContent").html('<span style="font-size: 112px;">' + _redNumber + '</span>元');
            console.log(_kActiveId + "--" + _kRememberId + "--" + _kUserKeyId);
            getRedPacketsQrcode(_kActiveId, _kRememberId, _kUserKeyId, "redQrcode", 260, 260);
            map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("redQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        }
    }
    if (_kAwardTypeId == 17) {
        console.log("点击了津贴奖励的马上领取");
        if (loginstatus == "false") {
            console.log("领取津贴奖励+启登录");
            startAndSendLog();
        } else {
            console.log("领取津贴奖励+跳转");
            $("#dialogPage").css("display", "none");
            $("#getOtherAward1").css("display", "none");
            $("#myAllowancePage").css("display", "block");
            map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
            sentLog("okr_web_page_show", '{"page_name":"我的津贴页面","activity_name":"春节集卡活动"}');
            _czc.push(['_trackEvent', '我的津贴页面', '春节集卡活动', '', '', '']);
        }
    }
}
//我的奖品
function getMyAwards(num) {
    console.log(macAddress + "--" + TVchip + "--" + TVmodel + "--" + emmcId + "--" + activityId);
    console.log(access_token + "--" + cOpenId + "--" + nick_name + "--" + actionId);
    var ajaxTimeoutOne = $.ajax({
        type: "POST",
        async: true,
        timeout: 10000,
        dataType: 'json',
        url: adressIp + "/building/cny/u-award",
        data: {
            "divideId":divideId,
            "MAC": macAddress,
            "cChip": TVchip,
            "cModel": TVmodel,
            "cEmmcCID": emmcId,
            "cUDID": activityId,
            "accessToken": access_token,
            "cOpenId": cOpenId,
            "cNickName": nick_name,
            "id": actionId
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if (data.code == 50100) {
                if (data.data.length == 0) {
                    if(num == 3){
                        console.log("津贴为0");
                        $("#allowanceMoney").html('<span style="font-size: 56px;">' + 0 + '</span>元');
                        $("#allowanceValue").html(0 + "元");
                        $("#allowanceNum").html(0 + "元");
                        return;
                    }
                    console.log("没有奖品");
                    var _isLessThanHalfhour = false;
                    if (_isLessThanHalfhour) {
                        console.log("没有奖品+冻结期");
                        $("#noAwardBox2").css("display", "block");
                        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("noAwardBtn2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    } else {
                        console.log("没有奖品+非冻结期");
                        $("#noAwardBox1").css("display", "block");
                        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("noAwardBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    }
                }else {
                    var _arr0 = new Array(); //津贴
                    var _arr1 = new Array(); //红包
                    var _arr2 = new Array(); //实体将
                    var _arr3 = new Array(); //第三方优惠券
                    for (var i = 0; i < data.data.length; i++) {
                        var _time = data.data[i].awardTime;
                        _time = _time.substr(0, 10);
                        var objItem = {
                            "awardName": data.data[i].awardName,
                            "awardTime": _time,
                            "awardType": data.data[i].awardTypeId,
                            "imgurl": data.data[i].awardUrl,
                            "state": data.data[i].awardExchangeFlag,
                            "userkeyId": data.data[i].userKeyId,
                            "awardId": data.data[i].awardId,
                            "rememberId": data.data[i].lotteryRememberId,
                            "lotteryActiveId": data.data[i].lotteryActiveId,
                        }
                        if (data.data[i].awardTypeId == "17") {
                            //购物津贴
                            objItem.price = data.data[i].awardInfo.price;
                            console.log(JSON.stringify(data.data[i]));
                            _arr0.push(objItem);
                        } else if (data.data[i].awardTypeId == "7" || data.data[i].awardTypeId == "15") {
                            //红包
                            objItem.redNumber = data.data[i].awardInfo.bonus;
                            _arr1.push(objItem);
                        } else if (data.data[i].awardTypeId == "2") {
                            //实物奖
                            console.log(data.data[i]);
                            if (data.data[i].awardExchangeFlag == 1) {
                                if (data.data[i].addressEntity.province == data.data[i].addressEntity.city) {
                                    objItem.awardAddress = data.data[i].addressEntity.city + data.data[i].addressEntity.area + data.data[i].addressEntity.address;
                                } else {
                                    objItem.awardAddress = data.data[i].addressEntity.province + data.data[i].addressEntity.city + data.data[i].addressEntity.area + data.data[i].addressEntity.address;
                                }
                                objItem.userPhone = data.data[i].addressEntity.userPhone;
                                objItem.userName = data.data[i].addressEntity.userName;
                            }
                            _arr2.push(objItem);
                        } else if (data.data[i].awardTypeId == "4") {
                            //第三方优惠券
                            _arr3.push(objItem);
                        }
                    }
                    if(num == 3){
                        console.log("有津贴");
                        var allMoney = 0;
                        for (var i = 0; i < arr0.length; i++) {
                            allMoney += parseFloat(arr0[i].price);
                        }
                        console.log(allMoney);
                        $("#allowanceMoney").html('<span style="font-size: 56px;">' + allMoney + '</span>元');
                        $("#allowanceValue").html(allMoney + "元");
                        $("#allowanceNum").html(allMoney + "元");
                        return;
                    }
                    if (_arr0.length + _arr1.length + _arr2.length + _arr3.length == 0) {
                        console.log("没有奖品");
                        if (_isLessThanHalfhour) {
                            console.log("没有奖品+冻结期");
                            $("#noAwardBox2").css("display", "block");
                            map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("noAwardBtn2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        } else {
                            console.log("没有奖品+非冻结期");
                            $("#noAwardBox1").css("display", "block");
                            map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("noAwardBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        }
                    } else {
                        console.log("有奖品");
                        document.getElementById("redTabs").innerHTML = '';
                        document.getElementById("entityTabs").innerHTML = '';
                        document.getElementById("couponTabs").innerHTML = '';
                        $("#myAwardBox").css("display", "block");
                        showMyAward(_arr0, _arr1, _arr2, _arr3);
                    }
                }
            } else {
                console.log("data.code != 50100");
            }
        },
        error: function() {
            console.log("-----------------------error");
        },
        complete: function(XMLHttpRequest, status) {
            console.log("-------------complete------------------" + status);
            if (status == 'timeout') {
                ajaxTimeoutOne.abort();
            }
        }
    });
}
//生成我的奖品
function showMyAward(arr0, arr1, arr2, arr3) {
    console.log(JSON.stringify(arr0));
    console.log(JSON.stringify(arr1));
    console.log(JSON.stringify(arr2));
    console.log(JSON.stringify(arr3));
    $("#myAwardBox").css("display", "block");
    if (arr0.length != 0) {
        $("#allowanceBox").css("display", "block");
        $("#awardTabBox").css("display", "inline-block");
        $("#allowanceAward").attr('awardType', arr0[0].awardType);
        $("#allowanceAward").attr('awardState', 0);
        var allMoney = 0;
        for (var i = 0; i < arr0.length; i++) {
            allMoney += parseFloat(arr0[i].price);
        }
        console.log(allMoney);
        $("#allowanceMoney").html('<span style="font-size: 56px;">' + allMoney + '</span>元');
        $("#allowanceValue").html(allMoney + "元");
        $("#allowanceNum").html(allMoney + "元");
    }
    if (arr1.length != 0) {
        $("#redBox").css("display", "inline-block");
        var _cardRedNum = 0; //记录已领取的红包总额
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].state == 1) {
                //已领取的红包（福卡和瓜分）
                _cardRedNum += parseFloat(arr1[i].redNumber);
            } else if (arr1[i].state == 0) {
                var redDiv = document.createElement("div");
                redDiv.setAttribute('id', 'redAward' + i);
                redDiv.setAttribute('awardType', arr1[i].awardType);
                redDiv.setAttribute('awardState', arr1[i].state);
                redDiv.setAttribute('rememberId', arr1[i].rememberId);
                redDiv.setAttribute('userkeyId', arr1[i].userkeyId);
                redDiv.setAttribute('awardName', arr1[i].awardName);
                redDiv.setAttribute('awardTime', arr1[i].awardTime);
                redDiv.setAttribute('redNumber', arr1[i].redNumber);
                redDiv.setAttribute('lotteryActiveId', arr1[i].lotteryActiveId);
                redDiv.setAttribute('class', 'myAwards coocaa_btn2');
                if (arr1[i].lotteryActiveId == 95) {
                    //未领取的福卡红包
                    redDiv.innerHTML = '<img class="fullImg" src="images/award/cardRed.png"/><img class="imgFocus" src="images/award/awardBorder.png"/><div id="redMoney2" class="awardMoney"><span style="font-size: 56px;">' + arr1[i].redNumber + '</span>元</div>';
                } else {
                    //未领取的瓜分红包
                    redDiv.innerHTML = '<img class="fullImg" src="images/award/carveRed.png"/><img class="imgFocus" src="images/award/awardBorder.png"/><div id="redMoney1" class="awardMoney"><span style="font-size: 56px;">' + arr1[i].redNumber + '</span>元</div>';
                }
                $("#redTabs").append(redDiv);
            }
        }
        if (_cardRedNum != 0) {
            var redDiv = document.createElement("div");
            redDiv.setAttribute('id', 'redAwardHasGot');
            redDiv.setAttribute('awardType', 7);
            redDiv.setAttribute('awardState', 1);
            redDiv.setAttribute('class', 'myAwards coocaa_btn2');
            redDiv.innerHTML = '<img class="fullImg" src="images/award/cashRed.png"/><img class="imgFocus" src="images/award/awardBorder.png"/><div id="redMoneyHasGot" class="awardMoney"><span style="font-size: 56px;">' + _cardRedNum + '</span>元</div>';
            $("#redTabs").append(redDiv);
        }
    }
    if (arr2.length != 0) {
        $("#entityBox").css("display", "inline-block");
        for (var i = 0; i < arr2.length; i++) {
            var entityDiv = document.createElement("div");
            entityDiv.setAttribute('id', 'entityAward' + i);
            entityDiv.setAttribute('awardState', arr2[i].state);
            entityDiv.setAttribute('awardType', arr2[i].awardType);
            entityDiv.setAttribute('rememberId', arr2[i].rememberId);
            entityDiv.setAttribute('userkeyId', arr2[i].userkeyId);
            entityDiv.setAttribute('awardName', arr2[i].awardName);
            entityDiv.setAttribute('awardTime', arr2[i].awardTime);
            entityDiv.setAttribute('class', 'myAwards coocaa_btn2');

            if (arr2[i].state == 0) {
                entityDiv.innerHTML = '<img class="fullImg" src="images/award/entityNotGet.png"/><img class="imgFocus" src="images/award/awardBorder.png"/><img class="entityImg" src="' + arr2[i].imgur + '"/><div id="entityName1" class="entityName"><div class="entitySon">' + arr2[i].awardName + '</div></div>';
            } else {
                entityDiv.setAttribute('awardAddress', arr2[i].awardAddress);
                entityDiv.setAttribute('userPhone', arr2[i].userPhone);
                entityDiv.setAttribute('userName', arr2[i].userName);
                entityDiv.innerHTML = '<img class="fullImg" src="images/award/entityHasGot.png"/><img class="imgFocus" src="images/award/awardBorder.png"/><img class="entityImg" src="' + arr2[i].imgur + '"/><div id="entityName1" class="entityName"><div class="entitySon">' + arr2[i].awardName + '</div></div>';
            }
            $("#entityTabs").append(entityDiv);
        }
    }
    if (arr3.length != 0) {
        $("#couponBox").css("display", "inline-block");
        for (var i = 0; i < arr3.length; i++) {
            var couponDiv = document.createElement("div");
            couponDiv.setAttribute('id', 'thirdAward' + i);
            couponDiv.setAttribute('awardState', arr3[i].state);
            couponDiv.setAttribute('awardType', arr3[i].awardType);
            couponDiv.setAttribute('awardName', arr3[i].awardName);
            couponDiv.setAttribute('awardTime', arr3[i].awardTime);
            console.log(arr3[i].imgurl);
            couponDiv.setAttribute('imgurl', arr3[i].imgurl);
            couponDiv.setAttribute('class', 'myAwards coocaa_btn2');
            couponDiv.innerHTML = '<img class="fullImg" src="images/award/couponNoUse.png"/><img class="imgFocus" src="images/award/awardBorder.png"/><div id="thirdMoney"' + i + ' class="thirdMoney"><span style="font-size: 56px;">1225</span>元</div>';
            $("#couponTabs").append(couponDiv);
        }
    }
    if (_curHomeBtn == "" || _curHomeBtn == null) {
        map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
    } else {
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById(_curHomeBtn), "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
    buttonInitAfter();
}

function showThisAwardDialog(awardObj, mode) {
    console.log(JSON.stringify(awardObj));
    console.log(awardObj.awardTypeId);

    var _cawardId = awardObj.awardId; //奖品id
    var _cactiveId = awardObj.lotteryActiveId; //奖品活动id
    var _crememberId = awardObj.lotteryRememberId; //奖品记录id
    var _cuserKeyId = awardObj.userKeyId; //抽奖用户的userkeyid
    var _cawardName = awardObj.awardName; //奖品名称
    var _cawardTime = awardObj.awardTime; //获奖时间
    _cawardTime = _cawardTime.substr(0, 10);
    var _cawardUrl = awardObj.awardUrl; //奖品url
    var _cawardTypeId = awardObj.awardTypeId; //奖品类型

    if (mode == "lottery") {
        sentLog("okr_web_clicked_result", '{"page_name":"点击抽卡","activity_name":"春节集卡活动","award_result":"抽卡成功","award_type":"' + _cawardTypeId + '","award_name":"' + _cawardName + '"}');
        _czc.push(['_trackEvent', '点击抽卡', '春节集卡活动', '抽卡成功-'+_cawardTypeId+'-'+_cawardName, '', '']);
    } else {
        sentLog("okr_web_clicked_result", '{"page_name":"点击翻卡","activity_name":"春节集卡活动","award_result":"翻卡成功","award_type":"' + _cawardTypeId + '","award_name":"' + _cawardName + '"}');
        _czc.push(['_trackEvent', '点击抽卡', '春节集卡活动', '翻卡成功-'+_cawardTypeId+'-'+_cawardName, '', '']);
    }

    if (awardObj.awardTypeId == 2 || awardObj.awardTypeId == 7 || awardObj.awardTypeId == 17) {
        $("#otherBtn2").attr("activeId", _cactiveId);
        $("#otherBtn2").attr("awardId", _cawardId);
        $("#otherBtn2").attr("rememberId", _crememberId);
        $("#otherBtn2").attr("userKeyId", _cuserKeyId);
        $("#otherBtn2").attr("awardTypeId", _cawardTypeId);
        $("#otherBtn2").attr("awardName", _cawardName);
        $("#otherBtn2").attr("awardTime", _cawardTime);
        $("#otherBtn2").attr("awardUrl", _cawardUrl);
    }
    if (awardObj.awardTypeId == 12) {
        $("#otherImgBox2").attr("awardTypeId", _cawardTypeId);
        $("#otherImgBox2").attr("awardName", _cawardName);
        $("#otherImgBox2").attr("awardVideo", awardObj.awardInfo.url);
    }


    $(".secondDialog").css("display", "none");
    if (awardObj.awardTypeId == 2) {
        console.log("抽到实物奖");
        $("#dialogPage").css("display", "block");
        $("#getOtherAward1").css("display", "block");
        $("#otherImgBox1").css("background-image", "url(images/foca/entity.png)");
        $("#otherAwardName1").html("恭喜获得" + awardObj.awardName);
        $("#redAwardNum").css("display", "none");
        $("#allAwardNum").css("display", "none");
        $("#entityAwardImg").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherBtn2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        $("#otherBtn2 .btnName").html("领取奖励");
    }
    if (awardObj.awardTypeId == 4) {
        console.log("抽到第三方优惠券");
        $("#dialogPage").css("display", "block");
        $("#getOtherAward2").css("display", "block");
        $("#otherImgBox2").css("background-image", "url(images/foca/thirdcoupon.png)");
        $("#otherAwardName2").html("恭喜获得" + awardObj.awardName);
        $("#thirdAwardImg").attr("src", awardObj.awardUrl);
        $("#thirdAwardImg").css("display", "block");
        $("#otherAwardInfo2").html("请使用京东APP扫码领取");
        map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherImgBox2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
    if (awardObj.awardTypeId == 6) {
        console.log("抽到福卡");
        $("#dialogPage").css("display", "block");
        $("#getFoca").css("display", "block");
        $("#focaImg").css("background-image", "url(" + awardObj.awardUrl + ")");
        map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
    if (awardObj.awardTypeId == 7) {
        console.log("抽到红包");
        $("#dialogPage").css("display", "block");
        $("#getOtherAward1").css("display", "block");
        $("#otherAwardName1").html("恭喜获得" + awardObj.awardName);
        $("#otherBtn2 .btnName").html("领取奖励");
        $("#otherImgBox1").css("background-image", "url(images/foca/focared.png)");
        if (awardObj.lotteryActiveId == 95) {
            $("#redAwardNum").css("color", "#fedd7e");
        } else {
            $("#redAwardNum").css("color", "#c53f19");
        }
        $("#redAwardNum").html(awardObj.awardInfo.bonus);
        $("#otherBtn2").attr("redNumber", awardObj.awardInfo.bonus);
        $("#redAwardNum").css("display", "block");
        $("#allAwardNum").css("display", "none");
        $("#entityAwardImg").css("display", "none");
        map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherBtn2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
    if (awardObj.awardTypeId == 12) {
        console.log("抽到视频");
        $("#dialogPage").css("display", "block");
        $("#getOtherAward2").css("display", "block");
        $("#otherImgBox2").css("background-image", "url(images/foca/video.png)");
        $("#otherAwardName2").html("恭喜获得" + awardObj.awardName);
        $("#thirdAwardImg").css("display", "none");
        $("#otherAwardInfo2").html("按返回关闭弹窗");
        map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherImgBox2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
    if (awardObj.awardTypeId == 14) {
        console.log("抽到新年签");
        $("#dialogPage").css("display", "block");
        $("#getOtherAward2").css("display", "block");
        $("#otherImgBox2").css("background-image", "url(" + awardObj.awardUrl + ")");
        $("#otherAwardName2").html("恭喜获得" + awardObj.awardName);
        $("#thirdAwardImg").css("display", "none");
        $("#otherAwardInfo2").html("按返回关闭弹窗");
        map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherImgBox2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
    if (awardObj.awardTypeId == 17) {
        console.log("抽到津贴");
        $("#dialogPage").css("display", "block");
        $("#getOtherAward1").css("display", "block");
        $("#otherAwardName1").html("恭喜获得" + awardObj.awardName);
        $("#otherBtn2 .btnName").html("立即使用");
        $("#otherImgBox1").css("background-image", "url(images/foca/allowance.png)");
        $("#allAwardNum").html(awardObj.awardInfo.price);
        $("#redAwardNum").css("display", "none");
        $("#allAwardNum").css("display", "block");
        $("#entityAwardImg").css("display", "none");
        map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("otherBtn2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
}

function getRedPacketsQrcode(activityId, rememberId, userKeyId, id, width, height) {
    console.log(rememberId + "--" + userKeyId + "--" + id);
    var ajaxTimeoutFive = $.ajax({
        type: "GET",
        async: true,
        timeout: 5000,
        dataType: 'jsonp',
        jsonp: "callback",
        url: adressIp + "/v3/lottery/verify/wechat/qrCode",
        data: {
            "activeId": activityId,
            "MAC": macAddress,
            "cChip": TVchip,
            "cModel": TVmodel,
            "cEmmcCID": emmcId,
            "cUDID": activityId,
            "accessToken": access_token,
            "cOpenId": cOpenId,
            "cNickName": nick_name,
            "rememberId": rememberId,
            "userKeyId": userKeyId,
            "luckyDrawCode": "newYear",
            "channel": "coocaa",
            "type": 23
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if (data.code == "200") {
                document.getElementById(id).innerHTML = "";
                var str = data.data;
                var qrcode = new QRCode(document.getElementById(id), {
                    width: width,
                    height: height
                });
                qrcode.makeCode(str);
            }
        },
        error: function() {
            console.log("获取失败");
        },
        complete: function(XMLHttpRequest, status) {
            console.log("lxw -------------complete------------------" + status);
            if (status == 'timeout') {
                ajaxTimeoutFive.abort();
            }
        }
    });
}
//绘制二维码
function drawQrcode(id, url, wh) {
    document.getElementById(id).innerHTML = "";
    var qrcode = new QRCode(document.getElementById(id), {
        width: wh,
        height: wh
    });
    qrcode.makeCode(url);
}

function exit() {
    navigator.app.exitApp();
}
var appDown = {
    //移除监听
    removeApklisten: function() {
        coocaaosapi.removeAppTaskListener(function(message) {});
    },
    //监听下载状态
    listenApp: function() {
        coocaaosapi.addAppTaskListener(function(message) {
            console.log("msg.status ==" + message.status + "======url======" + message.url + "=========num=====" + showprogress);
            if (message.status == "ON_DOWNLOADING") {
                if (showprogress != message.progress) {
                    showprogress = message.progress;
                }
            } else if (message.status == "ON_COMPLETE") {
                waitApkInstallFunc = setTimeout('appDown.downFail()', 120000);
            } else if (message.status == "ON_STOPPED") {
                appDown.downFail()
            } else if (message.status == "ON_REMOVED" && message.url == "https://apk-sky-fs.skysrt.com/uploads/20181030/20181030114924347482.apk") {
                clearTimeout(waitApkInstallFunc);
                var a = '{ "pkgList": ["com.coocaa.ie"] }'
                coocaaosapi.getAppInfo(a, function(message) {
                    console.log("getAppInfo====" + message);
                    var b = "com.coocaa.ie";
                    gameVersion = JSON.parse(message)[b].versionCode;
                }, function(error) {
                    console.log("getAppInfo----error" + JSON.stringify(error))
                });
                appDown.removeApklisten();
            }
        });
    },

    //下载安装失败
    downFail: function() {
        downToast = "游戏加载失败，正在重试...";
        downGameFalse = true;
        clearTimeout(waitApkInstallFunc);
        appDown.removeApklisten();
    },

    //下载安装apk
    createDownloadTask: function(apkurl, md5, title, pkgname, appid, iconurl) {
        coocaaosapi.createDownloadTask(
            apkurl, md5, title, pkgname, appid, iconurl,
            function(message) {
                downToast = "游戏正在努力加载中~请在加载完毕后再次点击进入";
            },
            function(error) {
                console.log(error);
                console.log("调用失败");
            }
        )
    },
}

function initMap(setFocus) {
    initBtn();
    var setFocus = setFocus;
    if (needRememberFocus) {
        needRememberFocus = false;
        setFocus = rememberBtn;
    }
    setFocuss = setFocus;
    console.log("--------" + setFocus);
    map = new coocaakeymap($(".coocaabtn"), $(setFocus), "btnFocus", function() {}, function(val) {}, function(obj) {});
    $(setFocus).trigger("itemFocus");

    if (needshowdialog1) {
        needshowdialog1 = false;
        console.log("展示任务完成弹窗");
        $("#blackBg").show();
        $("#indexWindow").show();
        $("#finishMissionWindow").show();
        $("#addchanceaftermission").html(addNum);
        map = new coocaakeymap($("#finishMissionWindow"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    } else if (needshowdialog2) {
        needshowdialog2 = false;
        console.log("展示最后一天提示弹窗");
        $("#blackBg").show();
        $("#indexWindow").show();
        $("#lastDayWindow").show();
        map = new coocaakeymap($("#lastDayWindow"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    } else if (needshowdialog3) {
        needshowdialog3 = false;
        console.log("展示交易完成弹窗");
        $("#blackBg").show();
        $("#indexWindow").show();
        $("#dealFinishWindow").show();
        map = new coocaakeymap($("#dealFinishWindow .homewindowbtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    } else if (needshowdialog4) {
        needshowdialog4 = false;
        $("#blackBg").show();
        console.log("展示合成弹窗");
        $("#compound").show();
        setTimeout(hecheng, 1000)

        function hecheng() {
            $(".fbox").css({ "top": "413px", "left": "853px", "opacity": "0" })
        }
        setTimeout(showCenter, 2000);

        function showCenter() {
            $("#b10").show();
            $("#b10").css("opacity", "1");
        }
        setTimeout(showFinalWindow, 3500);

        function showFinalWindow() {
            $("#b10").hide();
            $("#compoundWindow").show();
            map = new coocaakeymap($("#compoundWindow .homewindowbtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        }
    } else if (needshowdialog5) {
        needshowdialog5 = false;
        console.log("展示瓜分弹窗");
        $("#blackBg").show();
        $("#indexWindow").show();
        $("#enjoyAwardWindow").show();
        $("#enjoyAwardWindowWord").html("123元");
        map = new coocaakeymap($("#enjoyAwardWindow"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    }

}

function initBtn() {
    buttonInitBefore();
    $("#finishMyAwardGet").unbind("itemFocus").bind("itemFocus", function() {
        $("#youhave").css("margin-top", "0px");
    })
    $("#finishMyAwardBtn").unbind("itemFocus").bind("itemFocus", function() {
        $("#youhave").css("margin-top", "-460px");
    })

    $("#finishMissionWindow").unbind("itemClick").bind("itemClick", function() {
        $("#blackBg").hide();
        $(".window").hide();
        initMap(setFocuss);
    })
    $("#lastDayWindow").unbind("itemClick").bind("itemClick", function() {
        $("#blackBg").hide();
        $(".window").hide();
        initMap(setFocuss);
    })
    $("#dealbtn1").unbind("itemClick").bind("itemClick", function() {
        $("#blackBg").hide();
        $(".window").hide();
        initMap(setFocuss);
    })
    $("#dealbtn2").unbind("itemClick").bind("itemClick", function() {
        $("#blackBg").hide();
        $(".window").hide();
        coocaaosapi.startNewBrowser4(mydealurl, function() { needFresh = true; }, function() {});
    })
    $("#compoundbtn1").unbind("itemClick").bind("itemClick", function() {
        $("#blackBg").hide();
        $(".window").hide();
        showPage(false, false);
    })
    $("#compoundbtn2").unbind("itemClick").bind("itemClick", function() {
        $("#blackBg").hide();
        $(".window").hide();
        // initMap(setFocuss);
    })
    $("#getAwardWindow").unbind("itemClick").bind("itemClick", function() {})
    $("#enjoyAwardWindow").unbind("itemClick").bind("itemClick", function() {
        $("#enjoyAwardWindow").hide();
        $("#getAwardWindow").show();
        $("#getAwardWindowWord").html("123元");
        map = new coocaakeymap($("#getAwardWindow"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        getRedPacketsQrcode(95, 80960, 49971737, "getAwardWindowCode", 200, 200)
    })


    $("#rule").unbind("itemClick").bind("itemClick", function() {
        sentLog("okr_web_button_click", '{"button_name":"活动细则","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '"}');
        _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '活动细则点击', '', '']);
        $("#mainbox").hide();
        $("#rulePage").show();
        sentLog("okr_web_page_show", '{"page_name":"活动细则页面","activity_name":"春节集卡活动"}');
        _czc.push(['_trackEvent', '春节集卡活动', '活动细则页面', '', '', '']);
        map = new coocaakeymap($("#ruleInner"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    })

    $("#allowance").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了购物津贴+跳转页面");
        $("#myAllowancePage").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});

        sentLog("okr_web_button_click", '{"button_name":"可用津贴","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '"}');
        _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '可用津贴点击', '', '']);
        sentLog("okr_web_page_show", '{"page_name":"我的津贴页面","activity_name":"春节集卡活动"}');
        _czc.push(['_trackEvent', '春节集卡活动', '我的津贴页面曝光', '', '', '']);
    })

    $("#mygift").unbind("itemClick").bind("itemClick", function() {
        sentLog("okr_web_button_click", '{"button_name":"我的奖励","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '"}');
        _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '我的奖励点击', '', '']);
        sentLog("okr_web_page_show", '{"page_name":"我的奖励","activity_name":"春节集卡活动","last_page_name":"春节集卡活动主页"}');
        _czc.push(['_trackEvent', '春节集卡活动', '我的奖励曝光', '', '', '']);
        $("#myAwardPage").css("display", "block");
        getMyAwards(2);
    })

    $(".topbtn").unbind("itemFocus").bind("itemFocus", function() {
        if (gameStatus == 2) {
            $(".topbtn").attr("downtarget", "#myCard");
        }
    })

    $("#myCard").unbind("itemFocus").bind("itemFocus", function() {
        $("#myCard").attr("lefttarget", "#missionBtn");
        if (isTrade) {
            $("#myCard").attr("righttarget", "#buyZoneBtn");
        }
    })

    $("#myCard").unbind("itemClick").bind("itemClick", function() {
        sentLog("okr_web_button_click", '{"button_name":"更多我的福卡","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '"}');
        _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '更多我的福卡点击', '', '']);
        coocaaosapi.startNewBrowser4(mycardurl, function() {
            needFresh = true;
            rememberBtn = "#myCard";
            needRememberFocus = true
        }, function() {});
    })

    $("#missionBtn").unbind("itemClick").bind("itemClick", function() {
        sentLog("okr_web_button_click", '{"button_name":"进去看看","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '"}');
        _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '进去看看点击', '', '']);
        sentLog("okr_web_page_show", '{"page_name":"任务中心页面","activity_name":"春节集卡活动","last_page_name":"春节集卡活动主页"}');
        _czc.push(['_trackEvent', '春节集卡活动', '任务中心页面曝光', '', '', '']);
        coocaaosapi.startNewBrowser3(taskurl, function() {
            needFresh = true;
            rememberBtn = "#missionBtn";
            needRememberFocus = true
        }, function() {});
    })

    $("#buyZoneBtn").unbind("itemClick").bind("itemClick", function() {
        sentLog("okr_web_button_click", '{"button_name":"更多交易","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '"}');
        _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '更多交易点击', '', '']);
        coocaaosapi.startNewBrowser4(marketurl, function() {
            needFresh = true;
            rememberBtn = "#overChance";
            needRememberFocus = true
        }, function() {});
    })

    $("#overChance").unbind("itemClick").bind("itemClick", function() {
        sentLog("okr_web_button_click", '{"button_name":"剩余抽卡机会","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '"}');
        _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '更多交易点击', '', '']);
        var nowTime = new Date().getTime();
        var clickTime = $("#overChance").attr("ctime");
        if(clickTime != 'undefined' && (nowTime - clickTime < 3000)) {
            console.log('操作过于频繁，稍后再试');
            return false;
        } else {
            console.log("开始抽奖");
            $("#overChance").attr("ctime", nowTime);
            var hasChance = true;
            if (hasChance) {
                startDrawFunc("lottery");
            } else{
                console.log("没有抽卡机会");
                $("#dialogPage").css("display","block");
                $("#noChance").css("display","block");
                map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        }
    })

    $(".block").unbind("itemClick").bind("itemClick", function() {
        var block_name = $(this).attr("block_name");
        var block_bussiness_type = $(this).attr("business");
        var blockNum = $(".block").index($(this));
        remembernum = $(".block").index($(this));
        var block_order = "入口一";
        if ((blockNum + 1) % 3 == 0) {
            block_order = "入口三";
        } else if ((blockNum + 1) % 3 == 2) {
            block_order = "入口二";
        }
        sentLog("okr_web_button_click", '{"button_name":"各业务入口","page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","link_type":"' + link_type + '","block_name":"' + block_name + '","block_order":"' + block_order + '","block_bussiness_type":"' + block_bussiness_type + '"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '打包清单点击', '', '']);
        var startAction = $(this).attr("action");
        var pkgname = JSON.parse(startAction).packagename;
        var bywhat = JSON.parse(startAction).bywhat;
        var byvalue = JSON.parse(startAction).byvalue;
        var needversioncode = JSON.parse(startAction).versioncode;
        var hasversioncode = "";
        var a = '{ "pkgList": ["' + pkgname + '"] }';
        var param1 = "",
            param2 = "",
            param3 = "",
            param4 = "",
            param5 = "";
        var str = "[]";
        coocaaosapi.getAppInfo(a, function(message) {
            console.log("getAppInfo====" + message);
            if (JSON.parse(message)[pkgname].status == -1) {
                coocaaosapi.startAppStoreDetail(pkgname, function() {}, function() {});
            } else {
                hasversioncode = JSON.parse(message)[pkgname].versionCode;
                // hasversioncode = "307";
                if (bywhat == "activity" || bywhat == "class") {
                    param1 = pkgname;
                    param2 = byvalue;
                } else if (bywhat == "uri") {
                    param1 = pkgname;
                    param5 = byvalue
                } else if (bywhat == "pkg") {
                    param1 = pkgname;
                } else if (bywhat == "action") {
                    param1 = "action";
                    param2 = byvalue;
                    param3 = pkgname;
                }
                if (JSON.stringify(JSON.parse(startAction).params) != "{}") {
                    str = '[' + JSON.stringify(JSON.parse(startAction).params).replace(/,/g, "},{") + ']'
                }
                if (hasversioncode < needversioncode) {
                    var appName = "";
                    if (block_bussiness_type == "教育" || block_bussiness_type == "影视") {
                        appName = "影视-教育（YSJY）";
                        $("#needUpdate").show();
                        $("#blackBg").show();
                        $("#needUpdate").css("background", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/movieupdate.png)");
                        map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        toastTimeout = setTimeout(hideToast, 5000);
                    } else if (block_bussiness_type == "购物") {
                        appName = "优选购物（YXGW）";
                        $("#needUpdate").show();
                        $("#blackBg").show();
                        $("#needUpdate").css("background", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/mallupdate.png)");
                        map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        toastTimeout = setTimeout(hideToast, 5000);
                    }
                    console.log("当前版本过低，请前往应用圈搜索进行" + appName + "升级");
                } else {
                    coocaaosapi.startCommonNormalAction(param1, param2, param3, param4, param5, str, function() { needSentADLog = true; }, function() {});
                }
            }
        }, function(error) {
            console.log("getAppInfo----error" + JSON.stringify(error));
            coocaaosapi.startAppStoreDetail(pageid, function() {}, function() {});
        });
    })
    $(".block").unbind("itemFocus").bind("itemFocus", function() {
        $("#arrows").hide();
        var num = $(".block").index($(this));
        var x = 0;
        switch (num) {
            case 0:
            case 1:
            case 2:
                x = "540";
                break;
            case 3:
            case 4:
            case 5:
                x = "900";
                break;
            case 6:
            case 7:
            case 8:
                x = "1260";
                break;
            case 9:
            case 10:
            case 11:
                x = "1510";
                break;
        }
        $("#mainbox").css("transform", "translate3D(0, -" + x + "px, 0)");
    })
    $(".block").unbind("itemBlur").bind("itemBlur", function() {
        $("#arrows").show();
        $("#mainbox").css("transform", "translate3D(0, -" + 0 + "px, 0)");
    })
}

function buttonInitBefore() {
    $(".allowanceItemLi").unbind("itemFocus").bind("itemFocus", function() {
        var _FocusIndex = $(".allowanceItemLi").index($(this));
        var _times = Math.floor(parseInt(_FocusIndex) / 5);
        var _eachheight = $(".allowanceItemLi")[0].offsetHeight - 30;
        var myScrollTopValue = _times * _eachheight;
        $("#allowanceItemBox").stop(true, true).animate({ scrollTop: myScrollTopValue }, { duration: 0, easing: "swing" });
    });
    $(".allowanceItemLi").unbind("itemClick").bind("itemClick", function() {
        var _FocusIndex = $(".allowanceItemLi").index($(this));
        var _couponGoodsId = ["6475", "17076", "17074", "17740", "18003", "15980", "17364"];
        sentLog("okr_web_button_click", '{"page_name":"我的津贴页面","activity_name":"春节集卡活动","button_name":"' + _FocusIndex + '"}');
        _czc.push(['_trackEvent', '我的津贴页面', '春节集卡活动', _FocusIndex, '', '']);
        if (_FocusIndex == 0) {
            console.log(movieSource);
            if (movieSource == "tencent") {
                coocaaosapi.startMovieMemberCenter("5", function(message) { console.log(message); }, function(error) {});
            } else {
                coocaaosapi.startMovieMemberCenter("1", function(message) { console.log(message); }, function(error) {});
            }
        } else if (_FocusIndex == 1) {
            coocaaosapi.startMovieMemberCenter("57", function(message) { console.log(message); }, function(error) {});
        } else if (_FocusIndex == 9) {
            coocaaosapi.startAppShopZone2("193", function(message) { console.log(message); }, function(error) {});
        } else {
            coocaaosapi.startAppShopDetail(_couponGoodsId[_FocusIndex - 2], function(message) { console.log(message); }, function(error) {});
        }
    });

    $("#noChanceBtn").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了去做任务");

    });
    $("#otherBtn1").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了再看看");
        $("#getOtherAward1").css("display", "none");
        $("#dialogPage").css("display", "none");
        // map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        showPage(false,false);
    });
    $("#otherBtn2").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了领取奖励");
        otherBtn2ClickFunc();
    });
    $("#detainBtn1").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了坚决退出");
        $("#detain").css("display", "none");
        $("#dialogPage").css("display", "none");
        // map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        showPage(false,false)
    });
    $("#detainBtn2").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了我要翻卡");
        $("#detain").css("display", "none");
        $("#getFoca").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn3"), document.getElementById("focaImg"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    });
    $("#otherImgBox2").unbind("itemClick").bind("itemClick", function() {
        if (_curAwardType == 12) {
            console.log("点击了视频");
            var _curAwardType = $("#otherImgBox2").attr("awardTypeId");
            var _curAwardName = $("#otherImgBox2").attr("awardName");
            var _curAwardVideoUrl = $("#otherImgBox2").attr("awardVideo");
            console.log(_curAwardType + "--" + _curAwardVideoUrl);
            coocaaosapi.startCommonWebview("cjvideo", _curAwardVideoUrl, _curAwardName, "1080", "1920", "", "祝福视频", _curAwardVideoUrl, function(message) { console.log(message); }, function(error) { console.log("error"); });
        }
    });
    $("#focaImg").unbind("itemClick").bind("itemClick", function() {
        var nowTime = new Date().getTime();
        var clickTime = $("#focaImg").attr("ctime");
        if (clickTime != 'undefined' && (nowTime - clickTime < 3000)) {
            console.log('操作过于频繁，稍后再试');
            return false;
        } else {
            console.log("点击了翻卡");
            removeBackButton = true;
            $("#focaImg").attr("ctime", nowTime);
            $("#focaImg").css("transition", "all 3s");
            $("#focaImg").css("transform", "rotateY(360deg)");
            $("#focaImg").css("-ms-transform", "rotateY(360deg)");
            $("#focaImg").css("-moz-transform", "rotateY(360deg)");
            $("#focaImg").css("-webkit-transform", "rotateY(360deg)");
            $("#focaImg").css("-o-transform", "rotateY(360deg)");
            setTimeout(function() {
                removeBackButton = false;
                $("#focaImg").css("transition", "all 0s");
                $("#focaImg").css("transform", "rotateY(0deg)");
                $("#focaImg").css("-ms-transform", "rotateY(0deg)");
                $("#focaImg").css("-moz-transform", "rotateY(0deg)");
                $("#focaImg").css("-webkit-transform", "rotateY(0deg)");
                $("#focaImg").css("-o-transform", "rotateY(0deg)");
                startDrawFunc("filpCard");
            }, 3000);
        }
    });
}


function showAwardlist(box, inner, name) {
    if (name == "1") {
        clearInterval(marqueeInterval1);
    } else {
        clearInterval(marqueeInterval2);
    }
    var boxHeight = $(box).height();
    var listHeight = $(inner).height();
    var screenNum = Math.ceil(listHeight / boxHeight);
    console.log("---" + boxHeight + "---" + listHeight + "----" + screenNum + "---")
    var a = 1;
    if (screenNum > 1) {
        if (name == "1") {
            marqueeInterval1 = setInterval(marquee, 3000);
        } else {
            marqueeInterval2 = setInterval(marquee, 3000);
        }
    }

    function marquee() {
        $(inner).css("transform", "translate3D(0, -" + a * boxHeight + "px, 0)");
        a++;
        if (a == screenNum) { a = 0 }
    }
}

function hideToast() {
    clearTimeout(toastTimeout);
    $("#blackBg").hide();
    $("#needUpdate").hide();
    map = new coocaakeymap($(".coocaabtn"), $(".block:eq(" + remembernum + ")"), "btnFocus", function() {}, function(val) {}, function(obj) {});
}

//页面初始化或刷新
function showPage(first, resume) {
    console.log("$$$$$$$$$$$$$$$$$$====" + first + "===========" + resume);
    if (first) {
        checkVersion();
    }
    console.log("---" + macAddress + "------" + TVchip + "-----" + TVmodel + "------" + emmcId + "--------" + activityId + "---------" + access_token + "-------" + cOpenId);
    $.ajax({
        type: "post",
        async: true,
        url: adressIp + "/building/cny/init",
        data: { divideId:divideId, id: actionId, cChip: TVchip, cModel: TVmodel, cUDID: activityId, MAC: macAddress, cEmmcCID: emmcId, cOpenId: cOpenId, cNickName: nick_name, cAvatar: avatar },
        dataType: "json",
        // timeout: 20000,
        success: function(data) {
            console.log("初始化返回状态：" + JSON.stringify(data));
            showAwardInfo();
            selectAd("adStation", "CCADTV10017", "G0003", "1", "1", "1", "", "");
            isTrade = data.data.isTrade;
            var collectNum = data.data.collectNum || 0;
            $("#collectNum").html(collectNum);
            if (data.code == "50100") {
                page_type = "集市未开启";
                gameStatus = 1;
                remainNum = data.data.remainingNumber || 0;
                $("#chanceNum").html(remainNum);
                localChanceNum = localStorage.getItem("lastChance") || 0;
                addNum = remainNum - localChanceNum;
                console.log("============lastChance==========" + localChanceNum);
                if (remainNum > localChanceNum) {
                    $("#moveChace").show();
                    $("#moveChace").html("+" + addNum);
                    $("#moveChace").addClass("showmove");
                    setTimeout(removeClass, 1500)

                    function removeClass() {
                        $("#moveChace").hide();
                        $("#moveChace").removeClass("showmove")
                    }
                    localStorage.setItem("lastChance", remainNum)
                }
                if (data.data.alter > 0) {
                    needshowdialog1 = true;
                }
                //test:集市开启
                if (data.data.isTrade) {
                    page_type = "集市已经开启";
                    $("#buyZoneImg").show();
                    $("#buyZoneBtn").show();
                    $(".bgdiv").hide();
                    $("#normalbg").show();
                }
                if (new Date(data.data.systemTime).getTime() > 1548864000000 ) {
                    if(data.data.isFirstInitToday){
                        needshowdialog2 = true;
                    }
                    page_type = "开奖当天";
                }
            } else {
                if (data.code == 50046) { //集市冻结
                    _isLessThanHalfhour = true;
                    page_type = "数据冻结期";
                    gameStatus = 2;
                    $(".bgdiv").hide();
                    $("#stopbg").show();
                    $("#missionBtn").hide();
                    $("#missionImg").hide();
                    // $("#myCard").hide();
                    $("#overChance").hide();
                    $("#topBanner").css("background", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/stopBg.jpg)");
                } else {
                    gameStatus = 3;
                    $("#topBanner").hide();
                    $("#street").hide();
                    $("#arrows").hide();
                    $("#finishAct").show();
                    if (data.data.rememberModel != null) {
                        page_type = "已开奖集齐用户";
                        console.log("参与了瓜分");
                        hasFinalAward = true;
                        $("#youhave").show();
                    } else {
                        page_type = "已开奖未集齐用户";
                        $("#younothave").show();
                    }
                    console.log("*********end---------------");
                }

            }
            var showMainShow = false;
            if (first || resume) { showMainShow = true; }
            showMyCard(showMainShow);
            if (data.code != 5003) {
                $("#cutdownNum").html("");
                var nowTime = new Date(data.data.systemTime).getTime();
                var beginTime = new Date(data.data.lotteryEndTime).getTime();
                clearInterval(intervalForCutdown);
                intervalForCutdown = setInterval(showTime, 1000);

                function showTime() {
                    nowTime = nowTime + 1000;
                    var cutdown = beginTime - nowTime;
                    var transTime = Math.ceil(cutdown / 1000 / 60 / 60 / 24);
                    if (transTime > 1) {
                        $("#cutdownNum").html(transTime + "天");
                    } else if (transTime == 1) {
                        var hour = Math.floor(cutdown / 1000 / 60 / 60);
                        var minute = Math.floor((cutdown - hour * 60 * 60 * 1000) / 1000 / 60);
                        var second = Math.floor((cutdown - hour * 60 * 60 * 1000 - minute * 60 * 1000) / 1000);
                        if (hour > 0) {
                            $("#cutdownNum").html(hour + "时" + minute + "分" + second + "秒");
                        } else if (minute > 0) {
                            $("#cutdownNum").html(minute + "分" + second + "秒");
                        } else {
                            $("#cutdownNum").html(second + "秒");
                        }
                    } else {
                        clearInterval(intervalForCutdown);

                    }
                }
            }
        },
        error: function(error) {
            console.log("-----------访问失败---------" + JSON.stringify(error));
        }
    });
}

function showOperation(showMainShow) {
    var couponStation = {};
    var businessOrder = ["影视", "购物", "教育", "应用"];
    var tag_id = "";
    // if(needQQ){tag_id = 103188}else {tag_id = 103187}
    if (needQQ) { tag_id = 103228 } else { tag_id = 103229 }
    $("#street").html("");
    $.ajax({
        type: "get",
        async: true,
        url: operationurl,
        data: { page: 1, page_size: 6, tag_id: tag_id },
        dataType: "json",
        timeout: 3000,
        success: function(data) {
            homepage = data;
            var operationArr = [];
            var movieOperation = homepage.data.content.contents[0];
            var mallOperation = homepage.data.content.contents[1];
            var eduOperation = homepage.data.content.contents[2];
            var apkOperation = homepage.data.content.contents[3];
            var pagefrom = getUrlParam("from");
            if (pagefrom == "edu") {
                link_type = "首行教育链接";
            } else if (pagefrom == "mall") {
                link_type = "首行购物链接";
            } else if (pagefrom == "apk") {
                link_type = "首行应用链接";
            } else {
                link_type = "首行影视链接";
            }
            switch (pagefrom) {
                case "edu":
                    operationArr.push(eduOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(apkOperation);
                    couponStation = { eduCoupon: 1, movieCoupon: 2, tvmallCoupon: 3 };
                    businessOrder = ["教育", "影视", "购物", "应用"];
                    break;
                case "mall":
                    operationArr.push(mallOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(eduOperation);
                    operationArr.push(apkOperation);
                    couponStation = { eduCoupon: 3, movieCoupon: 2, tvmallCoupon: 1 };
                    businessOrder = ["购物", "教育", "影视", "应用"];
                    break;
                case "apk":
                    operationArr.push(apkOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(eduOperation);
                    couponStation = { eduCoupon: 4, movieCoupon: 2, tvmallCoupon: 3 };
                    businessOrder = ["应用", "教育", "影视", "购物"];
                    break;
                default:
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(eduOperation);
                    operationArr.push(apkOperation);
                    couponStation = { eduCoupon: 3, movieCoupon: 1, tvmallCoupon: 2 };
                    break;
            }
            console.log("----" + operationArr)
            var street = document.getElementById("street");
            for (var i = 0; i < operationArr.length; i++) {
                var pannelDiv = document.createElement("div");
                pannelDiv.setAttribute('class', 'panel');
                pannelDiv.setAttribute('id', 'panel' + (i + 1));
                for (var j = 0; j < 3; j++) {
                    var blockDiv = document.createElement("div");
                    var blockDivImg = document.createElement("div");
                    blockDiv.setAttribute('class', 'block coocaabtn');
                    blockDivImg.setAttribute('class', 'blockimg');
                    // console.log(i+"====="+operationArr[i]);
                    blockDiv.setAttribute('action', operationArr[i].contents[j].extra.block_content_info.action);
                    blockDiv.setAttribute('business', businessOrder[i]);
                    blockDiv.setAttribute('block_name', operationArr[i].contents[j].extra.block_content_info.title);
                    if (i == 0) {
                        blockDiv.setAttribute('uptarget', "#myCard");
                    }
                    // blockDiv.style.backgroundImage = "url("+operationArr[i].contents[j].extra.block_content_info.imgs.poster.images[0]+")";
                    blockDivImg.style.backgroundImage = "url(" + operationArr[i].contents[j].extra.block_content_info.imgs.poster.images[0] + ")";
                    var couponDiv = document.createElement("div");
                    couponDiv.setAttribute('class', 'couponDiv');
                    couponDiv.innerHTML = "&nbsp";
                    blockDivImg.appendChild(couponDiv);
                    blockDiv.appendChild(blockDivImg);
                    pannelDiv.appendChild(blockDiv);
                }
                street.appendChild(pannelDiv);
            }
            if (pagefrom != null && pagefrom != undefined) {
                initMap("#panel1 .block:eq(0)");
            } else {
                if (gameStatus == 2) {
                    initMap("#myCard");
                } else {
                    initMap("#overChance");
                }
            }
            // banner位置优惠券
            // $.ajax({
            //     type: "get",
            //     async: true,
            //     url: adressIp+"/light/xmas/u-coupon",
            //     data: {id:actionId,goldActiveId:goldActionId,cUDID:activityId,MAC:macAddress,cEmmcCID:emmcId},
            //     dataType: "json",
            //     success: function(data) {
            //         console.log("-----------优惠券返回状态-u-coupon----result-------------"+JSON.stringify(data));
            //         // var data = {"code":"50100","msg":"成功","data":{"tvmallCoupon":["购物"],"eduCoupon":["教育"],"movieCoupon":["影视"]}}
            //         var showEdu = data.data.eduCoupon[0];
            //         // var showMall = data.data.tvmallCoupon[0];
            //         var showMovie = data.data.movieCoupon[0];
            //         showcoupon(showEdu,couponStation["eduCoupon"]);
            //         // showcoupon(showMall,couponStation["tvmallCoupon"]);
            //         showcoupon(showMovie,couponStation["movieCoupon"]);
            //         function showcoupon(name,stationID) {
            //             if(name!=""&&name!=null){
            //                 $("#panel"+stationID+" .block:eq(0) .couponDiv").show();
            //                 $("#panel"+stationID+" .block:eq(0) .couponDiv").html("<div class='konw'>现在购买有机会再减<span class='couponname'>"+name+"</span>元</div>").addClass('zy_coupon');
            //             }
            //         }
            //
            //     },
            //     error: function(error) {
            //         console.log("--------访问失败" + JSON.stringify(error));
            //     }
            // });
            if (showMainShow) {
                sentLog("okr_web_page_show", '{"page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","open_id":"' + cOpenId || "空" + '","link_type":"' + link_type + '"}');
                _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '曝光', '', '']);
            }

        },
        error: function(error) {
            initMap("#overChance")
            console.log("-----------访问失败---------" + JSON.stringify(error));
        }
    });
}

function showAwardInfo() {
    $("#fakeNewsul").html("");
    $.ajax({
        type: "get",
        async: true,
        url: adressIp + "/building/cny/news",
        data: { id: actionId },
        dataType: "json",
        // timeout: 20000,
        success: function(data) {
            console.log("中奖喜讯返回状态：" + JSON.stringify(data));
            var box = document.getElementById("fakeNewsul");
            for (var i = 0; i < data.data.fakeNews.length; i++) {
                var list = document.createElement("li");
                list.innerHTML = data.data.fakeNews[i].nickName + data.data.fakeNews[i].awardName;
                box.appendChild(list);
            }
            showAwardlist("#fakeNews", "#fakeNewsul", "2");
        },
        error: function(error) {
            console.log("-----------访问失败---------" + JSON.stringify(error));
        }
    });
}

function showMyCard(showMainShow) {
    $.ajax({
        type: "post",
        async: true,
        url: adressIp + "/building/cny-foca/number",
        data: { id: actionId, cChip: TVchip, cModel: TVmodel, cUDID: activityId, MAC: macAddress, cEmmcCID: emmcId, cOpenId: cOpenId, cNickName: nick_name, cAvatar: avatar, ifAll: false },
        dataType: "json",
        // timeout: 20000,
        success: function(data) {
            console.log("福卡数量返回状态：" + JSON.stringify(data));
            var userOwned = data.data.userOwned;
            var userNeeds = data.data.userNeeds;
            var ifMarge = data.data.ifMarge;
            var hasNum = userOwned.length;
            var choicenum = hasNum;
            var needNum = userNeeds.length;
            var margeNumber = data.data.margeNumber
            $("#hasown span").html(hasNum);

            if (margeNumber > 0) {
                $(".specialfoca span").html(margeNumber);
                $(".specialfoca").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/mainfoca/f0.png)")
            } else {
                $(".specialfoca span").html("&nbsp;");
                $(".specialfoca").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/mainfoca/newf0.png)")
            }

            if (needNum >= 4) {
                for (var j = 0; j < 4; j++) {
                    $("#foca" + (j + 1) + " span").html("&nbsp;");
                    $("#foca" + (j + 1)).css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca1/f" + userNeeds[j].focaEnums + ".png)")
                }
            } else {
                for (var j = 0; j < needNum; j++) {
                    $("#foca" + (j + 1) + " span").html("&nbsp;");
                    $("#foca" + (j + 1)).css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca1/" + userNeeds[j].focaEnums + ".png)")
                }
                for (var j = needNum + 1; j <= 4; j++) {
                    $("#foca" + (j) + " span").html(userOwned[choicenum - 1].number);
                    $("#foca" + (j)).css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca1/" + userOwned[choicenum - 1].focaEnums + ".png)");
                    choicenum--;
                }
            }
            if (needNum > 0 && hasNum > 0) {
                $("#otherwant").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca2/" + userNeeds[0].focaEnums + ".jpg)");
                $("#iwant").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca2/" + userOwned[0].focaEnums + ".jpg)");
            } else if (needNum > 0) {
                $("#otherwant").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca2/" + userNeeds[0].focaEnums + ".jpg)");
                $("#iwant").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca2/" + userNeeds[1].focaEnums + ".jpg)");
            } else {
                $("#otherwant").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca2/" + userOwned[0].focaEnums + ".jpg)");
                $("#iwant").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/springfestival/index/foca/foca2/" + userOwned[1].focaEnums + ".jpg)");
            }

            if (ifMarge) {
                //合成福卡
                $.ajax({
                    type: "post",
                    async: true,
                    url: adressIp + "/building/cny-foca/u",
                    data: { divideId:divideId, id: actionId, cChip: TVchip, cModel: TVmodel, cUDID: activityId, MAC: macAddress, cEmmcCID: emmcId, cOpenId: cOpenId, cNickName: nick_name, cAvatar: avatar },
                    dataType: "json",
                    // timeout: 20000,
                    success: function(data) {
                        if (gameStatus == 1) {
                            needshowdialog4 = true;
                        } else {
                            showPage(false, false);
                        }
                    },
                    error: function(error) {
                        console.log("-----------合成福卡访问失败---------" + JSON.stringify(error));
                    }
                });
            }
            if (gameStatus != 3) {
                showOperation(showMainShow);
            } else {
                console.log("sent-------------" + showMainShow)
                if (showMainShow) {
                    sentLog("okr_web_page_show", '{"page_name":"春节集卡活动主页","activity_name":"春节集卡活动","page_type":"' + page_type + '","open_id":"' + cOpenId || "空" + '","link_type":"' + link_type + '"}');
                    _czc.push(['_trackEvent', '春节集卡活动', '春节集卡活动主页', '曝光', '', '']);
                }
                if (hasFinalAward) {
                    initMap("#finishMyAwardGet")
                } else {
                    initMap("#finishMyAward")
                }
            }
        },
        error: function(error) {
            console.log("-----------访问失败---------" + JSON.stringify(error));
        }
    });
    getMyAwards(3);
}

//获取广告信息
function selectAd(boxId, appid, game_id, game_scene, game_panel, game_position, activity_id, task_id) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    coocaaosapi.getAdData(appid, game_id, game_scene, game_panel, game_position, activity_id, task_id, function(msg) {
        console.log("admsg====" + msg);
        ADMsg = JSON.parse(msg);
        if (JSON.parse(msg).total > 0) {
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            $("#" + boxId).css("backgroundImage", "url(" + JSON.parse(msg).schedules[0].content + ")");
            sentInnerAdshow("img", JSON.parse(msg), game_id, game_scene, game_panel, game_position, activity_id, task_id);
            sentThirdAdshow("img", JSON.parse(msg));
        } else {
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        }
    }, function(error) {})
}
//广告内部提交
function sentInnerAdshow(type, msg, game_id, game_scene, game_panel, game_position, activity_id, task_id) {
    coocaaosapi.submitAdData(JSON.stringify(msg.schedules[0]), game_id, game_scene, game_panel, game_position, activity_id, task_id, function(msg) {
        console.log("sent  inner  log  success===" + msg);
    }, function(err) {
        console.log("sent  inner  log  err===" + err);
    })
}
//广告第三方监测
function sentThirdAdshow(type, msg) {
    var thirdUrl = "";
    if (type == "img") {
        thirdUrl = JSON.stringify(msg.schedules[0].track_url);
    } else if (type == "videoStart") {
        thirdUrl = JSON.stringify(msg.schedules[0].player_start_tracks);
    } else if (type == "videoEnd") {
        thirdUrl = JSON.stringify(msg.schedules[0].player_end_tracks);
    }
    coocaaosapi.submitThirdAdData(thirdUrl, msg.schedules[0].schedule_id, msg.schedules[0].order_id, msg.schedules[0].adspace_id, function(msg) {
        console.log("sent  third  log  success===" + msg);
    }, function(err) {
        console.log("sent  third  log  err===" + err);
    })
}

//加载立即检测版本
function checkVersion() {
    if (activityCenterVersion < 103004) {
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181209/20181209111030764234.apk",
            "5501D27CF6D0B187C49C6FBD217D59AA",
            "活动中心",
            "com.coocaa.activecenter",
            "26417",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function() {},
            function() {});
    }
    if (browserVersion < 104031) {
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181213/20181213190209511926.apk",
            "270A47719CDBAB47EDBC5B1BD8808266",
            "活动浏览器",
            "com.coocaa.app_browser",
            "26423",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function() {},
            function() {})
    }
}