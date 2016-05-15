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
 * $najax.history.push('?v=1', null, 'abc');
 * $najax.history.pushQuery();
 *
 * //replace
 * $najax.history.replace('?v=1');
 * $najax.history.replace('?v=1', null, 'abc', {data: {v: 2}});
 * $najax.history.replaceQuery('abc', {v: 2});
 *
 * //listen
 * $najax.history.listen(function(e, id, vs, title){ ... });
 *
 * //init
 * $najax.history.replaceListen(function(e, id, vs, title){ ... });
 */
njx.history = {};

/**
 * @ignore
 */
var hsRpl = false;
var hsLtn = false;


/**
 * Push new page's url and title, values. Recommend to use this method with <i>$najax.history.listen</i>.
 * @function push
 * @memberof $najax.history
 *
 * @param {string} url URL.
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title.
 * @param {assoc} [opt] Options.
 * @param {assoc} [opt.data=null] Passed values.
 * @param {assoc} [opt.store=true] Store first page's data by <i>$najax.history.replace</i>.
 * @param {function} [opt.legacy=null] Legacy browser's behaviors. <code>Ex: function(url, title, vs){location.href = url;}</code>
 *
 * @see $najax.history.pushQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.push('?v=1');
 * $najax.history.push('?v=1', id, 'abc', {data: {v: 2}});
 * $najax.history.push('?v=1', null, null, {legacy: function(url, id, title, vs){ ... } });
 */
njx.history.push = function(url, id, title, opt){
	info('history.push');

	opt = ext({data:null, store: true, legacy: null}, opt);

	id = (id !== undefined)?id:null;
	title = (title !== undefined)?title:null;

	if (history.pushState){
		if (opt.store && !hsRpl){
			njx.history.replace();
		}

		history.pushState({id: id, title: title, data: opt.data}, title, url);
	}else{
		if (opt.legacy){
			opt.legacy.call(null, url, id, title, opt.data);
		}
	}
};

/**
 * Push new page's url and title, values. Support query-string. Recommend to use this with <i>$najax.history.listen</i>.
 * @function pushQuery
 * @memberof $najax.history
 *
 * @param {string|integer} [id=null] Page's id.
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
 * $najax.history.pushQuery(id, 'abc', vs, {data: {v: 2}});
 * $najax.history.pushQuery(null, 'abc', null, {title: false});
 */
njx.history.pushQuery = function(id, title, vs, opt){
	info('history.pushQuery');

	var u = njx.url(location.href, vs);

	njx.history.push(u, id, title, vs, opt);
};

/**
 * Replace now page's url and title, values.
 * @function replace
 * @memberof $najax.history
 *
 * @param {string} [url] URL. If null, prepare now url.
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [opt] Options.
 * @param {assoc} [opt.data=null] Passed values.
 * @param {function} [opt.legacy=null] Legacy browser's behaviors. <code>Ex: function(url, title, vs){location.replace = url;}</code>
 *
 * @see $najax.history.replaceQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replace('?v=1');
 * $najax.history.replace('?v=1', id, 'abc', {data: {v: 2}});
 * $najax.history.replace('?v=1', null, null, {legacy: function(url, id, title, vs){ ... } });
 */
njx.history.replace = function(url, id, title, opt){
	info('history.replace');

	opt = ext({data:null, legacy: null}, opt);

	hsRpl = true;

	if (url == null){
		url = location.href;
	}

	if (title == null){
		title = document.title;
	}

	if (history.pushState){
		history.replaceState({id: id, title: title, data: opt.data}, title, url);
	}else{
		if (opt.legacy){
			opt.legacy.call(null, url, id, title, opt.data);
		}
	}
};

/**
 * Replace now page's url and title, values. Support query-string.
 * @function replaceQuery
 * @memberof $najax.history
 *
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [vs=null] Passed values. URL's query-string values is overrided by this values.
 * @param {assoc} [opt] Options. $najax.history.replace options.
 *
 * @see $najax.history.replace
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replaceQuery();
 * $najax.history.replaceQuery(id, 'abc', vs, {data: {v: 2}});
 * $najax.history.replaceQuery(null, 'abc', null, {title: false});
 */
njx.history.replaceQuery = function(id, title, vs, opt){
	info('history.replaceQuery');

	var u = njx.url(location.href, vs);

	njx.history.replace(u, id, title, vs, opt);
};

/**
 * Listen to event of browser's back and prev.
 * @function listen
 * @memberof $najax.history
 *
 * @param {function} fn Callback function. <code>function(e:event, title:string, vs:assoc){ ... }</code>
 * @param {assoc} [opt] Options.
 * @param {boolean} [opt.title=true] Change title automatically.
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.listen(function(e, id, title, data){ ... });
 */
njx.history.listen = function(fn, opt){
	info('history.listen');

	opt = ext({title: true}, opt);

	hsLtn = true;

	if (history.pushState){
		window.onpopstate = function(e){
			var id=null, title=null, data=null;

			if (e.state){
				id = e.state.id || null;
				title = e.state.title || null;
				data = e.state.data || null;
			}

			if (fn){
				fn.call(null, e, id, title, data);
			}

			if (opt.title && title != null){
				document.title = title;
			}
		};
	}
};

/**
 * Replace & replace now.
 * @function init
 * @memberof $najax.history
 *
 * @param {function} fn Callback function. <code>function(e:event, title:string, vs:assoc){ ... }</code>
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title.
 * @param {assoc} [opt] Options. <i>$najax.history.listen, $najax.history.replace</i>'s options.
 * @param {assoc} [opt.data=null] Passed values.
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replaceListen(function(e, id, title, data){ ... }, id);
 */
njx.history.replaceListen = function(fn, id, title, opt){
	info('history.replaceListen');

	opt = ext({data: null}, opt);

	njx.history.listen(fn, opt);

	njx.history.replace(null, id, title, opt);
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
