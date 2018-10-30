var userinfo = null;
var activityName = null;
var sourceName = null;
var sourceId = null;

var Game = {

    //启动程序
    exe: function() {
        document.body.style.background = '#000';
        var oDiv = document.createElement('div');
        oDiv.id = 'GameBox';
        oDiv.style.cssText = 'width:1920px;height:1080px;border:10px solid #fff;margin:0px auto;text-align:center;position:relative;overflow:hidden;color:red;font-size:40px;';
        document.body.appendChild(oDiv);
        this.init();
    },

    score: 0,

    ifEnd: false,

    //初始化
    init: function() {
        var This = this;
        var oDiv = document.getElementById('GameBox');
        oDiv.innerHTML = '';
        Game.score = 0;
        Game.ifEnd = false;
        var oH = document.createElement('h1');
        oH.innerHTML = '抢红包v11.0';
        oH.style.cssText = 'color:#fff;font-size:36px;font-weight:normal;padding-top:50px;';
        oDiv.appendChild(oH);
        for (var i = 0; i < 3; i++) {
            var oP = document.createElement('p');
            oP.index = i;
            oP.className = "choiceTab";
            oP.style.cssText = 'font-size:32px;color:#000;width:250px;height:60px;margin:50px auto;text-align:center;line-height:60px;cursor:pointer;';
            var html = '';

            switch (i) {
                case 0:
                    html = '慢速';
                    break;
                case 1:
                    html = '中速';
                    break;
                case 2:
                    html = '快速';
                    break;
            }
            oP.innerHTML = html;
            oDiv.appendChild(oP);
        };
        map = new coocaakeymap($(".choiceTab"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});

        $(".choiceTab").unbind('itemClick').bind('itemClick', function(e) {
            // This.start(this.index, oDiv, e);
            var thisIndex = this.index;
            cutdown(this.index, oDiv, e);
        });

        function cutdown(thisIndex, oDiv, e) {
            var time = 3;
            var a = setInterval(function() {
                oDiv.innerHTML = '开始倒计时：' + time + "s";
                time--;
                if (time < 0) {
                    clearInterval(a);
                    This.start(thisIndex, oDiv, e);
                }
            }, 1000)

        }
    },

    //游戏开始
    start: function(index, oGameBox, e) {
        oGameBox.innerHTML = '';

        var oS = document.createElement('span');
        oS.innerHTML = this.score;
        oS.style.cssText = 'position:absolute;left:15px;top:10px;font-size:34px;color:red';
        oGameBox.appendChild(oS);
        this.plane(oGameBox, e, index);
        this.enemy(oGameBox, oS, index);
    },

    //接红包卡通人物
    plane: function(oGameBox, e, index) {
        var oPlane = new Image(); // document.createElement('img');
        oPlane.src = 'images/coocaa.png';
        oPlane.width = 276;
        oPlane.height = 90;
        oPlane.id = 'plane';
        oPlane.className = 'plane';

        oPlane.style.cssText = 'display:block;position:absolute;bottom:0px;left:1000px;';
        oGameBox.appendChild(oPlane);

        document.onkeydown = function(ent) {
            var event = ent || window.event;
            switch (event.keyCode) {
                case 37: //左
                    var a = oPlane.offsetLeft - 75 < 0 ? 0 : oPlane.offsetLeft - 75;
                    oPlane.style.left = a + 'px';
                    break;
                case 38: //上
                    // mid.style.top = Math.max(0, mid.offsetTop - 5) + "px";
                    break;
                case 39: //右
                    var a = oPlane.offsetLeft + 276 + 75 > 1920 ? 1920 - 276 : oPlane.offsetLeft + 75;
                    oPlane.style.left = a + 'px';
                    break;
                case 40: //下
                    // mid.style.top = Math.min(350, mid.offsetTop + 5) + "px";
                    break;

            }
        }
    },


    //下落红包
    enemy: function(oGameBox, oS, index) {
        var listenEnemy = null;
        var a, x;
        switch (index) {
            case 0:
                a = 5;
                x = 800;
                break;
            case 1:
                a = 10;
                x = 800;
                break;
            case 2:
                a = 15;
                x = 800;
                break;
        }

        this.EnemyTimer = setInterval(function() {
            var oEnemy = new Image();
            listenEnemy = oEnemy;
            oEnemy.width = 100;
            oEnemy.height = 100;
            var point = Math.random() > 0.9 ? 2 : 1;
            oEnemy.setAttribute("point", point);
            if (point == 1) {
                oEnemy.src = 'images/red.png';
            } else {
                oEnemy.src = 'images/red2.png';
            }


            var lMin = 0;
            var lMax = oGameBox.clientWidth - oEnemy.width;
            var left = Math.random() * (lMax - lMin);
            oEnemy.style.cssText = 'position:absolute;top:' + (-oEnemy.height) + 'px;left:' + left + 'px;'
            oGameBox.appendChild(oEnemy);

            var b = Math.random() * a + 1;

            oEnemy.timer = setInterval(function() {
                oEnemy.style.top = oEnemy.offsetTop + b + 'px'; // ***********红包下落速度 
                if (oEnemy.offsetTop >= oGameBox.clientHeight) {
                    clearInterval(oEnemy.timer);
                    oEnemy.parentNode.removeChild(oEnemy);
                };
            }, 13);

            //和卡通的碰撞检测
            var oPlane = document.getElementsByClassName('plane');
            oEnemy.pzPlane = setInterval(function() {

                // if ( Game.ifEnd )
                // {
                //  clearInterval( oEnemy.pzPlane );
                // }

                // if ( Game.boom( oEnemy , oPlane ) )
                // {
                //  Game.ifEnd = true;
                //  clearInterval( oEnemy.pzPlane );
                //  clearInterval( Game.BiuTimer );
                //  clearInterval( Game.EnemyTimer );
                //  oEnemy.src = 'img/boom.png';
                //  oPlane.src = 'img/boom2.png';
                //  setTimeout(function(){
                //      Game.over( oGameBox );
                //  },1000);
                // }
                for (var i = 0; i < oPlane.length; i++) {
                    if (Game.boom(oEnemy, oPlane[i])) {
                        if (oEnemy.getAttribute("point") == 1) {
                            Game.score++;
                            oEnemy.src = 'images/p1.jpg';
                        } else {
                            Game.score = Game.score + 2;
                            oEnemy.src = 'images/p2.jpg';
                        }

                        oS.innerHTML = Game.score;

                        // clearInterval( oEnemy.pzBiu );
                        clearInterval(oEnemy.pzPlane);
                        // allBiu[i].parentNode.removeChild( allBiu[i] );
                        setTimeout(function() {
                            if (oEnemy.parentNode) {
                                oEnemy.parentNode.removeChild(oEnemy);
                            }
                        }, 300);
                        break;
                    }
                }
            }, 50);
        }, x); // *********** 红包生成速度

        var lessTime = document.createElement('span');
        lessTime.style.cssText = 'position:absolute;right:15px;top:10px;font-size:50px;color:red';
        oGameBox.appendChild(lessTime);
        var time = 10;
        var cutdownTime = setInterval(function() {
            lessTime.innerHTML = '结束倒计时：' + time + "s";
            time--;
            if (time < 0) {
                clearInterval(cutdownTime);
                clearInterval(listenEnemy.pzPlane);
                clearInterval(Game.EnemyTimer);
                setTimeout(function() {
                    Game.over(oGameBox);
                }, 1000);
            }
        }, 1000);
    },

    //碰撞检测
    boom: function(obj1, obj2) {

        var T1 = obj1.offsetTop;
        var B1 = T1 + obj1.clientHeight;
        var L1 = obj1.offsetLeft;
        var R1 = L1 + obj1.clientWidth;

        var T2 = obj2.offsetTop;
        var B2 = T2 + obj2.clientHeight;
        var L2 = obj2.offsetLeft;
        var R2 = L2 + obj2.clientWidth;

        if (R2 < L1 || L2 > R1 || B2 < T1 || T2 > B1) {
            return false; // 没撞上
        } else {
            return true; // 撞上了
        }
    },

    //游戏结束
    over: function(oGameBox) {
        oGameBox.innerHTML = '';
        var oDiv = document.createElement('div');
        oDiv.style.cssText = 'width:1200px;height:800px;margin:50px;margin-left:360px;background:#fff;';
        var oT = document.createElement('h3');
        oT.innerHTML = 'Game Over';
        oT.style.cssText = 'padding-top:50px;;'
        var oP1 = document.createElement('h4');
        oP1.innerHTML = '您的得分是：' + '<span style="color:#f00;font-weight:bold;">' + this.score + '</span>';
        oP1.style.cssText = 'color:#000';

        var oRestart = document.createElement('div');
        oRestart.style.cssText = 'width:200px;height:80px;font-size:34px;text-align:center;line-height:80px;color:#000;background:#990;margin:20px auto;cursor:pointer;';
        oRestart.innerHTML = '重新开始';
        oRestart.className = "restart";
        
        oDiv.appendChild(oT);
        oDiv.appendChild(oP1);
        oDiv.appendChild(oRestart);
        oGameBox.appendChild(oDiv);
        map = new coocaakeymap($(".restart"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});

        $(".restart").unbind('itemClick').bind('itemClick', function(e) {
            Game.init();
        });
    },


    //getClass方法
    getClass: function(cName, parent) {
        parent = parent || document;
        if (document.getElementsByClassName) {
            return parent.getElementsByClassName(cName);
        } else {
            var all = parent.getElementsByTagName('*');
            var arr = [];
            for (var i = 0; i < all.length; i++) {
                var arrClass = all.className.split(' ');
                for (var j = 0; j < arrClass.length; j++) {
                    if (arrClass[j] == cName) {
                        arr.push(all[i]);
                        break;
                    }
                }
            }
            return arr;
        }
    },


};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.handleBackButton, false);
    },
    handleBackButton: function() {
        exit();
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

        console.log('Received Event: ' + id);
        Game.exe();
        coocaaosapi.getUserInfo(function(message) {
            userinfo = message;
            console.log("用户信息：" + JSON.stringify(userinfo));
        }, function(error) { console.log(error); });


    },
    triggleButton: function() {
        cordova.require("coocaaosapi");

    }
};


app.initialize();


function exit() {
    navigator.app.exitApp();
}

var Game = {

    //启动程序
    exe: function() {
        document.body.style.background = '#000';
        var oDiv = document.createElement('div');
        oDiv.id = 'GameBox';
        oDiv.style.cssText = 'width:1920px;height:1080px;border:10px solid #fff;margin:0px auto;text-align:center;position:relative;overflow:hidden;color:red;font-size:40px;';
        document.body.appendChild(oDiv);
        this.init();
    },

    score: 0,

    ifEnd: false,

    //初始化
    init: function() {
        var This = this;
        var oDiv = document.getElementById('GameBox');
        oDiv.innerHTML = '';
        Game.score = 0;
        Game.ifEnd = false;
        var oH = document.createElement('h1');
        oH.innerHTML = '抢红包v11.0';
        oH.style.cssText = 'color:#fff;font-size:36px;font-weight:normal;padding-top:50px;';
        oDiv.appendChild(oH);
        for (var i = 0; i < 3; i++) {
            var oP = document.createElement('p');
            oP.index = i;
            oP.className = "choiceTab";
            oP.style.cssText = 'font-size:32px;color:#000;width:250px;height:60px;margin:50px auto;text-align:center;line-height:60px;cursor:pointer;';
            var html = '';

            switch (i) {
                case 0:
                    html = '慢速';
                    break;
                case 1:
                    html = '中速';
                    break;
                case 2:
                    html = '快速';
                    break;
            }
            oP.innerHTML = html;
            oDiv.appendChild(oP);
        };
        map = new coocaakeymap($(".choiceTab"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});

        $(".choiceTab").unbind('itemClick').bind('itemClick', function(e) {
            // This.start(this.index, oDiv, e);
            var thisIndex = this.index;
            cutdown(this.index, oDiv, e);
        });

        function cutdown(thisIndex, oDiv, e) {
            var time = 3;
            var a = setInterval(function() {
                oDiv.innerHTML = '开始倒计时：' + time + "s";
                time--;
                if (time < 0) {
                    clearInterval(a);
                    This.start(thisIndex, oDiv, e);
                }
            }, 1000)

        }
    },

    //游戏开始
    start: function(index, oGameBox, e) {
        oGameBox.innerHTML = '';

        var oS = document.createElement('span');
        oS.innerHTML = this.score;
        oS.style.cssText = 'position:absolute;left:15px;top:10px;font-size:34px;color:red';
        oGameBox.appendChild(oS);
        this.plane(oGameBox, e, index);
        this.enemy(oGameBox, oS, index);
    },

    //接红包卡通人物
    plane: function(oGameBox, e, index) {
        var oPlane = new Image(); // document.createElement('img');
        oPlane.src = 'images/coocaa.png';
        oPlane.width = 276;
        oPlane.height = 90;
        oPlane.id = 'plane';
        oPlane.className = 'plane';

        oPlane.style.cssText = 'display:block;position:absolute;bottom:0px;left:1000px;';
        oGameBox.appendChild(oPlane);

        document.onkeydown = function(ent) {
            var event = ent || window.event;
            switch (event.keyCode) {
                case 37: //左
                    var a = oPlane.offsetLeft - 75 < 0 ? 0 : oPlane.offsetLeft - 75;
                    oPlane.style.left = a + 'px';
                    break;
                case 38: //上
                    // mid.style.top = Math.max(0, mid.offsetTop - 5) + "px";
                    break;
                case 39: //右
                    var a = oPlane.offsetLeft + 276 + 75 > 1920 ? 1920 - 276 : oPlane.offsetLeft + 75;
                    oPlane.style.left = a + 'px';
                    break;
                case 40: //下
                    // mid.style.top = Math.min(350, mid.offsetTop + 5) + "px";
                    break;

            }
        }
    },


    //下落红包
    enemy: function(oGameBox, oS, index) {
        var listenEnemy = null;
        var a, x;
        switch (index) {
            case 0:
                a = 5;
                x = 800;
                break;
            case 1:
                a = 10;
                x = 800;
                break;
            case 2:
                a = 15;
                x = 800;
                break;
        }

        this.EnemyTimer = setInterval(function() {
            var oEnemy = new Image();
            listenEnemy = oEnemy;
            oEnemy.width = 100;
            oEnemy.height = 100;
            var point = Math.random() > 0.9 ? 2 : 1;
            oEnemy.setAttribute("point", point);
            if (point == 1) {
                oEnemy.src = 'images/red.png';
            } else {
                oEnemy.src = 'images/red2.png';
            }


            var lMin = 0;
            var lMax = oGameBox.clientWidth - oEnemy.width;
            var left = Math.random() * (lMax - lMin);
            oEnemy.style.cssText = 'position:absolute;top:' + (-oEnemy.height) + 'px;left:' + left + 'px;'
            oGameBox.appendChild(oEnemy);

            var b = Math.random() * a + 1;

            oEnemy.timer = setInterval(function() {
                oEnemy.style.top = oEnemy.offsetTop + b + 'px'; // ***********红包下落速度 
                if (oEnemy.offsetTop >= oGameBox.clientHeight) {
                    clearInterval(oEnemy.timer);
                    oEnemy.parentNode.removeChild(oEnemy);
                };
            }, 13);

            //和卡通的碰撞检测
            var oPlane = document.getElementsByClassName('plane');
            oEnemy.pzPlane = setInterval(function() {

                // if ( Game.ifEnd )
                // {
                //  clearInterval( oEnemy.pzPlane );
                // }

                // if ( Game.boom( oEnemy , oPlane ) )
                // {
                //  Game.ifEnd = true;
                //  clearInterval( oEnemy.pzPlane );
                //  clearInterval( Game.BiuTimer );
                //  clearInterval( Game.EnemyTimer );
                //  oEnemy.src = 'img/boom.png';
                //  oPlane.src = 'img/boom2.png';
                //  setTimeout(function(){
                //      Game.over( oGameBox );
                //  },1000);
                // }
                for (var i = 0; i < oPlane.length; i++) {
                    if (Game.boom(oEnemy, oPlane[i])) {
                        if (oEnemy.getAttribute("point") == 1) {
                            Game.score++;
                            oEnemy.src = 'images/p1.jpg';
                        } else {
                            Game.score = Game.score + 2;
                            oEnemy.src = 'images/p2.jpg';
                        }

                        oS.innerHTML = Game.score;

                        // clearInterval( oEnemy.pzBiu );
                        clearInterval(oEnemy.pzPlane);
                        // allBiu[i].parentNode.removeChild( allBiu[i] );
                        setTimeout(function() {
                            if (oEnemy.parentNode) {
                                oEnemy.parentNode.removeChild(oEnemy);
                            }
                        }, 300);
                        break;
                    }
                }
            }, 50);
        }, x); // *********** 红包生成速度

        var lessTime = document.createElement('span');
        lessTime.style.cssText = 'position:absolute;right:15px;top:10px;font-size:50px;color:red';
        oGameBox.appendChild(lessTime);
        var time = 10;
        var cutdownTime = setInterval(function() {
            lessTime.innerHTML = '结束倒计时：' + time + "s";
            time--;
            if (time < 0) {
                clearInterval(cutdownTime);
                clearInterval(listenEnemy.pzPlane);
                clearInterval(Game.EnemyTimer);
                setTimeout(function() {
                    Game.over(oGameBox);
                }, 1000);
            }
        }, 1000);
    },

    //碰撞检测
    boom: function(obj1, obj2) {

        var T1 = obj1.offsetTop;
        var B1 = T1 + obj1.clientHeight;
        var L1 = obj1.offsetLeft;
        var R1 = L1 + obj1.clientWidth;

        var T2 = obj2.offsetTop;
        var B2 = T2 + obj2.clientHeight;
        var L2 = obj2.offsetLeft;
        var R2 = L2 + obj2.clientWidth;

        if (R2 < L1 || L2 > R1 || B2 < T1 || T2 > B1) {
            return false; // 没撞上
        } else {
            return true; // 撞上了
        }
    },

    //游戏结束
    over: function(oGameBox) {
        oGameBox.innerHTML = '';
        var oDiv = document.createElement('div');
        oDiv.style.cssText = 'width:1200px;height:800px;margin:50px;margin-left:360px;background:#fff;';
        var oT = document.createElement('h3');
        oT.innerHTML = 'Game Over';
        oT.style.cssText = 'padding-top:50px;;'
        var oP1 = document.createElement('h4');
        oP1.innerHTML = '您的得分是：' + '<span style="color:#f00;font-weight:bold;">' + this.score + '</span>';
        oP1.style.cssText = 'color:#000';

        var oRestart = document.createElement('div');
        oRestart.style.cssText = 'width:200px;height:80px;font-size:34px;text-align:center;line-height:80px;color:#000;background:#990;margin:20px auto;cursor:pointer;';
        oRestart.innerHTML = '重新开始';
        oRestart.className = "restart";
        
        oDiv.appendChild(oT);
        oDiv.appendChild(oP1);
        oDiv.appendChild(oRestart);
        oGameBox.appendChild(oDiv);
        map = new coocaakeymap($(".restart"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});

        $(".restart").unbind('itemClick').bind('itemClick', function(e) {
            Game.init();
        });
    },


    //getClass方法
    getClass: function(cName, parent) {
        parent = parent || document;
        if (document.getElementsByClassName) {
            return parent.getElementsByClassName(cName);
        } else {
            var all = parent.getElementsByTagName('*');
            var arr = [];
            for (var i = 0; i < all.length; i++) {
                var arrClass = all.className.split(' ');
                for (var j = 0; j < arrClass.length; j++) {
                    if (arrClass[j] == cName) {
                        arr.push(all[i]);
                        break;
                    }
                }
            }
            return arr;
        }
    },


};

//自定义曝光
function webShowTimes(page_name) {
    coocaaosapi.notifyJSLogInfo("web_page_show_new", '{"page_name":"' + page_name + '"}', function(message) { console.log(message); }, function(error) { console.log(error); });
}

function webBtnClickLog(button_name, page_name) {
    coocaaosapi.notifyJSLogInfo("web_button_clicked", '{"button_name":"' + button_name + '","page_name":"' + page_name + '"}', function(message) { console.log(message); }, function(error) { console.log(error); });
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2], 'utf-8');
    return null; //返回参数值
}