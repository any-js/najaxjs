function fn(){
	var frm = document.getElementsByTagName('iframe')[0];
	var doc = frm.contentWindow.document.documentElement;
	frm.height = doc.scrollHeight + 100;
}

if( window.addEventListener){
	window.addEventListener('load', fn, false );
} else if ( window.attachEvent){
	window.attachEvent('onload', fn);
}else{
	window.onload = fn;
}
