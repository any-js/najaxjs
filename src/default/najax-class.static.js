'use strict';

/**
 * $najax helper class.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @namespace $najax@class
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @see Singular
 * @see Pager
 * @see Reflector
 *
 * @example
 * var Singular = $najax.Singular();
 *
 * var Pager = $najax.Pager();
 *
 * var Reflector = $najax.Reflector();
 */

/**
 * Singular class. Provide single-access.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @class Singular
 *
 * @param {function} [caller] Caller function.
 * @param {function} [error] Error function.
 *
 * @see $najax@class.Singular
 * @see Relay
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var Singular = $najax.Singular();
 * var singular = new Singular();
 *
 * single.caller(function(){ ... return rl; });  //Set caller.
 * single.kick();  //Begin.
 * btn.onclick = single.kicker();  //Begin.
 */
var Singular = function(caller, error){
	this._run = false;

	this._caller = caller;
	this._error = error;
};

ext(Singular.prototype, {
	/**
	 * Kick method for bind.
	 * @function
	 * @name kick
	 * @memberof Singular
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * singular.kick();
	 */
	kick: function(){
		if (this._run){
			if (this._error){
				this._error.apply(this, arguments);
			}

			return;
		}else{
			this._run = true;
		}

		var rl = this._caller.apply(this, arguments);

		njx.linker(rl).done(bind(this, function(){
			this._run = false;
		}));
	},
	/**
	 * Return <i>kick</i> method for bind. <i>this</i> in <i>kick</i> method is Singular object.
	 * @function
	 * @name kicker
	 * @memberof Singular
	 * @instance
	 *
	 * @returns {function} <i>kick</i> method.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * btn.onclick = singular.kicker();
	 */
	kicker: function(){
		return bind(this, this.kick);
	},
	/**
	 * Set caller function. The caller function must returns <code>Relay object</code>.
	 *
	 * <b>Function specification</b>
	 * <code>function(any:*){ ... return {Relay}; }</code>
	 *
	 * @function
	 * @name caller
	 * @memberof Singular
	 * @instance
	 *
	 * @param {function} fn Caller function. <code>function(any:*){ ... return {Relay}; }</code>
	 *
	 * @see Relay
	 * @tutorial najax-class
	 *
	 * @example
	 * singular.caller(fn);
	 * singular.caller(function(){ return $najax.request(url).done(function(data){ ... }); });
	 */
	caller: function(fn){
		this._caller = fn;
	},
	/**
	 * Set error function.
	 * @function
	 * @name error
	 * @memberof Singular
	 * @instance
	 *
	 * @param {function} fn Error function.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * singular.error(fn);
	 */
	error: function(fn){
		this._error = fn;
	}
});


/**
 * Singular class builder.
 *
 * @function Singular
 * @memberof $najax@class
 *
 * @returns {Singular} Singular class.
 *
 * @see Singular
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var Singular = $najax.Singular();
 * var singular = new Singular();
 *
 * single.caller(function(){ ... return rl; });  Set caller.
 * single.kick();  //Begin.
 * btn.onclick = single.kicker();  //Begin.
 */
njx.Singular = function(){
	info('Singular');

	return Singular;
};

/**
 * Pager class. Provide paging methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @class Pager
 *
 * @param {function} [fn] Callback function.
 * @param {number} [len] Item length.
 * @param {assoc} [opt] Option.
 * @param {string} [opt.n='n'] Variable name of page number.
 * @param {string} [opt.len='len'] Variable name of item length.
 * @param {string} [opt.all='all'] Variable name of all item length.
 *
 * @see $najax@class.Pager
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var Pager = $najax.Pager();
 * var pager = new Pager(function(n, len){... $najax.get('send.php', {n: n, len: len}) ... });
 * var pager = new Pager(null, null, {n: 'pg'});
 *
 * pager.len(15);    //set length of page's items
 * pager.current();  //current
 * pager.move(5);   //move
 * pager.prev();      //prev
 * pager.next();      //next
 * pager.data();     //get data
 * pager.data({all: 100, n:1}); //set data
 * pager.func(fn);  //set function
 */
var Pager = function(fn, len, opt){
	this._filter = fn || null;
	this._len = null;
	this.len(len);
	this._opt = ext({n:'n', len:'len', all:'all'}, opt);

	this._n = 1;
	this._all = -1;
	this._max = -1;
};

ext(Pager.prototype, {
	/**
	 * Set item-length or get item-length.
	 * @function
	 * @name len
	 * @memberof Pager
	 * @instance
	 *
	 * @param {number} [v] Item length.
	 * @returns {void|number}
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.len(v);
	 * len = pager.len();
	 */
	len: function(v){
		if (v === undefined){
			return this._len;
		}

		this._len = v || 10;
	},
	/**
	 * Current.
	 * @function
	 * @name current
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.current();
	 */
	current: function(){
		this.__up();
	},
	/**
	 * Move.
	 * @function
	 * @name move
	 * @memberof Pager
	 * @instance
	 *
	 * @param {number} [v] Page number.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.move(v);
	 */
	move: function(v){
		this._n = v;
		this.__up();
	},
	/**
	 * Previous.
	 * @function
	 * @name prev
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.prev();
	 */
	prev: function(){
		this._n--;
		this.__up();
	},
	/**
	 * Next.
	 * @function
	 * @name next
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.next();
	 */
	next: function(){
		this._n++;
		this.__up();
	},
	/**
	 * Set data or get data.
	 * @function
	 * @name data
	 * @memberof Pager
	 * @instance
	 *
	 * @param {assoc} [data] Data. <code>{n:n, len:len, all: all}</code>
	 * @returns {void|assoc} <b>assoc</b> {n:n, len:len, all: all, max: max}
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.data(data);
	 * data = pager.data();
	 */
	data: function(data){
		if (data == null){
			return {n:this._n, len:this._len, all:this._all, max: this._max};
		}

		if (data[this._opt.n]){
			this._n = data[this._opt.n];
		}

		if (data[this._opt.len]){
			this._len = data[this._opt.len];
		}

		if (data[this._opt.all]){
			this._all = data[this._opt.all];
		}

		this.update();
	},
	/**
	 * Set function.
	 * @function
	 * @name func
	 * @memberof Pager
	 * @instance
	 *
	 * @param {function} fn Function.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.func(fn);
	 */
	func: function(fn){
		this._filter = fn;
	},
	/**
	 * Update state.
	 * @function
	 * @name update
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.update();
	 */
	update: function(){
		this._n = (this._n < 1)?1:this._n;

		if (this._all > 0){
			this._max = Math.ceil(this._all/this._len);
			this._n = (this._n > this._max)?this._max:this._n;
		}
	},
	/**
	 * @ignore
	 */
	__up: function(){
		this.update();

		this._filter(this._n, this._len);
	}
});

/**
 * Pager-class builder.
 *
 * @function Pager
 * @memberof $najax@class
 * @returns {Pager} Pager class.
 *
 * @see Pager
 *
 * @tutorial najax-class
 *
 * @example
 * var Pager = $najax.Pager();
 * var pager = new Pager(function(n, len){... $najax.get('send.php', {n: n, len: len}) ... });
 *
 * pager.len(15);		//set length of page's items
 * pager.current();	//current
 * pager.move(5);	//move
 * pager.prev();		//prev
 * pager.next();		//next
 * pager.data();		//get data
 * pager.data({all: 100, n:1});	//set data
 * pager.func(fn);	//set function
 */
njx.Pager = function(){
	info('Pager');

	return Pager;
};

/**
 * Reflector class. Provide ajax request and reflect to content.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @class Reflector
 *
 * @param {Nx} [nx=null] Nx object. If null, Create <i>Nx object</i> automatically.
 *
 * @see $najax@class.Reflector
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var reflector = new ($najax.Reflector());
 *
 * reflector.render('#target', url);
 * reflector.render('#target', url, {v: v});
 * reflector.render('#target', url, null, function(v){ ... return v; });
 *
 * var Reflector = $najax.Reflector();
 * var nx = $najax.get(null).timeout(5);
 * var reflector = new Reflector(nx);
 *
 * reflector.type('html').render('#target', url);
 * reflector.typeJson(function(v){ ... return v;}).render('#target', url);
 * reflector.type('json').render('#target', url, null, function(v){ return this.list(v.list, function(k, v){ ... return v;}); });
 */
var Reflector = function(nx){
	this._nx = nx || null;
	this._el = null;
	this._type = null;
	this._filter = null;
};

ext(Reflector.prototype, {
	/**
	 * Set and get Nx object.
	 *
	 * @function
	 * @name nx
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {Nx} [nx] Nx object.
	 * @returns {void|Nx}
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * var nx = $najax.get(null).retry(1);
	 * reflector.nx(nx);       //Set
	 *
	 * vsr nx = reflector.nx(); //Get
	 */
	nx: function(nx){
		if (nx === undefined){
			return this._nx;
		}

		this._nx = nx;

		return this;
	},
	/**
	 * Set type and filter function.
	 *
	 * @function
	 * @name type
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {string} type Type. <code>raw(default), text</code> / <code>html</code> / <code>json</code> / <code><i>any other Nx.type</i></code>
	 * @param {function} [filter] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.type('html');
	 * reflector.type('json');
	 * reflector.type('raw');
	 * reflector.type(null, function(v){ ... return v;});
	 * reflector.type('json', function(v){ ... return v;});
	 */
	type: function(type, filter){
		this._type = type;
		this.filter(filter);

		return this;
	},
	/**
	 * Set <i>Json</i> type. Wrapper of <i>type</i> method.
	 *
	 * @function
	 * @name typeJson
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {function} [filter] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.typeJson();
	 * reflector.typeJson(function(v){ ... return v;});
	 */
	typeJson: function(filter){
		this.type('json', filter);

		return this;
	},
	/**
	 * Set <i>HTML</i> type. Wrapper of <i>type</i> method.
	 *
	 * @function
	 * @name typeHtml
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {function} [filter] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.typeHtml();
	 * reflector.typeHtml(function(v){ ... return v;});
	 */
	typeHtml: function(filter){
		this.type('json', filter);

		return this;
	},
	/**
	 * Set filter function.
	 *
	 * @function
	 * @name filter
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {function} [fn] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.filter(function(v){ ... return v;});
	 */
	filter: function(fn){
		this._filter = fn || null;

		return this;
	},
	/**
	 * Create combined string by assoc and function.
	 *
	 * @function
	 * @name list
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {array|assoc} vs Array or Assoc values.
	 * @param {function} fn Filter function for single item. <code>function(v:*){ return {string}; }</code>
	 * @returns {string} Combined string.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.filter(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 * reflector.jsonType(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 */
	list: function(vs, fn){
		var r = '';

		for (var k in vs){
			if (vs.hasOwnProperty(k)){
				r += fn(k, vs[k]);
			}
		}

		return r;
	},
	/**
	 * Ajax & render to content.
	 *
	 * @function
	 * @name render
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {string|Element} el Element or Element selector.
	 * @param {string} url URL.
	 * @param {assoc} [vs] URL parameter values.
	 * @param {function} [filter] Filter function. See <i>Reflector.filter</i> for detail.
	 * @returns {Relay} <i>Relay</i> object by <i>Nx.done</i>.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.filter(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 * reflector.jsonType(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 */
	render: function(el, url, vs, filter){
		this._el = el;

		if (!this._nx){
			this._nx = $najax.get(null);
		}

		this._nx.type((this._type == 'html')?'raw':this._type);

		return this._nx.url(url).param(vs).__set('__after', this.__apply(filter)).clean(false).done();
	},
	/**
	 * @ignore
	 */
	__apply: function(fn){
		return bind(this, function(v){
			var el = (typeof this._el === 'string')?document.querySelector(this._el):this._el;
			v = this.__filter(fn, v);

			if (typeof v === 'object'){
				console.error("Can't render object.");
				return;
			}

			switch (this._type){
			case 'html':
				njx.parseHTML(el, v);
				break;
			case 'json':
			case 'raw':
			default:
				el.innerHTML = v;
				break;
			}
		});
	},
	/**
	 * @ignore
	 */
	__filter: function(fn, v){
		if (!fn && !this._filter){
			return v;
		}

		return (fn || this._filter).call(this, v);
	}
});

/**
 * Reflector-class builder.
 *
 * @function Reflector
 * @memberof $najax@class
 * @returns {Reflector} Reflector class.
 *
 * @see Reflector
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var reflector = new ($najax.Reflector());
 *
 * reflector.render('#target', url);
 * reflector.render('#target', url, {v: v});
 * reflector.render('#target', url, null, function(v){ ... return v; });
 *
 * var Reflector = $najax.Reflector();
 * var nx = $najax.get(null).timeout(5);
 * var reflector = new Reflector(nx);
 *
 * reflector.type('html').render('#target', url);
 * reflector.typeJson(function(v){ ... return v;}).render('#target', url);
 * reflector.type('json').render('#target', url, null, function(v){ return this.list(v.list, function(k, v){ ... return v;}); });
 */
njx.Reflector = function(){
	info('Reflector');

	return Reflector;
};
