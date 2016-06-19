/*!
 * najaxjs micro ver 1.1.0 - najax-micro.js
 * (c) any-js - https://github.com/any-js/najaxjs/
 * Released under the MIT license
 */
var $najax = {};

(function(njx) {
'use strict';

/**
 * Assoc object.
 * @typedef {object<string, *>} assoc
 * @example
 {
 a: 1,
 b: '2',
 c: {c1: 1, c2: 2}
}
 */

/**
 * Functions object.
 * @typedef {object<string, function>} functions
 * @example
 {
 a: function(v){ },
 b: function(v){ }
}
 */

/**
 * Class expression.
 * @typedef {Object} Class
 * @example
 - Class object
 */

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

/* global nxXHR: false */

/**
 * Mx class. This class is created automatically by $najax.request. Only micro version.
 *
 * @class Mx
 *
 * @tutorial static-najax-micro
 *
 * @example
 * $najax.request(url).done();
 * $najax.request(url).done(function(){ ... });
 * $najax.request(url, 'text').done(function(){ ... });
 * var mx = $najax.request(url);mx.done();
 */
var Mx = function(url, type){
	this._url = url;
	this._post = null;
	this._type = type || 'json';
	this._begin = null;

	this._xhr = null;

	this._open = function(){
		this._xhr.open(((this._post !== null)?'POST':'GET'), this._url, true);
	};

	this._xhr = nxXHR();
};

/**
 * Set begin function.
 *
 * @memberof Mx
 * @instance
 *
 * @param {function} fn Begin function.
 * @returns {Mx}
 *
 * @tutorial static-najax-micro
 *
 * @example
 * $najax.request(url).begin(function(xhr){ ... }).done();
 */
Mx.prototype.begin = function(fn){
	this._begin = fn;

	return this;
};

/**
 * Set POST and POST values.
 *
 * @memberof Mx
 * @instance
 *
 * @param {assoc|string} vs POST parameters.
 * @returns {Mx}
 *
 * @tutorial static-najax-micro
 *
 * @example
 * $najax.request(url).post('a=1&b=2&c=3').done();
 * $najax.request(url).post({a:1, b:2, c:3}).done();
 */
Mx.prototype.post = function(vs){
	this._post = vs || '';

	return this;
};

/**
 * Set success / fail / complete, and begin ajax.
 * @memberof Nx
 * @instance
 *
 * @param {function} [success] Success function.
 * @param {function} [fail] Fail function.
 * @param {function} [complete] Complete function.
 * @returns {Mx} Mx object.
 *
 * @tutorial static-najax-micro
 *
 * @example
 * $najax.request(url).done();
 * $najax.request(url).done(function{ ... });
 * $najax.request(url).done(null, function{ ... });
 * $najax.request(url).done(null, null, function{ ... });
 */
Mx.prototype.done = function(success, fail, complete){
	mxReady(this, success, fail, complete);

	mxSend(this);

	return this;
};

/**
 * Return XHR object.
 *
 * @memberof Mx
 * @instance
 *
 * @returns {object}
 *
 * @tutorial static-najax-micro
 *
 * @example
 * var mx = $najax.request(url);var xhr = mx.xhr();
 */
Mx.prototype.xhr = function(){
	return this._xhr;
};

/**
 * Simple ajax request. It's possible to specify ajax behaviors by using Nx object's method chaining.
 *
 * @function request
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {string} [type='json'] Response type. ('json', 'text', 'document')
 * @returns {Mx}
 *
 * @see Mx
 *
 * @tutorial static-najax-micro
 *
 * @example
 * $najax.request('path.php').done();
 * $najax.request('path.php').done(function(data){ ... });
 * var nx = $najax.request('path.php');nx.param('a', 1).done();
 * $najax.request('path.php').done(null, function(data){ ... });
 * $najax.request('path.php').post({...}).done();
 */
njx.request = function(url, type){
	return (new Mx(url, type));
};

function mxReady(mx, s, f, c){
	mx._xhr.onreadystatechange = function(){
		var xhr = mx._xhr;

		if (xhr.readyState == 4){
			var v = xhr.response || (xhr.responseType != 'json' && xhr.responseText);

			if (xhr.status == 200){
				if (s){
					s.call(mx, v, xhr);
				}
			}else{
				if (f){
					f.call(mx, xhr.status, xhr);
				}
			}

			if (c){
				c.call(mx, v, xhr);
			}
		}
	};
}

function mxSend(mx){
	var xhr = mx._xhr;

	mx._open();

	if (mx._type){
		xhr.responseType = mx._type;
	}

	if (mx._begin) {
		mx._begin(xhr);
	}

	if (mx._post !== null){
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		var p = '', ps = mx._post;

		if (typeof ps === 'object'){
			for (var k in ps){
				if (ps.hasOwnProperty(k)){
					p += encodeURIComponent(k) + '=' +  encodeURIComponent(ps[k]) + '&';
				}
			}

			p = p.slice(0, -1);
		}else{
			p = ps;
		}

		xhr.send(p);
	}else{
		xhr.send();
	}
}

})($najax);
