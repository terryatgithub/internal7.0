cordova.define('cordova/plugin_list', function(require, exports, module) {
    
    var coocaaosapijspath = 'plugins/coocaaosapi_ca41117.js';
	var broadcasterjspath = 'plugins/coocaaosapi_ca41117.js';
	
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