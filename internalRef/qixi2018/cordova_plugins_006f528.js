cordova.define('cordova/plugin_list', function(require, exports, module) {
    
    var coocaaosapijspath = 'plugins/coocaaosapi_04f5a31.js';
	var broadcasterjspath = 'plugins/coocaaosapi_04f5a31.js';
	
    module.exports = [{
            "file": coocaaosapijspath,
            "id": "com.coocaaosapi",
            "clobbers": [
                "coocaaosapi"
            ]
        },
	    {
	        "file": broadcasterjspath,
	        "id": "com.broadcaster",
	        "clobbers": [
	            "broadcaster"
	        ]
	    }
    ];
});