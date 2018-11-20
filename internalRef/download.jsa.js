function download() {
    var apkName = 'com.skyworth.lafite.srtnj.speechserver';
    coocaaosapi.startOrCreateDownloadTask2(
        "https://apk-sky-fs.skysrt.com/uploads/20180612/20180612182724897560.apk", "30038EC039FBC25C372435819EC148B4", "小维AI", apkName, "26077", "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png", "",
        function(message) {
            console.log(message);
            console.log("调用成功");
            _czc.push(['_trackEvent', '启动下载', '小维AI引导页面', TVmodel, '', '']);
            map = new coocaakeymap($("body"), null, "null", function() {}, function(val) {}, function(obj) {});
            var d = null;

            function progress() {
                if (showa >= 100) {
                    clearInterval(c);
                } else if (stopStatus) {
                    $("#webBtn").html("立即体验");
                    map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
                    clearInterval(c);
                } else {
                    $("#webBtn").html("正在启动(" + showa+"%)");
                    // var b = (showa*10) + "px";
                    // $("#up").css({
                    //     "transition": 'width 2s',
                    //     "-webkit-transition": 'width 2s',
                    //     "width": b
                    // });
                }
            }

            var c = setInterval(progress, 10);
        },
        function(error) {
            console.log(error);
            console.log("调用失败");
        }
    )
}



 coocaaosapi.addAppTaskListener(function(message) {
            console.log("taskinfo " + JSON.stringify(message));
            console.log("msg.status ==" + message.status + "======url======" + message.url + "=========num=====" + a);
            if (message.status == "ON_DOWNLOADING") {
                if (showa != message.progress) {
                    showa = message.progress;
                    var interval = setInterval(function() {
                        if (a <= showa) {
                            a = a + 1
                            // $("#hasfinish").html("正在跳转中，请稍后..."+parseInt(a)+"%");
                        } else {
                            clearInterval(interval);
                        }
                    }, 100)
                }
            } else if (message.status == "ON_COMPLETE") {
                if (showa != 98) {
                    showa = 98;
                    var interval = setInterval(function() {
                        if (a <= showa) {
                            a = parseInt(a);
                            a = a + 1
                            // $("#hasfinish").html("正在跳转中，请稍后..."+parseInt(a)+"%");
                        } else {
                            clearInterval(interval);
                        }
                    }, 100)
                }
                setTimeout(downFail, 120000);
            } else if (message.status == "ON_STOPPED") {
                stopStatus = true;
                showa = 0;
                downFail()
            } else if (message.status == "ON_REMOVED") {
                if (showa != 100) {
                    showa = 100;
                    var interval = setInterval(function() {
                        if (a <= showa) {
                            a = a + 1
                            // $("#hasfinish").html("正在跳转中，请稍后..."+parseInt(100)+"%");
                        } else {
                            clearInterval(interval);
                        }
                    }, 100)
                }
            };
            if (message.status == "ON_REMOVED" && message.url == "https://apk-sky-fs.skysrt.com/uploads/20180612/20180612182724897560.apk" && showa >= 80) {
                hasVoice = true;
                map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
                $("#webBtn").html("立即体验");
                $("#webBtn").trigger('itemClick');
            }

        });




        CoocaaOSApi.prototype.startOrCreateDownloadTask2 = function(downloadurl,md5, title,packageName,appID,iconUrl,actionName,success,error){
         argscheck.checkArgs('sssssssff','CoocaaOSApi.startOrCreateDownloadTask',arguments);
          startapp.check(packageName,function(checksuccess){
          // startapp.start(packageName, success, error);
          exec(success,error,'CoocaaOSApi','createDownloadTask',[{'url':downloadurl},{'md5':md5},{'title':title},{'pkg':packageName},{'appid':appID},{'icon':iconUrl}]);
          },function(checkerror){
                console.log(checkerror);
                exec(success,error,'CoocaaOSApi','createDownloadTask',[{'url':downloadurl},{'md5':md5},{'title':title},{'pkg':packageName},{'appid':appID},{'icon':iconUrl}]);
          }
          );

    }