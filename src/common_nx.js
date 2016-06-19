'use strict';

/* global ActiveXObject: false */

function nxXHR(){
	var xhr = null;

	try {
		xhr = new XMLHttpRequest();
	}catch(e){
		try {
			xhr = new ActiveXObject('Msxml2.XMLHTTP');
		} catch(f){
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			}catch(g){
				error('can\'t create xhr object.');
			}
		}
	}

	return xhr;
}
