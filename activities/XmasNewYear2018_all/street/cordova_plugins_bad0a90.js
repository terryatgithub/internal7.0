console.log("hi,this is plugin.js=================================")
cordova.define('cordova/plugin_list', function(require, exports, module) {

    var coocaaosapijspath = 'plugins/coocaa-plugin-coocaaosapi/www/coocaaosapi_65e10d6.js';
    var broadcasterjspath = 'plugins/coocaa-plugin-coocaaosapi/www/coocaaosapi_65e10d6.js';

    module.exports = [{
        "file": coocaaosapijspath,
        "id": "coocaaosapi",
        "clobbers": [
            "coocaaosapi"
        ]
    },{
        "file": broadcasterjspath,
        "id": "cordova-plugin-broadcaster.broadcaster",
        "clobbers": [
            "broadcaster"
        ]
    }
    ];
});