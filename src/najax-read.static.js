'use strict';

/**
 * $najax read methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * @namespace $najax@read
 * @tutorial najax-read
 *
 * @example
 * $najax.require('sample.js');
 * $najax.require(['s1.js', 's2.js'], {base: 'path/'}).done(function(s1, s2){ ... });
 *
 * $najax.ready(function(){ ... });
 *
 * $najax.load('#target', 'demo.php', {a: 1, b: 2});
 *
 * $najax.module('template.php');
 */

var rqFn = null;

function rqSc(){
	this.data({fn: rqFn});
	rqFn = null;
}

/**
 * Load script and pass <i>function object</i> by <code>$najax.ready</code> to arguments.
 *
 * @function require
 * @memberof $najax@read
 *
 * @param {string|array} path Path or Paths.
 * @param {assoc} [opt] Nx options.
 * @param {string} [opt.base=''] Base path.
 * @param {boolean} [opt.run=false] Run script after loading.
 * @param {number} [opt.relaymode=2] For details, see $najax.define.relaymode.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Linker}
 *
 * @see $najax.ready
 * @see $najax.define.relaymode
 *
 * @see Nx
 * @see Relay
 * @see Linker
 *
 * @tutorial najax-read
 * @example
 * $najax.require('sample.js');
 * $najax.require(['s1.js', 's2.js'], {base: 'path/'}).done(function(s1, s2){ ... });
 * $najax.require(['AClass.js', 'BClass.js']).done(function(AClass, BClass){ ... });
 * $najax.require('sample.js', {run: true});
 */
njx.require = function(path, opt){
	opt = ext({base: '', run: false, relaymode: 2, cache: true}, opt);

	if (typeof path === 'string'){
		path = [path];
	}

	var rls = [];

	for (var i=0;i<path.length;i++){
		rls[i] = njx.script(opt.base + path[i], null, opt).complete(rqSc).done();
	}

	return njx.linker.apply(null, rls).argument(function(rl){
		var f = rl.data('fn');

		if (opt.run && f){
			f = f();
		}

		return f;
	}).lock();
};

/**
 * Ready function for $najax.require.
 *
 * @function ready
 * @memberof $najax@read
 *
 * @param {function} fn Function.
 *
 * @see $najax.require
 *
 * @tutorial najax-read
 * @example
 * $najax.ready(function(){ ... });
 * $najax.ready($any.makeClass( ... ));
 */
njx.ready = function(fn){
	if (fn){
		rqFn = fn;
	}
};

/**
 * Load template and append HTML and JS to Element. If target Element is null, append to document bottom(auto-append).
 *
 * <b>Specification</b><br>
 * Naming in auto-append: <code>prefix + CRC code created by url. Ex: id=njx5690</code>
 * <code>_elem</code> by Relay::data is Element.
 *
 * @function load
 * @memberof $najax@read
 *
 * @param {Element} el Element. If null, append automatically as a last Element - auto-append.
 * @param {string} url URL
 * @param {assoc} [vs=null] Parameter
 * @param {assoc} [opt] Nx options.
 * @param {string} [opt.prefix='njx'] When appending to as last Element, it's possible to specify Element's id prefix.
 * @param {number} [opt.relaymode=3] For details, see $najax.define.relaymode.
 * @returns {Linker}
 *
 * @see $najax.module
 * @see $najax.define.relaymode
 * @see Nx
 * @see Relay
 * @see Linker
 *
 * @tutorial najax-read
 * @example
 * $najax.load('#target', 'demo.php', {a: 1, b: 2});
 * $najax.load(null, 'demo.php').done(function(data){ ... });
 */
njx.load = function(el, url, vs, opt){
	opt = ext({prefix: 'njx', relaymode: 3}, opt);
	opt.cache = true;

	if (!el){
		el = document.createElement('div');
		el.id = opt.prefix + $any.crc16(url);
		el.style.display = 'none';
		document.body.appendChild(el);
	}

	opt.element = el;

	var rl = njx.html(url, vs, opt).done();

	if (opt.relaymode & 2){
		rl.data('_elem', el);
	}

	return njx.linker(rl);
};

/**
 * Load module - Wrapper of $najax.load. Append to document bottom.
 *
 * <b>Specification</b><br>
 * Append module(HTML and script) to document bottom.
 *
 * @function module
 * @memberof $najax@read
 *
 * @param {string} url URL
 * @param {assoc} [opt] $najax.load options.
 * @returns {Linker}
 *
 * @see $najax.load
 * @see Nx
 * @see Relay
 * @see Linker
 *
 * @tutorial najax-read
 * @example
 * $najax.module('template.php');
 */
njx.module = function(url, opt){
	return njx.load(null, url, null, opt);
};
