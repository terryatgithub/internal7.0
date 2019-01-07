var accountVersion = ""; // 账户版本
var cAppVersion = ""; //影视版本
var deviceInfo = ""; //设备信息
var macAddress = ""; //mac
var TVmodel = ""; //机型
var TVchip = ""; //机芯
var activityId = ""; //激活id
var emmcId = "";//emmcid;
var loginstatus = false; //登录状态-string
var tencentWay = ""; //腾讯源机器调用登录的要求（both,qq,weixin)
var user_flag = ""; //下单传递用户标识1-token；2-openid
var access_token = ""; //token值
var login_type = ""; //下单拓展信息 0-手机；1-qq;2-weixin
var vuserid = ""; //vuserid
var showFlag = ""; //用于判断当前账户是否发生改变，防止多次监听到账户变化多次刷新页面
var cOpenId = "";
var nick_name = "";
var movieSource = "";
var needQQ = false;
var avatar = "";
var qqtoken = null;

var gameVersion = 0;
var showprogress = 0;
var waitApkInstallFunc = "";
var downToast = "";
var downGameFalse = false;
var startActionReplace = "coocaa.intent.action.HOME";

var actionStatus = "start";

var adressIp = "http://beta.restful.lottery.coocaatv.com";
var orderUrl = "http://172.20.132.182:8090/v3/order/genOrderByJsonp.html?data=";
var actionId = "95";
var divideId = "101";
// var adressIp = "https://restful.skysrt.com";
// var orderUrl = "https://api-business.skysrt.com/v3/order/genOrderByJsonp.html?data=";
// var actionId = "102";
// var divideId = "102";

// var mycardurl = "http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html?from=street";
// var marketurl = "http://beta.webapp.skysrt.com/lxw/sd/index.html";
// var mydealurl = "http://beta.webapp.skysrt.com/lxw/sd/index.html";
// var taskurl = "http://beta.webapp.skysrt.com/zy/spring/index.html?part=mytrade";
var mycardurl = "http://beta.webapp.skysrt.com/zy/spring/index.html?part=mycard";
var marketurl = "http://beta.webapp.skysrt.com/zy/spring/index.html?part=market";
var mydealurl = "http://beta.webapp.skysrt.com/zy/spring/index.html?part=mytrade";
var taskurl = "http://beta.webapp.skysrt.com/yuanbo/test/2019SpringFestival/taskcenter.html";

// var operationurl="http://172.20.155.91:8080/tvos/getWebPageContent";
var operationurl="http://api.home.skysrt.com/v1/tvos/getWebPageContent";

// var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";
var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//实体奖url

var showMove = false;//是否展示动效

var browserVersion = 0;
var cAppVersion = 0;
var activityCenterVersion = 0;
var mallVersion = 0;

var userKeyId = "";

var homepage = "";
var ADMsg = null;


var needshowdialog1 = false; //任务完成弹窗
var needshowdialog2 = false;//最后一天提示
var needshowdialog3 = false;//交易成功弹窗
var needshowdialog4 = false;//合成弹窗
var needshowdialog5 = false;//开奖弹窗
var intervalForCutdown = null;
var localChanceNum = 0;
var gameStatus = 0;//0未开始；1正常期；2冻结期；3开奖结束期
var isTrade = false;
var rememberBtn = null;//用于刷新页面后定位焦点
var needRememberFocus = false;//是否需要定位焦点的标志
var remembernum = "0";//福利街版块如果版本不符合，弹窗提示后重新new焦点
var toastTimeout = null;
var remainNum = 0;
var addNum = 0;
var setFocuss = null;
var hasFinalAward = false;
var _isLessThanHalfhour = false;

// var topblock_type="";//页面顶部推荐推荐位状态
var page_type = "";//开启状态;
var link_type = "";//首行影视链接、首行教育链接、首行购物链接、首行应用链接








var bannerBtnName="马上领取";
var needSentADLog = false;
var needFresh = false;
var actEnd = false;
var awardToast = false;
var marqueeInterval1 = null;
var marqueeInterval2 = null;



var toastTimeout2 = null;
var toastTimeout3 = null;
var userIp = "";


var startLoginFlag = false;
var changeLoginFlag = false;
var _province = "";
var _city = "";
var _curHomeBtn = ""; //记录我的奖励页面点击的btn

