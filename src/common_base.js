'use strict';

/**
 * $najax defines.
 * @namespace $najax.define
 */
njx.define = {};

/**
 * Error mode.
 *
 * <b>Value defines</b><br>
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>0</code> | none |
 * | <code>1</code> | error |
 * | <code>2</code> | error+trace |
 *
 * @name error
 * @memberof $najax.define
 * @type {number}
 * @default 1
 *
 * @example
 * $najax.define.error = 2;
 */
njx.define.error = 1;		//0:none, 1:error, 2:error+trace

/**
 * @ignore
 */
function error(){
	if ($najax.define.error <= 0){
		return;
	}

	console.error.apply(console, arguments);

	if ($najax.define.error == 2){
		console.trace();
	}
}

/**
 * Identifier for disabling cache. Used by $najax.request and other various methods.
 * @name utms
 * @memberof $najax.define
 *
 * @type {string}
 * @default '__utms'
 */
njx.define.utms = '__utms';

/**
 * Default relay-data mode. It's possible to take out value by <i>Relay</i> object. Specify by 'Bitwise OR' value.
 *
 * <b>Value defines</b><br>
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>1</code> | Args of <i>complete</i> function. Response value and XHR object. <code>rl.value()</code> <code>rl.get()</code> |
 * | <code>2</code> | Original data. User original data, etc. |
 * | <code>4</code> | Raw data. Ajax raw response. <code>rl.data('_raw')</code> |
 *
 * @name relaymode
 * @memberof $najax.define
 *
 * @type {number}
 * @default 3 (args + original data)
 *
 * @example
 * $najax.define.relaymode = 1;		//args.
 * $najax.define.relaymode = 3;		//args + original data.
 * $najax.define.relaymode = 6;		//original data and raw data.
 */
njx.define.relaymode = 3;		//1: args, 2: original data, 4: raw data

/**
 * Alert method for connection error.
 * @name failAlert
 * @memberof $najax.define
 *
 * @example
 * $najax.request(url).fail($najax.define.failAlert).done();
 */
njx.define.failAlert = function(){
	alert(njx.define.msg[1]);
};

/**
 * @ignore
 */
function attr(c, w, v){
	c.setAttribute(w ,v);
}

/**
 * @ignore
 */
function isEmp(vs){
	if (!vs){
		return true;
	}

	for (var k in vs){
		if (vs.hasOwnProperty(k)){
			return false;
		}
	}

	return true;
}
