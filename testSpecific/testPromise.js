// ajax函数将返回Promise对象:
function ajax1() {
    console.log('ajax1...')
    return new Promise(function (resolve, reject) {
	    console.log('start new Promise...');
	    var timeOut = Math.random() * 2;
	    console.log('set timeout to: ' + timeOut + ' seconds.');
        if (timeOut < 1) {
            console.log('ajax1 call resolve()...');
            resolve(timeOut);
        }
        else {
            console.log('ajax1 call reject()...');
            reject('1F '+timeOut);
        }
	})
}

function ajax2(time) {
    console.log('ajax2...time:'+time)
    return new Promise(function (resolve, reject) {
	    console.log('start 2 new Promise...');
        if (time < 1) {
            console.log('ajax2 call resolve()...');
            resolve(time);
        }
        else {
            console.log('ajax2 call reject()...');
            reject('2F '+time);
        }
	})
}
function ajax3(time) {
    console.log('ajax3...time:'+time)
    return new Promise(function (resolve, reject) {
	    console.log('start 3 new Promise...');
        if (time < 1) {
            console.log('ajax3 call resolve()...');
            resolve(time);
        }
        else {
            console.log('ajax3 call reject()...');
            reject('3F '+time);
        }
	})
}
function handleError(err){
	console.log('handleError: '+err)
}

ajax1().then(ajax2).then(ajax3).catch(handleError)
