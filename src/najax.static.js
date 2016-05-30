'use strict';

/**
 * $najax(any-ajax) static methods. Provide various ajax methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | scriptTag | Yes | - |
 * | jsonpTag | Yes | - |
 * | Others | Yes | Yes |
 *
 * <b>Requires</b><br>
 * Any other library is unnecessary.
 * <small>(Only $najax.sendex method requires <i>any.js</i> and <i>jQuery</i> library.)</small>
 *
 * <b>Specification</b><br>
 * - Specify ajax request and response behaviors by <code>Nx object</code>.
 * - Specify by Nx object's various method or <code>Nx <i>opt</i></code> method.
 * - Begin ajax connection by <code>Nx <i>done</i></code>.
 * - <code>Nx <i>done</i></code> returns <code>Relay object</code>.
 * - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 * - <code>Nx</code> implement ajax by using <i>XMLHttpRequest</i>.
 *
 * @namespace $najax
 *
 * @see $najax.request
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request('path.php').done();
 * $najax.request('path.php', {a1:1,a2:2,a3:3}).done(function(data){ ... });
 *
 * $najax.post('path.php', {a:1, b:2, c:3}).done();
 * $najax.post('path.php').param('a', 'A').param('b', 'B').done();
 * $najax.raw('path.php').done();
 *
 * $najax.html('template.htm').done(function(el){ ... });
 * $najax.xml('xml.php').done(function(xml){ ... });
 * $najax.jsonp('jsonp.php', jsp_func).done();
 * $najax.sync('ajax.php').done(function(data){ ... });
 * $najax.script('script.php').done();
 * $najax.csv('list.csv').done(function(rows){ ... });
 */

/**
 * Simple ajax request. It's possible to specify ajax behaviors by using Nx object's method chaining.
 *
 * @function request
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see $najax.get
 * @see $najax.post
 *
 * @see Nx
 * @see Relay
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request('path.php').done();
 * $najax.request('path.php', {a1:1,a2:2,a3:3}).done(function(data){ ... });
 * var nx = $najax.request('path.php');nx.param('a', 1).done();
 * $najax.request('path.php').type('raw').done();
 * $najax.request('path.php').success(function(){ ... }).fail(function(){ ... }).done();
 * $najax.request('path.php').retry(2).done();
 * $najax.request('path.php').async(false).timeout(30).done();
 * $najax.request('path.php').header('certify', 'mycode').done();
 * $najax.request('path.php').upload(element).done();
 * $najax.request('path.php').running(function(v){ ... }).complete(function(){ ... }).done();
 */
njx.request = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs);
};

/**
 * GET ajax request.
 * @function get
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see Linker
 * @see $najax.request
 * @see $najax.post
 *
 * @tutorial static-najax
 * @example
 * $najax.get('path.php').done();
 * $najax.get('path.php', {a1:1,a2:2,a3:3}).done(function(data){ ... });
 */
njx.get = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).opt('method', 'GET');
};

/**
 * POST ajax request.
 * @function post
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 * @see $najax.get
 *
 * @tutorial static-najax
 * @example
 * $najax.post('path.php', {a:1, b:2, c:3}).done();
 * $najax.post('path.php').param('a', 'A').param('b', 'B').done();
 * $najax.post('path.php', vs).done(function(data){ ... });
 */
njx.post = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).opt('method', 'POST');
};

/**
 * Raw(text) response / ajax request.
 * @function raw
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.raw('path.php').done();
 * $najax.raw('path.php', vs).done(function(data){ ... });
 * $najax.raw('path.php', vs).success(function(raw){ ... }).done();
 */
njx.raw = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).type('raw');
};

/**
 * Alias of $najax.raw.
 * @function text
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.text('path.php').done();
 * $najax.text('path.php', vs).done(function(data){ ... });
 * $najax.text('path.php').success(function(text){ ... }).done();
 */
njx.text = function(url, vs, opt){
	return njx.raw(url, vs, opt);
};

/**
 * HTML response / ajax request. This method evaluate JavaScript in HTML. It's possible to specify root element by <code>element</code> option in Nx.
 *
 * <b>Response value type</b> <code>Element</code>
 *
 * @function html
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.html('template.htm').done(function(el){ ... }); //Response arg is Element.
 * $najax.html('template.php').success(function(el){ ... }).done();
 * $najax.html('template.php').opt('element', 'span').(function(el){ ... }).done();  //root element tag.
 * $najax.html('template.php').opt('element', el).(function(el){ ... }).done();			//root element.
 */
njx.html = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).cache(true).type('html');
};

/**
 * Script execute / ajax request. It's possible to specify evaluate mode, <i>eval</i> or <i>function</i> by <code>iseval</code> option in Nx.
 *
 * <b>Response value type</b> <code>null</code>
 *
 * @function script
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.script('script.php').done();
 * $najax.script('script.php').opt('iseval', false).done();	//by function.
 */
njx.script = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).cache(true).type('script');
};

/**
 * Function response / ajax request. This method don't execute script, pass <i>function object</i> to argument.
 *
 * <b>Response value type</b> <code>function</code>
 *
 * @function func
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.func('script.php').done(function(fn){ ... });
 * $najax.func('script.php').success(function(fn){ ... }).done();
 */
njx.func = function(url, vs, opt){
	return (new Nx(opt)).__basic(url, vs).cache(true).type('func');
};

/**
 * XML response / ajax request.
 *
 * <b>Response value type</b> <code>XMLDocument</code>
 *
 * @function xml
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.xml('xml.php').done(function(xml){ ... });
 * $najax.xml('xml.php', vs).done(function(xml){ ... });
 * $najax.xml('xml.php').param({a:1, b:1, c:3}).done(function(xml){ ... });
 */
njx.xml = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).type('xml');
};

/**
 * Jsonp / ajax request. It's possible to specify jsonp-callback function by <code>jsonp</code> func in Nx.
 *
 * <b>Response value type</b> <code>null</code>
 *
 * @function jsonp
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {function|string} fn Callback function. It must be global function.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.jsonp('jsonp.php', jsp_func).done();
 * $najax.jsonp('jsonp.php', 'jsp_func').done();
 * $najax.jsonp('jsonp.php', jsp_func).method('post').done();
 * $najax.jsonp('jsonp.php').jsonp(jsp_func, 'callback').param(vs).done();
 */
njx.jsonp = function(url, fn, opt){
	return (new Nx(opt)).__basic(url).jsonp(fn);
};

/**
 * CSV(TSV) response / ajax request. It's possible to specify csv-separator by <code>separator</code> option in Nx.
 *
 * <b>Response value type</b> <code>Array</code>
 *
 * @function csv
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.csv('list.csv').done(function(rows){ ... });
 * $najax.csv('list.tsv').opt('separator', "\t").done(function(rows){ ... });
 */
njx.csv = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).type('csv');
};

/**
 * Ajax request with synchronization mode.
 *
 * @function sync
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.sync('ajax.php').done(function(data){ ... });
 * var rl = $najax.sync('ajax.php').done();
 * var v = rl.value();
 */
njx.sync = function(url, vs, opt){
	return (new Nx(opt)).__basic(url , vs).async(false);
};
