'use strict';

/* global ActiveXObject: false */

/**
 * @ignore
 */
var Bx = {
	__basic: function(url, vs, type){
		this._url = url;

		if (vs){
			this._vs = vs;
		}

		if (type){
			this._o.type = type;
		}

		return this;
	},
	type: function(type){
		this._o.type = type || '';
		return this;
	},
	url: function(url){
		this._url = url;
		return this;
	},
	param: function(w, v){
		if (!this._vs){
			this._vs = {};
		}

		extVs(this._vs, w, v);

		return this;
	},
	cache: function(on){
		this._o.cache = on;
		return this;
	},
	retry: function(n){
		this._o.retry = n;
		return this;
	},
	success: function(fn){
		this._sccs = fn;
		return this;
	},
	fail: function(fn){
		this._fail = fn;
		return this;
	},
	begin: function(fn){
		if (!this.__exist('begin', '_begin')){
			this._begin = fn;
		}
		return this;
	},
	running: function(fn){
		if (!this.__exist('running', '_running')){
			this._running = fn;
		}
		return this;
	},
	complete: function(fn){
		if (!this.__exist('complete', '_cmpl')){
			this._cmpl = fn;
		}
		return this;
	},
	jsonp: function(callback, name){
		this._o.type = 'jsonp';

		if (callback){
			if (typeof callback === 'function'){
				callback = callback.name;
			}

			this._o.jsonp.callback = callback;
		}

		if (name){
			this._o.jsonp.name = name;
		}

		return this;
	},
	clean: function(on){
		this._o.clean = on;
		return this;
	},
	relay: function(w, v){
		if (!this._relaydata){
			this._relaydata = {};
		}

		this._o.relaymode = this._o.relaymode | 2;

		extVs(this._relaydata, w, v);

		return this;
	},
	opt: function(w, v){
		extVs(this._o, w, v);

		return this;
	},
	__set: function(n, v){
		this[n] = v;

		return this;
	},
	__done: function(sc, fl, cmp){
		if (sc){
			this._sccs = sc;
		}

		if (fl){
			this._fail = fl;
		}

		if (cmp){
			this._cmpl = cmp;
		}
	},
	__exist: function(n, f){
		if (this[f] != null){
			error('already exist. (' + n + ')');
			return true;
		}

		return false;
	},
	__start: function(rl, vs){
		if (this.__before){
			this.__before.apply(rl, vs);
		}

		if (this._begin){
			this._begin.apply(rl, vs);
		}

		if (this._running){
			this._running.call(rl, true);
		}
	},
	__end: function(rl, vs, r){
		var t;

		if (this._cmpl){
			t = this._cmpl.apply(rl, vs);
		}

		if (this.__after){
			vs.push((t !== undefined)?t:r);

			this.__after.apply(rl, vs);
		}

		if (this._running){
			this._running.call(rl, false);
		}
	}
};

function argPss(bx, vs){
	return (bx._o.relaymode & 1)?vs:[];
}

function preRl(bx, rl){
	rl.abortCaller(bind(bx, bx.abort));

	if (bx._relaydata && bx._o.relaymode & 2){
		rl.data(bx._relaydata);
	}
}

/**
 * Nx class. This class is created automatically by $najax various method.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * <b>Specification</b><br>
 * - Specify ajax request and response behaviors by <code>Nx object</code>.
 * - Specify by Nx object's various method or <code>Nx <i>opt</i></code> method.
 * - Begin ajax connection by <code>Nx <i>done</i></code>.
 * - <code>Nx <i>done</i></code> returns <code>Relay object</code>.
 * - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 * - <code>Nx</code> implement ajax by using <i>XMLHttpRequest</i>.
 *
 * @class Nx
 *
 * @param {assoc} [opt: Nx options.
 * @param {string} [opt.method='GET'] Method. GET / POST
 * @param {string} [opt.type='json'] Response type.
 * @param {boolean} [opt.async=true] Enable async.
 * @param {boolean} [opt.cache=false] Enable cache.
 * @param {number} [opt.retry=null] Retry number.
 * @param {number} [opt.timeout=null] Timeout ms.
 * @param {function} [opt.filter=null] Response value filter.
 * @param {string} [opt.contentType='application/x-www-form-urlencoded'] Method POST option. It's possbile to specify <i>content-type</i>.
 * @param {string} [opt.mime=null] Mime by XHR.
 * @param {assoc} [opt.headers={}] HTTP Headers.
 * @param {boolean} [opt.noescape=false] If true, not escape parameters. Apply to GET or POST parameters.
 * @param {assoc} [opt.jsonp] Jsonp option.
 * @param {string|function} [opt.jsonp.callback=''] Jsonp callback function.
 * @param {string} [opt.jsonp.name='callback'] Jsonp callback variable name.
 * @param {string|Element} [opt.element='div'] Type html option. Root element or element tag name.
 * @param {boolean} [opt.iseval=true] Type script option. Determine to use <i>eval</i>. if false, use <i>function</i>.
 * @param {string} [opt.separator=','] Type csv option. Separator.
 * @param {assoc} [opt.auth] Auth option.
 * @param {string} [opt.auth.user=null] User name.
 * @param {string} [opt.auth.pw=null] Password.
 * @param {number} [opt.relaymode=$najax.define.relaymode] Data relaymode. See $najax.define.relaymode for detail.
 * @param {boolean} [opt.clean=true] Clear object's values after completed.
 *
 * @see $najax.request
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).done();
 * $najax.post(url).param(vs).done();
 * $najax.raw(url).done(function(){ ... });
 * $najax.script(url).success(function(){ ... }).done(function(){ ... });
 *
 * var rl = $najax.html(url).done();
 */
var Nx = function(opt){
	this._url = null;
	this._vs = null;
	this._relaydata = null;

	this._o = ext({
		method: 'GET',
		type: 'json',
		async: true,
		cache: false,
		retry: null,
		timeout: null,
		filter: null,
		contentType: 'application/x-www-form-urlencoded',
		mime: null,
		headers: {},
		noescape: false,
		jsonp: {callback: '', name: 'callback'},
		element: 'div',
		iseval: true,
		separator: ',',
		auth: {user: null, pw: null},
		relaymode: njx.define.relaymode,
		clean: true
	}, opt);

	this._upload = null;
	this._download = null;

	this._begin = null;
	this._running = null;
	this._sccs = null;
	this._fail = null;
	this._cmpl = null;

	this.__url = null;
	this.__retry = 0;
	this.__before = null;
	this.__after = null;

	this.__xhr = null;
	this.__type = 'text';

	this.__rsp = null;
};

/**
 * Set method. GET / POST
 *
 * <b>Method</b><br>
 *
 * | Method | Description | Related method or option |
 * | <code>GET(*)</code> | Http GET. | Nx.param<br>opt.noescape |
 * | <code>POST</code> | Http POST. | Nx.param<br>opt.noescape<br>opt.contentType |
 *
 * @memberof Nx
 * @instance
 *
 * @param {string} method Method. GET / POST
 * @returns {Nx}
 *
 * @default 'GET'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).method('get').done();
 * $najax.request(url).method('post').done();
 */
Nx.prototype.method = function(method){
	this._o.method = method;
	return this;
};

/**
 * Set response type.
 *
 * <b>Response type</b><br>
 *
 * | Type | Description | Value type | Related method or option |
 * |:---|:---|:---|:---|
 * | <code>json(*)</code> | Json. | assoc |  |
 * | <code>raw</code> | Raw data. | string |  |
 * | <code>text</code> | Text. <i>text</i> is same as <i>raw</i>. | string |  |
 * | <code>html</code> | HTML. | Element | opt.element |
 * | <code>script</code> | Execute script. | null | opt.iseval |
 * | <code>func</code> | Function. | function |  |
 * | <code>jsonp</code> | Jsonp. | null | Nx.jsonp  |
 * | <code>csv</code> | Csv(Tsv). | array | opt.separator |
 * | <code>xml</code> | Xml. | XMLDocument |  |
 * | <code>blob</code> | Blob. | Blob |  |
 * | <code><i>other</i></code> | XMLHttpRequest.responseType. | Varies. |  |
 *
 * @function
 * @name type
 * @memberof Nx
 * @instance
 *
 * @param {string} type Response type.
 * @returns {Nx}
 *
 * @default 'json'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).type('raw').done();
 * $najax.request(url).type('html').done();
 * $najax.request(url).type('script').done();
 */

/**
 * Set url.
 * @function
 * @name url
 * @memberof Nx
 * @instance
 *
 * @param {string} url URL.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(null).url(url).done();
 */

/**
 * Set param. GET: URL parameters, POST: POST parameters.
 * @function
 * @name param
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).param('a', 1).param('b', 1).done();
 * $najax.request(url).param({a: 1, b:2, c:3}).done();
 */

/**
 * Set async or sync.
 * @memberof Nx
 * @instance
 *
 * @param {boolean} on Async flag.
 * @returns {Nx}
 *
 * @default true
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).async(false).done();	//sync
 */
Nx.prototype.async = function(on){
	this._o.async = on;
	return this;
};

/**
 * Set cache behavior.
 * @function
 * @name cache
 * @memberof Nx
 * @instance
 *
 * @param {boolean} on Determine to cache.
 * @returns {Nx}
 *
 * @default false
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).cache(true).done();
 */

/**
 * Set retry number.
 * @function
 * @name retry
 * @memberof Nx
 * @instance
 *
 * @param {number} n Retry number.
 * @returns {Nx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).retry(2).done();
 */

/**
 * Set timeout ms.
 * @memberof Nx
 * @instance
 *
 * @param {number} s Timeout ms.
 * @returns {Nx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).timeout(500).done();
 */
Nx.prototype.timeout = function(s){
	this._o.timeout = s;
	return this;
};

/**
 * Set filter function. It's possible to modify response-value.
 *
 * <b>Function specification</b><br>
 * Called after recieving data and before making response-value.
 *
 * <b>Function structure</b><br>
 * <code>function(v:string){ return v; }</code>
 *
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Filter function.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).filter(function(v){ return v; }).done();
 */
Nx.prototype.filter = function(fn){
	this._o.filter = fn;
	return this;
};

/**
 * Set jsonp option.
 * @function
 * @name jsonp
 * @memberof Nx
 * @instance
 *
 * @param {string|function} [callback] Jsonp callback function.
 * @param {string} [name='callback'] Jsonp callback variable name.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).type('jsonp').jsonp('func').done();
 * $najax.request(url).type('jsonp').jsonp(func).done();
 * $najax.request(url).type('jsonp').jsonp(func, 'callback').done();
 */

/**
 * Set <i>content-type</i> and mime. Method POST option.
 * @memberof Nx
 * @instance
 *
 * @param {string} contentType Content-type.
 * @param {string} mime Mime.
 * @returns {Nx}
 *
 * @default 'application/x-www-form-urlencoded'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).contentType('application/x-www-form-urlencoded').done();
 */
Nx.prototype.contentType = function(contentType, mime){
	if (contentType != null){
		this._o.contentType =  contentType;
	}

	if (mime){
		this._o.mime = mime;
	}

	return this;
};

/**
 * Set HTTP Headers.
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).header('abc', 'ABC').done();
 * $najax.request(url).header({abc: 'ABC'}).done();
 */
Nx.prototype.header = function(w, v){
	if (!this._o.headers){
		this._o.headers = {};
	}

	extVs(this._o.headers, w, v);

	return this;
};

/**
 * Set upload object. Support Form(Element) and input(type=file)(Element), FormData.
 * @memberof Nx
 * @instance
 *
 * @param {Element|FormData} v Form(Element) / input(type=file)(Element) / FormData.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).upload(input).done();
 * $najax.request(url).upload(form).done();
 */
Nx.prototype.upload = function(v){
	var o;

	if (v instanceof FormData){
		o = v;
	}else if (v.constructor === Object){
		o = new FormData();

		for (var k in v){
			if (v.hasOwnProperty(k) && v[k].files){
				o.append(k, v[k].files[0]);
			}
		}
	}else if (v instanceof Element){
		switch(v.tagName.toLocaleLowerCase()){
		case 'form':
			o = new FormData(v);
			break;
		case 'input':
			o = new FormData();

			if (v.files){
				o.append(v.name, v.files[0]);
			}
			break;
		default:
			break;
		}
	}

	this._vs = o;

	this.method('post');
	this.contentType(false);

	return this;
};

/**
 * Set download and upload progress function.
 *
 * <b>Function structure</b><br>
 * <code>function(e:ProgressEvent, rate:number, xhr:XMLHttpRequest){ ... }</code> <code>rate: [0.0 - 1.0]</code>
 *
 * @memberof Nx
 * @instance
 *
 * @param {function} [download=null] Download progress function.
 * @param {function} [upload=null] Upload progress function.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).progress(dl, up).done();
 * $najax.request(url).progress(dl).done();
 */
Nx.prototype.progress = function(download, upload){
	if (download){
		this._download = download;
	}

	if (upload){
		this._upload = upload;
	}

	return this;
};

/**
 * Set auth.
 * @memberof Nx
 * @instance
 *
 * @param {string} user User name.
 * @param {string} pw Password.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).auth('user', 'password').done();
 */
Nx.prototype.auth = function(user, pw){
	this._o.auth = {user: user, pw: pw};
	return this;
};

/**
 * Set clear behavior.
 * @function
 * @name clean
 * @memberof Nx
 * @instance
 *
 * @param {boolean} on Determine to clear. If true, clear object's values after completed.
 * @returns {Nx}
 *
 * @default true
 *
 * @see Nx#clear
 * @tutorial static-najax
 *
 * @example
 * var nx = $najax.request(url).clean(false);nx.done();	//not clear
 */

/**
 * Set relay original data.
 * @function
 * @name relay
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).relay('a', 1).relay('b', 2).done();
 * $najax.request(url).relay({a:1, b:2}).done();
 */

/**
 * Set <i>opt</i> value.
 * @function
 * @name opt
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).opt('noescape', true).done();
 * $najax.request(url).opt('relaymode', 1).done();
 * $najax.request(url).opt({element: 'div'}).done();
 */

/**
 * Set begin function.
 *
 * <b>Function specification</b><br>
 * Called before beginning ajax.
 *
 * <b>Function structure</b><br>
 * <code>function(xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name begin
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Begin function.
 * @returns {Nx}
 *
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).begin(function(){ ... }).done();
 */

/**
 * Set success function.
 *
 * <b>Function specification</b><br>
 * Called when ajax succeed. ex: HTTP code 200.
 *
 * <b>Function structure</b><br>
 * <code>function(v:*, xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name success
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Success function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).success(function(v, xhr){ ... }).done();
 */

/**
 * Set fail function.
 *
 * <b>Function specification</b><br>
 * Called when ajax fail. ex: network error, 403, 404, 503 or any other HTTP error.
 *
 * <b>Function structure</b><br>
 * <code>function(state:number, xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name fail
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Fail function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#complete
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).fail(function(state, xhr){ ... }).done();
 */

/**
 * Set complete function.
 *
 * <b>Function specification</b><br>
 * Called after ajax completed, both success and fail.
 *
 * <b>Function structure</b><br>
 * <code>function(v:*, xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name complete
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Complete function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).complete(function(v, xhr){ ... }).done();
 */

/**
 * Set running function.
 *
 * <b>Function specification</b><br>
 * Called when begin(state=true) and complete(state=false).
 *
 * <b>Function structure</b><br>
 * <code>function(state:boolean){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name running
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Running function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).running(function(state){ ... }).done();
 */

/**
 * Set success / fail / complete, and begin ajax.
 * @memberof Nx
 * @instance
 *
 * @param {function} [success] Success function. See <i>Nx.success</i>.
 * @param {function} [fail] Fail function. See <i>Nx.fail</i>.
 * @param {function} [complete] Complete function. See <i>Nx.complete</i>.
 * @returns {Relay} Relay object.
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#running
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).done();
 * $najax.request(url).done(function{ ... });
 * $najax.request(url).done(null, function{ ... });
 * $najax.request(url).done(null, null, function{ ... });
 */
Nx.prototype.done = function(success, fail, complete){
	this.__done(success, fail, complete);

	var rl = new Relay();

	this.__xhr = nxXHR();

	mkURL(this);

	preRl(this, rl);

	nxReady(this, rl);

	nxSend(this, true, rl);

	return rl;
};

/**
 * Abort ajax.
 * @memberof Nx
 * @instance
 *
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * nx.abort();
 */
Nx.prototype.abort = function(){
	this.__xhr.abort();

	return this;
};

/**
 * Clear object's values after completed.
 * @memberof Nx
 * @instance
 *
 * @tutorial static-najax
 *
 * @example
 * nx.clear();
 */
Nx.prototype.clear = function(){
	this.__xhr.onreadystatechange = none;
	this.__xhr.onprogress = none;
	this.__xhr.upload.onprogress = none;

	clear(this);
};

/**
 * Get XHR object.
 * @memberof Nx
 * @instance
 *
 * @returns {XMLHttpRequest}
 *
 * @example
 * var nx = $najax.request(url);nx.done();
 * var xhr = nx.xhr();
 */
Nx.prototype.xhr = function(){
	return this.__xhr;
};

ext(Nx.prototype, Bx);

function mkURL(bx){
	var o = bx._o, u = bx._url;

	o.type = o.type.toLowerCase();

	o.method = (!o.method)?'GET':o.method.toUpperCase();

	if (bx._vs && o.method !== 'POST'){
		u = njx.url(u, bx._vs, o.noescape);
	}

	if (o.type === 'jsonp'){
		u = u + urlAdd(u) + o.jsonp.name + '=' + njx.escape(o.jsonp.callback);
	}

	if (!o.cache){
		u = utms(u);
	}

	bx.__url = u;
}

function utms(url){
	return url + urlAdd(url) + njx.define.utms + '=' + (new Date()).getTime();
}

function urlAdd(url){
	if (url.search(/\?/) != -1){
		if (url.search(/[\&\?]$/) == -1){
			return '&';
		}
	}else{
		return '?';
	}

	return '';
}

function postVs(vs, raw){
	if (vs instanceof Object && vs.constructor === Object || vs instanceof Array){
		return njx.params(vs, raw);
	}

	return vs;
}

function nxXHR() {
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

function nxReady(nx, rl){
	switch(nx._o.type){
	case 'json':
		nx.__rsp = rspJson();
		break;
	case 'html':
		nx.__rsp = rspHtml(nx._o.element);
		break;
	case 'script':
		nx.__rsp = rspScript(nx._o.iseval);
		break;
	case 'func':
		nx.__rsp = rspFunc();
		break;
	case 'jsonp':
		nx.__rsp = rspScript(nx._o.iseval);
		break;
	case 'csv':
		nx.__rsp = rspCsv(nx._o.separator);
		break;
	case 'xml':
		nx.__type = 'document';
		break;
	case 'blob':
		nx.__type = 'blob';
		break;
	case 'raw':
	case 'text':
	case '':
		break;
	default:
		nx.__type = nx._o.type;
		break;
	}

	if (nx._download){
		nx.__xhr.onprogress = function(e){
			var r = e.loaded/e.total;
			nx._download(e, r, nx.__xhr);
		};
	}

	if (nx._upload){
		nx.__xhr.upload.onprogress = function(e){
			var r = e.loaded/e.total;
			nx._upload(e, r, nx.__xhr);
		};
	}

	nx.__xhr.onreadystatechange = function(){
		var xhr = nx.__xhr;

		if (xhr.readyState == 4){
			var v = xhr.response || xhr.responseText, r = null, vs;

			if (xhr.status == 200){
				if (nx._o.relaymode & 4){
					rl.data('_raw', v);
				}

				if (nx._o.filter){
					v = nx._o.filter(v);
				}

				if (nx.__rsp){
					v = nx.__rsp(v);
				}

				vs = [v, xhr];
				rl.setState(null, argPss(nx, vs));

				if (nx._sccs){
					r = nx._sccs.apply(rl, vs);
				}

				nx.__end(rl, vs, r);

				rl.notifySuccess();
			}else{
				if (nx._o.retry && nx._o.retry > nx.__retry && (xhr.status >= 500 || xhr.status == 0)){
					nx.__retry++;
					nxSend(nx, false);
					return;
				}

				if (xhr.status == 0){
					error('connection failed.', xhr);
				}

				vs = [xhr.status, xhr];
				rl.setState(null, argPss(nx, vs));

				if (nx._fail){
					r = nx._fail.apply(rl, vs);
				}

				nx.__end(rl, vs, r);

				rl.notifyFail();
			}

			if (nx._o.clean){
				nx.clear();
				nx = rl = null;
			}
		}
	};
}

function rspHtml(c){
	return function(v){
		if (typeof c !== 'object'){
			c = document.createElement(c);
		}

		njx.parseHTML(c, v);

		return c;
	};
}
function rspScript(evl){
	if (!evl){
		return function(v){
			(new Function(v))();

			return null;
		};
	}

	return function(v){
		if (window.execScript){
			window.execScript(v, 'JavaScript');
		}else{
			eval.call(null, v);
		}

		return null;
	};
}

function rspJson(){
	return function(v){
		if (!v){
			return null;
		}

		try {
			v = JSON.parse(v);
		}catch(e){
			v = null;
		}

		return v;
	};
}

function rspFunc(){
	return function(v){
		return new Function(v);
	};
}

function rspCsv(spl){
	var rx = new RegExp('("([^' + spl + ']*?)"(?:\s*' + spl + '|$)|\'([^' + spl + ']*?)\'(?:\s*' + spl + '|$)|([^' + spl + ']+?)(?:\s*' + spl + '|$))', 'g');

	return function(v){
		var t, w, z, vs = v.split(/[\r\n|\n]/);

		for (var i=0;i<vs.length;i++){
			z = [];
			while ((t = rx.exec(vs[i])) !== null){
				w = (t[2] != null)?t[2]:((t[3] != null)?t[3]:((t[4] != null)?t[4]:''));
				z.push(w);
			}
			vs[i] = z;
		}

		return vs;
	};
}

function nxSend(nx, fs, rl){
	var o = nx._o, xhr = nx.__xhr, k;

	xhr.open(o.method, nx.__url, o.async, o.auth.user, o.auth.pw);

	if (o.async && nx.__type){
		xhr.responseType = nx.__type;
	}

	if (o.timeout != null){
		xhr.timeout = o.timeout*1000;
	}

	for (k in o.headers){
		if (o.headers.hasOwnProperty(k)) {
			xhr.setRequestHeader(k, o.headers[k]);
		}
	}

	if (o.mime && xhr.overrideMimeType){
		xhr.overrideMimeType(o.mime);
	}

	if (fs){
		nx.__start(rl, [xhr]);
	}

	if (nx._o.method === 'POST'){
		if (o.contentType){
			xhr.setRequestHeader('content-type', o.contentType);
		}

		xhr.send(postVs(nx._vs, nx._o.noescape));
	}else{
		xhr.send();
	}
}
