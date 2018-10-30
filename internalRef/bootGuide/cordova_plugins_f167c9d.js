cordova.define('cordova/plugin_list', function(require, exports, module) {
    
    var coocaaosapijspath = 'plugins/coocaaosapi_8a7e9be.js';
	var broadcasterjspath = 'plugins/coocaaosapi_8a7e9be.js';
	
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