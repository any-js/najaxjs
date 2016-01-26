'use strict';

/**
 * Support history push and replace, listen.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @namespace $najax.history
 *
 * @tutorial static-history
 *
 * @example
 * //push
 * $najax.history.push('?v=1');
 * $najax.history.push('?v=1', 'abc', {v: 2});
 * $najax.history.pushQuery();
 *
 * //replace
 * $najax.history.replace('?v=1');
 * $najax.history.replace('?v=1', 'abc', {v: 2});
 * $najax.history.replaceQuery('abc', {v: 2});
 *
 * //listen
 * $najax.history.listen(function(e, vs, title){ ... });
 *
 * //init
 * $najax.history.init(function(vs, init){ ... }, qs);
 */
njx.history = {};

/**
 * @ignore
 */
var hsRpl = false;
var hsLtn = false;

/**
 * Push new page's url and title, values. Recommend to use this with <i>$najax.history.listen</i>.
 * @function push
 * @memberof $najax.history
 *
 * @param {string} url URL.
 * @param {string} [title=null] Title. If null, prepare now title.
 * @param {assoc} [vs=null] Passed values.
 * @param {assoc} [opt] Options.
 * @param {assoc} [opt.store=true] Store first page's data by <i>$najax.history.replace</i>.
 * @param {assoc} [opt.listen=false] Listen automatically by <i>$najax.history.listen</i>.
 * @param {boolean} [opt.title=true] Change title automatically.
 * @param {function} [opt.legacy=null] Legacy browser's behaviors. <code>Ex: function(url, title, vs){location.href = url;}</code>
 *
 * @see $najax.history.pushQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.push('?v=1');
 * $najax.history.push('?v=1', 'abc', {v: 2});
 * $najax.history.push('?v=1', null, null, {legacy: function(url, title, vs){ ... } });
 * $najax.history.push('?v=1', null, null, {listen: true, title: false});
 */
njx.history.push = function(url, title, vs, opt){
	info('history.push');

	opt = ext({store: true, listen: false, title: true, legacy: null}, opt);

	if (title == null){
		title = document.title;
	}

	vs = vs || {};

	if (history.pushState){
		if (opt.store && !hsRpl){
			njx.history.replace();
		}

		if (opt.listen && !hsLtn){
			njx.history.listen(null);
		}

		history.pushState({title: title, data: vs}, title, url);
	}else{
		if (opt.legacy){
			opt.legacy.call(null, url, title, vs);
		}
	}

	if (opt.title){
		document.title = title;
	}
};

/**
 * Push new page's url and title, values. Support query-string. Recommend to use this with <i>$najax.history.listen</i>.
 * @function pushQuery
 * @memberof $najax.history
 *
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [vs=null] Passed values. URL's query-string values is overrided by this values.
 * @param {assoc} [opt] Options. $najax.history.push options.
 *
 * @see $najax.history.pushQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.pushQuery();
 * $najax.history.pushQuery('abc', {v: 2});
 * $najax.history.pushQuery('abc', null, {listen: true, title: false});
 */
njx.history.pushQuery = function(title, vs, opt){
	info('history.pushQuery');

	var u = njx.url(location.href, vs);

	njx.history.push(u, title, vs, opt);
};

/**
 * Replace now page's url and title, values.
 * @function replace
 * @memberof $najax.history
 *
 * @param {string} [url] URL. If null, prepare now url.
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [vs=null] Passed values.
 * @param {assoc} [opt] Options.
 * @param {boolean} [opt.title=true] Change title automatically.
 * @param {function} [opt.legacy=null] Legacy browser's behaviors. <code>Ex: function(url, title, vs){location.replace = url;}</code>
 *
 * @see $najax.history.replaceQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replace('?v=1');
 * $najax.history.replace('?v=1', 'abc', {v: 2});
 * $najax.history.replace('?v=1', null, null, {legacy: function(url, title, vs){ ... } });
 * $najax.history.replace('?v=1', null, null, {title: false});
 */
njx.history.replace = function(url, title, vs, opt){
	info('history.replace');

	opt = ext({title: true, legacy: null}, opt);

	hsRpl = true;

	if (url == null){
		url = location.href;
	}

	if (title == null){
		title = document.title;
	}

	vs = vs || {};

	if (history.pushState){
		history.replaceState({title: title, data: vs}, title, url);
	}else{
		if (opt.legacy){
			opt.legacy.call(null, url, title, vs);
		}
	}

	if (opt.title){
		document.title = title;
	}
};

/**
 * Replace now page's url and title, values. Support query-string.
 * @function replaceQuery
 * @memberof $najax.history
 *
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [vs=null] Passed values. URL's query-string values is overrided by this values.
 * @param {assoc} [opt] Options. $najax.history.replace options.
 *
 * @see $najax.history.replace
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replaceQuery('abc', {v: 2});
 * $najax.history.replaceQuery(null, {v: 3}, {title: false});
 */
njx.history.replaceQuery = function(title, vs, opt){
	info('history.replaceQuery');

	var u = njx.url(location.href, vs);

	njx.history.replace(u, title, vs, opt);
};

/**
 * Listen to event of browser's back and prev.
 * @function listen
 * @memberof $najax.history
 *
 * @param {function} fn Callback function. <code>function(e:event, vs:assoc, title:string){ ... }</code>
 * @param {assoc} [opt] Options.
 * @param {boolean} [opt.title=true] Change title automatically.
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.listen(function(e, vs, title){ ... });
 */
njx.history.listen = function(fn, opt){
	info('history.listen');

	opt = ext({title: true}, opt);

	hsLtn = true;

	if (history.pushState){
		window.onpopstate = function(e){
			var d = e.state || {};

			if (fn){
				fn.call(null, e, d.data, d.title);
			}

			if (opt.title && d.title != null){
				document.title = d.title;
			}
		};
	}
};

/**
 * Get <i>history.state</i>.
 * @function state
 * @memberof $najax.history
 * @returns {assoc}
 *
 * @tutorial static-history
 *
 * @example
 * vs = $najax.history.state();
 */
njx.history.state = function(){
	return history.state || null;
};

/**
 * Initialize. Listen & replace now.
 * @function init
 * @memberof $najax.history
 *
 * @param {function} fn Initialize function. <code>function(vs:assoc){ ... }</code>
 * @param {assoc} vs Values.
 * @param {assoc} [opt] Options. <i>$najax.history.listen, $najax.history.replace</i>'s options.
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.init(function(vs, init){ ... }, qs);
 */
njx.history.init = function(fn, vs, opt){
	info('history.init');

	njx.history.listen(function(e, vs, title){
		fn(vs);
	}, opt);

	njx.history.replace(null, null, vs, opt);

	fn(vs);
};
