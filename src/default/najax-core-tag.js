'use strict';

/* global mkURL: false */
/* global argPss: false */
/* global preRl: false */

/**
 * Tx class. This class is created automatically by $najax.scriptTag and $najax.jsonpTag.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * <b>Specification</b><br>
 * - Specify load and response behaviors by <code>Nx object</code>.
 * - Specify by Tx object's various method or <code>Tx <i>opt</i></code> method.
 * - Begin tag-loading by <code>Tx <i>done</i></code>.
 * - <code>Tx <i>done</i></code> returns <code>Relay object</code>.
 * - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 * - <code>Tx</code> implement tag-loading by appending <i>SCRIPT tag</i> element.
 *
 * @class Tx
 *
 * @param {assoc} [opt: Tx options.
 * @param {string} [opt.type='script'] Response type.
 * @param {boolean} [opt.cache=false] Enable cache.
 * @param {number} [opt.retry=null] Retry number.
 * @param {boolean} [opt.noescape=false] If true, not escape parameters. Apply to GET parameters.
 * @param {assoc} [opt.jsonp] Jsonp option.
 * @param {string|function} [opt.jsonp.callback=''] Jsonp callback function.
 * @param {string} [opt.jsonp.name='callback'] Jsonp callback variable name.
 * @param {string} [opt.mime='text/javascript'] Script tag's <i>type</i>.
 * @param {string} [opt.charset=null] Script tag's <i>charset</i>.
 * @param {number} [opt.relaymode=$najax.define.relaymode] Data relaymode. See $najax.define.relaymode for detail.
 * @param {boolean} [opt.clean=true] Clear object's values after completed.
 *
 * @see $najax.scriptTag
 * @see $najax.jsonpTag
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).done();
 * $najax.jsonpTag(url, 'func').done();
 *
 * $najax.scriptTag(url).param('a', 1).param('b', 1).done();
 * $najax.jsonpTag(url).jsonp('func').done();
 *
 * $najax.scriptTag(url).opt({charset: 'utf-8'}).done();
 * $najax.scriptTag(url).complete(function(){ ... }).done();
 * $najax.scriptTag(url).fail(function(){ ... }).done();
 */
var Tx = function(opt){
	this._url = null;
	this._vs = null;
	this._relaydata = null;

	this._o = ext({
		type: 'script',
		cache: false,
		retry: null,
		noescape: false,
		jsonp: {name: 'callback', callback: ''},
		mime: 'text/javascript',
		charset: null,
		relaymode: njx.define.relaymode,
		clean: true
	}, opt);

	this._begin = null;
	this._running = null;
	this._sccs = null;
	this._fail = null;
	this._cmpl = null;

	this.__url = null;
	this.__retry = 0;
	this.__before = null;
	this.__after = null;

	this.__el = null;
};

/**
 * Set url.
 * @function
 * @name url
 * @memberof Tx
 * @instance
 *
 * @param {string} url URL.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(null).url(url).done();
 */

/**
 * Set param. GET parameters.
 * @function
 * @name param
 * @memberof Tx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).param('a', 1).param('b', 1).done();
 * $najax.scriptTag(url).param({a: 1, b:2, c:3}).done();
 */

/**
 * Set cache behavior.
 * @function
 * @name cache
 * @memberof Tx
 * @instance
 *
 * @param {boolean} on Determine to cache.
 * @returns {Tx}
 *
 * @default false
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).cache(true).done();
 */

/**
 * Set retry number.
 * @function
 * @name retry
 * @memberof Tx
 * @instance
 *
 * @param {number} n Retry number.
 * @returns {Tx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).retry(2).done();
 */

/**
 * Set jsonp option.
 * @function
 * @name jsonp
 * @memberof Tx
 * @instance
 *
 * @param {string|function} [callback] Jsonp callback function.
 * @param {string} [name='callback'] Jsonp callback variable name.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.jsonpTag(url).jsonp('func').done();
 * $najax.jsonpTag(url).jsonp(func).done();
 * $najax.jsonpTag(url).jsonp(func, 'callback').done();
 */

/**
 * Set <i>charset</i> value of script-tag.
 * @memberof Tx
 * @instance
 *
 * @param {string} v Charset.
 * @returns {Tx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).charset('utf-8').done();
 */
Tx.prototype.charset = function(v){
	this._o.charset = v;
	return this;
};

/**
 * Set <i>type</i> value of script-tag.
 * @memberof Tx
 * @instance
 *
 * @param {string} v Type.
 * @returns {Tx}
 *
 * @default 'text/javascript'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).mime('application/javascript').done();
 */
Tx.prototype.mime = function(v){
	this._o.mime = v;
	return this;
};

/**
 * Set clear behavior.
 * @function
 * @name clean
 * @memberof Tx
 * @instance
 *
 * @param {boolean} on Determine to clear. If true, clear object's values after completed.
 * @returns {Tx}
 *
 * @default true
 *
 * @see Nx#clear
 * @tutorial static-najax
 *
 * @example
 * var tx = $najax.scriptTag(url).clean(false);tx.done();
 */

/**
 * Set relay original data.
 * @function
 * @name relay
 * @memberof Tx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).relay('a', 1).relay('b', 2).done();
 * $najax.scriptTag(url).relay({a:1, b:2}).done();
 */

/**
 * Set <i>opt</i> value.
 * @function
 * @name opt
 * @memberof Tx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).opt('noescape', true).done();
 * $najax.scriptTag(url).opt('relaymode', 1).done();
 * $najax.scriptTag(url).opt({charset: 'utf-8'}).done();
 */

/**
 * Set begin function.
 *
 * <b>Function specification</b><br>
 * Called before beginning tag-loading.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name begin
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Begin function.
 * @returns {Tx}
 *
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).begin(function(){ ... }).done();
 */

/**
 * Set success function.
 *
 * <b>Function specification</b><br>
 * Called when tag-loading succeed. ex: HTTP code 200.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name success
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Success function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).success(function(){ ... }).done();
 */

/**
 * Set fail function.
 *
 * <b>Function specification</b><br>
 * Called when tag-loading fail. ex: network error, 403, 404, 503 or any other HTTP error.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name fail
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Fail function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#complete
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).fail(function(){ ... }).done();
 */

/**
 * Set complete function.
 *
 * <b>Function specification</b><br>
 * Called after ajax completed, both success and fail.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name complete
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Complete function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).complete(function(){ ... }).done();
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
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Running function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).running(function(state){ ... }).done();
 */

/**
 * Set success / fail / complete, and begin tag-loading.
 * @memberof Tx
 * @instance
 *
 * @param {function} [success] Success function. See <i>Tx.success</i>.
 * @param {function} [fail] Fail function. See <i>Tx.fail</i>.
 * @param {function} [complete] Complete function. See <i>Tx.complete</i>.
 * @returns {Relay} Relay object.
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#running
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).done();
 * $najax.scriptTag(url).done(function{ ... });
 * $najax.jsonpTag(url, 'func').done(null, function{ ... });
 * $najax.jsonpTag(url, 'func').done(null, null, function{ ... });
 */
Tx.prototype.done = function(success, fail, complete){
	this.__done(success, fail, complete);

	var rl = new Relay();

	mkURL(this);

	preRl(this, rl);

	this.__start(rl);

	txReady(this, rl);

	return rl;
};

/**
 * Abort ajax.
 * @memberof Tx
 * @instance
 *
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * tx.abort();
 */
Tx.prototype.abort = function(){
	if (window.stop){
		window.stop();
	}

	txDrop(this);

	return this;
};

/**
 * Clear object's values after completed.
 * @memberof Tx
 * @instance
 *
 * @tutorial static-najax
 *
 * @example
 * tx.clear();
 */
Tx.prototype.clear = function(){
	txDrop(this);
	clear(this);
};

ext(Tx.prototype, Bx);

function txDrop(tx){
	if (tx.__el){
		tx.__el.onreadystatechange = tx.__el.onload = tx.__el.onerror = none;
		tx.__el.parentNode.removeChild(tx.__el);
		tx.__el = null;
	}
}

function txSc(tx, rl){
	var r = null;

	if (tx._sccs){
		r = tx._sccs();
	}

	tx.__end(rl, null, r);

	rl.notifySuccess();

	if (tx._o.clean){
		tx.clear();
	}
}

function txReady(tx, rl){
	var c = document.createElement('script');

	c.src = tx.__url;
	c.type = tx._o.mime;
	c.async = true;

	if (tx._o.charset){
		c.charset = tx._o.charset;
	}

	tx.__el = c;

	if (document.head){
		tx.__el.onload = function(){
			txSc(tx, rl);
			tx = rl = null;
		};

		tx.__el.onerror = function(){
			var r = null;

			if (tx._o.retry && tx._o.retry > tx.__retry){
				tx.__retry++;
				txDrop(tx);
				txReady(tx, rl);
				return;
			}

			if (tx._fail){
				r = tx._fail();
			}

			tx.__end(rl, null, r);

			rl.notifyFail();

			if (tx._o.clean){
				tx.clear();
			}

			tx = rl = null;
		};
	}else{
		tx.__el.onreadystatechange = function(){
			if (this.readyState === 'loaded'){
				txSc(tx, rl);
				tx = rl = null;
			}
		};
	}

	(document.head || document.body).appendChild(tx.__el);
}

Bx = null;

/**
 * Script execute / tag request. Support outer cross-domain request. Only GET method.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * <b>Specification</b><br>
 * - Append <i>SCRIPT</i> tag.
 * - Load script and execute script.
 * - Remove <i>SCRIPT</i> tag.
 *
 * @function scriptTag
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET.
 * @param {assoc} [opt] Tx options.
 * @returns {Tx}
 *
 * @see Tx
 * @see Relay
 *
 * @tutorial static-najax
 * @example
 * $najax.scriptTag('script.php').done();
 * $najax.scriptTag('script.php', vs).done();
 * $najax.scriptTag('script.php').charset('utf-8').done();
 * $najax.scriptTag('script.php').success(function(){ ... }).done();
 */
njx.scriptTag = function(url, vs, opt){
	info('scriptTag');

	return (new Tx(opt)).__basic(url, vs, 'script');
};

/**
 * Jsonp / tag request. Support outer cross-domain request. Only GET method.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * <b>Specification</b><br>
 * See $najax.scriptTag specification.
 *
 * @function jsonpTag
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {function|string} fn Callback function. It must be global function.
 * @param {assoc} [opt] Tx options.
 * @returns {Tx}
 *
 * @see Tx
 * @see Relay
 *
 * @tutorial static-najax
 * @example
 * $najax.jsonpTag('script.php', jsp_func).done();
 * $najax.jsonpTag('script.php', 'jsp_func').charset('utf-8').done();
 * $najax.jsonpTag('script.php').jsonp(jsp_func, 'callback').done();
 * $najax.jsonpTag('script.php').param(vs).done();
 * $najax.jsonpTag('script.php').success(function(){ ... }).done();
 */
njx.jsonpTag = function(url, fn, opt){
	info('jsonpTag');

	return (new Tx(opt)).__basic(url, null, 'jsonp').jsonp(fn);
};

