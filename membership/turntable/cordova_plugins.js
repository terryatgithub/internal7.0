cordova.define('cordova/plugin_list', function(require, exports, module) {
    
    var coocaaosapijspath = 'plugins/coocaaosapi.js';
	var broadcasterjspath = 'plugins/coocaaosapi.js';
	
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