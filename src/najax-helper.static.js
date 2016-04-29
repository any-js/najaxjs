'use strict';

/**
 * $najax helper methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * @namespace $najax@helper
 * @tutorial najax-helper
 *
 * @example
 * v = $najax.escape(1);
 * v = $najax.escape('E=M+C+2');
 *
 * url = $najax.url('ajax.php', {a:1, b:2, c:3});
 * url = $najax.url('ajax.php', {a:1, b:2}, true);
 *
 * qs = $najax.query(true);
 *
 * $najax.parseHTML(el, html);
 *
 * $najax.submit('form.php', vs);
 * $najax.submit('form.php', vs, {method: 'POST', target: '_blank'});
 * $najax.iframeHtml(el, '<div>content</div>');
 */

/**
 * @ignore
 */
function qsVs(q, dc){
	var r = {}, ps = q.split('&'), p, v;

	for (var i = 0; i < ps.length; i++){
		if (ps[i] != '') {
			p = ps[i].split('=');

			v = (p[1] === undefined)?null:p[1];

			if (dc){
				try {
					v = decodeURI(v);
				} catch(e) {
					v = null;
				}
			}

			r[p[0]] = v;
		}
	}

	return r;
}

/**
 * Escape value.
 * @function escape
 * @memberof $najax@helper
 *
 * @param {string} v Parameter value.
 * @returns {string}
 *
 * @see $najax.params
 * @see $najax.url
 *
 * @tutorial najax-helper
 *
 * @example
 * v = $najax.escape(1);
 * v = $najax.escape('E=M+C+2');
 * v = $najax.escape('K V S');
 */
njx.escape = function(v){
	return encodeURIComponent(v).replace(/%20/g, '+');
};

/**
 * @ignore
 */
function prms(vs, pre, f){
	var s = '', nm;

	for (var k in vs){
		if (vs.hasOwnProperty(k)){
			nm = f(k);

			if (pre){
				nm = pre + '[' + nm + ']';
			}

			if (!(vs[k] instanceof Object)){
				s+= nm + '=' + f(vs[k]) + '&';
			}else{
				s+= prms(vs[k], nm, f);
			}
		}
	}

	return s;
}

/**
 * @ignore
 */
function rawv(v){
	return v;
}

/**
 * Return string values.
 * @function params
 * @memberof $najax@helper
 *
 * @param {assoc} vs Parameter values.
 * @param {boolean} [noescape=false] If true, not escape values.
 * @returns {string}
 *
 * @see $najax.escape
 * @see $najax.url
 *
 * @tutorial najax-helper
 *
 * @example
 * v = $najax.params({a: 1});
 * v = $najax.params({a: 1, b:2}, true);
 * v = $najax.params({K:'V S', E:'M C'});
 */
njx.params = function(vs, noescape){
	var s;

	if (!noescape){
		s = prms(vs, '', njx.escape);
	}else{
		s = prms(vs, '', rawv);
	}

	return s.slice(0, -1);
};

/**
 * Create url by params. URL's query-string value is overridden by parameter-values.
 * @function url
 * @memberof $najax@helper
 *
 * @param {string} url URL.
 * @param {assoc} vs Parameter values.
 * @param {boolean} [noescape=false] If true, not escape values.
 * @returns {string}
 *
 * @see $najax.escape
 * @see $najax.params
 *
 * @tutorial najax-helper
 *
 * @example
 * url = $najax.url('ajax.php', {a:1, b:2, c:3});
 * url = $najax.url('ajax.php', {a:1, b:2}, true);
 * url = $najax.url('ajax.php?a=0&d=3', {a:1, b:2, c:3});
 * url = $najax.url('ajax.php?a=x+y&', {a:'NX', b: 'E=M+C+2', d:'K V S'});
 */
njx.url = function(url, vs, noescape){
	if (!vs){
		return url;
	}

	var t = /^([^\?#]*)\??([^#]*)#?(.*)$/.exec(url), q = qsVs(t[2], false), k;

	for (k in vs){
		if (vs.hasOwnProperty(k)){
			q[k] = vs[k];
		}
	}

	url = t[1];

	if (!isEmp(q)){
		url+= '?' + njx.params(q, noescape);
	}

	if (t[3]){
		url+= '#' + t[3];
	}

	return url;
};

/**
 * Parse query string and return parameter assoc.
 * @function query
 * @memberof $najax@helper
 *
 * @param {boolean} [hash=false] If true, include URL's hash fragment(#).
 * @returns {assoc}
 *
 * @tutorial najax-helper
 *
 * @example
 * qs = $najax.query();
 *
 */
njx.query = function(hash){
	var q, rv = /\?(.+)$/.exec(location.search);

	if (rv){
		q = qsVs(rv[1], true);
	}else{
		q = {};
	}

	return q;
};

/**
 * Get hash.
 * @function hash
 * @memberof $najax@helper
 *
 * @returns {string}
 *
 * @tutorial najax-helper
 *
 * @example
 * hash = $najax.hash();
 *
 */
njx.hash = function() {
	return location.hash.replace('#', '');
};

/**
 * @ignore
 */
function sbmSet(c, nm, vs){
	for (var k in vs){
		if (vs.hasOwnProperty(k)){
			var v = vs[k];

			if (nm != null){
				k = nm + '[' + k + ']';
			}

			if (v instanceof Object){
				sbmSet(c, k, v);
			}else{
				var t = document.createElement('input');
				attr(t, 'type', 'hidden');
				attr(t, 'name', k);
				attr(t, 'value', v);
				c.appendChild(t);
			}
		}
	}
}

/**
 * @ignore
 */
function cpy(nc, tc, nm){
	if (tc[nm] != null && tc[nm] != ''){
		nc[nm] = tc[nm];
	}
}

/**
 * @ignore
 */
function htmPrs(c){
	var tc;

	for (var i=0;i<c.children.length;i++){
		tc = c.children[i];

		if (tc.children.length > 0){
			htmPrs(tc);
		}else{
			if (tc.tagName.toLocaleLowerCase() === 'script'){
				var nc = document.createElement('script');

				cpy(nc, tc, 'type');
				cpy(nc, tc, 'language');
				cpy(nc, tc, 'charset');
				cpy(nc, tc, 'async');
				cpy(nc, tc, 'defer');
				cpy(nc, tc, 'src');

				nc.text = tc.text;
				c.replaceChild(nc, tc);
			}
		}
	}
}

/**
 * Parse HTML with evaluating JavaScript.
 * @function parseHTML
 * @memberof $najax@helper
 *
 * @param {Element} el Destination element.
 * @param {string} src HTML source.
 *
 * @tutorial najax-helper
 *
 * @example
 * $najax.parseHTML(el, html);
 */
njx.parseHTML = function(el, src){
	el.innerHTML = src;

	htmPrs(el);
};

/**
 * Submit values by form Element.
 * @function submit
 * @memberof $najax@helper
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameter.
 * @param {assoc} [opt] Option.
 * @param {Element} [opt.form] Form Element.
 * @param {string} [opt.method=null] Method(GET | POST).
 * @param {string} [opt.target] Target window.
 * @param {string} [opt.enctype] Form enctype.
 * @return {Element}
 *
 * @tutorial najax-helper
 * @example
 * $najax.submit('form.php', vs);
 * $najax.submit('form.php', vs, {method: 'POST', target: '_blank'});
 * $najax.submit('form.php', vs, {form: '#form', target: '_blank'});
 */
njx.submit = function(url, vs, opt){
	info('submit');

	opt = ext({form: null, method: null, target: null, enctype: null}, opt);

	var c, fm = false;

	if (opt.form){
		c = opt.form;
	}else{
		fm = true;
		c = document.createElement('form');
		c.style.display = 'none';
		document.body.appendChild(c);
	}

	if (fm || opt.method){
		attr(c, 'method', opt.method);
	}

	if (fm || url){
		attr(c, 'action', url);
	}

	if (fm || opt.enctype){
		attr(c, 'enctype', opt.enctype);
	}

	if (fm || opt.target){
		attr(c, 'target', opt.target);
	}

	sbmSet(c, null, vs);

	c.submit();

	return c;
};

/**
 * Create iframe content by source.
 * @function iframeHtml
 * @memberof $najax@helper
 *
 * @param {Element} el Iframe Element.
 * @param {string} src HTML source.
 * @param {assoc} [opt] Option.
 * @param {boolean} [opt.all=false] If true, all content mode. or false, body content mode.
 * @param {string} [opt.charset='utf-8'] Charset.
 * @param {string} [opt.css=''] CSS Style.
 * @param {string} [opt.js=''] JavaScript source.
 *
 * @tutorial najax-helper
 *
 * @example
 * $najax.iframeHtml(el, '<div>content</div>');
 * $najax.iframeHtml(el, '<html>....</html>', {all: true});
 * $najax.iframeHtml(el, src, {css: 'body: {font-size:12pt;}'});
 * $najax.iframeHtml(el, src, {js: 'alert("demo");'});
 */
njx.iframeHtml = function(el, src, opt) {
	opt = ext({all: false, charset: 'utf-8', css: '', js: ''}, opt);

	var s, d = el.contentWindow || el.contentDocument;

	if (!opt.all){
		s = '<!doctype html><html><head><meta charset=' + opt.charset + '></head>';

		if (opt.css){
			s += '<style type="text/css">'  + opt.css  + '</style>';
		}

		if (opt.js){
			s += '<script type="text/javascript">' + opt.js + '</script>';
		}

		s += '</head><body>' + src + '</body></html>';
	}else{
		s = src;
	}

	if (d){
		d.document.open();
		d.document.write(s);
		d.document.close();
	}
};
