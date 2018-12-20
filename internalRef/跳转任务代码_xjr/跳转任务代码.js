var missionlistTencent = [
    {business:"mall",type:"specialtopic",param:{"id":"102930"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17186"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17933"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"movie",type:"vip",param:{"source_id":"5"},action:"coocaa.intent.vip.center",countDownTime:10,"subTask":0},
    {business:"ad",type:"video",action:"app_browser.intent.action.PLAYER",param:{ "extra.id": "","extra.uri":"http://v-play.coocaatv.com/0915/wushuang.mp4","extra.tips":"����Ƶ������","extra.height": "","extra.width": "","extra.http_call_url": "","extra.type": "","extra.name": "" },countDownTime:10,"subTask":1},
    {business:"movie",type:"videospecial",param:{"topicCode":"98"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"movie",type:"specialtopic",param:{"id":"103065"},action:"coocaa.intent.action.HOME_SPECIAL_TOPIC",countDownTime:10,"subTask":0},
    {business:"movie",type:"videospecial",param:{"pTopicCode":"1183"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"10738"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"102831"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"103177"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0}
]

var missionlistYinhe = [
    {business:"mall",type:"specialtopic",param:{"id":"102930"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17186"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"mall",type:"malldetail",param:{"id":"17933"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:10,"subTask":0},
    {business:"movie",type:"vip",param:{"source_id":"1"},action:"coocaa.intent.vip.center",countDownTime:10,"subTask":0},
    {business:"ad",type:"video",action:"app_browser.intent.action.PLAYER",param:{ "extra.id": "","extra.uri":"http://v-play.coocaatv.com/0915/wushuang.mp4","extra.tips":"����Ƶ������","extra.height": "","extra.width": "","extra.http_call_url": "","extra.type": "","extra.name": "" },countDownTime:10,"subTask":1},
    {business:"movie",type:"videospecial",param:{"topicCode":"98"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"movie",type:"specialtopic",param:{"id":"103099"},action:"coocaa.intent.action.HOME_SPECIAL_TOPIC",countDownTime:10,"subTask":0},
    {business:"movie",type:"videospecial",param:{"pTopicCode":"1183"},action:"coocaa.intent.movie.videospecial",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"10738"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"102987"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0},
    {business:"edu",type:"commonlist",param:{"id":"103178"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:10,"subTask":0}
]











$("#gotoMissionHome").bind("itemClick",function () {

        if(goldHouseIsOpen == "1"){goldHouseStation = "�ƽ�С��δ����";}else if(goldHouseIsOpen == "2"){goldHouseStation = "�ƽ�С���ѿ���";}else{goldHouseStation = "�ƽ�С���ѹر�";}
        var reward_type = "����δ������";
        if(_elkOver){reward_type = "�����Ѵ�����";}
        sentLog("christmas_house_page_button_click",'{"button_name":"��¹��Ϣ��","page_name":"ʥ��С��ҳ��","activity_name":"˫���--ʥ��С��","page_type":"'+goldHouseStation+'","reward_type":"'+reward_type+'"}');
        _czc.push(['_trackEvent', '˫���--ʥ��С��', 'ʥ��С��ҳ��'+goldHouseStation, '��¹��Ϣ�����'+reward_type, '', '']);

        var apkVersion = [];
        var apkArry = ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"];
        var a = '{ "pkgList": ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"] }';
        var randomMax = 11;//������
        var randomNum = Math.floor(Math.random()*(randomMax));
        console.log("������======="+randomNum);
        // return;
        coocaaosapi.getAppInfo(a, function(message) {
            console.log("getAppInfo====" + message);
            for(var i=0;i<4;i++){
                apkVersion.push(JSON.parse(message)[apkArry[i]].versionCode);
            }
            activityCenterVersion = apkVersion[0];
            browserVersion = apkVersion[1];
            mallVersion = apkVersion[2];
            cAppVersion = apkVersion[3];
            console.log("===activityCenterVersion=="+activityCenterVersion+"===browserVersion=="+browserVersion+"==mallVersion=="+mallVersion+"==cAppVersion=="+cAppVersion);
            if(needQQ){
                missionlist = missionlistTencent;
            }else{
                missionlist = missionlistYinhe;
            }
            if(activityCenterVersion<203000){
                console.log("����İ汾���ͣ�������");
                return;
            }else if(missionlist[randomNum].business == "ad"){
                if(browserVersion < 104022){
                    console.log("������汾���ͣ�������");
                    return;
                }else {
                    if(_elkOver){
                        startLowVersionAction(randomNum);
                    }else{
                        startNewVersionAction(randomNum);
                    }
                }
            }else if(missionlist[randomNum].business == "movie" || missionlist[randomNum].business == "edu"){
                if(cAppVersion < 3410022){
                    if(missionlist[randomNum].type == "videospecial"){
                        if(cAppVersion<3300000){
                            startLowVersionAction(4);
                        }else{
                            startLowVersionAction(randomNum);
                        }
                    }else if(missionlist[randomNum].type == "specialtopic"){
                        if(cAppVersion<3170001){
                            startLowVersionAction(4);
                        }else{
                            startLowVersionAction(randomNum);
                        }
                    }else{
                        startLowVersionAction(randomNum);
                    }

                }else{
                    if(_elkOver){
                        startLowVersionAction(randomNum);
                    }else{
                        startNewVersionAction(randomNum);
                    }
                }
            }else if(missionlist[randomNum].business == "mall"){
                if(mallVersion < 31000020){
                    console.log("�̳ǰ汾��֧��apk���=======���üӻ���ӿ�");
                    startLowVersionAction(randomNum);
                }else{
                    if(_elkOver){
                        startLowVersionAction(randomNum);
                    }else{
                        startNewVersionAction(randomNum);
                    }
                }
            }
        }, function(error) {
            console.log("getAppInfo----error" + JSON.stringify(error));
        });
        function startLowVersionAction(randomNum){
            if(!_elkOver){
                console.log("�ӻ���");
                addChance(missionlist[randomNum].subTask);
            }else{console.log("���ӻ���");}
            var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
            var str = "[]";
            if(JSON.stringify(missionlist[randomNum].param) != "{}"){
                str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
            }
            coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
        }
        function startNewVersionAction(randomNum) {
            var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
            var str = "[]";
            if(JSON.stringify(missionlist[randomNum].param) != "{}"){
                str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
            }
            str = JSON.parse(str);
            var external = {"id":actionId,"userKeyId":userKeyId,"subTask":missionlist[randomNum].subTask,"countDownTime":missionlist[randomNum].countDownTime,"chanceSource":"2","verify_key":new Date().getTime(),"goldHouseIsOpen":goldHouseIsOpen}
            var doubleEggs_Active = {"doubleEggs_Active":external};
            str.push(doubleEggs_Active);
            str = JSON.stringify(str);
            coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
        }
        function addChance(taskType) {
            var taskName = "��ת����";
            if(taskType == "1"){
                taskName == "��Ƶ����";
            }
            console.log("id==="+actionId+"======userKeyId===="+userKeyId+"===chanceSource===2====subTask===0====openid===="+cOpenId);
            $.ajax({
                type: "post",
                async: true,
                url: adressIp+"/light/xmas/add-chance",
                data: {id:actionId,userKeyId:userKeyId,chanceSource:2,subTask:0,cOpenId:cOpenId},
                dataType: "json",
                success: function(data) {
                    console.log("------------addChance----result-------------"+JSON.stringify(data));
                    if(data.code == 50100){
                        if(goldHouseIsOpen == "1"){goldHouseStation = "�ƽ�С��δ����";}else if(goldHouseIsOpen == "2"){goldHouseStation = "�ƽ�С���ѿ���";}else{goldHouseStation = "�ƽ�С���ѹر�";}
                        sentLog("task_finished",'{"task_type":"'+taskName+'","task_result":"��¹�������","page_name":"ʥ��С��ҳ��","activity_name":"˫���-��¹����ҳ��","page_type":"'+goldHouseStation+'"}');
                        _czc.push(['_trackEvent', '˫���-��¹����ҳ��', 'ʥ��С��ҳ��'+goldHouseStation, taskName+"���", '', '']);
                    }else{
                        if(goldHouseIsOpen == "1"){goldHouseStation = "�ƽ�С��δ����";}else if(goldHouseIsOpen == "2"){goldHouseStation = "�ƽ�С���ѿ���";}else{goldHouseStation = "�ƽ�С���ѹر�";}
                        sentLog("task_finished",'{"task_type":"'+taskName+'","task_result":"��¹����ʧ��","page_name":"ʥ��С��ҳ��","activity_name":"˫���-��¹����ҳ��","page_type":"'+goldHouseStation+'"}');
                        _czc.push(['_trackEvent', '˫���-��¹����ҳ��', 'ʥ��С��ҳ��'+goldHouseStation, taskName+"ʧ��", '', '']);
                    }

                },
                error: function(error) {
                    console.log("--------����ʧ��" + JSON.stringify(error));
                    if(goldHouseIsOpen == "1"){goldHouseStation = "�ƽ�С��δ����";}else if(goldHouseIsOpen == "2"){goldHouseStation = "�ƽ�С���ѿ���";}else{goldHouseStation = "�ƽ�С���ѹر�";}
                    sentLog("task_finished",'{"task_type":"'+taskName+'","task_result":"��¹����ʧ��","page_name":"ʥ��С��ҳ��","activity_name":"˫���-��¹����ҳ��","page_type":"'+goldHouseStation+'"}');
                    _czc.push(['_trackEvent', '˫���-��¹����ҳ��', 'ʥ��С��ҳ��'+goldHouseStation, taskName+"ʧ��", '', '']);
                }
            });
        }
    })