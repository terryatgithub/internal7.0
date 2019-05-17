//var domain = 'http://172.20.155.51:4000/platform';
var domain = 'https://restful.skysrt.com/platform';
var dataName = '';
var dataPhone = '';
var dataAddress = '';
var add1 = '';
var add2 = '';
// var userAddress = {};
// var awardImg = '';
var awardName = '';
var rememberId = '';
var activeId = '';
var userKeyId = '';
var awardId;

$(function () {
    //获取url中的参数
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return decodeURI(r[2], 'utf-8');
      return null; //返回参数值
    }
    activeId = getUrlParam('activeId');
    rememberId = getUrlParam('rememberId');
    awardType = getUrlParam('awardType');
    userKeyId=getUrlParam('userKeyId');

    console.log(domain+'/receive-award/receive-state?rememberId='+rememberId+'&activeId='+activeId+'&awardType='+awardType+'&userKeyId='+userKeyId+'&source=1');
    $.ajax({
        url: domain+'/receive-award/receive-state',
        asyns: false,
        type: 'get',
        data: {
            "rememberId": rememberId,
            "activeId": activeId,
            "awardType": awardType,
            "userKeyId":userKeyId,
            "source": 1
        },
        success: function(data){
            console.log(data);
            var code = data.code;
            if(code == "10100"){
                    awardName = data.data.awardName;
                    awardType = data.data.awardType;
                    awardId = data.data.awardId;
                    userKeyId = data.data.userKeyId;
                    $('#awardName').text(awardName);
                    console.log(data.data.awardType);
                    if(data.data.awardType == "telPhone"){
                        _czc.push(['_trackEvent', '领奖话费流量页面曝光', userKeyId, '未领取', '']);
                        $('#phone_page').css('display', 'block');
                        $('#address_page').css('display', 'none');
                    }else if(data.data.awardType == "kind"){
                        _czc.push(['_trackEvent', '领奖实物奖页面曝光', userKeyId, '未领取', '']);
                        $('#address_page').css('display', 'block');
                        $('#phone_page').css('display', 'none');
                    }else if(data.data.awardType == "apply"){
                        _czc.push(['_trackEvent', '领奖报名奖页面曝光', userKeyId, '未领取', '']);
                        $('#address_page').css('display', 'block');
                        $('#phone_page').css('display', 'none');
                    }
                    // $('#awardImg').attr('src', awardImg); 
            }else if(code == "30501"){
                    // _czc.push(['_trackEvent', '领奖实物奖页面曝光（手机）', userKeyId, '已领取', '']);
                    $('#entered_page').css('display', 'block');
                    $('#phone_page').css('display', 'none');
                    $('#address_page').css('display', 'none');
            }else if(code == "10203"){
                $('#wzj_page').css('display', 'block');
            } 
        },
        error: function(err){
            console.log(err);
        }
    });
    
    //picker
    $(document).on("pageInit", "#page-city-picker", function(e) {
        $("#city-picker").cityPicker({
            // value: []
            //value: ['四川', '内江', '东兴区']
        });
        $('.select-area').on('click', function() {
            $("#city-picker").picker('open')
        });
    });
    $.init();
//实物地址
    $('#addSubmit').on('click', function(e) {
        e.preventDefault();
        var nameReg = /^([a-zA-Z0-9\u4e00-\u9fa5\·]+)$/;
        if ($('#name').val() == '') {
            $('.tips-message').css('display','block')
            $('.tips-message').text('请输入姓名');
            setTimeout(function(){
                $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        } else if(!nameReg.test($.trim($('#name').val()))) {
            $('.tips-message').css('display','block');
            $('.tips-message').text('请输入正确的姓名');
            setTimeout(function(){
                $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        }
        //验证手机
        var reg = new RegExp('^1(3[0-9]|4[579]|5[0-35-9]|7[0-9]|8[0-9])\\d{8}$');
        if (reg.test($.trim($('#phone').val()))) {
            console.log("手机号码正确");
        } else if($('#phone').val()==''){
            $('.tips-message').css('display','block')
            $('.tips-message').text('请输入手机号码');
            setTimeout(function(){
              $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        }else{
            $('.tips-message').css('display','block');
            $('.tips-message').text('请输入正确的手机号码')
            setTimeout(function(){
                $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        };

        if ($('#city-picker').val() =='') {
            $('.tips-message').css('display','block');
            $('.tips-message').text('请选择所在地区');
            setTimeout(function(){
                $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        }
        var addrReg = /^[\u4e00-\u9fa5-#a-zA-Z0-9\s]+$/;
        if ($('#address').val() =='') {
            $('.tips-message').css('display','block');
            $('.tips-message').text('请输入详细地址');
            setTimeout(function(){
                $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        } else if (!addrReg.test($.trim($('#address').val()))){
            $('.tips-message').css('display','block');
            $('.tips-message').text('请输入正确详细住址');
            setTimeout(function(){
                $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        } 
        dataName = $('#name').val().replace(/\s+/g,"");
        dataPhone = $('#phone').val().replace(/\s+/g,"");
        add0 = $('#city-picker').val().replace(/\s+/g,"");
        add1 = $('#city-picker').val();
        add2 = $('#address').val().replace(/\s+/g,"");
        add3 = add1.split(" ");
        console.log(add3);
        if(add3[2] != ""){//有省份
            add_shen = add3[0]+"省";
            add_shi = add3[1]+"市";
            add_qu = add3[2];
        }else{
            add_shen = add3[0]+"市";
            add_shi = add3[0]+"市";
            add_qu = add3[1];
        }


        dataAddress = add0 + add2;
        $('#address_page').css('display', 'none');
        $('#affirm_value').css('display', 'block');
        $("#affirmBack").css('display', 'block');
        $('.this_name').text(dataName);
        $('.this_tel').text(dataPhone);
        $('.this_addr').text(dataAddress);
    })
    $("#phoneSubmit").on('click', function(e){
        e.preventDefault();
        //验证手机
        var reg = new RegExp('^1(3[0-9]|4[579]|5[0-35-9]|7[0-9]|8[0-9])\\d{8}$');
        if (reg.test($.trim($('#phone1').val()))) {
            console.log("手机号码正确");
        } else if($('#phone1').val()==''){
            $('.tips-message').css('display','block')
            $('.tips-message').text('请输入手机号码');
            setTimeout(function(){
              $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        }else{
            $('.tips-message').css('display','block');
            $('.tips-message').text('请输入正确的手机号码')
            setTimeout(function(){
                $('.tips-message').css({'display':'none'});
            },1000);
            return false;
        };
        dataPhone = $('#phone1').val().replace(/\s+/g,"");
        $('#phone_page').css('display', 'none');
        $('#affirm_phone').css('display', 'block');
        $('.this_tel').text(dataPhone);
    });
    $('#affirmBack').on('click',function() {
        $('#address_page').css('display','block');
        $('#affirm_value').css('display', 'none');
    })
    $('#phoneBack').on('click',function() {
        $('#phone_page').css('display','block');
        $('#affirm_phone').css('display', 'none');
    })
    /*$('#useNew').on('click',function() {
        $('#address_page').css('display','block');
        $('#awardName').text(awardName);
        $('#awardImg').attr('src', awardImg);
        $('#affirm_value').css('display', 'none');
    })
*/
    
    $('#affirmInfo').on('click',function(e){
        console.log('-------------省：'+add_shen+";市"+add_shi+";区"+add_qu+";详细地址"+add2);
        console.log(
            domain+'/receive-award/receive?activeId='+activeId+'&awardType='+awardType+'&awardId='+awardId+'&rememberId='+rememberId+'&userKeyId='+userKeyId+'&address='+add2+'&userPhone='+dataPhone+'&receiveName='+dataName+'&province='+add_shen+'&city='+add_shi+'&district='+add_qu);
        console.log('affirmInfo');
        e.preventDefault();
         _czc.push(['_trackEvent', '“提交”按钮', userKeyId, awardName, '']);
        $.ajax({
            type:'post',
            url: domain+'/receive-award/receive',
            data: {
                "activeId": activeId,
                "awardType":awardType,
                "rememberId": rememberId,
                "awardId":awardId,
                "userKeyId": userKeyId,
                "address": add2,
                "userPhone": dataPhone,
                "receiveName": dataName,
                "province":add_shen,//省
                "city":add_shi,//市
                "district":add_qu
            },
            beforeSend: function(){
                $('#affirmInfo').attr('disabled', 'disabled');
                $('#affirmInfo').css('backgroundColor', '#ddd');
            },
            success:function(data){
                console.log(data);
                var code = data.code;
                if(code == 10100){
                    $('#tips_value').css('display','block');
                    $('#affirm_value').css('display', 'none');
                    /*userAddress = {
                        'dataName': dataName,
                        "dataAddress": dataAddress,
                        "dataPhone": dataPhone,
                    };
                    console.log('userAddress', userAddress);
                    localStorage.removeItem("userAddress");
                    localStorage.setItem("userAddress", JSON.stringify(userAddress));*/
                    _czc.push(['_trackEvent', '领取奖品结果', awardName+"提交成功", userKeyId, '']);
                }else if(status == 50005){
                    $('#affirm_value').css('display', 'none');
                    $('#wzj_page').css('display', 'block');
                }
            },
            error:function(error){
                $('#affirm_value').css('display', 'none');
                $('#enterFail_page').css('display','block');
                console.log(error);
                console.log('提交保存地址失败！');
                 _czc.push(['_trackEvent', '领取奖品结果', awardName+"提交失败", userKeyId, '']);
            }
        });
    });
    $('#phoneInfo').on('click',function(e){
        e.preventDefault();
        _czc.push(['_trackEvent', '“提交”按钮', userKeyId, awardName, '']);
        $.ajax({
            type:'post',
            url: domain+'/receive-award/receive',
            data: {
                "activeId": activeId,
                "awardType":awardType,
                "rememberId": rememberId,
                "awardId":awardId,
                "userKeyId": userKeyId,
                "userPhone": dataPhone
            },
            beforeSend: function(){
                $('#phoneInfo').attr('disabled', 'disabled');
                $('#phoneInfo').css('backgroundColor', '#ddd');
            },
            success:function(data){
                console.log(data);
                var code = data.code;
                if(code == 10100){
                    $('#tips_phone').css('display','block');
                    $('#affirm_phone').css('display', 'none');
                    /*userAddress = {
                        'dataName': dataName,
                        "dataAddress": dataAddress,
                        "dataPhone": dataPhone,
                    };
                    console.log('userAddress', userAddress);
                    localStorage.removeItem("userAddress");
                    localStorage.setItem("userAddress", JSON.stringify(userAddress));*/
                    _czc.push(['_trackEvent', '领取奖品结果', awardName+"提交成功", userKeyId, '']);
                }else if(status == 50005){
                    $('#affirm_phone').css('display', 'none');
                    $('#wzj_page').css('display', 'block');
                }
            },
            error:function(error){
                $('#affirm_phone').css('display', 'none');
                $('#enterFail_page').css('display','block');
                console.log(error);
                console.log('提交保存地址失败！');
                _czc.push(['_trackEvent', '领取奖品结果', awardName+"提交失败", userKeyId, '']);
            }
        });
    });
});
