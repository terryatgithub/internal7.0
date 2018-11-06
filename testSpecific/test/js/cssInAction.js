function changeCSS(index) {
	console.log("in changeCSS---index:"+index);
	if(index == 0) index="";
	$("link").attr("href", "css/cssInAction"+index+".css");
}
