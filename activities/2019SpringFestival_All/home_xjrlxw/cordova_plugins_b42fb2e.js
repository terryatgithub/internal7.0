console.log("hi,this is plugin.js=================================")
cordova.define('cordova/plugin_list', function(require, exports, module) {

    var coocaaosapijspath = 'plugins/coocaa-plugin-coocaaosapi/www/coocaaosapi_741515a.js';
    var broadcasterjspath = 'plugins/coocaa-plugin-coocaaosapi/www/coocaaosapi_741515a.js';

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