'use strict';

/**
 * Ajax request with verifying automatically and showing messages.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @namespace $najax@ex
 * @tutorial najax-ex
 *
 * @example
 * $najax.send('path.php').done();
 * $najax.send('path.php', null, {verify: $najax.define.verify}).done();
 * $najax.send('path.php', null, {verify: function(v){ return (v.verify)?true:false; } }).done();
 *
 * $najax.sendex('path.php').done();
 * $najax.sendex('path.php', null, {verify: $najax.define.verify}).done();
 */

/**
 * Response state defines.
 * @name state
 * @memberof $najax
 * @readonly
 * @enum {number}
 *
 * @see $najax.define.msg
 */
njx.state = {
	/** success. */
	success: 0,
	/** connection error. */
	ajax: 1,
	/** empty error. */
	empty: 2,
	/** verify error. */
	verify: 3,
	/** app error. */
	app: 4
};

/**
 * Default messages for $najax.send / $najax.sendex.
 * @name msg
 * @memberof $najax.define
 *
 * @type {object}
 * @property {string} [0] Success.
 * @property {string} [1]	 Connection error(ajax).
 * @property {string} [2] Empty error(ajax).
 * @property {string} [3] Verify error(ajax).
 * @property {string} [4] App error(ajax).
 *
 * @see $najax.state
 * @see $najax@ex.send
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.msg[0] = 'Success.';
 */
njx.define.msg = {
	0: 'Success.',
	1: 'Connection error(ajax).',
	2: 'Empty error(ajax).',
	3: 'Verify error(ajax).',
	4: 'App error(ajax).'
};

/**
 * Default alert method for $najax.send.
 * @name fail
 * @memberof $najax.define
 *
 * @param {number} state Response state. See <i>$najax.state</i>.
 * @param {string} msg Message. See <i>$najax.define.msg</i>.
 * @param {*} v Response value.
 *
 * @see $najax.state
 * @see $najax.define.msg
 *
 * @see $najax@ex.send
 *
 * @example
 * $najax.define.fail = function(state, msg, v){
 *   alert(msg);
 * };
 */
njx.define.fail = function(state, msg, v){
	alert(msg);
};

/**
 * Default verify method for $najax.send / $najax.sendex.
 *
 * <b>Specification</b><br>
 * <code>function(v){ return (v.result == 1); }</code>
 *
 * @name verify
 * @memberof $najax.define
 *
 * @param {*} v Response value.
 * @return {boolean}
 *
 * @see $najax@ex.send
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.verify = function(v){
 *   return (v.result == 1);
 * };
 */
njx.define.verify = function(v){
	return (v.result == 1);
};

/**
 * Default success-message method for $najax.sendex.
 *
 * <b>Specification</b><br>
 * Show message by <i>$any.floating.msg</i>
 *
 * @name successex
 * @memberof $najax.define
 *
 * @param {string} msg Message. See <i>$najax.define.msg</i>.
 * @param {*} v Response value.
 *
 * @see $najax.define.msg
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.successex = function(msg, v){
 *   $any.floating.msg(msg);
 * }
 */
njx.define.successex = function(msg, v){
	$any.floating.msg(msg);
};

/**
 * Default fail-message method for $najax.sendex.
 *
 * <b>Specification</b><br>
 * Show message by <i>$any.floating.msg</i>
 *
 * @name failex
 * @memberof $najax.define
 *
 * @param {string} msg Message. See <i>$najax.define.msg</i>.
 * @param {*} v Response value.
 *
 * @see $najax.define.msg
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.failex = function(type, msg, v){
 *   $any.floating.msg(msg, null, {css: 'error'});
 * }
 */
njx.define.failex = function(type, msg, v){
	$any.floating.msg(msg, null, {css: 'error'});
};

/**
 * @ignore
 */
function sdMsg(v, xhr, r, o){
	var tp = 0;

	if (xhr.status != 200){
		tp = njx.state.ajax;
	}else if (!v){
		tp = njx.state.empty;
	}else if (o.verify && !o.verify(v)){
		tp = njx.state.verify;
	}else if (r === false){
		tp = njx.state.app;
	}

	if (tp == 0){
		if (o.success){
			o.success(o.msg[tp], v);
		}
	}else{
		if (o.fail){
			o.fail(tp, o.msg[tp], v);
		}
	}
}

/**
 * Simple ajax request with verifying automatically and showing messages.
 *
 * @function send
 * @memberof $najax@ex
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {function} [opt.success=null] Success function.
 * @param {function} [opt.fail=$najax.define.fail] Fail function.
 * @param {function} [opt.verify=null] Verify function. If null, not verify. <code>Ex: {verify: $najax.define.verify}</code>
 * @param {assoc} [opt.msg=$najax.define.msg] Messages.
 * @returns {Nx}
 *
 * @see $najax.define.fail
 * @see $najax.define.verify
 * @see $najax.define.msg
 * @see $najax.request
 *
 * @tutorial najax-ex
 * @example
 * $najax.send('path.php').done();
 * $najax.send('path.php', null, {verify: $najax.define.verify}).done();
 * $najax.send('path.php', null, {verify: function(v){ return (v.verify)?true:false; } }).done();
 * $najax.send('path.php', null, {msg: {0: 'OK', 4: 'Application error!!'} }).done();
 */
njx.send = function(url, vs, opt){
	info('send');

	opt = ext(ext({}, {
		success: null,
		fail: njx.define.fail,
		verify: null,
		msg: njx.define.msg
	}, true), opt, true);

	return njx.request(url, vs, opt).__set('__after', function(v, xhr, r){
		sdMsg(v, xhr, r, opt);
	});
};

/**
 * Ajax request with verifying automatically and showing messages by $any.floating.msg, showing loading message.
 *
 * <b>Requires</b><br>
 * jQuery / any.js
 *
 * @function sendex
 * @memberof $najax@ex
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {function} [opt.success=$najax.define.successex] Success function.
 * @param {function} [opt.fail=$najax.define.failex] Fail function.
 * @param {function} [opt.verify=null] Verify function. If null, not verify. <code>Ex: {verify: $najax.define.verify}</code>
 * @param {assoc} [opt.msg=$najax.define.msg] Messages.
 * @param {string} [opt.loading='loading'] Loading CSS name.
 * @returns {Nx}
 *
 * @see $najax.define.successex
 * @see $najax.define.failex
 * @see $najax.define.verify
 * @see $najax.define.msg
 * @see $najax@ex.send
 * @see $najax.request
 *
 * @tutorial najax-ex
 * @example
 * $najax.sendex('path.php').done();
 * $najax.sendex('path.php', null, {verify: $najax.define.verify}).done();
 * $najax.sendex('path.php', null, {verify: function(v){ return (v.verify)?true:false; } }).done();
 * $najax.sendex('path.php', null, {msg: {0: 'OK', 4: 'Application error!!'} }).done();
 */
njx.sendex = function(url, vs, opt){
	info('sendex');

	opt = ext(ext({}, {
		success: njx.define.successex,
		fail: njx.define.failex,
		verify: null,
		msg: njx.define.msg,
		loading: 'loading'
	}, true), opt);

	return njx.send(url, vs, opt).__set('__before', function(){
		$any.floating.loading(true, {css: opt.loading});
	}).__set('__after', function(v, xhr, r){
		$any.floating.loading(false);

		sdMsg(v, xhr, r, opt);
		opt = null;
	});
};
